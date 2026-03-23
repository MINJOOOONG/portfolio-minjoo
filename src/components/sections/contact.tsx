import { SectionHeading } from "./about";

const links = [
  { label: "✉ Email", href: "mailto:zzz1577@naver.com" },
  { label: "GitHub", href: "https://github.com/MINJOOOONG" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/minjooooo" },
  { label: "Blog", href: "https://joodev-sandy.vercel.app/" },
];

export function Contact() {
  return (
    <section id="contact" className="py-8">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="section-divider" />
        <SectionHeading>Contact</SectionHeading>
        <div className="flex flex-wrap gap-4 text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
