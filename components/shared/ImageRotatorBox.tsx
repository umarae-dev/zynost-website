"use client";

import { useEffect, useState } from "react";

// Save the 4 dashboard screenshots into zynost-website/public/hero/ using
// exactly these filenames and they'll show up here automatically.
const IMAGES = [
  { src: "/hero/dashboard-1.png", eyebrow: "Order Book Radar", headline: "Real resting orders, tracked live." },
  { src: "/hero/dashboard-2.png", eyebrow: "Persistence Score", headline: "Spoofing filtered out automatically." },
  { src: "/hero/dashboard-3.png", eyebrow: "Pro Agent Signals", headline: "10 agents, one consensus score." },
  { src: "/hero/dashboard-4.png", eyebrow: "Market Radar", headline: "The full chart, live, in one view." },
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

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = IMAGES[index];

  return (
    <div className={`rounded-[1.75rem] bg-gradient-to-br from-violet/60 via-sky/40 to-violet/60 p-[1.5px] shadow-2xl shadow-violet/20 ${className}`}>
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
                <img
                  src={img.src}
                  alt=""
                  aria-hidden
                  loading={i === 0 ? "eager" : "lazy"}
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
          </div>
        </div>
      </div>
    </div>
  );
}
