"use client";

import { memo, useCallback, useMemo, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  FileText,
  Link2,
  Play,
  Search,
} from "lucide-react";
import Image from "next/image";
import { SlideHeading } from "./about";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  AI_TOOL_FILTERS,
  GLOSSARY_CATEGORIES,
  aiLabArchiveNavItems,
  aiLabSectionIntros,
  aiLabSectionTitles,
  aiHistoryTimeline,
  aiUsageStandards,
  aiTools,
  getYouTubeId,
  glossaryTerms,
  mediaNotes,
  overviewIntroEn,
  type AIHistoryEvent,
  type AIUsageStandard,
  type AILabArchiveSectionId,
  type AITool,
  type AIToolFilter,
  type GlossaryCategory,
  type MediaNote,
} from "@/data/ai-lab-data";
import { useLanguage, type Lang } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";

const sectionDomId = (id: AILabArchiveSectionId) => `ai-lab-${id}`;
const toolFilterLabels: Record<AIToolFilter, Record<Lang, string>> = {
  All: { ko: "전체", en: "All" },
  Coding: { ko: "코딩", en: "Coding" },
  Writing: { ko: "글쓰기", en: "Writing" },
  Research: { ko: "리서치", en: "Research" },
  Design: { ko: "디자인", en: "Design" },
  Automation: { ko: "자동화", en: "Automation" },
};
const glossaryCategoryLabels: Record<GlossaryCategory, string> = {
  All: "All",
  Safety: "Safety",
  Evaluation: "Evaluation",
  Architecture: "Architecture",
  Technique: "Technique",
};
const standardEvidenceUrls: Record<string, string> = {
  "NIST AI RMF — Measure": "https://www.nist.gov/itl/ai-risk-management-framework",
  "NIST AI RMF — Govern": "https://www.nist.gov/itl/ai-risk-management-framework",
  "NIST AI RMF — Manage": "https://www.nist.gov/itl/ai-risk-management-framework",
  "NIST AI RMF — Map / Measure": "https://www.nist.gov/itl/ai-risk-management-framework",
  "OpenAI Model Spec": "https://model-spec.openai.com/",
  "OpenAI Usage Policies": "https://openai.com/policies/usage-policies/",
  "RAG / Grounding 기준": "https://www.nist.gov/itl/ai-risk-management-framework",
  "RAG / Grounding practice": "https://www.nist.gov/itl/ai-risk-management-framework",
  "EU AI Act — Human Oversight": "https://artificialintelligenceact.eu/",
  "EU AI Act — Risk-based approach": "https://artificialintelligenceact.eu/",
  "Google Gemini API Policy": "https://ai.google.dev/gemini-api/terms",
  "Google Responsible AI Practices": "https://ai.google/responsibility/responsible-ai-practices/",
  "Microsoft Responsible AI Standard": "https://www.microsoft.com/en-us/ai/principles-and-approach",
  "개인정보보호법 / EU AI Act": "https://artificialintelligenceact.eu/",
  "Privacy laws / EU AI Act": "https://artificialintelligenceact.eu/",
  "QA Test Case 방식": "/portfolio#experience",
  "QA test case practice": "/portfolio#experience",
  "AI Evaluation Framework": "https://www.nist.gov/itl/ai-risk-management-framework",
  "Agent / Tool Calling 안전 기준": "https://modelcontextprotocol.io/",
  "Agent / Tool Calling safety practice": "https://modelcontextprotocol.io/",
};

/* ── Main Component ── */

