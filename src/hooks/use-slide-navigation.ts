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

/** Sections whose content scrolls internally instead of PPT-style navigation */
const SCROLLABLE_SECTIONS = new Set(["about", "experience", "projects", "ai-lab", "articles", "skills", "contact"]);
const MOBILE_NAV_QUERY = "(max-width: 768px), (pointer: coarse)";

export function useSlideNavigation({ sectionIds }: UseSlideNavigationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isScrolling = useRef(false);
  const cooldownRef = useRef(false);

  // Keep ref in sync for use in event handlers (avoids stale closures)
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

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
          if (idx >= 0) {
            setCurrentIndex(idx);
            const hash = `#${best.id}`;
            if (window.location.hash !== hash) {
              window.history.replaceState(null, "", `/portfolio${hash}`);
            }
          }
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

      // Sync URL hash with current section
      const hash = `#${sectionIds[clamped]}`;
      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", `/portfolio${hash}`);
      }

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

  /* ── Click handler removed: navigation only via buttons ── */

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
  /* For scrollable sections (e.g. "projects"), forward wheel to internal scroller */
  useEffect(() => {
    const mobileNav = window.matchMedia(MOBILE_NAV_QUERY).matches;

    /** Find the internal scroll container for the current section */
    const getScroller = (): HTMLElement | null => {
      const sectionId = sectionIds[currentIndexRef.current];
      if (!sectionId) return null;
      const section = document.getElementById(sectionId);
      if (mobileNav) {
        return (
          section?.querySelector<HTMLElement>("[data-scroller]") ??
          section?.querySelector<HTMLElement>(":scope > div") ??
          null
        );
      }
      if (!SCROLLABLE_SECTIONS.has(sectionId)) return null;
      return section?.querySelector<HTMLElement>("[data-scroller]") ?? null;
    };

    /** Check if the event target is inside a modal overlay (z-index ≥ 50) */
    const isInsideModal = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false;
      return target.closest(".pj-modal, [role='dialog'], [data-modal-overlay]") !== null;
    };

    const blockWheel = (e: WheelEvent) => {
      // Let modal handle its own scroll natively
      if (isInsideModal(e.target)) return;

      e.preventDefault();
      const scroller = getScroller();
      if (scroller) {
        // Convert line/page units to pixels
        let dy = e.deltaY;
        if (e.deltaMode === 1) dy *= 20; // line → px
        if (e.deltaMode === 2) dy *= window.innerHeight; // page → px
        scroller.scrollBy({ top: dy, behavior: "instant" });
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;
    let touchMoved = false;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    };
    const blockTouchMove = (e: TouchEvent) => {
      // Let modal handle its own touch scroll natively
      if (isInsideModal(e.target)) return;

      touchMoved = true;
      e.preventDefault();
      const scroller = getScroller();
      if (scroller) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        scroller.scrollBy({ top: deltaY, behavior: "instant" });
      }
    };

    const navigateByTapX = (clientX: number) => {
      if (clientX >= window.innerWidth / 2) {
        goTo(currentIndexRef.current + 1);
      } else {
        goTo(currentIndexRef.current - 1);
      }
    };

    const shouldIgnoreMobileTap = (target: EventTarget | null) => {
      if (cooldownRef.current) return true;
      if (isInsideModal(target)) return true;
      if (
        target instanceof HTMLElement &&
        target.closest(INTERACTIVE_SELECTOR)
      ) {
        return true;
      }

      return false;
    };

    const isTapGesture = (clientX: number, clientY: number) => {
      const dx = Math.abs(clientX - touchStartX);
      const dy = Math.abs(clientY - touchStartY);
      return !touchMoved || (dx <= 12 && dy <= 12);
    };

    const handleMobilePointerTap = (e: PointerEvent) => {
      if (!mobileNav || e.pointerType !== "touch") return;
      if (shouldIgnoreMobileTap(e.target)) return;
      if (!isTapGesture(e.clientX, e.clientY)) return;
      navigateByTapX(e.clientX);
    };

    const handleMobileTouchEnd = (e: TouchEvent) => {
      if (!mobileNav) return;
      if (shouldIgnoreMobileTap(e.target)) return;
      const touch = e.changedTouches[0];
      if (!touch || !isTapGesture(touch.clientX, touch.clientY)) return;
      e.preventDefault();
      navigateByTapX(touch.clientX);
    };

    // CSS-level scroll lock
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", blockWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", blockTouchMove, { passive: false });
    document.addEventListener("touchend", handleMobileTouchEnd, { passive: false });
    document.addEventListener("pointerup", handleMobilePointerTap);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("wheel", blockWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", blockTouchMove);
      document.removeEventListener("touchend", handleMobileTouchEnd);
      document.removeEventListener("pointerup", handleMobilePointerTap);
    };
  }, [goTo, sectionIds]);

  /* ── Navigate to section from URL hash on initial load ── */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const idx = sectionIds.indexOf(hash);
      if (idx >= 0) {
        // Delay slightly to ensure DOM sections are rendered
        requestAnimationFrame(() => goTo(idx));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Listen for nav requests from other components (e.g. SceneNavbar) ── */
  useEffect(() => {
    const handleNavRequest = (e: Event) => {
      const sectionId = (e as CustomEvent<string>).detail;
      const idx = sectionIds.indexOf(sectionId);
      if (idx >= 0) goTo(idx);
    };

    window.addEventListener("slide-nav-goto", handleNavRequest);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("slide-nav-goto", handleNavRequest);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, goTo, sectionIds]);

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
