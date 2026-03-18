import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";

const SESSION_COOKIE_NAME = "admin_session";

export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const session = await prisma.adminSession.findUnique({
    where: { token: sessionToken },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.adminSession.delete({ where: { id: session.id } });
    }
    return NextResponse.json(
      { error: "세션이 만료되었습니다." },
      { status: 401 }
    );
  }

  return null; // Authorized
}
