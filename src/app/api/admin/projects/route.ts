import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { EMPTY_PROJECT, readContent, writeContent, type Project } from "@/lib/content";
import { sanitizeProject, slugify } from "@/lib/validate";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const content = await readContent();
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const content = await readContent();
  const incoming = sanitizeProject({ ...EMPTY_PROJECT, ...body } as Project);
  if (!incoming.title.trim()) {
    return NextResponse.json({ error: "Loyiha nomi kerak" }, { status: 400 });
  }
  let slug = incoming.slug || slugify(incoming.title);
  const existing = new Set(content.projects.map((p) => p.slug));
  let n = 2;
  const base = slug;
  while (existing.has(slug)) slug = `${base}-${n++}`;
  incoming.slug = slug;

  content.projects.push(incoming);
  await writeContent(content);
  return NextResponse.json({ ok: true, project: incoming });
}
