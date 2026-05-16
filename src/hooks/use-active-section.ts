"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import React from "react";

/* ── Context ── */
const ActiveSectionContext = createContext<string>("about");

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}

/* ── Provider ── */
interface ActiveSectionProviderProps {
  sectionIds: string[];
  children: ReactNode;
}

export function ActiveSectionProvider({
  sectionIds,
  children,
}: ActiveSectionProviderProps) {
  const [active, setActive] = useState(sectionIds[0] ?? "about");

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      let best: { id: string; ratio: number } | null = null;
      for (const entry of entries) {
        if (
          entry.intersectionRatio > 0 &&
          (!best || entry.intersectionRatio > best.ratio)
        ) {
          best = { id: entry.target.id, ratio: entry.intersectionRatio };
        }
      }
      if (best) setActive(best.id);
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [0, 0.25, 0.5, 0.75],
    });

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds, handleIntersect]);

  return React.createElement(
    ActiveSectionContext.Provider,
    { value: active },
    children
  );
}
