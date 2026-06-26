export type Tariff = {
  title: string;
  badge?: string;
  highlight?: boolean;
  price: string;
  oldPrice: string;
  period: string;
  note: string;
  features: string[];
};

export const tariffs: Tariff[] = [
  {
    title: 'Лёгкий старт',
    price: '390 руб',
    oldPrice: '590 руб',
    period: '7 дней',
    note: 'Дальше автопродление 1490 руб в месяц',
    features: ['Доступ к подборке программ', 'Питание под цель', 'Подходит для знакомства'],
  },
  {
    title: 'Популярно',
    badge: 'Чаще выбирают',
    price: '1490 руб',
    oldPrice: '2990 руб',
    period: '1 месяц',
    note: 'Оптимально, чтобы войти в режим и увидеть динамику',
    features: ['Все программы подписки', 'Рекомендации по питанию', 'План на месяц'],
  },
  {
    title: 'Хит продаж',
    badge: 'Максимум выгоды',
    highlight: true,
    price: '4990 руб',
    oldPrice: '9990 руб',
    period: '6 месяцев',
    note: 'Для спокойной системной работы без спешки',
    features: ['Все программы подписки', 'Долгий доступ', 'Удобно для плавного прогресса'],
  },
];
