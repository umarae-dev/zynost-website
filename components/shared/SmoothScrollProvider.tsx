"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in Lenis smooth scrolling. Respects prefers-reduced-motion —
 * when the visitor has that set, Lenis is never instantiated and the browser
 * falls back to native scrolling, which is already instant/non-animated.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis");

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return <>{children}</>;
}
