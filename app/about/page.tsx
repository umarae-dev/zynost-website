import type { Metadata } from "next";
import { Eye, ShieldCheck, Gavel, Sparkles } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { STATS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Why we built ${SITE.name} — decision intelligence over hype.`,
};

const VALUES = [
  {
    icon: Eye,
    title: "Radical transparency",
    body: "Every backtest number we publish is reproducible. If a strategy stops working, we say so — we don't quietly change the marketing copy.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence over hype",
    body: "No rocket emojis, no guaranteed gains. Just real data, real reasoning, and an honest confidence score.",
  },
  {
    icon: Gavel,
    title: "We argue with ourselves first",
    body: "A dedicated Skeptic agent tries to break every bullish case before you ever see a verdict. Honesty is a feature, not an afterthought.",
  },
  {
    icon: Sparkles,
    title: "Built for individuals",
    body: "Institutional-grade analysis, priced and designed for a single trader — not a hedge fund desk.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-wider text-violet">
          About Us
        </span>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          We got tired of guessing, so we built something that doesn&apos;t.
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
        <p>
          Every crypto trader knows the two bad options: signal groups that sell conviction
          with zero evidence, or data terminals that dump numbers on you and leave you to
          figure out what they mean.
        </p>
        <p>
          {SITE.name} started from a simple question: what if an AI could actually do the
          analyst&apos;s job — read the technicals, the news, the on-chain flows, the
          liquidity, argue with itself about what could go wrong, and then just tell you what
          it thinks, clearly, with its reasoning shown?
        </p>
        <p>
          That became 18 specialist agents, a Skeptic that actively hunts for holes in the
          bullish case, and a Judge that weighs everything into one verdict. Every strategy we
          surface is backtested against real history and published transparently — including
          the times a strategy&apos;s edge turned out to be smaller than we first measured.
          We&apos;d rather show you the correction than hide it.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-14 grid grid-cols-2 gap-6 border-y border-border py-10 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-tabular text-3xl font-bold">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">What we actually believe</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <RevealItem key={v.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <v.icon size={20} className="text-violet" />
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal delay={0.1} className="mt-16 rounded-2xl border border-border bg-surface/60 p-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight">See it for yourself.</h2>
        <p className="mt-2 text-muted-foreground">
          No credit card required to start your free trial.
        </p>
        <div className="mt-6 flex justify-center">
          <MagneticButton href={SITE.appUrl}>Start free</MagneticButton>
        </div>
      </Reveal>
    </div>
  );
}
