// Dependency-free session auth using Node's crypto.
// Set ADMIN_PASSWORD and ADMIN_SECRET in your environment (.env.local).
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret(): string {
  return process.env.ADMIN_SECRET || "change-me-please-set-ADMIN_SECRET";
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function adminUsername(): string {
  return process.env.ADMIN_USERNAME || "admin";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function checkCredentials(username: string, password: string): boolean {
  // Username is case-insensitive; password is exact.
  return (
    safeEqual(username.trim().toLowerCase(), adminUsername().trim().toLowerCase()) &&
    safeEqual(password, adminPassword())
  );
}

export function createToken(): string {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};
