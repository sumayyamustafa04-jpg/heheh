import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_EXPO = [0.76, 0, 0.24, 1] as const;

/* ---------------- Magnetic wrapper ---------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Masked line reveal ---------------- */
export function Line({
  children,
  show,
  delay = 0,
  duration = 1.1,
  className = "",
}: {
  children: ReactNode;
  show: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%", rotate: 2.5 }}
        animate={show ? { y: "0%", rotate: 0 } : {}}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------------- Fade in on scroll ---------------- */
export function FadeIn({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Section label ---------------- */
export function SectionTag({
  label,
  dark = false,
}: {
  index?: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <FadeIn className="flex items-center gap-4">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.25em] ${
          dark ? "text-cream/60" : "text-ink/60"
        }`}
      >
        {label}
      </span>
      <span
        className={`h-px flex-1 border-t border-dashed ${
          dark ? "border-cream/25" : "border-ink/20"
        }`}
      />
    </FadeIn>
  );
}

/* ---------------- Animated counter ---------------- */
export function Counter({
  to,
  suffix = "",
  className = "",
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------------- Rotating circular badge ---------------- */
export function SpinBadge({
  text,
  dark = false,
  className = "",
}: {
  text: string;
  dark?: boolean;
  className?: string;
}) {
  const id = useRef(`circ-${Math.random().toString(36).slice(2, 8)}`).current;
  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
        <defs>
          <path
            id={id}
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          className={`font-mono uppercase ${
            dark ? "fill-cream/70" : "fill-ink/70"
          }`}
          style={{ fontSize: 12.5, letterSpacing: "0.32em" }}
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span
          className={`grid h-12 w-12 place-items-center rounded-full ${
            dark ? "bg-cream text-ink" : "bg-ink text-cream"
          }`}
        >
          <ArrowDownRight className="h-5 w-5" />
        </span>
      </span>
    </div>
  );
}
