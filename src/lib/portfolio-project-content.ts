import type { ContentBlock, ProjectItem } from "@/components/sections/projects";
import { notionProjectAssets } from "../../prisma/notion-project-assets";

const portfolioDesignRulesBlock = notionProjectAssets.portfolioWebsite.contentBlocks.find(
  (block) => block.type === "design-rules"
) as ContentBlock | undefined;

const portfolioImplementationBlocks = getPortfolioSectionBlocks("04 — 주요 기능 구현");

export function projectSlug(title: string) {
  return encodeURIComponent(title.replace(/\s+/g, "-").toLowerCase());
}

function getPortfolioSectionBlocks(title: string) {
  const blocks = notionProjectAssets.portfolioWebsite.contentBlocks as unknown as ContentBlock[];
  const start = blocks.findIndex((block) => block.type === "section-heading" && block.title === title);
  if (start < 0) return [];

  const next = blocks.findIndex(
    (block, index) => index > start && block.type === "section-heading"
  );

  return blocks.slice(start, next < 0 ? blocks.length : next);
}

function replacePortfolioImplementationBlocks(blocks: ContentBlock[]) {
  if (portfolioImplementationBlocks.length === 0) return blocks;

  const start = blocks.findIndex(
    (block) =>
      block.type === "section-heading" &&
      (block.title === "04 — 주요 기능 상세" ||
        block.title === "04 — 주요 구현" ||
        block.title === "04 — 주요 기능" ||
        block.title === "04 — 주요 기능 구현")
  );
  if (start < 0) return blocks;

  const next = blocks.findIndex(
    (block, index) => index > start && block.type === "section-heading"
  );

  return [
    ...blocks.slice(0, start),
    ...portfolioImplementationBlocks,
    ...blocks.slice(next < 0 ? blocks.length : next),
  ];
}

function removePortfolioLearningImages(blocks: ContentBlock[]) {
  let isLearningSection = false;

  return blocks.filter((block) => {
    if (block.type === "section-heading") {
      isLearningSection = block.title === "07 — 배운 점과 다음 개선 방향" || block.title === "07 — 주요 성과";
      return true;
    }

    return !(isLearningSection && block.type === "image");
  });
}

export function applyCurrentPortfolioContentBlocks(projects: ProjectItem[]) {
  if (!portfolioDesignRulesBlock) return projects;

  return projects.map((project) => {
    if (project.title !== "포트폴리오 웹사이트" || !project.contentBlocks) {
      return project;
    }

    return {
      ...project,
      contentBlocks: removePortfolioLearningImages(
        replacePortfolioImplementationBlocks(
          project.contentBlocks.map((block) =>
            block.type === "design-rules" ? portfolioDesignRulesBlock : block
          )
        )
      ),
    };
  });
}
