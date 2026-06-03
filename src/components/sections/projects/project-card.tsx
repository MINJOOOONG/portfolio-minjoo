"use client";

import { type CSSProperties } from "react";
import { Github, ExternalLink, BookOpen, LinkIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { projectSlug } from "@/lib/portfolio-project-content";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";
import { SafeImage } from "./safe-image";
import { t, NOTION_TINTS, SYMBOLS } from "./utils";
import type { ProjectItem } from "./types";

export function ProjectCard({
  item,
  index,
  onSelect,
}: {
  item: ProjectItem;
  index: number;
  onSelect: () => void;
}) {
  const { lang } = useLanguage();
  const num = String(index + 1).padStart(2, "0");
  const symbol = SYMBOLS[index % SYMBOLS.length];
  const hasImageMedia = item.media?.type === "image" && Boolean(item.media.url);
  const title = t(lang, item.title, item.titleEn);
  const summary = t(lang, item.summary, item.summaryEn);
  const achievement = t(lang, item.achievement, item.achievementEn);
  const period = t(lang, item.period, item.periodEn);
  const teamSize = t(lang, item.teamSize, item.teamSizeEn);
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
            sizes="300px"
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
        <h3 className="font-display text-[15px] sm:text-[18px] font-black leading-tight mb-1.5">
          {title}
        </h3>

        {summary && (
          <p className="pj-card__summary text-[12.5px] text-muted-foreground/70 leading-relaxed mb-1">
            {summary}
          </p>
        )}

        {achievement && (
          <p className="pj-card__achievement">
            <span className="pj-card__achievement-prefix">▸</span>
            {achievement}
          </p>
        )}

        <div className="pj-card__meta">
          <span>{period}</span>
          {teamSize && (
            <>
              <span style={{ color: "rgba(33,29,25,0.2)", userSelect: "none" }}>·</span>
              <span>{teamSize}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2.5" onClick={(e) => e.stopPropagation()}>
          {item.liveUrl && (
            <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-[var(--notion-stone)] bg-[var(--notion-surface)] border border-[var(--notion-hairline)] rounded-md hover:bg-[var(--notion-bg-elevated)] hover:text-[var(--notion-ink)] transition-colors">
              <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
              Live
            </a>
          )}
          {item.githubUrl && (
            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-[var(--notion-stone)] bg-[var(--notion-surface)] border border-[var(--notion-hairline)] rounded-md hover:bg-[var(--notion-bg-elevated)] hover:text-[var(--notion-ink)] transition-colors">
              <Github className="w-3 h-3" strokeWidth={1.5} />
              GitHub
            </a>
          )}
          {item.blogUrl && (
            <a href={item.blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-[var(--notion-stone)] bg-[var(--notion-surface)] border border-[var(--notion-hairline)] rounded-md hover:bg-[var(--notion-bg-elevated)] hover:text-[var(--notion-ink)] transition-colors">
              <BookOpen className="w-3 h-3" strokeWidth={1.5} />
              Blog
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const url = `${window.location.origin}${window.location.pathname}#${projectSlug(item.title)}`;
              navigator.clipboard.writeText(url).then(() => {
                const btn = e.currentTarget;
                const orig = btn.textContent;
                btn.textContent = locale["projects.copied"][lang];
                setTimeout(() => { btn.textContent = orig; }, 1500);
              });
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-[var(--notion-stone)] bg-[var(--notion-surface)] border border-[var(--notion-hairline)] rounded-md hover:bg-[var(--notion-bg-elevated)] hover:text-[var(--notion-ink)] transition-colors"
          >
            <LinkIcon className="w-3 h-3" strokeWidth={1.5} />
            {locale["projects.copyLink"][lang]}
          </button>
        </div>
      </div>
    </div>
  );
}
