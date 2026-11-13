import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { EMPTY_PROJECT, readContent, writeContent, type Project } from "@/lib/content";
import { sanitizeProject } from "@/lib/validate";

export const runtime = "nodejs";

type Params = { params: Promise<{ slug: string }> };

export async function PUT(req: Request, { params }: Params) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const content = await readContent();
  const idx = content.projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Topilmadi" }, { status: 404 });

  const updated = sanitizeProject({ ...EMPTY_PROJECT, ...body, slug } as Project);
  updated.slug = slug; // slug is the stable id; keep it
  content.projects[idx] = updated;
  await writeContent(content);
  return NextResponse.json({ ok: true, project: updated });
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const content = await readContent();
  const before = content.projects.length;
  content.projects = content.projects.filter((p) => p.slug !== slug);
  if (content.projects.length === before) {
    return NextResponse.json({ error: "Topilmadi" }, { status: 404 });
  }
  await writeContent(content);
  return NextResponse.json({ ok: true });
}
