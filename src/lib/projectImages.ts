import fs from "node:fs";
import path from "node:path";

/**
 * Screenshots for a project are picked up automatically from
 * public/projects/<slug>/ (png, jpg, webp, avif), sorted by file name:
 * 1.png is the cover, the rest follow in the gallery.
 */
export function getProjectImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/projects/${slug}/${file}`);
  } catch {
    return [];
  }
}
