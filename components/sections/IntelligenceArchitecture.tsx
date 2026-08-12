import {
  Activity,
  Bot,
  BrainCircuit,
  CandlestickChart,
  CheckCircle2,
  DatabaseZap,
  FileClock,
  Gavel,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Target,
  WalletCards,
} from "lucide-react";

const WORKFLOW = [
  {
    number: "01",
    icon: DatabaseZap,
    title: "Ground the market",
    copy: "Live price, OHLCV, volume, project, news, macro, futures, order-book, security, and on-chain sources are fetched first.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Run specialists",
    copy: "Relevant agents from the 18-agent system work independently. Each returns a separate signal, confidence, summary, and supporting metrics.",
  },
  {
    number: "03",
    icon: ShieldAlert,
    title: "Challenge consensus",
    copy: "The Skeptic searches for contradictions and the largest risk to the emerging consensus before synthesis.",
  },
  {
    number: "04",
    icon: Gavel,
    title: "Make it usable",
    copy: "The Judge produces the final bull, bear, neutral, risk, and key-level view. Trade Plan can then calculate entries, stops, and targets.",
  },
];

const CAPABILITY_GROUPS = [
  {
    icon: CandlestickChart,
    title: "Research workspace",
    items: ["Live chart and market statistics", "Multi-agent coin research", "Skeptic and Judge verdict", "Security postmortem"],
  },
  {
    icon: Radar,
    title: "Market discovery",
    items: ["Gainers, losers, volume, movers", "System Planned Trade", "Order Book Radar", "News and on-chain intelligence"],
  },
  {
    icon: Target,
    title: "Planning and monitoring",
    items: ["Entry, stop, and target zones", "Watchlists and price alerts", "Saved reports and planned trades", "Push notifications"],
  },
  {
    icon: WalletCards,
    title: "Personal decision system",
    items: ["Portfolio exposure", "Trade journal", "Performance coaching", "Trading psychology patterns"],
  },
];

const TRUST = [
  {
    icon: Activity,
    title: "Models interpret; code calculates.",
    copy: "Price, imbalance, funding, volatility, contract flags, and plan levels come from deterministic services. Agent wording cannot overwrite source numbers.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence integrity is checked.",
    copy: "Stored specialist outputs and final reports are HMAC-signed. Skeptic, Judge, and Trade Plan reject evidence that fails verification.",
  },
  {
    icon: FileClock,
    title: "Old and new signals stay separate.",
    copy: "The historically validated Confirmed configuration keeps its own published result. Emerging, DEX, and order-book signals build a separate forward track record.",
  },
];

export function IntelligenceArchitecture() {
  return (
    <section id="workflow" className="relative scroll-mt-20 border-y border-border bg-surface/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">How it actually works</span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              From raw market data to a decision you can audit.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end sm:text-lg">
            Zynost is not 18 chatbots repeating the same prompt. It is a connected 18-agent system spanning research, critical review, planning, learning, portfolio, and personal performance intelligence.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {WORKFLOW.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className="relative bg-background p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-tabular text-xs font-bold tracking-[0.18em] text-muted-foreground">{step.number}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/12 text-violet">
                    <Icon size={19} />
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.copy}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Beyond the verdict</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            The app covers the full research loop.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITY_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.title} className="rounded-2xl border border-border bg-card/70 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky/10 text-sky">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-5 text-muted-foreground">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-bullish" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl border border-border bg-[linear-gradient(135deg,rgba(139,92,246,0.10),rgba(56,189,248,0.04),transparent)] p-6 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet">
                <Bot size={15} /> Built for auditability
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight">
                Strong AI needs strong boundaries.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The backend deliberately separates source data, model interpretation, deterministic math, and final synthesis.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {TRUST.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-white/8 bg-background/70 p-5">
                    <Icon size={19} className="text-violet" />
                    <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
            {["Live prices & OHLCV", "14 exchange fallbacks", "Futures & order books", "News & macro", "On-chain & contract security", "Signed research records"].map((source) => (
              <span key={source} className="rounded-full border border-border bg-background/50 px-3 py-1.5">{source}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
