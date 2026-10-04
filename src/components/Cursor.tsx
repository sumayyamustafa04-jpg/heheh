import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "link" | "view";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (!t) return setVariant("default");
      if (t.closest('[data-cursor="view"]')) setVariant("view");
      else if (t.closest('a, button, [data-hover], input, textarea'))
        setVariant("link");
      else setVariant("default");
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* dot */}
      <motion.div
        className="theme-pin pointer-events-none fixed left-0 top-0 z-[300]"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          animate={{
            width: variant === "view" ? 0 : 7,
            height: variant === "view" ? 0 : 7,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* ring */}
      <motion.div
        className="theme-pin pointer-events-none fixed left-0 top-0 z-[299]"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
            variant === "view"
              ? "bg-cream"
              : "border border-cream mix-blend-difference"
          }`}
          animate={{
            width: variant === "view" ? 88 : variant === "link" ? 52 : 34,
            height: variant === "view" ? 88 : variant === "link" ? 52 : 34,
            opacity: variant === "view" ? 1 : 0.9,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-opacity duration-200 ${
              variant === "view" ? "opacity-100" : "opacity-0"
            }`}
          >
            View
          </span>
        </motion.div>
      </motion.div>
    </>
  );
}
