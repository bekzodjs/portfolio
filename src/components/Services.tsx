import { Bot, MonitorSmartphone, PenTool } from "lucide-react";
import type { Lang } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Profile } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ICONS = { web: MonitorSmartphone, bot: Bot, design: PenTool } as const;

export function Services({ lang, profile }: { lang: Lang; profile: Profile }) {
  const t = ui[lang].services;
  const services = profile.services;
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="services-title"
          title={t.title}
          lead={t.lead}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal
                as="li"
                key={service.title}
                delay={i * 0.1}
                className="h-full sm:last:col-span-2 lg:last:col-span-1"
              >
                <div className="glass glass-hover group h-full rounded-[1.75rem] p-6 sm:p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-turq/35 bg-turq/10 text-turq shadow-[inset_0_0_18px_rgb(53_224_210/0.25)] transition-shadow duration-500 group-hover:shadow-[0_0_26px_-2px_rgb(53_224_210/0.7)]">
                    <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-ash">{service.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
