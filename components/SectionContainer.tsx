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
  /** Renders without internal spacing wrapper */
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
      className={`relative scroll-mt-28 px-5 py-24 sm:px-8 lg:py-32 ${className}`}
    >
      <AnimatedSection className="relative mx-auto max-w-7xl">
        {/* Editorial header */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="stagger-child" style={{ "--stagger": 0 } as React.CSSProperties}>
            {index ? (
              <p className="mb-4 font-display text-sm italic text-white/40">
                Capítulo {index}
              </p>
            ) : null}
            {eyebrow ? (
              <p className="kicker">{eyebrow}</p>
            ) : null}
          </div>

          <div className="stagger-child" style={{ "--stagger": 1 } as React.CSSProperties}>
            <h2 className="font-display font-light leading-display tracking-editorial text-white text-fluid-3xl text-balance sm:text-fluid-4xl">
              {title}
            </h2>
            {hint ? (
              <p className="mt-3 font-display text-base italic text-white/55">
                {hint}
              </p>
            ) : null}
            {description ? (
              <p className="mt-5 max-w-[58ch] text-fluid-base leading-editorial text-white/70 text-pretty">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-14 hidden lg:block">
          <div className="divider-pride" />
        </div>

        <div className={bare ? "" : "stagger-child"} style={{ "--stagger": 2 } as React.CSSProperties}>
          {children}
        </div>
      </AnimatedSection>
    </section>
  );
}
