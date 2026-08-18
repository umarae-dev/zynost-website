import type { Metadata } from "next";
import Link from "next/link";
import { Eye, ShieldCheck, Gavel, Sparkles, LineChart, Wallet, Coins, ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { MagneticButton } from "@/components/shared/MagneticButton";
import Dither from "@/components/effects/Dither";
import { STATS, SITE, ZYNOST_PAY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Why we built ${SITE.name} — decision intelligence over hype.`,
};

const PRODUCTS = [
  {
    icon: LineChart,
    name: "Zynost",
    role: "AI trading intelligence",
    body: "The research workspace this page is about — live analysis, backtested trade plans, deterministic Institutional Lenses/FlowState/Market Twin, and a Decision Brief that argues the other side before you see a verdict.",
    href: SITE.appUrl,
    linkLabel: "app.zynost.com",
  },
  {
    icon: Wallet,
    name: "Zynost Pay",
    role: "Payments infrastructure",
    body: "Our merchant payment gateway — wallet-connect checkout and settlement, built on the same crypto-native infrastructure as everything else under Zynost.",
    href: ZYNOST_PAY_URL,
    linkLabel: "pay.zynost.com",
  },
  {
    icon: Coins,
    name: "UQX",
    role: "Rewards & mining app",
    body: "A mobile rewards app built on Zynost's infrastructure, with its own referral system and token utility across the ecosystem, including Zynost Pay.",
    href: "/tokenomics",
    linkLabel: "UQX tokenomics",
  },
];

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
    body: "The Decision Brief tries to break every bullish case before you ever see a verdict. Honesty is a feature, not an afterthought.",
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
      <div className="relative overflow-hidden rounded-3xl">
        {/* Dithered wave backdrop, brand-violet tinted — the only place
            on the site using this specific retro/CRT-dither texture, kept
            to the About page's intro band rather than reused site-wide.
            Heaviest of the three React Bits effects added this pass (full
            R3F scene + a postprocessing pass), so it's scoped to one
            contained header band rather than a full-page background. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
          <Dither
            waveColor={[0.55, 0.36, 0.96]}
            colorNum={4}
            waveAmplitude={0.25}
            waveFrequency={2.5}
            waveSpeed={0.04}
            enableMouseInteraction={false}
          />
        </div>
        <div className="relative px-2 py-10 sm:px-4">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet">
              About Us
            </span>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              We got tired of guessing, so we built something that doesn&apos;t.
            </h1>
          </Reveal>
        </div>
      </div>

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
          That became 17 specialist agents feeding a deterministic evidence layer — Institutional
          Lenses, FlowState, Market Twin — and one Decision Brief that actively hunts for holes
          in the bullish case before weighing everything into a verdict, in your own language.
          Every strategy we surface is backtested against real history and published
          transparently — including the times a strategy&apos;s edge turned out to be smaller
          than we first measured. We&apos;d rather show you the correction than hide it.
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
          <h2 className="text-2xl font-bold tracking-tight">One ecosystem, three products</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {SITE.name} is the parent — everything below runs on the same infrastructure and
            shares one identity.
          </p>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PRODUCTS.map((p) => (
            <RevealItem key={p.name}>
              <Link
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-violet/50"
              >
                <p.icon size={20} className="text-violet" />
                <h3 className="mt-4 font-semibold">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet">
                  {p.linkLabel}
                  <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

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

      <Reveal delay={0.06} className="mt-10 flex justify-center">
        <Link href="/team" className="text-sm text-violet underline underline-offset-2">
          Meet the team building {SITE.name} →
        </Link>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 rounded-2xl border border-border bg-surface/60 p-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight">See it for yourself.</h2>
        <p className="mt-2 text-muted-foreground">
          No credit card required for unlimited free research.
        </p>
        <div className="mt-6 flex justify-center">
          <MagneticButton href={SITE.appUrl}>Start free</MagneticButton>
        </div>
      </Reveal>
    </div>
  );
}
