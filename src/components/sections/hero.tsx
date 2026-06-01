"use client";

import { memo } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";

const PROFILE = {
  name: "서민주",
  nameEn: "MINJOO",
  title: "QA Engineer | Backend Developer",
  status: "구직 중",
  email: "zzz1577@naver.com",
  github: "https://github.com/MINJOOOONG",
  linkedin: "https://www.linkedin.com/in/minjooooo",
  blog: "https://joodev-sandy.vercel.app/",
  summary:
    "QA 실무와 백엔드 개발 경험을 바탕으로 사용자 불편을 로그, 데이터, 코드, 제품 흐름까지 함께 분석합니다.",
};

const links = [
  { label: "Email", href: `mailto:${PROFILE.email}` },
  { label: "GitHub", href: PROFILE.github },
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "Blog", href: PROFILE.blog },
];

export const Hero = memo(function Hero() {
  const { lang } = useLanguage();
  return (
    <div className="hero-grid-bg flex flex-col items-center justify-center min-h-screen text-center gap-6 px-5 sm:px-8">
      {/* Profile photo */}
      <Image
        src="/profile.jpeg"
        alt={PROFILE.name}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover ring-1 ring-border"
        priority
      />

      {/* Name — display font, editorial */}
      <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-[-0.04em] text-foreground leading-[0.9]">
        {PROFILE.nameEn}
      </h1>

      {/* Title — display font Air, wide-spaced */}
      <p className="font-display text-xs sm:text-sm font-extralight tracking-[0.3em] text-muted-foreground uppercase">
        {PROFILE.title}
      </p>

      {/* Status badge */}
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium text-[var(--notion-primary)]" style={{ background: "var(--notion-tint-lavender)" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--notion-primary)] animate-pulse" />
        {locale["hero.status"][lang]}
      </span>

      {/* Summary */}
      <p className="text-sm sm:text-base leading-[2] text-muted-foreground/70 max-w-lg mx-auto">
        {locale["hero.summary"][lang]}
      </p>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-2.5 mt-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-transparent px-4 text-xs font-medium tracking-wide text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
          >
            {link.label}
          </a>
        ))}
      </div>

    </div>
  );
});
