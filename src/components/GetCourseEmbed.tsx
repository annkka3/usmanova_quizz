import { useEffect, useRef } from 'react';

const GC_SCRIPT_ID = '7f57171c3c904310d4f37877b65ce1448b43443b';
const GC_SCRIPT_SRC = 'https://usmanovafit.gymteam.ru/pl/lite/widget/script?id=1605665';

// Current GetCourse widget is the project-provided checkout widget.
// It may contain a different visual style and available tariffs.
// The quiz paywall keeps the task-defined tariff cards above.

export function GetCourseEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Avoid duplicate script on repeat visits to paywall
    if (document.getElementById(GC_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = GC_SCRIPT_ID;
    script.src = GC_SCRIPT_SRC;
    script.async = true;
    container.appendChild(script);

    return () => {
      // Remove only if still inside our container (not moved by GC widget)
      if (container.contains(script)) container.removeChild(script);
    };
  }, []);

  return (
    <div
      id="getcourse-section"
      ref={containerRef}
      className="getcourse-placeholder"
      role="region"
      aria-label="Форма оформления заказа"
    />
  );
}
