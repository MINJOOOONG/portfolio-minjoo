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

const mobileSummary =
  "QA 실무 경험을 바탕으로 문제를 재현하고, 로그와 코드 흐름까지 따라가며 개선점을 찾는 백엔드 지향 개발자입니다.";

const mobileKeywords = ["QA 관점", "문제 추적", "백엔드 구현", "AI 활용", "기록과 협업"];

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

        {/* ── Mobile: 아코디언 리스트 ── */}
        <div className="md:hidden">
          <section className="mb-8 rounded-[8px] border border-foreground/[0.08] bg-white/80 px-4 py-4 shadow-[0_12px_30px_rgba(33,29,25,0.04)]">
            <p className="text-[15px] font-semibold leading-[1.65] tracking-[-0.02em] text-foreground">
              {mobileSummary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {mobileKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-foreground/[0.08] bg-[#F7F6F3] px-2.5 py-1 text-[11px] font-medium text-foreground/65"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <div className="space-y-2.5">
          {aboutSections.map((section) => (
            <MobileAboutItem key={section.number} section={section} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
});

/* ── 모바일 아코디언 아이템 ── */
function MobileAboutItem({ section }: { section: (typeof aboutSections)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[8px] border border-foreground/[0.08] bg-white/70 px-3.5 shadow-[0_8px_22px_rgba(33,29,25,0.035)]">
      <button
        type="button"
        data-no-section-nav
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 py-3.5 text-left"
        aria-expanded={open}
      >
        <div className="flex min-w-0 gap-3">
          <span className="mt-0.5 font-mono text-[10px] font-bold tracking-[0.06em] text-foreground/25">
            {section.number}
          </span>
          <div className="min-w-0">
            <span className="block text-[14px] font-semibold text-foreground tracking-[-0.01em]">
              {section.koreanTitle}
            </span>
            <span className="mt-1 block text-[11px] font-medium text-foreground/45">
              {section.englishTitle}
            </span>
            {!open && (
              <span className="mt-2 block text-[12px] leading-[1.55] text-foreground/58">
                {section.sentence}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 text-foreground/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
            <div className="pb-4 pl-[25px]">
              <p className="text-[14px] font-semibold leading-[1.6] tracking-[-0.02em] text-foreground mb-3">
                {section.sentence}
              </p>
              <div className="space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-[13px] leading-[1.78] text-foreground/62">
                    {p}
                  </p>
                ))}
              </div>
              {section.detailLink && (
                <button
                  type="button"
                  data-no-section-nav
                  onClick={() => window.dispatchEvent(new CustomEvent("slide-nav-goto", { detail: section.detailLink!.targetId }))}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground/60 hover:text-foreground transition-colors"
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
    <div className="mb-2 sm:mb-4">
      <span className="block text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-1 sm:mb-2">
        {label}
      </span>
      <h2 className="font-display text-[clamp(1.4rem,4.5vw,3.2rem)] font-black tracking-[-0.04em] leading-[0.95] text-foreground">
        {displayText}
      </h2>
    </div>
  );
}
