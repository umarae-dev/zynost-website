import { AlertTriangle, CheckCircle2, FlaskConical, TrendingUp } from "lucide-react";

const RESULT = [
  { value: "45%", label: "Win rate" },
  { value: "+0.13R", label: "Average realized R" },
  { value: "201", label: "Resolved picks" },
  { value: "180d", label: "Historical window" },
];

const METHOD = [
  "Fixed universe of 45 established, liquid coins",
  "Real daily OHLCV replayed without future leakage",
  "Top three qualifying candidates selected per day",
  "2.0x relative-volume gate and 1.5R target",
  "Target, stop, or unresolved outcome recorded from later candles",
];

export function BacktestTransparency() {
  return (
    <section id="track-record" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(34,197,94,0.07),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet">
              <FlaskConical size={15} /> Reproducible validation
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              One published result. Exact scope. No borrowed proof.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              The 45% figure applies to one specific Confirmed System Planned Trade configuration. It is not presented as the win rate of every Zynost feature, every coin, or every future market regime.
            </p>

            <div className="mt-8 rounded-2xl border border-warn/25 bg-warn/[0.06] p-5">
              <div className="flex gap-3">
                <AlertTriangle size={19} className="mt-0.5 shrink-0 text-warn" />
                <div>
                  <h3 className="text-sm font-semibold">What does not inherit this result</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Emerging composite signals, extreme-volatility watches, DEX confirmations, and order-book persistence use separate forward outcome tracking until their own samples are meaningful.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card/75">
            <div className="border-b border-border p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-bullish">Confirmed configuration</div>
                  <h3 className="mt-2 text-xl font-bold">Momentum + liquidity + RVOL</h3>
                </div>
                <span className="rounded-full border border-bullish/25 bg-bullish/10 px-3 py-1.5 text-xs font-semibold text-bullish">
                  Positive expectancy
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
                {RESULT.map((metric) => (
                  <div key={metric.label} className="bg-background p-4 sm:p-5">
                    <div className="font-tabular text-2xl font-bold text-foreground sm:text-3xl">{metric.value}</div>
                    <div className="mt-1 text-[11px] leading-4 text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto_15rem]">
              <div>
                <h3 className="text-sm font-semibold">How the replay works</h3>
                <ul className="mt-4 space-y-3">
                  {METHOD.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-5 text-muted-foreground">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-bullish" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden w-px bg-border md:block" />

              <div className="md:max-w-[15rem]">
                <TrendingUp size={20} className="text-violet" />
                <h3 className="mt-4 text-sm font-semibold">Why 45% can still be positive</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Wins target 1.5R while the simulated stop is smaller. Win rate alone is not the edge; average realized R is the more useful result.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs leading-5 text-muted-foreground">
          Backtests are historical simulations, not guarantees. Fees, slippage, intraday path ambiguity, changing liquidity, and future market conditions can change live outcomes.
        </p>
      </div>
    </section>
  );
}
