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
 * Mascot — light-weight friendly companion.
 *
 * Performance:
 *  - Only TWO idle animations run by default: blink (eyes) and wave (right arm).
 *    All other "breathe / float / heartbeat / shimmer" loops were removed
 *    because they were running off-screen too.
 *  - When the mascot scrolls out of view, all animations pause via
 *    IntersectionObserver + a `data-on` attribute.
 *  - Eye-tracking only registers a pointermove listener when:
 *      pointer is fine, motion is allowed AND the mascot is currently visible.
 *  - drop-shadow on SVG was removed (very expensive). We use a static blurred
 *    backdrop instead.
 */
export default function Mascot({
  compact = false,
  onClick,
  label = "Mascote de apoio",
  reactive = true
}: MascotProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const eyeRef = useRef<SVGGElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [trackEyes, setTrackEyes] = useState(false);

  // Detect capability once
  useEffect(() => {
    if (!reactive || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setTrackEyes(true);
  }, [reactive]);

  // Observe visibility — pause animations off-screen
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Eye tracking — only when visible
  useEffect(() => {
    if (!trackEyes || !isVisible) return;
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
      const distance = Math.hypot(dx, dy) || 1;
      const factor = Math.min(1, distance / 280);
      nextX = (dx / distance) * 6 * factor;
      nextY = (dy / distance) * 6 * factor;
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
  }, [trackEyes, isVisible]);

  const size = compact
    ? "h-44 w-44 sm:h-56 sm:w-56"
    : "h-[16rem] w-[16rem] sm:h-[22rem] sm:w-[22rem] lg:h-[26rem] lg:w-[26rem]";

  const Wrapper = (onClick ? "button" : "div") as React.ElementType;

  return (
    <Wrapper
      ref={wrapRef}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      data-on={isVisible ? "true" : "false"}
      aria-label={onClick ? label : undefined}
      className={`focus-ring group relative mx-auto block ${size} rounded-full`}
    >
      {/* Static halo — desktop only, no animation */}
      <span
        aria-hidden="true"
        className="halo-conic pointer-events-none absolute inset-[-8%] rounded-full opacity-60 blur-2xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full border border-white/10 bg-white/[0.02]"
      />

      <svg
        viewBox="0 0 340 340"
        className="relative h-full w-full"
        role="img"
        aria-label="Companhia digital amigável acenando"
      >
        <defs>
          <linearGradient id="mascotBody" x1="80" x2="260" y1="80" y2="290" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.42" stopColor="#FFF430" />
            <stop offset="1" stopColor="#9C59D1" />
          </linearGradient>
          <radialGradient id="mascotScreen" cx="50%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#1F1338" />
            <stop offset="100%" stopColor="#050307" />
          </radialGradient>
        </defs>

        {/* Ambient bubble (static) */}
        <circle cx="170" cy="180" r="118" fill="rgba(156,89,209,0.16)" />

        {/* Antenna */}
        <path d="M170 67v-31" stroke="#FFF430" strokeWidth="9" strokeLinecap="round" />
        <circle cx="170" cy="26" r="11" fill="#FFF430" />

        {/* Right arm — waves only when visible */}
        <path
          className={`origin-[250px_164px] ${isVisible ? "animate-wave" : ""}`}
          d="M250 162c40-22 50-50 38-66"
          stroke="#FFF430"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left arm — static */}
        <path
          d="M88 174c-34 13-46 40-32 64"
          stroke="#9C59D1"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body */}
        <rect x="78" y="74" width="184" height="198" rx="58" fill="url(#mascotBody)" />

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
          <ellipse
            className={`origin-center ${isVisible ? "animate-blink" : ""}`}
            cx="141"
            cy="155"
            rx="13"
            ry="18"
            fill="#FFF430"
          />
          <ellipse
            className={`origin-center ${isVisible ? "animate-blink" : ""}`}
            cx="199"
            cy="155"
            rx="13"
            ry="18"
            fill="#5BCEFA"
          />
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

        {/* Heart (static) */}
        <g transform="translate(170 282)">
          <path
            d="M0 0c-3-7-14-9-14-1 0 7 14 13 14 13s14-6 14-13c0-8-11-6-14 1z"
            fill="#FF6AAE"
          />
        </g>
      </svg>
    </Wrapper>
  );
}
