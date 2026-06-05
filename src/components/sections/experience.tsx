"use client";

import { useState, memo } from "react";
import { SlideHeading } from "./about";
import { useLanguage } from "@/lib/i18n/language-context";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  summaryEn?: string;
  achievements: string[];
  achievementsEn?: string[];
  status?: string;
  techStack?: string[];
  companyIconUrl?: string;
  companyIconFallback?: string;
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
function TimelineIcon({ item, active }: { item: ExperienceItem; active: boolean }) {
  const isToss = item.company.includes("Toss");

  return (
    <span
      className={
        isToss
          ? "relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-visible"
          : `relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-white shadow-sm ${
              active ? "border-foreground/15 ring-[3px] ring-foreground/5" : "border-foreground/12"
            }`
      }
    >
      <CompanyIcon item={item} framed={false} />
    </span>
  );
}

/* ── Detail content (shared between desktop & mobile) ── */
function CardDetails({ item, detailItems }: { item: ExperienceItem; detailItems: string[] }) {
  const [leadItem, ...bulletItems] = detailItems;

  return (
    <>
      {leadItem && (
        <p className="exp-child mb-2 text-[10.5px] leading-relaxed text-muted-foreground/75 sm:mb-3 sm:text-[13px] sm:text-muted-foreground/80">
          {leadItem}
        </p>
      )}

      {bulletItems.length > 0 && (
        <ul className="mb-2 sm:mb-3 space-y-1 sm:space-y-1.5">
          {bulletItems.map((text, j) => (
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

function DetailList({ item, items }: { item: ExperienceItem; items: string[] }) {
  return (
    <>
      {items.length > 0 && (
        <ul className="mb-1.5 space-y-0.5">
          {items.map((text, j) => (
            <li
              key={j}
              className="exp-child flex gap-1.5 text-[10px] leading-[1.5] text-muted-foreground/75"
            >
              <span className="mt-[0.42em] h-1 w-1 shrink-0 rounded-full bg-foreground/35" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}

      {item.techStack && item.techStack.length > 0 && (
        <div className="flex flex-wrap gap-0.5">
          {item.techStack.map((t, i) => (
            <span
              key={t}
              className="px-1.5 py-px text-[9px] font-medium rounded-md text-foreground/70"
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

function CompanyIcon({
  item,
  compact = false,
  framed = true,
}: {
  item: ExperienceItem;
  compact?: boolean;
  framed?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const iconFallback = item.companyIconFallback ?? item.company.slice(0, 1).toUpperCase();
  const isRiwonsoft = item.company === "Riwonsoft";

  if (!item.companyIconUrl || failed || isRiwonsoft) {
    return (
      <span
        aria-hidden="true"
        className={`inline-grid shrink-0 place-items-center ${
          framed
            ? compact
              ? "h-[18px] w-[18px] rounded-md border border-foreground/10 bg-white shadow-sm"
              : "h-5 w-5 rounded-md border border-foreground/10 bg-white shadow-sm sm:h-6 sm:w-6"
            : "h-full w-full"
        }`}
      >
        {isRiwonsoft ? (
          <span className="grid h-[72%] w-[72%] grid-cols-2 gap-[2px] rounded-sm">
            <span className="rounded-[2px] bg-[var(--notion-tint-sky)]" />
            <span className="rounded-[2px] bg-[var(--notion-tint-mint)]" />
            <span className="rounded-[2px] bg-[var(--notion-tint-peach)]" />
            <span className="rounded-[2px] bg-[var(--notion-primary)]/75" />
          </span>
        ) : (
          <span className="text-[9px] font-bold text-foreground/55 sm:text-[10px]">
            {iconFallback}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden ${
        framed
          ? compact
            ? "h-[18px] w-[18px] rounded-md border border-foreground/10 bg-white shadow-sm"
            : "h-5 w-5 rounded-md border border-foreground/10 bg-white shadow-sm sm:h-6 sm:w-6"
          : "h-full w-full"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.companyIconUrl}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </span>
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
function ViewCard({ item }: { item: ExperienceItem }) {
  const { lang } = useLanguage();
  const summary = lang === "en" && item.summaryEn ? item.summaryEn : item.summary;
  const achievements = lang === "en" && item.achievementsEn ? item.achievementsEn : item.achievements;
  const baseDetailItems = [summary, ...(achievements ?? [])].filter(Boolean);
  const shouldShowFullCopy = item.company.includes("Toss");
  const desktopDetailItems = shouldShowFullCopy ? baseDetailItems : baseDetailItems.slice(0, 4);
  const mobileDetailItems = shouldShowFullCopy ? baseDetailItems : baseDetailItems.slice(0, 3);
  const [leadItem, ...mobileBulletItems] = mobileDetailItems;

  const isActive = !!item.status;

  return (
    <>
      {/* ── Desktop: 기존 레이아웃 그대로 (항상 펼침) ── */}
      <div className="hidden md:flex relative gap-6 overflow-hidden rounded-2xl border border-transparent px-2 py-4">
        <div className="flex flex-col items-center pt-1">
          <TimelineIcon item={item} active={isActive} />
          <div className="flex-1 w-px bg-[var(--notion-hairline)]" />
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <CardHeader item={item} />
          <CardDetails item={item} detailItems={desktopDetailItems} />
        </div>
      </div>

      {/* ── Mobile: 항상 펼침, 핵심 내용만 압축 표시 ── */}
      <div className="md:hidden relative flex gap-2.5 overflow-hidden rounded-xl border border-transparent px-1.5 py-2">
        <div className="flex flex-col items-center pt-0.5">
          <TimelineIcon item={item} active={isActive} />
          <div className="flex-1 w-px bg-[var(--notion-hairline)]" />
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
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
            {leadItem && (
              <p className="exp-child mt-1 text-[10px] leading-[1.5] text-muted-foreground/75">
                {leadItem}
              </p>
            )}
          </div>

          <div className="pt-1.5">
            <DetailList item={item} items={mobileBulletItems} />
          </div>
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
            <ViewCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
});
