import { useEffect, useMemo, useRef, useState } from 'react';
import usmanovaLogo from '../assets/brand/usmanova-fit-logo.png';
import katyaHero from '../assets/hero/katya-hero.webp';
import type { QuestionScreenData } from '../data/quizScreens';
import { legalLinkItems } from '../data/legalLinks';
import { validateNumber } from '../logic/validation';

type QuestionValue = string | string[] | number | undefined;

type QuestionScreenProps = {
  screen: QuestionScreenData;
  value: QuestionValue;
  onChange: (value: QuestionValue) => void;
  onNext: () => void;
};

const MICRO_AFFIRMATIONS: Record<string, string> = {
  'lose-weight': 'Начнём с реалистичного темпа.',
  belly: 'Учтём это при подборе упражнений.',
  tone: 'Добавим силовые элементы.',
  energy: 'Тренировки, которые заряжают, не выматывают.',
  reflection: 'Это важнее, чем кажется.',
  '18-29': 'Отличная база для быстрого результата.',
  '30-39': 'Хороший возраст для стабильного прогресса.',
  '40-49': 'После 40 тело отлично реагирует на регулярность.',
  '50-59': 'Подберём нагрузку, которая подходит вам.',
  '60-plus': 'Мягкий старт без перегруза.',
  'hard-to-lose': 'Поможем настроить питание под вас.',
  'easy-up-down': 'Ваш тип легко поддаётся коррекции.',
  stuck: 'Найдём, что мешает, и исправим это.',
  'creeping-up': 'Остановить это проще, чем кажется.',
  'hard-breath': 'Начнём осторожно. Это правильный подход.',
  'slightly-tired': 'Хорошая база. Есть куда расти.',
  easy: 'Отлично! Можно добавить нагрузку.',
  exhausted: 'Это изменится с первых тренировок.',
  'home-sofa': 'Регулярность важнее интенсивности.',
  'want-more': 'Значит, ресурс есть.',
  enough: 'Добавим нагрузку под ваш уровень.',
  daily: 'Помощник по питанию поможет в такие моменты.',
  weekly: 'Найдём стратегию для таких дней.',
  rarely: 'Питание будет вашим союзником.',
  never: 'Отлично! Уже преимущество.',
  'under-15': 'Даже 15 минут дают результат при регулярности.',
  '15-30': 'Достаточно для заметных изменений.',
  '30-45': 'Хорошее время для полноценной работы.',
  '45-plus': 'Серьёзный подход. Используем это.',
  '1-2': 'Постоянство важнее частоты.',
  '3': 'Три раза в неделю — оптимально.',
  '4-5': 'Хорошая частота для прогресса.',
  'daily-training': 'Подберём разнообразие, чтобы не было монотонно.',
  vacation: 'Рассчитаем темп под вашу дату.',
  wedding: 'Подберём программу с нужным сроком.',
  photoshoot: 'Поможем прийти в форму к нужному дню.',
  faster: 'Ускорим безопасно.',
  'no-date': 'Построим план без давления сроков.',
};

