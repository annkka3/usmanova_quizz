# Usmanova Quiz Funnel

Локальный прототип 24-экранной квиз-воронки для подписки программ Екатерины Усмановой.

Проект создан отдельно от `usmanova-landing`:

`/Users/annagromyko/Applications/usmanova-quiz-funnel`

## Стек

- Vite
- React
- TypeScript
- Обычный CSS
- Без роутера, Tailwind, Framer Motion и тяжёлых UI-библиотек
- Локальное сохранение лидов через `localStorage` до переноса в таблицу Chatium

## Команды

```bash
npm install
npm run dev
npm run build
```

## Что реализовано

- 24 экрана квиз-воронки по ТЗ.
- Sticky progress bar только в процентах.
- Верхняя бренд-шапка с логотипом «Усманова Фит» без меню и переключателей.
- Первый экран оформлен как premium hero quiz: оффер, визуал тренера, вертикальные карточки ответов.
- Multi-select на экране 1 с активной кнопкой только после выбора.
- Single-choice экраны с автоматическим переходом после выбора.
- Input-экраны с валидацией роста, текущего веса и комфортного веса.
- Лид-гейт на экране 21: имя, электронная почта, обязательное согласие.
- Сохранение лида в `localStorage` под ключом `usmanova_quiz_leads`.
- Финальный лоадер, персональный результат и пейволл.
- Расчёт индекса массы тела, калорий и КБЖУ по формуле Миффлина-Сан Жеора для женщины.
- Подбор программ подписки по цели и зонам внимания.
- Пейволл с тарифами, блоком доверия, блоком «до и после», частыми вопросами, юридическими ссылками и местом под форму ГетКурса.

## Визуальные заглушки

Локальные лёгкие SVG-заглушки лежат в:

- `src/assets/hero/katya-hero.webp` — фото героя Кати на первом экране, оптимизированное из переданного файла.
- `src/assets/placeholders/katya-hero-placeholder.svg` — запасная временная SVG-заглушка.
- `src/assets/placeholders/before-after-placeholder.svg` — временный визуал «точка старта» и «комфортная форма».
- `src/assets/brand/usmanova-fit-logo.png` — оптимизированный логотип «Усманова Фит» с прозрачным фоном.
- `src/assets/brand/usmanova-fit-mark.svg` — запасной брендовый знак.

Где заменить:

- Логотип: `src/components/QuizLayout.tsx`, импорт `usmanova-fit-logo.png`.
- Фото Кати: `src/components/QuestionScreen.tsx`, импорт `katya-hero.webp`.
- Визуал «до и после»: `src/components/PaywallScreen.tsx`, импорт `before-after-placeholder.svg`.
- Отзывы: `src/components/PaywallScreen.tsx`, блок `reviews-panel`; экран 10 в `src/data/quizScreens.ts`.

## GetCourse integration

- В PaywallScreen подключён существующий GetCourse Lite Widget id=1605665.
- Виджет вставляется через компонент `GetCourseEmbed.tsx`.
- Наш paywall сохраняет тарифные карточки по ТЗ (390 ₽ / 7 дней, 1490 ₽ / 1 месяц, 4990 ₽ / 6 месяцев).
- Кнопки тарифов скроллят к блоку оформления заказа GetCourse.
- Форма GetCourse может запрашивать телефон, так как это текущая настройка формы в аккаунте проекта.
- В текущем GetCourse-виджете доступны те тарифы, которые настроены на стороне GetCourse.
- Если будет создан отдельный тариф 390 ₽ / 7 дней или отдельные checkout-ссылки, их можно подключить позже без изменения логики квиза.

## LocalStorage

Ключ:

```text
usmanova_quiz_leads
```

Сохраняемые поля:

- `name`
- `email`
- `answers`
- `height`
- `currentWeight`
- `targetWeight`
- `goal`
- `problemZones`
- `resultType`
- `calories`
- `macros`
- `bmi`
- `utm`
- `consentAccepted`
- `createdAt`

## Важные ограничения

- Интерфейс mobile-first.
- Основные проверки: 360, 390, 430 px без horizontal overflow.
- Пользовательские тексты на «вы».
- В интерфейсе не используются таймеры, искусственный дефицит мест и неподтверждённые обещания.
