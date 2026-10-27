import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { mutateProjectCatalog, projectForEditor, updateProjectFromEditor } from "@/lib/project-catalog";
import { readJson, RequestError } from "@/lib/request-validation";

type Context = { params: Promise<{ id: string }> };
export async function PUT(request: NextRequest, { params }: Context) {
  const authError = await requireAdmin(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    const body = await readJson(request);
    const projects = await mutateProjectCatalog(projects => {
      if (!projects.some(project => project.id === id)) throw new RequestError("프로젝트를 찾을 수 없습니다.", 404);
      return projects.map(project => project.id === id ? updateProjectFromEditor(body, project) : project);
    });
    return NextResponse.json(projectForEditor(projects.find(project => project.id === id)!));
  } catch (error) { return failure(error, "프로젝트 수정에 실패했습니다."); }
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const authError = await requireAdmin(request);
  if (authError) return authError;
  try {
    const { id } = await params;
    await mutateProjectCatalog(projects => {
      if (!projects.some(project => project.id === id)) throw new RequestError("프로젝트를 찾을 수 없습니다.", 404);
      return projects.filter(project => project.id !== id);
    });
    return NextResponse.json({ success: true });
  } catch (error) { return failure(error, "프로젝트 삭제에 실패했습니다."); }
}
function failure(error: unknown, fallback: string) {
  return NextResponse.json({ error: error instanceof RequestError ? error.message : fallback },
    { status: error instanceof RequestError ? error.status : 500 });
}
