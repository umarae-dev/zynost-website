import { NodeNetwork } from "@/components/shared/NodeNetwork";
import { MagneticButton } from "@/components/shared/MagneticButton";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute opacity-30">
        <NodeNetwork size={420} satellites={8} variant="compact" />
      </div>
      <div className="relative z-10">
        <span className="font-tabular text-sm font-semibold uppercase tracking-wider text-violet">
          404
        </span>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          This page didn&apos;t clear the bar.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Even our screener wouldn&apos;t confirm this one exists. Let&apos;s get you back to
          something real.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <MagneticButton href="/">Back to home</MagneticButton>
        </div>
      </div>
    </div>
  );
}
