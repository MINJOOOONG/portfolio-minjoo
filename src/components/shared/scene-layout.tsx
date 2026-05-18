"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { SceneNavbar } from "./scene-navbar";
import { ActiveSectionProvider } from "@/hooks/use-active-section";
import { SlideIndicator } from "./slide-indicator";
import type { ResumeData } from "@/lib/pdf/types";

const ThreePortfolioBg = dynamic(
  () =>
    import("@/components/shared/three-portfolio-bg").then(
      (m) => m.ThreePortfolioBg
    ),
  { ssr: false }
);

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "articles",
  "skills",
  "education",
  "contact",
];

interface SceneLayoutProps {
  sections: ReactNode[];
  resumeData?: ResumeData;
}

export function SceneLayout({ sections, resumeData }: SceneLayoutProps) {
  return (
    <ActiveSectionProvider sectionIds={SECTION_IDS}>
      <div className="min-h-screen bg-white">
        <ThreePortfolioBg />
        <SceneNavbar resumeData={resumeData} />
        <SlideIndicator sectionIds={SECTION_IDS} />
        <main className="relative z-10 bg-white">
          {sections.map((content, i) => (
            <section
              key={SECTION_IDS[i]}
              id={SECTION_IDS[i]}
              className={
                SECTION_IDS[i] === "contact"
                  ? "scene-section scene-section-hero"
                  : "scene-section"
              }
              /* Projects section: no wrapper, content manages its own layout */
              style={
                SECTION_IDS[i] === "projects"
                  ? {
                      height: "100vh",
                      minHeight: 0,
                      maxHeight: "100vh",
                      padding: 0,
                      overflow: "hidden",
                      display: "block",
                    }
                  : undefined
              }
            >
              {SECTION_IDS[i] === "projects" ? (
                content
              ) : (
                <div className="w-full max-w-[960px] mx-auto">
                  {content}
                </div>
              )}
            </section>
          ))}
        </main>
      </div>
    </ActiveSectionProvider>
  );
}
