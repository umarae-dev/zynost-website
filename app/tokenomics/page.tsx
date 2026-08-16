import type { Metadata } from "next";
import { Coins } from "lucide-react";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "UQX Tokenomics",
  description: "Supply, distribution, and utility of the UQX token.",
};

export default function TokenomicsPage() {
  return (
    <ComingSoon
      icon={Coins}
      eyebrow="Tokenomics"
      title="UQX tokenomics — coming soon."
      body="Supply, mining rate, presale structure, and how UQX is used across Zynost Pay and the Zynost app will be published here before launch."
    />
  );
}
