"use client";

import { useState, useEffect, memo, type CSSProperties } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { isArticleProject } from "@/lib/project-groups";

const ProjectMiniScene = dynamic(
  () => import("@/components/three/project-scenes"),
  { ssr: false }
);

const PdfViewer = dynamic(
  () => import("@/components/shared/pdf-viewer"),
  { ssr: false }
);

/* ── 타입 ── */
export interface ProjectMedia {
  type: "image" | "video" | "pdf";
  url: string;
  title?: string;
}

export interface ProjectAttachment {
  type: "pdf" | "file";
  title: string;
  url: string;
}

export interface CaseStudyBlock {
  heading: string;
  body: string[];
}

export type ContentBlock =
  | { type: "text"; heading?: string; body: string[] }
  | { type: "image"; url: string; caption?: string }
  | { type: "video"; url: string; caption?: string }
  | { type: "pdf"; url: string; caption?: string }
  | { type: "audio"; url: string; caption?: string }
  | { type: "file"; url: string; title: string };

export interface ProjectItem {
  title: string;
  teamSize: string;
  period: string;
  summary: string;
  description: string[];
  techStack: string[];
  media?: ProjectMedia;
  gallery?: ProjectMedia[];
  attachments?: ProjectAttachment[];
  githubUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  caseStudy?: CaseStudyBlock[];
  contentBlocks?: ContentBlock[];
}

interface ProjectsProps {
  items: ProjectItem[];
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

const DEFAULT_MEDIA_RATIO = 4 / 3;
const DEFAULT_PDF_RATIO = 595.2756 / 841.8898;

/* ── 카드 심볼 (이미지 없을 때 기하학 아이콘) ── */
const SYMBOLS = ["◆", "○", "△", "□", "◇", "▽", "⬡", "✦"];

/* ── 케이스 스터디 자동 생성 ── */
function buildCaseStudy(item: ProjectItem): CaseStudyBlock[] {
  if (item.caseStudy && item.caseStudy.length > 0) return item.caseStudy;

  const desc = item.description ?? [];
  if (desc.length === 0) return [];

  const blocks: CaseStudyBlock[] = [];

  blocks.push({
    heading: "프로젝트 개요",
    body: [item.summary || desc[0]],
  });

  if (desc.length > 1) {
    blocks.push({
      heading: "주요 구현",
      body: desc.slice(1, Math.min(4, desc.length)),
    });
  }

  if (desc.length >= 4) {
    blocks.push({
      heading: "기술적 고민",
      body: desc.slice(Math.min(4, desc.length - 1), desc.length),
    });
  }

  if (item.techStack.length > 0) {
    blocks.push({
      heading: "기술 스택",
      body: [item.techStack.join(", ")],
    });
  }

  blocks.push({
    heading: "결과 및 배운 점",
    body: ["프로젝트를 통해 실무 수준의 설계와 구현 역량을 확보했습니다."],
  });

  return blocks;
}

/* ── 미디어 렌더러 ── */
function MediaPreview({
  media,
  title,
  techStack,
  onMediaRatioChange,
}: {
  media?: ProjectMedia;
  title?: string;
  techStack?: string[];
  onMediaRatioChange?: (ratio: number) => void;
}) {
  if (!media || !media.url) {
    if (title && techStack) {
      return <ProjectMiniScene title={title} techStack={techStack} />;
    }
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
        No media
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={media.url}
        controls
        className="w-full h-full object-contain"
        preload="metadata"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          if (video.videoWidth && video.videoHeight) {
            onMediaRatioChange?.(video.videoWidth / video.videoHeight);
          }
        }}
      />
    );
  }

  if (media.type === "pdf") {
    return <PdfViewer url={media.url} onPageRatioChange={onMediaRatioChange} />;
  }

  return (
    <Image
      src={media.url}
      alt={media.title || title || "project"}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 460px"
      onLoad={(event) => {
        const image = event.currentTarget;
        if (image.naturalWidth && image.naturalHeight) {
          onMediaRatioChange?.(image.naturalWidth / image.naturalHeight);
        }
      }}
    />
  );
}