export function QuestionScreen({ screen, value, onChange, onNext }: QuestionScreenProps) {
  const [inputValue, setInputValue] = useState(value ? String(value) : '');
  const [error, setError] = useState('');
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const autoNextTimer = useRef<number | null>(null);

  const selectedValues = useMemo(() => {
    return Array.isArray(value) ? value : [];
  }, [value]);

  useEffect(() => {
    if (screen.mode === 'input') {
      setInputValue(value ? String(value) : '');
    }
    setError('');
    setAffirmation(null);

    if (autoNextTimer.current) {
      window.clearTimeout(autoNextTimer.current);
      autoNextTimer.current = null;
    }
  }, [screen.id, screen.mode]);

  useEffect(() => {
    return () => {
      if (autoNextTimer.current) {
        window.clearTimeout(autoNextTimer.current);
      }
    };
  }, []);

  function selectOption(id: string) {
    setError('');

    if (screen.mode === 'multi') {
      const next = selectedValues.includes(id)
        ? selectedValues.filter((item) => item !== id)
        : [...selectedValues, id];
      onChange(next);
      return;
    }

    onChange(id);

    if (screen.mode === 'single' && screen.autoNext && value !== id) {
      if (autoNextTimer.current) {
        window.clearTimeout(autoNextTimer.current);
      }
      const affirmText = MICRO_AFFIRMATIONS[id] ?? null;
      setAffirmation(affirmText);
      const delay = affirmText ? 560 : 420;
      autoNextTimer.current = window.setTimeout(() => {
        autoNextTimer.current = null;
        setAffirmation(null);
        onNext();
      }, delay);
    }
  }

  function submitInput() {
    if (!screen.input) return;
    const result = validateNumber(inputValue, screen.input.min, screen.input.max, screen.input.label);

    if (!result.valid) {
      setError(result.error ?? 'Проверьте значение');
      return;
    }

    onChange(Number(inputValue.replace(',', '.')));
    onNext();
  }

  const canContinue =
    screen.mode === 'multi'
      ? selectedValues.length > 0
      : screen.mode === 'input'
        ? inputValue.trim().length > 0
        : Boolean(value);

  const isHeroScreen = screen.id === 1;
  const isInputScreen = !isHeroScreen && screen.mode === 'input';
  const isStandardQuestionScreen = !isHeroScreen && screen.mode !== 'input';
  const heroOfferLines = ['Что мешает вам', 'похудеть?', 'Давайте разберемся', 'за минуту.'];

  return (
    <section
      className={`screen question-screen${isHeroScreen ? ' hero-question-screen' : ''}${
        isStandardQuestionScreen ? ' standard-question-screen' : ''
      }${isInputScreen ? ' input-question-screen' : ''
      }`}
    >
      {isHeroScreen ? (
        <div className="hero-main-grid">
          <div className="hero-intro-panel">
            <header className="hero-brand-header" aria-label="УСМАНОВА ФИТ">
              <img className="brand-logo-image" src={usmanovaLogo} alt="УСМАНОВА ФИТ" />
            </header>
            {screen.offer ? (
              <div className="start-offer">
                <strong>
                  {heroOfferLines.map((line) => (
                    <span className="offer-line" key={line}>
                      {line}
                    </span>
                  ))}
                </strong>
              </div>
            ) : null}
            <div className="hero-person-visual" aria-label="Визуальный образ тренера">
              <img src={katyaHero} alt="" />
            </div>
          </div>

          <div className="hero-answer-stack">
            <div className="screen-heading">
              <h1>{screen.title}</h1>
              {screen.subtitle ? <p className="subtitle">{screen.subtitle}</p> : null}
            </div>

            <div className="answer-list" role={screen.mode === 'multi' ? 'group' : 'radiogroup'}>
              {screen.options?.map((option) => {
                const isSelected =
                  screen.mode === 'multi' ? selectedValues.includes(option.id) : value === option.id;

                return (
                  <button
                    className={`answer-card${isSelected ? ' is-selected' : ''}`}
                    key={option.id}
                    type="button"
                    onClick={() => selectOption(option.id)}
                    aria-pressed={isSelected}
                  >
                    <span>{option.label}</span>
                    {option.helper ? <small>{option.helper}</small> : null}
                  </button>
                );
              })}
            </div>

            {screen.legalNote ? (
              <p className="start-legal">
                Мы бережно относимся к вашей личной информации. Продолжая, вы подтверждаете, что ознакомились с документами:
                {' '}
                {legalLinkItems.map((item, index) => (
                  <span key={item.href}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      «{item.label}»
                    </a>
                    {index < legalLinkItems.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </p>
            ) : null}
            <button
              className="primary-button sticky-action"
              type="button"
              disabled={!canContinue}
              onClick={onNext}
            >
              Продолжить
            </button>
          </div>
        </div>
      ) : (
        <>
          {screen.offer ? (
            <div className="start-offer">
              <div>
                <strong>{screen.offer}</strong>
              </div>
            </div>
          ) : null}

          <div className="screen-heading">
            <h1>{screen.title}</h1>
            {screen.subtitle ? <p className="subtitle">{screen.subtitle}</p> : null}
          </div>

      {screen.mode === 'input' && screen.input ? (
        <div className="input-group">
          <label htmlFor={`input-${screen.id}`}>{screen.input.label}</label>
          <div className="input-row">
            <input
              id={`input-${screen.id}`}
              type="number"
              inputMode="decimal"
              min={screen.input.min}
              max={screen.input.max}
              placeholder={screen.input.placeholder}
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                setError('');
              }}
            />
            <span>{screen.input.unit}</span>
          </div>
          {error ? <p className="field-error">{error}</p> : null}
          <button className="primary-button sticky-action" type="button" onClick={submitInput}>
            Продолжить
          </button>
        </div>
      ) : (
        <>
          <div className="answer-list" role={screen.mode === 'multi' ? 'group' : 'radiogroup'}>
            {screen.options?.map((option) => {
              const isSelected =
                screen.mode === 'multi' ? selectedValues.includes(option.id) : value === option.id;

              return (
                <button
                  className={`answer-card${isSelected ? ' is-selected' : ''}`}
                  key={option.id}
                  type="button"
                  onClick={() => selectOption(option.id)}
                  aria-pressed={isSelected}
                >
                  <span>{option.label}</span>
                  {option.helper ? <small>{option.helper}</small> : null}
                </button>
              );
            })}
          </div>

          {affirmation ? (
            <p className="micro-affirmation" role="status" aria-live="polite">
              {affirmation}
            </p>
          ) : null}

          {screen.mode === 'multi' ? (
            <>
            {screen.legalNote ? (
              <p className="start-legal">
                Мы бережно относимся к вашей личной информации. Продолжая, вы подтверждаете, что ознакомились с документами:
                {' '}
                {legalLinkItems.map((item, index) => (
                  <span key={item.href}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      «{item.label}»
                    </a>
                    {index < legalLinkItems.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </p>
            ) : null}
            <button
              className="primary-button sticky-action"
              type="button"
              disabled={!canContinue}
              onClick={onNext}
            >
              Продолжить
            </button>
            </>
          ) : null}
        </>
      )}
        </>
      )}
    </section>
  );
}
