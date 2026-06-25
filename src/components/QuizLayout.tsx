import type { ReactNode } from 'react';
import usmanovaLogo from '../assets/brand/usmanova-fit-logo.png';
import { ProgressBar } from './ProgressBar';

type QuizLayoutProps = {
  progress: number;
  children: ReactNode;
  canGoBack: boolean;
  onBack: () => void;
  isHeroScreen?: boolean;
};

export function QuizLayout({ progress, children, canGoBack, onBack, isHeroScreen = false }: QuizLayoutProps) {
  return (
    <div className="app-shell">
      <ProgressBar percent={progress} />
      <main className={`quiz-page${isHeroScreen ? ' is-hero-page' : ''}`} aria-live="polite">
        <div className={`quiz-card${isHeroScreen ? ' is-hero-card' : ''}`}>
          {!isHeroScreen ? (
            <header className="hero-brand-header" aria-label="УСМАНОВА ФИТ">
              <img className="brand-logo-image" src={usmanovaLogo} alt="УСМАНОВА ФИТ" />
            </header>
          ) : null}
          {canGoBack ? (
            <button className="back-button" type="button" onClick={onBack} aria-label="Назад">
              Назад
            </button>
          ) : null}
          {children}
        </div>
      </main>
    </div>
  );
}
