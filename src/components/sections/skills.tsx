"use client";

import { memo } from "react";
import { SlideHeading } from "./about";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useStaggerReveal } from "@/hooks/use-stagger-reveal";

interface SkillsProps {
  data: Record<string, string[]>;
}

const CATEGORY_TINTS = [
  "var(--notion-tint-lavender)",
  "var(--notion-tint-mint)",
  "var(--notion-tint-sky)",
  "var(--notion-tint-peach)",
  "var(--notion-tint-rose)",
  "var(--notion-tint-yellow)",
  "var(--notion-tint-cream)",
];

function SkillCategory({ category, skills, tint }: { category: string; skills: string[]; tint: string }) {
  const ref = useStaggerReveal<HTMLDivElement>({
    childSelector: ".skill-tag",
    stagger: 0.04,
    y: 20,
  });

  return (
    <div className="py-5">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        {category}
      </h3>
      <div ref={ref} className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="skill-tag px-3 py-1.5 text-sm font-medium rounded-md text-foreground transition-all duration-150 hover:shadow-sm hover:text-foreground"
            style={{ background: tint }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export const Skills = memo(function Skills({ data }: SkillsProps) {
  const categories = Object.entries(data);
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const gridRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> div",
    stagger: 0.2,
    y: 40,
  });

  if (categories.length === 0) return null;

  return (
    <div className="w-full">
      <div ref={headingRef}>
        <SlideHeading label="Skills" title="Tech Stack" />
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {categories.map(([category, skills], i) => (
          <SkillCategory key={category} category={category} skills={skills} tint={CATEGORY_TINTS[i % CATEGORY_TINTS.length]} />
        ))}
      </div>
    </div>
  );
});
