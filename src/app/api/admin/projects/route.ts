import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { getProjectCatalog, mutateProjectCatalog, projectForEditor, updateProjectFromEditor } from "@/lib/project-catalog";
import { readJson, RequestError } from "@/lib/request-validation";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;
  return NextResponse.json((await getProjectCatalog()).sort((a, b) => a.order - b.order).map(projectForEditor));
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;
  try {
    const project = updateProjectFromEditor(await readJson(request));
    await mutateProjectCatalog(projects => [...projects, project]);
    return NextResponse.json(projectForEditor(project), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof RequestError ? error.message : "프로젝트 생성에 실패했습니다." },
      { status: error instanceof RequestError ? error.status : 500 });
  }
}
