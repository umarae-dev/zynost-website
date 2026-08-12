import { BrainCircuit, ChartNoAxesCombined, Gavel, Hand } from "lucide-react";

const PILLARS = [
  {
    icon: BrainCircuit,
    eyebrow: "Specialized",
    title: "Different agents, different jobs.",
    desc: "Technical, structure, liquidity, smart-money, risk, news, sentiment, macro, project, security, and on-chain research stay separate before consensus.",
  },
  {
    icon: Gavel,
    eyebrow: "Adversarial",
    title: "The platform argues with itself.",
    desc: "The Skeptic is designed to find contradictions and the strongest risk to consensus before the Judge produces a final report.",
  },
  {
    icon: ChartNoAxesCombined,
    eyebrow: "Measured",
    title: "Validation comes with boundaries.",
    desc: "Historically tested configurations publish their sample and assumptions. Newer signals earn a separate forward record instead of inheriting old results.",
  },
  {
    icon: Hand,
    eyebrow: "User-controlled",
    title: "Research, never forced execution.",
    desc: "Zynost does not connect to your exchange or place trades for you. It organizes the evidence and plan; you choose whether to act.",
  },
];

export function WhyZynostSwap() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">Why Zynost</span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              Four principles behind every decision.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end sm:text-lg">
            The edge is not a louder prediction. It is a better decision process: specialized research, adversarial review, measurable claims, and a human still in control.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card/65 p-6 transition-colors hover:border-violet/35 sm:p-8"
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet/0 blur-3xl transition-colors group-hover:bg-violet/10"
                />
                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/12 text-violet">
                    <Icon size={22} />
                  </div>
                  <span className="font-tabular text-xs font-bold text-muted-foreground">0{index + 1}</span>
                </div>
                <span className="relative mt-7 block text-xs font-semibold uppercase tracking-[0.16em] text-sky">{pillar.eyebrow}</span>
                <h3 className="relative mt-2 text-xl font-bold sm:text-2xl">{pillar.title}</h3>
                <p className="relative mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{pillar.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
