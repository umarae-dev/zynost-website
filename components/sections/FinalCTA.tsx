"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { SITE } from "@/lib/constants";

/** Pulls toward the cursor on hover, with a shine that only sweeps on
 * hover. Hover/tap-triggered motion only. */
function VortexButton({ children, href }: { children: ReactNode; href: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!buttonRef.current) return;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - (left + width / 2)) * 0.3,
      y: (e.clientY - (top + height / 2)) * 0.3,
    });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  return (
    <motion.a
      href={href}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-105"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-violet/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

/**
 * Deliberately just two soft glow blobs behind the copy — this used to
 * also render a "QuantumVortex" element (three tilted rings, dozens of
 * scattered points, a pulsing core) that was still visually heavy even
 * frozen static, right above the footer on every page. Removed outright
 * rather than kept as a static version.
 */
export function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden border-t border-border bg-[#020204] py-32 sm:py-48">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.18),transparent_32%),radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.10),transparent_28%),linear-gradient(#020204,#07040e,#020204)]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-900/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-900/20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <Sparkles className="h-6 w-6" />
        </div>

        <h2 className="text-balance text-5xl font-extrabold tracking-tight drop-shadow-2xl sm:text-7xl lg:text-8xl">
          Clarity over{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent italic">
            chaos.
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-lg font-medium text-gray-400 sm:text-xl">
          Live data. Specialist research. Adversarial review. <br className="hidden sm:block" />
          <strong className="text-white">One decision you can inspect.</strong>
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <VortexButton href={SITE.appUrl}>
            Get started free <ChevronRight className="h-4 w-4" />
          </VortexButton>
        </div>

        <p className="mt-8 text-sm font-medium uppercase tracking-wide text-gray-500">
          No credit card required
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#020204] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#020204] to-transparent" />
    </section>
  );
}
