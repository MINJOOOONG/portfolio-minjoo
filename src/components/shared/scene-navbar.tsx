"use client";

import { useEffect, useRef, useState, memo } from "react";
import Link from "next/link";
import { BotMessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioAskBar } from "@/components/shared/portfolio-ask-bar";
import { LanguageToggle } from "@/components/shared/language-toggle";

const SECTION_IDS = ["about", "experience", "projects", "ai-lab", "articles", "skills", "contact"];

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "ai-lab", label: "AI Lab" },
  { id: "articles", label: "Articles" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const SceneNavbar = memo(function SceneNavbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  /* Auto-scroll active tab into view in the mobile bottom nav */
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    window.dispatchEvent(new CustomEvent("slide-nav-goto", { detail: id }));
  };

  return (
    <>
      {/* ── Desktop top header ── */}
      <header
        className={cn(
          "hidden sm:block fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[var(--notion-canvas)]/80 backdrop-blur-xl border-b border-[var(--notion-hairline)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="hidden sm:block">
              <PortfolioAskBar />
            </div>
            <nav className="hidden sm:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45",
                    activeSection === item.id
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* ── Mobile top navigation bar ── */}
      <nav
        className="sm:hidden fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[var(--notion-hairline)]"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="flex items-center h-12 px-3 gap-2">
          {/* Chatbot icon */}
          <Link
            href="/assistant"
            className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--notion-hairline)] bg-white text-foreground transition-transform active:scale-95"
            aria-label="AI Assistant"
          >
            <BotMessageSquare className="h-[18px] w-[18px]" />
          </Link>

          {/* Language toggle */}
          <LanguageToggle />

          {/* Divider */}
          <div className="shrink-0 w-px h-6 bg-[var(--notion-hairline)]" />

          {/* Section tabs — carousel horizontal scroll */}
          <div
            className="mobile-scroll-tabs flex-1 min-w-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            data-no-section-nav
          >
            <div className="flex w-max min-w-full items-center gap-1 px-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    ref={isActive ? activeTabRef : undefined}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "snap-start shrink-0 px-2.5 py-1.5 text-[11px] tracking-wide rounded-md transition-colors duration-150 whitespace-nowrap",
                      isActive
                        ? "font-bold text-foreground underline underline-offset-4 decoration-foreground/40"
                        : "font-medium text-muted-foreground active:text-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});
