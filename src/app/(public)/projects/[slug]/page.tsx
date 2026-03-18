import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project || !project.published) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block"
      >
        &larr; 프로젝트 목록
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg text-muted-foreground mb-6">{project.summary}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>

      <div className="flex gap-3 mb-10">
        {project.githubUrl && (
          <ButtonLink href={project.githubUrl} variant="outline" size="sm" external>
            GitHub
          </ButtonLink>
        )}
        {project.liveUrl && (
          <ButtonLink href={project.liveUrl} size="sm" external>
            Live Demo
          </ButtonLink>
        )}
      </div>

      <MarkdownRenderer content={project.description} />
    </div>
  );
}
