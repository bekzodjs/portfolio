import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { slugify } from "@/lib/validate";

export const runtime = "nodejs";

const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "application/pdf": "pdf",
};
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid form" }, { status: 400 });

  const folder = slugify(String(form.get("folder") || form.get("slug") || "loyiha"));
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) return NextResponse.json({ error: "Fayl yo'q" }, { status: 400 });

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });

  const urls: string[] = [];
  for (const file of files) {
    const ext = ALLOWED[file.type];
    if (!ext) return NextResponse.json({ error: `Rasm formati qo'llab-quvvatlanmaydi: ${file.type}` }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Rasm 8MB dan katta" }, { status: 400 });
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(dir, name), buffer);
    urls.push(`/uploads/${folder}/${name}`);
  }
  return NextResponse.json({ ok: true, urls });
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url : "";
  // Only delete files we uploaded, never the seeded /projects screenshots.
  if (!url.startsWith("/uploads/")) {
    return NextResponse.json({ ok: true, skipped: true });
  }
  const abs = path.join(process.cwd(), "public", url.replace(/^\//, ""));
  const root = path.join(process.cwd(), "public", "uploads");
  if (!abs.startsWith(root)) return NextResponse.json({ error: "Bad path" }, { status: 400 });
  await fs.unlink(abs).catch(() => {});
  return NextResponse.json({ ok: true });
}