function ProjectMediaGallery({
  items,
  mainUrl,
}: {
  items?: ProjectMedia[];
  mainUrl?: string;
}) {
  const galleryItems = (items ?? []).filter((item) => item.url !== mainUrl);
  if (galleryItems.length === 0) return null;

  return (
    <section className="pj-media-section">
      <h4 className="pj-modal__section-title">프로젝트 미디어</h4>
      <div className="pj-media-grid">
        {galleryItems.map((item, index) => (
          <figure key={`${item.url}-${index}`} className="pj-media-item">
            {item.type === "video" ? (
              <video
                src={item.url}
                controls
                preload="metadata"
                className="pj-media-item__asset"
              />
            ) : (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-media-item__asset"
                aria-label={`${item.title ?? "프로젝트 이미지"} 새 창으로 보기`}
              >
                <Image
                  src={item.url}
                  alt={item.title ?? "프로젝트 이미지"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 180px"
                />
              </a>
            )}
            {item.title && <figcaption>{item.title}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

function ProjectAttachmentList({ items }: { items?: ProjectAttachment[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="pj-media-section">
      <h4 className="pj-modal__section-title">첨부 문서</h4>
      <div className="pj-attachment-list">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pj-attachment-link"
          >
            <span className="pj-attachment-link__type">
              {item.type === "pdf" ? "PDF" : "FILE"}
            </span>
            <span className="pj-attachment-link__title">{item.title}</span>
            <span className="pj-attachment-link__open">열기</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ── 콘텐츠 블록 렌더러 (블로그 스타일) ── */
function ContentBlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="pj-content-flow">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <motion.section
                key={`text-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {block.heading && (
                  <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/50 font-semibold mb-3">
                    {block.heading}
                  </h4>
                )}
                <ul className="space-y-2">
                  {block.body.map((line, j) => (
                    <li
                      key={j}
                      className="text-[14px] text-foreground/80 leading-[1.75] flex gap-2.5"
                    >
                      {block.body.length > 1 && (
                        <span className="text-foreground/15 shrink-0 mt-0.5">▸</span>
                      )}
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            );

          case "image":
            return (
              <motion.figure
                key={`img-${i}`}
                className="pj-content-block pj-content-image"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <Image
                  src={block.url}
                  alt={block.caption || "프로젝트 이미지"}
                  width={640}
                  height={400}
                  className="pj-content-image__img"
                  sizes="(max-width: 768px) 90vw, 640px"
                />
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );

          case "video":
            return (
              <motion.figure
                key={`vid-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <video
                  src={block.url}
                  controls
                  preload="metadata"
                  className="w-full rounded-lg border border-[var(--notion-hairline)]"
                />
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );

          case "pdf":
            return (
              <motion.figure
                key={`pdf-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <div
                  className="relative w-full rounded-lg overflow-hidden bg-[var(--notion-surface)] border border-[var(--notion-hairline)]"
                  style={{ aspectRatio: DEFAULT_PDF_RATIO }}
                >
                  <PdfViewer url={block.url} />
                </div>
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );

          case "audio":
            return (
              <motion.figure
                key={`audio-${i}`}
                className="pj-content-block pj-content-audio"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <audio src={block.url} controls className="w-full" preload="metadata" />
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );

          case "file":
            return (
              <motion.div
                key={`file-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pj-attachment-link"
                >
                  <span className="pj-attachment-link__type">FILE</span>
                  <span className="pj-attachment-link__title">{block.title}</span>
                  <span className="pj-attachment-link__open">열기</span>
                </a>
              </motion.div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

/* ── 프로젝트 카드 ── */
function ProjectCard({
  item,
  index,
  onSelect,
}: {
  item: ProjectItem;
  index: number;
  onSelect: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");
  const symbol = SYMBOLS[index % SYMBOLS.length];
  const hasImageMedia = item.media?.type === "image" && Boolean(item.media.url);
  const cardRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.8,
    delay: index * 0.08,
  });

  return (
    <div
      ref={cardRef}
      style={{ "--poster-tint": NOTION_TINTS[index % NOTION_TINTS.length] } as CSSProperties}
      data-cursor="VIEW"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="pj-card group"
    >
      <div
        className={`pj-card__poster${hasImageMedia ? " pj-card__poster--media" : ""}`}
        aria-hidden="true"
      >
        {hasImageMedia && (
          <Image
            src={item.media!.url}
            alt=""
            fill
            className="pj-card__poster-image"
            sizes="280px"
          />
        )}
        <span className="pj-card__poster-number">
          {num}
        </span>
        {!hasImageMedia && (
          <span className="pj-card__poster-symbol select-none">
            {symbol}
          </span>
        )}
      </div>

      <div className="pj-card__content">
        <div className="mb-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/55">
          <span>{item.period}</span>
          <span>{item.teamSize}</span>
        </div>

        <h3 className="font-display text-[20px] font-black leading-tight mb-3">
          {item.title}
        </h3>

        {item.summary && (
          <p className="pj-card__summary text-[13px] text-muted-foreground leading-relaxed">
            {item.summary}
          </p>
        )}

        {item.techStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {item.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded border border-[var(--notion-hairline)] bg-transparent px-2 py-0.5 text-[10px] font-medium text-muted-foreground/70"
              >
                {t}
              </span>
            ))}
            {item.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] text-muted-foreground/40">
                +{item.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 플로팅 상세 모달 (화면 중앙) ── */
function ProjectModal({
  project,
  index,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  project: ProjectItem;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const blocks = buildCaseStudy(project);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Center wrapper (flex centering — no CSS transform on parent) */}
      <div
        className="fixed inset-0 z-51 flex items-center justify-center p-6 sm:p-10 pointer-events-none"
        onClick={onClose}
      >
        <motion.div
          className="pj-modal pointer-events-auto"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* 닫기 + 네비게이션 */}
        <div className="pj-modal__topbar">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="pj-modal__nav"
              type="button"
              aria-label="이전"
            >
              ←
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="pj-modal__nav"
              type="button"
              aria-label="다음"
            >
              →
            </button>
            <span className="text-[11px] text-muted-foreground/40 tracking-wider ml-2">
              {num}
            </span>
          </div>
          <button
            onClick={onClose}
            className="pj-modal__close"
            type="button"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 스크롤 가능한 본문 */}
        <div className="pj-modal__body">
          {/* 미디어 */}
          {project.media?.url && (
            <div
              className="relative w-full rounded-lg overflow-hidden bg-[var(--notion-surface)] mb-8"
              style={{
                aspectRatio:
                  project.media.type === "pdf"
                    ? DEFAULT_PDF_RATIO
                    : DEFAULT_MEDIA_RATIO,
              }}
            >
              <MediaPreview
                media={project.media}
                title={project.title}
                techStack={project.techStack}
              />
            </div>
          )}

          {/* 프로젝트 번호 + 제목 */}
          <span className="font-display text-[3rem] font-black text-foreground/[0.05] leading-none select-none mb-1 block">
            {num}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-[-0.03em] leading-tight mb-2">
            {project.title}
          </h2>

          {/* 한 줄 설명 */}
          {project.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {project.summary}
            </p>
          )}

          {/* 기술스택 배지 */}
          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((t, i) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md text-foreground"
                  style={{ background: NOTION_TINTS[i % NOTION_TINTS.length] }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-6">
            <span>{project.period}</span>
            <span className="text-[var(--notion-hairline)]">|</span>
            <span>{project.teamSize}</span>
            {project.githubUrl && (
              <>
                <span className="text-[var(--notion-hairline)]">|</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  GitHub ↗
                </a>
              </>
            )}
            {project.liveUrl && (
              <>
                <span className="text-[var(--notion-hairline)]">|</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Live ↗
                </a>
              </>
            )}
            {project.blogUrl && (
              <>
                <span className="text-[var(--notion-hairline)]">|</span>
                <a
                  href={project.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Blog ↗
                </a>
              </>
            )}
          </div>

          {/* 구분선 */}
          <div className="h-px w-full bg-[var(--notion-hairline)] mb-8" />

          {/* 콘텐츠: contentBlocks가 있으면 블로그 스타일, 없으면 기존 방식 */}
          {project.contentBlocks && project.contentBlocks.length > 0 ? (
            <ContentBlockRenderer blocks={project.contentBlocks} />
          ) : (
            <>
              <ProjectMediaGallery
                items={project.gallery}
                mainUrl={project.media?.url}
              />
              <ProjectAttachmentList items={project.attachments} />

              <div className="space-y-8">
                {blocks.map((block, i) => (
                  <motion.section
                    key={block.heading}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                  >
                    <h4 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/50 font-semibold mb-3">
                      {block.heading}
                    </h4>
                    <ul className="space-y-2">
                      {block.body.map((line, j) => (
                        <li
                          key={j}
                          className="text-[14px] text-foreground/80 leading-[1.75] flex gap-2.5"
                        >
                          {block.body.length > 1 && (
                            <span className="text-foreground/15 shrink-0 mt-0.5">▸</span>
                          )}
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
      </div>
    </>
  );
}

/* ── 메인 컴포넌트 ── */
export const Projects = memo(function Projects({ items }: ProjectsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [displayItems] = useState(items);
  const viewItems = displayItems.filter((item) => !isArticleProject(item));
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });

  const selectedProject = selectedIndex !== null ? viewItems[selectedIndex] : null;

  if (viewItems.length === 0) return null;

  return (
    <div
      className="pj-section"
      data-allow-scroll
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="pj-section__scroll"
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
        {/* ── 섹션 헤딩 ── */}
        <div ref={headingRef} className="mb-12 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium block mb-3">
            프로젝트 상세
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-black tracking-[-0.04em] leading-tight mb-4">
            PROJECTS
          </h2>
          <p className="text-sm text-muted-foreground/70 max-w-md mx-auto leading-relaxed">
            직접 기획하고 개발하며 문제를 해결했던 프로젝트들을 모았습니다.
          </p>
          <div className="mt-6 h-px w-16 bg-[var(--notion-hairline)] mx-auto" />
        </div>

        {/* ── 카드 그리드 ── */}
        <div className="pj-grid">
          {viewItems.map((item, i) => (
            <ProjectCard
              key={item.title}
              item={item}
              index={i}
              onSelect={() => setSelectedIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* ── 플로팅 상세 모달 ── */}
      <AnimatePresence>
        {selectedProject && selectedIndex !== null && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onPrev={() => setSelectedIndex((p) => (p !== null && p > 0 ? p - 1 : p))}
            onNext={() =>
              setSelectedIndex((p) =>
                p !== null && p < viewItems.length - 1 ? p + 1 : p
              )
            }
            hasPrev={selectedIndex > 0}
            hasNext={selectedIndex < viewItems.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
