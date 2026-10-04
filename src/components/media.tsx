import { useEffect, useState } from "react";
import { Play } from "lucide-react";

/* ---------------- video URL parsing ---------------- */

export function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  const m = "https://youtu.be/RdmEhovX_Dc?si=iKa_eUmD91CboqLT".match(
    /(?:youtube\.com\/(?:watch\?[^]*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/
  );
  return m ? m[1] : null;
}

export function getVimeoId(url?: string | null): string | null {
  if (!url) return null;
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

/* ---------------- YouTube thumbnail with size fallback ---------------- */

const THUMB_SIZES = ["maxresdefault", "sddefault", "hqdefault"] as const;
const thumbUrl = (id: string, step: number) =>
  `https://i.ytimg.com/vi/${id}/${THUMB_SIZES[step]}.jpg`;

/**
 * Remembers the best-working quality index per video id for the session,
 * so remounts (home → project → home) render the resolved size instantly
 * instead of re-probing through cached 404s.
 */
const resolvedThumbs = new Map<string, number>();

export function YouTubeThumb({
  id,
  alt,
  className = "",
}: {
  id: string;
  alt: string;
  className?: string;
}) {
  const [step, setStep] = useState(() => resolvedThumbs.get(id) ?? 0);

  /* reset if the component is reused with a different video id */
  useEffect(() => {
    setStep(resolvedThumbs.get(id) ?? 0);
  }, [id]);

  const advance = () =>
    setStep((s) => Math.min(s + 1, THUMB_SIZES.length - 1));

  return (
    <img
      /* remount per candidate: forces a fresh request instead of
         reusing the browser's cached error response */
      key={`${id}-${step}`}
      src={thumbUrl(id, step)}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={advance}
      onLoad={(e) => {
        /* YouTube returns HTTP 200 with a 120x90 gray placeholder for
           sizes a video doesn't have — treat it as a miss, not a hit */
        if (e.currentTarget.naturalWidth <= 120) {
          advance();
        } else {
          resolvedThumbs.set(id, step);
        }
      }}
      className={className}
    />
  );
}

/* ---------------- universal video embed ---------------- */

export function VideoEmbed({ url, title }: { url?: string; title: string }) {
  const yt = getYouTubeId(url);
  if (yt) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0&color=white`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="relative h-full w-full"
      />
    );
  }

  const vm = getVimeoId(url);
  if (vm) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vm}?title=0&byline=0&portrait=0`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="relative h-full w-full"
      />
    );
  }

  if (url) {
    /* direct MP4 / WebM / cloud-hosted video */
    return (
      <video src={url} controls preload="metadata" className="relative h-full w-full" />
    );
  }

  return (
    <div className="theme-pin flex h-full w-full flex-col items-center justify-center gap-4 text-cream/50">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-cream/20">
        <Play className="h-5 w-5" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
        Video coming soon
      </span>
    </div>
  );
}
