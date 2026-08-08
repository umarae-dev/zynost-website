"use client";

import { Play } from "lucide-react";
import { ImageRotatorBox } from "@/components/shared/ImageRotatorBox";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
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
    <section className="relative overflow-hidden pb-24 pt-12 sm:pt-16 lg:flex lg:min-h-[640px] lg:items-center">
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

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        {/* Left: copy — nudged right slightly (extra left padding) so the
            fixed left-edge SocialRail has clear breathing room and never
            reads as crowding the heading/paragraph. */}
        <div className="relative z-10 pl-3 sm:pl-8 lg:pl-6 lg:pt-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
            DECISION INTELLIGENCE PLATFORM
          </div>

          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
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

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            18 AI agents analyze the market from every angle. One verdict. Clear reasons.
            Backtested proof.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href={SITE.appUrl}>Start free</MagneticButton>
            <MagneticButton href="#system-planned-trade" variant="secondary">
              <Play size={14} />
              See how it works
            </MagneticButton>
          </div>

          <div className="mt-14 grid grid-cols-4 gap-4 border-t border-border pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-tabular text-2xl font-bold sm:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image rotator — top-aligned with the heading (grid is
            items-start on desktop) rather than vertically centered, wider
            than the old network illustration, nudged up a touch more with
            a small negative margin. Centered and shorter on mobile. */}
        <div className="relative flex justify-center lg:-mt-3 lg:justify-end">
          <ImageRotatorBox className="h-72 w-full max-w-md sm:h-96 lg:h-[460px] lg:w-full lg:max-w-[560px]" />
        </div>
      </div>

      {/* faint bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
