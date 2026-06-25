import bodyZonesImage from '../assets/transition/body-zones.webp';
import communityImage1 from '../assets/community/community-1.jpg';
import communityImage2 from '../assets/community/community-2.jpg';
import communityImage3 from '../assets/community/community-3.jpg';
import communityImage4 from '../assets/community/community-4.jpg';
import communityImage5 from '../assets/community/community-5.jpg';
import communityImage6 from '../assets/community/community-6.jpg';
import communityImage7 from '../assets/community/community-7.jpg';
import finalBeforeAfterImage from '../assets/final/before-after-final.jpg';
import nutritionChatImage from '../assets/transition/nutrition-chat.jpg';
import reviewImage1 from '../assets/reviews/review-1.webp';
import reviewImage2 from '../assets/reviews/review-2.webp';
import reviewImage3 from '../assets/reviews/review-3.webp';
import reviewImage4 from '../assets/reviews/review-4.webp';
import reviewImage5 from '../assets/reviews/review-5.webp';
import reviewImage6 from '../assets/reviews/review-6.webp';
import type { TransitionScreenData } from '../data/quizScreens';

type TransitionScreenProps = {
  screen: TransitionScreenData;
  onNext: () => void;
};

const reviewImages = [reviewImage1, reviewImage2, reviewImage3, reviewImage4, reviewImage5, reviewImage6];
const communityImages = [
  communityImage1,
  communityImage2,
  communityImage3,
  communityImage4,
  communityImage5,
  communityImage6,
  communityImage7,
];

export function TransitionScreen({ screen, onNext }: TransitionScreenProps) {
  return (
    <section
      className={`screen transition-screen transition-screen--${screen.id} tone-${screen.tone ?? 'promise'}${
        screen.visual === 'body-zones' ? ' transition-screen--body-zones' : ''
      }`}
    >
      <TransitionVisual visual={screen.visual} />
      <div className="screen-heading">
        <h1>{screen.title}</h1>
        {screen.subtitle ? <p className="subtitle">{screen.subtitle}</p> : null}
      </div>

      {screen.quote ? <blockquote className="review-quote">{screen.quote}</blockquote> : null}

      {screen.points ? (
        <div className="point-list">
          {screen.points.map((point) => (
            <div className="point-item" key={point}>
              <span className="point-dot" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      ) : null}

      <button className="primary-button sticky-action" type="button" onClick={onNext}>
        {screen.cta}
      </button>
      {screen.id === 15 ? (
        <p className="transition-button-note">
          Помощник по питанию входит в подписку, отдельно не продаётся.
        </p>
      ) : null}
    </section>
  );
}

function TransitionVisual({ visual }: { visual?: TransitionScreenData['visual'] }) {
  if (visual === 'body-zones') {
    return (
      <div className="body-zones-visual" aria-label="Силуэт фигуры с зонами живот, бёдра, руки">
        <img src={bodyZonesImage} alt="" />
      </div>
    );
  }

  if (visual === 'review') {
    return (
      <div className="review-visual" aria-label="Отзывы учениц">
        {reviewImages.map((image, index) => (
          <img src={image} alt={`Отзыв ученицы ${index + 1}`} key={image} loading="lazy" />
        ))}
      </div>
    );
  }

  if (visual === 'nutrition-chat') {
    return (
      <div className="chat-visual" aria-label="Переписка с помощником по питанию">
        <img src={nutritionChatImage} alt="" loading="lazy" />
      </div>
    );
  }

  if (visual === 'community') {
    return (
      <div className="community-visual" aria-label="Коллаж участниц">
        <div className="community-collage">
          {communityImages.map((image, index) => (
            <img src={image} alt="" key={image} loading="lazy" className={`community-photo-${index + 1}`} />
          ))}
        </div>
        <strong>
          <span className="online-dot" aria-hidden="true" />
          3663 занимаются прямо сейчас
        </strong>
      </div>
    );
  }

  if (visual === 'before-after') {
    return (
      <div className="final-before-after" aria-label="Фото фигуры до и после">
        <img src={finalBeforeAfterImage} alt="" loading="lazy" />
      </div>
    );
  }

  return (
    <div className="trust-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
