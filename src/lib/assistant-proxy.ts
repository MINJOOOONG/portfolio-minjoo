import { isRecord, RequestError } from "./request-validation";

interface HistoryMessage { role: "user" | "assistant"; content: string }
export interface AssistantRequest { question: string; history: HistoryMessage[] }

export function parseAssistantRequest(body: unknown): AssistantRequest {
  if (!isRecord(body) || typeof body.question !== "string" || !body.question.trim() || body.question.length > 2000) {
    throw new RequestError("질문을 1~2,000자 이내로 입력해주세요.");
  }
  const history = body.history ?? [];
  if (!Array.isArray(history) || history.length > 12 || history.some(message =>
    !isRecord(message) || !["user", "assistant"].includes(String(message.role)) ||
    typeof message.content !== "string" || !message.content.trim() || message.content.length > 4000,
  )) throw new RequestError("대화 기록의 형식이나 길이가 올바르지 않습니다.");
  return { question: body.question.trim(), history: history as HistoryMessage[] };
}

function isAnswer(body: unknown): body is Record<string, unknown> & { answer: string; sources: string[] } {
  return isRecord(body) && typeof body.answer === "string" && Boolean(body.answer.trim()) &&
    Array.isArray(body.sources) && body.sources.every(source => typeof source === "string");
}

export async function requestAssistant(baseUrl: string, body: AssistantRequest, token?: string, fetcher: typeof fetch = fetch) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const response = await fetcher(`${baseUrl}/agent/chat`, {
      method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(45_000),
    });
    if (response.ok) {
      const data: unknown = await response.json();
      // Older deployments encode errors as HTTP 200 / agent_turns=0.
      if (isAnswer(data) && typeof data.agent_turns === "number" && data.agent_turns > 0) return data;
    }
  } catch {
    // Network errors, timeouts and invalid responses also use the fallback.
  }
  const fallback = await fetcher(`${baseUrl}/ask`, {
    method: "POST", headers, body: JSON.stringify({ question: body.question }), signal: AbortSignal.timeout(30_000),
  });
  if (!fallback.ok) throw new Error("RAG fallback unavailable");
  const data: unknown = await fallback.json();
  if (!isAnswer(data)) throw new Error("Invalid RAG response");
  return { answer: data.answer, sources: data.sources, tools_used: [], verification: null };
}
