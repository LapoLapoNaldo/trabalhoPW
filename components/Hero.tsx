"use client";

import { useEffect, useRef } from "react";
import Mascot from "@/components/Mascot";

/**
 * Hero
 * Editorial cinematic opening scene:
 *  - composição assimétrica em duas colunas (texto: 1.15fr · imagem: 0.85fr)
 *  - reveals por palavra na headline
 *  - parallax suave em pointermove (apenas em pointer fino)
 *  - tape com marquee de palavras emocionais
 *  - tipografia mista: serif italic display + sans editorial
 */
export default function Hero() {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const node = sceneRef.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      node.style.setProperty("--mx", `${x}`);
      node.style.setProperty("--my", `${y}`);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const headline = ["Você", "não", "precisa", "caber", "para"];
  const accent = ["pertencer."];

  return (
    <section
      id="inicio"
      ref={sceneRef}
      className="relative isolate min-h-[100svh] scroll-mt-24 overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pt-40"
      style={{ "--mx": "0", "--my": "0" } as React.CSSProperties}
    >
      {/* Editorial grid lines (very subtle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:7vw_100%]"
      />

      {/* Floating language chips — depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 hidden justify-between px-10 text-[10px] uppercase tracking-[0.42em] text-white/35 lg:flex"
      >
        <span>Brasil · 2026</span>
        <span>Vol. 01 — Mês do Orgulho</span>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text column */}
        <div
          className="relative"
          style={{
            transform:
              "translate3d(calc(var(--mx) * -6px), calc(var(--my) * -4px), 0)"
          }}
        >
          <div className="kicker animate-revealUp [animation-delay:120ms]">
            <span className="h-2 w-2 rounded-full bg-pride-yellow shadow-[0_0_14px_rgba(255,244,48,0.9)]" />
            Julho · presença, cuidado, orgulho
          </div>

          <h1 className="mt-8 font-display font-light leading-display tracking-editorial text-white text-fluid-display">
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
                  <span className="text-gradient-pride animate-shimmer">
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-8 max-w-[58ch] text-fluid-lg leading-editorial text-white/72 text-pretty animate-revealUp [animation-delay:520ms]">
            Uma celebração digital para pessoas Não-Binárias e toda a comunidade
            LGBTQIA+. Arte, informação, acolhimento e pequenos lembretes de que
            <em className="italic-display text-white/85"> existir com verdade </em>
            é uma forma bonita de futuro.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row animate-revealUp [animation-delay:680ms]">
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
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.3em] text-white/40 animate-revealUp [animation-delay:820ms]">
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
            transform:
              "translate3d(calc(var(--mx) * 10px), calc(var(--my) * 8px), 0)"
          }}
        >
          {/* Editorial frame */}
          <div className="relative mx-auto aspect-[1/1.1] w-full max-w-[34rem]">
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
            <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] border border-white/10 bg-[rgba(13,9,24,0.45)] backdrop-blur-xl depth-soft">
              {/* corner labels */}
              <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-pride-yellow animate-tickerLight" />
                Companhia digital
              </div>
              <div className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-display text-[10px] italic text-white/70">
                v · 01
              </div>

              {/* Subtle scanlines for tech-print feel */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.6)_0,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_4px)]"
              />

              <div className="absolute inset-0 grid place-items-center">
                <Mascot />
              </div>

              {/* Caption card */}
              <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
                <p className="font-display text-base italic leading-snug text-white/90 sm:text-lg">
                  &ldquo;Oi. Eu guardei um espaço seguro aqui para você
                  respirar.&rdquo;
                </p>
                <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-white/40">
                  · pequeno companheiro digital
                </div>
              </div>
            </div>

            {/* Floating chip */}
            <div
              aria-hidden="true"
              className="absolute -left-6 top-12 hidden rotate-[-8deg] rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-xl animate-float lg:block"
            >
              Você é bem vinde
            </div>
            <div
              aria-hidden="true"
              className="absolute -right-4 bottom-24 hidden rotate-[6deg] rounded-2xl border border-pride-yellow/40 bg-pride-yellow/10 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-pride-yellow backdrop-blur-xl animate-floatSubtle lg:block"
            >
              Elu · Ile · Ela · Ele
            </div>
          </div>
        </div>
      </div>

      {/* Marquee tape */}
      <div className="marquee-mask relative mx-auto mt-20 max-w-7xl">
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

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl items-center justify-center text-[10px] uppercase tracking-[0.4em] text-white/45">
        <span className="flex items-center gap-3">
          <span className="block h-6 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulseGlow" />
          role para baixo
        </span>
      </div>
    </section>
  );
}
