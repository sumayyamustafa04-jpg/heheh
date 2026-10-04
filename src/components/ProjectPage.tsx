import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FadeIn, Line, EASE } from "./ui";
import { VideoEmbed } from "./media";
import { getNextProject, type Project } from "../data/projects";

function Label({ children }: { children: string }) {
  return (
    <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/45">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export default function ProjectPage({
  project,
  show,
}: {
  project: Project;
  show: boolean;
}) {
  const next = getNextProject(project.slug);

  return (
    <motion.main
      key={project.slug}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="min-h-screen bg-cream px-5 pb-20 pt-24 text-ink md:px-10 md:pt-32"
    >
      {/* back */}
      <FadeIn y={12}>
        <a
          href="#/"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-400 group-hover:-translate-x-1" />
          All work
        </a>
      </FadeIn>

      {/* header */}
      <header className="mt-8 border-b border-ink/15 pb-8 md:mt-10 md:pb-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <FadeIn y={14}>
              <span className="inline-block rounded-full border border-accent/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {project.label}
              </span>
            </FadeIn>
            <h1 className="mt-6 font-display font-semibold uppercase leading-[0.95] tracking-[-0.02em]">
              <Line show={show} delay={0.1}>
                <span className="text-[clamp(2.2rem,6vw,5.25rem)]">{project.title}</span>
              </Line>
            </h1>
          </div>
          <FadeIn
            delay={0.2}
            className="flex flex-row gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 md:flex-col md:items-end md:gap-2 md:text-right"
          >
            <span>{project.category}</span>
            <span className="text-accent">{project.year}</span>
          </FadeIn>
        </div>
      </header>

      {/* project video */}
      <section className="mt-10 md:mt-14">
        <FadeIn>
          <Label>Project Video</Label>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative mx-auto mt-5 aspect-video w-full max-w-6xl overflow-hidden rounded-sm border border-ink/15 md:mt-6 md:w-[80%] lg:w-[76%] xl:w-[70%] 2xl:w-[68%]">
            <span className="theme-pin absolute inset-0 bg-ink" aria-hidden />
            <VideoEmbed url={project.videoUrl} title={project.title} />
          </div>
        </FadeIn>
      </section>

      {/* about + role */}
      <section className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <FadeIn>
            <Label>About the Project</Label>
          </FadeIn>
          {project.about.map((para, i) => (
            <FadeIn key={i} delay={0.08 * (i + 1)}>
              <p className="mt-6 text-base leading-relaxed text-ink/75 md:text-lg">
                {para}
              </p>
            </FadeIn>
          ))}
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <FadeIn delay={0.1}>
            <Label>My Role</Label>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="mt-6 text-sm leading-relaxed text-ink/70 md:text-base">
              {project.myRole}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* project information */}
      <section className="mt-12 md:mt-16">
        <FadeIn>
          <Label>Project Information</Label>
        </FadeIn>
        <FadeIn delay={0.08} className="mt-6">
          <dl className="grid grid-cols-2 border-t border-ink/15 md:grid-cols-3">
            {[
              { term: "Project", value: project.title },
              { term: "Type", value: project.type },
              { term: "Role", value: project.role },
              { term: "Client", value: project.client },
              { term: "Year", value: project.year },
              { term: "Tools", value: project.tools.join(", ") },
            ].map((f) => (
              <div key={f.term} className="border-b border-ink/15 py-6 pr-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  {f.term}
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug md:text-base">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </section>

      {/* next project */}
      <FadeIn className="mt-14 md:mt-20">
        <a
          href={`#/work/${next.slug}`}
          data-cursor="view"
          className="group flex items-center justify-between gap-6 border-t border-ink/15 pt-8 md:pt-10"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/45">
              Next project
            </span>
            <h3 className="mt-3 font-display text-3xl font-semibold uppercase leading-none tracking-tight transition-colors duration-500 group-hover:text-accent md:text-5xl">
              {next.title}
            </h3>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-cream md:h-16 md:w-16">
            <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
          </span>
        </a>
      </FadeIn>
    </motion.main>
  );
}
