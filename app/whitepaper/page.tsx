import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Whitepaper",
  description: `The ${SITE.name} whitepaper, including UQX tokenomics.`,
};

export default function WhitepaperPage() {
  return (
    <ComingSoon
      icon={FileText}
      eyebrow="Whitepaper"
      title="The whitepaper is in progress."
      body="A full technical and economic breakdown of the Zynost ecosystem and the UQX token is being written. Check back soon."
    />
  );
}
