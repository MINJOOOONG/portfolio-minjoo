import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, featuredProjects, recentPosts] = await Promise.all([
    getSettings(),
    prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {settings.hero_title || "안녕하세요, 개발자입니다"}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
              {settings.hero_subtitle ||
                "품질에 집중하는 개발을 합니다."}
            </p>
            <div className="flex gap-3">
              <ButtonLink href="/projects" size="lg">
                프로젝트 보기
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                연락하기
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16 border-t border-border/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">대표 프로젝트</h2>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                전체 보기 &rarr;
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`}>
                  <Card className="h-full hover:border-primary/50 transition-colors group">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 border-t border-border/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">최근 글</h2>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                전체 보기 &rarr;
              </Link>
            </div>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="hover:border-primary/50 transition-colors group">
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {post.summary}
                          </p>
                        </div>
                        <time className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                        </time>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
