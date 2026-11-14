import { timeline } from "@/data/site";
import { homePath, locales, type Lang } from "@/i18n/config";
import { localizeProfile, localizeTimeline } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { getProfile, getSettings } from "@/lib/content";
import { jsonLd, profilePageJsonLd } from "@/lib/seo";
import { About } from "./About";
import { Backdrop } from "./Backdrop";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Ielts } from "./Ielts";
import { Motion } from "./Motion";
import { Nav } from "./Nav";
import { Process } from "./Process";
import { Projects } from "./Projects";
import { Services } from "./Services";
import { Skills } from "./Skills";
import { Timeline } from "./Timeline";

/** The one-page portfolio in the given language. */
export async function HomePage({ lang }: { lang: Lang }) {
  const [settings, stored] = await Promise.all([getSettings(), getProfile()]);
  const profile = localizeProfile(stored, lang);
  const t = ui[lang];
  const items = localizeTimeline(timeline, lang);
  const langLinks = Object.fromEntries(locales.map((l) => [l, homePath(l)])) as Record<Lang, string>;

  return (
    <Motion>
      <Backdrop />
      <Nav lang={lang} email={settings.email} profile={profile} langLinks={langLinks} onHome />
      <main id="main">
        <Hero lang={lang} profile={profile} />
        <About lang={lang} profile={profile} />
        <Ielts lang={lang} profile={profile} />
        <Skills lang={lang} profile={profile} />
        <Projects lang={lang} />
        <Services lang={lang} profile={profile} />
        <Process lang={lang} />
        <Timeline
          id="experience"
          title={t.timeline.experience}
          kindLabel={t.timeline.work}
          items={items.filter((item) => item.kind === "Work")}
        />
        <Timeline
          id="education"
          title={t.timeline.education}
          kindLabel={t.timeline.study}
          items={items.filter((item) => item.kind === "Education")}
        />
        <Contact lang={lang} email={settings.email} socials={settings.socials} />
      </main>
      <Footer lang={lang} profile={profile} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(profilePageJsonLd(lang)) }}
      />
    </Motion>
  );
}
