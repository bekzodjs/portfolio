"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectPath, type Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Project } from "@/lib/content";
import { ProjectPreview } from "./ProjectPreview";

const EASE = [0.16, 1, 0.3, 1] as const;

export type ProjectWithImages = Project;

function TechList({ tech, label }: { tech: string[]; label: string }) {
  if (tech.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-lg border border-line bg-turq/5 px-2.5 py-1 text-[0.85rem] text-ice"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function LinkButton({
  href,
  label,
  title,
  primary,
  newTab,
}: {
  href: string;
  label: string;
  title: string;
  primary: boolean;
  newTab: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "group/btn inline-flex h-11 items-center gap-1.5 rounded-xl bg-turq px-4 text-[0.95rem] font-medium text-ink transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.98]"
          : "group/btn inline-flex h-11 items-center gap-1.5 rounded-xl border border-turq/40 px-4 text-[0.95rem] font-medium text-ice transition-[background-color,transform] duration-300 hover:bg-turq/12 active:scale-[0.98]"
      }
    >
      {label}
      <ArrowUpRight
        size={17}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
      />
      <span className="sr-only">
        : {title} ({newTab})
      </span>
    </a>
  );
}

function ProjectCard({
  lang,
  project,
  index,
  onOpen,
}: {
  lang: Lang;
  project: ProjectWithImages;
  index: number;
  onOpen: (trigger: HTMLElement) => void;
}) {
  const t = ui[lang].projects;
  const cover = project.images[0];

  return (
    <motion.article
      className="glass glass-hover group flex flex-col overflow-hidden rounded-[1.75rem]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: EASE }}
    >
      <button
        type="button"
        onClick={(e) => onOpen(e.currentTarget)}
        aria-label={t.openDetails(project.title)}
        className="relative block aspect-[32/21] w-full cursor-pointer overflow-hidden border-b border-line bg-ink/40 text-left"
      >
        <span
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_0%,rgb(53_224_210/0.28),transparent)] opacity-60 transition-opacity duration-700 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span className="absolute inset-0 block transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]">
          {cover ? (
            <Image
              src={cover}
              alt={t.coverAlt(project.title, project.tagline)}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <ProjectPreview kind={project.preview} label={t.previewAlt(project.title)} />
          )}
        </span>
        {project.duration ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/75 px-2.5 py-1 text-[0.8rem] text-ice backdrop-blur">
            <Clock size={13} aria-hidden="true" />
            {project.duration}
          </span>
        ) : null}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.8rem] uppercase tracking-[0.14em] text-turq">
          {project.tagline}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em]">
          <a
            href={projectPath(lang, project.slug)}
            className="transition-colors duration-300 hover:text-turq"
          >
            {project.title}
          </a>
        </h3>
        <p className="mt-2.5 mb-5 text-[0.98rem] text-ash">{project.summary}</p>

        <TechList tech={project.tech} label={t.tech} />

        <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
          <button
            type="button"
            onClick={(e) => onOpen(e.currentTarget)}
            className="inline-flex h-11 cursor-pointer items-center rounded-xl bg-turq px-4 text-[0.95rem] font-medium text-ink transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            {t.details}
            <span className="sr-only">{t.of(project.title)}</span>
          </button>
          {project.links[0] ? (
            <LinkButton
              href={project.links[0].href}
              label={project.links[0].label}
              title={project.title}
              primary={false}
              newTab={t.newTab}
            />
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function Gallery({ lang, project }: { lang: Lang; project: ProjectWithImages }) {
  const t = ui[lang].projects;
  const [active, setActive] = useState(0);
  const count = project.images.length;

  const step = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, step]);

  if (count === 0) {
    return (
      <div className="relative aspect-[32/21] overflow-hidden rounded-2xl border border-line bg-ink/50">
        <ProjectPreview kind={project.preview} label={t.previewAlt(project.title)} />
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-ink/60">
        <a
          href={project.images[active]}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 block"
          aria-label={t.fullSize}
        >
          <Image
            key={project.images[active]}
            src={project.images[active]}
            alt={t.shotAlt(project.title, active + 1, count)}
            fill
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-contain"
            priority
          />
        </a>
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.prev}
              className="absolute left-2 top-1/2 grid size-9 -translate-y-1/2 sm:left-3 sm:size-11 cursor-pointer place-items-center rounded-full border border-line bg-ink/75 text-ice backdrop-blur transition-colors hover:bg-turq/20"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.next}
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 sm:right-3 sm:size-11 cursor-pointer place-items-center rounded-full border border-line bg-ink/75 text-ice backdrop-blur transition-colors hover:bg-turq/20"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full border border-line bg-ink/75 px-2.5 py-1 text-[0.8rem] text-ice backdrop-blur">
              {active + 1} / {count}
            </span>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <ul className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {project.images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={`relative block h-16 w-24 cursor-pointer overflow-hidden rounded-lg border transition-[border-color,opacity] ${
                  i === active
                    ? "border-turq opacity-100"
                    : "border-line opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={t.shotAlt(project.title, i + 1, count)}
                  fill
                  sizes="6rem"
                  className="object-cover object-top"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Gallery, description, facts, stack and links: shared by the dialog and the project page. */
export function ProjectDetails({
  lang,
  project,
  heading: Heading,
}: {
  lang: Lang;
  project: ProjectWithImages;
  heading: "h2" | "h4";
}) {
  const t = ui[lang].projects;
  const facts = [
    { term: t.time, detail: project.duration },
    { term: t.role, detail: project.role },
    { term: t.status, detail: project.status },
  ].filter((f): f is { term: string; detail: string } => Boolean(f.detail));

  return (
    <>
      <Gallery lang={lang} project={project} />

      <div className="mt-7 grid gap-8 md:grid-cols-[1.6fr_1fr]">
        <div>
          <Heading className="font-display text-base font-semibold">{t.about}</Heading>
          <div className="mt-3 space-y-3 text-[1rem] leading-relaxed text-ash">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {project.highlights.length > 0 ? (
            <>
              <Heading className="mt-7 font-display text-base font-semibold">{t.does}</Heading>
              <ul className="mt-3 space-y-2.5 text-[0.98rem] text-ash">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-turq"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <aside className="space-y-6">
          {facts.length > 0 ? (
            <dl className="space-y-4 rounded-2xl border border-line bg-ink/40 p-5">
              {facts.map((fact) => (
                <div key={fact.term}>
                  <dt className="text-[0.8rem] uppercase tracking-[0.12em] text-ash">{fact.term}</dt>
                  <dd className="mt-1 text-[1rem] text-bone">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.tech.length > 0 ? (
            <div>
              <Heading className="mb-3 font-display text-base font-semibold">{t.stack}</Heading>
              <TechList tech={project.tech} label={t.tech} />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2.5">
            {project.links.map((link, i) => (
              <LinkButton
                key={link.href}
                href={link.href}
                label={link.label}
                title={project.title}
                primary={i === 0}
                newTab={t.newTab}
              />
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

function ProjectDialog({
  lang,
  project,
  onClose,
}: {
  lang: Lang;
  project: ProjectWithImages;
  onClose: () => void;
}) {
  const t = ui[lang].projects;
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      // Keep keyboard focus inside the dialog.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center p-3 sm:p-6 md:py-12">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          className="glass relative w-full max-w-5xl rounded-[1.75rem] p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.5, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.8rem] uppercase tracking-[0.14em] text-turq">
                {project.tagline}
              </p>
              <h3
                id="project-dialog-title"
                className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
              >
                {project.title}
              </h3>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-ice transition-colors hover:bg-turq/15"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <ProjectDetails lang={lang} project={project} heading="h4" />

          <a
            href={projectPath(lang, project.slug)}
            className="mt-7 inline-flex items-center gap-1.5 border-b border-line pb-1 text-[0.95rem] text-ice transition-colors duration-300 hover:border-turq"
          >
            {t.page}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProjectsGrid({ lang, projects }: { lang: Lang; projects: ProjectWithImages[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  const close = useCallback(() => {
    setOpenSlug(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            lang={lang}
            project={project}
            index={i}
            onOpen={(trigger) => {
              triggerRef.current = trigger;
              setOpenSlug(project.slug);
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <ProjectDialog key={open.slug} lang={lang} project={open} onClose={close} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
