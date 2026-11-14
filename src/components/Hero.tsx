"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail, UserRound } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Profile } from "@/lib/content";
import { RevealLines } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;


function Portrait({ photo, alt, placeholder }: { photo: string; alt: string; placeholder: string }) {
  return (
    <div className="glass relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
      {photo ? (
        <Image
          src={photo}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 26rem, 80vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-ash">
          <span className="flex h-28 w-28 items-center justify-center rounded-full border border-line bg-turq/10">
            <UserRound size={56} strokeWidth={1.2} aria-hidden="true" />
          </span>
          <span className="text-[0.95rem]">{placeholder}</span>
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export function Hero({ lang, profile }: { lang: Lang; profile: Profile }) {
  const t = ui[lang].hero;
  const name = `${profile.firstName} ${profile.lastName}`;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const chipY = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-x-clip pb-16 pt-28 md:pt-36"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="glass rounded-[2rem] p-7 sm:p-10 lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <h1 className="font-display font-semibold leading-[1.02] tracking-[-0.03em]">
            <span className="block text-[clamp(1.1rem,2.2vw,1.5rem)] font-light tracking-[-0.01em] text-ash">
              {t.hello}
            </span>
            <RevealLines
              lines={[profile.firstName]}
              onView={false}
              delay={0.25}
              className="mt-2 block text-[clamp(2.6rem,7.4vw,5.5rem)]"
            />
            <RevealLines
              lines={[`${profile.lastName}.`]}
              onView={false}
              delay={0.34}
              className="text-glow block text-[clamp(1.7rem,4.3vw,3.1rem)]"
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          >
            <p className="mt-6 font-display text-[clamp(1rem,1.7vw,1.25rem)] font-light text-bone">
              {profile.role}
            </p>
            <p className="mt-3 max-w-lg text-ash">{profile.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-turq px-6 font-medium text-ink shadow-[0_0_30px_-6px_rgb(53_224_210/0.8)] transition-[filter,transform,box-shadow] duration-300 hover:shadow-[0_0_44px_-4px_rgb(53_224_210/0.95)] hover:brightness-110 active:scale-[0.98]"
              >
                {t.work}
                <ArrowDown
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-turq/45 px-6 font-medium text-ice transition-[background-color,transform,box-shadow] duration-300 hover:bg-turq/12 hover:shadow-[0_0_26px_-6px_rgb(53_224_210/0.7)] active:scale-[0.98]"
              >
                <Mail size={18} aria-hidden="true" />
                {t.contact}
              </a>
              {profile.cv ? (
                <a
                  href={profile.cv}
                  download
                  className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-turq/45 px-6 font-medium text-ice transition-[background-color,transform,box-shadow] duration-300 hover:bg-turq/12 hover:shadow-[0_0_26px_-6px_rgb(53_224_210/0.7)] active:scale-[0.98]"
                >
                  <Download size={18} aria-hidden="true" />
                  {t.cv}
                  <span className="sr-only"> (PDF)</span>
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-5 lg:max-w-none lg:pl-6">
          <div
            className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(53_224_210/0.35),transparent)] blur-2xl"
            aria-hidden="true"
          />
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          >
            <Portrait photo={profile.photo} alt={t.portraitAlt(name)} placeholder={t.addPhoto} />
          </motion.div>

          <motion.div
            className="glass absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:left-6"
            style={{ y: chipY }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turq opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-turq" />
            </span>
            <span className="text-[0.92rem] leading-tight">
              {t.available}
              <span className="block text-ash">{profile.location}</span>
            </span>
          </motion.div>

{/* floating skill list removed — it overlapped the portrait */}
        </div>
      </div>
    </section>
  );
}
