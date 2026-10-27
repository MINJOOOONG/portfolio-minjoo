import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "./prisma";

// Internal rows use the existing table, requiring no production migration.
// CMS reads/writes exclude this namespace.
export const RATE_LIMIT_PREFIX = "_rate_limit:";
export interface RatePolicy { scope: string; limit: number; windowMs: number }
interface Bucket { count: number; resetAt: number }

export function clientKey(request: Request): string {
  const ip = (request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown")
    .split(",")[0].trim();
  return createHash("sha256").update(ip).digest("hex");
}

export async function consumeRateLimit(key: string, policy: RatePolicy): Promise<Bucket> {
  const now = Date.now();
  const initial = JSON.stringify({ count: 1, resetAt: now + policy.windowMs });
  const storageKey = `${RATE_LIMIT_PREFIX}${policy.scope}:${key}`;
  // Atomic upsert shares counters across concurrent requests and Vercel instances.
  // Rejected requests do not extend the original reset time.
  const rows = await prisma.$queryRaw<{ value: string }[]>`
    INSERT INTO site_settings (id, key, value, "createdAt", "updatedAt")
    VALUES (${randomUUID()}, ${storageKey}, ${initial}, NOW(), NOW())
    ON CONFLICT (key) DO UPDATE SET
      value = CASE
        WHEN (site_settings.value::jsonb->>'resetAt')::bigint <= ${now} THEN ${initial}
        ELSE jsonb_build_object(
          'count', LEAST((site_settings.value::jsonb->>'count')::int + 1, ${policy.limit + 1}),
          'resetAt', (site_settings.value::jsonb->>'resetAt')::bigint
        )::text
      END,
      "updatedAt" = NOW()
    RETURNING value
  `;
  if (Math.random() < 0.01) {
    await prisma.siteSetting.deleteMany({ where: {
      key: { startsWith: "\\_rate\\_limit:" },
      updatedAt: { lt: new Date(now - 2 * 86_400_000) },
    } });
  }
  return JSON.parse(rows[0].value) as Bucket;
}

export async function rateLimit(request: Request, policy: RatePolicy, consume = consumeRateLimit): Promise<NextResponse | null> {
  try {
    const bucket = await consume(clientKey(request), policy);
    if (bucket.count <= policy.limit) return null;
    return NextResponse.json(
      { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
      { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((bucket.resetAt - Date.now()) / 1000))) } },
    );
  } catch {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 503 });
  }
}
