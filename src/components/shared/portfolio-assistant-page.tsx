"use client";

import { FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BotMessageSquare,
  ChevronRight,
  FileText,
  Loader2,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AskResponse {
  answer: string;
  sources: string[];
  recommended_section?: { label: string; section_id: string };
  error?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  recommendedSection?: { label: string; section_id: string };
}

export const PortfolioAssistantPage = memo(function PortfolioAssistantPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [today, setToday] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(new Date())
        .replaceAll(". ", ".")
        .replace(/\.$/, "")
    );
  }, []);

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
        const res = await fetch("/api/portfolio-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: trimmed }),
        });
        const data: AskResponse = await res.json();

        setMessages((current) => [
          ...current,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: res.ok ? data.answer : data.error || "오류가 발생했습니다.",
            sources: res.ok ? data.sources : [],
            recommendedSection: res.ok ? data.recommended_section : undefined,
          },
        ]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: "AI 어시스턴트에 연결할 수 없습니다.",
            sources: [],
          },
        ]);
      } finally {
        setLoading(false);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [loading]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitQuestion(query);
  };

  const resetChat = () => {
    setMessages([]);
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <main className="min-h-[100svh] bg-[#F7F8FA] text-foreground">
      <header className="sticky top-0 z-20 border-b border-[var(--notion-hairline)] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[720px] items-center justify-between px-5">
          <Link
            href="/portfolio#about"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
            aria-label="포트폴리오로 돌아가기"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-base font-semibold tracking-normal">RAG AI와 대화 중</h1>
          <div className="inline-flex h-11 w-11 flex-col items-center justify-center rounded-2xl bg-[var(--notion-primary)] text-[10px] font-bold leading-tight text-white shadow-sm">
            <span>RAG</span>
            <span>AI</span>
          </div>
        </div>
        <div className="mx-auto grid max-w-[720px] grid-cols-3 border-t border-[var(--notion-hairline)] bg-white text-xs text-muted-foreground">
          <button className="inline-flex h-12 items-center justify-center gap-1.5 border-r border-[var(--notion-hairline)]" type="button">
            <BotMessageSquare className="h-4 w-4" />
            톡상담
          </button>
          <Link
            href="/portfolio#about"
            className="inline-flex h-12 items-center justify-center gap-1.5 border-r border-[var(--notion-hairline)]"
          >
            <ChevronRight className="h-4 w-4" />
            포트폴리오
          </Link>
          <button className="inline-flex h-12 items-center justify-center gap-1.5" type="button" onClick={resetChat}>
            <RotateCcw className="h-4 w-4" />
            처음으로
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[720px] px-5 pb-32 pt-6">
        <Link
          href="/portfolio#projects"
          className="mb-6 flex items-center justify-between rounded-2xl bg-[#ECEFF7] px-5 py-4 text-left shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--notion-primary)]">
              <BotMessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold">나만의 포트폴리오 답변직원</p>
              <p className="mt-1 text-xs text-muted-foreground">RAG 상담서비스</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        <div className="mb-8 flex items-center gap-3 text-xs font-semibold text-muted-foreground">
          <span className="h-px flex-1 bg-[var(--notion-hairline)]" />
          <span>{today}</span>
          <span className="h-px flex-1 bg-[var(--notion-hairline)]" />
        </div>

        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2684FF]" />
            RAG AI와 연결했습니다
          </span>
        </div>

        <div className="space-y-5">
          <div className="max-w-[92%]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--notion-primary)] shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold leading-snug tracking-normal">
              서민주 포트폴리오에 대해
              <br />
              궁금한 내용을 물어보세요.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              프로젝트, 기술 스택, 경험, AI 활용 방식에 대해 답변합니다.
            </p>
          </div>

          {messages.map((message) => (
            <article
              key={message.id}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                message.role === "user"
                  ? "ml-auto max-w-[82%] bg-[var(--notion-primary)] text-white"
                  : "mr-auto max-w-[92%] bg-white text-foreground"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[var(--notion-hairline)] pt-3">
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
              {message.recommendedSection && (
                <Link
                  href={`/portfolio#${message.recommendedSection.section_id}`}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--notion-hairline)] px-3 py-1.5 text-xs text-muted-foreground"
                >
                  관련 섹션 보기
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </article>
          ))}

          {loading && (
            <div className="mr-auto inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              답변을 준비하고 있습니다
            </div>
          )}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--notion-hairline)] bg-white/96 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-3 flex items-start gap-2 rounded-xl bg-[#4B5563] px-4 py-3 text-sm leading-snug text-white">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#FACC15]" />
            <p>개인정보나 민감한 정보를 입력하지 말아 주세요.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="메시지를 입력해 주세요"
              className="min-w-0 flex-1 rounded-2xl bg-[#F1F3F5] px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/35"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--notion-primary)] text-white transition-opacity disabled:opacity-35"
              aria-label="메시지 보내기"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
});
