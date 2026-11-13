// Normalises data coming from the admin forms before it is stored.
import { EMPTY_PROJECT, type Fact, type Profile, type Project, type ProjectLink, type Service, type ServiceIcon, type SkillGroup, type Settings } from "./content";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "loyiha";
}

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function strArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map(str).map((s) => s.trim()).filter(Boolean);
}

function links(v: unknown): ProjectLink[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((l) => ({ label: str((l as ProjectLink)?.label).trim(), href: str((l as ProjectLink)?.href).trim() }))
    .filter((l) => l.label && l.href);
}

const PREVIEWS = ["site", "bot", "dashboard"] as const;

export function sanitizeProject(input: Project): Project {
  const preview = (PREVIEWS as readonly string[]).includes(input.preview) ? input.preview : "dashboard";
  return {
    ...EMPTY_PROJECT,
    slug: slugify(str(input.slug) || str(input.title)),
    title: str(input.title).trim(),
    tagline: str(input.tagline).trim(),
    summary: str(input.summary).trim(),
    description: strArray(input.description),
    highlights: strArray(input.highlights),
    tech: strArray(input.tech),
    links: links(input.links),
    preview: preview as Project["preview"],
    duration: str(input.duration).trim(),
    role: str(input.role).trim(),
    status: str(input.status).trim(),
    images: strArray(input.images).filter((s) => s.startsWith("/")),
  };
}

export function sanitizeSettings(input: unknown): Settings {
  const obj = (input ?? {}) as Partial<Settings>;
  return { email: str(obj.email).trim(), socials: links(obj.socials) };
}

function facts(v: unknown): Fact[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((f) => ({ term: str((f as Fact)?.term).trim(), detail: str((f as Fact)?.detail).trim() }))
    .filter((f) => f.term || f.detail);
}

const SERVICE_ICONS: ServiceIcon[] = ["web", "bot", "design"];

function skillGroups(v: unknown): SkillGroup[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((g) => ({
      title: str((g as SkillGroup)?.title).trim(),
      skills: Array.isArray((g as SkillGroup)?.skills)
        ? (g as SkillGroup).skills
            .map((k) => ({ name: str(k?.name).trim(), glyph: str(k?.glyph).trim(), note: str(k?.note).trim() }))
            .filter((k) => k.name)
        : [],
    }))
    .filter((g) => g.title || g.skills.length);
}

function services(v: unknown): Service[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      const raw = str((x as Service)?.icon);
      const icon: ServiceIcon = (SERVICE_ICONS as string[]).includes(raw) ? (raw as ServiceIcon) : "web";
      return { icon, title: str((x as Service)?.title).trim(), detail: str((x as Service)?.detail).trim() };
    })
    .filter((x) => x.title);
}

function onlyLocal(u: string): string {
  return u.startsWith("/") ? u : "";
}

export function sanitizeProfile(input: unknown): Profile {
  const o = (input ?? {}) as Partial<Profile>;
  const i = (o.ielts ?? {}) as Profile["ielts"];
  return {
    firstName: str(o.firstName).trim(),
    lastName: str(o.lastName).trim(),
    role: str(o.role).trim(),
    intro: str(o.intro).trim(),
    location: str(o.location).trim(),
    photo: onlyLocal(str(o.photo).trim()),
    cv: onlyLocal(str(o.cv).trim()),
    aboutParagraphs: strArray(o.aboutParagraphs),
    aboutFacts: facts(o.aboutFacts),
    ielts: {
      score: str(i.score).trim(),
      level: str(i.level).trim(),
      taken: str(i.taken).trim(),
      note: str(i.note).trim(),
      certificate: onlyLocal(str(i.certificate).trim()),
    },
    skillGroups: skillGroups(o.skillGroups),
    services: services(o.services),
  };
}
