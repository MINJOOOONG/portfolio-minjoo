"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════
   Config
   ═══════════════════════════════════════════ */
const DOT_SIZE = 6;

const RING_DEFAULT = 50;
const RING_NAV = 110;
const RING_BUTTON_W = 88;
const RING_BUTTON_H = 42;
const RING_PROJECT = 150;
const RING_LABELED = 90;

const DOT_SPRING = { damping: 40, stiffness: 700, mass: 0.12 };
const RING_SPRING = { damping: 18, stiffness: 140, mass: 0.9 };
const HIGHLIGHT_SPRING = { damping: 22, stiffness: 120, mass: 0.8 };

const MAGNETIC_RADIUS = 70;
const MAGNETIC_WEAK = 0.2;
const MAGNETIC_STRONG = 0.35;
const MOBILE_CURSOR_QUERY = "(max-width: 768px), (pointer: coarse)";

type CursorMode = "default" | "nav" | "button" | "project" | "labeled" | "highlight";

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const isClickingRef = useRef(false);
  const rippleIdRef = useRef(0);
  const rafRef = useRef(0);
  const magneticTargets = useRef<Element[]>([]);
  const cursorModeRef = useRef<CursorMode>("default");

  /* ── Position springs ── */
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);
  const highlightX = useSpring(rawX, HIGHLIGHT_SPRING);
  const highlightY = useSpring(rawY, HIGHLIGHT_SPRING);

  /* ── Stretch values (updated in rAF) ── */
  const ringScaleX = useMotionValue(1);
  const ringScaleY = useMotionValue(1);
  const ringRotate = useMotionValue(0);

  /* ── Setup ── */
  useEffect(() => {
    const cursorMedia = window.matchMedia(MOBILE_CURSOR_QUERY);
    const reducedMotionMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const updateInputMode = () => {
      setIsTouch(
        cursorMedia.matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0
      );
      setReducedMotion(reducedMotionMedia.matches);
    };

    updateInputMode();
    cursorMedia.addEventListener("change", updateInputMode);
    reducedMotionMedia.addEventListener("change", updateInputMode);

    return () => {
      cursorMedia.removeEventListener("change", updateInputMode);
      reducedMotionMedia.removeEventListener("change", updateInputMode);
    };
  }, []);

  const refreshTargets = useCallback(() => {
    magneticTargets.current = Array.from(
      document.querySelectorAll('a, button, [role="button"]')
    );
  }, []);

  /* ── Mouse event handlers ── */
  useEffect(() => {
    if (isTouch) return;

    refreshTargets();
    const observer = new MutationObserver(refreshTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      let targetX = e.clientX;
      let targetY = e.clientY;

      /* General magnetic pull */
      const strength =
        cursorModeRef.current === "project"
          ? MAGNETIC_STRONG
          : MAGNETIC_WEAK;

      for (const el of magneticTargets.current) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        if (dist < MAGNETIC_RADIUS) {
          const pull = (1 - dist / MAGNETIC_RADIUS) * strength;
          targetX += (cx - e.clientX) * pull;
          targetY += (cy - e.clientY) * pull;
        }
      }

      rawX.set(targetX);
      rawY.set(targetY);

      /* ── Hover detection ── */
      const target = e.target as HTMLElement;
      const dataCursor = target.closest(
        "[data-cursor]"
      ) as HTMLElement | null;
      const projectCard = target.closest(
        "[data-project-card]"
      ) as HTMLElement | null;
      const navLink = target.closest(
        "nav a, nav button"
      ) as HTMLElement | null;
      const button = target.closest(
        'button, [role="button"]'
      ) as HTMLElement | null;
      const link = target.closest("a") as HTMLElement | null;
      const highlightArea = target.closest(
        "[data-cursor-highlight]"
      ) as HTMLElement | null;

      let mode: CursorMode = "default";
      let label = "";

      if (projectCard) {
        mode = "project";
        label = dataCursor?.dataset.cursor || "VIEW";
      } else if (navLink) {
        mode = "nav";
        label = "";
      } else if (dataCursor) {
        mode = "labeled";
        label = dataCursor.dataset.cursor || "";
      } else if (button) {
        mode = "button";
        label = "CLICK";
      } else if (link) {
        mode = "button";
        label = "OPEN";
      } else if (highlightArea) {
        mode = "highlight";
        label = "";
      }

      cursorModeRef.current = mode;
      setCursorMode(mode);
      setCursorLabel(label);
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      setIsClicking(true);

      /* Spawn ripple */
      const id = rippleIdRef.current++;
      const x = rawX.get();
      const y = rawY.get();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      setIsClicking(false);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [isTouch, isVisible, rawX, rawY, refreshTargets]);

  /* ── rAF loop: elastic stretch ── */
  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const update = () => {
      const dx = dotX.get() - ringX.get();
      const dy = dotY.get() - ringY.get();
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      /* Stretch amount: proportional to lag distance */
      const stretch = Math.min(dist / 100, 0.45);
      const clicking = isClickingRef.current ? 0.7 : 1;

      const targetSX = (1 + stretch) * clicking;
      const targetSY = (1 - stretch * 0.4) * clicking;

      ringScaleX.set(lerp(ringScaleX.get(), targetSX, 0.13));
      ringScaleY.set(lerp(ringScaleY.get(), targetSY, 0.13));

      /* Rotation follows movement direction */
      if (dist > 3) {
        let targetR = angle;
        const currentR = ringRotate.get();
        const diff = targetR - currentR;
        if (diff > 180) targetR -= 360;
        if (diff < -180) targetR += 360;
        ringRotate.set(lerp(currentR, targetR, 0.08));
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [
    isTouch,
    reducedMotion,
    dotX,
    dotY,
    ringX,
    ringY,
    ringScaleX,
    ringScaleY,
    ringRotate,
  ]);

  if (isTouch || reducedMotion) return null;

  /* ═══════════════════════════════════════════
     Derive visual state from mode
     ═══════════════════════════════════════════ */
  const isHovering = cursorMode !== "default" && cursorMode !== "highlight";
  const isHighlight = cursorMode === "highlight";
  const hasLabel = cursorLabel.length > 0;
  const isPill = cursorMode === "button";

  let ringW: number;
  let ringH: number;

  switch (cursorMode) {
    case "nav":
      ringW = RING_NAV;
      ringH = RING_NAV;
      break;
    case "button":
      ringW = RING_BUTTON_W;
      ringH = RING_BUTTON_H;
      break;
    case "project":
      ringW = RING_PROJECT;
      ringH = RING_PROJECT;
      break;
    case "labeled":
      ringW = RING_LABELED;
      ringH = RING_LABELED;
      break;
    default:
      ringW = RING_DEFAULT;
      ringH = RING_DEFAULT;
  }

  /* Border + fill per mode */
  const borderColor = "#111";
  const borderW = isHovering ? 2 : 1.5;
  const bgColor = isHovering
    ? "rgba(245, 245, 245, 0.4)"
    : "transparent";
  const shadow = isHovering
    ? "0 0 0 1px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)"
    : "none";

  return (
    <>
      {/* ════════════ Dot ════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "50%",
          backgroundColor: "#111",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
          scale: isClicking ? 2.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.12 },
          scale: {
            type: "spring",
            damping: 12,
            stiffness: 400,
            mass: 0.3,
          },
        }}
      />

      {/* ════════════ Ring ════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        <motion.div
          style={{
            scaleX: ringScaleX,
            scaleY: ringScaleY,
            rotate: ringRotate,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
            borderStyle: "solid",
            borderColor,
            backgroundColor: bgColor,
            boxShadow: shadow,
          }}
          animate={{
            width: ringW,
            height: ringH,
            borderRadius: isPill ? "24px" : "50%",
            opacity: isVisible ? (isHovering ? 1 : 0.55) : 0,
            borderWidth: borderW,
          }}
          transition={{
            width: { type: "spring", damping: 16, stiffness: 180 },
            height: { type: "spring", damping: 16, stiffness: 180 },
            borderRadius: { duration: 0.3, ease: [0.175, 0.885, 0.32, 1] },
            opacity: { duration: 0.2 },
            borderWidth: { duration: 0.15 },
          }}
        >
          {/* ── Label text ── */}
          <AnimatePresence mode="wait">
            {hasLabel && (
              <motion.span
                key={cursorLabel}
                initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontSize: cursorMode === "project" ? 12 : 10,
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase" as const,
                  color: "#111",
                  userSelect: "none" as const,
                  whiteSpace: "nowrap" as const,
                  lineHeight: 1,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {cursorLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ════════════ Click ripple ════════════ */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: r.x,
              y: r.y,
              translateX: "-50%",
              translateY: "-50%",
              borderRadius: "50%",
              border: "2px solid rgba(0, 0, 0, 0.25)",
              pointerEvents: "none",
              zIndex: 9997,
            }}
            initial={{ width: 8, height: 8, opacity: 0.6 }}
            animate={{ width: 140, height: 140, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </AnimatePresence>

      {/* ════════════ Second ripple (staggered) ════════════ */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={`${r.id}-inner`}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: r.x,
              y: r.y,
              translateX: "-50%",
              translateY: "-50%",
              borderRadius: "50%",
              border: "1.5px solid rgba(0, 0, 0, 0.15)",
              pointerEvents: "none",
              zIndex: 9997,
            }}
            initial={{ width: 8, height: 8, opacity: 0.4 }}
            animate={{ width: 90, height: 90, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </AnimatePresence>

      {/* ════════════ Highlight (pastel pink ellipse) ════════════ */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: highlightX,
          y: highlightY,
          translateX: "-50%",
          translateY: "-50%",
          width: 120,
          height: 28,
          borderRadius: 4,
          backgroundColor: "rgba(255, 182, 193, 0.35)",
          mixBlendMode: "multiply",
          pointerEvents: "none",
          zIndex: 9996,
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: isVisible && isHighlight ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 0.2, ease: "easeOut" },
        }}
      />
    </>
  );
}
