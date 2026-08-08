import { AlertTriangle, BarChart3, Sparkles } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { TiltCard } from "@/components/shared/TiltCard";

const CARDS = [
  {
    icon: AlertTriangle,
    title: "Signal groups are guesses in disguise.",
    body: "No proof. No context. Just hype.",
    color: "text-bearish",
  },
  {
    icon: BarChart3,
    title: "Data terminals give you numbers, not decisions.",
    body: "You still have to figure out what to do.",
    color: "text-sky",
  },
  {
    icon: Sparkles,
    title: "Zynost gives you both the data and the decision.",
    body: "Analyzed. Debated. Verified.",
    color: "text-violet",
  },
];

export function Problem() {
  return (
    <section className="relative overflow-hidden py-28">
      <img
        src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=60&auto=format&fit=crop"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.04] grayscale"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            The Problem
          </span>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Every crypto trader has the same two bad options.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <RevealItem key={card.title}>
              <TiltCard className="h-full p-7">
                <card.icon className={`${card.color}`} size={22} />
                <h3 className="mt-5 text-lg font-semibold leading-snug">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
