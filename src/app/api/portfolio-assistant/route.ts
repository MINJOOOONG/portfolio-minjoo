import { NextRequest, NextResponse } from "next/server";
import { parseAssistantRequest, requestAssistant } from "@/lib/assistant-proxy";
import { rateLimit } from "@/lib/rate-limit";
import { readJson, RequestError } from "@/lib/request-validation";

export const maxDuration = 90;

export async function POST(request: NextRequest) {
  try {
    const body = parseAssistantRequest(await readJson(request));
    const baseUrl = process.env.RAG_API_URL?.replace(/\/$/, "") ||
      (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");
    if (!baseUrl) return NextResponse.json({ error: "AI 서비스를 준비하고 있습니다." }, { status: 503 });
    for (const policy of [
      { scope: "assistant-minute", limit: 10, windowMs: 60_000 },
      { scope: "assistant-day", limit: 100, windowMs: 86_400_000 },
    ]) {
      const limited = await rateLimit(request, policy);
      if (limited) return limited;
    }
    return NextResponse.json(await requestAssistant(baseUrl, body, process.env.RAG_API_TOKEN));
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("[portfolio-assistant] Upstream unavailable");
    return NextResponse.json({ error: "AI 어시스턴트에 연결할 수 없습니다. 잠시 후 다시 시도해주세요." }, { status: 503 });
  }
}
