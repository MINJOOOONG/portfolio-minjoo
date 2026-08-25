import { NextRequest, NextResponse } from "next/server";

const RAG_API_URL =
  process.env.RAG_API_URL?.replace(/\/$/, "") ||
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, history } = body as {
      question?: string;
      history?: HistoryMessage[];
    };

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "질문을 입력해주세요." },
        { status: 400 },
      );
    }

    if (!RAG_API_URL) {
      return NextResponse.json(
        {
          error:
            "RAG_API_URL 환경변수가 설정되지 않았습니다. Vercel 환경변수에 배포된 RAG API 주소를 등록해주세요.",
        },
        { status: 503 },
      );
    }

    // Agent 엔드포인트로 요청 (history 포함)
    const res = await fetch(`${RAG_API_URL}/agent/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        history: Array.isArray(history) ? history : [],
      }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!res.ok) {
      // Agent 실패 시 레거시 /ask로 폴백
      const fallbackRes = await fetch(`${RAG_API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: AbortSignal.timeout(30_000),
      });

      if (!fallbackRes.ok) {
        return NextResponse.json(
          { error: "RAG 서버 응답 오류가 발생했습니다." },
          { status: 502 },
        );
      }

      const fallbackData = await fallbackRes.json();
      return NextResponse.json({
        ...fallbackData,
        tools_used: [],
        verification: null,
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[portfolio-assistant] RAG API request failed", error);

    return NextResponse.json(
      {
        error:
          "AI 어시스턴트에 연결할 수 없습니다. RAG API 주소와 서버 상태를 확인해주세요.",
      },
      { status: 503 },
    );
  }
}
