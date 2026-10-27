import assert from "node:assert/strict";
import test from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { getProjectCatalog, getPublishedProjects, mutateProjectCatalog, projectForEditor, updateProjectFromEditor } from "../src/lib/project-catalog";
import { consumeRateLimit } from "../src/lib/rate-limit";
import { getSettings } from "../src/lib/settings";

// Exercise the actual PostgreSQL statements in an isolated embedded database.
// The adapter below covers only the Prisma operations used by these services.
function adapter(db: Pick<PGlite, "query">) {
  const siteSetting = {
    async findUnique({ where }: { where: { key: string } }) {
      const result = await db.query<{ value: string }>("SELECT value FROM site_settings WHERE key=$1", [where.key]);
      return result.rows[0] ?? null;
    },
    async findMany({ where }: { where: { NOT: { key: { startsWith: string } } } }) {
      return (await db.query("SELECT key,value FROM site_settings WHERE key NOT LIKE $1", [where.NOT.key.startsWith + "%"])).rows;
    },
    async upsert({ where, create, update }: { where: { key: string }; create: { value: string }; update: { value: string } }) {
      await db.query('INSERT INTO site_settings (id,key,value,"createdAt","updatedAt") VALUES ($1,$1,$2,NOW(),NOW()) ON CONFLICT (key) DO UPDATE SET value=$3',
        [where.key, create.value, update.value]);
    },
    async deleteMany() { return { count: 0 }; },
  };
  const rawQuery = async (parts: TemplateStringsArray, ...values: unknown[]) => {
    const sql = parts.reduce((text, part, index) => text + (index ? `$${index}` : "") + part, "");
    return (await db.query(sql, values)).rows;
  };
  return { siteSetting, $queryRaw: rawQuery, $executeRaw: rawQuery, project: { findMany: async () => [] } };
}

test("database-backed limits and CMS share persistent state safely", async () => {
  const db = new PGlite();
  await db.exec(`CREATE TABLE site_settings (
    id TEXT PRIMARY KEY, key TEXT UNIQUE NOT NULL, value TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL
  )`);
  const global = globalThis as typeof globalThis & { prisma?: unknown };
  const previous = global.prisma;
  global.prisma = { ...adapter(db), $transaction: (fn: (client: ReturnType<typeof adapter>) => Promise<unknown>) =>
    db.transaction(tx => fn(adapter(tx))) };
  try {
    const policy = { scope: "test", limit: 3, windowMs: 60_000 };
    const buckets = await Promise.all(Array.from({ length: 12 }, () => consumeRateLimit("one-client", policy)));
    assert.equal(buckets.filter(bucket => bucket.count <= 3).length, 3);
    assert.equal(new Set(buckets.map(bucket => bucket.resetAt)).size, 1);
    assert.equal((await consumeRateLimit("other-client", policy)).count, 1);
    await db.query("UPDATE site_settings SET value=$1 WHERE key=$2", [JSON.stringify({ count: 4, resetAt: 0 }), "_rate_limit:test:one-client"]);
    assert.equal((await consumeRateLimit("one-client", policy)).count, 1);
    assert.deepEqual(await getSettings(), {});

    await db.query('INSERT INTO site_settings (id,key,value,"createdAt","updatedAt") VALUES ($1,$1,$2,NOW(),NOW())', ["project_data", JSON.stringify([{
      title: "기존 프로젝트", teamSize: "개인", period: "2026", summary: "Original", description: ["Description"], techStack: ["TS"],
      contentBlocks: [{ type: "text", body: ["Keep this rich content"] }],
    }])]);
    assert.ok((await getSettings()).project_data, "CMS content remains visible while internal counters are hidden");
    const original = (await getProjectCatalog())[0];
    await mutateProjectCatalog(projects => projects.map(project => updateProjectFromEditor({ ...projectForEditor(project), summary: "Saved via CMS" }, project)));
    let published = await getPublishedProjects();
    assert.equal(published[0].summary, "Saved via CMS");
    assert.deepEqual(published[0].contentBlocks, original.contentBlocks);
    await mutateProjectCatalog(projects => projects.map(project => ({ ...project, published: false })));
    assert.equal((await getPublishedProjects()).length, 0);
    await mutateProjectCatalog(projects => [...projects, updateProjectFromEditor({ title: "New", slug: "new", summary: "New project", description: "Created", techStack: [] })]);
    published = await getPublishedProjects();
    assert.equal(published.length, 1);
    assert.equal(published[0].title, "New");
    await mutateProjectCatalog(projects => projects.filter(project => project.slug !== "new"));
    assert.equal((await getPublishedProjects()).length, 0);
    // A failed write rolls back the entire transaction.
    await assert.rejects(mutateProjectCatalog(projects => [...projects, ...projects]));
    assert.equal((await getProjectCatalog()).length, 1);
  } finally {
    global.prisma = previous;
    await db.close();
  }
});
