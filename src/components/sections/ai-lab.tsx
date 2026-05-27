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
  aiTools,
  automationIdeas,
  companyPrinciples,
  euAiActRiskTable,
  evaluationCriteria,
  evaluationQaConnection,
  getYouTubeId,
  glossaryTerms,
  mediaNotes,
  modelFamilies,
  modelSelectionGuide,
  nistRmfSteps,
  overviewSummaryCards,
  policyItems,
  safetyRiskCards,
  type AILabArchiveSectionId,
  type AILabSummaryCard,
  type AILabTextCard,
  type AITool,
  type AIToolFilter,
  type CompanyPrinciple,
  type DataTableData,
  type EvaluationCriterion,
  type GlossaryCategory,
  type GlossaryTerm,
  type MediaNote,
  type ModelFamily,
  type PolicyItem,
  type SafetyRiskCard,
} from "@/data/ai-lab-data";

const sectionDomId = (id: AILabArchiveSectionId) => `ai-lab-${id}`;
const toolFilterLabels: Record<AIToolFilter, string> = {
  All: "전체",
  Coding: "코딩",
  Writing: "글쓰기",
  Research: "리서치",
  Design: "디자인",
  Automation: "자동화",
};
const glossaryCategoryLabels: Record<GlossaryCategory, string> = {
  All: "전체",
  Safety: "Safety",
  Evaluation: "Evaluation",
  Architecture: "Architecture",
  Technique: "Technique",
};

/* ── Main Component ── */

