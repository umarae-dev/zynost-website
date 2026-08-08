"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { PRICING_TIERS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative overflow-hidden py-28">
      <img
        src="https://images.unsplash.com/photo-1550439062-609e1531270e?w=1600&q=60&auto=format&fit=crop"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.04] grayscale"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            Pricing
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing. Serious edge.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex items-center justify-center gap-3">
          <span className={cn("text-sm", !annual && "font-semibold text-foreground", annual && "text-muted-foreground")}>
            Monthly
          </span>
          <button
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((v) => !v)}
            className="relative h-7 w-12 rounded-full bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            <motion.span
              className="absolute top-1 h-5 w-5 rounded-full bg-violet"
              animate={{ left: annual ? 26 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>
          <span className={cn("text-sm", annual && "font-semibold text-foreground", !annual && "text-muted-foreground")}>
            Annual <span className="text-bullish">(Save 20%)</span>
          </span>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <RevealItem key={tier.name}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300",
                  tier.highlighted
                    ? "animate-breathe scale-[1.03] border-violet bg-card hover:shadow-[0_25px_55px_-20px_rgba(139,92,246,0.6)]"
                    : "border-border bg-card hover:-translate-y-1 hover:border-violet/40 hover:shadow-[0_20px_40px_-20px_rgba(139,92,246,0.35)]"
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet px-3 py-1 text-[10px] font-bold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>

                <div className="mt-5 flex items-baseline gap-1 font-tabular">
                  <span className="text-4xl font-bold">
                    {tier.price === null ? (
                      "$0"
                    ) : (
                      <>
                        $
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={annual ? "annual" : "monthly"}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="inline-block"
                          >
                            {annual ? tier.price.annual : tier.price.monthly}
                          </motion.span>
                        </AnimatePresence>
                      </>
                    )}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tier.price === null ? "forever" : "/month"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tier.price === null
                    ? "No card, no crypto, ever"
                    : annual
                      ? `$${(tier.price.annual * 12).toFixed(2)} billed yearly in crypto`
                      : "billed monthly in crypto — doesn't auto-renew"}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className="mt-0.5 shrink-0 text-bullish" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href={tier.price === null ? SITE.appUrl : `${SITE.appUrl}/#/pricing`}
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {tier.price === null ? "Get Started Free" : `Upgrade to ${tier.name}`}
                </MagneticButton>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Paid plans are billed in cryptocurrency (USDT/USDC) and don&apos;t auto-renew — see our{" "}
          <a href="/refund-policy" className="underline hover:text-foreground">Refund Policy</a>.
        </p>
      </div>
    </section>
  );
}
