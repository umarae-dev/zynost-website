"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
};

/** Button that pulls toward the cursor on hover (Linear/Vercel-style),
 * sweeps a light gradient across on hover, and depresses on click. This is
 * hover/click-triggered and user-controlled motion (moves away = it stops),
 * so it always runs regardless of reduced-motion preference. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const sweepX = useMotionValue(-40);
  const sweepBackground = useMotionTemplate`radial-gradient(80px circle at ${sweepX}% 50%, rgba(255,255,255,0.35), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.25, y: relY * 0.35 });
    sweepX.set(((e.clientX - rect.left) / rect.width) * 100);
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";
  const styles =
    variant === "primary"
      ? "bg-violet text-white hover:bg-violet-dim shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_8px_30px_-8px_rgba(139,92,246,0.6)]"
      : "bg-transparent text-foreground hairline hover:bg-white/5";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={cn(base, styles, className)}
    >
      {variant === "primary" && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: sweepBackground }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block">
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
