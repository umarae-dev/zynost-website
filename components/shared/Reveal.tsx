"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

// No filter:blur (previously blur(6px)->blur(0px)) — this component is
// used all over the site for scroll-triggered reveals, so that was real,
// widely-reported mobile jank rather than a one-off cost. Opacity + a
// small y/scale move is nearly free by comparison and still reads as
// deliberate motion, not a static pop-in.
const variants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Fades/slides/scales an element up into place once it's ~15% into the
 * viewport. Wrap a list of children in <RevealGroup> to stagger them. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={groupVariants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
