"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const { y = 120, duration = 0.85, delay = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px) scale(0.92)`;
    el.style.transition = `opacity ${duration * 0.6}s ease-out ${delay}s, transform ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.6) ${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [y, duration, delay]);

  return ref;
}
