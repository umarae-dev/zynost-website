import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Important limitations of ${SITE.name}'s AI analysis and trade data.`,
};

function NotAdviceCallout() {
  return (
    <div className="mb-10 flex items-start gap-3 rounded-2xl border border-warn/30 bg-warn/10 p-5">
      <AlertTriangle size={20} className="mt-0.5 shrink-0 text-warn" />
      <p className="text-sm leading-relaxed text-foreground">
        <strong>Not financial advice.</strong> Every entry, stop-loss, and take-profit zone
        shown comes from real price/volume history — but it is presented as one possible
        structure, never an instruction to trade. You still make the final call on if, when,
        and how much to trade, and you should always size it to what you&apos;re truly fine
        risking.
      </p>
    </div>
  );
}

const sections: LegalSection[] = [
  {
    id: "not-advice",
    title: "1. Not Financial Advice",
    body: (
      <p>
        {SITE.name} is a research and decision-support tool. Nothing on the Service —
        including AI-generated verdicts, System Planned Trade setups, backtest statistics, or
        agent commentary — constitutes financial, investment, legal, or tax advice. We are not
        a registered investment advisor, broker, or dealer in any jurisdiction.
      </p>
    ),
  },
  {
    id: "no-guarantee",
    title: "2. No Guarantee of Results",
    body: (
      <p>
        Cryptocurrency markets are highly volatile and unpredictable. Past performance —
        including any published backtested win rate or average return — is not indicative of
        future results. A historical edge can shrink, disappear, or reverse as market
        conditions change.
      </p>
    ),
  },
  {
    id: "backtest-limitations",
    title: "3. Backtest & Data Limitations",
    body: (
      <p>
        Backtested statistics are calculated against a defined historical universe and
        methodology, disclosed for transparency. They involve simplifications (e.g. a fixed
        coin universe, specific stop/target assumptions) that may not exactly match live
        trading conditions, execution slippage, or fees. Real-time data is sourced from public
        exchange APIs and, while we work to keep it accurate, brief delays or discrepancies can
        occur.
      </p>
    ),
  },
  {
    id: "your-responsibility",
    title: "4. Your Responsibility",
    body: (
      <p>
        You are solely responsible for your own trading and investment decisions. We strongly
        encourage independent research, consulting a licensed financial advisor, and never
        risking more than you can afford to lose.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "5. Third-Party Links & Data",
    body: (
      <p>
        The Service may reference or link to third-party exchanges, news sources, or data
        providers. We do not control and are not responsible for the accuracy or availability
        of third-party content.
      </p>
    ),
  },
  {
    id: "contact",
    title: "6. Contact Us",
    body: (
      <p>
        Questions about this disclaimer? Email{" "}
        <a href="mailto:support@zynost.com" className="text-violet hover:underline">
          support@zynost.com
        </a>
        .
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPageShell
      title="Disclaimer"
      updatedAt="July 24, 2026"
      intro={<NotAdviceCallout />}
      sections={sections}
    />
  );
}
