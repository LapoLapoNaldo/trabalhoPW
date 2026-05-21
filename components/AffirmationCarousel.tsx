"use client";

import { useEffect, useState } from "react";
import { affirmations } from "@/components/data";
import SectionContainer from "@/components/SectionContainer";

/**
 * AffirmationCarousel — single-element rotator.
 *
 * Performance:
 *  - Renders only ONE phrase at a time (was rendering all six and crossfading,
 *    which forced the browser to layout/paint everything).
 *  - Cross-fade is a cheap CSS transition on opacity only.
 *  - Auto-rotation paused via document.visibilityState + IntersectionObserver
 *    (so the timer doesn't run when the section is off-screen or in another tab).
 *  - The two big blurred ambient blobs are now static (no pulseGlow loop).
 */
export default function AffirmationCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof document === "undefined") return;
    if (document.visibilityState === "hidden") return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % affirmations.length);
    }, 7000);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        window.clearInterval(id);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
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
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(15,10,28,0.78)] p-6 sm:rounded-[2.5rem] sm:p-12 lg:p-16"
        aria-roledescription="carrossel"
        aria-label="Frases acolhedoras"
      >
        {/* Static ambient blobs — desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 hidden h-72 w-72 rounded-full bg-pride-pink/15 blur-3xl lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 hidden h-72 w-72 rounded-full bg-pride-purple/25 blur-3xl lg:block"
        />

        {/* Big quote glyph */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-2 font-display text-[8rem] leading-none text-white/[0.05] sm:left-10 sm:top-4 sm:text-[12rem]"
        >
          &ldquo;
        </div>

        {/* Single phrase, key-rotated for crossfade-in */}
        <div className="relative min-h-[180px] sm:min-h-[260px] lg:min-h-[320px]">
          <p
            key={active}
            className="absolute inset-0 flex items-center text-balance font-display font-light leading-display tracking-editorial text-white text-fluid-2xl animate-revealUp sm:text-fluid-3xl lg:text-fluid-4xl"
          >
            <span>
              <em className="italic-display text-pride-yellow/90">&ldquo;</em>
              {affirmations[active]}
              <em className="italic-display text-pride-yellow/90">&rdquo;</em>
            </span>
          </p>
        </div>

        {/* Controls */}
        <div className="relative mt-8 flex flex-col items-start justify-between gap-5 sm:mt-10 sm:flex-row sm:items-center">
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
                  className={`focus-ring h-1 rounded-full transition-all duration-300 ease-cinema ${
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
              className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors duration-300 ease-cinema hover:border-white/30 hover:bg-white/[0.08]"
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
              className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-pride-yellow text-black transition-colors duration-300 ease-cinema hover:bg-white"
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
      </div>
    </SectionContainer>
  );
}
