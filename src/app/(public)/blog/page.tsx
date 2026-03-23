import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-[880px] mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center gap-2.5 mb-8">
        <span className="text-sm text-primary opacity-50">&gt;</span>
        <h1 className="text-xl sm:text-2xl font-bold">Blog</h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">아직 글이 없습니다.</p>
      ) : (
        <div className="resume-card rounded-lg overflow-hidden divide-y divide-border">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-[rgba(167,139,250,0.04)] transition-colors"
            >
              <div className="min-w-0">
                <h2 className="text-sm font-semibold mb-1 truncate">{post.title}</h2>
                <p className="text-xs text-muted-foreground truncate">{post.summary}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <time className="text-[11px] font-mono text-muted-foreground/60 shrink-0 pt-0.5">
                {new Date(post.createdAt).toLocaleDateString("ko-KR")}
              </time>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
