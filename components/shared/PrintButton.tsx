"use client";

import { Download } from "lucide-react";

/** Triggers the browser's native print dialog, which every major browser
 * (Chrome, Edge, Safari, Firefox) offers a "Save as PDF" destination for —
 * no server-side PDF generation, no extra dependency, works everywhere. */
export function PrintButton({ label = "Download PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hide inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-violet hover:text-violet"
    >
      <Download size={15} />
      {label}
    </button>
  );
}
