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
        className={`slide-nav-btn slide-nav-btn--prev ${isFirst ? "slide-nav-btn--disabled" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!isFirst) goPrev();
        }}
        aria-label="이전 섹션"
        aria-disabled={isFirst}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M11 14L6 9L11 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Next button (right center) ── */}
      <button
        className={`slide-nav-btn slide-nav-btn--next ${isLast ? "slide-nav-btn--disabled" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!isLast) goNext();
        }}
        aria-label="다음 섹션"
        aria-disabled={isLast}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7 4L12 9L7 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
});
