"use client";

import { useMemo } from "react";

type NodeNetworkProps = {
  size?: number;
  satellites?: number;
  className?: string;
  variant?: "hero" | "compact";
};

/**
 * Zynost's brand mark: a central hub with satellite nodes connecting into
 * it — "18 signals converging into one verdict". Static — this mark lives
 * in the header and footer on every single page, and a framer-motion
 * infinite rotate+pulse loop running there permanently (previously: a
 * 48s rotation plus a 2.2s pulse on every satellite node and the hub,
 * `repeat: Infinity`, all the time, on every page) was real, continuous,
 * unnecessary JS-driven work stacking on top of everything else on the
 * page — exactly what "no animation in the header" ruled out.
 */
export function NodeNetwork({
  size = 480,
  satellites = 12,
  className,
  variant = "hero",
}: NodeNetworkProps) {
  const center = size / 2;
  const radius = size * 0.36;

  const nodes = useMemo(
    () =>
      Array.from({ length: satellites }, (_, i) => {
        const angle = (i / satellites) * Math.PI * 2 - Math.PI / 2;
        return {
          x: center + Math.cos(angle) * radius,
          y: center + Math.sin(angle) * radius,
          pulseDelay: i * 0.3,
        };
      }),
    [satellites, center, radius]
  );

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="zynost-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="zynost-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <circle cx={center} cy={center} r={radius * 0.9} fill="url(#zynost-glow)" />

      {/* Static ring — lines + satellite nodes at rest, no rotation. */}
      <g>
        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            x1={center}
            y1={center}
            x2={n.x}
            y2={n.y}
            stroke="url(#zynost-line)"
            strokeWidth={1.5}
          />
        ))}
        {nodes.map((n, i) => (
          <circle key={`node-${i}`} cx={n.x} cy={n.y} r={size * 0.014} fill="#38bdf8" opacity={0.85} />
        ))}
      </g>

      {/* Hub — the "verdict" node, at rest */}
      <circle cx={center} cy={center} r={size * 0.05} fill="#8b5cf6" />
      <circle
        cx={center}
        cy={center}
        r={size * 0.09}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth={1}
        opacity={0.35}
      />

      {variant === "hero" && (
        <text
          x={center}
          y={center + size * 0.018}
          textAnchor="middle"
          fontSize={size * 0.045}
          fontWeight={700}
          fill="white"
          fontFamily="var(--font-inter), sans-serif"
        >
          Z
        </text>
      )}
    </svg>
  );
}
