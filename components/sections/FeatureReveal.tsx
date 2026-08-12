"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, LineChart, ShieldCheck, Wallet } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_BREAKPOINT_PX = 768;

const FEATURES = [
  {
    icon: Bot,
    title: "18 AI Agents, One System",
    desc: "Relevant agents activate across research, critical review, planning, portfolio, coaching, psychology, and learning — each with a distinct responsibility.",
  },
  {
    icon: LineChart,
    title: "Real, Backtested Track Record",
    desc: "Every signal is forward-tracked against real price action. No cherry-picked wins — the full win-rate, good and bad, is always visible.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent by Design",
    desc: "The Skeptic Judge cross-examines every call before it ships. If the case isn't solid, it doesn't reach you.",
  },
  {
    icon: Wallet,
    title: "Non-Custodial Payments",
    desc: "Zynost Pay never holds your funds — every payment lands directly at an address only you control, powered by the same platform.",
  },
];

function FeatureCard({
  f,
  className,
  cardRef,
}: {
  f: (typeof FEATURES)[number];
  className?: string;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-xl ${className ?? ""}`}
    >
      {/* Smoke hover effect: a soft, slowly drifting blurred glow that only
          appears under the cursor - pure CSS (no JS per frame), and only
          reachable at all on a device with real hover (see the sm:
          variants below), so it costs nothing on touch. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute -inset-24 animate-smoke-drift-1 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_65%)] blur-3xl" />
        <div className="absolute -inset-24 animate-smoke-drift-2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-violet/15 text-violet">
        <f.icon size={20} />
      </div>
      <h3 className="relative mt-5 text-lg font-semibold">{f.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
    </div>
  );
}

/**
 * Desktop: a pinned section - the page holds still while these 4 cards
 * build up one at a time as the user scrolls, staying visible once
 * revealed, only unpinning once all 4 are up. Mobile: none of that - a
 * real reported issue was this (and GSAP itself) hurting mobile load/
 * scroll feel, and scroll-jacking is broadly considered poor mobile UX
 * anyway (fights the browser's own address-bar show/hide and touch
 * momentum scrolling) - so under MOBILE_BREAKPOINT_PX this renders as a
 * plain static grid, GSAP/ScrollTrigger never even initializes, matching
 * the same tiered pattern HeroCanvas already uses for its own WebGL scene.
 */
export function FeatureReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pinEnabled, setPinEnabled] = useState(false);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPinEnabled(window.innerWidth >= MOBILE_BREAKPOINT_PX);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    if (!pinEnabled) return;
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: 48, scale: 0.94 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 55}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, i);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pinEnabled]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center overflow-hidden bg-background ${pinEnabled ? "h-screen" : "py-20"}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(139,92,246,0.08),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            Why Zynost
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Four things no other platform bundles together.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.title}
              f={f}
              className={pinEnabled ? "" : "animate-fade-in-up"}
              cardRef={pinEnabled ? (el) => { cardRefs.current[i] = el; } : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
