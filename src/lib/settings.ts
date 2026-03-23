import { prisma } from "./prisma";

export async function getSettings(): Promise<Record<string, string>> {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => {
    map[s.key] = s.value;
  });
  return map;
}

export async function getSetting(key: string): Promise<string | null> {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  return setting?.value ?? null;
}

export function parseJsonSetting<T>(settings: Record<string, string>, key: string, fallback: T): T {
  try {
    const raw = settings[key];
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
