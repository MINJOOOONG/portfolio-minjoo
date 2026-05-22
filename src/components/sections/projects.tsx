"use client";

import { useState, useEffect, memo, useCallback, type CSSProperties } from "react";
import Image, { type ImageProps } from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { isArticleProject } from "@/lib/project-groups";

/* ── 이미지 로드 실패 시 fallback을 보여주는 래퍼 ── */
function SafeImage(props: ImageProps & { fallbackText?: string }) {
  const { fallbackText, alt, ...rest } = props;
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);

  if (failed) {
    return (
      <div className="pj-image-fallback" aria-label={alt || "이미지를 불러올 수 없습니다"}>
        <span className="pj-image-fallback__icon">🖼</span>
        <span className="pj-image-fallback__text">{fallbackText || "이미지를 불러올 수 없습니다"}</span>
      </div>
    );
  }

  return <Image {...rest} alt={alt || ""} onError={onError} />;
}

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
  | { type: "file"; url: string; title: string }
  | { type: "section-heading"; title: string }
  | { type: "code"; title: string; language: string; code: string }
  | { type: "callout"; variant: "problem" | "solution" | "info"; title: string; body: string[] }
  | { type: "tech-grid"; items: { name: string; reason: string }[] }
  | { type: "point-cards"; items: { title: string; body: string }[] }
  | { type: "design-rules"; image?: string; placeholder?: string; rules: { title: string; body: string }[] }
  | { type: "feature-block"; title: string; body: string[]; code?: { title: string; code: string } };

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
  achievement?: string;
  role?: string;
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

function normalizeMediaUrl(url?: string) {
  return url?.split("#")[0].split("?")[0];
}

function isSameMediaUrl(a?: string, b?: string) {
  return Boolean(a && b && normalizeMediaUrl(a) === normalizeMediaUrl(b));
}

