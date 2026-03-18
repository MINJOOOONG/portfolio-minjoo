import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        description: data.description,
        techStack: data.techStack || [],
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        imageUrl: data.imageUrl || null,
        featured: data.featured || false,
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "프로젝트 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
