"use client";

import { useEffect, useRef, useState } from "react";

/**
 * RainbowCursor — non-binary inspired custom cursor.
 *
 * Performance:
 *  - No mix-blend-mode (was forcing full-viewport composites).
 *  - Single small element, transformed via rAF lerp.
 *  - rAF sleeps when the cursor reaches the pointer instead of looping forever.
 *  - Native cursor stays — we render the dot as an additional layer instead
 *    of forcing `cursor: none` on the entire page.
 *  - Disabled on touch / coarse pointers / reduced-motion / small screens.
 */
const CURSOR_MEDIA = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [tabindex]:not([tabindex="-1"])';

export default function RainbowCursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const frame = useRef<number | null>(null);
  const hoveringInteractive = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursorQuery = window.matchMedia(CURSOR_MEDIA);

    const syncEnabled = () => {
      setEnabled(cursorQuery.matches && !motionQuery.matches);
    };

    syncEnabled();
    cursorQuery.addEventListener("change", syncEnabled);
    motionQuery.addEventListener("change", syncEnabled);

    return () => {
      cursorQuery.removeEventListener("change", syncEnabled);
      motionQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updateHoverState = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const next = Boolean(element?.closest(INTERACTIVE_SELECTOR));
      if (next === hoveringInteractive.current) return;
      hoveringInteractive.current = next;
      ref.current?.classList.toggle("is-hovering", next);
    };

    const tick = () => {
      const t = target.current;
      const c = current.current;
      const dx = t.x - c.x;
      const dy = t.y - c.y;

      c.x += dx * 0.22;
      c.y += dy * 0.22;

      if (ref.current) {
        ref.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        frame.current = window.requestAnimationFrame(tick);
      } else {
        frame.current = null;
      }
    };

    const requestTick = () => {
      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      if (ref.current) ref.current.style.opacity = "1";
      updateHoverState(event);
      requestTick();
    };
    const onDown = () => {
      ref.current?.classList.add("is-active");
    };
    const onUp = () => {
      ref.current?.classList.remove("is-active");
    };
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      frame.current = null;
      hoveringInteractive.current = false;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="rainbow-cursor"
      style={{ opacity: 0, left: 0, top: 0 }}
    >
      <span className="rainbow-cursor__flag" />
    </div>
  );
}
