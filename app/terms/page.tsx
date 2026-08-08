import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${SITE.name}.`,
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: (
      <p>
        By accessing or using {SITE.name} (the &ldquo;Service&rdquo;), you agree to be bound
        by these Terms &amp; Conditions. If you do not agree, please do not use the Service.
      </p>
    ),
  },
  {
    id: "description",
    title: "2. Description of Service",
    body: (
      <p>
        {SITE.name} provides AI-generated research, analysis, and educational content about
        cryptocurrency assets, sourced from real market data. The Service also includes
        portfolio tracking, trade journaling, and price alert tools you use voluntarily. The
        Service is a research and decision-support tool — see our{" "}
        <a href="/disclaimer" className="text-violet hover:underline">Disclaimer</a>{" "}
        for important limitations.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "3. Accounts",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>You must provide accurate information when creating an account.</li>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>You are responsible for all activity that occurs under your account.</li>
        <li>You must be at least 18 years old to use the Service.</li>
      </ul>
    ),
  },
  {
    id: "subscriptions",
    title: "4. Subscriptions & Billing",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Paid plans (Pro / Pro Plus) are billed exclusively in cryptocurrency (USDT/USDC on
          BNB Smart Chain, Ethereum, Polygon, or Solana) sent to a unique deposit address we
          generate for your invoice.
        </li>
        <li>
          <strong className="text-foreground">Plans do not auto-renew.</strong> Because crypto
          payments cannot be automatically charged, your access simply lapses back to the Free
          tier at the end of your paid period unless you manually complete a new payment before
          then.
        </li>
        <li>Prices may change with at least 30 days&apos; notice before your current period ends.</li>
        <li>See our <a href="/refund-policy" className="text-violet hover:underline">Refund Policy</a> for refund eligibility.</li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable Use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Reverse-engineer, scrape, or resell the Service or its AI outputs at scale without permission.</li>
          <li>Use the Service for any unlawful purpose or to violate any applicable regulation.</li>
          <li>Attempt to disrupt, overload, or gain unauthorized access to our systems.</li>
          <li>Misrepresent Service outputs as licensed financial advice to third parties.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    title: "6. Intellectual Property",
    body: (
      <p>
        The Service, including its design, code, AI prompts, and branding, is owned by{" "}
        {SITE.name} and protected by intellectual property laws. You retain ownership of any
        data you input (like your portfolio or trade logs); you grant us a limited license to
        process it solely to provide the Service to you.
      </p>
    ),
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    body: (
      <p>
        The Service is provided &ldquo;as is&rdquo; without warranties of any kind. To the
        maximum extent permitted by law, {SITE.name} is not liable for any trading losses,
        indirect, incidental, or consequential damages arising from your use of the Service.
        See our{" "}
        <a href="/disclaimer" className="text-violet hover:underline">Disclaimer</a> for more
        on this.
      </p>
    ),
  },
  {
    id: "termination",
    title: "8. Termination",
    body: (
      <p>
        We may suspend or terminate your access if you violate these Terms. You may stop using
        the Service and delete your account at any time.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    body: <p>These Terms are governed by applicable local law in the jurisdiction where the Service is operated, without regard to conflict-of-law principles.</p>,
  },
  {
    id: "changes",
    title: "10. Changes to These Terms",
    body: (
      <p>
        We may update these Terms periodically. Continued use of the Service after changes
        take effect constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Us",
    body: (
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:legal@zynost.com" className="text-violet hover:underline">
          legal@zynost.com
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms & Conditions"
      updatedAt="July 28, 2026"
      sections={sections}
    />
  );
}
