"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Bot, ChartNoAxesCombined, Radar, ScanSearch } from "lucide-react";

const VIEWS = [
  {
    label: "Research workspace",
    eyebrow: "One coin, full context",
    title: "The chart, the evidence, and the verdict share one workspace.",
    description:
      "Price, market structure, coin statistics, specialist evidence, the Skeptic check, and the final consensus remain visible together — so the conclusion never gets separated from its reasons.",
    src: "/hero/dashboard-1.png",
    alt: "Zynost research workspace showing a live crypto chart, market statistics, agent consensus, Skeptic check, and trade blueprint",
    icon: ChartNoAxesCombined,
    points: ["Fast live-data load", "Inspect every conclusion", "Trade blueprint on demand"],
  },
  {
    label: "Agent evidence",
    eyebrow: "Independent research",
    title: "See where the agents agree — and where they do not.",
    description:
      "Each available specialist returns its own signal, confidence, summary, and key metrics. Results are not compressed into a mystery score before you can inspect them.",
    src: "/hero/dashboard-2.png",
    alt: "Zynost agent evidence screen with individual research agents, signals, confidence scores, and summaries",
    icon: Bot,
    points: ["18 specialist agents", "Source-dependent honesty", "Saved analysis history"],
  },
  {
    label: "Order Book Radar",
    eyebrow: "Liquidity intelligence",
    title: "Track whether visible walls actually survive.",
    description:
      "Zynost compares order-book pressure across supported exchanges and repeatedly checks resting orders. Persistence scoring helps distinguish durable liquidity from a wall that flashes and disappears.",
    src: "/hero/dashboard-3.png",
    alt: "Zynost Order Book Radar overview showing tracked symbols, persistence scores, order-flow sentiment, and a persistence matrix",
    icon: Radar,
    points: ["Multi-exchange depth", "Buy/sell pressure", "Persistence matrix"],
  },
  {
    label: "Exchange detail",
    eyebrow: "Explainable microstructure",
    title: "Open the score and inspect the exchanges behind it.",
    description:
      "A global confidence score is backed by persistence history and a per-exchange breakdown. Strong numbers stay traceable to the markets that produced them.",
    src: "/hero/dashboard-4.png",
    alt: "Zynost Bitcoin persistence detail showing score history and exchange-by-exchange order-book persistence",
    icon: ScanSearch,
    points: ["Six-hour history", "Exchange breakdown", "Spoofing-risk context"],
  },
];

export function ProductExperience() {
  const [active, setActive] = useState(0);
  const view = VIEWS[active];

  return (
    <section id="product" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-28 mx-auto h-80 max-w-5xl bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.14),transparent_68%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">The real product</span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Research you can open up, not another black-box signal.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            These are real screens from the connected Zynost application. Choose a view to see how the platform moves from live data to an inspectable decision.
          </p>
        </div>

        <div className="scrollbar-none -mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="mx-auto flex w-max min-w-full gap-2 sm:justify-center" role="tablist" aria-label="Zynost product views">
            {VIEWS.map((item, index) => {
              const Icon = item.icon;
              const selected = active === index;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(index)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                    selected
                      ? "border-violet/60 bg-violet/15 text-foreground"
                      : "border-border bg-card/50 text-muted-foreground hover:border-violet/30 hover:text-foreground"
                  }`}
                >
                  <Icon size={15} className={selected ? "text-violet" : ""} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-[1.6rem] border border-border bg-card/80 shadow-[0_35px_100px_-45px_rgba(139,92,246,0.45)]">
          <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-bearish/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-bullish/70" />
            <span className="ml-2 text-[10px] font-medium text-muted-foreground">app.zynost.com</span>
            <a
              href={view.src}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground"
            >
              Full-size <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="grid lg:grid-cols-[1.48fr_0.72fr]">
            <div className="relative min-h-[210px] overflow-hidden bg-[#080810] sm:min-h-[390px] lg:min-h-[520px]">
              <Image
                key={view.src}
                src={view.src}
                alt={view.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="animate-fade-in-up object-contain object-top"
                priority={active === 0}
              />
            </div>

            <div className="flex flex-col justify-center border-t border-border p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sky">{view.eyebrow}</span>
              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{view.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{view.description}</p>
              <div className="mt-7 space-y-3">
                {view.points.map((point, index) => (
                  <div key={point} className="flex items-center gap-3 text-sm">
                    <span className="font-tabular flex h-6 w-6 items-center justify-center rounded-full bg-violet/12 text-[10px] font-bold text-violet">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
          Relevant agents activate for the task and available asset data. Missing upstream evidence is skipped, not invented.
        </p>
      </div>
    </section>
  );
}
