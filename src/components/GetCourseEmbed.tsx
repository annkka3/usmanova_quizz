import { useEffect, useRef } from 'react';

export function GetCourseEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.id = '7f57171c3c904310d4f37877b65ce1448b43443b';
    script.src = 'https://usmanovafit.gymteam.ru/pl/lite/widget/script?id=1605665';
    script.async = true;
    container.appendChild(script);

    return () => {
      if (container.contains(script)) container.removeChild(script);
    };
  }, []);

  return (
    <div id="getcourse-section" ref={containerRef} className="getcourse-placeholder" role="region" aria-label="Форма оформления заказа" />
  );
}
