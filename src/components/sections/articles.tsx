"use client";

import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { SlideHeading } from "./about";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useStaggerReveal } from "@/hooks/use-stagger-reveal";
import type { ProjectItem } from "./projects";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";

const PdfViewer = dynamic(
  () => import("@/components/shared/pdf-viewer"),
  { ssr: false }
);

interface ArticlesProps {
  items: ProjectItem[];
}

const DEFAULT_PDF_RATIO = 595.2756 / 841.8898;

function ArticleItem({ item }: { item: ProjectItem }) {
  const [mediaRatio, setMediaRatio] = useState(DEFAULT_PDF_RATIO);
  const textRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const techRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> span",
    stagger: 0.05,
    y: 15,
  });

  return (
    <article className="grid gap-4 sm:gap-8 border-t border-[var(--notion-hairline)] pt-5 sm:pt-8 md:grid-cols-[minmax(240px,360px)_1fr] md:items-center">
      {item.media?.type === "pdf" && item.media.url && (
        <div
          className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-xl bg-[var(--notion-surface)]"
          style={{ aspectRatio: mediaRatio }}
        >
          <PdfViewer
            url={item.media.url}
            onPageRatioChange={setMediaRatio}
          />
        </div>
      )}

      <div ref={textRef}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[var(--notion-tint-sky)] px-2.5 py-1 text-[11px] font-medium text-foreground">
            {item.teamSize || "Article"}
          </span>
          <span className="text-xs text-muted-foreground">{item.period}</span>
        </div>

        <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {item.title}
        </h3>

        {item.summary && (
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
        )}

        {item.description.length > 0 && (
          <ul className="mt-2 sm:mt-4 space-y-1.5 sm:space-y-2">
            {item.description.map((description) => (
              <li
                key={description}
                className="flex gap-2 sm:gap-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-0.5 shrink-0 text-muted-foreground/40">▸</span>
                <span>{description}</span>
              </li>
            ))}
          </ul>
        )}

        {item.techStack.length > 0 && (
          <div ref={techRef} className="mt-3 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-[var(--notion-surface)] px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {item.media?.url && (
          <a
            href={item.media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-5 inline-flex h-7 sm:h-9 items-center rounded-md border border-border bg-transparent px-2.5 sm:px-3.5 text-xs sm:text-sm font-medium text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
          >
            View PDF
          </a>
        )}
      </div>
    </article>
  );
}

export const Articles = memo(function Articles({ items }: ArticlesProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const { lang } = useLanguage();

  if (items.length === 0) return null;

  return (
    <div
      className="w-full max-w-[860px]"
      data-allow-scroll
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <div
        data-scroller
        style={{
          height: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "80px 24px 120px",
          boxSizing: "border-box",
        }}
      >
        <div ref={headingRef} className="mb-4 sm:mb-8">
          <SlideHeading label="Articles" title={locale["articles.heading"][lang]} />
        </div>

        <div className="space-y-6 sm:space-y-12">
          {items.map((item) => (
            <ArticleItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
});
