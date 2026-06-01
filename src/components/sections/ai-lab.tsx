"use client";

import { memo, useCallback, useMemo, useState } from "react";
import {
  CheckCircle2,
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
  aiLabSectionTitles,
  aiTools,
  automationIdeas,
  euAiActRiskTable,
  euAiActRiskTableEn,
  evaluationQaConnection,
  getYouTubeId,
  glossaryTerms,
  mediaNotes,
  modelFamilies,
  modelSelectionGuide,
  modelSelectionGuideEn,
  nistRmfSteps,
  officialDocuments,
  overviewIntroEn,
  overviewNotes,
  overviewPurpose,
  releaseNotes,
  reviewFrameworkIntro,
  reviewFrameworkIntroEn,
  reviewFrameworkItems,
  rulesPrinciplesIntro,
  rulesPrinciplesIntroEn,
  safetyIntro,
  safetyIntroEn,
  safetyRiskCards,
  type AILabArchiveSectionId,
  type OverviewNote,
  type AILabTextCard,
  type AITool,
  type AIToolFilter,
  type DataTableData,
  type GlossaryCategory,
  type GlossaryTerm,
  type MediaNote,
  type ModelFamily,
  type OfficialDocument,
  type ReleaseNote,
  type ReviewFrameworkItem,
  type SafetyRiskCard,
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

  const evaluationQaEn = "Just as QA defines test cases first and validates repeatedly, AI outputs should also be evaluated by defining criteria first and validating repeatedly. The difference is that AI responses can vary even with the same input, so evaluation criteria must be even more explicit.";

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

            {/* ── 2. Standards (Safety + Review Framework) ── */}
            {activeTab === "standards" && (
              <ArchiveSection id="standards" title="Standards">
                {/* ─ Safety ─ */}
                <div className="mb-6 sm:mb-10 max-w-2xl">
                  <p className="text-[13px] sm:text-sm leading-[1.9] text-[var(--notion-slate)]">
                    {lang === "en" ? safetyIntroEn : safetyIntro}
                  </p>
                </div>

                <SubsectionLabel title={locale["aiLab.safetySubtitle"][lang]} />
                <div className="mt-3 space-y-0 border-t border-[var(--notion-hairline)]">
                  {safetyRiskCards.map((card, index) => (
                    <SafetyRiskItem key={card.risk} card={card} index={index} lang={lang} />
                  ))}
                </div>

                <div className="mt-10 sm:mt-14">
                  <SubsectionLabel title="NIST AI RMF 4 Steps" />
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {nistRmfSteps.map((card, index) => (
                      <NistStepItem key={card.title} card={card} index={index} lang={lang} />
                    ))}
                  </div>
                </div>

                {/* ─ Divider ─ */}
                <div className="my-10 sm:my-14 h-px bg-[var(--notion-hairline)]" />

                {/* ─ Review Framework ─ */}
                <SubsectionLabel title={locale["aiLab.reviewSubtitle"][lang]} />
                <div className="mt-4 mb-6 sm:mb-8 max-w-2xl">
                  <p className="text-[13px] sm:text-sm leading-[1.9] text-[var(--notion-slate)]">
                    {lang === "en" ? reviewFrameworkIntroEn : reviewFrameworkIntro}
                  </p>
                </div>

                <div className="border border-[var(--notion-hairline)] rounded-md bg-[var(--notion-surface)] px-4 sm:px-5 py-3 sm:py-4 mb-6 sm:mb-8">
                  <p className="text-xs leading-[1.8] text-[var(--notion-ink)]">
                    {lang === "en" ? evaluationQaEn : evaluationQaConnection}
                  </p>
                </div>

                <div className="space-y-0 border-t border-[var(--notion-hairline)]">
                  {reviewFrameworkItems.map((item, index) => (
                    <ReviewFrameworkItemComponent key={item.criterion} item={item} index={index} lang={lang} />
                  ))}
                </div>

                <div className="mt-10 sm:mt-14">
                  <SubsectionLabel title="Automation Ideas" />
                  <LineGrid>
                    {automationIdeas.map((idea, index) => (
                      <TextItem key={idea.title} card={idea} index={index} lang={lang} />
                    ))}
                  </LineGrid>
                </div>
              </ArchiveSection>
            )}

            {/* ── 3. Rules & Principles ── */}
            {activeTab === "rules-principles" && (
              <ArchiveSection id="rules-principles" title="Rules & Principles">
                <div className="mb-6 sm:mb-10 max-w-2xl">
                  <p className="text-[13px] sm:text-sm leading-[1.9] text-[var(--notion-slate)]">
                    {lang === "en" ? rulesPrinciplesIntroEn : rulesPrinciplesIntro}
                  </p>
                </div>

                {/* ─ Official Documents by category ─ */}
                <SubsectionLabel title="Company Policies & Principles" />
                <div className="mt-3 space-y-0 border-t border-[var(--notion-hairline)]">
                  {officialDocuments
                    .filter(d => d.category === "policy" || d.category === "principle")
                    .map((doc) => (
                      <OfficialDocumentItem key={`${doc.organization}-${doc.title}`} doc={doc} lang={lang} />
                    ))}
                </div>

                <div className="my-10 sm:my-14 h-px bg-[var(--notion-hairline)]" />

                <SubsectionLabel title="Regulations & Standards" />
                <div className="mt-3 space-y-0 border-t border-[var(--notion-hairline)]">
                  {officialDocuments
                    .filter(d => d.category === "regulation" || d.category === "standard")
                    .map((doc) => (
                      <OfficialDocumentItem key={`${doc.organization}-${doc.title}`} doc={doc} lang={lang} />
                    ))}
                </div>

                <div className="mt-10 sm:mt-14">
                  <SubsectionLabel title={aiLabSectionTitles.euTableTitle[lang]} />
                  <div className="mt-4">
                    <DataTable data={lang === "en" ? euAiActRiskTableEn : euAiActRiskTable} />
                  </div>
                </div>

                {/* ─ Release Notes / Timeline ─ */}
                <div className="my-10 sm:my-14 h-px bg-[var(--notion-hairline)]" />

                <SubsectionLabel title="Release Notes & Timeline" />
                <div className="mt-3 space-y-0 border-t border-[var(--notion-hairline)]">
                  {releaseNotes.map((note) => (
                    <ReleaseNoteItem key={`${note.date}-${note.title}`} note={note} lang={lang} />
                  ))}
                </div>
              </ArchiveSection>
            )}

            {/* ── 4. Glossary ── */}
            {activeTab === "ai-glossary" && (
              <ArchiveSection id="ai-glossary" title="Glossary">
                <GlossarySection />
              </ArchiveSection>
            )}

            {/* ── 5. Toolkit (Models + AI Tools) ── */}
            {activeTab === "toolkit" && (
              <ArchiveSection id="toolkit" title="Toolkit">
                {/* ─ Model Comparison ─ */}
                <SubsectionLabel title="Model Comparison" />
                <div className="mt-4 space-y-6">
                  {modelFamilies.map((family) => (
                    <ModelFamilyCard key={family.provider} family={family} lang={lang} />
                  ))}
                </div>

                <div className="mt-8 sm:mt-10">
                  <SubsectionLabel title={aiLabSectionTitles.modelGuideTitle[lang]} />
                  <div className="mt-4">
                    <DataTable data={lang === "en" ? modelSelectionGuideEn : modelSelectionGuide} />
                  </div>
                </div>

                {/* ─ Divider ─ */}
                <div className="my-10 sm:my-14 h-px bg-[var(--notion-hairline)]" />

                {/* ─ AI Tools ─ */}
                <SubsectionLabel title="AI Tools" />
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

            {/* ── 6. Media Notes ── */}
            {activeTab === "media-note" && (
              <ArchiveSection id="media-note" title="Media Notes">
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

function LineGrid({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 ${compact ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"} gap-x-10 border-y border-[var(--notion-hairline)]`}>
      {children}
    </div>
  );
}

function SubsectionLabel({ title }: { title: string }) {
  return (
    <h4 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--notion-stone)] pt-2">
      {title}
    </h4>
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

/* ── Content Items ── */

function OverviewNoteItem({ note, index }: { note: OverviewNote; index: number }) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <span className="shrink-0 text-[11px] font-bold tabular-nums text-[var(--notion-stone)]/40 pt-0.5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h4 className="text-[13px] sm:text-sm font-semibold text-[var(--notion-ink)] leading-snug mb-1.5">
          {note.heading}
        </h4>
        <p className="text-[12px] sm:text-[13px] leading-[1.75] text-[var(--notion-slate)]">
          {note.body}
        </p>
      </div>
    </div>
  );
}

function TextItem({
  card,
  index,
  compact = false,
  lang = "ko",
}: {
  card: AILabTextCard;
  index: number;
  compact?: boolean;
  lang?: Lang;
}) {
  return (
    <article className={`${compact ? "py-4" : "py-5"} border-b border-[var(--notion-hairline)] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0`}>
      <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="text-[13px] sm:text-sm font-bold text-[var(--notion-ink)] leading-snug mt-3">
        {card.title}
      </h4>
      <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-3">
        {lang === "en" && card.descriptionEn ? card.descriptionEn : card.description}
      </p>
      <TagList tags={card.tags} />
    </article>
  );
}

/* ── Safety Section (Editorial Style) ── */

function SafetyRiskItem({ card, index, lang }: { card: SafetyRiskCard; index: number; lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="border-b border-[var(--notion-hairline)]">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-start sm:items-center justify-between py-4 sm:py-5 text-left gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="text-sm font-bold text-[var(--notion-ink)] leading-snug">{card.risk}</h4>
          </div>
          <p className="text-xs text-[var(--notion-slate)] leading-relaxed ml-[calc(10px+0.75rem)]">
            {lang === "en" ? card.shortDescEn : card.shortDesc}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 shrink-0 mt-1 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="pb-5 pl-[calc(10px+0.75rem)] space-y-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              Why it matters
            </span>
            <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{lang === "en" ? card.whyItMattersEn : card.whyItMatters}</p>
          </div>
          <div className="border-l-2 border-[var(--notion-ink)]/20 pl-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              My evaluation rule
            </span>
            <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{lang === "en" ? card.myEvaluationRuleEn : card.myEvaluationRule}</p>
          </div>
          {card.source && (
            <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]">
              Ref: {card.source}
            </span>
          )}
        </div>
      )}
    </article>
  );
}

function NistStepItem({ card, index, lang }: { card: AILabTextCard; index: number; lang: Lang }) {
  return (
    <div className="border border-[var(--notion-hairline)] rounded-md px-4 sm:px-5 py-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className="text-[13px] sm:text-sm font-bold text-[var(--notion-ink)]">{card.title}</h4>
      </div>
      <p className="text-xs leading-[1.8] text-[var(--notion-slate)]">{lang === "en" && card.descriptionEn ? card.descriptionEn : card.description}</p>
    </div>
  );
}

/* ── Review Framework (Editorial Style) ── */

function ReviewFrameworkItemComponent({ item, index, lang }: { item: ReviewFrameworkItem; index: number; lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  const question = lang === "en" ? item.questionEn : item.question;
  const description = lang === "en" ? item.descriptionEn : item.description;
  const checkpoints = lang === "en" ? item.checkpointsEn : item.checkpoints;
  return (
    <article className="border-b border-[var(--notion-hairline)]">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-start sm:items-center justify-between py-4 sm:py-5 text-left gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="text-sm font-bold text-[var(--notion-ink)] leading-snug">{item.criterion}</h4>
            <span className="text-xs text-[var(--notion-slate)] hidden sm:inline">— {question}</span>
          </div>
          <p className="text-xs text-[var(--notion-slate)] leading-relaxed ml-[calc(10px+0.75rem)] sm:hidden">
            {question}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 shrink-0 mt-1 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="pb-5 pl-[calc(10px+0.75rem)] space-y-4">
          <p className="text-xs leading-[1.8] text-[var(--notion-slate)]">{description}</p>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              Checkpoints
            </span>
            <ul className="mt-2 space-y-1.5">
              {checkpoints.map((cp, i) => (
                <li key={i} className="flex gap-2 text-xs leading-[1.7] text-[var(--notion-ink)]">
                  <span className="text-[var(--notion-stone)] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={1.5} />
                  </span>
                  {cp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
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

      {/* Desktop: table view */}
      <div className="hidden md:block overflow-x-auto border border-[var(--notion-hairline)] rounded-md">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--notion-hairline)] bg-[var(--notion-surface)]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] w-[180px]">{locale["aiLab.glossaryTerm"][lang]}</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">{locale["aiLab.glossaryDescription"][lang]}</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] hidden lg:table-cell">My Note</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] w-[100px]">{locale["aiLab.glossaryCategory"][lang]}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((term) => (
              <tr key={term.term} className="border-b border-[var(--notion-hairline)] last:border-b-0 hover:bg-[var(--notion-surface)]/50 transition-colors">
                <td className="px-4 py-3 font-medium text-[var(--notion-ink)] leading-[1.7] align-top">{term.term}</td>
                <td className="px-4 py-3 text-[var(--notion-slate)] leading-[1.7] align-top">{lang === "en" ? term.definitionEn : term.definition}</td>
                <td className="px-4 py-3 text-[var(--notion-ink)] leading-[1.7] align-top hidden lg:table-cell">{lang === "en" ? term.myNoteEn : term.myNote}</td>
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

      {/* Mobile: accordion view */}
      <div className="md:hidden space-y-0 border-t border-[var(--notion-hairline)]">
        {filtered.map((term) => (
          <GlossaryAccordionItem key={term.term} term={term} lang={lang} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-xs text-[var(--notion-muted)] text-center py-8">
          {locale["aiLab.glossaryNoResults"][lang]}
        </p>
      )}
    </div>
  );
}

function GlossaryAccordionItem({ term, lang }: { term: GlossaryTerm; lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-[var(--notion-hairline)]">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between py-3.5 text-left gap-3"
      >
        <div className="flex items-center gap-2 min-w-0">
          <h4 className="text-[13px] font-semibold text-[var(--notion-ink)] leading-snug truncate">{term.term}</h4>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)] shrink-0">
            {term.category}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="pb-4 space-y-3">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">{locale["aiLab.glossaryDescription"][lang]}</span>
            <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{lang === "en" ? term.definitionEn : term.definition}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">Why it matters</span>
            <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{lang === "en" ? term.whyItMattersEn : term.whyItMatters}</p>
          </div>
          <div className="border-l-2 border-[var(--notion-ink)]/20 pl-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">My Note</span>
            <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{lang === "en" ? term.myNoteEn : term.myNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Official Document Archive ── */

const categoryLabels: Record<OfficialDocument["category"], string> = {
  policy: "Policy",
  principle: "Principle",
  regulation: "Regulation",
  standard: "Standard",
};

function OfficialDocumentItem({ doc, lang }: { doc: OfficialDocument; lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  const summary = lang === "en" ? doc.summaryEn : doc.summary;
  const keyPoints = lang === "en" ? doc.keyPointsEn : doc.keyPoints;
  return (
    <article className="border-b border-[var(--notion-hairline)]">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-start sm:items-center justify-between py-4 sm:py-5 text-left gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)] shrink-0">
              {doc.organization}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded border border-[var(--notion-hairline)] text-[var(--notion-stone)] shrink-0">
              {categoryLabels[doc.category]}
            </span>
          </div>
          <h4 className="text-[13px] sm:text-sm font-bold text-[var(--notion-ink)] leading-snug">{doc.title}</h4>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 shrink-0 mt-1 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="pb-5 space-y-4">
          <p className="text-xs leading-[1.8] text-[var(--notion-slate)]">{summary}</p>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              Key Points
            </span>
            <ul className="mt-2 space-y-1.5">
              {keyPoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-xs leading-[1.7] text-[var(--notion-ink)]">
                  <span className="text-[var(--notion-stone)] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={1.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors"
          >
            <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
            {locale["aiLab.viewDoc"][lang]}
          </a>
        </div>
      )}
    </article>
  );
}

function ReleaseNoteItem({ note, lang }: { note: ReleaseNote; lang: Lang }) {
  return (
    <article className="border-b border-[var(--notion-hairline)] py-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 w-[60px] sm:w-[72px]">
          <span className="text-[11px] font-semibold tabular-nums text-[var(--notion-stone)]">{note.date}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)] shrink-0">
              {note.organization}
            </span>
          </div>
          <h4 className="text-[13px] font-semibold text-[var(--notion-ink)] leading-snug mb-1">{note.title}</h4>
          <p className="text-xs leading-[1.7] text-[var(--notion-slate)]">{lang === "en" ? note.summaryEn : note.summary}</p>
          <a
            href={note.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors"
          >
            <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
            {locale["aiLab.source"][lang]}
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Other Components ── */

function ModelFamilyCard({ family, lang }: { family: ModelFamily; lang: Lang }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="border border-[var(--notion-hairline)] rounded-md">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <h4 className="text-sm font-bold text-[var(--notion-ink)]">{family.provider}</h4>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-[var(--notion-hairline)] pt-4">
          <div className="space-y-6">
            {family.models.map((model) => (
              <div key={model.model} className="space-y-2">
                <h5 className="text-xs font-bold text-[var(--notion-ink)]">{model.model}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">Strength</span>
                    <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{lang === "en" ? model.strengthEn : model.strength}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">Best use case</span>
                    <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{lang === "en" ? model.bestUseCaseEn : model.bestUseCase}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">Limitation</span>
                    <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{lang === "en" ? model.limitationEn : model.limitation}</p>
                  </div>
                  <div className="border-l-2 border-[var(--notion-hairline)] pl-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">My usage rule</span>
                    <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{lang === "en" ? model.myUsageRuleEn : model.myUsageRule}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

/* ── Data Table ── */

function DataTable({ data }: { data: DataTableData }) {
  return (
    <div className="overflow-x-auto border border-[var(--notion-hairline)] rounded-md">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[var(--notion-hairline)] bg-[var(--notion-surface)]">
            {data.headers.map((header) => (
              <th
                key={header}
                className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[var(--notion-hairline)] last:border-b-0"
            >
              {row.cells.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 leading-[1.7] ${
                    j === 0 ? "font-medium text-[var(--notion-ink)]" : "text-[var(--notion-slate)]"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
      {mediaNotes.map((note, idx) => (
        <MediaNoteCard key={note.id} note={note} index={idx} />
      ))}
    </div>
  );
}

function MediaNoteCard({ note, index }: { note: MediaNote; index: number }) {
  const { lang } = useLanguage();
  const Icon = sourceIcon[note.sourceType];
  const youtubeId = note.sourceType === "YouTube" ? getYouTubeId(note.url) : null;
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  return (
    <section className="border-t border-[var(--notion-hairline)] pt-8 pb-10 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] font-semibold text-[var(--notion-stone)] uppercase tracking-[0.2em]">
          {locale["aiLab.record"][lang]} / {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[10px] text-[var(--notion-muted)]">/</span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[var(--notion-stone)] uppercase tracking-wider">
          <Icon className="w-3 h-3" strokeWidth={1.5} />
          {note.sourceType}
        </span>
      </div>

      <h4 className="text-base font-bold text-[var(--notion-ink)] leading-snug mb-1">{note.title}</h4>
      <p className="text-[11px] text-[var(--notion-stone)] mb-6">{note.topic}</p>

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

          <div className="flex flex-wrap gap-2 mt-4">
            {note.keywords.map((kw) => (
              <span key={kw} className="text-[10px] text-[var(--notion-slate)]">{kw}</span>
            ))}
          </div>

          <a href={note.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors">
            <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
            {locale["aiLab.viewOriginal"][lang]}
          </a>
        </div>

        <div className="space-y-6">
          <MediaNoteText title={locale["aiLab.summary"][lang]} body={note.summary} />
          <MediaNoteText title={locale["aiLab.myTake"][lang]} body={note.myTake} strong />
          <MediaNoteText title={locale["aiLab.insight"][lang]} body={note.insight} />
          <div className="border-l border-[var(--notion-hairline)] pl-4">
            <MediaNoteText title={locale["aiLab.appliedTo"][lang]} body={note.appliedTo} strong />
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaNoteText({ title, body, strong = false }: { title: string; body: string; strong?: boolean }) {
  return (
    <div>
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">{title}</h5>
      <p className={`text-sm leading-[1.9] ${strong ? "text-[var(--notion-ink)]" : "text-[var(--notion-slate)]"}`}>{body}</p>
    </div>
  );
}
