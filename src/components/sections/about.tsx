"use client";

import { memo } from "react";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useStaggerReveal } from "@/hooks/use-stagger-reveal";

interface AboutProps {
  content: string;
}

export const About = memo(function About({ content }: AboutProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const contentRef = useStaggerReveal<HTMLDivElement>({
    childSelector: ".markdown-content > *",
    stagger: 0.08,
    y: 30,
  });

  if (!content) return null;

  return (
    <div className="w-full max-w-[780px] py-24 sm:py-28">
      <div ref={headingRef} className="mb-8">
        <div className="mb-4">
          <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
            About
          </span>
          <h2 className="font-display font-normal tracking-[-0.04em] leading-[0.95] text-foreground">
            <span className="inline-block text-[clamp(2rem,4.5vw,3.2rem)] scale-x-[1.15] origin-left">A</span>
            <span className="text-[clamp(2.15rem,4.8vw,3.42rem)]">bout</span>
          </h2>
        </div>
      </div>
      <div
        ref={contentRef}
        className="about-copy border-l border-[var(--notion-hairline)] pl-5 sm:pl-7"
      >
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
});

export function SlideHeading({ label, title }: { label: string; title?: string }) {
  const displayText = title && /^[A-Za-z0-9 /&|+-]+$/.test(title) ? title : label;

  return (
    <div className="mb-4">
      {/* Kicker */}
      <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
        {label}
      </span>
      {/* Display heading */}
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-black tracking-[-0.04em] leading-[0.95] text-foreground">
        {displayText}
      </h2>
    </div>
  );
}
