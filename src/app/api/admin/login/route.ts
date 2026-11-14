import { NextResponse } from "next/server";
import { checkCredentials, createToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { clientIp, loginBlockedFor, recordLoginFailure, recordLoginSuccess } from "@/lib/rateLimit";

export const runtime = "nodejs";

function tooMany(seconds: number) {
  const minutes = Math.ceil(seconds / 60);
  return NextResponse.json(
    { error: `Juda ko'p urinish. ${minutes} daqiqadan keyin qayta urinib ko'ring.` },
    { status: 429, headers: { "Retry-After": String(seconds) } },
  );
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const wait = loginBlockedFor(ip);
  if (wait > 0) return tooMany(wait);

  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = typeof body?.username === "string" ? body.username : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!checkCredentials(username, password)) {
    recordLoginFailure(ip);
    // A short pause slows scripted guessing without bothering a person.
    await new Promise((resolve) => setTimeout(resolve, 600));
    const blocked = loginBlockedFor(ip);
    if (blocked > 0) return tooMany(blocked);
    return NextResponse.json({ error: "Login yoki parol noto'g'ri" }, { status: 401 });
  }
  recordLoginSuccess(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createToken(), sessionCookieOptions);
  return res;
}
