"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { langLabel, langName, locales, type Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Profile } from "@/lib/content";
import { Wordmark } from "./Wordmark";

const EASE = [0.16, 1, 0.3, 1] as const;

const SECTIONS = ["about", "skills", "work", "services", "process", "contact"] as const;

/** EN / UZ / RU links to the same page in the other languages. */
function LangSwitch({
  lang,
  links,
  label,
  className = "",
}: {
  lang: Lang;
  links: Record<Lang, string>;
  label: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={`flex items-center gap-0.5 text-[0.82rem] ${className}`}>
      {locales.map((l) => (
        <li key={l}>
          <a
            href={links[l]}
            hrefLang={l}
            lang={l}
            title={langName[l]}
            aria-current={l === lang ? "page" : undefined}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-1.5 font-medium transition-colors duration-300 ${
              l === lang ? "bg-turq/15 text-ice" : "text-ash hover:text-bone"
            }`}
          >
            {langLabel[l]}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Nav({
  lang,
  email,
  profile,
  langLinks,
  onHome = false,
}: {
  lang: Lang;
  email: string;
  profile: Profile;
  /** The current page in each language. */
  langLinks: Record<Lang, string>;
  /** True on the one-page home, where the menu scrolls instead of navigating. */
  onHome?: boolean;
}) {
  const t = ui[lang].nav;
  const home = onHome ? "" : langLinks[lang].replace(/\/projects\/.*$/, "") || "/";
  const nav = SECTIONS.map((id) => ({ label: t[id], href: `${home}#${id}` }));
  const name = `${profile.firstName} ${profile.lastName}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div
          className={`glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 transition-[background-color] duration-500 md:h-16 md:px-6 ${
            scrolled || open ? "bg-ink/70" : ""
          }`}
        >
          <a
            href={onHome ? "#top" : home}
            aria-label={t.home(name)}
            onClick={() => setOpen(false)}
          >
            <Wordmark className="text-base md:text-lg" />
          </a>

          <nav aria-label={t.main} className="hidden lg:ml-5 lg:block xl:ml-8">
            <ul className="flex items-center gap-4 whitespace-nowrap text-[0.95rem] text-ash xl:gap-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative py-2 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-turq after:shadow-[0_0_10px_1px_rgb(53_224_210/0.8)] after:transition-transform after:duration-500 after:ease-out-expo hover:text-bone hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {profile.cv ? (
            <a
              href={profile.cv}
              download
              className="ml-auto mr-3 hidden h-10 items-center rounded-xl px-3 text-[0.95rem] text-ash transition-colors duration-300 hover:text-bone xl:inline-flex"
            >
              {t.cv}
            </a>
          ) : null}
          <LangSwitch
            lang={lang}
            links={langLinks}
            label={t.language}
            className={`ml-auto mr-1 lg:mr-3 ${profile.cv ? "xl:ml-0" : ""}`}
          />
          <a
            href={`${home}#contact`}
            className="hidden h-10 items-center whitespace-nowrap rounded-xl border border-turq/50 px-4 text-[0.95rem] font-medium text-ice transition-[background-color,box-shadow] duration-300 hover:bg-turq/15 hover:shadow-[0_0_24px_-4px_rgb(53_224_210/0.7)] lg:inline-flex"
          >
            {t.hire}
          </a>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise trap this fixed layer. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 pt-20 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav
              aria-label={t.mobile}
              className="flex min-h-full flex-col justify-between px-5 pb-10 pt-8"
            >
              <ul>
                {nav.map((item, i) => (
                  <li
                    key={item.href}
                    className="overflow-hidden border-b border-line"
                  >
                    <motion.a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-display text-[2rem] font-semibold tracking-[-0.02em]"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.05 + i * 0.06,
                        ease: EASE,
                      }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="mt-10 text-ash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <a
                  href={`mailto:${email}`}
                  className="text-lg text-bone underline decoration-turq underline-offset-4"
                >
                  {email}
                </a>
                <p className="mt-2">{profile.location}</p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
