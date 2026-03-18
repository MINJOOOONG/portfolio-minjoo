import { cookies } from "next/headers";
import { prisma } from "./prisma";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable is not set");
  }
  return password;
}

export function verifyPassword(input: string): boolean {
  const adminPassword = getAdminPassword();
  // Constant-time comparison to prevent timing attacks
  if (input.length !== adminPassword.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(input),
    Buffer.from(adminPassword)
  );
}

export async function createSession(): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.adminSession.create({
    data: { token, expiresAt },
  });

  return token;
}

export async function validateSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) return false;

    const session = await prisma.adminSession.findUnique({
      where: { token: sessionToken },
    });

    if (!session) return false;
    if (session.expiresAt < new Date()) {
      await prisma.adminSession.delete({ where: { id: session.id } });
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await prisma.adminSession.deleteMany({ where: { token: sessionToken } });
  }
}

export { SESSION_COOKIE_NAME };
