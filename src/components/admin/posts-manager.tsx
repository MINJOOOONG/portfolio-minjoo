"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "./admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

const emptyPost = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  tags: "",
  published: false,
};

export function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch("/api/admin/posts");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (p: Post) => {
    setEditing(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      content: p.content,
      tags: p.tags.join(", "),
      published: p.published,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...form,
      tags: form.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = editing ? `/api/admin/posts/${editing}` : "/api/admin/posts";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setShowForm(false);
      setEditing(null);
      setForm(emptyPost);
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">블로그 관리</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setForm(emptyPost);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "취소" : "새 글 작성"}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editing ? "글 수정" : "새 글 작성"}</CardTitle>
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
                    placeholder="my-blog-post"
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
                <Label>본문 (Markdown)</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={15}
                  className="font-mono text-sm"
                  required
                />
              </div>
              <div>
                <Label>태그 (콤마 구분)</Label>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="TypeScript, Testing, TDD"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="post-published"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                />
                <Label htmlFor="post-published">공개</Label>
              </div>
              <Button type="submit">{editing ? "수정" : "발행"}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">블로그 글이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{p.title}</h3>
                    {!p.published && (
                      <Badge variant="outline">비공개</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.summary}</p>
                  <div className="flex gap-1 mt-1">
                    {p.tags.map((t) => (
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
