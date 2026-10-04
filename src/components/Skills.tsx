import { SectionTag, FadeIn } from "./ui";

const GROUPS = [
  {
    title: "Motion Graphics & Visual Storytelling",
    skills: [
      "Motion Graphics",
      "Visual Storytelling",
      "Corporate Explainers",
      "Logo Animation",
      "Kinetic Typography",
      "Lower Thirds",
      "Transitions",
      "Animated Assets",
    ],
  },
  {
    title: "Animation",
    skills: ["Motion Design", "Character Animation", "Icon Animation", "3D Animation"],
  },
  {
    title: "Post-Production",
    skills: ["Video Editing", "Post-Production", "Social Media Content", "Marketing Assets"],
  },
  {
    title: "Design",
    skills: ["Color Theory", "Composition", "Visual Hierarchy"],
  },
];

const TOOLS = [
  { name: "Adobe After Effects", desc: "Animation & Motion" },
  { name: "Adobe Illustrator", desc: "Vector Design" },
  { name: "Adobe Photoshop", desc: "Image & Texture" },
  { name: "Adobe Premiere Pro", desc: "Editing & Post" },
  { name: "Blender", desc: "3D Animation" },
  { name: "AI Tools", desc: "ChatGPT & Claude" },
  { name: "Envato", desc: "Assets & Resources" },
  { name: "Lumi", desc: "Interactive Content" },
  { name: "SCORM", desc: "E-Learning Standard" },
  { name: "Articulate", desc: "Course Authoring" },
];

const STRENGTHS = [
  {
    title: "Attention to Detail",
    copy: "A strong visual eye for composition, timing, and finishing.",
  },
  {
    title: "Adaptability",
    copy: "Comfortable working across different visual styles, brands, and communication needs.",
  },
  {
    title: "Collaboration",
    copy: "Experienced in working alongside designers, marketers, content teams, and creative collaborators.",
  },
  {
    title: "Curiosity",
    copy: "Always exploring new tools, techniques, and ways to make visual communication more effective.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-5 py-20 md:px-10 md:py-32">
      <SectionTag index="04" label="Skills" />

      <FadeIn className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.4rem,6.5vw,6rem)] font-semibold uppercase leading-[0.9] tracking-tight">
          What I bring{" "}
          <span className="font-serif font-normal normal-case italic tracking-normal text-accent">
            to the frame
          </span>
        </h2>
        <p className="max-w-xs pb-3 text-sm leading-relaxed text-ink/60">
          A focused set of skills across motion design, animation,
          post-production, and visual craft — refined through real projects and
          continuous exploration.
        </p>
      </FadeIn>

      {/* skill groups */}
      <FadeIn className="mt-14 md:mt-20">
        <div className="grid grid-cols-1 gap-px border border-ink/15 bg-ink/15 md:grid-cols-2">
          {GROUPS.map((g, i) => (
            <div key={g.title} className="bg-cream p-6 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                ({String(i + 1).padStart(2, "0")})
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium uppercase leading-tight tracking-tight md:text-3xl">
                {g.title}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    data-hover
                    className="rounded-full border border-ink/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-cream"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* software */}
      <div className="mt-16 md:mt-24">
        <FadeIn className="flex flex-wrap items-end justify-between gap-6">
          <h3 className="font-display text-3xl font-semibold uppercase leading-[0.95] tracking-tight md:text-5xl">
            Software
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-ink/60">
            The tools I use to bring ideas to life — from design and animation
            to editing and 3D.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <div className="grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 md:grid-cols-5">
            {TOOLS.map((t, i) => (
              <div
                key={t.name}
                data-hover
                className="group flex min-h-32 flex-col justify-between bg-cream p-5 transition-colors duration-500 hover:bg-ink md:min-h-36"
              >
                <span className="font-mono text-[10px] text-ink/40 transition-colors duration-500 group-hover:text-accent">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <div className="mt-8">
                  <p className="font-display text-base font-medium uppercase leading-tight tracking-tight transition-colors duration-500 group-hover:text-cream md:text-lg">
                    {t.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45 transition-colors duration-500 group-hover:text-cream/50">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* strengths */}
      <div className="mt-16 md:mt-24">
        <SectionTag index="05" label="Beyond the Frame" />
        <FadeIn className="mt-8">
          <h3 className="font-display text-3xl font-semibold uppercase leading-[0.95] tracking-tight md:text-5xl">
            What shapes{" "}
            <span className="font-serif font-normal normal-case italic tracking-normal text-accent">
              my work
            </span>
          </h3>
        </FadeIn>

        <div className="mt-10 border-t border-ink/15">
          {STRENGTHS.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05}>
              <div
                data-hover
                className="group grid grid-cols-12 items-baseline gap-4 border-b border-ink/15 py-6 transition-colors duration-500 hover:bg-ink/[0.03] md:py-7"
              >
                <span className="col-span-2 font-mono text-xs text-ink/40 transition-colors duration-500 group-hover:text-accent md:col-span-1">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="col-span-10 font-display text-2xl font-medium uppercase leading-tight tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-2 md:col-span-4 md:text-3xl">
                  {s.title}
                </h4>
                <p className="col-span-10 col-start-3 text-sm leading-relaxed text-ink/60 md:col-span-6 md:col-start-6 md:text-base">
                  {s.copy}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
