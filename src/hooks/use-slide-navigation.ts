"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseSlideNavigationOptions {
  sectionIds: string[];
}

function scrollCardIntoView(card: HTMLElement) {
  const topMargin = Math.min(190, Math.max(96, window.innerHeight * 0.14));
  const bottomMargin = Math.min(48, Math.max(24, window.innerHeight * 0.04));
  const rect = card.getBoundingClientRect();
  const cardTop = rect.top + window.scrollY;
  const availableHeight = window.innerHeight - topMargin - bottomMargin;
  const top =
    rect.height < availableHeight
      ? cardTop - topMargin + (availableHeight - rect.height) / 2
      : cardTop - topMargin;

  window.scrollTo({ top, behavior: "smooth" });
}

/** Interactive elements that should NOT trigger section navigation */
const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  "[role='dialog']",
  "[role='tooltip']",
  "video",
  ".pdf-viewer",
  "[contenteditable]",
  "[data-no-section-nav]",
  "[data-annotation-area]",
  "[data-annotation-card]",
].join(", ");

export function useSlideNavigation({ sectionIds }: UseSlideNavigationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);
  const cooldownRef = useRef(false);

  /* ── Sync currentIndex with scroll position ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        let best: { id: string; ratio: number } | null = null;
        for (const entry of entries) {
          if (
            entry.intersectionRatio > 0 &&
            (!best || entry.intersectionRatio > best.ratio)
          ) {
            best = { id: entry.target.id, ratio: entry.intersectionRatio };
          }
        }
        if (best) {
          const idx = sectionIds.indexOf(best.id);
          if (idx >= 0) setCurrentIndex(idx);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75] }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  /* ── Navigate to section ── */
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(sectionIds.length - 1, index));
      const el = document.getElementById(sectionIds[clamped]);
      if (!el) return;

      isScrolling.current = true;
      cooldownRef.current = true;
      setCurrentIndex(clamped);

      const top = el.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
      setTimeout(() => {
        cooldownRef.current = false;
      }, 1000);
    },
    [sectionIds]
  );

  const goNext = useCallback(() => {
    if (cooldownRef.current) return;
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    if (cooldownRef.current) return;
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const goToSectionCard = useCallback(
    (sectionId: string, cardSelector: string, direction: 1 | -1) => {
      if (cooldownRef.current) return;

      const section = document.getElementById(sectionId);
      if (!section) return;

      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(cardSelector)
      );
      if (cards.length < 2) {
        if (direction > 0) goNext();
        else goPrev();
        return;
      }

      const viewportAnchor = window.scrollY + window.innerHeight * 0.35;
      const currentCardIndex = cards.reduce((bestIndex, card, index) => {
        const bestTop =
          cards[bestIndex].getBoundingClientRect().top + window.scrollY;
        const cardTop = card.getBoundingClientRect().top + window.scrollY;
        const bestDistance = Math.abs(bestTop - viewportAnchor);
        const distance = Math.abs(cardTop - viewportAnchor);
        return distance < bestDistance ? index : bestIndex;
      }, 0);
      const targetCard = cards[currentCardIndex + direction];

      if (!targetCard) {
        if (direction > 0) goNext();
        else goPrev();
        return;
      }

      isScrolling.current = true;
      cooldownRef.current = true;
      scrollCardIntoView(targetCard);
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
      setTimeout(() => {
        cooldownRef.current = false;
      }, 950);
    },
    [goNext, goPrev]
  );

  /* ── Click handler: left half = prev, right half = next ── */
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Skip clicks on interactive elements
      if (target.closest(INTERACTIVE_SELECTOR)) {
        return;
      }

      const isRightSide = e.clientX > window.innerWidth / 2;

      if (isRightSide) {
        // Projects section: navigate between project cards first
        if (sectionIds[currentIndex] === "projects") {
          goToSectionCard("projects", "[data-project-card]", 1);
        } else {
          goNext();
        }
      } else {
        if (sectionIds[currentIndex] === "projects") {
          goToSectionCard("projects", "[data-project-card]", -1);
        } else {
          goPrev();
        }
      }
    },
    [currentIndex, goNext, goPrev, goToSectionCard, sectionIds]
  );

  /* ── Keyboard handler ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(sectionIds.length - 1);
          break;
      }
    },
    [goNext, goPrev, goTo, sectionIds.length]
  );

  /* ── Block native scroll so only click/keyboard navigates ── */
  useEffect(() => {
    const blockWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement).closest("[data-allow-scroll]")) return;
      e.preventDefault();
    };
    const blockTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest("[data-allow-scroll]")) return;
      e.preventDefault();
    };
    const blockScroll = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.("[data-allow-scroll]")) return;
      e.preventDefault();
    };

    // CSS-level scroll lock
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", blockWheel, { passive: false });
    document.addEventListener("wheel", blockWheel, { passive: false });
    document.addEventListener("touchmove", blockTouchMove, { passive: false });
    document.addEventListener("scroll", blockScroll, { passive: false });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("wheel", blockWheel);
      document.removeEventListener("wheel", blockWheel);
      document.removeEventListener("touchmove", blockTouchMove);
      document.removeEventListener("scroll", blockScroll);
    };
  }, []);

  /* ── Attach listeners ── */
  useEffect(() => {
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClick, handleKeyDown]);

  return {
    currentIndex,
    total: sectionIds.length,
    goTo,
    goNext,
    goPrev,
    isFirst: currentIndex === 0,
    isLast: currentIndex === sectionIds.length - 1,
  };
}
