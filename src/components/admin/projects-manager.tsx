"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "./admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  order: number;
  published: boolean;
}

const emptyProject = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  featured: false,
  order: 0,
  published: true,
};

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (p: Project) => {
    setEditing(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      description: p.description,
      techStack: p.techStack.join(", "),
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      imageUrl: p.imageUrl || "",
      featured: p.featured,
      order: p.order,
      published: p.published,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = editing
      ? `/api/admin/projects/${editing}`
      : "/api/admin/projects";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setShowForm(false);
      setEditing(null);
      setForm(emptyProject);
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">프로젝트 관리</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setForm(emptyProject);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "취소" : "새 프로젝트"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editing ? "프로젝트 수정" : "새 프로젝트"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>제목</Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                    placeholder="my-project"
                  />
                </div>
              </div>
              <div>
                <Label>요약</Label>
                <Input
                  value={form.summary}
                  onChange={(e) =>
                    setForm({ ...form, summary: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>상세 설명 (Markdown)</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={10}
                  required
                />
              </div>
              <div>
                <Label>기술 스택 (콤마 구분)</Label>
                <Input
                  value={form.techStack}
                  onChange={(e) =>
                    setForm({ ...form, techStack: e.target.value })
                  }
                  placeholder="Next.js, TypeScript, Prisma"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>GitHub URL</Label>
                  <Input
                    value={form.githubUrl}
                    onChange={(e) =>
                      setForm({ ...form, githubUrl: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Live URL</Label>
                  <Input
                    value={form.liveUrl}
                    onChange={(e) =>
                      setForm({ ...form, liveUrl: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>이미지 URL</Label>
                  <Input
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>순서</Label>
                  <Input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                  />
                  <Label htmlFor="featured">대표 프로젝트</Label>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="published"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                  />
                  <Label htmlFor="published">공개</Label>
                </div>
              </div>
              <Button type="submit">{editing ? "수정" : "생성"}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">프로젝트가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{p.title}</h3>
                    {p.featured && <Badge variant="secondary">대표</Badge>}
                    {!p.published && (
                      <Badge variant="outline">비공개</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.summary}</p>
                  <div className="flex gap-1 mt-1">
                    {p.techStack.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(p)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
