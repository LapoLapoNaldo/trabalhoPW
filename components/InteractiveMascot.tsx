"use client";

import { useState } from "react";
import { mascotMessages } from "@/components/data";
import Mascot from "@/components/Mascot";
import SectionContainer from "@/components/SectionContainer";

export default function InteractiveMascot() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [pulse, setPulse] = useState(0);

  const react = () => {
    setMessageIndex((current) => (current + 1) % mascotMessages.length);
    setPulse((value) => value + 1);
  };

  return (
    <SectionContainer
      id="mascote"
      index="06"
      eyebrow="Pequeno companheiro digital"
      title={
        <>
          Toque ou clique para receber{" "}
          <em className="italic-display text-gradient-pride">um lembrete.</em>
        </>
      }
      hint="Cada toque entrega uma frase nova de cuidado."
      className="pb-20 sm:pb-28 lg:pb-32"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        {/* Mascot stage */}
        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[28rem]">
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-nonbinary-conic opacity-25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[18%] rounded-full bg-pride-purple/30 blur-3xl"
            />
            <div className="absolute inset-0 grid place-items-center">
              <Mascot compact onClick={react} label="Receber mensagem do mascote" />
              {pulse > 0 ? (
                <span
                  key={pulse}
                  aria-hidden="true"
                  className="pointer-events-none absolute h-56 w-56 rounded-full border-2 border-pride-yellow/70 animate-ringExpand sm:h-64 sm:w-64"
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Speech bubble */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(15,10,28,0.7)] p-6 sm:rounded-[2.4rem] sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-pride-yellow/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-pride-purple/30 blur-3xl"
            />

            <span
              aria-hidden="true"
              className="absolute -left-3 top-12 hidden h-6 w-6 rotate-45 border-b border-l border-white/10 bg-[rgba(15,10,28,0.7)] lg:block"
            />

            <div className="relative">
              <p className="kicker mb-5 sm:mb-6">Recado de boas-vindas</p>
              <p
                key={messageIndex}
                className="font-display text-2xl font-light leading-tight tracking-editorial text-white animate-revealUp sm:text-3xl lg:text-[2.6rem]"
              >
                <em className="italic-display text-pride-yellow/85">&ldquo;</em>
                {mascotMessages[messageIndex]}
                <em className="italic-display text-pride-yellow/85">&rdquo;</em>
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 sm:mt-9">
                <button
                  type="button"
                  onClick={react}
                  className="btn-primary focus-ring"
                >
                  Mais uma mensagem
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10m0 0L9 4m4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <span className="font-display text-xs italic text-white/45">
                  {String(messageIndex + 1).padStart(2, "0")} /{" "}
                  {String(mascotMessages.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
