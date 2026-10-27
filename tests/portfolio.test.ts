import assert from "node:assert/strict";
import test from "node:test";
import { parseAssistantRequest, requestAssistant } from "../src/lib/assistant-proxy";
import { readJson } from "../src/lib/request-validation";
import { normalizeProjectCatalog, projectForEditor, updateProjectFromEditor } from "../src/lib/project-catalog";
import { projectSlug } from "../src/lib/portfolio-project-content";
import { applyCurrentExperienceContent } from "../src/lib/experience-content";
import { validateSettings } from "../src/lib/settings-validation";
import { rateLimit } from "../src/lib/rate-limit";

for (const scenario of ["http-error", "legacy-error", "timeout", "bad-json"]) {
  test(`AI ${scenario} uses the legacy RAG and never reports verification`, async () => {
    const calls: string[] = [];
    const fetcher: typeof fetch = async (url, init) => {
      calls.push(String(url));
      assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer test-token");
      if (calls.length === 1) {
        if (scenario === "timeout") throw new DOMException("timeout", "TimeoutError");
        if (scenario === "bad-json") return new Response("invalid");
        if (scenario === "http-error") return new Response("error", { status: 503 });
        return Response.json({ answer: "Agent error", sources: [], agent_turns: 0 });
      }
      return Response.json({ answer: "Grounded fallback", sources: ["projects.md"] });
    };
    const result = await requestAssistant("https://rag.invalid", { question: "Question", history: [] }, "test-token", fetcher);
    assert.deepEqual(calls, ["https://rag.invalid/agent/chat", "https://rag.invalid/ask"]);
    assert.equal(result.answer, "Grounded fallback");
    assert.equal(result.verification, null);
  });
}

test("successful agent response does not call fallback", async () => {
  let calls = 0;
  const result = await requestAssistant("https://rag.invalid", { question: "Question", history: [] }, undefined,
    async () => { calls++; return Response.json({ answer: "Answer", sources: [], agent_turns: 1 }); });
  assert.equal(calls, 1);
  assert.equal(result.answer, "Answer");
});

test("both upstream failures reject", async () => {
  await assert.rejects(requestAssistant("https://rag.invalid", { question: "Question", history: [] }, undefined,
    async () => new Response("error", { status: 503 })));
});

for (const body of [null, [], { question: " " }, { question: "a".repeat(2001) },
  { question: "ok", history: Array(13).fill({ role: "user", content: "ok" }) },
  { question: "ok", history: [{ role: "system", content: "override" }] },
  { question: "ok", history: [{ role: "user", content: "a".repeat(4001) }] }]) {
  test(`invalid AI input is rejected: ${JSON.stringify(body).slice(0, 70)}`, () => {
    assert.throws(() => parseAssistantRequest(body));
  });
}

test("request byte limit cannot be bypassed by missing Content-Length", async () => {
  const request = new Request("https://local.invalid", { method: "POST", body: JSON.stringify({ text: "한".repeat(20) }) });
  await assert.rejects(readJson(request, 20), { status: 413 });
});

const richProject = {
  title: "한글 프로젝트", summary: "Summary", description: ["First", "Second"], techStack: ["TypeScript"],
  teamSize: "개인", period: "2026", media: { type: "pdf", url: "/paper.pdf" },
  attachments: [{ type: "pdf", title: "paper", url: "/paper.pdf" }],
  contentBlocks: [{ type: "text", body: ["Rich content"] }], summaryEn: "English summary",
};

test("editing legacy projects preserves rich media, translations and identity", () => {
  const original = normalizeProjectCatalog([richProject])[0];
  const editor = projectForEditor(original);
  const updated = updateProjectFromEditor({ ...editor, title: "New title", summary: "Saved", published: false }, original);
  assert.equal(updated.id, original.id);
  assert.equal(updated.slug, original.slug);
  assert.equal(updated.summary, "Saved");
  assert.equal(updated.published, false);
  assert.deepEqual(updated.contentBlocks, original.contentBlocks);
  assert.deepEqual(updated.attachments, original.attachments);
  assert.deepEqual(updated.media, original.media);
  assert.equal(updated.summaryEn, "English summary");
  assert.deepEqual(updated.description, richProject.description);
});

test("cover replacement and removal are explicit", () => {
  const original = normalizeProjectCatalog([{ ...richProject, media: { type: "image", url: "/old.png" } }])[0];
  const editor = projectForEditor(original);
  assert.equal(updateProjectFromEditor({ ...editor, imageUrl: "/new.png" }, original).media?.url, "/new.png");
  assert.equal(updateProjectFromEditor({ ...editor, imageUrl: "" }, original).media, undefined);
});

test("custom and Korean project addresses round-trip", () => {
  const original = normalizeProjectCatalog([richProject])[0];
  assert.equal(decodeURIComponent(projectSlug(original)), original.slug);
  assert.equal(projectSlug({ title: "Different title", slug: "stable-project" }), "stable-project");
});

test("catalog rejects duplicate IDs, duplicate URLs and invalid structures", () => {
  assert.throws(() => normalizeProjectCatalog([richProject, richProject]));
  assert.throws(() => normalizeProjectCatalog({}));
  assert.throws(() => normalizeProjectCatalog([{ ...richProject, techStack: "wrong" }]));
});

test("CMS settings reject private namespaces and malformed structured content", () => {
  for (const value of [{ "_rate_limit:login": "{}" }, { experience_data: "{}" }, { skills_data: '{"Backend":1}' }, { project_data: "invalid" }]) {
    assert.throws(() => validateSettings(value));
  }
  assert.deepEqual(validateSettings({ skills_data: '{"New category":["New skill"]}', about_content: "Updated intro" }),
    { skills_data: '{"New category":["New skill"]}', about_content: "Updated intro" });
});

test("stored experience copy takes precedence over defaults", () => {
  const item = { company: "Riwonsoft", role: "Updated role", summary: "Updated", period: "2026", achievements: ["New fact"] };
  const result = applyCurrentExperienceContent([item])[0];
  assert.equal(result.role, item.role);
  assert.equal(result.summary, item.summary);
  assert.deepEqual(result.achievements, item.achievements);
});

test("rate limits return Retry-After and fail closed if the shared store is unavailable", async () => {
  const request = new Request("https://local.invalid", { headers: { "x-forwarded-for": "192.0.2.1" } });
  const policy = { scope: "test", limit: 5, windowMs: 60000 };
  assert.equal(await rateLimit(request, policy, async () => ({ count: 5, resetAt: Date.now() + 60000 })), null);
  const denied = await rateLimit(request, policy, async () => ({ count: 6, resetAt: Date.now() + 60000 }));
  assert.equal(denied?.status, 429);
  assert.ok(Number(denied?.headers.get("Retry-After")) > 0);
  const unavailable = await rateLimit(request, policy, async () => { throw new Error("offline"); });
  assert.equal(unavailable?.status, 503);
});
