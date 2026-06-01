"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "ko" ? "en" : "ko")}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
    >
      <span className={lang === "ko" ? "font-bold text-foreground" : ""}>
        KR
      </span>
      <span className="text-muted-foreground/40">/</span>
      <span className={lang === "en" ? "font-bold text-foreground" : ""}>
        EN
      </span>
    </button>
  );
}
