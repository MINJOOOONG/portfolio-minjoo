"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "./admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const res = await fetch("/api/admin/messages");
    if (res.ok) setMessages(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    fetchMessages();
  };

  return (
    <AdminShell>
      <h1 className="text-3xl font-bold mb-6">연락 메시지</h1>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground">메시지가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <Card key={m.id} className={!m.read ? "border-primary/50" : ""}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{m.subject}</h3>
                      {!m.read && <Badge>새 메시지</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {m.name} ({m.email}) &middot;{" "}
                      {new Date(m.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{m.message}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!m.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(m.id)}
                      >
                        읽음
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(m.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
