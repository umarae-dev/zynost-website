"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MoltenMetal = dynamic(() => import("./MoltenMetal"), { ssr: false });

/** WebGL "molten" background for the hero (and, since the navbar is
 * transparent at scroll position 0, visually behind the navbar too) —
 * gated on WebGL2 support only. Explicitly requested on mobile too now
 * (previously desktop-only); a lighter sim resolution keeps it cheap
 * enough for phones (see MoltenMetal usage below). */
export function HeroBackground() {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const probe = document.createElement("canvas");
    const hasWebGL2 = !!probe.getContext("webgl2");
    setEnabled(hasWebGL2);
  }, []);

  // No WebGL2 (common on mobile: battery-saver mode, older Safari, in-app
  // browser webviews, GPU driver blocklisting) or the shader itself failed
  // to compile/link at runtime — either way, a still gradient in the same
  // palette beats an empty hero, which is what mobile visitors were seeing
  // before this fallback existed.
  if (!enabled || failed) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 inset-x-0 bottom-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 15%, rgba(139,92,246,0.35), transparent 60%), " +
            "radial-gradient(90% 70% at 80% 60%, rgba(125,211,252,0.22), transparent 65%), " +
            "#0a0714",
        }}
      />
    );
  }

  // Real bug fix #1: stacked a CSS opacity-60 wrapper ON TOP OF the
  // shader's own opacity={0.85} internal alpha (multiplying down to
  // roughly 0.5 combined), plus a dark color1 and a raised blackPoint —
  // compounded, it rendered too faint to register as "working."
  //
  // Real bug fix #2, the actual reason nothing showed at all: this div
  // used `h-[calc(100%+4rem)]`, but its containing block — Hero's
  // <section> — has no definite height of its own (only a `min-h` at the
  // lg breakpoint, which content-driven boxes don't count as "definite"
  // for percentage-height resolution on absolutely positioned children
  // per the CSS spec). A percentage height on an abs-positioned element
  // inside a content-height parent resolves as if it were `auto`, so the
  // whole calc() collapsed to something near zero — a 0-height container
  // means a 0-height WebGL canvas, i.e. nothing rendered, full stop. Using
  // `top`+`bottom` insets instead (matching how the dot-grid layer right
  // below already does it via `inset-0`) stretches the box against the
  // parent's actual rendered edges regardless of how that height was
  // determined — the correct, robust way to do this.
  return (
    <div aria-hidden className="pointer-events-none absolute -top-16 inset-x-0 bottom-0">
      <MoltenMetal
        color1="#1e1040"
        color2="#8b5cf6"
        color3="#7dd3fc"
        speed={0.25}
        scale={5}
        detail={3}
        glow={1.8}
        coreSize={0.1}
        swirl={0.8}
        fold={-0.18}
        blackPoint={0.03}
        brightness={1.4}
        colorMode="molten"
        grain
        grainIntensity={0.04}
        mouseInteraction
        mouseStrength={0.2}
        opacity={1}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
