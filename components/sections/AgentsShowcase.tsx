"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AGENTS } from "@/lib/constants";
import { AGENT_ICONS as ICONS } from "@/lib/agent-icons";

/**
 * Auto-advancing carousel — advances on its own timer, no scroll-pin
 * dependency (a pinned GSAP ScrollTrigger section can silently no-op if
 * track-width measurement races the layout, which is a fragile source of
 * "looks static" bugs). Pauses only on hover/focus (user-controlled), so it
 * always auto-advances on its own otherwise — this is the section's whole
 * point, so it deliberately ignores prefers-reduced-motion.
 *
 * scrollToIndex measures each card's real position via getBoundingClientRect
 * rather than assuming a fixed card-width step — a fixed-step assumption
 * silently drifts out of sync with the actual snap points (e.g. the active
 * card's own scale-105 changes its footprint), which is what made this feel
 * "broken" after a few advances.
 */
export function AgentsShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[idx];
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const target = cardRect.left - trackRect.left + track.scrollLeft - 24; // 24 = px-6 lead-in
    track.scrollTo({ left: Math.max(target, 0), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % AGENTS.length;
        scrollToIndex(next);
        return next;
      });
      setPulseKey((k) => k + 1);
    }, 2200);

    return () => clearInterval(interval);
  }, [paused, scrollToIndex]);

  function goTo(idx: number) {
    setActive(idx);
    scrollToIndex(idx);
    setPulseKey((k) => k + 1);
  }

  return (
    <section id="agents" className="relative overflow-hidden border-y border-border bg-surface/40 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_58%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet">
          18 intelligence modules
        </span>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          A research team — and the tools around it.
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          All 18 agents have distinct responsibilities across market research, critical review,
          trade planning, portfolio intelligence, coaching, psychology, and learning.
        </p>
      </div>

      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {AGENTS.map((agent, i) => {
            const Icon = ICONS[i % ICONS.length];
            const isActive = i === active;
            return (
              <button
                key={agent.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={() => goTo(i)}
                className={`w-[240px] shrink-0 snap-start rounded-2xl border p-6 text-left transition-all duration-500 ${
                  isActive
                    ? "scale-105 border-violet bg-card shadow-lg shadow-violet/15"
                    : "border-border bg-card/50 opacity-60 hover:opacity-90"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-500 ${
                    isActive ? "bg-violet/15 text-violet" : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Tier {agent.tier} &middot; {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-1 text-base font-semibold leading-snug">{agent.name}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{agent.role}.</p>
                <p
                  className={`mt-3 overflow-hidden border-t border-border text-xs leading-relaxed text-muted-foreground transition-all duration-500 ${
                    isActive ? "max-h-24 pt-3 opacity-100" : "max-h-0 border-t-0 pt-0 opacity-0"
                  }`}
                >
                  {agent.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-10 flex flex-col items-center gap-5">
        {/* Energy line: pulses from the active agent into the verdict node
            on every advance, echoing the "18 signals converge into one
            verdict" idea from the brand mark. */}
        <div className="relative h-8 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-violet/50 to-transparent" />
          <motion.span
            key={pulseKey}
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky shadow-[0_0_8px_2px_rgba(56,189,248,0.7)]"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          />
        </div>

        <motion.div
          key={`verdict-${pulseKey}`}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 text-xs font-semibold text-violet"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
          Verdict engine analyzing&hellip;
        </motion.div>

        <div className="flex items-center gap-1.5">
          {AGENTS.map((_, i) => (
            <button
              key={i}
              aria-label={`Show ${AGENTS[i].name}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-violet" : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
