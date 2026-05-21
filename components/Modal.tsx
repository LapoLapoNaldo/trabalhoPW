"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previousActive = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialogRef.current) {
        // simple focus trap
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previousActive?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 lg:bg-black/65 lg:backdrop-blur-xl"
        aria-label="Fechar modal"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[1.75rem] border border-white/10 bg-[rgba(13,9,24,0.95)] p-6 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.8)] sm:rounded-[2.2rem] sm:p-9 lg:bg-[rgba(13,9,24,0.85)] lg:backdrop-blur-2xl animate-revealUp"
      >
        {/* atmospheric glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 hidden h-72 w-72 rounded-full bg-pride-purple/25 blur-3xl lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 hidden h-64 w-64 rounded-full bg-pride-yellow/12 blur-3xl lg:block"
        />

        <div className="relative mb-8 flex items-start justify-between gap-5">
          <div>
            <p className="font-display text-xs italic text-white/45">Coleção</p>
            <h3
              id="modal-title"
              className="mt-1 font-display text-3xl font-light leading-tight tracking-editorial text-white sm:text-4xl"
            >
              {title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-2xl font-light text-white transition-all duration-500 ease-cinema hover:rotate-90 hover:border-pride-yellow/60 hover:bg-pride-yellow hover:text-black"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
