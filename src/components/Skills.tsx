"use client";

import { motion } from "framer-motion";
import type { Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Profile, Skill } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.li
      className="glass glass-hover group relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      onPointerMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
      }}
    >
      <div
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex h-full items-center gap-4 p-4 sm:p-5">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-turq/35 bg-turq/10 font-display text-[0.95rem] font-semibold text-ice shadow-[inset_0_0_14px_rgb(53_224_210/0.25)] transition-[background-color,box-shadow] duration-500 group-hover:bg-turq/25 group-hover:shadow-[0_0_22px_-2px_rgb(53_224_210/0.7)]"
          aria-hidden="true"
        >
          {skill.glyph}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[1.02rem] font-medium tracking-[-0.01em]">
            {skill.name}
          </h3>
          <p className="mt-0.5 text-[0.9rem] leading-snug text-ash">
            {skill.note}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

export function Skills({ lang, profile }: { lang: Lang; profile: Profile }) {
  const t = ui[lang].skills;
  const skillGroups = profile.skillGroups;
  const skills = skillGroups.flatMap((g) => g.skills);
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="skills-title"
          title={t.title}
          lead={t.lead}
        />
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
