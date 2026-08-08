"use client";

import { Brain, Microscope, Gavel, Vault } from "lucide-react";
import CardSwap, { Card } from "@/components/effects/CardSwap";

// A second, different-angle pass at Zynost's core claims than
// FeatureReveal's grid further down — same four pillars, distinct
// headlines/copy so this doesn't just repeat that section word for word.
const PILLARS = [
  {
    icon: Brain,
    eyebrow: "Decision Engine",
    title: "No more guesswork.",
    desc: "18 independent AI agents analyze first, converge second — a verdict built from consensus, not a hunch.",
  },
  {
    icon: Microscope,
    eyebrow: "Evidence-Based",
    title: "Proof, not promises.",
    desc: "Every call is forward-tracked against real price action. The win-rate is public — good weeks and bad.",
  },
  {
    icon: Gavel,
    eyebrow: "Self-Checked",
    title: "We argue with ourselves first.",
    desc: "A dedicated Skeptic agent tries to break every bullish case before the Judge ever sees it.",
  },
  {
    icon: Vault,
    eyebrow: "Non-Custodial",
    title: "Your funds, your wallet. Always.",
    desc: "Zynost Pay derives addresses from your own key — it's never physically able to hold your money.",
  },
];

export function WhyZynostSwap() {
  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">Why Zynost</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Four things no other platform bundles together.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Watch them cycle — each one is a real, checkable property of the platform, not a marketing line.
          </p>
        </div>

        <div className="flex h-[440px] items-center justify-center sm:h-[500px]">
          <CardSwap width={420} height={280} cardDistance={60} verticalDistance={64} delay={2600} pauseOnHover skewAmount={4}>
            {PILLARS.map((p) => (
              <Card key={p.title} className="flex flex-col p-8">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet/15 text-violet">
                    <p.icon size={24} />
                  </div>
                  <span className="font-heading rounded-full border border-violet/30 bg-violet/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet">
                    Zynost
                  </span>
                </div>
                <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-sky">
                  {p.eyebrow}
                </span>
                <h3 className="font-heading mt-1.5 text-2xl font-bold leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
