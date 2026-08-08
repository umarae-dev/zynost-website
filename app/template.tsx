"use client";

import { motion } from "framer-motion";

/**
 * Next re-mounts whatever's under template.tsx on every route change (unlike
 * layout.tsx, which persists), so a plain mount-in animation here is enough
 * to make navigation feel like a transition instead of an instant snap —
 * no AnimatePresence/exit-animation plumbing needed, which is fragile with
 * the App Router's synchronous unmount-on-navigate behavior.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // No filter:blur (previously blur(4px)->blur(0px)) — this wraps every
    // page's ENTIRE content and re-runs on every single navigation, so
    // animating blur across the whole viewport's DOM tree here was one of
    // the most expensive things this site was doing, especially on
    // mid/low-end mobile GPUs. A plain opacity/scale fade is close to free.
    <motion.div
      initial={{ opacity: 0, scale: 0.995 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
