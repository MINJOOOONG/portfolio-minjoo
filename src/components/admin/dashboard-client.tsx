"use client";

import { AdminShell } from "./admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";

interface DashboardProps {
  stats: {
    projects: number;
    posts: number;
    messages: number;
    unread: number;
  };
}

export function AdminDashboardClient({ stats }: DashboardProps) {
  return (
    <AdminShell>
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="프로젝트" value={stats.projects} />
        <StatCard title="블로그 글" value={stats.posts} />
        <StatCard title="전체 메시지" value={stats.messages} />
        <StatCard
          title="읽지 않은 메시지"
          value={stats.unread}
          highlight={stats.unread > 0}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          title="새 프로젝트"
          description="프로젝트를 추가합니다"
          href="/admin/projects"
        />
        <QuickAction
          title="새 글 작성"
          description="블로그 글을 작성합니다"
          href="/admin/posts"
        />
        <QuickAction
          title="사이트 설정"
          description="사이트 정보를 수정합니다"
          href="/admin/settings"
        />
      </div>
    </AdminShell>
  );
}

function StatCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-3xl font-bold ${highlight ? "text-destructive" : ""}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function QuickAction({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <ButtonLink href={href} size="sm">
          이동
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
