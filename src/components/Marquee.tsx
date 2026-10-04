import { Asterisk } from "lucide-react";

export default function Marquee({
  items,
  dark = false,
  duration = 28,
  className = "",
}: {
  items: string[];
  dark?: boolean;
  duration?: number;
  className?: string;
}) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex w-max shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-display text-2xl font-medium uppercase tracking-tight md:px-10 md:text-4xl ${
              i % 2 === 1
                ? "font-serif normal-case italic tracking-normal"
                : ""
            }`}
          >
            {item}
          </span>
          <Asterisk
            className={`h-6 w-6 shrink-0 md:h-8 md:w-8 ${
              dark ? "text-accent" : "text-accent"
            }`}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y py-5 md:py-6 ${
        dark
          ? "theme-pin border-cream/15 bg-ink text-cream"
          : "border-ink/15 bg-cream text-ink"
      } ${className}`}
    >
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
