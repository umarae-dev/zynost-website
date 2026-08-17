import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Roadmap",
  description: `The ${SITE.name} product roadmap, including UQX's path to token launch.`,
};

type Product = {
  name: string;
  tagline: string;
  shipped: string[];
  next: string[];
};

const PRODUCTS: Product[] = [
  {
    name: "Zynost",
    tagline: "AI Intelligence Platform — app.zynost.com",
    shipped: [
      "17 specialist AI agents working together — research, planning, portfolio, coaching, psychology, and learning",
      "Decision Brief — an evidence-grounded synthesis, generated fresh in whichever language you ask for",
      "Institutional Lenses (5 lenses) and FlowState (5-dimension market regime score)",
      "Market Twin — historical pattern matching, live for BTC and ETH",
      "System Planned Trade — automatically re-scans every 10 minutes, filtered through historical backtesting",
      "Multi-exchange order book monitoring across 14 major exchanges",
      "Portfolio, performance, and trading-psychology coaching built on your real trade history",
    ],
    next: [
      "Expand Market Twin beyond BTC/ETH to more coins",
      "Broader exchange and DEX coverage",
    ],
  },
  {
    name: "Zynost Pay",
    tagline: "Payment Gateway — pay.zynost.com",
    shipped: [
      "Non-custodial gasless checkout on BNB Smart Chain (ERC-4337 — no gas fee for the customer)",
      "WalletConnect v2, plus direct support for MetaMask, Trust Wallet, and other injected wallets",
      "Multi-chain payment acceptance — Ethereum, BNB Smart Chain, Polygon, and Solana (USDT/USDC)",
      "Merchant dashboard with API key rotation and business profile management",
    ],
    next: [
      "Gasless checkout expansion to more chains",
      "Full identity-verified (KYB) merchant onboarding",
      "Broader token support",
    ],
  },
];

const UQX_PHASES = [
  { phase: "Phase 1", title: "Mining", body: "Live now inside the UQX app. Earn UQX daily, boosted by referral tiers.", status: "current" as const },
  { phase: "Phase 2", title: "Presale", body: "Real UQX, sent directly to your own wallet, ahead of public trading." },
  { phase: "Phase 3", title: "DEX Listing", body: "Public trading opens with locked, verifiable liquidity." },
  { phase: "Phase 4", title: "Ecosystem", body: "UQX utility expands into Zynost Pay and the wider Zynost platform." },
];

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-wider text-violet">Roadmap</span>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          What's shipped, and what's next.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Zynost is a real, live ecosystem, not a whitepaper promise. Here's exactly what's already
          shipped across every product, and where each one is headed next.
        </p>
      </Reveal>

      {PRODUCTS.map((product, idx) => (
        <div key={product.name} className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-bullish">Shipped</span>
              <RevealGroup className="mt-3 space-y-3">
                {product.shipped.map((item) => (
                  <RevealItem key={item}>
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-bullish" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky">Next</span>
              <RevealGroup className="mt-3 space-y-3">
                {product.next.map((item) => (
                  <RevealItem key={item}>
                    <div className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-transparent p-4">
                      <ArrowRight size={18} className="mt-0.5 shrink-0 text-sky" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
          {idx < PRODUCTS.length - 1 && <div className="mt-16 border-t border-border" />}
        </div>
      ))}

      <div className="mt-16 border-t border-border pt-16">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">UQX Token</h2>
          <p className="mt-1 text-sm text-muted-foreground">The utility token connecting the Zynost ecosystem</p>
        </Reveal>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {UQX_PHASES.map((p) => (
            <RevealItem key={p.phase}>
              <div className={`h-full rounded-2xl border p-5 ${p.status === "current" ? "border-violet bg-violet/[0.06]" : "border-border bg-card"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet">{p.phase}</span>
                  {p.status === "current" && (
                    <span className="rounded-full bg-violet px-2 py-0.5 text-[10px] font-semibold text-white">LIVE</span>
                  )}
                </div>
                <h3 className="mt-2 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal delay={0.1} className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface/60 p-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Want the full token breakdown?</h2>
        <p className="max-w-md text-muted-foreground">
          Supply, allocation, and vesting are laid out in detail on the Tokenomics page.
        </p>
        <MagneticButton href="/tokenomics">View Tokenomics</MagneticButton>
      </Reveal>
    </div>
  );
}
