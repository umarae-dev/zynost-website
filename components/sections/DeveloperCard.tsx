import { ArrowRight, Code2 } from "lucide-react";
import { ZYNOST_PAY_URL } from "@/lib/constants";

/// A single, deliberately small teaser for Zynost Pay — a fully separate
/// product (own backend, own frontend, own domain) for developers who
/// want to accept crypto payments on their own site. Just a link out, not
/// a page here, so the two products stay cleanly separated.
export function DeveloperCard() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <a
        href={ZYNOST_PAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-violet/50"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-violet">
          <Code2 size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">Building something of your own?</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Zynost Pay — the same non-custodial crypto payment gateway, open for any developer to integrate.
          </p>
        </div>
        <ArrowRight size={18} className="shrink-0 text-muted-foreground" />
      </a>
    </section>
  );
}
