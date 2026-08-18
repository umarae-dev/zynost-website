import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { PrintButton } from "@/components/shared/PrintButton";
import { SITE } from "@/lib/constants";
import { UQX_TOKEN_ADDRESS, UQX_PRESALE_ADDRESS } from "@/lib/web3/presaleConfig";

export const metadata: Metadata = {
  title: "Presale Terms & Conditions",
  description: "The terms that govern buying UQX in the presale — eligibility, vesting, risk, and how the sale actually works on-chain.",
};

const TOKEN_SCAN_URL = `https://bscscan.com/address/${UQX_TOKEN_ADDRESS}`;
const PRESALE_SCAN_URL = `https://bscscan.com/address/${UQX_PRESALE_ADDRESS}`;

const sections: LegalSection[] = [
  {
    id: "what-this-is",
    title: "1. What This Presale Is",
    body: (
      <>
        <p>
          The UQX presale is a direct, on-chain sale of UQX — the utility token of the Zynost
          ecosystem — at a fixed price, paid in USDT or USDC on BNB Smart Chain. Buying UQX gives
          you the token itself, sent to your own wallet; it does not give you equity, a share of
          revenue or profits, voting control over {SITE.name}, or any other ownership interest.
        </p>
        <p>
          UQX is not being offered or sold as a security, and nothing on this page or the presale
          widget is an offer to sell securities in any jurisdiction where that offer would be
          unlawful. See the{" "}
          <a href="/whitepaper#risks" className="text-violet hover:underline">
            Whitepaper&apos;s Risk Factors section
          </a>{" "}
          for the full risk disclosure.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>You must be at least 18 years old, or the age of majority in your jurisdiction if higher.</li>
        <li>
          You are solely responsible for determining whether buying UQX is lawful where you live.
          If cryptocurrency purchases, presales, or token sales are restricted or prohibited in
          your jurisdiction, you must not participate.
        </li>
        <li>
          You must not be a resident of, or acting on behalf of a person or entity in, a country
          or territory subject to comprehensive sanctions, and you must not appear on any
          sanctions or restricted-party list maintained by the UN, US OFAC, EU, or UK.
        </li>
        <li>
          The presale contract does not currently perform identity verification (KYC) or
          geo-blocking — meeting the eligibility requirements above is your responsibility, not
          something the contract enforces for you.
        </li>
      </ul>
    ),
  },
  {
    id: "how-it-works",
    title: "3. How the Sale Works",
    body: (
      <>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Price is fixed at <strong className="text-foreground">$0.005 per UQX</strong>, paid in
            USDT or USDC on BNB Smart Chain. The price does not change during the sale and is not
            set by supply/demand.
          </li>
          <li>
            The sale is hard-capped on-chain at{" "}
            <strong className="text-foreground">150,000,000 UQX</strong> (15% of the fixed
            1,000,000,000 total supply) — the contract rejects any purchase that would exceed it.
          </li>
          <li>
            Every purchase is a normal blockchain transaction, not a database entry. The moment
            your transaction confirms, your allocation is recorded in the presale contract&apos;s
            own storage under your wallet address.
          </li>
          <li>
            Payment is forwarded to {SITE.name}&apos;s treasury wallet immediately on purchase —
            the presale contract itself never holds or custodies your stablecoins.
          </li>
        </ul>
        <p className="mt-4">
          Contract addresses, verifiable on BscScan:
        </p>
        <ul className="list-disc space-y-1 pl-5 font-mono text-xs">
          <li>
            UQX token:{" "}
            <a href={TOKEN_SCAN_URL} target="_blank" rel="noopener noreferrer" className="text-violet hover:underline">
              {UQX_TOKEN_ADDRESS}
            </a>
          </li>
          <li>
            Presale contract:{" "}
            <a href={PRESALE_SCAN_URL} target="_blank" rel="noopener noreferrer" className="text-violet hover:underline">
              {UQX_PRESALE_ADDRESS}
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "vesting",
    title: "4. Vesting Schedule",
    body: (
      <>
        <p>
          UQX bought in the presale is not fully liquid the moment you buy. Instead:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">20%</strong> of your total purchased amount is claimable immediately.</li>
          <li>
            The remaining <strong className="text-foreground">80%</strong> vests linearly over{" "}
            <strong className="text-foreground">180 days</strong>, starting from the timestamp of
            your first purchase — not a shared launch date.
          </li>
          <li>
            If you buy more than once, later purchases add to the same balance and vest on the
            same clock that started with your first purchase.
          </li>
          <li>
            Claiming is a separate transaction you initiate yourself, whenever you like, for
            whatever portion has vested and hasn&apos;t already been claimed. Nothing is sent to
            you automatically.
          </li>
        </ul>
        <p className="mt-4">
          This schedule is enforced by the presale smart contract itself, not by policy — it
          cannot be sped up, bypassed, or changed for an individual buyer by anyone, including
          {" "}{SITE.name}.
        </p>
      </>
    ),
  },
  {
    id: "non-custodial",
    title: "5. Non-Custodial — You Control Your Wallet",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          UQX is sent directly to the wallet address you connect and buy from. {SITE.name} never
          takes custody of your tokens, your payment, or your private keys at any point.
        </li>
        <li>
          You are solely responsible for the security of your wallet, its private key, and its
          recovery phrase. Anyone who obtains them can access and move your tokens — {SITE.name}
          has no way to recover funds from a lost or compromised wallet.
        </li>
        <li>
          Double-check the connected wallet address and the amount before confirming any
          transaction. Blockchain transactions cannot be reversed once confirmed.
        </li>
      </ul>
    ),
  },
  {
    id: "no-refunds",
    title: "6. No Refunds",
    body: (
      <p>
        Purchases in this presale are on-chain transactions and are final. Because payment is
        forwarded immediately and irreversibly on the blockchain, {SITE.name} cannot reverse a
        purchase, refund a payment, or undo a transaction sent to the wrong address or the wrong
        network. This is different from the{" "}
        <a href="/refund-policy" className="text-violet hover:underline">
          Refund Policy
        </a>{" "}
        that applies to Zynost&apos;s fiat/crypto subscription plans, which is a separate product
        with its own manual review process.
      </p>
    ),
  },
  {
    id: "risks",
    title: "7. Risks",
    body: (
      <>
        <p>
          Buying UQX carries real risk, including total loss of the value paid. Before buying,
          you should understand and accept that:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Cryptocurrency prices are highly volatile and UQX may never trade at, above, or anywhere near the presale price after launch.</li>
          <li>
            Smart contracts, however tested, can contain bugs. The presale and vesting contracts
            have automated test coverage and a scoped emergency-pause capability (see Section 8),
            but no contract can be guaranteed free of vulnerabilities.
          </li>
          <li>Regulatory treatment of tokens and presales varies by jurisdiction and can change, including after you&apos;ve already purchased.</li>
          <li>{SITE.name} makes no promise, express or implied, about UQX&apos;s future price, liquidity, or availability on any exchange.</li>
        </ul>
        <p className="mt-4">
          Only buy with funds you can afford to lose entirely. Full risk disclosure is in{" "}
          <a href="/whitepaper#risks" className="text-violet hover:underline">
            Whitepaper Section 10
          </a>.
        </p>
      </>
    ),
  },
  {
    id: "admin-controls",
    title: "8. Admin Controls & Emergency Pause",
    body: (
      <>
        <p>
          The presale contract has a narrow, purpose-built emergency pause — not a general admin
          override. Pausing halts new purchases and claims; it cannot redirect funds, change the
          price or cap, or alter anyone&apos;s recorded allocation.
        </p>
        <p className="mt-4">
          This pause, and the other limited owner functions (accepting a payment token,
          withdrawing genuinely unsold tokens after the sale), are controlled by a Safe multisig
          proposing through an OpenZeppelin TimelockController with a{" "}
          <strong className="text-foreground">48-hour public delay</strong> — every proposed
          action is visible on-chain for two days before it can execute, and anyone can execute it
          once the delay passes. No single key can act unilaterally or skip the delay. The UQX
          token contract itself has no admin functions at all, ever.
        </p>
      </>
    ),
  },
  {
    id: "no-advice",
    title: "9. Not Investment Advice",
    body: (
      <p>
        Nothing on this page, the presale widget, the Whitepaper, or anywhere else on {SITE.name}
        &apos;s properties is financial, investment, legal, or tax advice. Nobody associated with
        {" "}{SITE.name} is a registered investment advisor, broker, or dealer in any jurisdiction.
        Do your own research and consult a qualified professional before buying.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to These Terms",
    body: (
      <p>
        We may update these presale terms from time to time — for example, to reflect a change in
        the sale&apos;s configuration or applicable law. The &quot;Last updated&quot; date at the
        top of this page always reflects the current version. These terms apply to purchases made
        after any given update; they don&apos;t retroactively change the vesting schedule already
        locked in for tokens you&apos;ve already bought, since that schedule is fixed on-chain per
        purchase.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    body: <p>These Terms are governed by applicable local law in the jurisdiction where the Service is operated, without regard to conflict-of-law principles.</p>,
  },
  {
    id: "contact",
    title: "12. Contact",
    body: (
      <p>
        Questions about the presale or these terms? Email{" "}
        <a href="mailto:legal@zynost.com" className="text-violet hover:underline">
          legal@zynost.com
        </a>
        .
      </p>
    ),
  },
];

export default function PresaleTermsPage() {
  return (
    <LegalPageShell
      title="Presale Terms & Conditions"
      updatedAt="August 18, 2026"
      intro={
        <p>
          These terms govern buying UQX through the presale contract at{" "}
          <a href="/presale" className="text-violet hover:underline">zynost.com/presale</a>.
          Read them before you buy — participating means you accept them.
        </p>
      }
      sections={sections}
      actions={<PrintButton />}
    />
  );
}
