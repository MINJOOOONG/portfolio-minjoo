import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ContactForm } from "@/components/shared/contact-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const settings = await getSettings();

  const links = [
    { label: "GitHub", url: settings.github_url },
    { label: "Email", url: settings.email ? `mailto:${settings.email}` : undefined },
    { label: "Blog", url: settings.blog_url },
    { label: "LinkedIn", url: settings.linkedin_url },
  ].filter((l) => l.url);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact</h1>

      {settings.contact_intro && (
        <p className="text-lg text-muted-foreground mb-8 whitespace-pre-line">
          {settings.contact_intro}
        </p>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border rounded-md text-sm hover:border-primary/50 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="border-t border-border/40 pt-10">
        <h2 className="text-xl font-semibold mb-6">메시지 보내기</h2>
        <ContactForm />
      </div>
    </div>
  );
}
