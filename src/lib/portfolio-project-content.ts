import type { ContentBlock, ProjectItem } from "@/components/sections/projects/types";
import { notionProjectAssets } from "../../prisma/notion-project-assets";

export function projectSlug(project: string | Pick<ProjectItem, "title" | "slug">) {
  const value = typeof project === "string" ? project : project.slug || project.title;
  return encodeURIComponent(value.trim().replace(/\s+/g, "-").toLowerCase());
}

export function applyCurrentPortfolioContentBlocks(projects: ProjectItem[]) {
  return projects.map((project) => {
    if (project.title !== "포트폴리오 웹사이트" || project.contentBlocks !== undefined) return project;
    return { ...project, contentBlocks: notionProjectAssets.portfolioWebsite.contentBlocks as unknown as ContentBlock[] };
  });
}
