import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Works from "./components/Works";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import ProjectPage from "./components/ProjectPage";
import { getProject } from "./data/projects";

type Theme = "light" | "dark";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [route, setRoute] = useState<string>(() => window.location.hash);
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );

  /* apply + persist theme; brief theme-anim class = subtle sweep transition */
  const firstTheme = useRef(true);
  useEffect(() => {
    const root = document.documentElement;
    if (firstTheme.current) {
      firstTheme.current = false;
      root.dataset.theme = theme;
      return;
    }
    root.classList.add("theme-anim");
    root.dataset.theme = theme;
    try {
      localStorage.setItem("sm-theme", theme);
    } catch {}
    const t = window.setTimeout(() => root.classList.remove("theme-anim"), 480);
    return () => window.clearTimeout(t);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  const lenisRef = useRef<Lenis | null>(null);
  const pendingScroll = useRef<string | null>(null);

  /* Smooth scroll + hash routing + anchor handling */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;
    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash) return;

      /* route links (#/work/slug, #/) — let the hashchange listener handle them */
      if (hash.startsWith("#/")) return;

      e.preventDefault();
      if (window.location.hash.startsWith("#/")) {
        /* currently on a project page: go home first, then scroll */
        pendingScroll.current = hash;
        window.location.hash = "/";
      } else if (hash === "#top" || hash === "#" || hash === "#/") {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        /* resolve the section element explicitly — never silently no-op */
        const el = document.querySelector(hash);
        lenis.scrollTo(el ? (el as HTMLElement) : 0, { duration: 1.5 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const slug = route.match(/^#\/work\/(.+)$/)?.[1] ?? null;
  const project = slug ? getProject(slug) : null;

  /* scroll behavior on route change */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (slug) {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
    } else if (pendingScroll.current) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      setTimeout(() => {
        lenis?.scrollTo(target === "#top" ? 0 : target, { duration: 1.2 });
      }, 80);
    } else {
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [route, slug]);

  /* Lock scroll during preload */
  useEffect(() => {
    document.documentElement.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [loaded]);

  return (
    <div className="grain bg-cream text-ink">
      <Cursor />

      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Nav loaded={loaded} theme={theme} onToggle={toggleTheme} />

      {project ? (
        <ProjectPage key={project.slug} project={project} show={loaded} />
      ) : slug ? (
        /* unknown project slug — soft 404 */
        <main className="grid min-h-screen place-items-center bg-cream px-5 text-ink">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">
              404 — Project not found
            </p>
            <a
              href="#/"
              className="mt-6 inline-block font-display text-3xl font-semibold uppercase tracking-tight underline-offset-4 hover:text-accent md:text-5xl"
            >
              Back to all work
            </a>
          </div>
        </main>
      ) : (
        <>
          <main>
            <Hero loaded={loaded} />
            <Marquee
              dark
              items={[
                "Motion graphics",
                "Explainer videos",
                "3D animation",
                "Kinetic typography",
                "Visual storytelling",
                "Brand animation",
              ]}
            />
            <Works />
            <About />
            <Experience />
            <Skills />
          </main>

          <Marquee
            items={[
              "Have an idea worth moving?",
              "Let's talk",
              "I make ideas move",
              "Make it memorable",
            ]}
            duration={22}
          />
          <Footer />
        </>
      )}
    </div>
  );
}
