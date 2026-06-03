"use client";

import { Github, ExternalLink, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";
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

export function ProjectDetailPageContent({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const { lang } = useLanguage();
  const num = String(index + 1).padStart(2, "0");
  const blocks = buildCaseStudy(project, lang);
  const repeatedCardImageUrl = project.media?.type === "image" ? project.media.url : undefined;
  const activeContentBlocks = lang === "en" && project.contentBlocksEn ? project.contentBlocksEn : project.contentBlocks;
  const detailContentBlocks = activeContentBlocks
    ? filterRepeatedMediaBlocks(activeContentBlocks, repeatedCardImageUrl)
    : [];
  const shouldShowPrimaryMedia = Boolean(project.media?.url && project.media.type !== "image");
  const techStackList = normalizeTechStack(project.techStack);

  const pageTitle = t(lang, project.title, project.titleEn);
  const pageSummary = t(lang, project.summary, project.summaryEn);
  const pagePeriod = t(lang, project.period, project.periodEn);
  const pageTeamSize = t(lang, project.teamSize, project.teamSizeEn);

  return (
    <main className="min-h-[100svh] bg-white text-foreground">
      <header className="sticky top-0 z-40 border-b border-[var(--notion-hairline)] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-5">
          <a
            href="/portfolio#projects"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[20px] text-foreground transition-colors hover:bg-muted"
            aria-label={locale["projects.backToList"][lang]}
          >
            ←
          </a>
          <span className="min-w-0 truncate px-4 text-sm font-semibold">
            {locale["projects.detail"][lang]}
          </span>
          <span className="font-mono text-[11px] font-semibold text-foreground/35">
            {num}
          </span>
        </div>
      </header>

      <article
        className="pj-modal__body mx-auto max-w-[900px]"
        style={{ overflow: "visible", paddingTop: 28, paddingBottom: 96 }}
      >
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

        <div className="pj-modal__title-block" style={{ marginBottom: 32 }}>
          <span className="pj-modal__title-number">{num}</span>
          <h1 className="pj-modal__title">{pageTitle}</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 0,
            fontSize: 13,
            color: "rgba(33, 29, 25, 0.6)",
            lineHeight: 1.6,
          }}
        >
          <span style={{ fontWeight: 500 }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(33, 29, 25, 0.35)", marginRight: 6 }}>
              {locale["projects.schedule"][lang]}
            </span>
            {pagePeriod}
          </span>
          <span style={{ margin: "0 10px", color: "rgba(33, 29, 25, 0.2)", userSelect: "none" }}>·</span>
          <span style={{ fontWeight: 500 }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(33, 29, 25, 0.35)", marginRight: 6 }}>
              {locale["projects.teamSize"][lang]}
            </span>
            {pageTeamSize}
          </span>
        </div>

        {(project.githubUrl || project.liveUrl || project.blogUrl) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 18,
              marginTop: 14,
            }}
          >
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                <Github size={15} style={{ opacity: 0.5 }} />
                GitHub ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                <ExternalLink size={15} style={{ opacity: 0.5 }} />
                Live ↗
              </a>
            )}
            {project.blogUrl && (
              <a href={project.blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                <BookOpen size={15} style={{ opacity: 0.5 }} />
                Blog ↗
              </a>
            )}
          </div>
        )}

        {pageSummary && (
          <p
            style={{
              maxWidth: 760,
              margin: "36px 0 0",
              color: "var(--muted-foreground)",
              fontSize: 14,
              lineHeight: 1.8,
            }}
          >
            {pageSummary}
          </p>
        )}

        {techStackList.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <span
              style={{
                display: "block",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(33, 29, 25, 0.35)",
                marginBottom: 10,
              }}
            >
              {locale["projects.techStackLabel"][lang]}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
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
                    whiteSpace: "nowrap",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 1, width: "100%", background: "var(--notion-hairline)", margin: "40px 0 32px" }} />

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
              {blocks.map((block) => (
                <section key={block.heading}>
                  <h2 className="pj-content-heading">{block.heading}</h2>
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
                </section>
              ))}
            </div>
          </>
        )}
      </article>
    </main>
  );
}
