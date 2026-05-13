"use client";

import { useEffect, useRef } from "react";

interface StaggerRevealOptions {
  childSelector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
}

export function useStaggerReveal<T extends HTMLElement>(
  options: StaggerRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    childSelector = "> *",
    stagger = 0.07,
    y = 100,
    duration = 0.8,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const selector = childSelector.startsWith(">")
      ? `:scope ${childSelector}`
      : childSelector;
    const children = el.querySelectorAll(selector);
    if (children.length === 0) return;

    children.forEach((child, i) => {
      const htmlChild = child as HTMLElement;
      htmlChild.style.opacity = "0";
      htmlChild.style.transform = `translateY(${y}px) scale(0.9)`;
      htmlChild.style.transition = `opacity ${duration * 0.6}s ease-out ${i * stagger}s, transform ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.6) ${i * stagger}s`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            const htmlChild = child as HTMLElement;
            htmlChild.style.opacity = "1";
            htmlChild.style.transform = "translateY(0) scale(1)";
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [childSelector, stagger, y, duration]);

  return ref;
}
