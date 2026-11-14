import type { Metadata } from "next";
import { site } from "@/data/site";
import { homePath, locales, ogLocale, projectPath, type Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Project, Settings } from "@/lib/content";

export const absolute = (path: string) => new URL(path, site.url).toString();

/** canonical + hreflang links for a page that exists in every language. */
function alternates(lang: Lang, pathFor: (lang: Lang) => string): Metadata["alternates"] {
  const languages: Record<string, string> = { "x-default": pathFor("en") };
  for (const l of locales) languages[l] = pathFor(l);
  return { canonical: pathFor(lang), languages };
}

function social(lang: Lang, path: string, title: string, description: string, image: string, alt: string) {
  return {
    openGraph: {
      type: "website" as const,
      url: path,
      siteName: site.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      title,
      description,
      images: [{ url: image, alt }],
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [image] },
  };
}

export function homeMetadata(lang: Lang): Metadata {
  const t = ui[lang].meta;
  return {
    title: { absolute: t.title },
    description: t.description,
    keywords: t.keywords,
    alternates: alternates(lang, homePath),
    ...social(lang, homePath(lang), t.title, t.description, "/og.png", site.name),
  };
}

/** `project` must already be localized. */
export function projectMetadata(lang: Lang, project: Project): Metadata {
  const t = ui[lang];
  const title = t.meta.projectTitle(project.title, project.tagline);
  const pathFor = (l: Lang) => projectPath(l, project.slug);
  const image = project.images[0] ?? "/og.png";
  return {
    title,
    description: project.summary,
    keywords: [project.title, ...project.tech, site.name],
    alternates: alternates(lang, pathFor),
    ...social(
      lang,
      pathFor(lang),
      `${title} — ${site.name}`,
      project.summary,
      image,
      t.projects.coverAlt(project.title, project.tagline),
    ),
  };
}

/** schema.org Person: `sameAs` ties the GitHub, LinkedIn and Telegram profiles to this site. */
export function personJsonLd(lang: Lang, settings: Settings) {
  const socials = settings.socials.length > 0 ? settings.socials : site.socials;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    givenName: site.firstName,
    familyName: site.lastName,
    alternateName: ["Bekzod", "bekzodjs", "Bekzod JS", "Бекзод Тохтамуратов"],
    description: ui[lang].meta.description,
    url: site.url,
    image: absolute(site.photo),
    jobTitle: ui[lang].meta.jobTitle,
    email: `mailto:${settings.email || site.email}`,
    knowsLanguage: ["uz", "ru", "en"],
    hasOccupation: [
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "Web Developer",
      "Software Engineer",
      "JavaScript Developer",
      "TypeScript Developer",
      "Node.js Developer",
      "Telegram Bot Developer",
    ].map((name) => ({
      "@type": "Occupation",
      name,
    })),
    knowsAbout: [
      "Frontend development",
      "Backend development",
      "Full-stack development",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "REST API",
      "Databases",
      "Web development",
      "Telegram bots",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    sameAs: socials.map((s) => s.href),
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: lang,
    author: { "@id": `${site.url}/#person` },
  };
}

/** Marks the home page as this person's profile page. */
export function profilePageJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absolute(homePath(lang))}#profile`,
    url: absolute(homePath(lang)),
    name: ui[lang].meta.title,
    description: ui[lang].meta.description,
    inLanguage: lang,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": `${site.url}/#person` },
  };
}

/** `project` must already be localized. */
export function projectJsonLd(lang: Lang, project: Project) {
  const t = ui[lang];
  const url = absolute(projectPath(lang, project.slug));
  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: project.title,
      headline: t.meta.projectTitle(project.title, project.tagline),
      description: project.summary,
      url,
      inLanguage: lang,
      image: project.images.map(absolute),
      keywords: project.tech.join(", "),
      author: { "@id": `${site.url}/#person` },
      ...(project.links[0] ? { sameAs: project.links.map((l) => l.href) } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.projects.home, item: absolute(homePath(lang)) },
        { "@type": "ListItem", position: 2, name: t.nav.work, item: `${absolute(homePath(lang))}#work` },
        { "@type": "ListItem", position: 3, name: project.title, item: url },
      ],
    },
  ];
}

/** Serialized for a <script type="application/ld+json"> tag. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
