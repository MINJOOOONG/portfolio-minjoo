"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!fillRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleY(${self.progress})`;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="relative h-24 w-px bg-border">
        <div
          ref={fillRef}
          className="absolute inset-0 w-px bg-foreground origin-top"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
    </div>
  );
}
