"use client";

import { useEffect, useRef, useState } from "react";
import Mascot from "@/components/Mascot";

/**
 * Hero
 * Editorial cinematic opening scene.
 *
 * Mobile optimisations:
 *  - Container is `min-h-auto` on mobile and only goes full-height on >=lg
 *    (was 100svh, which made the page feel empty + forced extra scroll).
 *  - Mascot frame uses fixed aspect on desktop and a contained square on
 *    mobile (no awkward 1:1.1 stretching).
 *  - Parallax pointer effect and marquee tape only mount on desktop.
 *  - Vertical padding tuned per-breakpoint so chips/labels don't push more
 *    blank space on small screens.
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

  const headline = ["Você", "não", "precisa", "caber", "para"];
  const accent = ["pertencer."];

  return (
    <section
      id="inicio"
      ref={sceneRef}
      className="relative isolate scroll-mt-24 overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:min-h-[100svh] lg:pb-20 lg:pt-40"
      style={{ "--mx": "0", "--my": "0" } as React.CSSProperties}
    >
      {/* Editorial grid lines — desktop only (very subtle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.07] lg:block [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:7vw_100%]"
      />

      {/* Floating language chips — depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 hidden justify-between px-10 text-[10px] uppercase tracking-[0.42em] text-white/35 lg:flex"
      >
        <span>Brasil · 2026</span>
        <span>Vol. 01 — Mês do Orgulho</span>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Text column */}
        <div
          className="relative"
          style={{
            transform: isDesktop
              ? "translate3d(calc(var(--mx) * -6px), calc(var(--my) * -4px), 0)"
              : undefined
          }}
        >
          <div className="kicker animate-revealUp [animation-delay:120ms]">
            <span className="h-2 w-2 rounded-full bg-pride-yellow shadow-[0_0_14px_rgba(255,244,48,0.9)]" />
            Julho · presença, cuidado, orgulho
          </div>

          <h1 className="mt-6 font-display font-light leading-display tracking-editorial text-white text-fluid-display sm:mt-8">
            <span className="block text-pretty">
              {headline.map((word, idx) => (
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
              {accent.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  className="word-reveal italic"
                  style={
                    {
                      "--word-delay": headline.length + idx
                    } as React.CSSProperties
                  }
                >
                  <span className="text-gradient-pride">{word}</span>
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-6 max-w-[58ch] text-fluid-base leading-editorial text-white/72 text-pretty animate-revealUp [animation-delay:520ms] sm:text-fluid-lg sm:mt-8">
            Uma celebração digital para pessoas Não-Binárias e toda a comunidade
            LGBTQIA+. Arte, informação, acolhimento e pequenos lembretes de que
            <em className="italic-display text-white/85"> existir com verdade </em>
            é uma forma bonita de futuro.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-revealUp [animation-delay:680ms]">
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

          {/* Inline meta strip */}
          <div className="mt-10 hidden flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.3em] text-white/40 animate-revealUp [animation-delay:820ms] sm:flex">
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
              ? "translate3d(calc(var(--mx) * 10px), calc(var(--my) * 8px), 0)"
              : undefined
          }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[28rem] lg:aspect-[1/1.1] lg:max-w-[34rem]">
            {/* Backdrop disc */}
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-nonbinary-conic opacity-25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[18%] rounded-full bg-pride-purple/30 blur-3xl"
            />

            {/* Frame */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(13,9,24,0.55)] depth-soft sm:rounded-[2.4rem]">
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70 sm:left-5 sm:top-5">
                <span className="h-1.5 w-1.5 rounded-full bg-pride-yellow" />
                Companhia digital
              </div>
              <div className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-display text-[10px] italic text-white/70 sm:right-5 sm:top-5">
                v · 01
              </div>

              {/* Scanlines — desktop only */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden opacity-[0.05] lg:block [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.6)_0,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_4px)]"
              />

              <div className="absolute inset-0 grid place-items-center">
                <Mascot />
              </div>

              {/* Caption card */}
              <div className="absolute inset-x-4 bottom-4 rounded-[1.2rem] border border-white/10 bg-black/65 p-3.5 sm:inset-x-5 sm:bottom-5 sm:rounded-[1.4rem] sm:p-4">
                <p className="font-display text-sm italic leading-snug text-white/90 sm:text-base lg:text-lg">
                  &ldquo;Oi. Eu guardei um espaço seguro aqui para você
                  respirar.&rdquo;
                </p>
                <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-white/40">
                  · pequeno companheiro digital
                </div>
              </div>
            </div>

            {/* Floating chips — desktop only */}
            <div
              aria-hidden="true"
              className="absolute -left-6 top-12 hidden rotate-[-8deg] rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white/70 lg:block"
            >
              Você é bem vinde
            </div>
            <div
              aria-hidden="true"
              className="absolute -right-4 bottom-24 hidden rotate-[6deg] rounded-2xl border border-pride-yellow/40 bg-pride-yellow/10 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-pride-yellow lg:block"
            >
              Elu · Ile · Ela · Ele
            </div>
          </div>
        </div>
      </div>

      {/* Marquee tape — desktop only (too noisy + costly on mobile) */}
      <div className="marquee-mask relative mx-auto mt-16 hidden max-w-7xl lg:block lg:mt-20">
        <div className="border-y border-white/10 bg-white/[0.02] py-4">
          <div className="marquee font-display text-sm uppercase tracking-[0.4em] text-white/60">
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex items-center gap-12">
                {[
                  "Existir com verdade",
                  "Pertencer sem pedir licença",
                  "Cada pronome importa",
                  "Pluralidade é cuidado",
                  "Você não está sole",
                  "Orgulho também é colo"
                ].map((phrase) => (
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

      {/* Scroll cue — desktop only */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto hidden max-w-7xl items-center justify-center text-[10px] uppercase tracking-[0.4em] text-white/45 lg:flex">
        <span className="flex items-center gap-3">
          <span className="block h-6 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
          role para baixo
        </span>
      </div>
    </section>
  );
}
