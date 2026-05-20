"use client";

import { useEffect, useRef, useState, memo } from "react";
import { cn } from "@/lib/utils";
import { PdfExportButton } from "@/components/shared/pdf-export-button";
import type { ResumeData } from "@/lib/pdf/types";

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

interface SceneNavbarProps {
  resumeData?: ResumeData;
}

export const SceneNavbar = memo(function SceneNavbar({ resumeData }: SceneNavbarProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  const scrollToSection = (id: string) => {
    window.dispatchEvent(new CustomEvent("slide-nav-goto", { detail: id }));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--notion-canvas)]/80 backdrop-blur-xl border-b border-[var(--notion-hairline)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[960px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-end h-14">
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
            {resumeData && <PdfExportButton resumeData={resumeData} />}
          </nav>
        </div>
      </div>
    </header>
  );
});
