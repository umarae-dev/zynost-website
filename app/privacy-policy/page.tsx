import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your data.`,
};

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: (
      <>
        <p>
          This Privacy Policy explains how {SITE.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
          or &ldquo;our&rdquo;) collects, uses, discloses, and safeguards your information
          when you use our website and application (together, the &ldquo;Service&rdquo;).
          By using the Service, you agree to the collection and use of information as
          described here.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    body: (
      <>
        <p>
          <strong className="text-foreground">Account information.</strong> When you sign
          up, we collect your email address and, if you sign in with Google or Facebook, the
          basic profile information those providers share with us.
        </p>
        <p>
          <strong className="text-foreground">Usage data you provide.</strong> Portfolio
          holdings, logged trades, alerts you create, and coins you watch — this data exists
          specifically to power features like performance coaching and portfolio analysis,
          and is never sold.
        </p>
        <p>
          <strong className="text-foreground">Automatically collected data.</strong> Standard
          technical data such as IP address, browser type, device type, and general usage
          analytics (which pages/features are used) to keep the Service reliable and improve
          it over time.
        </p>
        <p>
          <strong className="text-foreground">Payment data.</strong> Paid plans are billed in
          cryptocurrency (USDT/USDC on BNB Smart Chain, Ethereum, Polygon, or Solana). We do
          not collect card or bank details at all. Each invoice generates a unique deposit
          address; we record the amount, asset, chain, and transaction hash of any payment sent
          to it — all of which is already public on the relevant blockchain, not private
          financial data we&apos;re introducing.
        </p>
      </>
    ),
  },
  {
    id: "uqx-app",
    title: "3. UQX App — Additional Data We Collect",
    body: (
      <>
        <p>
          UQX, our rewards app built on {SITE.name}&apos;s infrastructure, collects a few
          additional data types beyond what&apos;s listed above, specific to how that app
          works:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Phone number.</strong> Collected during account
            registration for account verification and security purposes.
          </li>
          <li>
            <strong className="text-foreground">Profile photo.</strong> Optionally uploaded by
            the user to personalize their account; can be changed or removed at any time.
          </li>
          <li>
            <strong className="text-foreground">Referral relationships.</strong> Your referral
            code and which users you&apos;ve referred, used to calculate referral rewards.
          </li>
          <li>
            <strong className="text-foreground">UQX balance and transfer history.</strong> An
            internal ledger of your UQX balance and any peer-to-peer transfers between UQX
            users — this is an app-level record, not a public blockchain transaction.
          </li>
          <li>
            <strong className="text-foreground">Push notification device token.</strong> A
            device-specific identifier used solely to deliver in-app notifications (account
            activity, transfer alerts); never used for advertising.
          </li>
          <li>
            <strong className="text-foreground">Two-factor authentication data.</strong> If you
            enable 2FA, we store a securely hashed authentication secret and one-way-hashed
            backup recovery codes — never in plain text.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "4. How We Use Your Information",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To provide, operate, and maintain the Service.</li>
        <li>To generate your AI analysis, verdicts, and personalized coaching from data you provide.</li>
        <li>To process subscription billing and send transactional emails (receipts, password resets).</li>
        <li>To detect, prevent, and address technical issues or abuse.</li>
        <li>To communicate product updates, if you&apos;ve opted in to marketing emails (you can opt out anytime).</li>
      </ul>
    ),
  },
  {
    id: "third-parties",
    title: "5. Third-Party Services",
    body: (
      <>
        <p>
          We use a small number of third-party services to operate {SITE.name}, each bound
          by their own privacy terms:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Anthropic (Claude API)</strong> — processes
            coin/market data to generate AI analysis. Anthropic does not receive your
            account email or personal identity.
          </li>
          <li>
            <strong className="text-foreground">Public exchange APIs</strong> (Binance,
            KuCoin, OKX, Bybit, Gate.io, Mexc) — provide real-time market data; no personal
            data is sent to them.
          </li>
          <li>
            <strong className="text-foreground">Google / Facebook Sign-In</strong> — optional,
            only used if you choose to sign in that way.
          </li>
          <li>
            <strong className="text-foreground">Public blockchain networks</strong> (BNB Smart
            Chain, Ethereum, Polygon, Solana) — we check public on-chain data to detect when an
            invoice has been paid; no personal information is ever sent to or read from a chain.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies",
    body: (
      <p>
        We use essential cookies/local storage to keep you signed in and remember your
        preferences (like light/dark mode). We do not use third-party advertising trackers.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    body: (
      <p>
        We retain your account data for as long as your account is active. If you delete your
        account, we permanently remove your personal data within 30 days, except where we&apos;re
        required to retain certain records for legal or accounting purposes.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    body: (
      <p>
        You can access, correct, export, or delete your personal data at any time from your
        account settings, or by contacting us at{" "}
        <a href="mailto:privacy@zynost.com" className="text-violet hover:underline">
          privacy@zynost.com
        </a>
        . Depending on your location, you may have additional rights under laws like GDPR or
        CCPA.
      </p>
    ),
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    body: (
      <p>
        The Service is not directed to anyone under 18. We do not knowingly collect personal
        information from children. If you believe a child has provided us data, contact us and
        we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. We&apos;ll notify you of material
        changes by email or an in-app notice before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Us",
    body: (
      <p>
        Questions about this policy? Email{" "}
        <a href="mailto:privacy@zynost.com" className="text-violet hover:underline">
          privacy@zynost.com
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      updatedAt="July 28, 2026"
      intro={<p>Your trust matters. Here&apos;s exactly what we collect and why.</p>}
      sections={sections}
    />
  );
}
