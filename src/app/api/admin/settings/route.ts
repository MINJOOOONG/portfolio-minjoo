import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { getSettings } from "@/lib/settings";
import { lockProjectCatalog } from "@/lib/project-catalog";
import { validateSettings } from "@/lib/settings-validation";
import { readJson, RequestError } from "@/lib/request-validation";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;
  return NextResponse.json(await getSettings());
}

export async function PUT(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;
  try {
    const data = validateSettings(await readJson(request, 4_000_000));
    await prisma.$transaction(async tx => {
      if (data.project_data !== undefined) await lockProjectCatalog(tx);
      for (const [key, value] of Object.entries(data)) {
        await tx.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof RequestError ? error.message : "설정 저장에 실패했습니다." },
      { status: error instanceof RequestError ? error.status : 500 });
  }
}
