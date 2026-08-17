import type { Metadata } from "next";
import "@/styles/print.css";
import { ShieldCheck, Lock, Coins, TrendingUp } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { PrintButton } from "@/components/shared/PrintButton";
import { AllocationChart } from "@/components/tokenomics/AllocationChart";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "UQX Tokenomics",
  description: "Supply, allocation, vesting, and utility of the UQX token.",
};

const PRINCIPLES = [
  {
    icon: Lock,
    title: "Nothing unlocks all at once",
    body: "Every allocation — including mining rewards — vests gradually after launch instead of becoming fully liquid on day one. No single group can flood the market at once.",
  },
  {
    icon: ShieldCheck,
    title: "Fixed, capped supply",
    body: "1,000,000,000 UQX, fixed at deployment. The contract has no further minting function — supply cannot be increased later.",
  },
  {
    icon: Coins,
    title: "Real, non-custodial tokens",
    body: "UQX is a real BEP-20 token on BNB Smart Chain, sent directly to your own wallet — never an internal database promise.",
  },
  {
    icon: TrendingUp,
    title: "Built on real utility",
    body: "UQX isn't a standalone speculative token — it's tied to two live products: Zynost's AI research platform and Zynost Pay's payment infrastructure.",
  },
];

const PHASES = [
  { phase: "Phase 1", title: "Mining", body: "Currently underway inside the UQX app. Rewards accrue daily and are tracked per-account." },
  { phase: "Phase 2", title: "Presale", body: "Early buyers purchase real UQX directly to their own wallet, ahead of public DEX trading." },
  { phase: "Phase 3", title: "DEX Listing", body: "Public trading opens with locked, verifiable liquidity. Target: within 12 months of presale." },
  { phase: "Phase 4", title: "Ecosystem", body: "UQX utility expands into Zynost Pay and the wider Zynost platform." },
];

const FAQS = [
  {
    q: "Why 1,000,000,000 and not some other number?",
    a: "The exact number matters less than the fraction of it that's free-to-market at any given time — see 'How this avoids the mistakes other reward tokens made' below. 1 billion is a comparatively small total supply next to other large-scale mining-reward tokens, and combined with the vesting schedule, it keeps the maximum possible circulating supply at any point well below what real utility demand would need to absorb.",
  },
  {
    q: "Why is 20% liquid immediately instead of 0% or 100%?",
    a: "0% would mean nobody can use or trade anything they've earned for months, which we think is unreasonable for people who mined for a long time or bought in presale. 100% is the mistake this whole design exists to avoid. 20% gives real, immediate usability without creating a launch-day supply shock — the remaining 80% still has to earn its way onto the market over months, not minutes.",
  },
  {
    q: "Can the vesting schedule be changed after launch?",
    a: "No. Once the vesting contract's root is set at launch, there is no function in the contract that can change it, accelerate it, or move it — for anyone, including us. See the Whitepaper's Technical Architecture section for the exact mechanism.",
  },
  {
    q: "What happens to UQX that's mined but never claimed?",
    a: "It simply sits, unclaimed, in the vesting contract indefinitely — nobody else can claim it, and it isn't redirected anywhere. In practice, some fraction of any large user base stops being active over time, so unclaimed balances act as a natural (if unplanned) reduction in effective circulating supply.",
  },
  {
    q: "Is the presale price fixed?",
    a: "Presale pricing and any tiered/round structure will be published in a dedicated presale terms document before the presale opens — we're not publishing a price here until it's final, rather than committing to a number that might need to change.",
  },
];

export default function TokenomicsPage() {
  return (
    <div className="print-page mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet">Tokenomics</span>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Designed to be held, not dumped.
            </h1>
          </div>
          <div className="print-hide mt-1"><PrintButton label="Download as PDF" /></div>
        </div>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          UQX has a fixed supply of <strong className="text-foreground">1,000,000,000 tokens</strong> on
          BNB Smart Chain. Every allocation below — including the tokens you mine for free in the app —
          is released gradually over time, not all at once. That's a deliberate design choice, not an
          afterthought.
        </p>
      </Reveal>

      {/* Allocation */}
      <Reveal delay={0.08} className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-10">
        <h2 className="text-xl font-semibold">Total Supply Allocation</h2>
        <p className="mt-1 text-sm text-muted-foreground">1,000,000,000 UQX · BEP-20 · BNB Smart Chain</p>
        <div className="mt-8">
          <AllocationChart />
        </div>
      </Reveal>

      {/* Principles */}
      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">How this avoids the mistakes other reward tokens made</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Reward-token projects with huge, ungated supplies have a well-documented failure pattern:
            millions of users earn tokens for free, those tokens unlock with no time-based release, and
            the resulting sell pressure overwhelms real demand within days of launch. UQX's structure is
            built specifically against that pattern.
          </p>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <p.icon size={20} className="text-violet" />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Mining vesting detail */}
      <Reveal className="mt-16 rounded-2xl border border-border bg-surface/60 p-8">
        <h2 className="text-xl font-semibold">Mining Rewards — Vesting in Detail</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            UQX earned through daily mining in the app accrues normally, exactly as it does today — there
            is no change to how mining works before launch. What changes is what happens to that balance
            once the real UQX token goes live:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>At launch, <strong className="text-foreground">20%</strong> of your mined balance becomes a real, transferable token sent directly to your own non-custodial wallet.</li>
            <li>The remaining <strong className="text-foreground">80%</strong> is claimable gradually over the following 8 months (10% per month) from a public, auditable vesting contract — you claim it yourself, whenever you like, once it has vested.</li>
            <li>Presale buyers follow the same principle on a faster schedule: 20% liquid at launch, the remaining 80% over 6 months — reflecting that they took on real financial risk earlier.</li>
          </ul>
        </div>
      </Reveal>

      {/* Path to listing */}
      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">Path to Listing</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {PHASES.map((p, i) => (
            <RevealItem key={p.phase}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet">{p.phase}</span>
                <h3 className="mt-2 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                {i < PHASES.length - 1 && (
                  <span aria-hidden className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-border sm:block">→</span>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-4 text-xs text-muted-foreground">
          Timelines are internal targets, not guarantees — they depend on regulatory review, security
          audits, and market conditions at each stage.
        </p>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </Reveal>
        <RevealGroup className="mt-8 space-y-4">
          {FAQS.map((f) => (
            <RevealItem key={f.q}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Disclaimer */}
      <Reveal delay={0.1} className="mt-16 rounded-2xl border border-border bg-surface/60 p-8 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">Important</h2>
        <p className="mt-3">
          UQX is a utility token intended for use within the Zynost ecosystem. It is not a security, is
          not an investment product, and no one associated with {SITE.name} offers guaranteed returns,
          price targets, or financial advice of any kind. Cryptocurrency carries real risk, including
          total loss of value — only participate with what you can afford to lose, and always do your own
          research. Full terms will be published alongside the presale.
        </p>
      </Reveal>

      <Reveal delay={0.16} className="mt-10 flex justify-center">
        <MagneticButton href="/roadmap">See the full Roadmap</MagneticButton>
      </Reveal>
    </div>
  );
}
