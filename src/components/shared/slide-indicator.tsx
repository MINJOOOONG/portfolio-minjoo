"use client";

import { memo } from "react";
import { useSlideNavigation } from "@/hooks/use-slide-navigation";

interface SlideIndicatorProps {
  sectionIds: string[];
}

export const SlideIndicator = memo(function SlideIndicator({
  sectionIds,
}: SlideIndicatorProps) {
  const { currentIndex, total, goTo, isLast } = useSlideNavigation({
    sectionIds,
  });

  return (
    <>
      {/* Dot indicator — right side */}
      <div className="slide-indicator" aria-hidden="true">
        {sectionIds.map((id, i) => (
          <button
            key={id}
            className={`slide-indicator__dot ${
              i === currentIndex ? "slide-indicator__dot--active" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            aria-label={`Go to ${id}`}
          />
        ))}
        <span className="slide-indicator__count">
          {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom click hint */}
      {!isLast && (
        <div className="slide-hint" data-visible={currentIndex < total - 1}>
          <span className="slide-hint__text">CLICK TO CONTINUE</span>
          <span className="slide-hint__arrow">↓</span>
        </div>
      )}
    </>
  );
});
