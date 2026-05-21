type Accent = "yellow" | "purple" | "cyan" | "pink" | "blue" | "orange";

const accentMap: Record<
  Accent,
  { rgb: string; ring: string; chip: string; chipText: string; text: string }
> = {
  yellow: {
    rgb: "255,244,48",
    ring: "rgba(255,244,48,0.4)",
    chip: "bg-pride-yellow",
    chipText: "text-black",
    text: "text-pride-yellow"
  },
  purple: {
    rgb: "156,89,209",
    ring: "rgba(156,89,209,0.45)",
    chip: "bg-pride-purple",
    chipText: "text-white",
    text: "text-pride-lilac"
  },
  cyan: {
    rgb: "53,231,210",
    ring: "rgba(53,231,210,0.4)",
    chip: "bg-pride-cyan",
    chipText: "text-black",
    text: "text-pride-cyan"
  },
  pink: {
    rgb: "255,106,174",
    ring: "rgba(255,106,174,0.4)",
    chip: "bg-pride-pink",
    chipText: "text-black",
    text: "text-pride-pink"
  },
  blue: {
    rgb: "91,206,250",
    ring: "rgba(91,206,250,0.4)",
    chip: "bg-pride-blue",
    chipText: "text-black",
    text: "text-pride-blue"
  },
  orange: {
    rgb: "255,159,69",
    ring: "rgba(255,159,69,0.4)",
    chip: "bg-pride-orange",
    chipText: "text-black",
    text: "text-pride-orange"
  }
};

type InfoCardProps = {
  eyebrow?: string;
  title: string;
  body: string;
  accent?: Accent;
  /** Visual size variant for editorial layouts */
  size?: "default" | "tall" | "wide";
  /** Numbered marker like "01" displayed at top */
  index?: string;
};

export function InfoCard({
  eyebrow,
  title,
  body,
  accent = "purple",
  size = "default",
  index
}: InfoCardProps) {
  const tone = accentMap[accent];

  const sizeClass =
    size === "tall"
      ? "min-h-[16rem] sm:min-h-[20rem]"
      : size === "wide"
        ? "min-h-[12rem] sm:min-h-[14rem]"
        : "min-h-[14rem] sm:min-h-[18rem]";

  return (
    <article
      className={`card-premium card-glow ${sizeClass} flex flex-col justify-between p-6 sm:p-8`}
      style={{ "--accent": tone.rgb } as React.CSSProperties}
    >
      <header className="flex items-start justify-between gap-4">
        <div
          className={`inline-flex items-center gap-2 rounded-full ${tone.chip} ${tone.chipText} px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em]`}
        >
          <span className="h-1 w-1 rounded-full bg-current" />
          {eyebrow}
        </div>
        {index ? (
          <span className="font-display text-xs italic text-white/40">
            {index}
          </span>
        ) : null}
      </header>

      <div className="mt-6 sm:mt-10">
        <h3 className="font-display text-xl font-light leading-tight tracking-editorial text-white sm:text-2xl lg:text-[1.7rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-[52ch] leading-relaxed text-white/72 text-pretty sm:mt-4">
          {body}
        </p>
      </div>

      {/* Bottom hairline accent */}
      <div className="mt-6 flex items-center justify-between sm:mt-8">
        <span
          className={`block h-px w-16 bg-gradient-to-r from-transparent ${tone.text} to-transparent opacity-60`}
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`opacity-50 transition-opacity duration-500 group-hover:opacity-100 ${tone.text}`}
        >
          <path
            d="M4 10h12m0 0L11 5m5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
}

type ResourceCardProps = {
  title: string;
  body: string;
  href: string;
  label: string;
};

export function ResourceCard({ title, body, href, label }: ResourceCardProps) {
  return (
    <article className="card-premium flex h-full flex-col justify-between p-6 sm:p-8">
      <div>
        <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/45 sm:mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-pride-pink" />
          rede de apoio
        </div>
        <h3 className="font-display text-[1.4rem] font-light leading-tight tracking-editorial text-white sm:text-[1.6rem]">
          {title}
        </h3>
        <p className="mt-3 leading-relaxed text-white/70 text-pretty">{body}</p>
      </div>
      <a
        className="focus-ring group/link mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-500 ease-cinema hover:-translate-y-0.5 hover:border-pride-yellow/60 hover:bg-pride-yellow hover:text-black sm:mt-8"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${label}: ${title}`}
      >
        <span>{label}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-500 ease-cinema group-hover/link:translate-x-1"
        >
          <path
            d="M3 8h10m0 0L9 4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
}
