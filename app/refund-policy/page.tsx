import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `How refunds work for ${SITE.name} subscriptions.`,
};

const sections: LegalSection[] = [
  {
    id: "how-billing-works",
    title: "1. How Payment Works",
    body: (
      <p>
        Pro and Pro Plus plans are paid entirely in cryptocurrency (USDT/USDC on BNB Smart
        Chain, Ethereum, Polygon, or Solana) — we don&apos;t charge a card, and plans
        don&apos;t auto-renew. Because of that, a refund here means a manual on-chain transfer
        we send back to you, not a card chargeback.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "2. Refund Eligibility",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          You can request a refund on a payment within <strong className="text-foreground">30
          days</strong> of it being confirmed.
        </li>
        <li>
          If you&apos;ve already used some of the analyses that payment unlocked, we deduct an
          estimate of their value from the refund — the app shows you this breakdown before you
          submit.
        </li>
        <li>
          A <strong className="text-foreground">10% processing fee</strong> applies to every
          refund, covering blockchain network fees and processing costs.
        </li>
        <li>Only one refund request may be open per payment at a time.</li>
      </ul>
    ),
  },
  {
    id: "how-to-request",
    title: "3. How to Request a Refund",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open Profile &rarr; Request a Refund inside the app while signed in.</li>
        <li>Pick the payment you want refunded and provide the crypto address the refund should be sent to.</li>
        <li>
          Your request goes into our team&apos;s manual review queue — every refund is reviewed
          by a person before anything is sent, never paid out automatically.
        </li>
        <li>
          You&apos;ll receive an email once we&apos;ve made a decision, including the final
          amount if approved.
        </li>
      </ol>
    ),
  },
  {
    id: "non-refundable",
    title: "4. Non-Refundable Cases",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Accounts terminated for violating our Terms &amp; Conditions.</li>
        <li>Requests made more than 30 days after the payment was confirmed.</li>
        <li>Free-tier credits — these were never paid for, so there&apos;s nothing to refund.</li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "5. Contact Us",
    body: (
      <p>
        Questions about a refund? Email{" "}
        <a href="mailto:billing@zynost.com" className="text-violet hover:underline">
          billing@zynost.com
        </a>{" "}
        — we typically respond within one business day.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageShell
      title="Refund Policy"
      updatedAt="July 28, 2026"
      intro={<p>Straightforward, no dark patterns. Here&apos;s exactly how it works.</p>}
      sections={sections}
    />
  );
}
