import type { Lang } from "@/i18n/config";
import { localizeProject } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { getProjects } from "@/lib/content";
import { ProjectsGrid } from "./ProjectsGrid";
import { SectionHeading } from "./SectionHeading";

export async function Projects({ lang }: { lang: Lang }) {
  const t = ui[lang].projects;
  const projects = (await getProjects()).map((p) => localizeProject(p, lang));

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="work-title"
          title={t.title}
          lead={t.lead}
        />
        <ProjectsGrid lang={lang} projects={projects} />
      </div>
    </section>
  );
}
