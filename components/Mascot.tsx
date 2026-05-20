"use client";

import { useEffect, useRef, useState } from "react";

type MascotProps = {
  compact?: boolean;
  onClick?: () => void;
  label?: string;
  /** When true, eyes follow pointer (only on fine pointers). Default: true */
  reactive?: boolean;
};

/**
 * Mascot
 * Friendly companion character.
 *
 * Performance:
 *  - Eye-tracking only registers on pointer-fine + non-reduced-motion.
 *  - Pointer movement is throttled via requestAnimationFrame.
 *  - The expensive conic halo is hidden on small/touch screens via CSS.
 *  - Idle animations (floatSubtle, breathe, blink, wave, heartbeat) are
 *    cheap CSS keyframes; they auto-pause via prefers-reduced-motion.
 */
export default function Mascot({
  compact = false,
  onClick,
  label = "Mascote de apoio",
  reactive = true
}: MascotProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const eyeRef = useRef<SVGGElement | null>(null);
  const [trackEyes, setTrackEyes] = useState(false);

  useEffect(() => {
    if (!reactive) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setTrackEyes(true);
  }, [reactive]);

  useEffect(() => {
    if (!trackEyes) return;
    const node = wrapRef.current;
    const eye = eyeRef.current;
    if (!node || !eye) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const max = 6;
      const distance = Math.hypot(dx, dy) || 1;
      const factor = Math.min(1, distance / 280);
      nextX = (dx / distance) * max * factor;
      nextY = (dy / distance) * max * factor;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        eye.style.transform = `translate(${nextX}px, ${nextY}px)`;
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [trackEyes]);

  const size = compact
    ? "h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64"
    : "h-[18rem] w-[18rem] sm:h-[22rem] sm:w-[22rem] lg:h-[26rem] lg:w-[26rem]";

  const Wrapper = (onClick ? "button" : "div") as React.ElementType;

  return (
    <Wrapper
      ref={wrapRef}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-label={onClick ? label : undefined}
      className={`focus-ring group relative mx-auto block ${size} animate-floatSubtle rounded-full`}
    >
      {/* Conic halo — hidden on touch via .halo-conic media query in globals.css */}
      <span
        aria-hidden="true"
        className="halo-conic pointer-events-none absolute inset-[-8%] rounded-full opacity-70 blur-2xl animate-breathe"
      />

      {/* Soft inner ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full border border-white/10 bg-white/[0.02]"
      />

      <svg
        viewBox="0 0 340 340"
        className="relative h-full w-full drop-shadow-[0_30px_70px_rgba(124,63,203,0.4)]"
        role="img"
        aria-label="Companhia digital amigável acenando"
      >
        <defs>
          <radialGradient id="mascotLight" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFF6B0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9C59D1" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="mascotBody" x1="80" x2="260" y1="80" y2="290" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.42" stopColor="#FFF430" />
            <stop offset="1" stopColor="#9C59D1" />
          </linearGradient>
          <radialGradient id="mascotScreen" cx="50%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#1F1338" />
            <stop offset="100%" stopColor="#050307" />
          </radialGradient>
          <linearGradient id="mascotEdge" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Ambient bubble */}
        <circle cx="170" cy="180" r="138" fill="url(#mascotLight)" opacity="0.10" />
        <circle cx="170" cy="180" r="118" fill="rgba(156,89,209,0.18)" />

        {/* Antenna */}
        <path d="M170 67v-31" stroke="#FFF430" strokeWidth="9" strokeLinecap="round" />
        <circle cx="170" cy="26" r="11" fill="#FFF430" />

        {/* Arms */}
        <path
          className="origin-[250px_164px] animate-wave"
          d="M250 162c40-22 50-50 38-66"
          stroke="#FFF430"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M88 174c-34 13-46 40-32 64"
          stroke="#9C59D1"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body */}
        <rect x="78" y="74" width="184" height="198" rx="58" fill="url(#mascotBody)" />
        <rect x="78" y="74" width="184" height="198" rx="58" fill="url(#mascotEdge)" opacity="0.4" />

        {/* Screen */}
        <rect x="98" y="103" width="144" height="111" rx="38" fill="url(#mascotScreen)" />
        <rect
          x="98"
          y="103"
          width="144"
          height="111"
          rx="38"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
        />

        {/* Eyes */}
        <g
          ref={eyeRef}
          style={{ transition: "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <ellipse className="origin-center animate-blink" cx="141" cy="155" rx="13" ry="18" fill="#FFF430" />
          <ellipse className="origin-center animate-blink" cx="199" cy="155" rx="13" ry="18" fill="#5BCEFA" />
          <circle cx="146" cy="148" r="3" fill="#FFFFFF" opacity="0.85" />
          <circle cx="204" cy="148" r="3" fill="#FFFFFF" opacity="0.85" />
        </g>

        {/* Smile */}
        <path
          d="M142 188c17 16 42 16 59 0"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mouth bar */}
        <rect x="119" y="227" width="102" height="17" rx="8.5" fill="#050307" opacity="0.84" />
        <path
          d="M132 235.5h76"
          stroke="#FFF430"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 9"
        />

        {/* Cheek lights */}
        <circle cx="110" cy="117" r="11" fill="#FF6AAE" opacity="0.85" />
        <circle cx="230" cy="117" r="11" fill="#35E7D2" opacity="0.85" />

        {/* Heart pulse */}
        <g transform="translate(170 282)">
          <path
            className="origin-center animate-heartbeat"
            d="M0 0c-3-7-14-9-14-1 0 7 14 13 14 13s14-6 14-13c0-8-11-6-14 1z"
            fill="#FF6AAE"
          />
        </g>
      </svg>

      {/* Sparks — hidden on small screens to reduce paint */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-16 hidden h-2.5 w-2.5 rounded-full bg-pride-yellow shadow-[0_0_18px_rgba(255,244,48,0.9)] sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-12 right-8 hidden h-2 w-2 rounded-full bg-pride-cyan shadow-[0_0_16px_rgba(53,231,210,0.9)] sm:block"
      />
    </Wrapper>
  );
}
