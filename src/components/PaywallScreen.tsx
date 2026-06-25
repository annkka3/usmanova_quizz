import { legalLinkItems } from '../data/legalLinks';
import { tariffs } from '../data/tariffs';
import katyaPaywallImage from '../assets/paywall/katya-paywall.png';
import beforeAfterFinal from '../assets/final/before-after-final.jpg';
import review1 from '../assets/reviews/review-1.webp';
import review2 from '../assets/reviews/review-2.webp';
import review3 from '../assets/reviews/review-3.webp';
import review4 from '../assets/reviews/review-4.webp';
import review5 from '../assets/reviews/review-5.webp';
import review6 from '../assets/reviews/review-6.webp';
import type { Result } from '../logic/resultLogic';
import { GetCourseEmbed } from './GetCourseEmbed';

const REVIEW_PHOTOS = [review1, review2, review3, review4, review5, review6];

const INCLUDE_BASE = [
  { emoji: '🏃', title: 'Доступ ко всем программам', desc: 'Выбирайте формат под цель, уровень и время на тренировку.' },
  { emoji: '🥗', title: 'Помощник по питанию', desc: 'Подскажет, как собрать рацион под вашу цель без строгих запретов.' },
  { emoji: '🌸', title: 'Мягкий старт', desc: 'Подходит, если хотите войти в режим без перегруза.' },
];

const PROGRAM_EMOJIS: Record<string, string> = {
  method: '💪', slim: '✨', glutes: '🍑', belly: '🎯', nutrition: '🥗', recovery: '🌸',
};

function getDiscount(price: string, oldPrice: string): string {
  const p = parseInt(price, 10);
  const o = parseInt(oldPrice, 10);
  if (!p || !o || o <= p) return '';
  return `−${Math.round((1 - p / o) * 100)}%`;
}

type PaywallScreenProps = {
  result: Result;
};

