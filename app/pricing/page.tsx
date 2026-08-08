import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Simple, transparent pricing for ${SITE.name} — decision intelligence for every trader.`,
};

export default function PricingPage() {
  return (
    <div className="pt-10">
      <Pricing />
      <FAQ />
    </div>
  );
}
