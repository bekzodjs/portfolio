import { Download, Languages } from "lucide-react";
import type { Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Profile } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Ielts({ lang, profile }: { lang: Lang; profile: Profile }) {
  const t = ui[lang].ielts;
  const ielts = profile.ielts;
  return (
    <section aria-labelledby="ielts-title" className="relative py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(53_224_210/0.3),transparent)] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto] md:gap-10">
              <div className="flex items-center gap-5">
                <div className="grid size-28 shrink-0 place-items-center rounded-3xl border border-turq/50 bg-turq/10 shadow-[0_0_40px_-8px_rgb(53_224_210/0.8)] sm:size-32">
                  <span className="text-center">
                    <span className="text-glow block font-display text-[2.6rem] font-semibold leading-none sm:text-5xl">
                      {ielts.score}
                    </span>
                    <span className="mt-1.5 block text-[0.8rem] uppercase tracking-[0.16em] text-ash">
                      {t.band}
                    </span>
                  </span>
                </div>
              </div>

              <div>
                <p className="inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.14em] text-turq">
                  <Languages size={15} aria-hidden="true" />
                  {t.certified}
                </p>
                <h2
                  id="ielts-title"
                  className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
                >
                  IELTS {ielts.score} · {ielts.level}
                </h2>
                <p className="mt-3 max-w-[58ch] text-ash">{ielts.note}</p>
                <p className="mt-2 text-[0.92rem] text-ash">
                  {t.taken(ielts.taken)}
                </p>
              </div>

              {ielts.certificate ? (
                <a
                  href={ielts.certificate}
                  download
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-turq px-6 font-medium text-ink shadow-[0_0_30px_-6px_rgb(53_224_210/0.8)] transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.98]"
                >
                  <Download size={18} aria-hidden="true" />
                  {t.download}
                  <span className="sr-only"> (PDF)</span>
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
