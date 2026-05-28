"use client";

import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
    <div
      className="w-full max-w-[980px]"
      data-allow-scroll
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <div
        data-scroller
        style={{
          height: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "80px 40px 120px",
          boxSizing: "border-box",
        }}
      >
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <SlideHeading label="About" title="About Me" />
        </div>

        {/* ── Desktop: Master-detail layout ── */}
        <div className="hidden md:flex md:flex-row">
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

          <div className="md:flex-1 md:pl-12 lg:pl-16 md:border-l md:border-foreground/[0.06]">
            <AboutDetailPanel section={activeSection} />
          </div>
        </div>

        {/* ── Mobile: 아코디언 리스트 ── */}
        <div className="md:hidden space-y-0">
          {aboutSections.map((section, index) => (
            <MobileAboutItem key={section.number} section={section} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── 모바일 아코디언 아이템 ── */
function MobileAboutItem({ section, index }: { section: (typeof aboutSections)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-foreground/[0.06]">
      <button
        type="button"
        data-no-section-nav
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-foreground/25">
            {section.number}
          </span>
          <span className="text-[15px] font-semibold text-foreground tracking-[-0.01em]">
            {section.koreanTitle}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-foreground/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[30px]">
              <p className="text-[16px] font-semibold leading-[1.55] tracking-[-0.02em] text-foreground mb-4">
                {section.sentence}
              </p>
              <div className="space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-[14px] leading-[1.8] text-foreground/60">
                    {p}
                  </p>
                ))}
              </div>
              {section.detailLink && (
                <button
                  type="button"
                  data-no-section-nav
                  onClick={() => window.dispatchEvent(new CustomEvent("slide-nav-goto", { detail: section.detailLink!.targetId }))}
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground/60 hover:text-foreground transition-colors"
                >
                  {section.detailLink.label}
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
