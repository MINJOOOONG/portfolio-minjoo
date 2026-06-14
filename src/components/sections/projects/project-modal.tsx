"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, BookOpen, LinkIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";
import { projectSlug } from "@/lib/portfolio-project-content";
import { MediaPreview, ProjectMediaGallery, ProjectAttachmentList } from "./media-preview";
import { ContentBlockRenderer } from "./content-block-renderer";
import {
  t,
  DEFAULT_MEDIA_RATIO,
  DEFAULT_PDF_RATIO,
  buildCaseStudy,
  filterRepeatedMediaBlocks,
  normalizeTechStack,
} from "./utils";
import type { ProjectItem } from "./types";

export function ProjectModal({
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
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const blocks = buildCaseStudy(project, lang);
  const repeatedCardImageUrl = project.media?.type === "image" ? project.media.url : undefined;
  const activeContentBlocks = lang === "en" && project.contentBlocksEn ? project.contentBlocksEn : project.contentBlocks;
  const detailContentBlocks = activeContentBlocks
    ? filterRepeatedMediaBlocks(activeContentBlocks, repeatedCardImageUrl)
    : [];
  const shouldShowPrimaryMedia = Boolean(project.media?.url && project.media.type !== "image");

  const modalTitle = t(lang, project.title, project.titleEn);
  const modalSummary = t(lang, project.summary, project.summaryEn);
  const modalPeriod = t(lang, project.period, project.periodEn);
  const modalTeamSize = t(lang, project.teamSize, project.teamSizeEn);

  const techStackList = normalizeTechStack(project.techStack);
  const projectPath = `/projects/${projectSlug(project.title)}`;

  const copyProjectLink = async () => {
    const origin = window.location.origin;
    await navigator.clipboard.writeText(`${origin}${projectPath}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

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
        data-modal-overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        onWheel={(e) => e.stopPropagation()}
      />

      {/* Center wrapper (flex centering — no CSS transform on parent) */}
      <div
        className="fixed inset-0 z-51 flex items-center justify-center p-6 sm:p-10 pointer-events-none"
        data-modal-overlay
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

          {/* 1. 프로젝트 번호 + 제목 */}
          <div className="pj-modal__title-block" style={{ marginBottom: 32 }}>
            <span className="pj-modal__title-number">
              {num}
            </span>
            <h2 className="pj-modal__title">
              {modalTitle}
            </h2>
          </div>

          {/* 2. 메타 정보 (1줄: 개발일정 · 개발인원) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              alignItems: "center",
              gap: 0,
              fontSize: 13,
              color: "rgba(33, 29, 25, 0.6)",
              lineHeight: 1.6,
            }}
          >
            <span style={{ fontWeight: 500 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "rgba(33, 29, 25, 0.35)", marginRight: 6 }}>
                {locale["projects.schedule"][lang]}
              </span>
              {modalPeriod}
            </span>
            <span style={{ margin: "0 10px", color: "rgba(33, 29, 25, 0.2)", userSelect: "none" as const }}>·</span>
            <span style={{ fontWeight: 500 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "rgba(33, 29, 25, 0.35)", marginRight: 6 }}>
                {locale["projects.teamSize"][lang]}
              </span>
              {modalTeamSize}
            </span>
          </div>

          {/* 3. 링크 그룹 (2줄: Project · GitHub · Live) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 18,
              marginTop: 10,
            }}
          >
              <a
                href={projectPath}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1,
                  color: "var(--foreground)",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--foreground)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
              >
                <ExternalLink size={15} style={{ display: "block", flexShrink: 0, opacity: 0.5 }} />
                {locale["projects.detail"][lang]} ↗
              </a>
              <button
                type="button"
                onClick={copyProjectLink}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1,
                  color: "var(--foreground)",
                  textDecoration: "none",
                  border: 0,
                  borderBottom: "1px solid transparent",
                  background: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--foreground)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
              >
                <LinkIcon size={15} style={{ display: "block", flexShrink: 0, opacity: 0.5 }} />
                {copied ? locale["projects.copied"][lang] : locale["projects.copyLink"][lang]}
              </button>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "var(--foreground)",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    transition: "border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--foreground)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                >
                  <Github size={15} style={{ display: "block", flexShrink: 0, opacity: 0.5 }} />
                  GitHub ↗
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "var(--foreground)",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    transition: "border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--foreground)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                >
                  <ExternalLink size={15} style={{ display: "block", flexShrink: 0, opacity: 0.5 }} />
                  Live ↗
                </a>
              )}
              {project.blogUrl && (
                <a
                  href={project.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "var(--foreground)",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    transition: "border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--foreground)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                >
                  <BookOpen size={15} style={{ display: "block", flexShrink: 0, opacity: 0.5 }} />
                  Blog ↗
                </a>
              )}
          </div>

          {/* 4. 소개 문단 */}
          {modalSummary && (
            <p
              style={{
                maxWidth: 760,
                margin: "40px 0 0",
                color: "var(--muted-foreground)",
                fontSize: 14,
                lineHeight: 1.8,
              }}
            >
              {modalSummary}
            </p>
          )}

          {/* 5. 기술스택 라벨 + 뱃지 */}
          {techStackList.length > 0 && (
            <div style={{ marginTop: 36 }}>
              <span
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "rgba(33, 29, 25, 0.35)",
                  marginBottom: 10,
                }}
              >
                {locale["projects.techStackLabel"][lang]}
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: 7,
                }}
              >
                {techStackList.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      height: 30,
                      padding: "0 12px",
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: 999,
                      color: "rgba(33, 29, 25, 0.8)",
                      background: "#fff",
                      border: "1px solid rgba(33, 29, 25, 0.15)",
                      lineHeight: 1,
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 구분선 */}
          <div style={{ height: 1, width: "100%", background: "var(--notion-hairline)", margin: "40px 0 32px" }} />

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
                    <h4 className="pj-content-heading">
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
