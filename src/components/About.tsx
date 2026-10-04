import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionTag, FadeIn } from "./ui";

type W = { t: string; accent?: boolean; serif?: boolean };

const STATEMENT: W[] = [
  { t: "I'm" }, { t: "Sumayya" }, { t: "Mustafa," }, { t: "a" },
  { t: "Motion", serif: true }, { t: "Graphics", serif: true }, { t: "Animator", serif: true },
  { t: "based" }, { t: "in" }, { t: "Islamabad–Rawalpindi." },
  { t: "I" }, { t: "create" }, { t: "motion", accent: true }, { t: "experiences", accent: true },
  { t: "across" }, { t: "corporate" }, { t: "communication," }, { t: "explainer" },
  { t: "videos," }, { t: "social" }, { t: "content," }, { t: "and" }, { t: "2D/3D" },
  { t: "animation" }, { t: "—" }, { t: "combining" },
  { t: "visual", serif: true }, { t: "storytelling", serif: true },
  { t: "with" }, { t: "thoughtful" }, { t: "design" }, { t: "to" }, { t: "make" },
  { t: "ideas" }, { t: "easier" }, { t: "to" }, { t: "understand" }, { t: "and" },
  { t: "harder", serif: true, accent: true }, { t: "to" }, { t: "forget.", serif: true, accent: true },
];

function Word({
  progress,
  range,
  word,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  word: W;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-[0.27em] inline-block ${
        word.serif ? "font-serif italic tracking-normal" : ""
      } ${word.accent ? "text-accent" : ""}`}
    >
      {word.t}
    </motion.span>
  );
}

const META = [
  { label: "Location", value: "Islamabad – Rawalpindi, Pakistan" },
  {
    label: "Experience",
    value: "Motion Graphics Executive / Animator — Trillium",
  },
  {
    label: "Education",
    value: "BS Animation / Computer Arts, FJWU — 2024",
  },
];

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(imgProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="about" className="theme-pin relative bg-ink px-5 py-20 text-cream md:px-10 md:py-32">
      <SectionTag index="02" label="A Little About My Work" dark />

      {/* scroll-scrubbed statement */}
      <p
        ref={textRef}
        className="mt-10 max-w-5xl font-display text-[clamp(1.55rem,3.9vw,3.25rem)] font-medium leading-[1.15] tracking-tight md:mt-12"
      >
        {STATEMENT.map((w, i) => (
          <Word
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[i / STATEMENT.length, Math.min(1, (i + 1.5) / STATEMENT.length)]}
          />
        ))}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
        {/* visual */}
        <div className="md:col-span-5">
          <div ref={imgRef} className="relative">
            <span className="absolute -left-3 -top-3 h-24 w-24 border-l border-t border-accent" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <motion.img
                src="/images/about-photo.jpg"
                alt="Sumayya Mustafa — portrait"
                style={{ y: imgY }}
                className="absolute inset-0 h-[124%] w-full object-cover object-top"
              />
              <span className="absolute bottom-3 left-3 bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
                Sumayya Mustafa — Motion Graphics Animator
              </span>
              <span className="absolute bottom-10 left-3 bg-ink/70 backdrop-blur-sm px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-cream/70">
                AI-Generated — Not My Actual Photo
              </span>
            </div>
          </div>
        </div>

        {/* details */}
        <div className="md:col-span-6 md:col-start-7">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/45">
              The details
            </p>
          </FadeIn>
          <div className="mt-5 border-t border-cream/15">
            {META.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.06}>
                <div className="group grid grid-cols-12 items-baseline gap-4 border-b border-cream/15 py-6">
                  <span className="col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/45 md:col-span-3">
                    {m.label}
                  </span>
                  <span className="col-span-8 font-display text-lg font-medium leading-snug tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-2 md:col-span-9 md:text-2xl">
                    {m.value}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15} className="mt-12">
            <p className="max-w-md text-base leading-relaxed text-cream/60">
              Currently crafting motion at{" "}
              <span className="font-serif text-[1.2em] italic text-cream">Trillium</span>{" "}
              — designing for screens big and small, one keyframe at a time.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
