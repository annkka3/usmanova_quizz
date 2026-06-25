import { answerLabels, getArrayAnswer, getNumberAnswer, getStringAnswer, type Result } from '../logic/resultLogic';
import type { Answers } from '../logic/resultLogic';

const PROGRAM_ICONS: Record<string, string> = {
  method: '💪',
  slim: '✨',
  glutes: '🍑',
  belly: '🎯',
  nutrition: '🥗',
  recovery: '🌸',
};

function ProgressCurve() {
  return (
    <div className="result-progress-curve" aria-hidden="true">
      <svg viewBox="0 0 280 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f45b95" stopOpacity="0.4" />
            <stop offset="1" stopColor="#ea3d80" />
          </linearGradient>
          <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f45b95" stopOpacity="0.12" />
            <stop offset="1" stopColor="#f45b95" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,42 C50,38 100,24 140,14 C180,4 230,2 280,1" stroke="url(#curveGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0,42 C50,38 100,24 140,14 C180,4 230,2 280,1 L280,48 L0,48 Z" fill="url(#curveFill)" />
        <circle cx="0" cy="42" r="4" fill="#f45b95" fillOpacity="0.35" />
        <circle cx="140" cy="14" r="4.5" fill="#f45b95" fillOpacity="0.65" />
        <circle cx="280" cy="1" r="6" fill="#ea3d80" />
        <circle cx="280" cy="1" r="11" fill="#f45b95" fillOpacity="0.14" />
      </svg>
      <div className="result-curve-labels">
        <span>сейчас</span>
        <span>2 нед</span>
        <span>4+ нед</span>
      </div>
    </div>
  );
}

type ResultScreenProps = {
  name: string;
  answers: Answers;
  result: Result;
  onNext: () => void;
};

export function ResultScreen({ name, answers, result, onNext }: ResultScreenProps) {
  const currentWeight = getNumberAnswer(answers, 'currentWeight');
  const targetWeight = getNumberAnswer(answers, 'targetWeight');
  const zones = result.zoneLabels.length ? result.zoneLabels : getArrayAnswer(answers, 'problemZones');
  const marker = Math.max(0, Math.min(100, ((result.bmi - 16) / 19) * 100));
  const trainingTime = answerLabels[getStringAnswer(answers, 'trainingTime') ?? ''];
  const primaryZone = zones[0];
  const targetBelowCurrent = Boolean(currentWeight && targetWeight && targetWeight < currentWeight);

  const zonesDisplay = zones.length > 3
    ? zones.slice(0, 3).join(', ') + ` и ещё ${zones.length - 3}`
    : zones.join(', ');

  const summary = [
    ['Цель', result.goalLabel],
    ['Зоны', zonesDisplay],
    ['Возраст', answerLabels[getStringAnswer(answers, 'age') ?? ''] ?? 'не указан'],
    ['Время на тренировку', answerLabels[getStringAnswer(answers, 'trainingTime') ?? ''] ?? 'не указано'],
    ['Частота', answerLabels[getStringAnswer(answers, 'frequency') ?? ''] ?? 'не указана'],
    ['Нагрузка', answerLabels[getStringAnswer(answers, 'stairsTest') ?? ''] ?? 'не указана'],
    ['Стресс и питание', answerLabels[getStringAnswer(answers, 'stressEating') ?? ''] ?? 'не указано'],
  ];
  const heroChips = [
    result.goalLabel ? `цель: ${result.goalLabel}` : '',
    trainingTime,
    primaryZone ? `фокус: ${primaryZone}` : '',
  ].filter(Boolean);

  return (
    <section className="screen result-screen">
      <div className="result-hero-card">
        <span className="soft-badge">План собран под ваши ответы</span>
        <h1>
          {name}, первые изменения вы заметите уже в <span className="result-title-accent">первую</span> неделю
        </h1>
        {heroChips.length ? (
          <div className="result-chips" aria-label="Ключевые параметры плана">
            {heroChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        ) : null}
        <p className="subtitle">{result.forecast}</p>
        <ProgressCurve />
        <p className="result-curve-disclaimer">
          Ориентир динамики при регулярных тренировках и питании без жёстких ограничений.
        </p>
        <button className="primary-button result-hero-cta" type="button" onClick={onNext}>
          Посмотреть подписку
        </button>
      </div>

      <div className="weight-visual">
        <div className="weight-card">
          <span>сейчас</span>
          <strong>{currentWeight || 'не указан'} кг</strong>
        </div>
        <div className="weight-change" aria-hidden="true">
          <span />
        </div>
        <div className="weight-card">
          <span>комфортный ориентир</span>
          <strong>{targetWeight || 'не указан'} кг</strong>
        </div>
        {result.isLowBmi && targetBelowCurrent ? (
          <p className="weight-note">Ориентир можно обсудить с тренером и корректировать по самочувствию.</p>
        ) : null}
      </div>

      <div className="result-main-grid">
        <div className="summary-panel">
          <h2>Сводка ваших ответов</h2>
          <div className="summary-grid">
            {summary.map(([label, value]) => (
              <div className="summary-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="calorie-panel">
          <h2>Норма калорий и КБЖУ</h2>
          <div className="bmi-card">
            <span>Индекс массы тела</span>
            <strong>{result.bmi}</strong>
            <small>{result.bmiLabel}</small>
            <div className="bmi-scale">
              <div className="bmi-scale-track">
                <span className="bmi-marker" style={{ left: `${marker}%` }} />
              </div>
              <div className="bmi-scale-labels">
                <span>ниже</span>
                <span>норма</span>
                <span>выше</span>
              </div>
            </div>
          </div>
          <div className="metrics">
            <div>
              <span>Калории</span>
              <strong>{result.calories}</strong>
              <small>ккал в день</small>
            </div>
            <div>
              <span>Белки</span>
              <strong>{result.macros.protein} г</strong>
            </div>
            <div>
              <span>Жиры</span>
              <strong>{result.macros.fat} г</strong>
            </div>
            <div>
              <span>Углеводы</span>
              <strong>{result.macros.carbs} г</strong>
            </div>
          </div>
          <p className="calorie-note">
            Это мягкий ориентир для старта. Его можно корректировать по самочувствию, регулярности и обратной связи.
          </p>
        </div>
      </div>

      <div className="program-match">
        <h2>Подборка программ из подписки под вашу цель</h2>
        <p className="program-match-intro">Мы подобрали программы под вашу цель и зоны внимания.</p>
        <div className="program-match-grid">
          {result.programs.map((program) => (
            <article className="matched-program" key={program.key}>
              <span className="program-emoji" aria-hidden="true">{PROGRAM_ICONS[program.key] ?? '⭐'}</span>
              <span>{program.tag}</span>
              <h3>{program.title}</h3>
              <p>{programDescription(program.key, program.description, result.isLowBmi)}</p>
              <small>{programReason(program.key, result)}</small>
            </article>
          ))}
        </div>
      </div>

      <button className="primary-button sticky-action" type="button" onClick={onNext}>
        Посмотреть подписку
      </button>
    </section>

  );
}

function programDescription(programKey: string, fallback: string, isLowBmi: boolean): string {
  if (!isLowBmi) return fallback;

  if (programKey === 'slim') {
    return 'Подходит, если нужен понятный режим, мягкая регулярность и спокойная система без жёстких ограничений.';
  }
  if (programKey === 'nutrition') {
    return 'Помогает собрать рацион под энергию, восстановление и привычный режим без запретов.';
  }
  if (programKey === 'belly') {
    return 'Бережный акцент на глубокие мышцы пресса, осанку и более собранную линию корпуса.';
  }
  return fallback;
}

function programReason(programKey: string, result: Result): string {
  if (result.isLowBmi) {
    if (programKey === 'nutrition') return 'Поможет держать питание регулярным без жёстких ограничений.';
    if (programKey === 'method') return 'Подходит для мягкого входа, техники и стабильной регулярности.';
    return 'Добавляет тонус и форму без фокуса на резкое изменение веса.';
  }

  if (programKey === 'belly') return 'Выбрана для фокуса на живот, осанку и глубокий пресс.';
  if (programKey === 'slim') return 'Подходит для постепенной стройности и понятной системы.';
  if (programKey === 'glutes') return 'Усиливает работу с тонусом нижней части тела.';
  if (programKey === 'nutrition') return 'Помогает собрать рацион под расчёт и привычный режим.';
  return `Хорошая база для формата «${result.resultType}».`;
}
