import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  return (
    <div className="max-w-[880px] mx-auto px-5 sm:px-8 py-12">
      <Link
        href="/blog"
        className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block font-mono"
      >
        ← blog
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-xl sm:text-2xl font-bold mb-3">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <time>
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          )}
        </header>

        <div className="section-divider" />

        <div className="mt-8">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
}
