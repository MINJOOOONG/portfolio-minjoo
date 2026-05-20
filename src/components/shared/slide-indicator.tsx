"use client";

import { memo } from "react";
import { useSlideNavigation } from "@/hooks/use-slide-navigation";

interface SlideIndicatorProps {
  sectionIds: string[];
}

export const SlideIndicator = memo(function SlideIndicator({
  sectionIds,
}: SlideIndicatorProps) {
  const { currentIndex, total, goTo, goNext, goPrev, isFirst, isLast } =
    useSlideNavigation({ sectionIds });

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
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Prev button (left center) ── */}
      <button
        className="slide-nav-btn slide-nav-btn--prev"
        onClick={(e) => {
          e.stopPropagation();
          if (!isFirst) goPrev();
        }}
        disabled={isFirst}
        aria-label="Previous section"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 13L5 8L10 3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Next button (right center) ── */}
      <button
        className="slide-nav-btn slide-nav-btn--next"
        onClick={(e) => {
          e.stopPropagation();
          if (!isLast) goNext();
        }}
        disabled={isLast}
        aria-label="Next section"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 3L11 8L6 13"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
});
