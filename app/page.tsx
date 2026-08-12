import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProductExperience } from "@/components/sections/ProductExperience";
import { IntelligenceArchitecture } from "@/components/sections/IntelligenceArchitecture";
import { WhyZynostSwap } from "@/components/sections/WhyZynostSwap";
import { AgentsShowcase } from "@/components/sections/AgentsShowcase";
import { SystemPlannedTrade } from "@/components/sections/SystemPlannedTrade";
import { SkepticJudge } from "@/components/sections/SkepticJudge";
import { BacktestTransparency } from "@/components/sections/BacktestTransparency";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductExperience />
      <IntelligenceArchitecture />
      <WhyZynostSwap />
      <AgentsShowcase />
      <SystemPlannedTrade />
      <SkepticJudge />
      <BacktestTransparency />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
