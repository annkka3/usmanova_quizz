# Chatium Porting Notes

## Что переносить

Основные файлы:

- `src/App.tsx`
- `src/components/*`
- `src/data/quizScreens.ts`
- `src/data/programs.ts`
- `src/data/tariffs.ts`
- `src/data/legalLinks.ts`
- `src/logic/calories.ts`
- `src/logic/resultLogic.ts`
- `src/logic/validation.ts`
- `src/logic/utm.ts`
- `src/styles.css`
- `src/assets/placeholders/*`
- `src/assets/brand/*`

## Где заменить localStorage на таблицу Chatium

Локальная запись лида находится в `src/App.tsx`, функция `saveLead`.

Сейчас запись добавляется в:

```ts
window.localStorage.setItem('usmanova_quiz_leads', JSON.stringify([...currentLeads, record]));
```

В Chatium этот участок нужно заменить на запись в отдельную таблицу лидов, которую создают для проекта.

## Какие поля сохранять

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

## GetCourse integration

- В PaywallScreen подключён существующий GetCourse Lite Widget id=1605665.
- Виджет вставляется через компонент `src/components/GetCourseEmbed.tsx`.
- Наш paywall сохраняет тарифные карточки по ТЗ.
- Кнопки тарифов скроллят к блоку оформления заказа GetCourse (`id="getcourse-section"`).
- Форма GetCourse может запрашивать телефон, так как это текущая настройка формы в аккаунте проекта.
- В текущем GetCourse-виджете доступны те тарифы, которые настроены на стороне GetCourse.
- Если будет создан отдельный тариф 390 ₽ / 7 дней или отдельные checkout-ссылки, их можно подключить позже без изменения логики квиза.
- Скрипт не дублируется при повторном переходе на экран — проверяется наличие элемента с `id=GC_SCRIPT_ID` перед вставкой.

## Где заменить визуальные материалы

- Актуальное фото героя на первом экране: `src/assets/hero/katya-hero.webp`.
- Запасная SVG-заглушка: `src/assets/placeholders/katya-hero-placeholder.svg`.
- Визуал «до и после»: `src/assets/placeholders/before-after-placeholder.svg`.
- Логотип в шапке: `src/assets/brand/usmanova-fit-logo.png`, подключение в `src/components/QuizLayout.tsx`.
- Отзыв на экране 10: `src/data/quizScreens.ts`, экран `id: 10`.
- Отзывы в пейволле: `src/components/PaywallScreen.tsx`, блок `reviews-panel`.

## Chatium single-file export

Для Chatium подготовлен отдельный архив:
`usmanova-quiz-funnel-chatium-single.zip`

Внутри один файл `index.html`. CSS, JS и локальные изображения встроены внутрь файла, чтобы избежать 404 на assets внутри Chatium.

Обычный `clean.zip` — это исходники проекта.
Обычный `dist.zip` может не подойти для Chatium, если платформа не раздаёт вложенные assets как статическую папку.

Пересобрать single-file HTML можно командой:
```bash
node scripts/build-chatium-single.mjs
```

## Что проверить после импорта

- Все 24 экрана проходят в правильном порядке.
- Progress bar показывает только проценты.
- Single-choice экраны переходят дальше автоматически.
- Multi-select не пропускает дальше без выбора.
- Input-экраны валидируют диапазоны.
- Лид-гейт не пропускает без имени, почты и согласия.
- Запись лида создаётся в таблице Chatium.
- UTM-метки попадают в запись.
- Результат строится после сохранения лида.
- Пейволл показывает тарифы, частые вопросы, юридические ссылки и форму ГетКурса.
- На 360, 390 и 430 px нет горизонтального скролла.
- Первый экран не перегружен на мобильном и карточки ответов остаются удобными для нажатия.
- Визуальные заглушки заменены на утверждённые материалы Виктории, если они уже переданы.
