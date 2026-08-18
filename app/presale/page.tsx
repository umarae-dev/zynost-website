import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Wallet, Coins } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { PresaleWidget } from "@/components/presale/PresaleWidget";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "UQX Presale",
  description: "Buy real UQX directly to your own wallet — $0.005 per token, paid in USDT or USDC on BNB Smart Chain.",
};

const PRINCIPLES = [
  {
    icon: Wallet,
    title: "Straight to your wallet",
    body: "No waiting, no snapshot event. The moment you buy, your allocation is recorded on-chain and starts vesting immediately.",
  },
  {
    icon: Lock,
    title: "20% liquid at once",
    body: "The remaining 80% vests linearly over 6 months from your first purchase — see the Tokenomics page for the full reasoning.",
  },
  {
    icon: ShieldCheck,
    title: "Owned by a timelock",
    body: "The presale contract's admin functions are controlled by a Safe multisig through a 48-hour public delay — not a single key.",
  },
  {
    icon: Coins,
    title: "Fixed price, hard-capped",
    body: "$0.005 per UQX, capped at 150,000,000 tokens on-chain — the price and the supply can't be changed mid-sale.",
  },
];

export default function PresalePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet">Presale</span>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Buy UQX, directly to your wallet.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          $0.005 per UQX, paid in USDT or USDC on BNB Smart Chain. Real tokens, sent to your own
          non-custodial wallet the moment you buy — never an internal database promise.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <PresaleWidget />
      </Reveal>

      <div className="mt-20">
        <Reveal>
          <h2 className="text-center text-2xl font-bold tracking-tight">How it works</h2>
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

      <Reveal delay={0.1} className="mt-16 rounded-2xl border border-border bg-surface/60 p-8 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">Important</h2>
        <p className="mt-3">
          UQX is a utility token, not a security or an investment product — nobody associated with{" "}
          {SITE.name} offers guaranteed returns or price targets. Cryptocurrency carries real risk,
          including total loss of value. Only participate with what you can afford to lose, and read
          the{" "}
          <Link href="/whitepaper" className="text-violet underline underline-offset-2">Whitepaper</Link>
          {" "}(Section 10, Risk Factors) before buying. You are solely responsible for your own wallet
          and recovery phrase — {SITE.name} cannot recover funds sent to the wrong address or lost
          through a compromised wallet.
        </p>
      </Reveal>

      <Reveal delay={0.16} className="mt-10 flex justify-center gap-4 text-sm">
        <Link href="/tokenomics" className="text-violet underline underline-offset-2">Full Tokenomics</Link>
        <span className="text-border">·</span>
        <Link href="/whitepaper" className="text-violet underline underline-offset-2">Whitepaper</Link>
      </Reveal>
    </div>
  );
}
