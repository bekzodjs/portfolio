"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { useRef } from "react";
import type { TimelineItem } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Timeline({
  id,
  title,
  lead,
  kindLabel,
  items,
}: {
  id: string;
  title: string;
  lead?: string;
  /** Screen-reader label for the entries, in the page language. */
  kindLabel?: string;
  items: TimelineItem[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  if (items.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading id={`${id}-title`} title={title} lead={lead} />

        <div className="glass rounded-[2rem] p-5 sm:p-10">
          <ol ref={ref} className="relative ml-1 md:ml-0">
            <span
              className="absolute bottom-2 left-[9px] top-2 w-px bg-line md:left-[calc(25%+9px)]"
              aria-hidden="true"
            />
            <motion.span
              className="absolute bottom-2 left-[9px] top-2 w-px origin-top bg-gradient-to-b from-ice via-turq to-aqua shadow-[0_0_12px_1px_rgb(53_224_210/0.7)] md:left-[calc(25%+9px)]"
              style={{ scaleY: progress }}
              aria-hidden="true"
            />

            {items.map((item) => {
              const Icon = item.kind === "Work" ? BriefcaseBusiness : GraduationCap;
              return (
                <Reveal
                  as="li"
                  key={`${item.title}-${item.period}`}
                  className="relative grid gap-2 pb-14 pl-10 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0"
                >
                  <p className="font-display text-[0.95rem] font-light text-ash md:pr-8 md:pt-0.5 md:text-right">
                    {item.period}
                  </p>
                  <span
                    className="absolute left-0 top-1 h-[19px] w-[19px] rounded-full border border-turq/60 bg-coal md:left-[25%]"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-[5px] rounded-full bg-turq" />
                  </span>
                  <div className="min-w-0 md:col-span-3 md:pl-14">
                    <h3 className="hyphens-auto break-words font-display text-lg font-medium tracking-[-0.01em] sm:text-xl md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 flex items-start gap-2 text-bone/80">
                      <Icon size={17} aria-hidden="true" className="mt-1 shrink-0 text-turq" />
                      <span className="min-w-0 break-words">
                        <span className="sr-only">{kindLabel ?? item.kind}: </span>
                        {item.place}
                      </span>
                    </p>
                    <p className="mt-3 max-w-[58ch] text-ash">{item.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
