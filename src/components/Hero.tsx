import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { Line, FadeIn, SpinBadge, Magnetic } from "./ui";

export default function Hero({ loaded }: { loaded: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-8 pt-28 md:px-10"
    >
      {/* meta row */}
      <motion.div style={{ opacity }} className="absolute inset-x-5 top-24 md:inset-x-10">
        <FadeIn delay={0.9} className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 md:text-[11px]">
          <span className="max-w-[180px] leading-relaxed md:max-w-none">
            Folio / 2026
          </span>
          <span className="hidden md:block">Motion Graphics Animator</span>
          <span className="text-right leading-relaxed">
            Islamabad — Rawalpindi <span className="text-accent">/</span> Pakistan
          </span>
        </FadeIn>
      </motion.div>

      <motion.div style={{ y, opacity }}>
        {/* heading */}
        <h1 className="relative font-display font-semibold uppercase leading-[0.86] tracking-[-0.02em]">
          <Line show={loaded} delay={0.15}>
            <span className="flex items-center gap-[0.15em] text-[clamp(2.9rem,10.25vw,9.5rem)]">
              I make
              <Asterisk
                className="hidden h-[0.5em] w-[0.5em] animate-spin-slow text-accent md:block"
                strokeWidth={2.5}
              />
            </span>
          </Line>
          <Line show={loaded} delay={0.28}>
            <span className="text-[clamp(2.9rem,10.25vw,9.5rem)]">
              Ideas move<span className="text-accent">.</span>
            </span>
          </Line>
        </h1>

        {/* sub row */}
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-10 md:mt-12 md:flex-row md:items-end">
          <FadeIn delay={1} className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/25">
              <ArrowDown className="h-4 w-4 animate-float-y" />
            </span>
            <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-ink/55">
              Scroll to
              <br />
              explore
            </span>
          </FadeIn>

          <FadeIn delay={1.1} className="max-w-xl md:text-right">
            <p className="text-base leading-relaxed text-ink/75 md:text-lg">
              Motion Graphics Animator crafting{" "}
              <span className="font-serif text-[1.25em] italic text-ink">
                expressive
              </span>{" "}
              2D & 3D visuals, explainer videos, and motion experiences that
              turn ideas into{" "}
              <span className="font-serif text-[1.25em] italic text-accent">
                clear, engaging stories.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:justify-end">
              <Magnetic strength={0.25}>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors duration-400 hover:bg-accent"
                >
                  Explore My Work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:rotate-45" />
                </a>
              </Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-ink/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-400 hover:border-ink hover:bg-ink hover:text-cream"
              >
                Let's Work Together
              </a>
            </div>
          </FadeIn>
        </div>
      </motion.div>

      {/* rotating badge */}
      <FadeIn
        delay={1.3}
        className="absolute right-8 top-[30%] hidden lg:block xl:right-16"
      >
        <SpinBadge text="i make ideas move • motion • design • storytelling • " className="h-36 w-36" />
      </FadeIn>
    </section>
  );
}
