import { homePath, locales, projectPath, type Lang } from "@/i18n/config";
import { getProjects } from "@/lib/content";
import { absolute } from "@/lib/seo";

export const dynamic = "force-dynamic";

/**
 * Every public page in every language, with hreflang links between the versions.
 * /sitemap.xml (public/sitemap.xml) is a sitemap index that points here, so
 * projects added in the admin panel appear without touching any file.
 */
export async function GET() {
  const projects = await getProjects();
  const pages: { pathFor: (lang: Lang) => string; priority: string }[] = [
    { pathFor: homePath, priority: "1.0" },
    ...projects.map((p) => ({ pathFor: (lang: Lang) => projectPath(lang, p.slug), priority: "0.8" })),
  ];

  const urls = pages.flatMap(({ pathFor, priority }) =>
    locales.map((lang) => {
      const links = [
        ...locales.map((l) => [l, pathFor(l)] as const),
        ["x-default", pathFor("en")] as const,
      ]
        .map(([l, path]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(path)}"/>`)
        .join("\n");
      return `  <url>\n    <loc>${absolute(pathFor(lang))}</loc>\n${links}\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
