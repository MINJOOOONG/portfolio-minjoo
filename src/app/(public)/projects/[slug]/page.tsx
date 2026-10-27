import { notFound } from "next/navigation";
import { getPublishedProjects } from "@/lib/project-catalog";
import { projectSlug } from "@/lib/portfolio-project-content";
import { isArticleProject } from "@/lib/project-groups";
import { ProjectDetailPageContent } from "@/components/sections/projects";

export const dynamic = "force-dynamic";

async function getProjectBySlug(slug: string) {
  const projects = (await getPublishedProjects()).filter((item) => !isArticleProject(item));
  const index = projects.findIndex((project) => decodeURIComponent(projectSlug(project)) === slug);

  if (index < 0) return null;

  return {
    project: projects[index],
    index,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${result.project.title} | Project`,
    description: result.project.summary,
  };
}

export default async function ProjectDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) notFound();

  return (
    <ProjectDetailPageContent
      project={result.project}
      index={result.index}
    />
  );
}
