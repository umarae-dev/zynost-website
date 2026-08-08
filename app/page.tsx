import { Hero } from "@/components/sections/Hero";
import { WhyZynostSwap } from "@/components/sections/WhyZynostSwap";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FeatureReveal } from "@/components/sections/FeatureReveal";
import { Problem } from "@/components/sections/Problem";
import { AgentsShowcase } from "@/components/sections/AgentsShowcase";
import { SystemPlannedTrade } from "@/components/sections/SystemPlannedTrade";
import { SkepticJudge } from "@/components/sections/SkepticJudge";
import { BacktestTransparency } from "@/components/sections/BacktestTransparency";
import { ShowcaseStack } from "@/components/sections/ShowcaseStack";
import { Pricing } from "@/components/sections/Pricing";
import { DeveloperCard } from "@/components/sections/DeveloperCard";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyZynostSwap />
      <TrustStrip />
      <FeatureReveal />
      <Problem />
      <AgentsShowcase />
      <SystemPlannedTrade />
      <SkepticJudge />
      <BacktestTransparency />
      <ShowcaseStack />
      <Pricing />
      <DeveloperCard />
      <FAQ />
      <FinalCTA />
    </>
  );
}
