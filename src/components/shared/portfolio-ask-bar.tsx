"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Search, X, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";

interface AskResponse {
  answer: string;
  sources: string[];
  error?: string;
}

export const PortfolioAskBar = memo(function PortfolioAskBar() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AskResponse | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* 바깥 클릭 시 닫기 */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  /* 열릴 때 input focus */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = useCallback(async () => {
    const q = query.trim();
    if (!q || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/portfolio-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data: AskResponse = await res.json();

      if (!res.ok) {
        setResult({ answer: data.error || locale["ask.error"][lang], sources: [] });
      } else {
        setResult(data);
      }
    } catch {
      setResult({
        answer: locale["ask.connectionError"][lang],
        sources: [],
      });
    } finally {
      setLoading(false);
    }
  }, [query, loading, lang]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* 닫힌 상태: 아이콘 버튼 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label={locale["ask.openSearch"][lang]}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{locale["ask.button"][lang]}</span>
        </button>
      )}

      {/* 열린 상태: 입력창 */}
      {open && (
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "flex items-center gap-2 rounded-md border px-2.5 py-1.5 transition-all",
              "border-[var(--notion-hairline)] bg-white/90 backdrop-blur-sm",
              "w-[200px] sm:w-[260px]",
            )}
          >
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={locale["ask.placeholder"][lang]}
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/60"
            />
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <button
                onClick={() => { setOpen(false); setResult(null); setQuery(""); }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 답변 패널 */}
      {open && result && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 z-50",
            "w-[min(680px,calc(100vw-32px))] max-h-[calc(100svh-72px)] overflow-y-auto",
            "rounded-lg border border-[var(--notion-hairline)] bg-white/95 backdrop-blur-xl",
            "shadow-lg p-4",
          )}
        >
          <MarkdownRenderer content={result.answer} className="rag-answer" />

          {result.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[var(--notion-hairline)]">
              <div className="flex items-center gap-1 mb-1.5">
                <FileText className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase">
                  Sources
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {result.sources.map((s) => (
                  <span
                    key={s}
                    className="inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
});