export const AILab = memo(function AILab() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<AILabArchiveSectionId>("overview");
  const [activeToolFilter, setActiveToolFilter] = useState<AIToolFilter>("All");
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.8 });

  const filteredTools = useMemo(() => {
    if (activeToolFilter === "All") return aiTools;
    return aiTools.filter((tool) => tool.groups.includes(activeToolFilter));
  }, [activeToolFilter]);

  const overviewIntroParagraphs = lang === "en"
    ? overviewIntroEn
    : [
        "AI는 이미 우리 일상 깊숙이 들어왔습니다. 이제 AI를 사용할지 말지가 아니라, 어떻게 사용할지가 중요한 시대입니다.",
        "AI 트렌드는 매일 바뀌고, 모델의 성능은 미친 속도로 진화하고 있습니다. 어제의 기준이 오늘은 통하지 않고, 오늘의 도구가 내일이면 대체됩니다. 프롬프트를 잘 쓰는 것은 이미 첫 번째 파도였고, 지금은 무엇을 시킬지, 결과를 어떻게 판단할지, 어디까지 신뢰할지가 핵심이 되었습니다.",
        "AI가 답을 만들 수 있는 시대에, 정답을 아는 능력의 가치는 낮아지고 있습니다. 대신 문제를 정의하고, 방향을 설정하고, 기준을 세우는 사람의 역할이 커지고 있습니다. 실행은 AI가 대신하더라도, 판단과 맥락은 직접 경험에서만 나옵니다.",
        "AI Lab은 그 변화에 뒤처지지 않기 위해 만든 공간입니다. 안전성, 평가 기준, 공식 정책, 도구 변화를 직접 추적하고 정리하며 배운 것을 내 언어와 기준으로 바꾸는 연습을 수시로 업데이트하고 있습니다.",
      ];

  return (
    <div className="ai-lab-section" style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* ── Fixed header: heading + tab nav (outside scroller) ── */}
      <div className="pt-12 sm:pt-20" style={{ flexShrink: 0, boxSizing: "border-box" as const }}>
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div ref={headingRef} className="mb-2 sm:mb-4">
            <SlideHeading label="AI Lab" title="AI Lab" />
          </div>
        </div>
        <ArchiveNavigation activeTab={activeTab} onSelect={setActiveTab} />
      </div>

      {/* ── Scrollable content ── */}
      <div
        data-scroller
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "0 24px 120px",
          boxSizing: "border-box" as const,
        }}
      >
        <div className="max-w-[1160px] mx-auto">
          <main className="min-w-0">
            {/* ── 1. Overview ── */}
            {activeTab === "overview" && (
              <ArchiveSection id="overview" title={aiLabSectionTitles.overviewTitle[lang]}>
                <div className="text-xs sm:text-sm leading-[1.8] text-[var(--notion-slate)] mb-5 sm:mb-8 max-w-2xl space-y-4">
                  {overviewIntroParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ArchiveSection>
            )}

            {/* ── 2. Standards ── */}
            {activeTab === "standards-rules" && (
              <ArchiveSection id="standards-rules" title={aiLabSectionTitles.standardsRulesTitle[lang]}>
                <StandardsRulesSection standards={aiUsageStandards} lang={lang} />
              </ArchiveSection>
            )}

            {/* ── 4. Glossary ── */}
            {activeTab === "ai-glossary" && (
              <ArchiveSection id="ai-glossary" title="Glossary">
                <SectionIntro lines={aiLabSectionIntros["ai-glossary"][lang]} />
                <GlossarySection />
              </ArchiveSection>
            )}

            {/* ── 5. Toolkit (AI Tools) ── */}
            {activeTab === "toolkit" && (
              <ArchiveSection id="toolkit" title="Toolkit">
                <SectionIntro lines={aiLabSectionIntros.toolkit[lang]} />
                <div className="mt-4">
                  <ToolsGrid
                    activeFilter={activeToolFilter}
                    tools={filteredTools}
                    onFilterChange={setActiveToolFilter}
                    lang={lang}
                  />
                </div>
              </ArchiveSection>
            )}

            {/* ── 6. History ── */}
            {activeTab === "history" && (
              <ArchiveSection id="history" title={aiLabSectionTitles.historyTitle[lang]}>
                <SectionIntro lines={aiLabSectionIntros.history[lang]} />
                <HistoryTimeline events={aiHistoryTimeline} lang={lang} />
              </ArchiveSection>
            )}

            {/* ── 7. Media Notes ── */}
            {activeTab === "media-note" && (
              <ArchiveSection id="media-note" title="Media Notes">
                <SectionIntro lines={aiLabSectionIntros["media-note"][lang]} />
                <MediaNotesList />
              </ArchiveSection>
            )}
          </main>
        </div>
      </div>
    </div>
  );
});

/* ── Layout Components ── */

