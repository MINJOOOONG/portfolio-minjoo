"use client";

import { memo } from "react";
import { SlideHeading } from "./about";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useStaggerReveal } from "@/hooks/use-stagger-reveal";

export interface EducationItem {
  school: string;
  major: string;
  period: string;
}

export interface CertificationItem {
  name: string;
  date: string;
}

interface EducationProps {
  items: EducationItem[];
}

interface CertificationsProps {
  items: CertificationItem[];
}

export const Education = memo(function Education({ items }: EducationProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const listRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> div",
    stagger: 0.12,
    y: 30,
  });

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-[760px]">
      <div ref={headingRef} className="mb-8">
        <SlideHeading label="Education" title="Education" />
      </div>

      <div ref={listRef} className="space-y-0">
        {items.map((item, i) => (
          <div
            key={i}
            className="border-b border-[var(--notion-hairline)] py-6 first:pt-0 last:border-b-0"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">{item.school}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.major}</p>
              </div>
              <p className="text-xs font-medium text-muted-foreground sm:pt-1">
                {item.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export const Certifications = memo(function Certifications({ items }: CertificationsProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const listRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> div",
    stagger: 0.12,
    y: 30,
  });

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-[760px]">
      <div ref={headingRef} className="mb-8">
        <SlideHeading label="Certifications" title="Certifications" />
      </div>

      <div ref={listRef} className="space-y-0">
        {items.map((item, i) => (
          <div
            key={i}
            className="border-b border-[var(--notion-hairline)] py-6 first:pt-0 last:border-b-0"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-semibold text-foreground">{item.name}</p>
              <p className="text-xs font-medium text-muted-foreground">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
