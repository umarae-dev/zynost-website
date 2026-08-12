"use client";

import { BrainCircuit, ChartNoAxesCombined, Gavel, Hand } from "lucide-react";
import CardSwap, { Card } from "@/components/effects/CardSwap";

const PILLARS = [
  {
    icon: BrainCircuit,
    eyebrow: "Specialized",
    title: "Different agents, different jobs.",
    desc: "18 specialist AI agents work across research, review, planning, portfolio, coaching, psychology, and learning — a connected decision system, not one generic prompt.",
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
    <section className="overflow-hidden py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">Why Zynost</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Four principles behind every decision.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Watch them cycle — specialized research, adversarial review, measurable claims, and a human still in control.
          </p>
        </div>

        <div className="flex h-[440px] items-center justify-center sm:h-[500px]">
          <CardSwap
            width={420}
            height={280}
            cardDistance={60}
            verticalDistance={64}
            delay={2600}
            pauseOnHover
            skewAmount={4}
          >
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} className="flex flex-col p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet/15 text-violet">
                      <Icon size={24} />
                    </div>
                    <span className="font-heading rounded-full border border-violet/30 bg-violet/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet">
                      Zynost
                    </span>
                  </div>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-sky">
                    {pillar.eyebrow}
                  </span>
                  <h3 className="font-heading mt-1.5 text-2xl font-bold leading-snug">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
