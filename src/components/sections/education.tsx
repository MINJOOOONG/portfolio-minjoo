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
  certificateNo?: string;
  verifyUrl?: string;
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

interface EducationCertificationsProps {
  educationItems: EducationItem[];
  certificationItems: CertificationItem[];
}

export const EducationCertifications = memo(function EducationCertifications({
  educationItems,
  certificationItems,
}: EducationCertificationsProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const educationRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> div",
    stagger: 0.1,
    y: 24,
  });
  const certificationsRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> div",
    stagger: 0.08,
    y: 20,
  });

  if (educationItems.length === 0 && certificationItems.length === 0) return null;

  return (
    <div className="w-full">
      <div ref={headingRef} className="mb-7">
        <SlideHeading label="Education" title="Education & Certifications" />
      </div>

      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Education
          </h3>
          <div ref={educationRef} className="space-y-3">
            {educationItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--notion-hairline)] bg-background/70 px-5 py-4"
              >
                <p className="text-base font-semibold text-foreground">{item.school}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.major}</p>
                <p className="mt-3 text-xs font-medium text-muted-foreground">{item.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Certifications
          </h3>
          <div ref={certificationsRef} className="space-y-2.5">
            {certificationItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--notion-hairline)] bg-background/70 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold leading-snug text-foreground">{item.name}</p>
                  <p className="shrink-0 text-xs font-medium text-muted-foreground">{item.date}</p>
                </div>
                {(item.certificateNo || item.verifyUrl) && (
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                    {item.certificateNo && <span>No. {item.certificateNo}</span>}
                    {item.verifyUrl && (
                      <a href={item.verifyUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">Verify ↗</a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});