export const AILab = memo(function AILab() {
  const [activeToolFilter, setActiveToolFilter] = useState<AIToolFilter>("All");
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.8 });

  const filteredTools = useMemo(() => {
    if (activeToolFilter === "All") return aiTools;
    return aiTools.filter((tool) => tool.groups.includes(activeToolFilter));
  }, [activeToolFilter]);

  const scrollToSection = useCallback((id: AILabArchiveSectionId) => {
    document.getElementById(sectionDomId(id))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

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
          padding: "100px 28px 120px",
          boxSizing: "border-box" as const,
        }}
      >
        <div className="max-w-[1160px] mx-auto">
          <div ref={headingRef} className="mb-4">
            <SlideHeading label="AI Lab" title="AI Lab" />
          </div>

          <p className="text-sm leading-[1.8] text-[var(--notion-slate)] max-w-lg mb-10">
            AI 품질, 안전성, 평가, 정책을 공부하고 정리하는 개인 작업 노트입니다.
          </p>

          <ArchiveNavigation onSelect={scrollToSection} />

          <main className="space-y-20 min-w-0">
            {/* 01 — Overview */}
            <ArchiveSection
              id="overview"
              eyebrow="Overview"
              title="AI Quality & Safety Lab"
              description="AI를 많이 써본 것이 아니라, AI 서비스를 안전하게 출시하기 위해 품질·안전성·평가·정책·모델 특성을 공부하고 나만의 기준으로 정리해온 공간입니다."
            >
              <LineGrid>
                {overviewSummaryCards.map((card, index) => (
                  <SummaryItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            {/* 02 — Safety Framework */}
            <ArchiveSection
              id="safety-framework"
              eyebrow="Safety Framework"
              title="AI 서비스 출시 전 안전성 기준"
              description="금융 서비스 관점에서 AI 답변의 7가지 리스크를 정의하고, 각 리스크별 평가 규칙을 정리했습니다. QA에서 TC를 먼저 정의하듯, 안전성도 기준이 먼저입니다."
            >
              <LineGrid>
                {safetyRiskCards.map((card, index) => (
                  <SafetyRiskItem key={card.risk} card={card} index={index} />
                ))}
              </LineGrid>

              <SubsectionLabel title="NIST AI RMF 4단계" />
              <LineGrid>
                {nistRmfSteps.map((card, index) => (
                  <TextItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            {/* 03 — Evaluation Playbook */}
            <ArchiveSection
              id="evaluation-playbook"
              eyebrow="Evaluation Playbook"
              title="AI 답변 평가 체크리스트"
              description="Toss QA에서 TC 기반으로 체크하듯, AI 답변도 평가 기준을 먼저 정의하고 반복 검증합니다."
            >
              <div className="border border-[var(--notion-hairline)] rounded-md bg-[var(--notion-surface)] px-5 py-4 mb-6">
                <p className="text-xs leading-[1.8] text-[var(--notion-ink)]">
                  {evaluationQaConnection}
                </p>
              </div>

              <div className="space-y-4">
                {evaluationCriteria.map((item, index) => (
                  <EvaluationItem key={item.criterion} item={item} index={index} />
                ))}
              </div>

              <SubsectionLabel title="자동화 아이디어" />
              <LineGrid>
                {automationIdeas.map((idea, index) => (
                  <TextItem key={idea.title} card={idea} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            {/* 04 — AI Glossary */}
            <ArchiveSection
              id="ai-glossary"
              eyebrow="AI Dictionary"
              title="AI 용어 정리"
              description="교과서 정의가 아니라, 내가 이해한 방식으로 정리한 용어집입니다. 각 용어에 실무 관점의 메모를 달았습니다."
            >
              <GlossaryTable />
            </ArchiveSection>

            {/* 05 — Policy & Regulation */}
            <ArchiveSection
              id="ai-policy"
              eyebrow="Policy & Regulation"
              title="AI 법·정책 핵심 정리"
              description="EU AI Act, 한국 AI 기본법, 개인정보보호법 등 AI 관련 법·정책을 금융 서비스 관점에서 정리했습니다."
            >
              <div className="space-y-4">
                {policyItems.map((item, index) => (
                  <PolicyCard key={item.title} item={item} index={index} />
                ))}
              </div>

              <SubsectionLabel title="EU AI Act 위험 분류" />
              <DataTable data={euAiActRiskTable} />
            </ArchiveSection>

            {/* 06 — Company AI Principles */}
            <ArchiveSection
              id="company-principles"
              eyebrow="Company AI Principles"
              title="AI 회사별 안전 원칙 비교"
              description="OpenAI, Anthropic, Google, Microsoft가 AI 안전을 어떻게 정의하는지 비교하고, QA 경험과 연결해 배운 점을 정리했습니다."
            >
              <div className="space-y-4">
                {companyPrinciples.map((cp) => (
                  <CompanyPrincipleCard key={cp.company} data={cp} />
                ))}
              </div>
            </ArchiveSection>

            {/* 07 — Model Comparison */}
            <ArchiveSection
              id="model-comparison"
              eyebrow="Model Comparison"
              title="모델별 특성과 선택 기준"
              description="모델 이름을 외우는 것이 아니라, 작업 유형에 따라 어떤 모델 계열을 선택할지 기준을 정리했습니다."
            >
              <div className="space-y-6">
                {modelFamilies.map((family) => (
                  <ModelFamilyCard key={family.provider} family={family} />
                ))}
              </div>

              <SubsectionLabel title="작업별 모델 선택 가이드" />
              <DataTable data={modelSelectionGuide} />
            </ArchiveSection>

            {/* 08 — AI Tools (unchanged) */}
            <ArchiveSection
              id="ai-tool-stack"
              eyebrow="AI Tools"
              title="실제로 쓰고 비교한 도구들"
              description="AI 도구는 유행이 아니라 사용 목적 기준으로 비교합니다. 어디에 쓰는지, 무엇에 강한지, 어디서 조심해야 하는지를 함께 기록합니다."
            >
              <ToolsGrid
                activeFilter={activeToolFilter}
                tools={filteredTools}
                onFilterChange={setActiveToolFilter}
              />
            </ArchiveSection>

            {/* 09 — Media Notes (LOCKED — unchanged) */}
            <ArchiveSection
              id="media-note"
              eyebrow="Media Note"
              title="Media Note"
              description="AI 작업 방식을 만들면서 본 영상, 글, 발표, 레퍼런스를 정리한 기록입니다."
            >
              <MediaNotesList />
            </ArchiveSection>
          </main>
        </div>
      </div>
    </div>
  );
});

/* ── Layout Components ── */

function ArchiveNavigation({
  onSelect,
}: {
  onSelect: (id: AILabArchiveSectionId) => void;
}) {
  // Group items by their group label
  const groups = useMemo(() => {
    const result: { group: string; items: typeof aiLabArchiveNavItems }[] = [];
    for (const item of aiLabArchiveNavItems) {
      const g = item.group ?? "";
      const last = result[result.length - 1];
      if (last && last.group === g) {
        last.items.push(item);
      } else {
        result.push({ group: g, items: [item] });
      }
    }
    return result;
  }, []);

  return (
    <nav className="sticky top-0 z-10 -mx-1 mb-16 bg-white/95 py-4 backdrop-blur-sm">
      <div className="flex gap-6 overflow-x-auto px-1 pb-1">
        {groups.map((g) => (
          <div key={g.group} className="shrink-0">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-muted)] mb-2 pl-1">
              {g.group}
            </span>
            <div className="flex gap-1">
              {g.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className="shrink-0 px-3.5 py-2 rounded-lg border border-[var(--notion-hairline)] bg-white text-[11px] font-medium text-[var(--notion-stone)] hover:bg-[var(--notion-ink)] hover:text-white hover:border-[var(--notion-ink)] transition-all duration-150 whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

function ArchiveSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: AILabArchiveSectionId;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={sectionDomId(id)} className="scroll-mt-24">
      <div className="border-t border-[var(--notion-hairline)] pt-8">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--notion-stone)]">
          {eyebrow}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-[var(--notion-ink)] mt-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm leading-[1.9] text-[var(--notion-slate)] max-w-2xl mt-4 mb-8">
          {description}
        </p>
        <div className="space-y-6">{children}</div>
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

function SummaryItem({ card, index }: { card: AILabSummaryCard; index: number }) {
  return (
    <article className="py-5 border-b border-[var(--notion-hairline)] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0">
      <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="text-sm font-bold text-[var(--notion-ink)] leading-snug">
        {card.title}
      </h4>
      <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-3">
        {card.description}
      </p>
      <TagList tags={card.tags} />
    </article>
  );
}

function TextItem({
  card,
  index,
  compact = false,
}: {
  card: AILabTextCard;
  index: number;
  compact?: boolean;
}) {
  return (
    <article className={`${compact ? "py-4" : "py-5"} border-b border-[var(--notion-hairline)] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0`}>
      <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="text-sm font-bold text-[var(--notion-ink)] leading-snug mt-3">
        {card.title}
      </h4>
      <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-3">
        {card.description}
      </p>
      <TagList tags={card.tags} />
    </article>
  );
}

/* ── New Section Components ── */

function SafetyRiskItem({ card, index }: { card: SafetyRiskCard; index: number }) {
  return (
    <article className="py-5 border-b border-[var(--notion-hairline)] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0">
      <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="text-sm font-bold text-[var(--notion-ink)] leading-snug mt-1">
        {card.risk}
      </h4>
      <div className="mt-3 space-y-3">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
            Why it matters
          </span>
          <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{card.whyItMatters}</p>
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
            My evaluation rule
          </span>
          <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{card.myEvaluationRule}</p>
        </div>
      </div>
      {card.source && (
        <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]">
          Ref: {card.source}
        </span>
      )}
    </article>
  );
}

function EvaluationItem({ item, index }: { item: EvaluationCriterion; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="border border-[var(--notion-hairline)] rounded-md">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="text-sm font-bold text-[var(--notion-ink)]">{item.criterion}</h4>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-[var(--notion-hairline)] pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
                Good response
              </span>
              <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{item.goodResponse}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-red-500">
                Risky response
              </span>
              <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{item.riskyResponse}</p>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              How to verify
            </span>
            <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{item.howToVerify}</p>
          </div>
        </div>
      )}
    </article>
  );
}

function GlossaryTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<GlossaryCategory>("All");

  const filtered = useMemo(() => {
    return glossaryTerms.filter((t) => {
      const matchCategory = category === "All" || t.category === category;
      const matchSearch =
        !search ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--notion-muted)]" strokeWidth={1.5} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="용어 검색..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[var(--notion-hairline)] rounded-md bg-white text-[var(--notion-ink)] placeholder:text-[var(--notion-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--notion-stone)]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {GLOSSARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-all duration-150 ${
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

      <div className="overflow-x-auto border border-[var(--notion-hairline)] rounded-md">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--notion-hairline)] bg-[var(--notion-surface)]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] w-[180px]">용어</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">설명</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] hidden lg:table-cell">My Note</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)] w-[100px]">분류</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((term) => (
              <tr key={term.term} className="border-b border-[var(--notion-hairline)] last:border-b-0 hover:bg-[var(--notion-surface)]/50 transition-colors">
                <td className="px-4 py-3 font-medium text-[var(--notion-ink)] leading-[1.7] align-top">{term.term}</td>
                <td className="px-4 py-3 text-[var(--notion-slate)] leading-[1.7] align-top">{term.definition}</td>
                <td className="px-4 py-3 text-[var(--notion-ink)] leading-[1.7] align-top hidden lg:table-cell">{term.myNote}</td>
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
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}

function PolicyCard({ item, index }: { item: PolicyItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="border border-[var(--notion-hairline)] rounded-md">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="text-sm font-bold text-[var(--notion-ink)]">{item.title}</h4>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-[var(--notion-hairline)] pt-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              What it says
            </span>
            <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{item.whatItSays}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              Why it matters
            </span>
            <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{item.whyItMatters}</p>
          </div>
          <div className="border-l-2 border-[var(--notion-hairline)] pl-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
              My takeaway
            </span>
            <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{item.myTakeaway}</p>
          </div>
          <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]">
            Ref: {item.source}
          </span>
        </div>
      )}
    </article>
  );
}

function CompanyPrincipleCard({ data }: { data: CompanyPrinciple }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="border border-[var(--notion-hairline)] rounded-md">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <h4 className="text-sm font-bold text-[var(--notion-ink)]">{data.company}</h4>
        <ChevronDown
          className={`w-4 h-4 text-[var(--notion-stone)] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-[var(--notion-hairline)] pt-4">
          {data.principles.map((p) => (
            <div key={p.principle} className="space-y-2">
              <h5 className="text-xs font-bold text-[var(--notion-ink)]">{p.principle}</h5>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
                  Key idea
                </span>
                <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{p.keyIdea}</p>
              </div>
              <div className="border-l-2 border-[var(--notion-hairline)] pl-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">
                  What I learned
                </span>
                <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{p.whatILearned}</p>
              </div>
            </div>
          ))}
          <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]">
            Ref: {data.source}
          </span>
        </div>
      )}
    </article>
  );
}

function ModelFamilyCard({ family }: { family: ModelFamily }) {
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
                    <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{model.strength}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">Best use case</span>
                    <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{model.bestUseCase}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">Limitation</span>
                    <p className="text-xs leading-[1.8] text-[var(--notion-slate)] mt-1">{model.limitation}</p>
                  </div>
                  <div className="border-l-2 border-[var(--notion-hairline)] pl-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--notion-stone)]">My usage rule</span>
                    <p className="text-xs leading-[1.8] text-[var(--notion-ink)] mt-1">{model.myUsageRule}</p>
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
}: {
  activeFilter: AIToolFilter;
  tools: AITool[];
  onFilterChange: (filter: AIToolFilter) => void;
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
            {toolFilterLabels[filter]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-y border-[var(--notion-hairline)]">
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
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
            <p className="text-[11px] text-[var(--notion-stone)] mt-1">{tool.category}</p>
          </div>
        </div>
        <button onClick={toggle} className="shrink-0 p-1 text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors" aria-label={expanded ? "Collapse" : "Expand"}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} strokeWidth={1.5} />
        </button>
      </div>
      <p className="text-xs text-[var(--notion-slate)] mt-3 leading-relaxed">{tool.usedFor}</p>
      <TagList tags={tool.tags} />
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[var(--notion-hairline)] space-y-4">
          <ToolDetail title="사용 방식" body={tool.useCase} strong />
          <ToolList title="강점" items={tool.strengths} marker="+" />
          <ToolList title="주의할 점" items={tool.limitations} marker="-" />
          <ToolDetail title="내 평가" body={tool.review} strong />
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
  const Icon = sourceIcon[note.sourceType];
  const youtubeId = note.sourceType === "YouTube" ? getYouTubeId(note.url) : null;
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  return (
    <section className="border-t border-[var(--notion-hairline)] pt-8 pb-10 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] font-semibold text-[var(--notion-stone)] uppercase tracking-[0.2em]">
          기록 / {String(index + 1).padStart(2, "0")}
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
                  <p className="text-[10px] text-[var(--notion-muted)] mb-1">미리보기를 표시할 수 없습니다</p>
                  <a href={note.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors underline underline-offset-2">원문 보기</a>
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
            원문 보기
          </a>
        </div>

        <div className="space-y-6">
          <MediaNoteText title="요약" body={note.summary} />
          <MediaNoteText title="내 해석" body={note.myTake} strong />
          <MediaNoteText title="인사이트" body={note.insight} />
          <div className="border-l border-[var(--notion-hairline)] pl-4">
            <MediaNoteText title="적용한 부분" body={note.appliedTo} strong />
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
