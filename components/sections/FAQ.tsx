"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { FAQS } from "@/lib/constants";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-28">
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=60&auto=format&fit=crop"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.04] grayscale"
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">FAQ</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <RevealItem key={item.q}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-violet/30 hover:bg-violet/[0.03]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-violet"
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-muted-foreground">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
