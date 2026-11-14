import { Reveal, RevealLines } from "./Reveal";

export function SectionHeading({
  id,
  title,
  lead,
}: {
  id: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <h2
        id={id}
        className="break-words font-display text-[clamp(1.45rem,7.4vw,1.7rem)] font-semibold sm:text-[clamp(1.7rem,3.6vw,2.75rem)] leading-[1.1] tracking-[-0.02em]"
      >
        <RevealLines lines={[title]} />
      </h2>
      <Reveal delay={0.1}>
        <span
          className="mx-auto mt-4 block h-px w-24 bg-gradient-to-r from-transparent via-turq to-transparent shadow-[0_0_14px_2px_rgb(53_224_210/0.6)]"
          aria-hidden="true"
        />
        {lead ? <p className="mt-5 text-ash">{lead}</p> : null}
      </Reveal>
    </header>
  );
}
