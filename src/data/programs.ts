export type ProgramKey =
  | 'method'
  | 'slim'
  | 'glutes'
  | 'belly'
  | 'nutrition'
  | 'recovery';

export type Program = {
  key: ProgramKey;
  title: string;
  tag: string;
  description: string;
  goals: string[];
  zones: string[];
};

export const programs: Program[] = [
  {
    key: 'method',
    title: 'Метод Усмановой',
    tag: 'Старт',
    description:
      'База техники, регулярности и мягкого входа в тренировки без перегруза.',
    goals: ['tone', 'lose-weight', 'energy', 'reflection'],
    zones: ['loose-body', 'low-energy', 'back-posture', 'excess-weight'],
  },
  {
    key: 'slim',
    title: 'Марафон стройности',
    tag: 'Стройность',
    description:
      'Подходит, если цель связана со снижением веса, тонусом и понятной системой.',
    goals: ['lose-weight', 'tone'],
    zones: ['excess-weight', 'belly-sides', 'loose-body', 'cellulite'],
  },
  {
    key: 'glutes',
    title: 'Упругая попа',
    tag: 'Ягодицы',
    description:
      'Фокус на ягодицы и нижнюю часть тела с постепенным ростом нагрузки.',
    goals: ['tone', 'reflection'],
    zones: ['cellulite', 'loose-body'],
  },
  {
    key: 'belly',
    title: 'Плоский живот',
    tag: 'Живот',
    description:
      'Акцент на глубокие мышцы пресса, осанку и более подтянутую линию живота.',
    goals: ['belly', 'lose-weight'],
    zones: ['belly-sides', 'excess-weight'],
  },
  {
    key: 'nutrition',
    title: 'Питание без запретов',
    tag: 'Питание',
    description:
      'Помогает собрать рацион под цель, калории и привычный режим без жёстких диет.',
    goals: ['lose-weight', 'belly', 'energy'],
    zones: ['excess-weight', 'low-energy'],
  },
  {
    key: 'recovery',
    title: 'Восстановление после родов',
    tag: 'Мягкий режим',
    description:
      'Бережный формат для возвращения к нагрузкам с вниманием к животу и самочувствию.',
    goals: ['tone', 'reflection'],
    zones: ['belly-sides', 'back-posture', 'loose-body'],
  },
];
