"use client";

import { useEffect, useRef, useState } from "react";
import Mascot from "@/components/Mascot";

const HEADLINE_WORDS = ["Você", "não", "precisa", "caber", "para"];
const HEADLINE_ACCENT = ["pertencer."];
const MARQUEE_PHRASES = [
  "Existir com verdade",
  "Pertencer sem pedir licença",
  "Cada pronome importa",
  "Pluralidade é cuidado",
  "Você não está sole",
  "Orgulho também é colo"
];

/**
 * Hero — minimal-cost editorial opening.
 *
 * Mobile optimisations:
 *  - No 100svh height in mobile (`min-h-auto`); content drives the size.
 *  - Mascot frame = aspect-square on mobile, 1:1.1 only at lg+.
 *  - Parallax pointer effect is desktop-only and rAF-throttled.
 *  - Marquee tape is desktop-only.
 *  - `content-visibility: auto` is added on the section via .cv-auto so the
 *    browser skips layout/paint when the hero is far from viewport.
 */
export default function Hero() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 1023px)").matches;
    setIsDesktop(!reduced && !coarse && !small);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const node = sceneRef.current;
    if (!node) return;

    let frame = 0;
    let pendingX = 0;
    let pendingY = 0;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      pendingX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pendingY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        node.style.setProperty("--mx", `${pendingX}`);
        node.style.setProperty("--my", `${pendingY}`);
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isDesktop]);

  return (
    <section
      id="inicio"
      ref={sceneRef}
      className="relative isolate scroll-mt-24 overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:pb-20 lg:pt-40"
      style={{ "--mx": "0", "--my": "0" } as React.CSSProperties}
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Text column */}
        <div
          className="relative"
          style={{
            transform: isDesktop
              ? "translate3d(calc(var(--mx) * -5px), calc(var(--my) * -3px), 0)"
              : undefined
          }}
        >
          <div className="kicker animate-revealUp">
            <span className="h-2 w-2 rounded-full bg-pride-yellow shadow-[0_0_10px_rgba(255,244,48,0.7)]" />
            Julho · presença, cuidado, orgulho
          </div>

          <h1 className="mt-6 font-display font-light leading-display tracking-editorial text-white text-fluid-display sm:mt-8">
            <span className="block text-pretty">
              {HEADLINE_WORDS.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  className="word-reveal mr-[0.28em]"
                  style={{ "--word-delay": idx } as React.CSSProperties}
                >
                  <span>{word}</span>
                </span>
              ))}
            </span>
            <span className="mt-1 block">
              {HEADLINE_ACCENT.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  className="word-reveal italic"
                  style={
                    {
                      "--word-delay": HEADLINE_WORDS.length + idx
                    } as React.CSSProperties
                  }
                >
                  <span className="text-gradient-pride">{word}</span>
                </span>
              ))}
            </span>
          </h1>

          <p
            className="mt-6 max-w-[58ch] text-fluid-base leading-editorial text-white/72 text-pretty animate-revealUp sm:text-fluid-lg sm:mt-8"
            style={{ animationDelay: "240ms" }}
          >
            Uma celebração digital para pessoas Não-Binárias e toda a comunidade
            LGBTQIA+. Arte, informação, acolhimento e pequenos lembretes de que
            <em className="italic-display text-white/85"> existir com verdade </em>
            é uma forma bonita de futuro.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row animate-revealUp"
            style={{ animationDelay: "360ms" }}
          >
            <a href="#nao-binario" className="btn-primary focus-ring">
              Entrar nesse abraço
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10m0 0L9 4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#bandeiras" className="btn-ghost focus-ring">
              Ver bandeiras
            </a>
          </div>

          <div
            className="mt-10 hidden flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.3em] text-white/40 animate-revealUp sm:flex"
            style={{ animationDelay: "480ms" }}
          >
            <span className="flex items-center gap-2">
              <span className="h-1 w-6 bg-pride-yellow" /> Acolhimento
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-6 bg-pride-purple" /> Educação
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-6 bg-pride-cyan" /> Comunidade
            </span>
          </div>
        </div>

        {/* Mascot column */}
        <div
          className="relative"
          style={{
            transform: isDesktop
              ? "translate3d(calc(var(--mx) * 8px), calc(var(--my) * 6px), 0)"
              : undefined
          }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[26rem] lg:aspect-[1/1.1] lg:max-w-[32rem]">
            {/* Backdrop disc */}
            <div
              aria-hidden="true"
              className="absolute inset-[12%] rounded-full bg-pride-purple/25 blur-3xl"
            />

            {/* Frame */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(13,9,24,0.65)] depth-soft sm:rounded-[2rem]">
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70 sm:left-5 sm:top-5">
                <span className="h-1.5 w-1.5 rounded-full bg-pride-yellow" />
                Companhia digital
              </div>
              <div className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-display text-[10px] italic text-white/70 sm:right-5 sm:top-5">
                v · 01
              </div>

              <div className="absolute inset-0 grid place-items-center">
                <Mascot />
              </div>

              {/* Caption */}
              <div className="absolute inset-x-4 bottom-4 rounded-[1rem] border border-white/10 bg-black/70 p-3.5 sm:inset-x-5 sm:bottom-5 sm:rounded-[1.2rem] sm:p-4">
                <p className="font-display text-sm italic leading-snug text-white/90 sm:text-base lg:text-lg">
                  &ldquo;Oi. Eu guardei um espaço seguro aqui para você
                  respirar.&rdquo;
                </p>
                <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-white/40">
                  · pequeno companheiro digital
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee tape — desktop only */}
      <div className="marquee-mask relative mx-auto mt-16 hidden max-w-7xl lg:block lg:mt-20">
        <div className="border-y border-white/10 bg-white/[0.02] py-4">
          <div className="marquee font-display text-sm uppercase tracking-[0.4em] text-white/60">
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex items-center gap-12">
                {MARQUEE_PHRASES.map((phrase) => (
                  <span key={`${group}-${phrase}`} className="flex items-center gap-12">
                    <span className="italic text-white/80">{phrase}</span>
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-pride-yellow" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