function ArchiveNavigation({
  activeTab,
  onSelect,
}: {
  activeTab: AILabArchiveSectionId;
  onSelect: (id: AILabArchiveSectionId) => void;
}) {
  return (
    <nav className="mb-1 sm:mb-2 bg-white/95 py-2 sm:py-3" data-no-section-nav>
      <div
        className="mobile-scroll-tabs max-w-[1160px] mx-auto flex w-full min-w-0 gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 pb-1"
        data-no-section-nav
      >
        {aiLabArchiveNavItems.map((item) => (
          <button
            key={item.id}
            data-no-section-nav
            onClick={() => onSelect(item.id)}
            className={`snap-start shrink-0 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border text-[11px] font-medium transition-all duration-150 whitespace-nowrap ${
              activeTab === item.id
                ? "bg-[var(--notion-ink)] text-white border-[var(--notion-ink)]"
                : "border-[var(--notion-hairline)] bg-white text-[var(--notion-stone)] hover:bg-[var(--notion-ink)] hover:text-white hover:border-[var(--notion-ink)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function ArchiveSection({
  id,
  title,
  children,
}: {
  id: AILabArchiveSectionId;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={sectionDomId(id)}>
      <div className="pt-2">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--notion-ink)] mb-4 sm:mb-6 leading-tight">
          {title}
        </h3>
        <div className="space-y-4 sm:space-y-6">{children}</div>
      </div>
    </section>
  );
}

function SectionIntro({ lines }: { lines: string[] }) {
  return (
    <div className="py-5 sm:py-6">
      <div className="space-y-3 text-[13px] sm:text-sm leading-[1.9] text-[var(--notion-slate)]">
        {lines.map((line) => (
          <p key={line} className="lg:whitespace-nowrap">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] px-2 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/* ── Standards ── */

function StandardsRulesSection({ standards, lang }: { standards: AIUsageStandard[]; lang: Lang }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionIntro lines={aiLabSectionIntros["standards-rules"][lang]} />

      <div>
        {standards.map((standard, index) => {
          const evidence = lang === "en" ? standard.evidenceEn : standard.evidence;
          return (
            <article
              key={standard.title}
              className="border-b border-[var(--notion-hairline)] py-5 sm:py-6"
            >
              <div className="min-w-0">
                <h4 className="text-sm sm:text-[15px] font-bold leading-snug text-[var(--notion-ink)]">
                  <span className="mr-2 tabular-nums text-[var(--notion-stone)]">
                    {index + 1}.
                  </span>
                  {lang === "en" ? standard.titleEn : standard.title}
                </h4>
                <p className="mt-3 text-[13px] leading-[1.9] text-[var(--notion-slate)]">
                  {lang === "en" ? standard.reasonEn : standard.reason}
                  <span> </span>
                  <mark className="box-decoration-clone rounded-sm bg-[#fff1a8] px-1 py-0.5 text-[var(--notion-ink)]">
                    {lang === "en" ? standard.ruleEn : standard.rule}
                  </mark>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed">
                  <span className="font-semibold text-[var(--notion-stone)]">
                    {lang === "en" ? "Reference :" : "참고 :"}
                  </span>
                  {evidence.map((item, evidenceIndex) => {
                    const href = standardEvidenceUrls[item] ?? "#";
                    return (
                      <span key={item} className="inline-flex items-center gap-2">
                        <a
                          href={href}
                          target={href.startsWith("/") ? undefined : "_blank"}
                          rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                          className="text-[var(--notion-slate)] underline decoration-[var(--notion-muted)] underline-offset-4 transition-colors hover:text-[var(--notion-ink)]"
                        >
                          {item}
                        </a>
                        {evidenceIndex < evidence.length - 1 && (
                          <span className="text-[var(--notion-muted)]">/</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
}

/* ── Glossary (Accordion for mobile, table for desktop) ── */

function GlossarySection() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<GlossaryCategory>("All");

  const filtered = useMemo(() => {
    return glossaryTerms.filter((t) => {
      const matchCategory = category === "All" || t.category === category;
      const def = lang === "en" ? t.definitionEn : t.definition;
      const matchSearch =
        !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        def.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category, lang]);

  return (
    <div className="space-y-4">
      {/* Search and filter bar — mobile-optimized */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full max-w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--notion-muted)]" strokeWidth={1.5} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale["aiLab.glossarySearch"][lang]}
            className="w-full pl-9 pr-3 py-2.5 text-[13px] sm:text-xs border border-[var(--notion-hairline)] rounded-md bg-white text-[var(--notion-ink)] placeholder:text-[var(--notion-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--notion-stone)] box-border"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto">
          {GLOSSARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3 py-1.5 text-[11px] font-medium rounded-md transition-all duration-150 ${
                category === cat
                  ? "bg-[var(--notion-ink)] text-white"
                  : "text-[var(--notion-stone)] hover:text-[var(--notion-ink)] hover:bg-[var(--notion-surface)]"
              }`}
            >
              {glossaryCategoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: simple list */}
      <div className="sm:hidden border-t border-[var(--notion-hairline)]">
        {filtered.map((term) => (
          <div key={term.term} className="py-3 border-b border-[var(--notion-hairline)]">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[13px] font-semibold text-[var(--notion-ink)] leading-snug">{term.term}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-stone)] shrink-0">{term.category}</span>
            </div>
            <p className="text-xs leading-[1.75] text-[var(--notion-slate)]">{lang === "en" ? term.definitionEn : term.definition}</p>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto border border-[var(--notion-hairline)] rounded-md">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--notion-hairline)] bg-[var(--notion-surface)]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] w-[200px]">{locale["aiLab.glossaryTerm"][lang]}</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">{locale["aiLab.glossaryDescription"][lang]}</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] w-[100px]">{locale["aiLab.glossaryCategory"][lang]}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((term) => (
              <tr key={term.term} className="border-b border-[var(--notion-hairline)] last:border-b-0 hover:bg-[var(--notion-surface)]/50 transition-colors">
                <td className="px-4 py-3 font-medium text-[var(--notion-ink)] leading-[1.7] align-top whitespace-nowrap">{term.term}</td>
                <td className="px-4 py-3 text-[var(--notion-slate)] leading-[1.7] align-top">{lang === "en" ? term.definitionEn : term.definition}</td>
                <td className="px-4 py-3 align-top">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]">
                    {term.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-xs text-[var(--notion-muted)] text-center py-8">
          {locale["aiLab.glossaryNoResults"][lang]}
        </p>
      )}
    </div>
  );
}

/* ── History Timeline ── */

const historyCategoryMeta: Record<
  AIHistoryEvent["category"],
  { label: Record<Lang, string>; className: string }
> = {
  research: {
    label: { ko: "연구", en: "Research" },
    className: "bg-sky-50 text-sky-700 border-sky-100",
  },
  product: {
    label: { ko: "제품", en: "Product" },
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  regulation: {
    label: { ko: "규제", en: "Regulation" },
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
  milestone: {
    label: { ko: "전환점", en: "Milestone" },
    className: "bg-rose-50 text-rose-700 border-rose-100",
  },
};

function HistoryTimeline({ events, lang }: { events: AIHistoryEvent[]; lang: Lang }) {
  return (
    <div className="relative border-t border-[var(--notion-hairline)]">
      <div className="hidden sm:block absolute left-[84px] top-0 bottom-0 w-px bg-[var(--notion-hairline)]" />
      {events.map((event) => {
        const meta = historyCategoryMeta[event.category];
        return (
          <article
            key={`${event.year}-${event.title}`}
            className="relative border-b border-[var(--notion-hairline)] py-4 sm:grid sm:grid-cols-[72px_1fr] sm:gap-x-8 sm:py-5"
          >
            <div className="mb-2 sm:mb-0">
              <span className="text-[13px] font-bold tabular-nums text-[var(--notion-ink)]">
                {event.year}
              </span>
            </div>
            <span className="hidden sm:block absolute left-[80px] top-6 h-2 w-2 rounded-full border border-[var(--notion-stone)] bg-white" />
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded border px-2 py-0.5 text-[10px] font-medium ${meta.className}`}>
                  {meta.label[lang]}
                </span>
              </div>
              <h4 className="text-sm font-bold leading-snug text-[var(--notion-ink)]">
                {lang === "en" ? event.titleEn : event.title}
              </h4>
              <p className="mt-2 text-xs leading-[1.75] text-[var(--notion-slate)]">
                {lang === "en" ? event.descriptionEn : event.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ── AI Tools List (unchanged) ── */

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

function ToolsGrid({
  activeFilter,
  tools,
  onFilterChange,
  lang,
}: {
  activeFilter: AIToolFilter;
  tools: AITool[];
  onFilterChange: (filter: AIToolFilter) => void;
  lang: Lang;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {AI_TOOL_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
              activeFilter === filter
                ? "bg-[var(--notion-ink)] text-white"
                : "text-[var(--notion-stone)] hover:text-[var(--notion-ink)] hover:bg-[var(--notion-surface)]"
            }`}
          >
            {toolFilterLabels[filter][lang]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-y border-[var(--notion-hairline)]">
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool, lang }: { tool: AITool; lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  const iconSrc = toolIconSrcMap[tool.name] ?? "/globe.svg";
  const toggle = useCallback(() => setExpanded((p) => !p), []);

  return (
    <article className="py-5 border-b border-[var(--notion-hairline)] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="relative mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-md bg-white">
            <Image src={iconSrc} alt={`${tool.name} logo`} fill sizes="32px" className="object-contain" />
          </span>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-[var(--notion-ink)] leading-snug">{tool.name}</h4>
            <p className="text-[11px] text-[var(--notion-stone)] mt-1">{lang === "en" ? tool.categoryEn : tool.category}</p>
          </div>
        </div>
        <button onClick={toggle} className="shrink-0 p-1 text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors" aria-label={expanded ? "Collapse" : "Expand"}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} strokeWidth={1.5} />
        </button>
      </div>
      <p className="text-xs text-[var(--notion-slate)] mt-3 leading-relaxed">{lang === "en" ? tool.usedForEn : tool.usedFor}</p>
      <TagList tags={tool.tags} />
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--notion-hairline)] space-y-4">
          <ToolDetail title={locale["aiLab.useCase"][lang]} body={lang === "en" ? tool.useCaseEn : tool.useCase} strong />
          <ToolList title={locale["aiLab.strengths"][lang]} items={lang === "en" ? tool.strengthsEn : tool.strengths} marker="+" />
          <ToolList title={locale["aiLab.limitations"][lang]} items={lang === "en" ? tool.limitationsEn : tool.limitations} marker="-" />
          <ToolDetail title={locale["aiLab.myReview"][lang]} body={lang === "en" ? tool.reviewEn : tool.review} strong />
        </div>
      )}
    </article>
  );
}

function ToolDetail({ title, body, strong = false }: { title: string; body: string; strong?: boolean }) {
  return (
    <div>
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">{title}</h5>
      <p className={`text-xs leading-[1.8] ${strong ? "text-[var(--notion-ink)]" : "text-[var(--notion-slate)]"}`}>{body}</p>
    </div>
  );
}

function ToolList({ title, items, marker }: { title: string; items: string[]; marker: string }) {
  return (
    <div>
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">{title}</h5>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-xs leading-relaxed text-[var(--notion-slate)] flex gap-2">
            <span className="text-[var(--notion-muted)] shrink-0">{marker}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Media Notes (LOCKED — DO NOT MODIFY) ── */

const sourceIcon = {
  YouTube: Play,
  Article: FileText,
  Reference: Link2,
} as const;

function MediaNotesList() {
  return (
    <div>
      {mediaNotes.map((note) => (
        <MediaNoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

function MediaNoteCard({ note }: { note: MediaNote }) {
  const { lang } = useLanguage();
  const Icon = sourceIcon[note.sourceType];
  const youtubeId = note.sourceType === "YouTube" ? getYouTubeId(note.url) : null;
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  return (
    <section className="border-t border-[var(--notion-hairline)] pt-8 pb-10 first:border-t-0 first:pt-0">
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-[480px_1fr]">
        <div>
          {embedUrl ? (
            <div style={{ maxWidth: 520 }}>
              <div className="relative w-full overflow-hidden rounded-lg border border-[var(--notion-hairline)] bg-black" style={{ aspectRatio: "16 / 9" }}>
                <iframe src={embedUrl} title={note.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 h-full w-full" />
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 520 }}>
              <div className="relative w-full overflow-hidden rounded-lg border border-[var(--notion-hairline)] bg-[var(--notion-surface)] flex items-center justify-center" style={{ aspectRatio: "16 / 9" }}>
                <div className="text-center">
                  <Icon className="w-6 h-6 text-[var(--notion-muted)] mx-auto mb-2" strokeWidth={1} />
                  <p className="text-[10px] text-[var(--notion-muted)] mb-1">{locale["aiLab.noPreview"][lang]}</p>
                  <a href={note.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors underline underline-offset-2">{locale["aiLab.viewOriginal"][lang]}</a>
                </div>
              </div>
            </div>
          )}

          <a href={note.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors">
            <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
            {locale["aiLab.viewOriginal"][lang]}
          </a>
        </div>

        <div className="space-y-3 lg:pt-1">
          <h4 className="text-lg sm:text-xl font-bold leading-snug text-[var(--notion-ink)]">
            {note.title}
          </h4>
          <p className="text-sm leading-[1.9] text-[var(--notion-slate)]">
            {note.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
