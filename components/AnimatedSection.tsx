"use client";

import { useEffect, useRef } from "react";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the reveal starts after entering viewport */
  delay?: number;
  /** Threshold passed to IntersectionObserver */
  threshold?: number;
  /** Set as div by default; pass "section" to render a section element */
  as?: "div" | "section" | "article" | "header" | "footer";
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  threshold = 0.18,
  as = "div"
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`section-reveal ${className}`}
    >
      {children}
    </Component>
  );
}
