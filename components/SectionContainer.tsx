import AnimatedSection from "@/components/AnimatedSection";

type SectionContainerProps = {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Numbering displayed in the editorial header (e.g. "01") */
  index?: string;
  /** Hint phrase shown next to title in italic small caps */
  hint?: string;
  /** Renders without internal stagger wrapper */
  bare?: boolean;
};

export default function SectionContainer({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  index,
  hint,
  bare = false
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:py-28 ${className}`}
    >
      <AnimatedSection className="relative mx-auto max-w-7xl">
        {/* Editorial header — lean on mobile, full editorial layout on desktop */}
        <div className="mb-10 grid gap-4 sm:mb-12 lg:mb-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-8">
          <div className="stagger-child" style={{ "--stagger": 0 } as React.CSSProperties}>
            {index ? (
              <p className="mb-2 font-display text-xs italic text-white/40 sm:mb-3 sm:text-sm">
                Capítulo {index}
              </p>
            ) : null}
            {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
          </div>

          <div className="stagger-child" style={{ "--stagger": 1 } as React.CSSProperties}>
            <h2 className="font-display font-light leading-display tracking-editorial text-white text-fluid-3xl text-balance sm:text-fluid-4xl">
              {title}
            </h2>
            {hint ? (
              <p className="mt-2 font-display text-sm italic text-white/55 sm:mt-3 sm:text-base">
                {hint}
              </p>
            ) : null}
            {description ? (
              <p className="mt-4 max-w-[58ch] text-fluid-base leading-editorial text-white/70 text-pretty sm:mt-5">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {/* Divider — desktop only */}
        <div className="mb-12 hidden lg:mb-14 lg:block">
          <div className="divider-pride" />
        </div>

        <div
          className={bare ? "" : "stagger-child"}
          style={{ "--stagger": 2 } as React.CSSProperties}
        >
          {children}
        </div>
      </AnimatedSection>
    </section>
  );
}
