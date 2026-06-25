export type Option = {
  id: string;
  label: string;
  helper?: string;
};

export type QuestionScreenData = {
  id: number;
  type: 'question';
  answerKey: string;
  mode: 'single' | 'multi' | 'input';
  title: string;
  subtitle?: string;
  offer?: string;
  legalNote?: boolean;
  options?: Option[];
  input?: {
    kind: 'number';
    label: string;
    placeholder: string;
    min: number;
    max: number;
    unit: string;
  };
  autoNext?: boolean;
};

export type TransitionScreenData = {
  id: number;
  type: 'transition';
  title: string;
  subtitle?: string;
  quote?: string;
  points?: string[];
  cta: string;
  tone?: 'trust' | 'promise' | 'nutrition' | 'final';
  visual?: 'body-zones' | 'review' | 'nutrition-chat' | 'community' | 'before-after';
};

export type LoaderScreenData = {
  id: number;
  type: 'loader';
  title: string;
  steps: string[];
  durationMs: number;
};

export type SpecialScreenData = {
  id: number;
  type: 'lead' | 'result' | 'paywall';
};

export type QuizScreenData =
  | QuestionScreenData
  | TransitionScreenData
  | LoaderScreenData
  | SpecialScreenData;

export const quizScreens: QuizScreenData[] = [
  {
    id: 1,
    type: 'question',
    answerKey: 'problemZones',
    mode: 'multi',
    offer: 'Что мешает вам похудеть? Давайте разберёмся за минуту',
    title: 'Что беспокоит вас в теле больше всего?',
    subtitle: 'Отметьте всё, что про вас. План сделаем с упором именно на это.',
    legalNote: true,
    options: [
      { id: 'excess-weight', label: 'Лишний вес' },
      { id: 'belly-sides', label: 'Живот и бока' },
      { id: 'loose-body', label: 'Ушла упругость, тело дряблое' },
      { id: 'cellulite', label: 'Целлюлит' },
      { id: 'low-energy', label: 'Мало сил и энергии' },
      { id: 'back-posture', label: 'Спина и осанка' },
    ],
  },
  {
    id: 2,
    type: 'question',
    answerKey: 'goal',
    mode: 'single',
    autoNext: true,
    title: 'Какая ваша главная цель?',
    subtitle: 'С неё начнём собирать программу.',
    options: [
      { id: 'lose-weight', label: 'Похудеть' },
      { id: 'belly', label: 'Убрать живот' },
      { id: 'tone', label: 'Подтянуть тело' },
      { id: 'energy', label: 'Вернуть энергию и лёгкость' },
      { id: 'reflection', label: 'Полюбить своё отражение' },
    ],
  },
  {
    id: 3,
    type: 'question',
    answerKey: 'age',
    mode: 'single',
    autoNext: true,
    title: 'Сколько вам лет?',
    subtitle: 'Под ваш возраст подберём посильную нагрузку.',
    options: [
      { id: '18-29', label: '18-29' },
      { id: '30-39', label: '30-39' },
      { id: '40-49', label: '40-49' },
      { id: '50-59', label: '50-59' },
      { id: '60-plus', label: '60 и старше' },
    ],
  },
  {
    id: 4,
    type: 'question',
    answerKey: 'pastShape',
    mode: 'single',
    autoNext: true,
    title: 'Когда вы в последний раз нравились себе в зеркале?',
    subtitle: 'Вернём это ощущение. Честный ответ поможет точнее.',
    options: [
      { id: 'now-better', label: 'Прямо сейчас, хочу лучше' },
      { id: 'under-year', label: 'Меньше года назад' },
      { id: 'one-two-years', label: '1-2 года назад' },
      { id: 'over-three-years', label: 'Больше 3 лет назад' },
      { id: 'long-ago', label: 'Давно, хочу это вернуть' },
    ],
  },
  {
    id: 5,
    type: 'transition',
    tone: 'promise',
    visual: 'body-zones',
    title: 'Ваш план уже складывается',
    subtitle:
      'Мягкие тренировки по 15 минут на проблемные зоны: живот, бёдра, руки. Без жёстких диет и насилия над собой.',
    cta: 'Продолжить',
  },
  {
    id: 6,
    type: 'question',
    answerKey: 'weightFluctuations',
    mode: 'single',
    autoNext: true,
    title: 'Как ведёт себя ваш вес?',
    subtitle: 'Это подскажет, как настроить питание, чтобы вес не возвращался.',
    options: [
      { id: 'hard-to-lose', label: 'Набираю быстро, скидываю тяжело' },
      { id: 'easy-up-down', label: 'Набираю и скидываю легко' },
      { id: 'stuck', label: 'Вес стоит, что бы я ни делала' },
      { id: 'creeping-up', label: 'Постепенно ползёт вверх' },
    ],
  },
  {
    id: 7,
    type: 'question',
    answerKey: 'stairsTest',
    mode: 'single',
    autoNext: true,
    title: 'Что вы чувствуете, поднимаясь по лестнице?',
    subtitle: 'Маленький тест, чтобы подобрать стартовую нагрузку без перегруза.',
    options: [
      { id: 'hard-breath', label: 'Задыхаюсь, тяжело' },
      { id: 'slightly-tired', label: 'Немного устаю, но в норме' },
      { id: 'easy', label: 'Поднимаюсь легко' },
    ],
  },
  {
    id: 8,
    type: 'question',
    answerKey: 'steps',
    mode: 'single',
    autoNext: true,
    title: 'Сколько шагов в день вы проходите?',
    subtitle: 'Прикиньте примерно, точность не нужна.',
    options: [
      { id: 'under-3000', label: 'Меньше 3 тысяч' },
      { id: '3000-6000', label: '3-6 тысяч' },
      { id: '6000-10000', label: '6-10 тысяч' },
      { id: 'over-10000', label: 'Больше 10 тысяч' },
      { id: 'not-counting', label: 'Не считаю' },
    ],
  },
  {
    id: 9,
    type: 'question',
    answerKey: 'stressEating',
    mode: 'single',
    autoNext: true,
    title: 'Как часто вы переедаете из-за стресса?',
    subtitle: 'С этим работает помощник по питанию, подскажет, что делать в момент.',
    options: [
      { id: 'daily', label: 'Почти каждый день' },
      { id: 'weekly', label: 'Пару раз в неделю' },
      { id: 'rarely', label: 'Редко' },
      { id: 'never', label: 'Почти никогда' },
    ],
  },
  {
    id: 10,
    type: 'transition',
    tone: 'trust',
    visual: 'review',
    title: 'Девочки уже меняются',
    quote:
      '«За полтора месяца ушло 6 кг, и впервые застегнула джинсы, которые лежали два года. Тренировки короткие, я успеваю даже с двумя детьми».',
    cta: 'Продолжить',
  },
  {
    id: 11,
    type: 'question',
    answerKey: 'energy',
    mode: 'single',
    autoNext: true,
    title: 'Сколько у вас сил к вечеру?',
    subtitle: 'Тренировки в плане дадут энергию, а не отнимут её.',
    options: [
      { id: 'exhausted', label: 'Падаю без сил' },
      { id: 'home-sofa', label: 'Хватает только на дом и диван' },
      { id: 'want-more', label: 'Нормально, но хочется больше' },
      { id: 'enough', label: 'Энергии достаточно' },
    ],
  },
  {
    id: 12,
    type: 'question',
    answerKey: 'height',
    mode: 'input',
    title: 'Какой у вас рост?',
    subtitle: 'Поможет рассчитать норму под вас.',
    input: {
      kind: 'number',
      label: 'Рост',
      placeholder: 'Введите рост',
      min: 130,
      max: 220,
      unit: 'см',
    },
  },
  {
    id: 13,
    type: 'question',
    answerKey: 'currentWeight',
    mode: 'input',
    title: 'Какой у вас сейчас вес?',
    subtitle: 'Это просто точка отсчёта для расчётов.',
    input: {
      kind: 'number',
      label: 'Текущий вес',
      placeholder: 'Введите вес',
      min: 35,
      max: 180,
      unit: 'кг',
    },
  },
  {
    id: 14,
    type: 'question',
    answerKey: 'targetWeight',
    mode: 'input',
    title: 'Какой вес был для вас самым комфортным?',
    subtitle: 'Вернуть привычный вес легче, чем гнаться за идеалом из картинок.',
    input: {
      kind: 'number',
      label: 'Комфортный вес',
      placeholder: 'Введите комфортный вес',
      min: 35,
      max: 180,
      unit: 'кг',
    },
  },
  {
    id: 15,
    type: 'transition',
    tone: 'nutrition',
    visual: 'nutrition-chat',
    title: 'Личный помощник по питанию в телефоне',
    subtitle:
      'Спросите что угодно про еду, он ответит простым языком и подскажет, что съесть, чтобы вес пошёл вниз.',
    points: [
      'Ответит, что съесть в кафе или на праздник',
      'Разберёт ваши анализы понятными словами',
      'Подскажет, почему вес стоит на месте',
    ],
    cta: 'Продолжить',
  },
  {
    id: 16,
    type: 'transition',
    tone: 'trust',
    visual: 'community',
    title: 'Вы не одна на этом пути',
    subtitle:
      'Тысячи женщин с такой же целью, как у вас, уже худеют с Катей. Одной удержаться тяжело. С планом под вас и поддержкой дойти намного легче.',
    cta: 'Продолжить',
  },
  {
    id: 17,
    type: 'question',
    answerKey: 'trainingTime',
    mode: 'single',
    autoNext: true,
    title: 'Сколько времени реально есть на тренировку?',
    subtitle: 'Бессмысленно планировать час, если у вас 15 минут. Это путь к срывам.',
    options: [
      { id: 'under-15', label: 'До 15 минут' },
      { id: '15-30', label: '15-30 минут' },
      { id: '30-45', label: '30-45 минут' },
      { id: '45-plus', label: '45 минут и больше' },
    ],
  },
  {
    id: 18,
    type: 'question',
    answerKey: 'frequency',
    mode: 'single',
    autoNext: true,
    title: 'Сколько раз в неделю готовы заниматься?',
    subtitle: 'Чем честнее, тем реальнее план и тем выше шанс дойти.',
    options: [
      { id: '1-2', label: '1-2 раза' },
      { id: '3', label: '3 раза' },
      { id: '4-5', label: '4-5 раз' },
      { id: 'daily-training', label: 'Каждый день' },
    ],
  },
  {
    id: 19,
    type: 'question',
    answerKey: 'deadline',
    mode: 'single',
    autoNext: true,
    title: 'Есть ли событие, к которому хотите прийти в форму?',
    subtitle: 'Если дата есть, рассчитаем темп так, чтобы вы успели.',
    options: [
      { id: 'vacation', label: 'Отпуск или море' },
      { id: 'wedding', label: 'Свадьба или праздник' },
      { id: 'photoshoot', label: 'Встреча, фотосессия' },
      { id: 'faster', label: 'Просто хочу быстрее' },
      { id: 'no-date', label: 'Конкретной даты нет' },
    ],
  },
  {
    id: 20,
    type: 'loader',
    title: 'Анализируем ваши ответы',
    steps: [
      'Анализируем ваши ответы',
      'Собираем программу под вашу цель',
      'Готовим план питания без диет',
    ],
    durationMs: 1800,
  },
  {
    id: 21,
    type: 'lead',
  },
  {
    id: 22,
    type: 'transition',
    tone: 'final',
    visual: 'before-after',
    title: 'Всё готово.\nВот ваш результат',
    cta: 'Показать мой результат',
  },
  {
    id: 23,
    type: 'result',
  },
  {
    id: 24,
    type: 'paywall',
  },
];
