"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export type AllocationSlice = {
  label: string;
  pct: number;
  tokens: string;
  color: string;
  note: string;
};

export const ALLOCATION: AllocationSlice[] = [
  { label: "Mining Rewards", pct: 25, tokens: "250,000,000", color: "#8b5cf6", note: "Earned daily in-app. 20% liquid at listing, remainder vests over 8 months." },
  { label: "Ecosystem & Treasury", pct: 20, tokens: "200,000,000", color: "#38bdf8", note: "Exchange listings, market-making, Zynost cross-product incentives." },
  { label: "Presale", pct: 15, tokens: "150,000,000", color: "#22c55e", note: "Sold directly to early buyers. 20% liquid at TGE, remainder over 6 months." },
  { label: "DEX Liquidity", pct: 15, tokens: "150,000,000", color: "#f59e0b", note: "Locked in a public, verifiable liquidity lock for 12–24 months." },
  { label: "Team", pct: 15, tokens: "150,000,000", color: "#f43f5e", note: "6-month cliff, then vests linearly over 18 months." },
  { label: "Advisors", pct: 5, tokens: "50,000,000", color: "#64748b", note: "6-month cliff, then vests linearly over 12 months." },
  { label: "Community & Airdrop", pct: 5, tokens: "50,000,000", color: "#c084fc", note: "Reserved for organic growth campaigns and early-community rewards." },
];

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: AllocationSlice }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="max-w-[220px] rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <div className="font-semibold" style={{ color: d.color }}>{d.label} — {d.pct}%</div>
      <div className="mt-1 text-muted-foreground">{d.tokens} UQX</div>
    </div>
  );
}

export function AllocationChart() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-[220px_1fr] sm:items-center">
      <div className="mx-auto h-[220px] w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ALLOCATION}
              dataKey="pct"
              nameKey="label"
              innerRadius={62}
              outerRadius={95}
              paddingAngle={2}
              strokeWidth={0}
            >
              {ALLOCATION.map((slice) => (
                <Cell key={slice.label} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="space-y-2.5">
        {ALLOCATION.map((slice) => (
          <li key={slice.label} className="flex items-start gap-3 text-sm">
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <div>
              <span className="font-medium text-foreground">{slice.label}</span>
              <span className="ml-2 text-muted-foreground">{slice.pct}% · {slice.tokens} UQX</span>
              <p className="mt-0.5 text-xs text-muted-foreground">{slice.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
