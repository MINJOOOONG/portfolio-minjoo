"use client";

import { memo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { aboutSections } from "@/data/about-sections";
import { AboutSectionRow } from "@/components/sections/about-section-row";
import { AboutDetailPanel } from "@/components/sections/about-detail-panel";

interface AboutProps {
  content: string;
}

export const About = memo(function About({ content }: AboutProps) {
  void content;

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
          padding: "80px 24px 120px",
          boxSizing: "border-box",
        }}
      >
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-4 sm:mb-16">
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

        {/* ── Mobile: Editorial 스타일 (카드 없이) ── */}
        <div className="md:hidden">
          {aboutSections.map((section, i) => (
            <MobileAboutItem key={section.number} section={section} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── 모바일 Editorial 아이템 ── */
function MobileAboutItem({ section, isFirst }: { section: (typeof aboutSections)[number]; isFirst: boolean }) {
  const [open, setOpen] = useState(false);
  const hasDetails = section.paragraphs.length > 0 || Boolean(section.detailLink);

  return (
    <article className={`${isFirst ? "" : "border-t border-foreground/[0.06] mt-8 pt-8"}`}>
      {/* 번호 + 영문 라벨 */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-foreground/25">
          {section.number}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/35">
          {section.englishTitle}
        </span>
      </div>

      <button
        type="button"
        data-no-section-nav
        onClick={() => hasDetails && setOpen((v) => !v)}
        className="mb-3 flex w-full items-start justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <h3 className="text-[18px] font-bold tracking-[-0.02em] text-foreground leading-snug">
          {section.englishTitle}
        </h3>
        {hasDetails && (
          <ChevronDown
            className={`mt-1 h-4 w-4 shrink-0 text-foreground/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            strokeWidth={1.5}
          />
        )}
      </button>

      {/* 핵심 문장 */}
      <p className="text-[14px] font-medium leading-[1.7] tracking-[-0.01em] text-foreground/80 mb-4">
        {section.sentence}
      </p>

      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-1">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-[13px] leading-[1.85] text-foreground/55">
                  {p}
                </p>
              ))}
            </div>

            {section.detailLink && (
              <button
                type="button"
                data-no-section-nav
                onClick={() => window.dispatchEvent(new CustomEvent("slide-nav-goto", { detail: section.detailLink!.targetId }))}
                className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground/50 hover:text-foreground transition-colors"
              >
                {section.detailLink.label}
                <span aria-hidden="true">→</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!open && hasDetails && (
        <button
          type="button"
          data-no-section-nav
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground/45"
        >
          자세히 보기
          <span aria-hidden="true">↓</span>
        </button>
      )}
    </article>
  );
}

export function SlideHeading({ label, title }: { label: string; title?: string }) {
  const displayText = title && /^[A-Za-z0-9 /&|+-]+$/.test(title) ? title : label;

  return (
    <div className="mb-2 sm:mb-4">
      <h2 className="font-display text-[clamp(1.4rem,4.5vw,3.2rem)] font-black tracking-[-0.04em] leading-[0.95] text-foreground">
        {displayText}
      </h2>
    </div>
  );
}
