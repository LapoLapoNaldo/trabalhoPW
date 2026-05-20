"use client";

import { useEffect, useRef, useState } from "react";
import { affirmations } from "@/components/data";
import SectionContainer from "@/components/SectionContainer";

export default function AffirmationCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % affirmations.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const previous = () =>
    setActive((current) => (current - 1 + affirmations.length) % affirmations.length);
  const next = () =>
    setActive((current) => (current + 1) % affirmations.length);

  return (
    <SectionContainer
      id="frases"
      index="03"
      eyebrow="Lembretes para voltar ao corpo"
      title={
        <>
          Frases para{" "}
          <em className="italic-display text-gradient-pride">respirar fundo.</em>
        </>
      }
      hint="Mensagens curtas para quando o mundo parece barulhento demais."
    >
      <div
        ref={containerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-[rgba(15,10,28,0.55)] p-7 backdrop-blur-2xl sm:p-12 lg:p-16"
        aria-roledescription="carrossel"
        aria-label="Frases acolhedoras"
      >
        {/* Atmospheric glows that drift subtly */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-pride-pink/20 blur-3xl animate-pulseGlow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-pride-purple/30 blur-3xl animate-pulseGlow [animation-delay:-2s]"
        />

        {/* Quote mark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-2 font-display text-[10rem] leading-none text-white/[0.06] sm:left-10 sm:top-4 sm:text-[14rem]"
        >
          &ldquo;
        </div>

        {/* Floating phrase stack — each phrase is rendered then crossfaded */}
        <div className="relative min-h-[260px] sm:min-h-[300px] lg:min-h-[360px]">
          {affirmations.map((phrase, index) => {
            const isActive = index === active;
            return (
              <p
                key={phrase}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex items-center text-balance font-display font-light leading-display tracking-editorial text-white transition-all duration-1000 ease-cinema text-fluid-2xl sm:text-fluid-3xl lg:text-fluid-4xl ${
                  isActive
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-6 blur-md pointer-events-none"
                }`}
              >
                <span>
                  <em className="italic-display text-pride-yellow/90">&ldquo;</em>
                  {phrase}
                  <em className="italic-display text-pride-yellow/90">&rdquo;</em>
                </span>
              </p>
            );
          })}
        </div>

        {/* Controls */}
        <div className="relative mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3" role="tablist" aria-label="Selecionar frase">
            <span className="font-display text-xs italic text-white/45">
              {String(active + 1).padStart(2, "0")} / {String(affirmations.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              {affirmations.map((phrase, index) => (
                <button
                  key={phrase}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-label={`Mostrar frase ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`focus-ring h-1 rounded-full transition-all duration-500 ease-cinema ${
                    active === index
                      ? "w-10 bg-pride-yellow"
                      : "w-4 bg-white/25 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={previous}
              className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all duration-500 ease-cinema hover:-translate-x-0.5 hover:border-white/30 hover:bg-white/[0.08]"
              aria-label="Frase anterior"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M13 8H3m0 0 4-4m-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-pride-yellow text-black transition-all duration-500 ease-cinema hover:translate-x-0.5 hover:bg-white"
              aria-label="Próxima frase"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10m0 0L9 4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Hairline base */}
        <div className="divider-pride absolute inset-x-12 bottom-0 hidden lg:block" />
      </div>
    </SectionContainer>
  );
}
