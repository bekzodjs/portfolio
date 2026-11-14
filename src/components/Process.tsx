"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { process } from "@/data/site";
import type { Lang } from "@/i18n/config";
import { localizeSteps } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process({ lang }: { lang: Lang }) {
  const t = ui[lang].process;
  const steps = localizeSteps(process, lang);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="process-title"
          title={t.title}
          lead={t.lead}
        />

        <div className="glass rounded-[2rem] p-6 sm:p-9">
          <ol ref={ref} className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            {/* Track: vertical on phones, horizontal on desktop. */}
            <span
              className="absolute bottom-3 left-[19px] top-3 w-px bg-line lg:inset-x-[10%] lg:bottom-auto lg:top-[19px] lg:h-px lg:w-auto"
              aria-hidden="true"
            />
            <motion.span
              className="absolute bottom-3 left-[19px] top-3 w-px origin-top bg-turq shadow-[0_0_12px_1px_rgb(53_224_210/0.8)] lg:hidden"
              style={{ scaleY: progress }}
              aria-hidden="true"
            />
            <motion.span
              className="absolute inset-x-[10%] top-[19px] hidden h-px origin-left bg-turq shadow-[0_0_12px_1px_rgb(53_224_210/0.8)] lg:block"
              style={{ scaleX: progress }}
              aria-hidden="true"
            />

            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.08}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-turq/60 bg-coal font-display text-[0.8rem] font-medium text-ice shadow-[0_0_18px_-2px_rgb(53_224_210/0.6)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] text-ash">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
