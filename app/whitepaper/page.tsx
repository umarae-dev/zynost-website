import type { Metadata } from "next";
import "@/styles/print.css";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { PrintButton } from "@/components/shared/PrintButton";
import { whitepaperSections } from "@/content/whitepaperSections";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Whitepaper",
  description: `The ${SITE.name} whitepaper — Zynost, Zynost Pay, and the UQX token, in full technical and economic detail.`,
};

export default function WhitepaperPage() {
  return (
    <LegalPageShell
      title="UQX Whitepaper"
      updatedAt="August 2026"
      actions={<PrintButton label="Download as PDF" />}
      intro={
        <p>
          A complete, plainly-written account of Zynost, Zynost Pay, and UQX — what&apos;s real and
          shipped today, what&apos;s planned, how the token is designed to avoid the mistakes other
          reward tokens have made, and the risks you should understand before participating.
        </p>
      }
      sections={whitepaperSections}
    />
  );
}
