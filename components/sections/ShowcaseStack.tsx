"use client";

import { ScrollStack, ScrollStackItem } from "@/components/effects/ScrollStack";
import { cn } from "@/lib/utils";

interface Card {
  image: string;
  eyebrow: string;
  headline: string;
  copy: string;
}

const CARDS: Card[] = [
  {
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
    eyebrow: "Market Analysis",
    headline: "Every signal, fully backtested.",
    copy: "No guesses. Every setup Zynost surfaces has already been tested against real historical data.",
  },
  {
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    eyebrow: "18 AI Agents",
    headline: "One network. One verdict.",
    copy: "18 specialist agents analyze independently, then converge on a single, reasoned call.",
  },
  {
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82",
    eyebrow: "Full Coverage",
    headline: "Every coin, every angle.",
    copy: "~3,000 real coins scanned across 14 exchanges plus on-chain DEX activity, every 10 minutes.",
  },
  {
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9",
    eyebrow: "Crypto-Native",
    headline: "Built for this market, not adapted to it.",
    copy: "No legacy-finance retrofit — Zynost was designed from day one around how crypto actually trades.",
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    eyebrow: "24/7 Coverage",
    headline: "Markets never sleep. Neither do we.",
    copy: "Continuous scanning around the clock — a setup can surface at 3am and you'll still see it first.",
  },
  {
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e",
    eyebrow: "Real-Time",
    headline: "From signal to verdict in minutes.",
    copy: "The moment genuine volume confirms, the full analysis — bull case, skeptic case, judge verdict — is ready.",
  },
];

function ShowcaseCard({ card, index }: { card: Card; index: number }) {
  const imageRight = index % 2 === 1;
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-2xl shadow-black/20 transition-colors duration-300 hover:border-violet/40 sm:p-6">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
        <div className={cn("relative h-64 overflow-hidden rounded-2xl sm:h-80 md:h-[24rem]", imageRight && "md:order-2")}>
          <img
            src={`${card.image}?w=1200&q=75&auto=format&fit=crop`}
            alt=""
            aria-hidden
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-violet/10 mix-blend-multiply" />

          {/* Branding directly on the image, not just beside it — a
              corner watermark plus the eyebrow + headline overlaid at the
              bottom, in the display font, so the photo reads as a
              finished marketing visual on its own (the side panel then
              adds the fuller copy). */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
            <span className="font-heading text-xs font-bold tracking-tight text-white">Zynost</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-black/40 px-2.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky to-violet" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-200">
                {card.eyebrow}
              </span>
            </span>
            <h4 className="font-heading mt-2 max-w-xs text-balance text-lg font-bold leading-tight text-white sm:text-xl">
              {card.headline}
            </h4>
          </div>
        </div>

        <div className={cn(imageRight && "md:order-1")}>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky to-violet" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-violet">
              {card.eyebrow}
            </span>
          </span>
          <h3 className="mt-3 text-balance text-2xl font-bold leading-tight sm:text-3xl">
            {card.headline}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{card.copy}</p>
        </div>
      </div>
    </div>
  );
}

/** The pinned/scaling card stack (React Bits' ScrollStack), image and
 * copy split left/right and alternating sides card to card (zigzag), now
 * running the same way on mobile as desktop per an explicit request —
 * ScrollStack's own per-frame work is already gated to only run while
 * scroll position actually changes and the section is near the viewport
 * (see ScrollStack.tsx), so it stays cheap enough to keep on phones too. */
export function ShowcaseStack() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            Inside Zynost
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Scroll through what makes it work.
          </h2>
        </div>
      </div>

      <ScrollStack useWindowScroll className="mt-4">
        {CARDS.map((card, i) => (
          <ScrollStackItem key={card.headline}>
            <ShowcaseCard card={card} index={i} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
