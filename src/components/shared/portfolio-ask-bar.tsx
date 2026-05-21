"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Search, X, Loader2, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AskResponse {
  answer: string;
  sources: string[];
  recommended_section?: { label: string; section_id: string };
  error?: string;
}

export const PortfolioAskBar = memo(function PortfolioAskBar() {
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
        setResult({ answer: data.error || "오류가 발생했습니다.", sources: [] });
      } else {
        setResult(data);
      }
    } catch {
      setResult({
        answer: "AI 어시스턴트에 연결할 수 없습니다.",
        sources: [],
      });
    } finally {
      setLoading(false);
    }
  }, [query, loading]);

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
          aria-label="AI 검색 열기"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Ask AI</span>
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
              placeholder="Ask about my work…"
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
            "w-[320px] sm:w-[400px] max-h-[360px] overflow-y-auto",
            "rounded-lg border border-[var(--notion-hairline)] bg-white/95 backdrop-blur-xl",
            "shadow-lg p-4",
          )}
        >
          <p className="text-xs leading-relaxed text-foreground whitespace-pre-wrap">
            {result.answer}
          </p>

          {result.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[var(--notion-hairline)]">
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

          {result.recommended_section && (
            <div className="mt-3 pt-3 border-t border-[var(--notion-hairline)]">
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("slide-nav-goto", {
                      detail: result.recommended_section!.section_id,
                    }),
                  );
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 w-full",
                  "border-[var(--notion-hairline)] bg-white text-xs text-muted-foreground",
                  "hover:bg-muted hover:text-foreground transition-colors",
                )}
              >
                <span>관련 섹션 보기</span>
                <ArrowRight className="h-3 w-3" />
                <span className="font-medium text-foreground">
                  {result.recommended_section.label}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
