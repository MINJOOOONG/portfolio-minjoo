"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SlideHeading } from "./about";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  status?: string;
  techStack?: string[];
}

interface ExperienceProps {
  items: ExperienceItem[];
}

const NOTION_TINTS = [
  "var(--notion-tint-lavender)",
  "var(--notion-tint-mint)",
  "var(--notion-tint-sky)",
  "var(--notion-tint-peach)",
  "var(--notion-tint-rose)",
  "var(--notion-tint-yellow)",
  "var(--notion-tint-cream)",
];

/* ── Timeline dot ── */
function TimelineDot({ active }: { active: boolean }) {
  return active ? (
    <span className="relative flex h-3 w-3">
      <span className="absolute inset-0 rounded-full bg-foreground/10 ring-[3px] ring-foreground/5" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-foreground/70" />
    </span>
  ) : (
    <span className="inline-flex h-2.5 w-2.5 rounded-full border border-foreground/15" />
  );
}

/* ── Detail content (shared between desktop & mobile) ── */
function CardDetails({ item, detailItems }: { item: ExperienceItem; detailItems: string[] }) {
  return (
    <>
      {detailItems.length > 0 && (
        <ul className="mb-2 sm:mb-3 space-y-1 sm:space-y-1.5">
          {detailItems.map((text, j) => (
            <li
              key={j}
              className="exp-child flex gap-2 text-[11px] leading-relaxed text-muted-foreground/75 sm:text-[13px] sm:gap-2.5"
            >
              <span className="mt-[0.35em] h-1 w-1 sm:h-1.5 sm:w-1.5 shrink-0 rounded-full bg-foreground/35" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}

      {item.techStack && item.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {item.techStack.map((t, i) => (
            <span
              key={t}
              className="px-2 py-px sm:px-2.5 sm:py-0.5 text-[10px] sm:text-[11px] font-medium rounded-md text-foreground/70"
              style={{ background: NOTION_TINTS[i % NOTION_TINTS.length] }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Card header (shared between desktop & mobile) ── */
function CardHeader({ item }: { item: ExperienceItem }) {
  return (
    <>
      <div className="exp-child flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
        <h3 className="font-display text-xl sm:text-2xl font-black tracking-[-0.02em] text-foreground">
          {item.company}
        </h3>
        {item.status && (
          <span className="text-[10px] px-2 py-0.5 rounded-full text-foreground/70 font-medium border border-foreground/15 tracking-wide">
            {item.status}
          </span>
        )}
      </div>
      <p className="exp-child text-[13px] text-foreground/80 font-medium">
        {item.role}
      </p>
      <p className="exp-child text-[11px] text-muted-foreground/60 tracking-wide mb-2.5">
        {item.period}
      </p>
    </>
  );
}

/* ── View Card ── */
function ViewCard({ item, defaultOpen }: { item: ExperienceItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const detailItems = [item.summary, ...(item.achievements ?? [])]
    .filter(Boolean)
    .slice(0, 4);

  const isActive = !!item.status;
  const hasDetails = detailItems.length > 0 || (item.techStack && item.techStack.length > 0);

  return (
    <>
      {/* ── Desktop: 기존 레이아웃 그대로 (항상 펼침) ── */}
      <div className="hidden md:flex relative gap-6 overflow-hidden rounded-2xl border border-transparent px-2 py-4">
        <div className="flex flex-col items-center pt-1">
          <TimelineDot active={isActive} />
          <div className="flex-1 w-px bg-[var(--notion-hairline)]" />
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <CardHeader item={item} />
          <CardDetails item={item} detailItems={detailItems} />
        </div>
      </div>

      {/* ── Mobile: 토글 아코디언 ── */}
      <div className="md:hidden relative flex gap-3 overflow-hidden rounded-xl border border-transparent px-1.5 py-2">
        <div className="flex flex-col items-center pt-0.5">
          <TimelineDot active={isActive} />
          <div className="flex-1 w-px bg-[var(--notion-hairline)]" />
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <button
            type="button"
            data-no-section-nav
            onClick={() => hasDetails && setOpen((v) => !v)}
            className="w-full text-left flex items-start justify-between gap-2"
          >
            <div className="flex-1 min-w-0">
              <div className="exp-child flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 mb-0.5">
                <h3 className="font-display text-base font-black tracking-[-0.02em] text-foreground">
                  {item.company}
                </h3>
                {item.status && (
                  <span className="text-[9px] px-1.5 py-px rounded-full text-foreground/70 font-medium border border-foreground/15 tracking-wide">
                    {item.status}
                  </span>
                )}
              </div>
              <p className="exp-child text-[11px] text-foreground/80 font-medium">
                {item.role}
              </p>
              <p className="exp-child text-[10px] text-muted-foreground/60 tracking-wide">
                {item.period}
              </p>
            </div>
            {hasDetails && (
              <ChevronDown
                className={`w-3.5 h-3.5 mt-1 shrink-0 text-foreground/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                strokeWidth={1.5}
              />
            )}
          </button>

          <AnimatePresence initial={false}>
            {open && hasDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2.5">
                  <CardDetails item={item} detailItems={detailItems} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

/* ── 메인 컴포넌트 ── */
export const Experience = memo(function Experience({ items }: ExperienceProps) {
  if (items.length === 0) return null;

  return (
    <div
      className="w-full"
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
        <div className="mb-2">
          <SlideHeading label="Experience" title="Work Experience" />
        </div>

        <div className="space-y-0.5">
          {items.map((item, i) => (
            <ViewCard key={i} item={item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
});
