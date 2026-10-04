import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Plus, ArrowUpRight, Moon, Sun } from "lucide-react";
import { EASE, EASE_EXPO } from "./ui";

const LINKS = [
  { index: "01", label: "Work", href: "#work" },
  { index: "02", label: "About", href: "#about" },
  { index: "03", label: "Experience", href: "#experience" },
  { index: "04", label: "Skills", href: "#skills" },
  { index: "05", label: "Contact", href: "#contact" },
];

const SOCIALS = ["LinkedIn", "Behance", "Instagram", "YouTube"];

export default function Nav({
  loaded,
  theme,
  onToggle,
}: {
  loaded: boolean;
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 140 && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: loaded && !hidden ? 0 : hidden ? -110 : -80, opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="theme-pin fixed inset-x-0 top-0 z-[120] mix-blend-difference"
      >
        <div className="flex items-center justify-between px-5 py-5 text-cream md:px-10">
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-base font-semibold uppercase tracking-tight md:text-lg">
              Sumayya Mustafa
            </span>
          </a>

          <div className="flex items-center gap-3 md:gap-6">
            <a
              href="#work"
              className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60 lg:flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Open for projects
            </a>
            <button
              onClick={onToggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              className="grid h-8 w-8 place-items-center rounded-full border border-cream/40"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -60, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 60, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="grid place-items-center"
                >
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href="#contact"
              className="hidden rounded-full border border-cream/40 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-cream md:inline-block"
            >
              Let's Talk
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em]"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? "Close" : "Menu"}
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid h-8 w-8 place-items-center rounded-full border border-cream/40"
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-pin fixed inset-0 z-[110] flex flex-col justify-between bg-ink px-5 pb-8 pt-28 text-cream md:px-10"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: EASE_EXPO }}
          >
            <nav className="flex flex-col">
              {LINKS.map((l, i) => (
                <span key={l.href} className="block overflow-hidden border-b border-cream/10">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.35, delay: 0 } }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-3 md:gap-8 md:py-4"
                    >
                      <span className="font-display text-4xl font-medium uppercase leading-none tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-4 md:text-7xl">
                        {l.label}
                      </span>
                      <ArrowUpRight className="ml-auto h-7 w-7 self-center text-cream/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-accent md:h-11 md:w-11" />
                    </a>
                  </motion.span>
                </span>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">
                  Get in touch
                </p>
                <a
                  href="mailto:summiamustafa07@gmail.com"
                  className="mt-2 block font-serif text-2xl italic underline-offset-4 hover:underline md:text-3xl"
                >
                  summiamustafa07@gmail.com
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map((s) => (
                  <li key={s}>
                    <a
                      href="#contact"
                      onClick={() => setOpen(false)}
                      className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 transition-colors hover:text-accent"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
