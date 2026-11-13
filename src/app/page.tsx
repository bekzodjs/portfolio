import { About } from "@/components/About";
import { Backdrop } from "@/components/Backdrop";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Ielts } from "@/components/Ielts";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { getProfile, getSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, profile] = await Promise.all([getSettings(), getProfile()]);
  return (
    <Motion>
      <Backdrop />
      <Nav email={settings.email} profile={profile} />
      <main id="main">
        <Hero profile={profile} />
        <About profile={profile} />
        <Ielts profile={profile} />
        <Skills profile={profile} />
        <Projects />
        <Services profile={profile} />
        <Process />
        <Experience />
        <Education />
        <Contact email={settings.email} socials={settings.socials} />
      </main>
      <Footer profile={profile} />
    </Motion>
  );
}
