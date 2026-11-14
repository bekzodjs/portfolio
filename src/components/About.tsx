import { UserRound } from "lucide-react";
import Image from "next/image";
import type { Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Profile } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About({ lang, profile }: { lang: Lang; profile: Profile }) {
  const t = ui[lang].about;
  const name = `${profile.firstName} ${profile.lastName}`;
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading id="about-title" title={t.title} />

        <Reveal>
          <div className="glass grid gap-8 rounded-[2rem] p-6 sm:p-9 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="relative mx-auto aspect-square w-full max-w-[17rem] overflow-hidden rounded-3xl border border-line bg-turq/5 lg:max-w-none">
                {profile.photo ? (
                  <Image
                    src={profile.photo}
                    alt={t.photoAlt(name)}
                    fill
                    sizes="(min-width: 1024px) 20rem, 17rem"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-ash">
                    <UserRound size={64} strokeWidth={1.2} aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-4 text-bone/90">
                {profile.aboutParagraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-[66ch]">
                    {p}
                  </p>
                ))}
              </div>

              <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
                {profile.aboutFacts.map((fact) => (
                  <div key={fact.term}>
                    <dt className="text-[0.92rem] text-turq">{fact.term}</dt>
                    <dd className="mt-0.5">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
