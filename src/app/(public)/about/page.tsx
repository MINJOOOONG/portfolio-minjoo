import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">About Me</h1>

      {settings.about_content && (
        <section className="mb-12">
          <MarkdownRenderer content={settings.about_content} />
        </section>
      )}

      {settings.about_interests && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">기술 관심사</h2>
          <MarkdownRenderer content={settings.about_interests} />
        </section>
      )}

      {settings.about_workstyle && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">업무 스타일</h2>
          <MarkdownRenderer content={settings.about_workstyle} />
        </section>
      )}

      {settings.about_timeline && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">타임라인</h2>
          <MarkdownRenderer content={settings.about_timeline} />
        </section>
      )}
    </div>
  );
}
