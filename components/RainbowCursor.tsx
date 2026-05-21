"use client";

import { useEffect, useRef, useState } from "react";

/**
 * RainbowCursor — minimal custom cursor.
 *
 * Performance:
 *  - No mix-blend-mode (was forcing full-viewport composites).
 *  - No conic gradient + blur stack (very expensive paint).
 *  - Single small element, transformed via rAF lerp.
 *  - Native cursor stays — we render the dot as an additional layer instead
 *    of forcing `cursor: none` on the entire page.
 *  - Disabled on touch / coarse pointers / reduced-motion / small screens.
 */
export default function RainbowCursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const frame = useRef<number | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    setEnabled(true);

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      if (ref.current) ref.current.style.opacity = "1";
    };
    const onDown = () => {
      activeRef.current = true;
      ref.current?.classList.add("is-active");
    };
    const onUp = () => {
      activeRef.current = false;
      ref.current?.classList.remove("is-active");
    };
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * 0.22;
      c.y += (t.y - c.y) * 0.22;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%)`;
      }
      frame.current = window.requestAnimationFrame(tick);
    };
    frame.current = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="rainbow-cursor"
      style={{ opacity: 0, left: 0, top: 0 }}
    />
  );
}
