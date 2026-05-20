"use client";

import { useMemo } from "react";

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
 * Composed of:
 *  - aurora gradient layer (organic radial blobs, gently animated)
 *  - vignette to focus content
 *  - subtle film grain
 *  - rare floating particles with very low opacity
 *
 * No external libraries. Heavy work happens in CSS.
 */
export default function ParticlesBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => {
        const seed = index * 41 + 13;
        const left = (seed * 17) % 100;
        const top = (seed * 31) % 100;
        return {
          id: index,
          left: `${left}%`,
          top: `${top}%`,
          size: `${3 + (index % 4)}px`,
          color: particleColors[index % particleColors.length],
          x: `${index % 2 === 0 ? 30 + (index % 7) * 2 : -32 - (index % 7) * 2}px`,
          y: `${index % 3 === 0 ? -36 - (index % 5) * 2 : 30 + (index % 5) * 2}px`,
          duration: `${14 + (index % 8) * 2}s`,
          delay: `${(index % 6) * -1.4}s`,
          opacity: 0.18 + (index % 5) * 0.06
        };
      }),
    []
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(124,63,203,0.18),transparent_60%)]" />

      {/* Animated aurora cloud */}
      <div className="aurora-layer" />

      {/* Soft accent blobs */}
      <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-pride-yellow/10 blur-3xl animate-pulseGlow" />
      <div className="absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-pride-purple/20 blur-3xl animate-pulseGlow [animation-delay:-2s]" />
      <div className="absolute -bottom-44 left-[24%] h-[34rem] w-[34rem] rounded-full bg-pride-cyan/10 blur-3xl animate-pulseGlow [animation-delay:-4s]" />
      <div className="absolute right-[18%] top-[55%] h-72 w-72 rounded-full bg-pride-pink/10 blur-3xl animate-pulseGlow [animation-delay:-6s]" />

      {/* Floating fine particles */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full animate-drift"
          style={
            {
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 12px ${particle.color}`,
              opacity: particle.opacity,
              "--x": particle.x,
              "--y": particle.y,
              "--duration": particle.duration,
              animationDelay: particle.delay
            } as React.CSSProperties
          }
        />
      ))}

      {/* Cinematic vignette */}
      <div className="vignette" />

      {/* Subtle grain — barely perceivable, adds film texture */}
      <div className="grain-layer" />
    </div>
  );
}
