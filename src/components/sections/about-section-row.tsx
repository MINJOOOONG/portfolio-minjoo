"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import type { AboutSection } from "@/data/about-sections";

interface AboutSectionRowProps extends AboutSection {
  index: number;
  isActive: boolean;
  onActivate: (id: string) => void;
}

export function AboutSectionRow({
  number,
  englishTitle,
  index,
  isActive,
  onActivate,
}: AboutSectionRowProps) {
  const handleActivate = useCallback(() => {
    onActivate(number);
  }, [number, onActivate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        role="button"
        tabIndex={0}
        data-no-section-nav
        className={`
          group relative cursor-pointer select-none outline-none
          py-4 transition-all duration-250
          focus-visible:ring-1 focus-visible:ring-foreground/15 focus-visible:ring-offset-2
        `}
        onClick={handleActivate}
        onFocus={handleActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleActivate();
          }
        }}
        aria-expanded={isActive}
      >
        {/* Number — large structural marker */}
        <span
          className={`
            block font-mono text-[13px] font-bold tracking-[0.06em] leading-none
            transition-colors duration-250 mb-2
            ${isActive ? "text-foreground/60" : "text-foreground/20"}
          `}
        >
          {number}
        </span>

        {/* Title */}
        <span
          data-cursor-highlight
          className={`
            block font-sans text-[16px] sm:text-[17px] font-semibold
            tracking-[-0.01em] leading-[1.3]
            transition-colors duration-250
            ${isActive ? "text-foreground" : "text-foreground/30"}
          `}
        >
          {englishTitle}
        </span>

        {/* Active rule — bottom accent */}
        <span
          className={`
            absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-out
            ${isActive ? "w-full bg-foreground/40" : "w-0 bg-foreground/10"}
          `}
        />
      </div>
    </motion.div>
  );
}
