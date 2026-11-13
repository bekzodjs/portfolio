import { getProjects } from "@/lib/content";
import { ProjectsGrid } from "./ProjectsGrid";
import { SectionHeading } from "./SectionHeading";

export async function Projects() {
  const projects = await getProjects();

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="work-title"
          title="Featured projects"
          lead="Systems that people at real companies open every working day. Select a project for the full story."
        />
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
