"use client";

import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { aboutSections } from "@/data/about-sections";
import { AboutSectionRow } from "@/components/sections/about-section-row";
import { AboutDetailPanel } from "@/components/sections/about-detail-panel";

interface AboutProps {
  content: string;
}

export const About = memo(function About({ content }: AboutProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.8 });
  const [activeId, setActiveId] = useState<string>("01");

  const handleActivate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const activeSection = aboutSections.find((s) => s.number === activeId);

  return (
    <div className="w-full max-w-[980px]">
      {/* ── Heading ── */}
      <div ref={headingRef} className="mb-12 sm:mb-16">
        <SlideHeading label="About" title="About Me" />
      </div>

      {/* ── Master-detail layout ── */}
      <div className="flex flex-col md:flex-row">
        {/* Left index — phi-style numbered nav */}
        <div
          className="md:w-[240px] lg:w-[260px] flex-shrink-0"
          data-annotation-area
        >
          {aboutSections.map((section, index) => (
            <AboutSectionRow
              key={section.number}
              {...section}
              index={index}
              isActive={activeId === section.number}
              onActivate={handleActivate}
            />
          ))}
        </div>

        {/* Right detail — editorial content */}
        <div className="hidden md:block md:flex-1 md:pl-12 lg:pl-16 md:border-l md:border-foreground/[0.06]">
          <AboutDetailPanel section={activeSection} />
        </div>

        {/* Mobile: detail below */}
        <div className="md:hidden mt-8">
          {activeSection && (
            <div className="border-t border-foreground/[0.06] pt-8">
              <AboutDetailPanel section={activeSection} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export function SlideHeading({ label, title }: { label: string; title?: string }) {
  const displayText = title && /^[A-Za-z0-9 /&|+-]+$/.test(title) ? title : label;

  return (
    <div className="mb-4">
      <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
        {label}
      </span>
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-black tracking-[-0.04em] leading-[0.95] text-foreground">
        {displayText}
      </h2>
    </div>
  );
}
