import { Play } from "lucide-react";
import { SectionTag, FadeIn } from "./ui";
import { YouTubeThumb, getYouTubeId } from "./media";
import {
  MOTION_PROJECTS,
  THREE_D_PROJECTS,
  type Project,
} from "../data/projects";

const CATEGORIES = [
  {
    index: "01",
    title: "Motion Graphics",
    tagline: "Turning messages into movement.",
    copy: "Corporate explainers, brand animation, kinetic typography, social motion, and animated assets — all designed to communicate clearly.",
    projects: MOTION_PROJECTS,
  },
  {
    index: "02",
    title: "3D Animation",
    tagline: "Building depth, dimension, and worlds in motion.",
    copy: "3D modeling, texturing, animation, product visualization, and creative experiments pushing form and light.",
    projects: THREE_D_PROJECTS,
  },
];

function Card({ project, index }: { project: Project; index: number }) {
  const yt = getYouTubeId(project.videoUrl);

  return (
    <FadeIn delay={(index % 2) * 0.08}>
      <a
        href={`#/work/${project.slug}`}
        data-cursor="view"
        className="group block"
        aria-label={`Open project: ${project.title}`}
      >
        {/* thumbnail — uniform 16:9 across all projects */}
        <div className="relative aspect-video overflow-hidden rounded-sm border border-ink/10">
          <span className="theme-pin absolute inset-0 bg-ink" aria-hidden />
          {yt && (
            <YouTubeThumb
              id={yt}
              alt={project.title}
              className="relative h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
            />
          )}
          <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
          <span className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="grid h-12 w-12 scale-75 place-items-center rounded-full bg-cream text-ink opacity-0 transition-all duration-500 ease-expo group-hover:scale-100 group-hover:opacity-100">
              <Play className="h-5 w-5 fill-current" />
            </span>
          </span>
        </div>

        {/* title below the thumbnail — nothing else */}
        <div className="mt-3">
          <h3 className="font-display text-lg font-medium uppercase leading-tight tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-1.5 md:text-xl">
            {project.title}
          </h3>
        </div>
      </a>
    </FadeIn>
  );
}

export default function Works() {
  return (
    <section id="work" className="relative px-5 py-20 md:px-10 md:py-32">
      <SectionTag index="01" label="Selected Work" />

      <FadeIn className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.4rem,6.5vw,6rem)] font-semibold uppercase leading-[0.9] tracking-tight">
          Selected{" "}
          <span className="font-serif font-normal normal-case italic tracking-normal text-accent">
            work
          </span>
        </h2>
        <p className="max-w-xs pb-3 text-sm leading-relaxed text-ink/60">
          Two disciplines, one obsession — client work, personal projects and
          experiments across 2D & 3D, 2024 to 2026.
        </p>
      </FadeIn>

      {CATEGORIES.map((cat) => (
        <div key={cat.title} className="mt-16 border-t border-ink/15 pt-8 md:mt-24 md:pt-12">
          {/* category header */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            <FadeIn className="md:col-span-7">
              <h3 className="mt-2 font-display text-[clamp(2rem,4.25vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-tight">
                {cat.title}
              </h3>
              <p className="mt-3 font-serif text-2xl italic text-accent md:text-3xl">
                {cat.tagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-4 md:col-start-9">
              <p className="text-sm leading-relaxed text-ink/60">{cat.copy}</p>
            </FadeIn>
          </div>

          {/* project previews */}
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
            {cat.projects.map((p, i) => (
              <Card key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
