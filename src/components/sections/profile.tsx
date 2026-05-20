"use client";

import { memo } from "react";
import Image from "next/image";
import { Mail, Github, Globe, Linkedin } from "lucide-react";
import { SlideHeading } from "./about";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useStaggerReveal } from "@/hooks/use-stagger-reveal";
import {
  contactProfile,
  contactLinks,
  type ContactLink,
} from "@/data/profile-data";
import type { EducationItem, CertificationItem } from "./education";

const iconMap = {
  mail: Mail,
  github: Github,
  globe: Globe,
  linkedin: Linkedin,
} as const;

interface ContactSectionProps {
  educationItems?: EducationItem[];
  certificationItems?: CertificationItem[];
}

export const ContactSection = memo(function ContactSection({
  educationItems,
  certificationItems,
}: ContactSectionProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.8 });
  const profileRef = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.9 });
  const bottomRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> div",
    stagger: 0.12,
    y: 20,
  });

  return (
    <div className="w-full max-w-[980px]">
      {/* ── Heading ── */}
      <div ref={headingRef} className="mb-10 sm:mb-12">
        <SlideHeading label="Contact" title="Contact" />
      </div>

      {/* ── Profile row ── */}
      <div
        ref={profileRef}
        className="flex flex-col items-start md:flex-row md:items-start gap-10 md:gap-16"
      >
        {/* Left: Photo */}
        <div className="shrink-0 w-36 h-44 sm:w-40 sm:h-48 md:w-44 md:h-52">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={contactProfile.photo}
              alt={contactProfile.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 160px, 176px"
            />
          </div>
        </div>

        {/* Right: Name + Tagline + Badges */}
        <div className="flex min-w-0 flex-col items-start text-left flex-1 gap-6 md:pt-2">
          <h3 className="font-display text-3xl sm:text-4xl font-black tracking-[-0.04em] text-[var(--notion-navy)] leading-[0.95]">
            {contactProfile.name}
          </h3>

          <p className="text-[15px] leading-[1.8] text-[var(--notion-slate)] max-w-sm">
            {contactProfile.tagline}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-2">
            {contactLinks.map((link) => (
              <LinkBadge key={link.label} link={link} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Education & Certifications ── */}
      {((educationItems && educationItems.length > 0) ||
        (certificationItems && certificationItems.length > 0)) && (
        <>
          <div className="border-t border-[var(--notion-hairline)] mt-12 mb-12" />

          <div ref={bottomRef} className="grid gap-12 sm:grid-cols-2">
            {/* Education */}
            {educationItems && educationItems.length > 0 && (
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--notion-stone)] mb-6">
                  Education
                </h4>
                <div className="space-y-5">
                  {educationItems.map((item, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-[var(--notion-ink)] leading-snug">
                        {item.school}
                      </p>
                      <p className="text-xs text-[var(--notion-slate)] mt-1.5">
                        {item.major}
                        <span className="mx-1.5 text-[var(--notion-muted)]">&middot;</span>
                        <span className="text-[var(--notion-stone)]">{item.period}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certificationItems && certificationItems.length > 0 && (
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--notion-stone)] mb-6">
                  Certifications
                </h4>
                <div className="space-y-4">
                  {certificationItems.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-4">
                      <p className="text-sm font-semibold text-[var(--notion-ink)] leading-snug">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[var(--notion-stone)] shrink-0 pt-0.5">
                        {item.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
});

/* ── Link Badge ── */
function LinkBadge({ link }: { link: ContactLink }) {
  const Icon = iconMap[link.icon];

  return (
    <a
      href={link.href}
      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-4 py-2 text-xs font-medium text-[var(--notion-slate)] transition-all duration-200 hover:text-[var(--notion-ink)] hover:-translate-y-0.5"
    >
      <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
      {link.label}
    </a>
  );
}
