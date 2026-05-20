"use client";

import { useEffect, useMemo, useState } from "react";

const particleColors = [
  "#FFF430",
  "#FFFFFF",
  "#C9A6FF",
  "#FF6AAE",
  "#5BCEFA",
  "#35E7D2"
];

/**
 * ParticlesBackground
 * Atmospheric layered scene used as the global ambient background.
 *
 * Performance strategy:
 *  - Render the cheap layers (radial blobs + vignette) on every device.
 *  - Render aurora animation + drifting particles + grain only on capable
 *    devices (no coarse pointer, no reduced-motion preference, viewport >=768).
 *  - All particles have NO animation (CPU/GPU expensive) and NO box-shadow
 *    glow on mobile. On desktop, particles only fade gently via opacity.
 *  - Background is fixed via CSS `background-attachment: fixed` so we don't
 *    re-paint on scroll.
 */
export default function ParticlesBackground() {
  const [richMode, setRichMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    setRichMode(!reduced && !coarse && !small);
  }, []);

  const particles = useMemo(() => {
    if (!richMode) return [];
    return Array.from({ length: 14 }, (_, index) => {
      const seed = index * 41 + 13;
      const left = (seed * 17) % 100;
      const top = (seed * 31) % 100;
      return {
        id: index,
        left: `${left}%`,
        top: `${top}%`,
        size: `${3 + (index % 3)}px`,
        color: particleColors[index % particleColors.length],
        opacity: 0.18 + (index % 4) * 0.06
      };
    });
  }, [richMode]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Static radial wash — cheap, paints once */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(124,63,203,0.18),transparent_60%)]" />

      {/* Soft accent blobs — static, no animation cost */}
      <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-pride-yellow/10 blur-3xl" />
      <div className="absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-pride-purple/20 blur-3xl" />
      <div className="absolute -bottom-44 left-[24%] h-[34rem] w-[34rem] rounded-full bg-pride-cyan/10 blur-3xl" />
      <div className="absolute right-[18%] top-[55%] h-72 w-72 rounded-full bg-pride-pink/10 blur-3xl" />

      {/* Animated aurora — only on capable devices */}
      {richMode ? <div className="aurora-layer" /> : null}

      {/* Static fine particles — only on capable devices */}
      {richMode
        ? particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: p.opacity
              }}
            />
          ))
        : null}

      {/* Cinematic vignette — cheap composite */}
      <div className="vignette" />

      {/* Grain — desktop only (turns into a heavy composite on mobile) */}
      {richMode ? <div className="grain-layer" /> : null}
    </div>
  );
}
