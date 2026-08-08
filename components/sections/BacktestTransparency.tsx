"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";

const ZONES = [
  { zone: "Breakout Continuation", winRate: 45, avgR: "+0.13R", n: 328, expectancy: "+0.06R" },
  { zone: "Pullback to Support", winRate: 51, avgR: "+0.21R", n: 412, expectancy: "+0.11R" },
  { zone: "Range Reversal", winRate: 38, avgR: "+0.09R", n: 201, expectancy: "+0.04R" },
];

const HISTOGRAM = [4, 7, 12, 22, 34, 40, 30, 20, 11, 6, 3];

export function BacktestTransparency() {
  return (
    <section className="relative overflow-hidden py-28">
      <img
        src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1600&q=60&auto=format&fit=crop"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.04] grayscale"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            Backtest Transparency
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Backtested, not guessed.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every setup is validated against real historical data — reproduced across repeat
            runs, not a one-off. If the evidence doesn&apos;t hold up, we don&apos;t ship it.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-[0_20px_40px_-20px_rgba(139,92,246,0.4)]">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-4 font-medium">Strategy Zone</th>
                    <th className="px-5 py-4 font-medium">Win Rate</th>
                    <th className="px-5 py-4 font-medium">Avg R</th>
                    <th className="px-5 py-4 font-medium">Sample Size</th>
                    <th className="px-5 py-4 font-medium">Expectancy</th>
                  </tr>
                </thead>
                <tbody className="font-tabular">
                  {ZONES.map((z) => (
                    <tr key={z.zone} className="border-b border-border last:border-0">
                      <td className="px-5 py-4 font-sans">{z.zone}</td>
                      <td className="px-5 py-4">{z.winRate}%</td>
                      <td className="px-5 py-4 text-bullish">{z.avgR}</td>
                      <td className="px-5 py-4 text-muted-foreground">{z.n}</td>
                      <td className="px-5 py-4 text-bullish">{z.expectancy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-[0_20px_40px_-20px_rgba(139,92,246,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Performance Distribution (R)
              </p>
              <div className="mt-6 flex h-40 items-end gap-1.5">
                {HISTOGRAM.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h * 2.4}px` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                    className={`flex-1 rounded-t ${
                      i < 5 ? "bg-bearish/50" : i === 5 ? "bg-violet" : "bg-bullish/60"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between font-tabular text-[10px] text-muted-foreground">
                <span>-2R</span>
                <span>-1R</span>
                <span>0</span>
                <span>+1R</span>
                <span>+2R</span>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Reproduced across repeat runs. Not a one-off.
        </p>
      </div>
    </section>
  );
}
