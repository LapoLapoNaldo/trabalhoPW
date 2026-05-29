"use client";

import { memo, useCallback, useState } from "react";
import { flags, type FlagInfo } from "@/components/data";
import Modal from "@/components/Modal";
import SectionContainer from "@/components/SectionContainer";

function FlagStripes({ flag, rounded = "rounded-2xl" }: { flag: FlagInfo; rounded?: string }) {
  return (
    <div
      className={`relative ${rounded} overflow-hidden border border-white/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]`}
      aria-hidden="true"
    >
      <div className="flex flex-col">
        {flag.colors.map((color, index) => (
          <div
            key={`${flag.name}-${color.hex}-${index}`}
            className="h-7"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      {/* Subtle sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/30" />
    </div>
  );
}

const FlagCard = memo(function FlagCard({
  flag,
  onOpen,
  index
}: {
  flag: FlagInfo;
  onOpen: (flag: FlagInfo) => void;
  index: number;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(flag)}
      aria-label={`Abrir detalhes da bandeira ${flag.name}`}
      className="flag-card card-premium group relative flex flex-col gap-5 p-5 text-left sm:gap-6 sm:p-6"
      style={{ "--accent": "255,244,48" } as React.CSSProperties}
    >
      {/* Top meta */}
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/45">
        <span className="font-display italic text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>Bandeira</span>
      </div>

      {/* Flag preview with shine */}
      <div className="relative">
        <FlagStripes flag={flag} />
        {/* Shimmer hover overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 ease-cinema group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/15 to-transparent [mask-image:linear-gradient(110deg,transparent_30%,black_50%,transparent_70%)]" />
        </div>
      </div>

      {/* Bottom block */}
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[1.5rem] font-light leading-tight tracking-editorial text-white">
            {flag.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65 text-pretty">
            {flag.meaning}
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] font-display text-[11px] italic text-white/85 transition-all duration-500 ease-cinema group-hover:border-pride-yellow/60 group-hover:bg-pride-yellow group-hover:text-black">
          {flag.short}
        </span>
      </div>

      {/* Hover indicator */}
      <span className="pointer-events-none absolute inset-x-6 bottom-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white/0 transition-colors duration-500 group-hover:text-pride-yellow">
        Abrir significado
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10m0 0L9 4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
});

const FlagGrid = memo(function FlagGrid({
  onOpen
}: {
  onOpen: (flag: FlagInfo) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {flags.map((flag, index) => (
        <FlagCard key={flag.name} flag={flag} index={index} onOpen={onOpen} />
      ))}
    </div>
  );
});

export default function FlagGallery() {
  const [selected, setSelected] = useState<FlagInfo | null>(null);
  const openFlag = useCallback((flag: FlagInfo) => setSelected(flag), []);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <SectionContainer
      id="bandeiras"
      index="02"
      eyebrow="Símbolos que abraçam"
      title={
        <>
          Bandeiras que{" "}
          <em className="italic-display text-gradient-pride">contam histórias.</em>
        </>
      }
      hint="Toque ou navegue com Tab para abrir os significados."
      description="Cada cor carrega memória, afeto e luta. Coleção curada das bandeiras mais visíveis da comunidade LGBTQIA+."
      className="bg-white/[0.015]"
    >
      <FlagGrid onOpen={openFlag} />

      {selected ? (
        <Modal title={`Bandeira ${selected.name}`} onClose={closeModal}>
          <div className="grid gap-7 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <FlagStripes flag={selected} rounded="rounded-3xl" />
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/45">
                <span>Símbolo</span>
                <span className="font-display italic text-white/70">{selected.short}</span>
              </div>
            </div>

            <div>
              <p className="font-display text-2xl italic leading-snug text-white sm:text-3xl">
                &ldquo;{selected.meaning}&rdquo;
              </p>
              <div className="mt-6 grid gap-3">
                {selected.colors.map((color, index) => (
                  <div
                    key={`${color.label}-${index}`}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-500 hover:bg-white/[0.07]"
                  >
                    <span
                      className="mt-1 h-7 w-7 shrink-0 rounded-full border border-white/25 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)]"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <div className="leading-relaxed text-white/80">
                      <p className="font-medium text-white">{color.label}</p>
                      <p className="text-sm text-white/65">{color.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </SectionContainer>
  );
}
