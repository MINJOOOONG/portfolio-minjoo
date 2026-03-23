"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "./admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const settingFields = [
  // 사이트 기본
  { key: "site_name", label: "사이트 이름", type: "input", group: "사이트" },
  { key: "site_description", label: "사이트 설명", type: "input", group: "사이트" },

  // About
  { key: "about_content", label: "자기소개 (Markdown)", type: "textarea", group: "소개" },

  // 구조화 데이터 (JSON)
  { key: "experience_data", label: "경력 데이터 (JSON 배열: [{company, role, period, summary, achievements, status?, techStack?}])", type: "textarea", group: "경력" },
  { key: "project_data", label: "프로젝트 데이터 (JSON 배열: [{title, teamSize, period, summary, description, techStack, media?, githubUrl?, liveUrl?}])", type: "textarea", group: "프로젝트" },
  { key: "skills_data", label: "기술 스택 (JSON 객체: {\"Backend\": [\"Java\", \"Spring\"], \"Testing\": [...]})", type: "textarea", group: "기술 스택" },
  { key: "education_data", label: "학력 데이터 (JSON 배열: [{school, major, period}])", type: "textarea", group: "학력" },
  { key: "certifications_data", label: "자격증 데이터 (JSON 배열: [{name, date}])", type: "textarea", group: "자격증" },
];

export function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setMessage("저장되었습니다.");
    } else {
      setMessage("저장에 실패했습니다.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <AdminShell>
        <p className="text-muted-foreground">로딩 중...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">사이트 설정</h1>
        <div className="flex items-center gap-4">
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {settingFields.map((field) => (
          <Card key={field.key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                {field.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {field.type === "textarea" ? (
                <Textarea
                  value={settings[field.key] || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, [field.key]: e.target.value })
                  }
                  rows={field.key.includes("content") || field.key.includes("timeline") ? 10 : 4}
                  className="font-mono text-sm"
                />
              ) : (
                <Input
                  value={settings[field.key] || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, [field.key]: e.target.value })
                  }
                />
              )}
              <p className="text-xs text-muted-foreground mt-1">
                키: {field.key}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
