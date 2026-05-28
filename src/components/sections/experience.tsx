"use client";

import { useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SlideHeading } from "./about";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  status?: string;
  techStack?: string[];
}

interface ExperienceProps {
  items: ExperienceItem[];
}

const NOTION_TINTS = [
  "var(--notion-tint-lavender)",
  "var(--notion-tint-mint)",
  "var(--notion-tint-sky)",
  "var(--notion-tint-peach)",
  "var(--notion-tint-rose)",
  "var(--notion-tint-yellow)",
  "var(--notion-tint-cream)",
];

/* ── Timeline dot ── */
function TimelineDot({ active }: { active: boolean }) {
  return active ? (
    <span className="relative flex h-3 w-3">
      <span className="absolute inset-0 rounded-full bg-foreground/10 ring-[3px] ring-foreground/5" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-foreground/70" />
    </span>
  ) : (
    <span className="inline-flex h-2.5 w-2.5 rounded-full border border-foreground/15" />
  );
}

/* ── Detail content (shared between desktop & mobile) ── */
function CardDetails({ item, detailItems }: { item: ExperienceItem; detailItems: string[] }) {
  return (
    <>
      {detailItems.length > 0 && (
        <ul className="mb-3 space-y-1.5">
          {detailItems.map((text, j) => (
            <li
              key={j}
              className="exp-child flex gap-2.5 text-[12px] leading-relaxed text-muted-foreground/75 sm:text-[13px]"
            >
              <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}

      {item.techStack && item.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.techStack.map((t, i) => (
            <span
              key={t}
              className="px-2.5 py-0.5 text-[11px] font-medium rounded-md text-foreground/70"
              style={{ background: NOTION_TINTS[i % NOTION_TINTS.length] }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Card header (shared between desktop & mobile) ── */
function CardHeader({ item }: { item: ExperienceItem }) {
  return (
    <>
      <div className="exp-child flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
        <h3 className="font-display text-xl sm:text-2xl font-black tracking-[-0.02em] text-foreground">
          {item.company}
        </h3>
        {item.status && (
          <span className="text-[10px] px-2 py-0.5 rounded-full text-foreground/70 font-medium border border-foreground/15 tracking-wide">
            {item.status}
          </span>
        )}
      </div>
      <p className="exp-child text-[13px] text-foreground/80 font-medium">
        {item.role}
      </p>
      <p className="exp-child text-[11px] text-muted-foreground/60 tracking-wide mb-2.5">
        {item.period}
      </p>
    </>
  );
}

/* ── View Card ── */
function ViewCard({ item, defaultOpen }: { item: ExperienceItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const detailItems = [item.summary, ...(item.achievements ?? [])]
    .filter(Boolean)
    .slice(0, 4);

  const isActive = !!item.status;
  const hasDetails = detailItems.length > 0 || (item.techStack && item.techStack.length > 0);

  return (
    <>
      {/* ── Desktop: 기존 레이아웃 그대로 (항상 펼침) ── */}
      <div className="hidden md:flex relative gap-6 overflow-hidden rounded-2xl border border-transparent px-2 py-4">
        <div className="flex flex-col items-center pt-1">
          <TimelineDot active={isActive} />
          <div className="flex-1 w-px bg-[var(--notion-hairline)]" />
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <CardHeader item={item} />
          <CardDetails item={item} detailItems={detailItems} />
        </div>
      </div>

      {/* ── Mobile: 토글 아코디언 ── */}
      <div className="md:hidden relative flex gap-4 overflow-hidden rounded-2xl border border-transparent px-2 py-3">
        <div className="flex flex-col items-center pt-1">
          <TimelineDot active={isActive} />
          <div className="flex-1 w-px bg-[var(--notion-hairline)]" />
        </div>
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <button
            type="button"
            data-no-section-nav
            onClick={() => hasDetails && setOpen((v) => !v)}
            className="w-full text-left flex items-start justify-between gap-2"
          >
            <div className="flex-1 min-w-0">
              <div className="exp-child flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-display text-xl font-black tracking-[-0.02em] text-foreground">
                  {item.company}
                </h3>
                {item.status && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full text-foreground/70 font-medium border border-foreground/15 tracking-wide">
                    {item.status}
                  </span>
                )}
              </div>
              <p className="exp-child text-[13px] text-foreground/80 font-medium">
                {item.role}
              </p>
              <p className="exp-child text-[11px] text-muted-foreground/60 tracking-wide">
                {item.period}
              </p>
            </div>
            {hasDetails && (
              <ChevronDown
                className={`w-4 h-4 mt-1.5 shrink-0 text-foreground/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                strokeWidth={1.5}
              />
            )}
          </button>

          <AnimatePresence initial={false}>
            {open && hasDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2.5">
                  <CardDetails item={item} detailItems={detailItems} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

/* ── 수정 모드 카드 (unchanged) ── */
function EditCard({
  item,
  onChange,
  onDelete,
}: {
  item: ExperienceItem;
  onChange: (updated: ExperienceItem) => void;
  onDelete: () => void;
}) {
  const inputClass = "w-full bg-background border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-foreground/30";

  const updateField = <K extends keyof ExperienceItem>(key: K, value: ExperienceItem[K]) => {
    onChange({ ...item, [key]: value });
  };

  const updateAchievement = (index: number, value: string) => {
    const next = [...item.achievements];
    next[index] = value;
    onChange({ ...item, achievements: next });
  };

  const removeAchievement = (index: number) => {
    onChange({ ...item, achievements: item.achievements.filter((_, i) => i !== index) });
  };

  const addAchievement = () => {
    onChange({ ...item, achievements: [...item.achievements, ""] });
  };

  return (
    <div className="border border-border rounded-lg bg-background">
      <div className="px-5 py-3 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">회사명</label>
            <input className={inputClass} value={item.company} onChange={(e) => updateField("company", e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">기간</label>
            <input className={inputClass} value={item.period} onChange={(e) => updateField("period", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">직무</label>
            <input className={inputClass} value={item.role} onChange={(e) => updateField("role", e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">상태 (선택)</label>
            <input className={inputClass} value={item.status || ""} onChange={(e) => updateField("status", e.target.value || undefined)} placeholder="예: 재직 중" />
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 border-t border-border pt-3 space-y-3">
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">한 줄 요약</label>
          <input className={inputClass} value={item.summary} onChange={(e) => updateField("summary", e.target.value)} />
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5 block">핵심 성과</label>
          <div className="space-y-1.5">
            {item.achievements.map((a, j) => (
              <div key={j} className="flex gap-1.5">
                <span className="text-muted-foreground/40 shrink-0 mt-2 text-sm">▸</span>
                <input className={`${inputClass} flex-1`} value={a} onChange={(e) => updateAchievement(j, e.target.value)} />
                <button onClick={() => removeAchievement(j)} className="h-8 shrink-0 rounded-md px-2 text-base font-bold text-foreground/70 transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/35" type="button">×</button>
              </div>
            ))}
          </div>
          <button onClick={addAchievement} className="mt-2 inline-flex h-8 items-center rounded-lg border border-border bg-transparent px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">+ 성과 추가</button>
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">기술 태그 (콤마 구분)</label>
          <input
            className={inputClass}
            value={(item.techStack || []).join(", ")}
            onChange={(e) => updateField("techStack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            placeholder="예: TestRail, Jira, Slack"
          />
        </div>

        <div className="pt-1">
          <button onClick={onDelete} className="inline-flex h-8 items-center rounded-lg border border-destructive/30 bg-destructive/10 px-3 text-xs font-bold text-destructive transition-colors duration-150 hover:bg-destructive/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/35" type="button">이 경력 삭제</button>
        </div>
      </div>
    </div>
  );
}

/* ── 비밀번호 모달 ── */
function PasswordModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!password) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "인증 실패");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-background border border-border rounded-lg p-6 w-full max-w-xs shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-bold mb-4">관리자 인증</h3>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="비밀번호 입력"
          className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-foreground/30 mb-2"
          autoFocus
        />
        {error && <p className="text-xs text-destructive mb-2">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="inline-flex h-9 items-center rounded-lg border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">취소</button>
          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-colors duration-150 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 disabled:opacity-50"
            type="button"
          >
            {loading ? "확인 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export const Experience = memo(function Experience({ items }: ExperienceProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editItems, setEditItems] = useState<ExperienceItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [displayItems, setDisplayItems] = useState(items);
  const headingRef = useRef<HTMLDivElement>(null);

  const enterEditMode = () => {
    setEditItems(JSON.parse(JSON.stringify(displayItems)));
    setIsEditMode(true);
    setShowPasswordModal(false);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditItems([]);
  };

  const updateItem = (index: number, updated: ExperienceItem) => {
    const next = [...editItems];
    next[index] = updated;
    setEditItems(next);
  };

  const deleteItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setEditItems([
      ...editItems,
      { company: "", role: "", period: "", summary: "", achievements: [""], techStack: [] },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const cleaned = editItems.map((item) => ({
        ...item,
        achievements: item.achievements.filter((a) => a.trim()),
        techStack: (item.techStack || []).filter((t) => t.trim()),
        status: item.status || undefined,
      }));

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience_data: JSON.stringify(cleaned) }),
      });

      if (res.ok) {
        setDisplayItems(cleaned);
        setIsEditMode(false);
        setEditItems([]);
      } else {
        alert("저장에 실패했습니다. 세션이 만료되었을 수 있습니다.");
      }
    } catch {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (displayItems.length === 0 && !isEditMode) return null;

  return (
    <div
      className="w-full"
      data-allow-scroll
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <div
        data-scroller
        style={{
          height: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "80px 24px 120px",
          boxSizing: "border-box",
        }}
      >
        <div className="flex items-end justify-between mb-2">
          <div ref={isEditMode ? undefined : headingRef}>
            <SlideHeading label="Experience" title="Work Experience" />
          </div>
          {!isEditMode && (
            <button
              onClick={() => setShowPasswordModal(true)}
              className="mb-10 inline-flex h-9 items-center rounded-lg border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
              type="button"
              aria-label="수정하기"
            >
              ✎ 수정
            </button>
          )}
        </div>

        {isEditMode && (
          <div className="flex gap-2 justify-end mb-3">
            <button onClick={cancelEdit} className="inline-flex h-9 items-center rounded-lg border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">취소</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-colors duration-150 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 disabled:opacity-50"
              type="button"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        )}

        <div className={isEditMode ? "space-y-4" : "space-y-0.5"}>
          {isEditMode
            ? editItems.map((item, i) => (
                <EditCard key={i} item={item} onChange={(u) => updateItem(i, u)} onDelete={() => deleteItem(i)} />
              ))
            : displayItems.map((item, i) => (
                <ViewCard key={i} item={item} defaultOpen={i === 0} />
              ))}
        </div>

        {isEditMode && (
          <button onClick={addItem} className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg border border-dashed border-border bg-transparent text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">
            + 경력 추가
          </button>
        )}

        {showPasswordModal && (
          <PasswordModal onSuccess={enterEditMode} onClose={() => setShowPasswordModal(false)} />
        )}
      </div>
    </div>
  );
});
