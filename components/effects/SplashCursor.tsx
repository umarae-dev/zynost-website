"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT_PX = 768;

/**
 * Desktop-only WebGL fluid cursor trail (violet/sky themed — see
 * SplashCursorEngine.ts). Gated on width AND a real fine pointer/hover
 * capability (not just viewport width — a touch laptop at desktop width
 * shouldn't get a cursor-follow effect it can't actually trigger). Never
 * rendered outside those conditions — no CSS fallback, since this is a
 * pure decorative flourish, not content.
 *
 * Deliberately NOT gated on prefers-reduced-motion: this is one of two
 * specific, explicitly-requested flagship effects (the other being the
 * hero's molten background) that the user opted into directly and
 * repeatedly — gating an explicit opt-in behind a system accessibility
 * flag meant it silently never rendered at all on any machine with
 * Windows' "Animation effects" setting off, with no visible error to
 * explain why.
 */
export function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const isWide = window.innerWidth >= MOBILE_BREAKPOINT_PX;
      const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const probe = document.createElement("canvas");
      const hasWebGL = !!(probe.getContext("webgl") || probe.getContext("experimental-webgl"));
      setEnabled(isWide && hasFinePointer && hasWebGL);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;
    let cleanup = () => {};
    import("./SplashCursorEngine").then(({ startSplashCursor }) => {
      if (canvasRef.current) cleanup = startSplashCursor(canvasRef.current);
    });
    return () => cleanup();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
    />
  );
}
