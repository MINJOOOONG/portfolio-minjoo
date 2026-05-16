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

      // Scroll to section top (no navbar offset needed — hero is index 0 with no padding)
      const top = el.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });

      // Release lock after animation
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

  const goToSectionCard = useCallback((sectionId: string, cardSelector: string, direction: 1 | -1) => {
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
      const bestTop = cards[bestIndex].getBoundingClientRect().top + window.scrollY;
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
  }, [goNext, goPrev]);

  const goToNextProject = useCallback(() => {
    goToSectionCard("projects", "[data-project-card]", 1);
  }, [goToSectionCard]);

  /* ── Click handler (skip interactive elements) ── */
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Skip clicks on interactive elements
      if (
        target.closest("a, button, input, textarea, select, [role='button'], video, .pdf-viewer, [contenteditable]")
      ) {
        return;
      }

      if (target.closest("#projects")) {
        goToNextProject();
        return;
      }

      goNext();
    },
    [goNext, goToNextProject]
  );

  /* ── Keyboard handler ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
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

  /* ── Wheel handler (snap on scroll) ── */
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<number | null>(null);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (cooldownRef.current) return;

      wheelAccum.current += e.deltaY;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);

      wheelTimer.current = window.setTimeout(() => {
        wheelAccum.current = 0;
      }, 150);

      const threshold = 80;
      if (Math.abs(wheelAccum.current) > threshold) {
        const direction = wheelAccum.current > 0 ? 1 : -1;

        if (sectionIds[currentIndex] === "projects") {
          goToSectionCard("projects", "[data-project-card]", direction);
        } else if (direction > 0) {
          goNext();
        } else {
          goPrev();
        }
        wheelAccum.current = 0;
      }
    },
    [currentIndex, goNext, goPrev, goToSectionCard, sectionIds]
  );

  /* ── Touch swipe handler ── */
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const threshold = 50;
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  /* ── Prevent touchmove default to stop momentum scroll ── */
  useEffect(() => {
    const preventTouchScroll = (e: TouchEvent) => {
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouchScroll, { passive: false });
    return () => document.removeEventListener("touchmove", preventTouchScroll);
  }, []);

  /* ── Attach listeners ── */
  useEffect(() => {
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleClick, handleKeyDown, handleWheel, handleTouchStart, handleTouchEnd]);

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
