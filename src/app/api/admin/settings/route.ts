import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readContent, writeContent } from "@/lib/content";
import { sanitizeSettings } from "@/lib/validate";

export const runtime = "nodejs";

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const content = await readContent();
  content.settings = sanitizeSettings(body);
  await writeContent(content);
  return NextResponse.json({ ok: true, settings: content.settings });
}
