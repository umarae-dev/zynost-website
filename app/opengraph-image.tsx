import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const r = 190;
    return { x: 600 + Math.cos(angle) * r, y: 315 + Math.sin(angle) * r };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#0b0b14",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          width="1200"
          height="630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {nodes.map((n, i) => (
            <line
              key={i}
              x1={600}
              y1={315}
              x2={n.x}
              y2={n.y}
              stroke="#8b5cf6"
              strokeOpacity={0.45}
              strokeWidth={2}
            />
          ))}
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={7} fill="#38bdf8" />
          ))}
          <circle cx={600} cy={315} r={22} fill="#8b5cf6" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "white",
              letterSpacing: -2,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 32,
              color: "#9ca3af",
            }}
          >
            Decision Intelligence, Not Signals.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
