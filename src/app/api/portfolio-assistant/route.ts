import { NextRequest, NextResponse } from "next/server";

const RAG_API_URL = process.env.RAG_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "질문을 입력해주세요." },
        { status: 400 },
      );
    }

    const res = await fetch(`${RAG_API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "RAG 서버 응답 오류가 발생했습니다." },
        { status: 502 },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "AI 어시스턴트에 연결할 수 없습니다. RAG 서버가 실행 중인지 확인해주세요." },
      { status: 503 },
    );
  }
}
