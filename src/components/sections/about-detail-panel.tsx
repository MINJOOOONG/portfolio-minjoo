"use client";

import { Fragment, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AboutSection } from "@/data/about-sections";
import { keywordAnnotations } from "@/data/about-sections";
import { AboutKeywordAnnotation } from "./about-keyword-annotation";
import { useLanguage, type Lang } from "@/lib/i18n/language-context";

interface AboutDetailPanelProps {
  section: AboutSection | undefined;
}

function renderAnnotatedText(text: string, lang: Lang): ReactNode[] {
  const keywords = Object.keys(keywordAnnotations).sort(
    (a, b) => b.length - a.length
  );
  const pattern = keywords
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!pattern) return [text];

  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const annotation = keywordAnnotations[part];
    if (annotation) {
      return (
        <AboutKeywordAnnotation
          key={`${part}-${i}`}
          keyword={part}
          description={typeof annotation === "string" ? annotation : (lang === "en" ? annotation.en : annotation.ko)}
        />
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function AboutDetailPanel({ section }: AboutDetailPanelProps) {
  const { lang } = useLanguage();
  const handleDetailLink = (targetId: string) => {
    window.dispatchEvent(new CustomEvent("slide-nav-goto", { detail: targetId }));
  };

  return (
    <div
      data-no-section-nav
      data-annotation-area
      className="h-full"
    >
      <AnimatePresence mode="wait">
        {section ? (
          <motion.div
            key={`${section.number}-${lang}`}
            className="w-full"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Section meta — subtle label */}
            <div className="flex items-center gap-2.5 mb-6">
              <span className="font-mono text-[11px] font-bold tracking-[0.06em] text-foreground/25">
                {section.number}
              </span>
              <span className="w-4 h-px bg-foreground/15" />
              <span className="font-mono text-[11px] tracking-[0.04em] text-foreground/25 uppercase">
                {section.englishTitle}
              </span>
            </div>

            {/* Lead sentence — editorial headline */}
            <p data-cursor-highlight className="font-sans text-[20px] sm:text-[22px] font-semibold leading-[1.55] tracking-[-0.02em] text-foreground mb-8">
              {lang === "en" ? section.sentenceEn : section.sentence}
            </p>

            {/* Body paragraphs */}
            <div className="space-y-6">
              {(lang === "en" ? section.paragraphsEn : section.paragraphs).map((paragraph, i) => (
                <p
                  key={i}
                  data-cursor-highlight
                  className="font-sans text-[15px] sm:text-[16px] leading-[1.82] tracking-[0.005em] text-foreground/65 word-break-keep-all"
                >
                  {renderAnnotatedText(paragraph, lang)}
                </p>
              ))}
            </div>

            {section.detailLink
              ? (() => {
                  const detailLink = section.detailLink;

                  return (
                    <button
                      type="button"
                      data-no-section-nav
                      onClick={() => handleDetailLink(detailLink.targetId)}
                      className="mt-8 inline-flex items-center gap-2 rounded-md border border-[var(--notion-hairline)] px-4 py-2 text-[12px] font-semibold tracking-[-0.01em] text-foreground/70 transition-colors duration-150 hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                    >
                      {detailLink.label}
                      <span aria-hidden="true">-&gt;</span>
                    </button>
                  );
                })()
              : null}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <p className="font-sans text-[14px] text-foreground/20">
              {lang === "en" ? "Select an item" : "항목을 선택하세요"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
