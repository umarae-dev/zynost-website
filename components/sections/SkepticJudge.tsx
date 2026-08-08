"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown, Gavel } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SITE } from "@/lib/constants";

export function SkepticJudge() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/40 py-28">
      <img
        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=60&auto=format&fit=crop"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.05] grayscale"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            Skeptic + Judge
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            We argue with ourselves before we tell you anything.
          </h2>
          <p className="mt-4 text-muted-foreground">
            One agent actively hunts for holes in the bullish case. Another weighs everything
            and delivers a single, reasoned verdict. Radical honesty, built in.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl border border-bullish/25 bg-bullish/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bullish/50 hover:shadow-[0_20px_40px_-20px_rgba(34,197,94,0.35)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-bullish">
                <TrendingUp size={16} />
                Bull Case
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>Strong uptrend on higher timeframes.</li>
                <li>Increasing network activity.</li>
                <li>Positive funding &amp; sentiment shift.</li>
              </ul>
              <div className="mt-5 border-t border-bullish/20 pt-3 text-xs font-semibold text-bullish">
                Strength: 72%
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center py-2 lg:py-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground lg:rotate-0"
            >
              <ArrowRight size={16} className="rotate-90 lg:rotate-0" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl border border-bearish/25 bg-bearish/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bearish/50 hover:shadow-[0_20px_40px_-20px_rgba(239,68,68,0.35)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-bearish">
                <TrendingDown size={16} />
                Skeptic Agent
              </div>
              <p className="mt-1 text-xs text-muted-foreground">We look for what could go wrong.</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>Overbought on shorter timeframes.</li>
                <li>High leverage in perpetual markets.</li>
                <li>Key resistance ahead.</li>
              </ul>
              <div className="mt-5 border-t border-bearish/20 pt-3 text-xs font-semibold text-bearish">
                Risk Level: Medium
              </div>
            </div>
          </motion.div>
        </div>

        <Reveal delay={0.4} className="mx-auto mt-6 max-w-lg">
          <div className="rounded-2xl border-2 border-violet/40 bg-card p-6 text-center shadow-xl shadow-violet/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(139,92,246,0.55)]">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet">
              <Gavel size={14} />
              Judge Verdict
            </div>
            <div className="mt-2 text-3xl font-bold text-bullish">BUY</div>
            <div className="mt-1 text-xs text-muted-foreground">Confidence: 78%</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Bull case outweighs risks, but manage position size carefully.
            </p>
            <a
              href={SITE.appUrl}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline"
            >
              View full report <ArrowRight size={12} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