function filterRepeatedMediaBlocks(blocks: ContentBlock[], mediaUrl?: string) {
  if (!mediaUrl) return blocks;

  return blocks.filter((block) => {
    if (!("url" in block)) return true;
    return !isSameMediaUrl(block.url, mediaUrl);
  });
}

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
    <SafeImage
      src={media.url}
      alt={media.title || title || "project"}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 460px"
      fallbackText={media.title || title || "프로젝트 이미지"}
      onLoad={(event) => {
        const image = event.currentTarget as HTMLImageElement;
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
  const galleryItems = (items ?? []).filter((item) => !isSameMediaUrl(item.url, mainUrl));
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
                <SafeImage
                  src={item.url}
                  alt={item.title ?? "프로젝트 이미지"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 180px"
                  fallbackText={item.title}
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

/* ── 토글 코드 블록 (접기/펼치기) ── */
function CodeToggle({ title, code }: { title: string; code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pj-code-toggle">
      <button
        type="button"
        className="pj-code-toggle__btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={`pj-code-toggle__chevron${open ? " pj-code-toggle__chevron--open" : ""}`}>&#9656;</span>
        {title}
      </button>
      <div className={`pj-code-toggle__body${open ? " pj-code-toggle__body--open" : ""}`}>
        <pre><code>{code}</code></pre>
      </div>
    </div>
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
                {block.heading ? (
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
                ) : (
                  <div className="pj-content-paragraphs">
                    {block.body.map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                )}
              </motion.section>
            );

          case "image": {
            const isDiagram = block.url.endsWith(".svg");
            return (
              <motion.figure
                key={`img-${i}`}
                className="pj-content-block pj-content-image"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <SafeImage
                  src={block.url}
                  alt={block.caption || "프로젝트 이미지"}
                  width={isDiagram ? 760 : 640}
                  height={isDiagram ? 670 : 400}
                  className={`pj-content-image__img${isDiagram ? " pj-content-image__img--diagram" : ""}`}
                  sizes="(max-width: 768px) 90vw, 760px"
                  fallbackText={block.caption}
                />
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );
          }

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

          case "section-heading": {
            const headingMatch = block.title.match(/^(\d+)\s*—\s*(.+)$/);
            return (
              <motion.h3
                key={`sh-${i}`}
                className="pj-section-heading"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {headingMatch ? (
                  <>
                    <span className="pj-section-heading__number">{headingMatch[1]}</span>
                    <span className="pj-section-heading__dash">—</span>
                    <span className="pj-section-heading__title">{headingMatch[2]}</span>
                  </>
                ) : (
                  <span className="pj-section-heading__title">{block.title}</span>
                )}
              </motion.h3>
            );
          }

          case "code":
            return (
              <motion.div
                key={`code-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <CodeToggle title={block.title} code={block.code} />
              </motion.div>
            );

          case "callout":
            const isInfoCallout = block.variant === "info";
            return (
              <motion.div
                key={`callout-${i}`}
                className={`pj-callout pj-callout--${block.variant}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <span className="pj-callout__label">
                  {block.variant === "problem"
                    ? "PROBLEM"
                    : block.variant === "solution"
                      ? "SOLUTION"
                      : block.title}
                </span>
                {!isInfoCallout && (
                  <strong className="pj-callout__title">{block.title}</strong>
                )}
                <ul className="pj-callout__body">
                  {block.body.map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
                </ul>
              </motion.div>
            );

          case "tech-grid":
            return (
              <motion.div
                key={`tg-${i}`}
                className="pj-tech-grid"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {block.items.map((item, j) => (
                  <div key={j} className="pj-tech-grid__card">
                    <span className="pj-tech-grid__name">{item.name}</span>
                    <span className="pj-tech-grid__reason">{item.reason}</span>
                  </div>
                ))}
              </motion.div>
            );

          case "point-cards":
            return (
              <motion.div
                key={`pc-${i}`}
                className="pj-point-cards"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {block.items.map((item, j) => (
                  <div key={j} className="pj-point-cards__card">
                    <span className="pj-point-cards__title">{item.title}</span>
                    <span className="pj-point-cards__body">{item.body}</span>
                  </div>
                ))}
              </motion.div>
            );

          case "design-rules":
            return (
              <motion.div
                key={`dr-${i}`}
                className="pj-design-rules"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <div className="pj-design-rules__image">
                  {block.image ? (
                    <SafeImage
                      src={block.image}
                      alt="Design reference"
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  ) : (
                    <div className="pj-design-rules__placeholder">
                      <span className="pj-design-rules__placeholder-text">
                        {block.placeholder || "Design reference image"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="pj-design-rules__list">
                  {block.rules.map((rule, j) => (
                    <div key={j} className="pj-design-rules__item">
                      <span className="pj-design-rules__number">{j + 1}</span>
                      <div className="pj-design-rules__item-content">
                        <span className="pj-design-rules__item-title">{rule.title}</span>
                        <span className="pj-design-rules__item-body">{rule.body}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );

          case "feature-block":
            return (
              <motion.div
                key={`fb-${i}`}
                className="pj-feature-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <h4 className="pj-feature-block__title">{block.title}</h4>
                <div className="pj-feature-block__body">
                  {block.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {block.code && (
                  <div style={{ marginTop: 12 }}>
                    <CodeToggle title={block.code.title} code={block.code.code} />
                  </div>
                )}
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
          <SafeImage
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
        <h3 className="font-display text-[20px] font-black leading-tight mb-2">
          {item.title}
        </h3>

        {item.summary && (
          <p className="pj-card__summary text-[13px] text-muted-foreground leading-relaxed mb-2">
            {item.summary}
          </p>
        )}

        {item.achievement && (
          <p className="pj-card__achievement">
            <span className="pj-card__achievement-prefix">▸</span>
            {item.achievement}
          </p>
        )}

        <div className="pj-card__meta">
          <span>{item.period}</span>
        </div>
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
  const repeatedCardImageUrl = project.media?.type === "image" ? project.media.url : undefined;
  const detailContentBlocks = project.contentBlocks
    ? filterRepeatedMediaBlocks(project.contentBlocks, repeatedCardImageUrl)
    : [];
  const shouldShowPrimaryMedia = Boolean(project.media?.url && project.media.type !== "image");

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
          {/* 미디어: 카드 대표 이미지는 상세에서 반복 노출하지 않음 */}
          {shouldShowPrimaryMedia && project.media && (
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
          <div className="pj-modal__title-block">
            <span className="pj-modal__title-number">
              {num}
            </span>
            <h2 className="pj-modal__title">
              {project.title}
            </h2>
          </div>

          {/* 한 줄 설명 */}
          {project.achievement && (
            <p className="pj-modal__lead">
              {project.achievement}
            </p>
          )}
          {project.summary && (
            <p className="pj-modal__summary">
              {project.summary}
            </p>
          )}

          {/* 기술스택 배지 */}
          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md text-foreground/80 bg-white border border-[var(--notion-hairline)]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* 메타 정보 그리드 */}
          <div className="pj-modal__meta-grid">
            <div className="pj-modal__meta-cell">
              <span className="pj-modal__meta-label">기간</span>
              <span className="pj-modal__meta-value">{project.period}</span>
            </div>
            <div className="pj-modal__meta-cell">
              <span className="pj-modal__meta-label">개발 인원</span>
              <span className="pj-modal__meta-value">{project.teamSize}</span>
            </div>
            {project.githubUrl && (
              <div className="pj-modal__meta-cell">
                <span className="pj-modal__meta-label">GitHub</span>
                <span className="pj-modal__meta-value">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    Repository ↗
                  </a>
                </span>
              </div>
            )}
            {project.liveUrl && (
              <div className="pj-modal__meta-cell">
                <span className="pj-modal__meta-label">Live</span>
                <span className="pj-modal__meta-value">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit site ↗
                  </a>
                </span>
              </div>
            )}
            {project.blogUrl && (
              <div className="pj-modal__meta-cell">
                <span className="pj-modal__meta-label">Blog</span>
                <span className="pj-modal__meta-value">
                  <a href={project.blogUrl} target="_blank" rel="noopener noreferrer">
                    Read more ↗
                  </a>
                </span>
              </div>
            )}
          </div>

          {/* 구분선 */}
          <div className="h-px w-full bg-[var(--notion-hairline)] mb-8" />

          {/* 콘텐츠: contentBlocks가 있으면 블로그 스타일, 없으면 기존 방식 */}
          {detailContentBlocks.length > 0 ? (
            <ContentBlockRenderer blocks={detailContentBlocks} />
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
