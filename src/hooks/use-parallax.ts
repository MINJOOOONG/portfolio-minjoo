"use client";

import { useRef } from "react";

interface ParallaxOptions {
  speed?: number;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  _options: ParallaxOptions = {}
) {
  // Parallax disabled in horizontal scroll mode
  const ref = useRef<T>(null);
  return ref;
}
