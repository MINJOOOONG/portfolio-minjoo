"use client";

import { memo, useCallback, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
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
  AI_TOOL_FILTERS,
  agentFlowSteps,
  agentImplementationCards,
  aiLabArchiveNavItems,
  aiTools,
  claudeWorkflowCards,
  getYouTubeId,
  mediaNotes,
  operatingPrinciples,
  overviewSummaryCards,
  promptComparison,
  promptPatternCards,
  promptStructureCards,
  responsibleAiChecks,
  responsibleAiReferenceChips,
  skillChecklist,
  type AILabArchiveSectionId,
  type AILabSummaryCard,
  type AILabTextCard,
  type AITool,
  type AIToolFilter,
  type MediaNote,
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
            AI와 일하고, 배우고, 만드는 방식을 정리한 개인 작업 노트입니다.
          </p>

          <ArchiveNavigation onSelect={scrollToSection} />

          <main className="space-y-20 min-w-0">
            <ArchiveSection
              id="overview"
              eyebrow="개요"
              title="AI Lab"
              description="AI를 어떻게 학습하고 사용하는지 정리한 공간입니다. 프롬프트 규칙, Claude 작업 방식, RAG 패턴, 책임 있는 AI 점검, 도구 비교, Media Note를 한 흐름으로 묶었습니다."
            >
              <LineGrid>
                {overviewSummaryCards.map((card, index) => (
                  <SummaryItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            <ArchiveSection
              id="operating-principles"
              eyebrow="운영 원칙"
              title="AI를 쓰기 전에 지키는 기준"
              description="짧은 원칙들을 하나의 운영 방식으로 묶었습니다. AI는 빠르게 쓰되, 검증과 책임은 사람에게 남기는 기준입니다."
            >
              <LineGrid>
                {operatingPrinciples.map((card, index) => (
                  <TextItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            <ArchiveSection
              id="prompt-playbook"
              eyebrow="프롬프트"
              title="추측을 줄이는 프롬프트 규칙"
              description="긴 프롬프트 문서를 그대로 보여주기보다, 실제로 자주 쓰는 구조와 비교 예시만 화면용으로 요약했습니다."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-y border-[var(--notion-hairline)]">
                <PromptComparisonItem label="나쁜 예시" body={promptComparison.bad} tone="muted" />
                <PromptComparisonItem label="좋은 예시" body={promptComparison.better} tone="strong" />
              </div>

              <SubsectionLabel title="프롬프트 구조" />
              <LineGrid compact>
                {promptStructureCards.map((card, index) => (
                  <TextItem key={card.title} card={card} index={index} compact />
                ))}
              </LineGrid>

              <SubsectionLabel title="자주 쓰는 패턴" />
              <LineGrid>
                {promptPatternCards.map((card, index) => (
                  <TextItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            <ArchiveSection
              id="claude-skills"
              eyebrow="Claude & Skills"
              title="반복 프롬프트를 재사용 가능한 Skill로 바꾸기"
              description="Claude Skills는 반복 업무를 위한 온보딩 매뉴얼처럼 사용합니다. 매번 설명하던 작업 방식을 SKILL.md로 자산화합니다."
            >
              <LineGrid>
                {claudeWorkflowCards.map((card, index) => (
                  <TextItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>

              <SubsectionLabel title="Skill 작성 체크리스트" />
              <LineGrid>
                {skillChecklist.map((card, index) => (
                  <TextItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            <ArchiveSection
              id="agent-rag"
              eyebrow="Agent / RAG"
              title="출처 기반 AI 답변을 만드는 방식"
              description="일반 챗봇은 포트폴리오에 없는 내용도 그럴듯하게 생성할 수 있습니다. 그래서 AI Assistant는 문서를 먼저 검색하고, 검색된 문맥 안에서 답변하도록 설계합니다."
            >
              <AgentFlow />

              <SubsectionLabel title="구현 메모" />
              <LineGrid>
                {agentImplementationCards.map((card, index) => (
                  <TextItem key={card.title} card={card} index={index} />
                ))}
              </LineGrid>
            </ArchiveSection>

            <ArchiveSection
              id="responsible-ai"
              eyebrow="책임 있는 AI"
              title="AI 답변을 신뢰하거나 배포하기 전 확인할 것"
              description="법률 원문과 공공기관 자료는 화면에서는 긴 문단 대신 체크리스트로 압축했습니다. 실제 작업에서는 이 기준으로 개인정보, 고위험 영역, 출처, 승인 흐름을 확인합니다."
            >
              <ResponsibleChecklist />
            </ArchiveSection>

            <ArchiveSection
              id="ai-tool-stack"
              eyebrow="AI 도구"
              title="실제로 쓰고 비교한 도구들"
              description="AI 도구는 유행이 아니라 사용 목적 기준으로 비교합니다. 어디에 쓰는지, 무엇에 강한지, 어디서 조심해야 하는지를 함께 기록합니다."
            >
              <ToolsGrid
                activeFilter={activeToolFilter}
                tools={filteredTools}
                onFilterChange={setActiveToolFilter}
              />
            </ArchiveSection>

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

/* ── Layout ── */

function ArchiveNavigation({
  onSelect,
}: {
  onSelect: (id: AILabArchiveSectionId) => void;
}) {
  return (
    <nav className="sticky top-0 z-10 -mx-1 mb-16 border-y border-[var(--notion-hairline)] bg-white/95 py-3 backdrop-blur-sm">
      <div className="flex gap-2 overflow-x-auto px-1 pb-1">
        {aiLabArchiveNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="group shrink-0 px-3 py-2 rounded-md transition-colors text-left text-[11px] text-[var(--notion-stone)] hover:bg-[var(--notion-surface)] hover:text-[var(--notion-ink)]"
          >
            <span className="block text-[9px] font-semibold tracking-[0.18em] text-[var(--notion-muted)] group-hover:text-[var(--notion-stone)]">
              {item.eyebrow}
            </span>
            <span className="block mt-0.5 whitespace-nowrap">{item.label}</span>
          </button>
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

function PromptComparisonItem({
  label,
  body,
  tone,
}: {
  label: string;
  body: string;
  tone: "muted" | "strong";
}) {
  return (
    <article className="py-5 border-b border-[var(--notion-hairline)] last:border-b-0 md:border-b-0">
      <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--notion-stone)]">
        {label}
      </span>
      <p
        className={`text-sm leading-[1.9] mt-4 ${
          tone === "strong" ? "text-[var(--notion-ink)]" : "text-[var(--notion-slate)]"
        }`}
      >
        {body}
      </p>
    </article>
  );
}

function AgentFlow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-x-6 border-y border-[var(--notion-hairline)]">
      {agentFlowSteps.map((step, index) => (
        <div key={step} className="relative">
          <div className="min-h-[86px] py-4 border-b border-[var(--notion-hairline)] sm:last:border-b-0 xl:border-b-0">
            <span className="text-[10px] font-semibold text-[var(--notion-stone)] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-xs leading-[1.6] font-semibold text-[var(--notion-ink)] mt-3">
              {step}
            </p>
          </div>
          {index < agentFlowSteps.length - 1 && (
            <ArrowRight
              className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--notion-muted)]"
              strokeWidth={1.5}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ResponsibleChecklist() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 border-y border-[var(--notion-hairline)]">
        {responsibleAiChecks.map((check) => (
          <div
            key={check}
            className="flex gap-3 py-4 border-b border-[var(--notion-hairline)] last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[var(--notion-stone)]" strokeWidth={1.5} />
            <p className="text-xs leading-[1.8] text-[var(--notion-slate)]">{check}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {responsibleAiReferenceChips.map((chip) => (
          <span
            key={chip}
            className="text-[10px] px-2.5 py-1 rounded bg-[var(--notion-surface)] text-[var(--notion-slate)]"
          >
            {chip}
          </span>
        ))}
      </div>
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

      <p className="text-xs text-[var(--notion-slate)] mt-3 leading-relaxed">
        {tool.usedFor}
      </p>

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

function ToolDetail({
  title,
  body,
  strong = false,
}: {
  title: string;
  body: string;
  strong?: boolean;
}) {
  return (
    <div>
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
        {title}
      </h5>
      <p className={`text-xs leading-[1.8] ${strong ? "text-[var(--notion-ink)]" : "text-[var(--notion-slate)]"}`}>
        {body}
      </p>
    </div>
  );
}

function ToolList({
  title,
  items,
  marker,
}: {
  title: string;
  items: string[];
  marker: string;
}) {
  return (
    <div>
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
        {title}
      </h5>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-xs leading-relaxed text-[var(--notion-slate)] flex gap-2"
          >
            <span className="text-[var(--notion-muted)] shrink-0">{marker}</span>
            {item}
          </li>
        ))}
      </ul>
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

      <h4 className="text-base font-bold text-[var(--notion-ink)] leading-snug mb-1">
        {note.title}
      </h4>
      <p className="text-[11px] text-[var(--notion-stone)] mb-6">{note.topic}</p>

      <div className="grid gap-10 grid-cols-1 lg:grid-cols-[480px_1fr]">
        <div>
          {embedUrl ? (
            <div style={{ maxWidth: 520 }}>
              <div
                className="relative w-full overflow-hidden rounded-lg border border-[var(--notion-hairline)] bg-black"
                style={{ aspectRatio: "16 / 9" }}
              >
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
              <div
                className="relative w-full overflow-hidden rounded-lg border border-[var(--notion-hairline)] bg-[var(--notion-surface)] flex items-center justify-center"
                style={{ aspectRatio: "16 / 9" }}
              >
                <div className="text-center">
                  <Icon className="w-6 h-6 text-[var(--notion-muted)] mx-auto mb-2" strokeWidth={1} />
                  <p className="text-[10px] text-[var(--notion-muted)] mb-1">미리보기를 표시할 수 없습니다</p>
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors underline underline-offset-2"
                  >
                    원문 보기
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {note.keywords.map((kw) => (
              <span key={kw} className="text-[10px] text-[var(--notion-slate)]">
                {kw}
              </span>
            ))}
          </div>

          <a
            href={note.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-[10px] text-[var(--notion-stone)] hover:text-[var(--notion-ink)] transition-colors"
          >
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

function MediaNoteText({
  title,
  body,
  strong = false,
}: {
  title: string;
  body: string;
  strong?: boolean;
}) {
  return (
    <div>
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--notion-stone)] mb-2">
        {title}
      </h5>
      <p className={`text-sm leading-[1.9] ${strong ? "text-[var(--notion-ink)]" : "text-[var(--notion-slate)]"}`}>
        {body}
      </p>
    </div>
  );
}
