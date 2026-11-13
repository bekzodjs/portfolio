// Shared types + server-side JSON store for projects and settings.
// Data lives in /data/content.json (runtime-writable). On first run it is
// seeded from /data/content.default.json.
import { promises as fs } from "node:fs";
import path from "node:path";
import { site, about, ielts, skillGroups, services } from "@/data/site";

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string[];
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
  preview: "site" | "bot" | "dashboard";
  duration?: string;
  role?: string;
  status?: string;
  images: string[];
};

export type Settings = {
  email: string;
  socials: ProjectLink[];
};

export type Fact = { term: string; detail: string };
export type Skill = { name: string; glyph: string; note: string };
export type SkillGroup = { title: string; skills: Skill[] };
export type ServiceIcon = "web" | "bot" | "design";
export type Service = { icon: ServiceIcon; title: string; detail: string };

export type Profile = {
  firstName: string;
  lastName: string;
  role: string;
  intro: string;
  location: string;
  photo: string;
  cv: string;
  aboutParagraphs: string[];
  aboutFacts: Fact[];
  ielts: { score: string; level: string; taken: string; note: string; certificate: string };
  skillGroups: SkillGroup[];
  services: Service[];
};

export type Content = { projects: Project[]; settings: Settings; profile?: Partial<Profile> };

function defaultProfile(): Profile {
  return {
    firstName: site.firstName,
    lastName: site.lastName,
    role: site.role,
    intro: site.intro,
    location: site.location,
    photo: site.photo,
    cv: site.cv,
    aboutParagraphs: [...about.paragraphs],
    aboutFacts: about.facts.map((f) => ({ ...f })),
    ielts: { ...ielts },
    skillGroups: skillGroups.map((g) => ({ title: g.title, skills: g.skills.map((x) => ({ ...x })) })),
    services: services.map((x) => ({ icon: x.icon, title: x.title, detail: x.detail })),
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");
const DEFAULT_FILE = path.join(DATA_DIR, "content.default.json");

export const EMPTY_PROJECT: Project = {
  slug: "",
  title: "",
  tagline: "",
  summary: "",
  description: [],
  highlights: [],
  tech: [],
  links: [],
  preview: "dashboard",
  duration: "",
  role: "",
  status: "",
  images: [],
};

async function readRaw(file: string): Promise<Content | null> {
  try {
    const text = await fs.readFile(file, "utf-8");
    return JSON.parse(text) as Content;
  } catch {
    return null;
  }
}

export async function readContent(): Promise<Content> {
  const current = await readRaw(FILE);
  if (current) return normalize(current);
  const seed = (await readRaw(DEFAULT_FILE)) ?? { projects: [], settings: { email: "", socials: [] } };
  await writeContent(seed);
  return normalize(seed);
}

function normalize(c: Content): Content {
  return {
    projects: (c.projects ?? []).map((p) => ({ ...EMPTY_PROJECT, ...p })),
    settings: {
      email: c.settings?.email ?? "",
      socials: c.settings?.socials ?? [],
    },
    profile: c.profile ?? {},
  };
}

export async function writeContent(content: Content): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(content, null, 2), "utf-8");
}

export async function getProjects(): Promise<Project[]> {
  return (await readContent()).projects;
}

export async function getSettings(): Promise<Settings> {
  return (await readContent()).settings;
}

export async function getProfile(): Promise<Profile> {
  const stored = (await readContent()).profile ?? {};
  const base = defaultProfile();
  return {
    ...base,
    ...stored,
    ielts: { ...base.ielts, ...(stored.ielts ?? {}) },
    aboutParagraphs: stored.aboutParagraphs ?? base.aboutParagraphs,
    aboutFacts: stored.aboutFacts ?? base.aboutFacts,
    skillGroups: stored.skillGroups ?? base.skillGroups,
    services: stored.services ?? base.services,
  };
}
