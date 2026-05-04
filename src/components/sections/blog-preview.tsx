import Link from "next/link";

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
    <section id="blog" className="py-10">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div>
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-sm font-bold tracking-tight text-foreground">Blog</h2>
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              더보기 →
            </Link>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden divide-y divide-border/30">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-[rgba(49,130,246,0.04)] transition-colors duration-200"
            >
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors truncate mr-4">
                {post.title}
              </span>
              <time className="text-xs font-mono text-muted-foreground/60 shrink-0">
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
