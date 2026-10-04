import { Asterisk } from "lucide-react";
import { SectionTag, FadeIn } from "./ui";

const POINTS = [
  "Corporate videos, campaigns & marketing content",
  "Storyboards and visual style frames",
  "Transitions and animated assets",
  "Collaboration with design, marketing and content teams",
  "Project file and rendering workflow optimization",
  "Brand-aligned animation work",
];

const BRANDS = ["MMBL", "Royalton", "LEGO", "Ignite", "Raqami", "K-Electric"];

export default function Experience() {
  return (
    <section id="experience" className="relative px-5 py-20 md:px-10 md:py-32">
      <SectionTag index="03" label="Experience" />

      <FadeIn className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.4rem,6.5vw,6rem)] font-semibold uppercase leading-[0.9] tracking-tight">
          Selected{" "}
          <span className="font-serif font-normal normal-case italic tracking-normal text-accent">
            experience
          </span>
        </h2>
        <p className="max-w-xs pb-3 text-sm leading-relaxed text-ink/60">
          Over the course of my work, I've contributed to creative and motion
          projects across different industries, adapting visual language and
          storytelling to each brand's needs.
        </p>
      </FadeIn>

      {/* current role */}
      <FadeIn className="mt-10 border-t border-ink/15 md:mt-14">
        <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-12 md:py-14">
          <div className="md:col-span-5">
            <span className="inline-block rounded-full border border-ink/25 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
              2023 — Present
            </span>
            <h3 className="mt-5 font-display text-3xl font-medium uppercase leading-[1.02] tracking-tight md:text-4xl">
              Motion Graphics Executive / Animator
            </h3>
            <p className="mt-4 font-serif text-2xl italic text-accent md:text-3xl">
              Trillium
            </p>
          </div>
          <ul className="md:col-span-6 md:col-start-7">
            {POINTS.map((point, i) => (
              <FadeIn key={point} delay={i * 0.04}>
                <li
                  data-hover
                  className="group flex items-center gap-4 border-b border-ink/15 py-4 transition-colors duration-500 first:border-t hover:bg-ink/[0.03] md:py-5"
                >
                  <Asterisk className="h-4 w-4 shrink-0 text-accent transition-transform duration-500 group-hover:rotate-90" />
                  <span className="text-sm text-ink/75 transition-transform duration-500 ease-expo group-hover:translate-x-2 md:text-base">
                    {point}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* brands */}
      <div className="mt-6 md:mt-10">
        <FadeIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/45">
            Selected organizations & brands I've worked on projects for
          </p>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-6">
          <div className="grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 md:grid-cols-6">
            {BRANDS.map((b) => (
              <div
                key={b}
                data-hover
                className="group grid place-items-center bg-cream px-4 py-6 transition-colors duration-500 hover:bg-ink md:py-8"
              >
                <span className="font-display text-lg font-medium uppercase tracking-tight transition-colors duration-500 group-hover:text-cream md:text-xl">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
