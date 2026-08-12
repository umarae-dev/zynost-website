"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Save the 4 dashboard screenshots into zynost-website/public/hero/ using
// exactly these filenames and they'll show up here automatically.
const IMAGES = [
  {
    src: "/hero/dashboard-1.png",
    alt: "Zynost research workspace with live chart, market data, Skeptic check, and consensus",
    eyebrow: "Research Workspace",
    headline: "Live market context beside the decision.",
  },
  {
    src: "/hero/dashboard-2.png",
    alt: "Zynost agent evidence list showing individual signals, summaries, and confidence",
    eyebrow: "Agent Evidence",
    headline: "Every specialist opinion stays inspectable.",
  },
  {
    src: "/hero/dashboard-3.png",
    alt: "Zynost Order Book Radar overview across multiple crypto markets",
    eyebrow: "Order Book Radar",
    headline: "Resting liquidity tracked across exchanges.",
  },
  {
    src: "/hero/dashboard-4.png",
    alt: "Zynost Bitcoin order-book persistence history and exchange breakdown",
    eyebrow: "Persistence Score",
    headline: "One-frame walls and spoofing noise filtered out.",
  },
];

const ROTATE_INTERVAL_MS = 3000;

/** A browser-window mockup framing 4 real product screenshots that slide
 * (not just crossfade) every 3 seconds, like a premium product-tour
 * slider — the hero's right-side visual. Uses `object-contain` (not
 * `object-cover`) so a wide dashboard screenshot is never cropped, and —
 * matching the branding treatment already used on the ScrollStack cards
 * further down the page — the letterboxed space that leaves is filled
 * with a corner Zynost badge and a bottom eyebrow+headline overlay
 * instead of sitting empty. */
export function ImageRotatorBox({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const current = IMAGES[index];

  return (
    <div
      className={`rounded-[1.75rem] bg-gradient-to-br from-violet/60 via-sky/40 to-violet/60 p-[1.5px] shadow-2xl shadow-violet/20 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.7rem] border border-white/5 bg-[#0a0a12]">
        {/* Fake browser-window chrome */}
        <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-bearish/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-bullish/70" />
          <span className="ml-2 flex-1 truncate rounded-full bg-white/5 px-3 py-1 text-center text-[10px] text-muted-foreground">
            app.zynost.com
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#05050a]">
          {IMAGES.map((img, i) => {
            // Each frame sits in its own 100%-wide slot, offset by how
            // far it is from the current index — a real horizontal slide
            // (transform, GPU-cheap) rather than a plain opacity fade.
            const offset = i - index;
            return (
              <div
                key={img.src}
                className="absolute inset-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ transform: `translateX(${offset * 100}%)` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="h-full w-full object-contain object-top"
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-violet/[0.04] mix-blend-overlay" />

          {/* Corner brand badge */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <span className="font-heading text-xs font-bold tracking-tight text-white">Zynost</span>
          </div>

          {/* Bottom eyebrow + headline, fills the letterbox space with
              branding instead of leaving it empty; crossfades with the
              image it describes. */}
          <div key={current.eyebrow} className="animate-fade-in-up absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-black/40 px-2.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky to-violet" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-200">
                {current.eyebrow}
              </span>
            </span>
            <h4 className="font-heading mt-2 text-balance text-base font-bold leading-tight text-white sm:text-lg">
              {current.headline}
            </h4>
            <div className="mt-3 flex items-center gap-2" role="tablist" aria-label="Product screenshots">
              {IMAGES.map((image, imageIndex) => (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  aria-selected={imageIndex === index}
                  aria-label={`Show ${image.eyebrow}`}
                  onClick={() => setIndex(imageIndex)}
                  className={`h-1.5 rounded-full transition-[width,background-color] ${
                    imageIndex === index ? "w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
