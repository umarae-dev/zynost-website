import { Reveal } from "@/components/shared/Reveal";
import { EXCHANGES } from "@/lib/constants";

export function TrustStrip() {
  return (
    <section className="border-y border-border py-10">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Real data from
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {EXCHANGES.map((name, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <span className="cursor-default text-lg font-bold tracking-tight text-foreground grayscale opacity-60 transition-all duration-300 hover:scale-110 hover:text-violet hover:opacity-100 hover:grayscale-0">
                {name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
