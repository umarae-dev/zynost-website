"use client";

import { motion } from "framer-motion";

/** A plain, honest picture of how the three pieces connect — deliberately
 * simple rather than a busy "architecture diagram" nobody actually reads.
 * Arrows show what a real user experiences moving between products, not
 * an internal service topology. */
export function EcosystemDiagram() {
  return (
    <div className="w-full overflow-x-auto py-4">
      <svg
        viewBox="0 0 760 360"
        className="mx-auto h-auto w-full max-w-2xl"
        role="img"
        aria-label="Diagram showing Zynost as the parent brand connecting Zynost the research platform, Zynost Pay the payment gateway, and UQX the utility token that links them"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" className="text-muted-foreground" />
          </marker>
        </defs>

        {/* Parent label */}
        <text x="380" y="34" textAnchor="middle" className="fill-muted-foreground text-[13px] font-semibold uppercase tracking-wider">
          Zynost — parent brand
        </text>
        <motion.rect
          x="40" y="52" width="680" height="2" className="fill-border"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        />

        {/* Zynost node */}
        <g>
          <rect x="40" y="90" width="200" height="110" rx="16" className="fill-card stroke-violet" strokeWidth="1.5" />
          <text x="140" y="128" textAnchor="middle" className="fill-foreground text-[16px] font-bold">Zynost</text>
          <text x="140" y="150" textAnchor="middle" className="fill-muted-foreground text-[11px]">AI Research Platform</text>
          <text x="140" y="172" textAnchor="middle" className="fill-muted-foreground text-[10px]">app.zynost.com</text>
        </g>

        {/* UQX node (center) */}
        <g>
          <rect x="280" y="90" width="200" height="110" rx="16" className="fill-card stroke-warn" strokeWidth="1.5" />
          <text x="380" y="128" textAnchor="middle" className="fill-foreground text-[16px] font-bold">UQX</text>
          <text x="380" y="150" textAnchor="middle" className="fill-muted-foreground text-[11px]">Utility Token</text>
          <text x="380" y="172" textAnchor="middle" className="fill-muted-foreground text-[10px]">Earned in the UQX app</text>
        </g>

        {/* Zynost Pay node */}
        <g>
          <rect x="520" y="90" width="200" height="110" rx="16" className="fill-card stroke-sky" strokeWidth="1.5" />
          <text x="620" y="128" textAnchor="middle" className="fill-foreground text-[16px] font-bold">Zynost Pay</text>
          <text x="620" y="150" textAnchor="middle" className="fill-muted-foreground text-[11px]">Payment Gateway</text>
          <text x="620" y="172" textAnchor="middle" className="fill-muted-foreground text-[10px]">pay.zynost.com</text>
        </g>

        {/* Arrows: UQX <-> Zynost */}
        <line x1="280" y1="145" x2="245" y2="145" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="260" y="130" textAnchor="middle" className="fill-muted-foreground text-[9px]">access</text>

        {/* Arrows: UQX <-> Zynost Pay */}
        <line x1="480" y1="145" x2="515" y2="145" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="500" y="130" textAnchor="middle" className="fill-muted-foreground text-[9px]">utility</text>

        {/* Bottom row: what the user actually experiences */}
        <g>
          <rect x="40" y="240" width="200" height="86" rx="14" className="fill-transparent stroke-border" strokeDasharray="4 4" />
          <text x="140" y="266" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Research, coaching,</text>
          <text x="140" y="282" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">decision briefs</text>
          <text x="140" y="304" textAnchor="middle" className="fill-muted-foreground text-[10px]">— what a Zynost user gets</text>
        </g>
        <g>
          <rect x="280" y="240" width="200" height="86" rx="14" className="fill-transparent stroke-border" strokeDasharray="4 4" />
          <text x="380" y="266" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Mine daily, refer</text>
          <text x="380" y="282" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">friends, hold a real token</text>
          <text x="380" y="304" textAnchor="middle" className="fill-muted-foreground text-[10px]">— what a UQX user does</text>
        </g>
        <g>
          <rect x="520" y="240" width="200" height="86" rx="14" className="fill-transparent stroke-border" strokeDasharray="4 4" />
          <text x="620" y="266" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Accept crypto, no gas</text>
          <text x="620" y="282" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">fee for the customer</text>
          <text x="620" y="304" textAnchor="middle" className="fill-muted-foreground text-[10px]">— what a merchant gets</text>
        </g>

        <line x1="140" y1="200" x2="140" y2="238" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="380" y1="200" x2="380" y2="238" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="620" y1="200" x2="620" y2="238" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <p className="mx-auto mt-2 max-w-xl text-center text-xs text-muted-foreground">
        Each product works completely on its own — nobody needs UQX to use Zynost or Zynost Pay.
        UQX is the piece that lets value move between them.
      </p>
    </div>
  );
}
