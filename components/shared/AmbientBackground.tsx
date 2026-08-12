"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MOBILE_BREAKPOINT_PX = 768;

/**
 * Fixed, full-viewport ambient layer sitting behind every page: two large
 * blurred gradient orbs drifting on a slow independent loop, plus a faint
 * noise/grain overlay. Purely decorative (z-0, pointer-events-none) — its
 * only job is to make sure no section of the site ever reads as a flat,
 * static background, even where nothing else on screen is moving.
 *
 * The orbs are skipped on phones: this sits in the root layout, so it runs
 * on EVERY page forever (an infinite loop, never pausing) — continuously
 * repositioning two large blurred layers is a real, ongoing GPU cost that
 * showed up as reported jank on mobile specifically. The grain overlay
 * (a static, unanimated texture) stays everywhere since it costs nothing
 * per frame either way.
 */
export function AmbientBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {!isMobile && (
        <>
          <motion.div
            className="absolute h-[560px] w-[560px] rounded-full opacity-[0.14]"
            style={{
              background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
              filter: "blur(80px)",
              top: "-10%",
              left: "-8%",
            }}
            animate={{
              x: [0, 60, -20, 0],
              y: [0, 40, 80, 0],
            }}
            transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-[480px] w-[480px] rounded-full opacity-[0.10]"
            style={{
              background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
              filter: "blur(90px)",
              bottom: "-12%",
              right: "-6%",
            }}
            animate={{
              x: [0, -50, 20, 0],
              y: [0, -30, -70, 0],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <div className="grain absolute inset-0" />
    </div>
  );
}
