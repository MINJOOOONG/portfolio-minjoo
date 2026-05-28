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
  "ai-lab",
  "articles",
  "skills",
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
        <SceneNavbar />
        <SlideIndicator sectionIds={SECTION_IDS} />
        <main className="relative z-10 bg-white">
          {sections.map((content, i) => (
            <section
              key={SECTION_IDS[i]}
              id={SECTION_IDS[i]}
              className={[
                "scene-section",
                SECTION_IDS[i] === "projects" || SECTION_IDS[i] === "ai-lab"
                  ? "scene-section--full"
                  : "",
                SECTION_IDS[i] === "contact" ? "scene-section--top" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {SECTION_IDS[i] === "projects" || SECTION_IDS[i] === "ai-lab" ? (
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
