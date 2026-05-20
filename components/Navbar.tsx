"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/components/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#inicio");

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((value): value is Element => value !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-500 ease-cinema ${
        scrolled
          ? "bg-black/55 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      {/* Hairline */}
      <div
        className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="divider-pride h-px" />
      </div>

      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        aria-label="Navegação principal"
      >
        <a
          href="#inicio"
          className="focus-ring group flex items-center gap-3 rounded-full"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-nonbinary-conic shadow-[0_0_30px_rgba(255,244,48,0.45)] transition-transform duration-500 ease-cinema group-hover:rotate-[40deg]">
            <span className="h-5 w-5 rounded-full bg-black/85" />
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full border border-white/20 opacity-50 blur-sm"
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[15px] font-semibold text-white">
              Orgulho
            </span>
            <span className="block font-display text-[12px] italic text-pride-yellow">
              Não-Binárie
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="relative hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`focus-ring relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-pride-yellow shadow-[0_8px_24px_-8px_rgba(255,244,48,0.6)]"
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#apoio"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/35 hover:bg-white/10"
          >
            Pedir apoio
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-pride-pink shadow-[0_0_10px_rgba(255,106,174,0.9)]" />
          </a>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ease-cinema ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 bg-white transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ease-cinema ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/85 backdrop-blur-2xl lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        } transition-[max-height] duration-500 ease-cinema`}
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
          {navItems.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                transitionDelay: open ? `${idx * 60}ms` : "0ms"
              }}
              className={`focus-ring flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-base text-white/85 transition-all duration-500 ease-cinema hover:border-white/15 hover:bg-white/5 ${
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              onClick={() => setOpen(false)}
            >
              <span className="font-medium">{item.label}</span>
              <span className="font-display text-xs italic text-white/40">
                0{idx + 1}
              </span>
            </a>
          ))}
          <a
            href="#apoio"
            onClick={() => setOpen(false)}
            className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-pride-yellow px-4 py-3 text-sm font-bold text-black"
          >
            Pedir apoio agora
          </a>
        </div>
      </div>
    </header>
  );
}
