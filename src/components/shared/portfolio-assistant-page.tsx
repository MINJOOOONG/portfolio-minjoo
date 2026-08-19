"use client";

import { FormEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  FileText,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";

interface AskResponse {
  answer: string;
  sources: string[];
  error?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

export const PortfolioAssistantPage = memo(function PortfolioAssistantPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [today, setToday] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
            content: res.ok ? data.answer : data.error || locale["ask.error"][lang],
            sources: res.ok ? data.sources : [],
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
    [loading, lang]
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
            </article>
          ))}

          {loading && (
            <div className="mr-auto inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              {locale["assistant.preparing"][lang]}
            </div>
          )}
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
