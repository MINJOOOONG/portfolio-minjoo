"use client";

import { FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  FileText,
  Loader2,
  Send,
  Sparkles,
  Wrench,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";

interface ToolUsed {
  name: string;
  input: Record<string, unknown>;
}

interface Verification {
  is_accurate: boolean;
  confidence: number;
  issues: string[];
  summary: string;
}

interface AgentResponse {
  answer: string;
  sources: string[];
  tools_used?: ToolUsed[];
  verification?: Verification | null;
  error?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  tools_used?: ToolUsed[];
  verification?: Verification | null;
}

const TOOL_LABELS: Record<string, { ko: string; en: string }> = {
  search_portfolio: { ko: "포트폴리오 검색", en: "Portfolio Search" },
  get_project_details: { ko: "프로젝트 상세", en: "Project Details" },
  compare_skills: { ko: "스킬 비교", en: "Skill Compare" },
  get_contact_info: { ko: "연락처 조회", en: "Contact Info" },
};

export const PortfolioAssistantPage = memo(function PortfolioAssistantPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [today, setToday] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat(lang === "en" ? "en-US" : "ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(new Date())
        .replaceAll(". ", ".")
        .replace(/\.$/, "")
    );
  }, [lang]);

  // 새 메시지 추가 시 자동 스크롤
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const submitQuestion = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || loading) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      setMessages((current) => [...current, userMessage]);
      setQuery("");
      setLoading(true);

      try {
        // 대화 히스토리 구성
        const history = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/portfolio-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: trimmed, history }),
        });
        const data: AgentResponse = await res.json();

        setMessages((current) => [
          ...current,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: res.ok ? data.answer : data.error || locale["ask.error"][lang],
            sources: res.ok ? data.sources : [],
            tools_used: res.ok ? data.tools_used : [],
            verification: res.ok ? data.verification : null,
          },
        ]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: locale["ask.connectionError"][lang],
            sources: [],
          },
        ]);
      } finally {
        setLoading(false);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [loading, lang, messages]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitQuestion(query);
  };

  return (
    <main className="min-h-[100svh] bg-white text-foreground">
      <header className="sticky top-0 z-20 border-b border-[var(--notion-hairline)] bg-white backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[720px] items-center justify-between px-5">
          <Link
            href="/portfolio#about"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
            aria-label={locale["assistant.back"][lang]}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-base font-semibold tracking-normal">{locale["assistant.title"][lang]}</h1>
          <div className="w-10" />
        </div>
      </header>

      <section className="mx-auto max-w-[720px] px-5 pb-32 pt-3">
        <div className="mb-8 flex items-center gap-3 text-xs font-semibold text-muted-foreground">
          <span className="h-px flex-1 bg-[var(--notion-hairline)]" />
          <span>{today}</span>
          <span className="h-px flex-1 bg-[var(--notion-hairline)]" />
        </div>

        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-foreground" />
            {locale["assistant.connected"][lang]}
          </span>
        </div>

        <div className="space-y-5">
          <div className="max-w-[92%]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold leading-snug tracking-normal whitespace-pre-line">
              {locale["assistant.greeting"][lang]}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {locale["assistant.description"][lang]}
            </p>
          </div>

          {messages.map((message) => (
            <article
              key={message.id}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                message.role === "user"
                  ? "ml-auto max-w-[82%] bg-foreground text-white"
                  : "mr-auto max-w-[92%] bg-white text-foreground"
              )}
            >
              {message.role === "assistant" ? (
                <MarkdownRenderer content={message.content} className="rag-answer" />
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}

              {/* 도구 사용 표시 */}
              {message.tools_used && message.tools_used.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[var(--notion-hairline)] pt-3">
                  <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <Wrench className="h-3 w-3" />
                    {locale["assistant.toolsUsed"][lang]}:
                  </span>
                  {message.tools_used.map((tool, i) => (
                    <span
                      key={`${tool.name}-${i}`}
                      className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] text-blue-700"
                    >
                      {TOOL_LABELS[tool.name]?.[lang] || tool.name}
                    </span>
                  ))}
                </div>
              )}

              {/* 검증 배지 */}
              {message.verification && (
                <div className="mt-2 flex items-center gap-1.5">
                  {message.verification.is_accurate ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] text-green-700">
                      <CheckCircle className="h-3 w-3" />
                      {locale["assistant.verified"][lang]}
                      <span className="text-green-500">
                        {Math.round(message.verification.confidence * 100)}%
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] text-red-700">
                      <XCircle className="h-3 w-3" />
                      {locale["assistant.unverified"][lang]}
                    </span>
                  )}
                </div>
              )}

              {/* 소스 표시 */}
              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 border-t border-[var(--notion-hairline)] pt-2">
                  {message.sources.map((source) => (
                    <span
                      key={source}
                      className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      <FileText className="h-3 w-3" />
                      {source}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}

          {loading && (
            <div className="mr-auto inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              {locale["assistant.analyzing"][lang]}
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--notion-hairline)] bg-white/96 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-3 flex items-start gap-2 rounded-xl bg-[#F7F6F3] px-4 py-3 text-sm leading-snug text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#FACC15]" />
            <p>{locale["assistant.privacyWarning"][lang]}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={locale["assistant.placeholder"][lang]}
              className="min-w-0 flex-1 rounded-2xl bg-[#F1F3F5] px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/35"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-white transition-opacity disabled:opacity-35"
              aria-label={locale["assistant.send"][lang]}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
});
