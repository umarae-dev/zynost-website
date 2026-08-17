import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Whitepaper",
  description: `The ${SITE.name} whitepaper — Zynost, Zynost Pay, and the UQX token.`,
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: (
      <>
        <p>
          {SITE.name} is an ecosystem of products built around one idea: real, verifiable systems beat
          hype. This whitepaper covers three things — the {SITE.name} AI intelligence platform, the
          Zynost Pay payment gateway, and UQX, the utility token that connects them.
        </p>
        <p>
          Everything described as &quot;shipped&quot; below is live and in production today, not a
          future promise. Everything described as planned is clearly labeled as such.
        </p>
      </>
    ),
  },
  {
    id: "zynost-platform",
    title: "2. Zynost — AI Intelligence Platform",
    body: (
      <>
        <p>
          {SITE.name} (app.zynost.com) is a decision-intelligence platform for crypto traders — not a
          signal group, and not a black box. Every specialist agent, computed evidence layer, and piece
          of reasoning stays visible to the user.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>17 specialist AI agents</strong> covering technical analysis, liquidity, smart-money structure, on-chain intelligence, news and sentiment, macro conditions, project and security research, risk management, portfolio tracking, performance coaching, and trading psychology.</li>
          <li><strong>Decision Brief</strong> — a synthesized bull case, bear case, and verdict, generated fresh in the user&apos;s own language from the same underlying evidence every time.</li>
          <li><strong>Institutional Lenses</strong> (5 deterministic lenses) and <strong>FlowState</strong> (a 5-dimension market regime score) — computed math, not AI guesswork.</li>
          <li><strong>Market Twin</strong> — matches the current market regime against thousands of real historical analogues, live for BTC and ETH today and expanding over time.</li>
          <li><strong>System Planned Trade</strong> — automatically re-scans live markets every 10 minutes, filtered through historical backtesting before a setup is ever surfaced.</li>
          <li>Multi-exchange order book monitoring across 14 major exchanges, plus real, database-backed portfolio, performance, and trading-psychology coaching.</li>
        </ul>
      </>
    ),
  },
  {
    id: "zynost-pay",
    title: "3. Zynost Pay — Payment Gateway",
    body: (
      <>
        <p>
          Zynost Pay (pay.zynost.com) is a non-custodial crypto payment gateway for merchants, built on
          the same infrastructure that will power the UQX presale.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Non-custodial gasless checkout</strong> on BNB Smart Chain, using account abstraction (ERC-4337) so the customer&apos;s smart account never pays a gas fee.</li>
          <li><strong>WalletConnect v2</strong>, with direct support for MetaMask, Trust Wallet, and other injected wallets.</li>
          <li><strong>Multi-chain payment acceptance</strong> — Ethereum, BNB Smart Chain, Polygon, and Solana, in USDT and USDC.</li>
          <li><strong>Merchant dashboard</strong> with API key rotation and business profile management, with fuller identity verification (KYB) planned as the merchant base grows.</li>
        </ul>
      </>
    ),
  },
  {
    id: "uqx-token",
    title: "4. UQX — Overview",
    body: (
      <>
        <p>
          UQX is the utility token of the {SITE.name} ecosystem. It is earned today through the UQX
          app&apos;s daily mining system, and is designed from the ground up to become a real,
          self-custodied token — not an internal database number that only exists inside one app.
        </p>
        <p>
          UQX is deliberately not a pure speculative mining token. It sits alongside two live, working
          products — a real AI research platform and a real payment gateway — and is designed for
          concrete utility inside both, described further in the Roadmap.
        </p>
        <p>
          Presale buyers receive real UQX sent directly to their own non-custodial wallet at the point of
          purchase — the network fee for that transaction is paid by the buyer, exactly like any standard
          on-chain transaction. Nobody&apos;s balance ever exists only as an unverifiable internal record.
        </p>
      </>
    ),
  },
  {
    id: "tokenomics-summary",
    title: "5. Tokenomics (Summary)",
    body: (
      <>
        <p>
          UQX has a fixed, capped supply of <strong>1,000,000,000 tokens</strong> on BNB Smart Chain, with
          no minting function — supply cannot be increased after deployment. Every allocation, including
          mining rewards, releases gradually over time rather than unlocking all at once, specifically to
          avoid the sell-pressure collapse that has hit other high-supply reward tokens at launch.
        </p>
        <p>
          The full allocation breakdown, vesting schedule, and the reasoning behind each choice is on the{" "}
          <Link href="/tokenomics" className="text-violet underline underline-offset-2">Tokenomics page</Link>.
        </p>
      </>
    ),
  },
  {
    id: "roadmap-summary",
    title: "6. Roadmap (Summary)",
    body: (
      <>
        <p>UQX moves through four phases:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Phase 1 — Mining</strong> (live now): earn UQX daily inside the app, boosted by referral tiers.</li>
          <li><strong>Phase 2 — Presale</strong>: real UQX sold directly to buyer wallets ahead of public trading.</li>
          <li><strong>Phase 3 — DEX Listing</strong>: public trading opens, with liquidity locked and publicly verifiable.</li>
          <li><strong>Phase 4 — Ecosystem</strong>: UQX utility expands into Zynost Pay and the wider Zynost platform.</li>
        </ul>
        <p>
          The full product-by-product breakdown — what&apos;s shipped today versus what&apos;s next — is
          on the <Link href="/roadmap" className="text-violet underline underline-offset-2">Roadmap page</Link>.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "7. Non-Custodial Design & Security",
    body: (
      <>
        <p>
          UQX wallets are generated and held on the user&apos;s own device — {SITE.name} never has access
          to a user&apos;s private keys, and never custodies user funds. This mirrors the same
          non-custodial architecture already running in production on Zynost Pay.
        </p>
        <p>
          Token vesting is enforced by a public, auditable smart contract rather than internal company
          policy — no one, including {SITE.name}, can bypass a user&apos;s vesting schedule or move
          tokens on their behalf.
        </p>
      </>
    ),
  },
  {
    id: "risks",
    title: "8. Risks & Disclaimers",
    body: (
      <>
        <p>
          UQX is a utility token, not a security, an investment contract, or a promise of financial
          return. Cryptocurrency assets are volatile and carry real risk, including total loss of value.
          Nothing in this document, the {SITE.name} app, website, or any associated communication
          constitutes financial, investment, or legal advice.
        </p>
        <p>
          Roadmap timelines are internal targets, not guarantees, and are subject to change based on
          regulatory review, security audits, and market conditions. Availability of UQX may be
          restricted in certain jurisdictions. Full presale terms and conditions will be published ahead
          of the presale opening — read them before participating.
        </p>
      </>
    ),
  },
];

export default function WhitepaperPage() {
  return (
    <LegalPageShell
      title="UQX Whitepaper"
      updatedAt="August 2026"
      intro={
        <p>
          Zynost, Zynost Pay, and UQX, explained in one place — what&apos;s real today, and what&apos;s
          coming next.
        </p>
      }
      sections={sections}
    />
  );
}
