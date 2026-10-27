import { createHash, randomUUID } from "node:crypto";
import type { Prisma } from "@/generated/prisma/client";
import type { ProjectItem } from "@/components/sections/projects/types";
import { prisma } from "./prisma";
import { isRecord, RequestError } from "./request-validation";
import { applyCurrentPortfolioContentBlocks, projectSlug } from "./portfolio-project-content";
import { projectTranslations } from "@/data/project-translations";

export type CatalogProject = ProjectItem & { id: string; slug: string; published: boolean; featured: boolean; order: number };

function stringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

export function normalizeProjectCatalog(value: unknown): CatalogProject[] {
  if (!Array.isArray(value) || value.length > 250) throw new RequestError("프로젝트 데이터는 배열이어야 합니다.");
  const projects = value.map((item, index) => {
    if (!isRecord(item) || typeof item.title !== "string" || !item.title.trim() ||
        typeof item.summary !== "string" || !stringList(item.techStack) ||
        !(stringList(item.description) || typeof item.description === "string")) {
      throw new RequestError("프로젝트 제목, 요약, 설명, 기술 스택을 확인해주세요.");
    }
    for (const key of ["teamSize", "period", "slug", "id", "titleEn", "summaryEn"] as const) {
      if (item[key] !== undefined && typeof item[key] !== "string") throw new RequestError(`${key} 형식이 올바르지 않습니다.`);
    }
    for (const key of ["published", "featured"] as const) {
      if (item[key] !== undefined && typeof item[key] !== "boolean") throw new RequestError(`${key} 형식이 올바르지 않습니다.`);
    }
    if (item.order !== undefined && !Number.isSafeInteger(item.order)) throw new RequestError("프로젝트 순서는 정수여야 합니다.");
    return {
      ...item,
      id: item.id || `legacy-${createHash("sha256").update(item.title).digest("hex").slice(0, 24)}`,
      slug: item.slug || decodeURIComponent(projectSlug(item.title)),
      teamSize: item.teamSize ?? "",
      period: item.period ?? "",
      description: typeof item.description === "string" ? item.description.split("\n") : item.description,
      published: item.published ?? true,
      featured: item.featured ?? false,
      order: item.order ?? index,
    } as CatalogProject;
  });
  for (const key of ["id", "slug"] as const) {
    if (new Set(projects.map(project => project[key])).size !== projects.length) {
      throw new RequestError(`프로젝트 ${key}가 중복되었습니다.`, 409);
    }
  }
  return projects;
}

function parseCatalog(raw: string): CatalogProject[] {
  try { return normalizeProjectCatalog(JSON.parse(raw)); }
  catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError("프로젝트 JSON 형식이 올바르지 않습니다.");
  }
}

export async function getProjectCatalog(raw?: string): Promise<CatalogProject[]> {
  if (raw !== undefined) return parseCatalog(raw);
  const setting = await prisma.siteSetting.findUnique({ where: { key: "project_data" } });
  if (setting) return parseCatalog(setting.value);
  // Read-only compatibility for installations that never created project_data.
  const legacy = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return normalizeProjectCatalog(legacy.map(project => ({ ...project,
    ...(project.imageUrl ? { media: { type: "image", url: project.imageUrl } } : {}),
  })));
}

export async function getPublishedProjects(raw?: string): Promise<ProjectItem[]> {
  const projects = (await getProjectCatalog(raw)).filter(project => project.published)
    .sort((a, b) => a.order - b.order);
  return applyCurrentPortfolioContentBlocks(projects).map(project => ({
    ...projectTranslations[project.title], ...project,
  }));
}

export async function lockProjectCatalog(tx: Prisma.TransactionClient) {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext('portfolio:project_data'))`;
}

export async function mutateProjectCatalog(change: (projects: CatalogProject[]) => CatalogProject[]) {
  return prisma.$transaction(async tx => {
    await lockProjectCatalog(tx);
    const row = await tx.siteSetting.findUnique({ where: { key: "project_data" } });
    const existing = row ? parseCatalog(row.value) : normalizeProjectCatalog(
      (await tx.project.findMany({ orderBy: { order: "asc" } })).map(project => ({ ...project,
        ...(project.imageUrl ? { media: { type: "image", url: project.imageUrl } } : {}),
      })),
    );
    const projects = normalizeProjectCatalog(change(existing));
    const value = JSON.stringify(projects);
    await tx.siteSetting.upsert({ where: { key: "project_data" }, update: { value }, create: { key: "project_data", value } });
    return projects;
  });
}

export function projectForEditor(project: CatalogProject) {
  return { ...project, description: project.description.join("\n"),
    githubUrl: project.githubUrl || "", liveUrl: project.liveUrl || "",
    imageUrl: project.media?.type === "image" ? project.media.url : "",
  };
}

export function updateProjectFromEditor(body: unknown, existing?: CatalogProject): CatalogProject {
  if (!isRecord(body)) throw new RequestError("프로젝트 내용을 입력해주세요.");
  for (const key of ["title", "slug", "summary", "description"] as const) {
    if (typeof body[key] !== "string" || !body[key].trim()) throw new RequestError(`${key}을 입력해주세요.`);
  }
  const slug = (body.slug as string).trim().toLowerCase();
  if (slug.length > 200 || /[\s/?#%\\]/.test(slug) || slug === "." || slug === "..") throw new RequestError("프로젝트 주소 형식이 올바르지 않습니다.");
  const links: Record<string, string> = {};
  for (const key of ["githubUrl", "liveUrl", "imageUrl"] as const) {
    const value = body[key] ?? "";
    if (typeof value !== "string" || (value && !/^https?:\/\//i.test(value) && !(key === "imageUrl" && /^\/(?!\/)/.test(value)))) {
      throw new RequestError("링크는 http(s) 주소 또는 이미지 경로여야 합니다.");
    }
    links[key] = value;
  }
  const project = normalizeProjectCatalog([{
    ...existing, id: existing?.id ?? randomUUID(),
    title: (body.title as string).trim(), slug, summary: body.summary,
    description: body.description, techStack: body.techStack ?? [],
    githubUrl: links.githubUrl, liveUrl: links.liveUrl,
    published: body.published ?? existing?.published ?? true,
    featured: body.featured ?? existing?.featured ?? false,
    order: body.order ?? existing?.order ?? 0,
  }])[0];
  // Update the cover only when it changed, preserving PDF/video covers and metadata.
  const previousImage = existing?.media?.type === "image" ? existing.media.url : "";
  if (links.imageUrl !== previousImage) {
    project.media = links.imageUrl ? { type: "image", url: links.imageUrl } : undefined;
  }
  return project;
}
