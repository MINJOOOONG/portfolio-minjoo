import Link from "next/link";
import { SectionHeading } from "./about";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  createdAt: Date;
}

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-6">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="border-t border-border pt-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Blog</h2>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              더보기 →
            </Link>
          </div>

          <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-center justify-between px-5 py-3 hover:bg-[rgba(167,139,250,0.04)] transition-colors"
            >
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors truncate mr-4">
                {post.title}
              </span>
              <time className="text-[11px] font-mono text-muted-foreground/60 shrink-0">
                {new Date(post.createdAt).toLocaleDateString("ko-KR")}
              </time>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
