import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_EXPO } from "./ui";

const GREETINGS = [
  "HELLO",
  "BONJOUR",
  "CIAO",
  "HOLA",
  "OLÁ",
  "HALLO",
  "こんにちは",
  "WELCOME",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 7) + 3;
        if (next >= 100) {
          clearInterval(tick);
          return 100;
        }
        return next;
      });
    }, 110);

    const words = setInterval(
      () => setWordIndex((i) => (i + 1) % GREETINGS.length),
      260
    );
    return () => {
      clearInterval(tick);
      clearInterval(words);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(onDone, 650);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <motion.div
      className="theme-pin fixed inset-0 z-[250] flex flex-col justify-between bg-ink px-5 pb-5 pt-6 text-cream md:px-10 md:pb-8"
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: EASE_EXPO }}
    >
      <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
        <span>Sumayya Mustafa</span>
        <span>Folio © 2026</span>
      </div>

      <div className="flex items-center justify-center">
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="font-serif text-4xl italic text-cream md:text-6xl"
        >
          {GREETINGS[wordIndex]}
          <span className="not-italic text-accent">.</span>
        </motion.span>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
            Loading experience
          </span>
          <span className="font-display text-7xl font-semibold leading-none tabular-nums md:text-9xl">
            {progress}
            <span className="text-accent">%</span>
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-cream/15">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
