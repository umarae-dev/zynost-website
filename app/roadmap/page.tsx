import type { Metadata } from "next";
import { Map } from "lucide-react";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Roadmap",
  description: `The ${SITE.name} product roadmap, including UQX.`,
};

export default function RoadmapPage() {
  return (
    <ComingSoon
      icon={Map}
      eyebrow="Roadmap"
      title="Our roadmap is being finalized."
      body="This page will lay out what's shipping next across the Zynost ecosystem — including UQX's path to its full token launch. Check back soon."
    />
  );
}
