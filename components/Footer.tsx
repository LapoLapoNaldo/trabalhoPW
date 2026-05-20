import AnimatedSection from "@/components/AnimatedSection";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:pt-32">
      {/* Aurora glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[36rem] max-w-7xl rounded-[50%] bg-pride-purple/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-pride-yellow/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-32 h-72 w-72 rounded-full bg-pride-cyan/10 blur-3xl"
      />

      <AnimatedSection className="relative mx-auto max-w-7xl">
        {/* Closing emotional message */}
        <div className="text-center">
          <p className="kicker justify-center">um abraço de despedida</p>
          <p className="mx-auto mt-6 max-w-[24ch] text-balance font-display font-light leading-display tracking-editorial text-white text-fluid-2xl sm:mt-8 sm:text-fluid-3xl lg:text-fluid-4xl">
            Que essa página seja{" "}
            <em className="italic-display text-gradient-pride">um abraço</em>{" "}
            que te encontra sempre que precisar.
          </p>
        </div>

        {/* Pride flag stripes */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-full border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:mt-14">
          <div className="flex h-3">
            {[
              "#FFF430",
              "#FFFFFF",
              "#C9A6FF",
              "#9C59D1",
              "#FF6AAE",
              "#5BCEFA",
              "#35E7D2",
              "#000000"
            ].map((color, idx) => (
              <span
                key={`${color}-${idx}`}
                className="h-full flex-1"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Meta strip */}
        <div className="mt-12 grid items-center gap-6 border-t border-white/10 pt-8 text-sm text-white/55 sm:mt-16 sm:gap-8 sm:pt-10 lg:grid-cols-3">
          <div>
            <p className="font-display text-base text-white">
              Orgulho{" "}
              <em className="italic-display text-pride-yellow">Não-Binárie</em>
            </p>
            <p className="mt-2 max-w-md leading-relaxed text-pretty">
              Uma celebração digital criada com carinho real para pessoas
              LGBTQIA+ no Mês do Orgulho.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.32em] text-white/45 lg:justify-center">
            {[
              { label: "Início", href: "#inicio" },
              { label: "Bandeiras", href: "#bandeiras" },
              { label: "Apoio", href: "#apoio" }
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex justify-start lg:justify-end">
            <a
              href="#inicio"
              className="focus-ring group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white transition-all duration-500 ease-cinema hover:-translate-y-0.5 hover:border-pride-yellow/60 hover:bg-pride-yellow hover:text-black"
            >
              Voltar ao topo
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-500 ease-cinema group-hover:-translate-y-0.5"
              >
                <path
                  d="M8 13V3m0 0L4 7m4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-[0.42em] text-white/35">
          Feito com afeto · {new Date().getFullYear()}
        </p>
      </AnimatedSection>
    </footer>
  );
}
