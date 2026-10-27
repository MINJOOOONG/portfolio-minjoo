import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession, SESSION_COOKIE_NAME } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { isRecord, readJson, RequestError } from "@/lib/request-validation";

export async function POST(request: NextRequest) {
  try {
    const limited = await rateLimit(request, { scope: "login", limit: 5, windowMs: 60_000 });
    if (limited) return limited;
    const body = await readJson(request, 8000);
    const password = isRecord(body) ? body.password : undefined;

    if (!password || typeof password !== "string" || password.length > 1024) {
      return NextResponse.json(
        { error: "비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    const token = await createSession();

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    if (error instanceof RequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
