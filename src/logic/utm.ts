export type UtmData = Record<string, string>;

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'ref',
];

export function readUtm(search = window.location.search): UtmData {
  const params = new URLSearchParams(search);
  const data: UtmData = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      data[key] = value;
    }
  });

  return data;
}
