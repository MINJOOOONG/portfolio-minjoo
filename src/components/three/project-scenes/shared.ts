import { useMemo, useEffect, useState } from "react";
import * as THREE from "three";

/* ── Shared wireframe material ── */
export function useWireframeMaterial() {
  return useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#d0d0d0",
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    []
  );
}

/* ── Shared line material ── */
export function useLineMaterial() {
  return useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#c0c0c0",
        transparent: true,
        opacity: 0.2,
      }),
    []
  );
}

/* ── Reduced motion detection ── */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/* ── Float motion helper ── */
export function floatY(time: number, offset: number, amplitude = 0.15): number {
  return Math.sin(time * 0.8 + offset) * amplitude;
}
