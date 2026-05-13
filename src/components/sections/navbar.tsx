"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PdfExportButton } from "@/components/shared/pdf-export-button";
import type { ResumeData } from "@/lib/pdf/types";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#articles", label: "Articles" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
];

interface NavbarProps {
  resumeData?: ResumeData;
}

export function Navbar({ resumeData }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-150",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-end h-14">
          <nav className="hidden sm:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
              >
                {item.label}
              </a>
            ))}
            {resumeData && <PdfExportButton resumeData={resumeData} />}
          </nav>
        </div>
      </div>
    </header>
  );
}
