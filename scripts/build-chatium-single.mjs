#!/usr/bin/env node
/**
 * build-chatium-single.mjs
 *
 * Produces a single self-contained index.html for Chatium deployment.
 * CSS, JS, and all local images are inlined as data URIs.
 * External scripts (GetCourse) remain external.
 *
 * Usage:  node scripts/build-chatium-single.mjs
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT   = join(__dirname, '..');
const DIST   = join(ROOT, 'dist');
const ASSETS = join(DIST, 'assets');
const OUT_DIR  = '/Users/annagromyko/Applications/usmanova-quiz-funnel-chatium-single';
const OUT_FILE = join(OUT_DIR, 'index.html');

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png',  '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.gif': 'image/gif', '.ico': 'image/x-icon',
};

function isImage(name) {
  const ext = extname(name).toLowerCase();
  return ext in MIME;
}

function toDataUri(filePath) {
  const ext  = extname(filePath).toLowerCase();
  const mime = MIME[ext] ?? 'application/octet-stream';
  return `data:${mime};base64,${readFileSync(filePath).toString('base64')}`;
}

// Escape a filename for use inside a regex
function reEsc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── 1. Build ─────────────────────────────────────────────────────────────
console.log('▶  Running npm run build …');
execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
console.log('✓  Build complete\n');

// ── 2. Collect assets ────────────────────────────────────────────────────
const allAssets = readdirSync(ASSETS);
const cssFiles  = allAssets.filter(f => f.endsWith('.css'));
const jsFiles   = allAssets.filter(f => f.endsWith('.js'));
const imgFiles  = allAssets.filter(isImage);

// Build image map: hashed-filename → data URI
const imgMap = {};
for (const f of imgFiles) {
  imgMap[f] = toDataUri(join(ASSETS, f));
}
console.log(`✓  ${imgFiles.length} images → data URIs`);

// ── 3. Replace local asset refs in any text blob ─────────────────────────
// Handles:
//   - CSS  url(./assets/name) / url(/assets/name)
//   - JS   "./assets/name"  / "/assets/name"
//   - Vite ESM pattern  new URL("name", import.meta.url).href
function patchRefs(text) {
  for (const [name, uri] of Object.entries(imgMap)) {
    const esc = reEsc(name);
    const anyPath = `(?:\\.?/)?assets/${esc}`;

    // Vite ESM import.meta.url pattern (most common with base: './')
    // e.g. new URL("katya-hero-BrRknpSx.webp",import.meta.url).href
    text = text.replace(
      new RegExp(`new URL\\(["']${esc}["'],\\s*import\\.meta\\.url\\)\\.href`, 'g'),
      () => `"${uri}"`,
    );

    // CSS url(...)
    text = text.replace(
      new RegExp(`url\\(["']?${anyPath}["']?\\)`, 'g'),
      () => `url(${uri})`,
    );
    // Double-quoted string (./assets/name or /assets/name)
    text = text.replace(
      new RegExp(`"${anyPath}"`, 'g'),
      () => `"${uri}"`,
    );
    // Single-quoted string
    text = text.replace(
      new RegExp(`'${anyPath}'`, 'g'),
      () => `'${uri}'`,
    );
  }
  return text;
}

// ── 4. Inline CSS ────────────────────────────────────────────────────────
const inlinedCSS = cssFiles
  .map(f => patchRefs(readFileSync(join(ASSETS, f), 'utf-8')))
  .join('\n');
console.log(`✓  Inlined ${cssFiles.length} CSS file(s)  (${Math.round(inlinedCSS.length / 1024)} KB)`);

// ── 5. Inline JS ─────────────────────────────────────────────────────────
let inlinedJS = jsFiles
  .map(f => patchRefs(readFileSync(join(ASSETS, f), 'utf-8')))
  .join('\n');
// Prevent </script> inside the bundle from terminating the tag prematurely
inlinedJS = inlinedJS.replace(/<\/script>/gi, '<\\/script>');
console.log(`✓  Inlined ${jsFiles.length} JS file(s)  (${Math.round(inlinedJS.length / 1024)} KB)`);

// ── 6. Patch HTML ────────────────────────────────────────────────────────
let html = readFileSync(join(DIST, 'index.html'), 'utf-8');

// Remove <link ...> tags referencing local assets (stylesheet, modulepreload, etc.)
html = html.replace(/<link\b[^>]*\bhref=["'][^"']*assets\/[^"']*["'][^>]*\/?>\n?/gi, '');

// Remove <script src="...assets/..."> tags (closing or self-closing)
html = html.replace(/<script\b[^>]*\bsrc=["'][^"']*assets\/[^"']*["'][^>]*><\/script>\n?/gi, '');
html = html.replace(/<script\b[^>]*\bsrc=["'][^"']*assets\/[^"']*["'][^>]*\/>\n?/gi, '');

// Inject CSS + JS together before </head> so module script runs after DOM is ready
const injection = [
  `<style>\n${inlinedCSS}\n</style>`,
  `<script type="module">\n${inlinedJS}\n</script>`,
].join('\n');
html = html.replace('</head>', `${injection}\n</head>`);

// ── 7. Verify ────────────────────────────────────────────────────────────
// Allow: GetCourse external URL.  Disallow: any ./assets/ or /assets/ path.
const localRefs = [...html.matchAll(/(?:["'(,\s])(?:\.\/|\/)?assets\//g)];
if (localRefs.length > 0) {
  console.warn(`⚠   ${localRefs.length} local asset reference(s) still present — check output!`);
} else {
  console.log('✓  No local asset references remaining');
}

// Quick sanity: GetCourse script must still be in the file
if (html.includes('gymteam.ru')) {
  console.log('✓  GetCourse external script present');
} else {
  console.warn('⚠   GetCourse script not found — check GetCourseEmbed component');
}

// ── 8. Write output ──────────────────────────────────────────────────────
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, html, 'utf-8');

const kb = Math.round(html.length / 1024);
const mb = (kb / 1024).toFixed(2);
console.log(`\n✓  Output: ${OUT_FILE}`);
console.log(`   Size:   ${kb} KB  (${mb} MB)\n`);
