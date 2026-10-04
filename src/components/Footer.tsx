import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Copy,
  Check,
  Phone,
} from "lucide-react";
import { SectionTag, FadeIn, Line, Magnetic } from "./ui";

const EMAIL = "summiamustafa07@gmail.com";
const PHONE = "+92 332 5454340";
const PHONE_HREF = "tel:+923325454340";
const TOPICS = [
  "Motion Graphics",
  "3D Animation",
  "Explainer Video",
  "Social Media Content",
  "Other",
];

const FOOTER_NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [inView, setInView] = useState(false);

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Karachi",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project — ${topic} (from ${name || "portfolio"})`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${from}\nLooking for: ${topic}\n\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <footer
      id="contact"
      className="theme-pin relative overflow-hidden bg-ink px-5 pt-20 text-cream md:px-10 md:pt-32"
    >
      {/* glow */}
      <span className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" />

      <SectionTag index="06" label="Contact" dark />

      <motion.div
        onViewportEnter={() => setInView(true)}
        viewport={{ once: true, margin: "-15% 0px" }}
        className="mt-14 md:mt-20"
      >
        <Line show={inView}>
          <span className="font-serif text-[clamp(1.6rem,4vw,3.4rem)] italic text-cream/70">
            Have an idea worth moving?
          </span>
        </Line>
        <a href={`mailto:${EMAIL}`} className="group mt-2 block w-max max-w-full">
          <Line show={inView} delay={0.12}>
            <span className="text-stroke-cream font-display text-[clamp(2.5rem,8.75vw,8.75rem)] font-semibold uppercase leading-[0.95] tracking-tight transition-colors duration-700 ease-expo group-hover:text-cream">
              Let's talk
            </span>
          </Line>
          <Line show={inView} delay={0.22}>
            <span className="flex items-center gap-4 font-display text-[clamp(1.6rem,5vw,4.5rem)] font-medium uppercase leading-tight tracking-tight text-accent md:gap-8">
              Make it move
              <ArrowUpRight
                className="h-[0.75em] w-[0.75em] transition-transform duration-500 ease-expo group-hover:rotate-45"
                strokeWidth={2.2}
              />
            </span>
          </Line>
        </a>
      </motion.div>

      {/* form + details */}
      <div className="mt-14 grid grid-cols-1 gap-14 border-t border-cream/15 pt-10 md:mt-20 md:grid-cols-12 md:pt-14">
        <div className="md:col-span-5">
          <FadeIn>
            <p className="max-w-sm text-base leading-relaxed text-cream/70 md:text-lg">
              Let's turn it into something people remember.
            </p>
          </FadeIn>

          <div className="mt-10 space-y-6">
            <FadeIn delay={0.05}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">
                Email
              </p>
              <Magnetic strength={0.2} className="mt-2">
                <button
                  onClick={copy}
                  className="group flex items-center gap-3 rounded-full border border-cream/25 px-6 py-3 font-mono text-xs tracking-[0.12em] transition-colors duration-400 hover:border-accent hover:bg-accent"
                >
                  {EMAIL}
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
                  )}
                  <span className="sr-only">Copy email address</span>
                </button>
              </Magnetic>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">
                Phone
              </p>
              <a
                href={PHONE_HREF}
                className="mt-2 inline-flex items-center gap-3 font-display text-xl font-medium tracking-tight underline-offset-4 transition-colors hover:text-accent md:text-2xl"
              >
                <Phone className="h-4 w-4 text-accent" />
                {PHONE}
              </a>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">
                Location / Local time
              </p>
              <p className="mt-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Islamabad — Rawalpindi, PK —{" "}
                <span className="tabular-nums text-cream/85">{time}</span>
              </p>
            </FadeIn>
          </div>
        </div>

        {/* form */}
        <FadeIn delay={0.1} className="md:col-span-6 md:col-start-7">
          <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/45">
                  Name
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-none border-b border-cream/20 bg-transparent py-3 text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/45">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="you@studio.com"
                  className="mt-2 w-full rounded-none border-b border-cream/20 bg-transparent py-3 text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-accent"
                />
              </label>
            </div>

            <label className="relative block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/45">
                What are you looking for?
              </span>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full appearance-none rounded-none border-b border-cream/20 bg-transparent py-3 text-cream outline-none transition-colors focus:border-accent"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t} className="bg-ink text-cream">
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute bottom-4 right-1 h-4 w-4 text-cream/50" />
            </label>

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/45">
                Tell me a little about your project
              </span>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Goals, timeline, references — anything helps."
                className="mt-2 w-full resize-none rounded-none border-b border-cream/20 bg-transparent py-3 text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-accent"
              />
            </label>

            <div className="flex flex-wrap items-center gap-5">
              <Magnetic strength={0.25}>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors duration-400 hover:bg-accent hover:text-cream"
                >
                  Start a Conversation
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:rotate-45" />
                </button>
              </Magnetic>
            </div>
          </form>
        </FadeIn>
      </div>

      {/* identity strip */}
      <FadeIn className="mt-16 flex flex-col gap-3 border-t border-cream/15 pt-8 md:mt-24">
        <span className="font-display text-2xl font-semibold uppercase tracking-tight md:text-3xl">
          Sumayya Mustafa
        </span>
        <span className="font-serif text-lg italic text-cream/60">
          Motion Graphics Animator
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
          Motion, design & visual storytelling.
        </span>
      </FadeIn>

      {/* footer nav */}
      <div className="mt-12 grid grid-cols-2 border-t border-cream/15 md:grid-cols-4">
        {FOOTER_NAV.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            className={`group flex items-center justify-between gap-2 px-4 py-6 transition-colors duration-500 hover:bg-cream hover:text-ink md:px-5 ${
              i !== 0 ? "md:border-l md:border-cream/15" : ""
            }`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
              {l.label}
            </span>
            <ArrowUpRight className="h-4 w-4 opacity-40 transition-all duration-400 group-hover:rotate-45 group-hover:text-accent group-hover:opacity-100" />
          </a>
        ))}
      </div>

      {/* bottom bar */}
      <div className="flex flex-col items-start justify-between gap-4 border-t border-cream/15 py-7 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 md:flex-row md:items-center">
        <span>© 2026 Sumayya Mustafa. All rights reserved.</span>
        <span className="hidden md:block">Islamabad — Rawalpindi / Pakistan</span>
        <Magnetic strength={0.3}>
          <a
            href="#top"
            className="group flex items-center gap-2 text-cream/70 transition-colors hover:text-accent"
            aria-label="Back to top"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/25 transition-colors duration-400 group-hover:border-accent group-hover:bg-accent group-hover:text-cream">
              <ArrowUp className="h-4 w-4 transition-transform duration-400 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
