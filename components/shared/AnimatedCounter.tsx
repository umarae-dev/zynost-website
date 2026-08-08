"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
};

/** Counts up from 0 to `value` when it scrolls into view. A number tween
 * has no vestibular-trigger motion (no parallax/large translation), so it
 * always animates — the whole point of a stat row like this is that
 * glance-value of watching it land. */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 });
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (!ref.current) return;
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
    });
  }, [spring, prefix, suffix, decimals]);

  useEffect(() => {
    return spring.on("animationComplete", () => setSettled(true));
  }, [spring]);

  return (
    <motion.span
      ref={ref}
      className={className}
      suppressHydrationWarning
      animate={settled ? { textShadow: ["0 0 0px rgba(139,92,246,0)", "0 0 16px rgba(139,92,246,0.8)", "0 0 0px rgba(139,92,246,0)"] } : undefined}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
