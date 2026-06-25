import { useEffect, useState } from 'react';
import type { LoaderScreenData } from '../data/quizScreens';

type LoaderScreenProps = {
  screen: LoaderScreenData;
  onDone: () => void;
  goalLabel?: string;
};

export function LoaderScreen({ screen, onDone, goalLabel }: LoaderScreenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const loaderPercent = Math.min(100, Math.round(((activeStep + 1) / screen.steps.length) * 100));

  useEffect(() => {
    const stepTime = Math.max(300, Math.floor(screen.durationMs / screen.steps.length));
    const interval = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, screen.steps.length - 1));
    }, stepTime);
    const timer = window.setTimeout(onDone, screen.durationMs);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [onDone, screen.durationMs, screen.steps.length]);

  return (
    <section className="screen loader-screen">
      <div className="loader-plan-visual" aria-hidden="true">
        <div className="loader-orbit">
          <span className="loader-orbit-dot" />
          <span className="loader-orbit-dot" />
          <span className="loader-orbit-dot" />
        </div>
        <div className="loader-core">
          <span />
        </div>
        <div className="loader-floating-card loader-floating-card--goal">цель</div>
        <div className="loader-floating-card loader-floating-card--food">питание</div>
        <div className="loader-floating-card loader-floating-card--training">тренировки</div>
      </div>
      <div className="screen-heading">
        <h1>{screen.title}</h1>
        <p className="loader-percent">{loaderPercent}%</p>
      </div>
      <div className="loader-steps">
        {screen.steps.map((step, index) => (
          <div className={`loader-step${index <= activeStep ? ' is-done' : ''}`} key={index}>
            <span />
            <p>{index === 1 && goalLabel ? `Собираем программу: ${goalLabel}` : step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
