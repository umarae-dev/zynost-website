"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 2600;

/** One word in the hero headline cycles every few seconds — a cheap CSS
 * crossfade (no JS animation library), the single deliberate exception to
 * an otherwise hover-only motion policy across the site.
 *
 * Real bug fix: `className` (the gradient + bg-clip-text + text-transparent
 * treatment) must be applied directly on THIS span, not inherited from a
 * wrapping parent — `background-image` and `background-clip` are not
 * inherited CSS properties, only `color` is. A parent with
 * `bg-gradient-to-r bg-clip-text text-transparent` only gives a nested
 * span `color: transparent` (inherited) with no background-image of its
 * own to clip against, which rendered the word as literally invisible —
 * blank space, not "not changing," it was never visible in the first
 * place.
 */
export function RotatingWord({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span key={index} className={`animate-word-swap inline-block ${className}`}>
      {words[index]}
    </span>
  );
}
