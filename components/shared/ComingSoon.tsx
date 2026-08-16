import { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { SITE } from "@/lib/constants";

/** Shared layout for pages whose real content isn't published yet
 * (Roadmap, Whitepaper, Tokenomics) — real, on-brand page rather than a
 * dead link, swapped for the full version once it's written. */
export function ComingSoon({
  icon: Icon,
  eyebrow,
  title,
  body,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <Reveal>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface/60">
          <Icon size={24} className="text-violet" />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <span className="mt-6 block text-xs font-semibold uppercase tracking-wider text-violet">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-muted-foreground">{body}</p>
      </Reveal>
      <Reveal delay={0.16} className="mt-8">
        <MagneticButton href={SITE.appUrl}>Explore {SITE.name}</MagneticButton>
      </Reveal>
    </div>
  );
}
