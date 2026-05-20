"use client";

import { useEffect, useRef, useState } from "react";

/**
 * RainbowCursor
 * Smooth spring-following custom cursor with conic glow.
 * - hidden on coarse pointers
 * - hidden when prefers-reduced-motion (uses native cursor)
 */
export default function RainbowCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // target / current positions for lerp
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      visible.current = true;
      if (ref.current) ref.current.style.opacity = "1";
    };
    const onDown = () => setActive(true);
    const onUp = () => setActive(false);
    const onLeave = () => {
      visible.current = false;
      if (ref.current) ref.current.style.opacity = "0";
    };

    const tick = () => {
      const { x, y } = target.current;
      current.current.x += (x - current.current.x) * 0.18;
      current.current.y += (y - current.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.left = `${current.current.x}px`;
        ref.current.style.top = `${current.current.y}px`;
      }
      frame.current = window.requestAnimationFrame(tick);
    };
    frame.current = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
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
      className={`rainbow-cursor ${active ? "is-active" : ""}`}
      style={{ opacity: 0 }}
    />
  );
}
