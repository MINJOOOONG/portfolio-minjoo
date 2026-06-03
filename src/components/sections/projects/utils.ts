import locale from "@/lib/i18n/locale";
import type { CaseStudyBlock, ContentBlock, ProjectItem } from "./types";

type Lang = "ko" | "en";

export function t<T>(lang: Lang, ko: T, en: T | undefined): T {
  return lang === "en" && en !== undefined ? en : ko;
}

export const NOTION_TINTS = [
  "var(--notion-tint-lavender)",
  "var(--notion-tint-mint)",
  "var(--notion-tint-sky)",
  "var(--notion-tint-peach)",
  "var(--notion-tint-rose)",
  "var(--notion-tint-yellow)",
  "var(--notion-tint-cream)",
];

export const DEFAULT_MEDIA_RATIO = 4 / 3;
export const DEFAULT_PDF_RATIO = 595.2756 / 841.8898;

export const SYMBOLS = ["◇", "○", "△", "□", "◆", "▽", "⬡", "✦"];

export function normalizeMediaUrl(url?: string) {
  return url?.split("#")[0].split("?")[0];
}

export function isSameMediaUrl(a?: string, b?: string) {
  return Boolean(a && b && normalizeMediaUrl(a) === normalizeMediaUrl(b));
}

export function filterRepeatedMediaBlocks(blocks: ContentBlock[], mediaUrl?: string) {
  if (!mediaUrl) return blocks;

  return blocks.filter((block) => {
    if (!("url" in block)) return true;
    return !isSameMediaUrl(block.url, mediaUrl);
  });
}

export function buildCaseStudy(item: ProjectItem, lang: Lang): CaseStudyBlock[] {
  if (item.caseStudy && item.caseStudy.length > 0) return item.caseStudy;

  const desc = lang === "en" && item.descriptionEn ? item.descriptionEn : (item.description ?? []);
  if (desc.length === 0) return [];

  const summary = lang === "en" && item.summaryEn ? item.summaryEn : item.summary;

  const blocks: CaseStudyBlock[] = [];

  blocks.push({
    heading: locale["projects.overview"][lang],
    body: [summary || desc[0]],
  });

  if (desc.length > 1) {
    blocks.push({
      heading: locale["projects.implementation"][lang],
      body: desc.slice(1, Math.min(4, desc.length)),
    });
  }

  if (desc.length >= 4) {
    blocks.push({
      heading: locale["projects.technicalChallenges"][lang],
      body: desc.slice(Math.min(4, desc.length - 1), desc.length),
    });
  }

  if (item.techStack.length > 0) {
    blocks.push({
      heading: locale["projects.techStack"][lang],
      body: [item.techStack.join(", ")],
    });
  }

  blocks.push({
    heading: locale["projects.results"][lang],
    body: [locale["projects.defaultResult"][lang]],
  });

  return blocks;
}

export function normalizeTechStack(techStack: string[] | string): string[] {
  return Array.isArray(techStack)
    ? techStack.flatMap((ts) => (typeof ts === "string" && ts.includes(",") ? ts.split(",").map((s) => s.trim()) : [ts]))
    : typeof techStack === "string"
      ? (techStack as string).split(",").map((s) => s.trim())
      : [];
}
