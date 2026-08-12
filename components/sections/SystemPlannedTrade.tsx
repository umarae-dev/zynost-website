"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { SITE } from "@/lib/constants";

const CHECKS = [
  "Relative volume must clear the confirmed gate",
  "Momentum and liquidity are checked across exchanges",
  "Entries, stops, and targets use deterministic ATR math",
];

export function SystemPlannedTrade() {
  return (
    <section id="system-planned-trade" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,rgba(139,92,246,0.10),transparent_45%)]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            System Planned Trade
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            The system finds it before you go looking.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every 10 minutes, Zynost ranks live movers across 14 supported exchanges and
            on-chain DEX activity. The Confirmed tier must clear the historically tested
            2.0x relative-volume gate before the planning engine calculates a setup.
          </p>
          <ul className="mt-6 space-y-3">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm">
                <Check size={16} className="mt-0.5 shrink-0 text-bullish" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-2 text-xs sm:grid-cols-3">
            <div className="rounded-xl border border-bullish/20 bg-bullish/[0.06] p-3">
              <span className="font-semibold text-bullish">Confirmed</span>
              <p className="mt-1 leading-5 text-muted-foreground">Historically tested configuration.</p>
            </div>
            <div className="rounded-xl border border-violet/20 bg-violet/[0.06] p-3">
              <span className="font-semibold text-violet">Emerging</span>
              <p className="mt-1 leading-5 text-muted-foreground">Forward-tracked separately.</p>
            </div>
            <div className="rounded-xl border border-warn/20 bg-warn/[0.06] p-3">
              <span className="font-semibold text-warn">Extreme watch</span>
              <p className="mt-1 leading-5 text-muted-foreground">No backtest claim applied.</p>
            </div>
          </div>
          <MagneticButton href={SITE.appUrl} className="mt-8">
            Explore live setups
          </MagneticButton>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ animation: "float-y 6s ease-in-out infinite", animationDelay: "1s" }}
        >
          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-violet/5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <div className="text-xs text-muted-foreground">SOL / USDT</div>
                <div className="text-sm font-semibold">Solana</div>
              </div>
              <span className="rounded-full bg-bullish/15 px-2.5 py-1 text-[10px] font-bold text-bullish">
                EXAMPLE PLAN
              </span>
            </div>

            <div className="relative mt-4 h-32 overflow-hidden rounded-lg bg-surface-2">
              <svg viewBox="0 0 300 100" className="h-full w-full" preserveAspectRatio="none">
                <motion.polyline
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1.5"
                  points="0,70 20,65 40,72 60,55 80,60 100,45 120,50 140,35 160,40 180,25 200,30 220,20 240,28 260,15 280,22 300,10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
                />
                <motion.line
                  x1="0" y1="38" x2="300" y2="38" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                />
                <motion.line
                  x1="0" y1="18" x2="300" y2="18" stroke="#38bdf8" strokeDasharray="4 3" strokeWidth="1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                />
                <motion.line
                  x1="0" y1="58" x2="300" y2="58" stroke="#ef4444" strokeDasharray="4 3" strokeWidth="1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.8 }}
                />
              </svg>
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 1.5 }}
                className="absolute right-2 top-3 rounded bg-card/90 px-1.5 py-0.5 text-[9px] font-tabular text-sky"
              >
                Target 2 &middot; 210.50
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 1.7 }}
                className="absolute right-2 top-[42%] rounded bg-card/90 px-1.5 py-0.5 text-[9px] font-tabular text-sky"
              >
                Target 1 &middot; 190.30
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 1.9 }}
                className="absolute bottom-8 right-2 rounded bg-card/90 px-1.5 py-0.5 text-[9px] font-tabular text-bearish"
              >
                Stop Loss &middot; 158.20
              </motion.span>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <div>
                <div className="text-muted-foreground">Entry Zone</div>
                <div className="font-tabular font-semibold">170.00 &ndash; 177.00</div>
              </div>
              <motion.div
                initial={{ opacity: 0, rotateX: -90 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 400 }}
                className="flex items-center gap-1 rounded-full bg-bullish/10 px-2.5 py-1 text-bullish"
              >
                <Check size={11} />
                <span className="font-semibold">
                  Backtested &mdash; <AnimatedCounter value={45} suffix="%" /> win rate, +0.13R
                </span>
              </motion.div>
            </div>
            <div className="mt-2 text-right text-[10px] text-muted-foreground">
              Historical sample: <AnimatedCounter value={201} /> resolved picks
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
