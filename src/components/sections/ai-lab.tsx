"use client";

import { memo, useState, useCallback } from "react";
import {
  ChevronDown,
  ExternalLink,
  FileText,
  Link2,
  Play,
} from "lucide-react";
import Image from "next/image";
import { SlideHeading } from "./about";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  AI_LAB_CATEGORIES,
  rulesMap,
  aiTools,
  mediaNotes,
  getYouTubeId,
  type AILabCategory,
  type AIRule,
  type AITool,
  type MediaNote,
} from "@/data/ai-lab-data";

/* ── Main Component ── */

export const AILab = memo(function AILab() {
  const [activeCategory, setActiveCategory] = useState<AILabCategory>("Principles");
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.8 });

  return (
    <div className="ai-lab-section" style={{ height: "100vh", overflow: "hidden" }}>
      <div
        data-scroller
        style={{
          height: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "100px 40px 120px",
          boxSizing: "border-box" as const,
        }}
      >
        <div className="max-w-[960px] mx-auto">
          {/* ── Heading ── */}
          <div ref={headingRef} className="mb-4">
            <SlideHeading label="AI Lab" title="AI Lab" />
          </div>

          {/* ── Subtitle ── */}
          <p className="text-sm leading-[1.8] text-[var(--notion-slate)] max-w-lg mb-10">
            A personal operating system for working, learning, and building with AI.
          </p>

          {/* ── Category Tabs ── */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-[var(--notion-hairline)] pb-5">
            {AI_LAB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                  activeCategory === cat
                    ? "bg-[var(--notion-ink)] text-white"
                    : "text-[var(--notion-stone)] hover:text-[var(--notion-ink)] hover:bg-[var(--notion-surface)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Content ── */}
          <div key={activeCategory}>
            {rulesMap[activeCategory] ? (
              <RulesList rules={rulesMap[activeCategory]} />
            ) : activeCategory === "AI Tools" ? (
              <ToolsGrid />
            ) : activeCategory === "Media Notes" ? (
              <MediaNotesList />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

/* ── Rules List ── */

function RulesList({ rules }: { rules: AIRule[] }) {
  return (
    <div className="space-y-0">
      {rules.map((rule, i) => (
        <div
          key={i}
          className="flex gap-5 py-5 border-b border-[var(--notion-hairline)] last:border-b-0"
        >
          <span className="text-[11px] font-semibold text-[var(--notion-stone)] tabular-nums pt-0.5 shrink-0 w-6">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-sm leading-[1.9] text-[var(--notion-ink)]">{rule.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ── AI Tools List ── */

const toolIconSrcMap: Record<string, string> = {
  "Claude Code": "/images/ai-tools/claude.png",
  ChatGPT: "/images/ai-tools/chatgpt.png",
  Cursor: "/images/ai-tools/cursor.png",
  "GitHub Copilot": "/images/ai-tools/github-copilot.png",
  Perplexity: "/images/ai-tools/perplexity.png",
  Suno: "/images/ai-tools/suno.png",
  Midjourney: "/images/ai-tools/midjourney.png",
  "v0 by Vercel": "/images/ai-tools/v0.png",
  "Image to Code Tool": "/images/ai-tools/v0.png",
  "Notion AI": "/images/ai-tools/notion.png",
  "Wrtn / 뤼튼": "/images/ai-tools/wrtn.png",
  "Claude (Web)": "/images/ai-tools/claude.png",
  Gemini: "/images/ai-tools/gemini.png",
};

function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {aiTools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
  const [expanded, setExpanded] = useState(false);
  const iconSrc = toolIconSrcMap[tool.name] ?? "/globe.svg";

  const toggle = useCallback(() => setExpanded((p) => !p), []);

  return (
    <div
      className="rounded-lg border border-[var(--notion-hairline)] p-5 transition-all duration-200 hover:border-[var(--notion-muted)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="relative mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-md bg-white">
            <Image
              src={iconSrc}
              alt={`${tool.name} logo`}
              fill
              sizes="32px"
              className="object-contain"
            />
          </span>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-[var(--notion-ink)] leading-snug">
              {tool.name}
            </h4>
            <p className="text-[11px] text-[var(--notion-stone)] mt-1">{tool.category}</p>
          </div>
        </div>
        <button
          onClick={toggle}
          className="shrink-0 p-1 text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Used For */}
      <p className="text-xs text-[var(--notion-slate)] mt-3 leading-relaxed">
        {tool.usedFor}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--notion-hairline)] space-y-4">
          {/* Use Case */}
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              My Use Case
            </h5>
            <p className="text-xs leading-[1.8] text-[var(--notion-slate)]">{tool.useCase}</p>
          </div>

          {/* Strengths */}
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              Strengths
            </h5>
            <ul className="space-y-1.5">
              {tool.strengths.map((s, i) => (
                <li key={i} className="text-xs leading-relaxed text-[var(--notion-slate)] flex gap-2">
                  <span className="text-[var(--notion-muted)] shrink-0">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              Limitations
            </h5>
            <ul className="space-y-1.5">
              {tool.limitations.map((l, i) => (
                <li key={i} className="text-xs leading-relaxed text-[var(--notion-slate)] flex gap-2">
                  <span className="text-[var(--notion-muted)] shrink-0">-</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>

          {/* Review */}
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              My Review
            </h5>
            <p className="text-xs leading-[1.8] text-[var(--notion-ink)]">{tool.review}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Media Notes ── */

const sourceIcon = {
  YouTube: Play,
  Article: FileText,
  Reference: Link2,
} as const;

function MediaNotesList() {
  return (
    <div>
      {/* ── Archive Description ── */}
      <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mb-10">
        Selected videos, papers, and articles I studied — with my summary, takeaways, and insights.
      </p>

      {/* ── Notes ── */}
      {mediaNotes.map((note, idx) => (
        <MediaNoteCard key={note.id} note={note} index={idx} />
      ))}
    </div>
  );
}

function MediaNoteCard({ note, index }: { note: MediaNote; index: number }) {
  const Icon = sourceIcon[note.sourceType];
  const youtubeId = note.sourceType === "YouTube" ? getYouTubeId(note.url) : null;
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  return (
    <section className="border-t border-[var(--notion-hairline)] pt-8 pb-10">
      {/* ── Label ── */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] font-semibold text-[var(--notion-stone)] uppercase tracking-[0.2em]">
          Media / {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[10px] text-[var(--notion-muted)]">/</span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[var(--notion-stone)] uppercase tracking-wider">
          <Icon className="w-3 h-3" strokeWidth={1.5} />
          {note.sourceType}
        </span>
      </div>

      {/* ── Title ── */}
      <h4 className="text-base font-bold text-[var(--notion-ink)] leading-snug mb-1">
        {note.title}
      </h4>
      <p className="text-[11px] text-[var(--notion-stone)] mb-6">{note.topic}</p>

      {/* ── 2-Column: Preview + Notes ── */}
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-[480px_1fr]">
        {/* Left: Preview */}
        <div>
          {embedUrl ? (
            <div style={{ maxWidth: 520 }}>
              <div className="relative w-full overflow-hidden rounded-lg border border-[var(--notion-hairline)] bg-black" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  src={embedUrl}
                  title={note.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 520 }}>
              <div className="relative w-full overflow-hidden rounded-lg border border-[var(--notion-hairline)] bg-[var(--notion-surface)] flex items-center justify-center" style={{ aspectRatio: "16 / 9" }}>
                <div className="text-center">
                  <Icon className="w-6 h-6 text-[var(--notion-muted)] mx-auto mb-2" strokeWidth={1} />
                  <p className="text-[10px] text-[var(--notion-muted)] mb-1">Preview unavailable</p>
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors underline underline-offset-2"
                  >
                    View Original
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {note.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[10px] text-[var(--notion-slate)]"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Source Link */}
          <a
            href={note.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors"
          >
            <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
            View Original
          </a>
        </div>

        {/* Right: Notes */}
        <div className="space-y-6">
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              Summary
            </h5>
            <p className="text-sm leading-[1.9] text-[var(--notion-slate)]">{note.summary}</p>
          </div>

          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              My Take
            </h5>
            <p className="text-sm leading-[1.9] text-[var(--notion-ink)]">{note.myTake}</p>
          </div>

          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              Insight
            </h5>
            <p className="text-sm leading-[1.9] text-[var(--notion-slate)]">{note.insight}</p>
          </div>

          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
              Applied To
            </h5>
            <p className="text-sm leading-[1.9] text-[var(--notion-slate)]">{note.appliedTo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