export function PaywallScreen({ result }: PaywallScreenProps) {
  return (
    <section className="screen paywall-screen">
      <div className="screen-heading">
        <h1>Верните форму без жёстких диет с программами под цель<br />«{result.goalLabel}»</h1>
        <p className="subtitle">
          Ваш результат показывает, что лучше начать с формата «{result.resultType}». Подписка открывает программы,
          питание и поддержку, которые подходят этой цели.
        </p>
      </div>

      <div className="proof-panel premium-proof">
        <div className="trainer-placeholder">
          <img src={katyaPaywallImage} alt="Екатерина Усманова" loading="lazy" />
        </div>
        <div className="proof-text">
          <span className="soft-badge">Екатерина Усманова</span>
          <h2>Тренерский подход, которому доверяют ученицы</h2>
          <ul className="katya-credentials">
            <li>Вице-чемпионка мира и чемпионка России по фитнес-бикини</li>
            <li>Профессиональный фитнес-тренер с опытом более 15 лет</li>
            <li>Мама 2-х детей. Всего за 100 дней после первых родов похудела на 20 кг и вернулась в прежнюю форму</li>
            <li>Автор первых в России масштабных марафонов стройности</li>
            <li>Чемпионка России и мира по жиму лёжа</li>
          </ul>
          <p className="katya-reach">Более <strong>580 000 учениц</strong> уже тренировались с Катей</p>
        </div>
      </div>

      <div className="price-anchor">
        <span className="price-anchor-text">Доступ от 390 руб · 7 дней</span>
        <button
          className="price-anchor-btn"
          type="button"
          onClick={() => document.getElementById('tariff-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Выбрать тариф ↓
        </button>
      </div>

      <div className="paywall-two-col">
        <div className="reviews-panel">
          <h2>Отзывы учениц</h2>
          <div className="review-text-list">
            <blockquote>
              «Тренировки короткие, я успеваю заниматься даже в плотном графике. Тело стало собраннее, а питание спокойнее».
            </blockquote>
            <blockquote>
              «Понравилось, что не нужно голодать. Есть понятный план и ощущение, что можно двигаться в своём темпе».
            </blockquote>
            <blockquote>
              «За месяц ушло 4 кг и подтянулся живот. Главное — без срывов, потому что запретов не было вообще».
            </blockquote>
          </div>
          <div className="review-scroll" aria-label="Фото учениц">
            {REVIEW_PHOTOS.map((src, i) => (
              <img key={i} src={src} alt={`Отзыв ученицы ${i + 1}`} className="review-scroll-photo" loading="lazy" />
            ))}
          </div>
        </div>

        <div className="subscription-includes">
          <h2>Что входит в подписку</h2>
          {INCLUDE_BASE.map((item) => (
            <div className="include-row" key={item.title}>
              <div className="include-row-head">
                <span className="include-emoji" aria-hidden="true">{item.emoji}</span>
                <strong>{item.title}</strong>
              </div>
              <span>{item.desc}</span>
            </div>
          ))}
          {result.programs.map((program) => (
            <div className="include-row" key={program.key}>
              <div className="include-row-head">
                <span className="include-emoji" aria-hidden="true">{PROGRAM_EMOJIS[program.key] ?? '⭐'}</span>
                <strong>{program.title}</strong>
              </div>
              <span>{program.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="before-after">
        <h2>Ваш путь к комфортной форме</h2>
        <img className="before-after-asset" src={beforeAfterFinal} alt="Пример результата после программы" loading="lazy" />
        <div className="before-after-grid">
          <div className="before-after-label">
            <span aria-hidden="true">📍</span>
            <strong>Точка старта</strong>
          </div>
          <div className="before-after-label">
            <span aria-hidden="true">✨</span>
            <strong>Комфортная форма</strong>
          </div>
        </div>
      </div>

      <div id="tariff-section" className="tariff-list">
        {tariffs.map((tariff) => (
          <article className={`tariff-card${tariff.badge ? ' is-featured' : ''}`} key={tariff.title}>
            <div className="tariff-top-badges">
              {tariff.badge ? <span className="tariff-badge">{tariff.badge}</span> : null}
              <span className="tariff-discount">{getDiscount(tariff.price, tariff.oldPrice)}</span>
            </div>
            <h2>{tariff.title}</h2>
            <div className="price-row">
              <strong>{tariff.price}</strong>
              <s>{tariff.oldPrice}</s>
            </div>
            <p className="tariff-period">{tariff.period}</p>
            <small>{tariff.note}</small>
            <ul>
              {tariff.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className="tariff-cta"
              type="button"
              onClick={() => document.getElementById('getcourse-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Выбрать · {tariff.period}
            </button>
          </article>
        ))}
      </div>

      <p className="renewal-note">
        Подписка с автопродлением. Отключить можно в личном кабинете.
      </p>

      <div className="security-row">
        <div>
          <span className="security-icon" aria-hidden="true">🔒</span>
          Безопасная оплата
        </div>
        <div>
          <span className="security-icon" aria-hidden="true">📱</span>
          Доступ в личном кабинете
        </div>
        <div>
          <span className="security-icon" aria-hidden="true">↩️</span>
          Подписку можно отключить
        </div>
      </div>

      <GetCourseEmbed />

      <div className="faq">
        <h2>Частые вопросы</h2>
        <details>
          <summary>Когда увижу результат?</summary>
          <p>Первые изменения — через 2 недели. Полный результат — за 8–12 недель.</p>
        </details>
        <details>
          <summary>Что если не подойдёт?</summary>
          <p>Внутри 13+ программ под разные цели. Не зашла одна — переключаетесь на другую без доплат.</p>
        </details>
        <details>
          <summary>Сложно ли тренироваться?</summary>
          <p>Нет. От 15 минут в день, ИИ-тренер подбирает нагрузку под вас. Программы есть для новичков, в декрете, после 40, с травмами.</p>
        </details>
        <details>
          <summary>Как получу программу?</summary>
          <p>Сразу после оплаты — доступ в личном кабинете на сайте и в приложении. Можно тренироваться с телефона, планшета или компьютера.</p>
        </details>
      </div>

      <footer className="paywall-footer">
        <p className="requisites">
          Исполнитель: ООО «Онлайн Фитнес». ИНН 7734434533. ОГРН 1207700175209.
        </p>
        <div className="legal-links">
          {legalLinkItems.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
