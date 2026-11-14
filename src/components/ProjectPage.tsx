import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { homePath, locales, projectPath, type Lang } from "@/i18n/config";
import { localizeProfile, localizeProject } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { getProfile, getProjects, getSettings } from "@/lib/content";
import { jsonLd, projectJsonLd, projectMetadata } from "@/lib/seo";
import { Backdrop } from "./Backdrop";
import { Footer } from "./Footer";
import { Motion } from "./Motion";
import { Nav } from "./Nav";
import { ProjectDetails } from "./ProjectsGrid";

async function findProject(lang: Lang, slug: string) {
  const projects = (await getProjects()).map((p) => localizeProject(p, lang));
  return { projects, project: projects.find((p) => p.slug === slug) };
}

export async function projectPageMetadata(lang: Lang, slug: string): Promise<Metadata> {
  const { project } = await findProject(lang, slug);
  return project ? projectMetadata(lang, project) : {};
}

/** A project's own page: /projects/<slug>, /uz/projects/<slug>, /ru/projects/<slug>. */
export async function ProjectPage({ lang, slug }: { lang: Lang; slug: string }) {
  const [{ projects, project }, settings, stored] = await Promise.all([
    findProject(lang, slug),
    getSettings(),
    getProfile(),
  ]);
  if (!project) notFound();

  const t = ui[lang];
  const profile = localizeProfile(stored, lang);
  const home = homePath(lang);
  const langLinks = Object.fromEntries(
    locales.map((l) => [l, projectPath(l, project.slug)]),
  ) as Record<Lang, string>;
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <Motion>
      <Backdrop />
      <Nav lang={lang} email={settings.email} profile={profile} langLinks={langLinks} />
      <main id="main" className="relative pb-20 pt-28 md:pb-28 md:pt-36">
        <article className="mx-auto max-w-5xl px-5 md:px-8">
          <nav aria-label={t.projects.breadcrumb} className="text-[0.92rem] text-ash">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a href={home} className="transition-colors duration-300 hover:text-bone">
                  {t.projects.home}
                </a>
              </li>
              <ChevronRight size={15} aria-hidden="true" />
              <li>
                <a href={`${home}#work`} className="transition-colors duration-300 hover:text-bone">
                  {t.nav.work}
                </a>
              </li>
              <ChevronRight size={15} aria-hidden="true" />
              <li aria-current="page" className="text-bone">
                {project.title}
              </li>
            </ol>
          </nav>

          <header id="top" className="mt-8">
            <p className="text-[0.8rem] uppercase tracking-[0.14em] text-turq">{project.tagline}</p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg text-ash">{project.summary}</p>
          </header>

          <div className="glass mt-9 rounded-[1.75rem] p-4 sm:p-6 md:p-8">
            <ProjectDetails lang={lang} project={project} heading="h2" />
          </div>

          {others.length > 0 ? (
            <section aria-labelledby="others-title" className="mt-14">
              <h2
                id="others-title"
                className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl"
              >
                {t.projects.others}
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {others.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={projectPath(lang, p.slug)}
                      className="glass glass-hover block h-full rounded-2xl p-5"
                    >
                      <span className="block text-[0.78rem] uppercase tracking-[0.14em] text-turq">
                        {p.tagline}
                      </span>
                      <span className="mt-1.5 block font-display text-lg font-semibold tracking-[-0.02em]">
                        {p.title}
                      </span>
                      <span className="mt-1.5 block text-[0.95rem] text-ash">{p.summary}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <a
            href={`${home}#work`}
            className="mt-12 inline-flex h-12 items-center gap-2.5 rounded-xl border border-turq/45 px-6 font-medium text-ice transition-[background-color,box-shadow] duration-300 hover:bg-turq/12 hover:shadow-[0_0_26px_-6px_rgb(53_224_210/0.7)]"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            {t.projects.all}
          </a>
        </article>
      </main>
      <Footer lang={lang} profile={profile} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(projectJsonLd(lang, project)) }}
      />
    </Motion>
  );
}
