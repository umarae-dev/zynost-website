"use client";

import { ArrowRight, Check, Play } from "lucide-react";
import { ImageRotatorBox } from "@/components/shared/ImageRotatorBox";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { RotatingWord } from "@/components/shared/RotatingWord";
import { HeroBackground } from "@/components/effects/HeroBackground";
import { STATS, SITE } from "@/lib/constants";

const NOT_WORDS = ["signals.", "noise.", "guesswork.", "hype."];

// The right side used to be the animated 18-node network + floating
// verdict card — replaced with a real-image rotator (4 photos, crossfades
// every 3s) per an explicit request to remove that whole visual.
//
// No entrance/mount animation on any element here (badge, headline, copy,
// CTAs, stats) — on PC or mobile. Everything is static the instant the
// page paints; the only motion left anywhere in the hero is hover-
// triggered (MagneticButton's own hover state) or the image rotator's own
// crossfade.
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pb-24 sm:pt-16 lg:flex lg:min-h-[680px] lg:items-center">
      {/* Molten violet/sky WebGL background — bleeds up under the
          transparent navbar, desktop-only, paused when off-screen. */}
      <HeroBackground />

      {/* Techy starfield/dot-grid background, confined to the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 60% 30%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 60% 30%, black 40%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
        {/* Left: copy — nudged right slightly (extra left padding) so the
            fixed left-edge SocialRail has clear breathing room and never
            reads as crowding the heading/paragraph. */}
        <div className="relative z-10 sm:pl-4 lg:pl-2 lg:pt-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
            CRYPTO DECISION INTELLIGENCE
          </div>

          <h1 className="text-balance text-[2.75rem] font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.5rem]">
            Decision
            <br />
            Intelligence,
            <br />
            <span className="bg-gradient-to-r from-violet to-sky bg-clip-text text-transparent">not </span>
            <RotatingWord
              words={NOT_WORDS}
              className="bg-gradient-to-r from-violet to-sky bg-clip-text text-transparent"
            />
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Live market data and 18 specialist AI agents build the case, challenge the
            consensus, shape the plan, and turn the evidence into one inspectable verdict.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground/75 sm:text-sm">
            {["3 full analyses free", "No card required", "No auto-trading"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-bullish" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href={SITE.appUrl}>
              Start researching <ArrowRight size={14} />
            </MagneticButton>
            <MagneticButton href="#product" variant="secondary">
              <Play size={14} />
              Explore the product
            </MagneticButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-border pt-7 sm:grid-cols-4 lg:mt-12">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-tabular text-2xl font-bold sm:text-[1.7rem]">
                  {s.value.toLocaleString("en-US")}{s.suffix}
                </div>
                <div className="mt-1 max-w-[8rem] text-[11px] leading-4 text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image rotator — top-aligned with the heading (grid is
            items-start on desktop) rather than vertically centered, wider
            than the old network illustration, nudged up a touch more with
            a small negative margin. Centered and shorter on mobile. */}
        <div className="relative flex justify-center lg:-mt-3 lg:justify-end">
          <div aria-hidden className="absolute inset-12 rounded-full bg-violet/20 blur-[100px]" />
          <ImageRotatorBox className="relative h-[290px] w-full max-w-xl sm:h-[410px] lg:h-[500px] lg:max-w-[650px]" />
        </div>
      </div>

      {/* faint bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
