export const SITE = {
  name: "Zynost",
  tagline: "Decision Intelligence, Not Signals.",
  description:
    "Zynost combines a 17-agent crypto intelligence system, deterministic Institutional Lenses, FlowState regime monitoring, and Market Twin historical analogues into one evidence-grounded Decision Brief — generated in your own language, with the reasoning always visible.",
  url: "https://zynost.com",
  appUrl: "https://app.zynost.com",
  twitter: "@zynost",
};

export const NAV_LINKS = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#workflow" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

// Zynost Pay is a fully separate product (own backend, own frontend, own
// domain) — this is deliberately just a link out, not a page of its own
// here, so the two products never get tangled together.
export const ZYNOST_PAY_URL = "https://pay.zynost.com";

// Same 4 accounts, same links, on both Zynost and Zynost Pay — one shared
// ecosystem presence rather than per-product socials.
export const SOCIAL_LINKS = {
  x: "https://x.com/Zynost",
  youtube: "https://www.youtube.com/@zynost-uqx",
  tiktok: "https://www.tiktok.com/@zynostuqx",
  discord: "https://discord.gg/qdf3hBTDE",
};

export type Agent = {
  tier: 1 | 2 | 3 | 4;
  name: string;
  role: string;
  description: string;
};

export const AGENTS: Agent[] = [
  { tier: 1, name: "Technical Analysis", role: "Trend & momentum", description: "Reads real price action for trend direction, momentum shifts, and pattern structure." },
  { tier: 2, name: "News Intelligence", role: "News flow & sentiment", description: "Scans real headlines for narrative shifts that move price before the chart shows it." },
  { tier: 2, name: "Sentiment Analysis", role: "Market mood", description: "Gauges crowd sentiment and social mood without mistaking noise for signal." },
  { tier: 1, name: "Price Structure", role: "Market structure & patterns", description: "Maps real support/resistance structure from actual pivot clusters, not guesswork." },
  { tier: 1, name: "Liquidity", role: "Volume depth & tradability", description: "Checks whether a move can actually be traded at size, or if it's a thin, easily-reversed spike." },
  { tier: 1, name: "Smart Money Structure", role: "Whale flows & accumulation", description: "Tracks accumulation/distribution footprints that retail order flow doesn't show." },
  { tier: 2, name: "Macro Economics", role: "Global market regime", description: "Reads Fear & Greed and broader macro conditions the coin is trading inside of." },
  { tier: 1, name: "On-Chain Intelligence", role: "Network activity & flows", description: "Real on-chain data — network activity and flow patterns, not synthetic estimates." },
  { tier: 2, name: "Project Research", role: "Fundamentals & roadmap", description: "Evaluates the project's real fundamentals — supply schedule, category, maturity." },
  { tier: 2, name: "Security Research", role: "Risks & red flags", description: "Flags real security concerns and public-notice risks before you're exposed to them." },
  { tier: 3, name: "Risk Management", role: "Volatility & drawdown risk", description: "Quantifies real volatility-driven risk so position sizing isn't a guess." },
  { tier: 3, name: "Portfolio", role: "Your real holdings", description: "Reads your actual logged holdings for concentration and correlation risk." },
  { tier: 3, name: "Performance Coach", role: "Your real trade history", description: "Computes real win rate, average P/L, and hold time from your own trade log." },
  { tier: 3, name: "Trading Psychology", role: "Behavioral patterns", description: "Surfaces real behavioral patterns — revenge trading, FOMO entries — from your history." },
  { tier: 1, name: "Learning", role: "Q&A & glossary", description: "Explains any term or concept in plain language, on demand." },
  { tier: 3, name: "Trade Plan", role: "Entry, stop & targets", description: "Turns calculated entry, stop-loss, and target prices into a plain-language trade setup." },
  { tier: 4, name: "Decision Brief", role: "Evidence-grounded synthesis", description: "Hunts for contradictions, weighs every signal, and writes one clear bull case, bear case, and verdict — in your own language." },
];

export const STATS = [
  { value: 17, suffix: "", label: "Specialist AI agents" },
  { value: 14, suffix: "", label: "Exchanges checked" },
  { value: 8098, suffix: "", label: "Coin catalog" },
  { value: 5, suffix: "", label: "Free real-time signals" },
];

export type IntelligenceLayer = {
  icon: string;
  title: string;
  status: string;
  description: string;
  visual: {
    colorMode: "molten" | "ember" | "frost";
    color1: string;
    color2: string;
    color3: string;
  };
};

// The deterministic layers behind a Full Scan — real math, not an AI
// call, computed before Decision Brief ever runs (see
// tradeos-backend/app/services/institutional_intelligence.py,
// market_twin_service.py, evidence_service.py). Market Twin's scope note is
// load-bearing: it's genuinely only calibrated for BTC/ETH today (verified
// against 7,600+ real historical snapshots per coin going back to May
// 2023) — every other coin honestly reports "collecting history" rather
// than faking a match, and the copy below says so rather than overselling.
export const INTELLIGENCE_LAYERS: IntelligenceLayer[] = [
  {
    icon: "Landmark",
    title: "Institutional Lenses",
    status: "5 lenses, every scan",
    description: "Options risk surface, leverage-crowding radar, absorption/exhaustion monitor, institutional positioning, and cross-market divergence — each one reports honestly when its underlying data isn't reliable enough to trust, instead of guessing.",
    visual: { colorMode: "molten", color1: "#2E1065", color2: "#8B5CF6", color3: "#E9D5FF" },
  },
  {
    icon: "Activity",
    title: "FlowState",
    status: "5-dimension regime score",
    description: "Fresh capital, leverage reliance, holder pressure, execution quality, and supply shock combine into one real-time liquidity/regime read — computed from order books, funding, and holder concentration, not sentiment.",
    visual: { colorMode: "frost", color1: "#082F49", color2: "#38BDF8", color3: "#E0F2FE" },
  },
  {
    icon: "History",
    title: "Market Twin",
    status: "Live for BTC & ETH, expanding",
    description: "Matches the current market regime against thousands of real historical point-in-time analogues (7,600+ snapshots per coin since May 2023) and reports the actual forward-outcome distribution — median return, adverse/favorable excursion, sample size. Every other coin honestly shows 'collecting history' instead of a fabricated pattern.",
    visual: { colorMode: "ember", color1: "#451A03", color2: "#F59E0B", color3: "#FEF3C7" },
  },
];

export const EXCHANGES = [
  "Binance", "KuCoin", "Gate.io", "MEXC", "Coinbase", "Kraken",
  "Bitget", "HTX", "Bitfinex", "Crypto.com", "Bitstamp", "WhiteBit",
  "Poloniex", "BingX",
];

export type PricingTier = {
  name: string;
  price: { monthly: number; annual: number } | null; // null = Free, always $0
  description: string;
  features: string[];
  highlighted?: boolean;
};

// Real prices — must match goro_app/lib/screens/pricing_screen.dart exactly.
// Billed in crypto only (USDT/USDC on BNB Smart Chain/Ethereum/Polygon/
// Solana), no card, no auto-renewal — see the Refund/Terms pages for why.
export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: null,
    description: "Unlimited real-time research, forever — no card, no crypto, no trial.",
    features: [
      "Unlimited coin research — any coin, no cap",
      "Real technical, liquidity & smart-money data",
      "Free Trade Plan zones (entry, stop, target)",
      "Real-time price & market data",
      "Watchlist, alerts, portfolio tracking",
    ],
  },
  {
    name: "Pro",
    price: { monthly: 12.99, annual: 11.04 },
    description: "For active traders who want the full picture.",
    features: [
      "250 analyses / month",
      "8 analyses / day cap",
      "18-agent intelligence system",
      "Trade Plan, Portfolio, Coach & Psychology agents",
      "System Planned Trade — auto-picked trades",
      "Early Activity alerts",
      "Everything in Free",
    ],
    highlighted: true,
  },
  {
    name: "Pro Plus",
    price: { monthly: 16.99, annual: 14.44 },
    description: "The highest cap of any plan.",
    features: [
      "350 analyses / month",
      "12 analyses / day cap",
      "18-agent intelligence system",
      "System Planned Trade — auto-picked trades",
      "Early Activity alerts",
      "Everything in Pro",
    ],
  },
];

export const FAQS = [
  {
    q: "What can I use for free?",
    a: "Free includes unlimited real-time coin research from computed technical, structure, liquidity, smart-money, volatility, and trade-plan data. It never uses an analysis credit. Pro and Pro Plus add the Full Scan (specialist signals, Institutional Lenses, FlowState, Market Twin), the multilingual Decision Brief, portfolio and coaching agents, and premium system-picked trade features.",
  },
  {
    q: "What makes Zynost different from signal groups?",
    a: "Signal groups usually give you a call without an auditable reasoning chain. Zynost keeps every specialist signal and computed evidence layer visible, has the Decision Brief actively hunt for the largest contradiction to its own emerging view before committing to it, and separates historically backtested setups from newer signals that are still being forward-tracked.",
  },
  {
    q: "How does System Planned Trade work?",
    a: "Every 10 minutes, Zynost ranks live movers across 14 supported exchanges and on-chain DEX activity. Confirmed candidates must clear liquidity and relative-volume checks before the same ATR and support/resistance planning engine used for manual trade plans builds a setup.",
  },
  {
    q: "Is the backtest data real?",
    a: "The published 45% win rate and +0.13R average apply specifically to the Confirmed System Planned Trade configuration: 180 days, a fixed 45-coin universe, and 201 resolved historical picks at a 2.0x RVOL gate and 1.5R target. Emerging, DEX, and order-book signals are labeled separately and forward-tracked instead of borrowing that claim.",
  },
  {
    q: "What is Market Twin, and does it work for every coin?",
    a: "Market Twin matches the current market regime against real historical point-in-time analogues and reports the actual forward-outcome distribution — median return, adverse/favorable excursion, real sample size. It's fully calibrated for BTC and ETH today (7,600+ real historical snapshots per coin, back to May 2023) and expanding to more coins over time. For anything not yet calibrated, it honestly reports 'collecting history' instead of faking a pattern match.",
  },
  {
    q: "What language does the Decision Brief come in?",
    a: "Whatever you request. Decision Brief is generated fresh in your chosen language every time — it isn't a translated template, the whole synthesis (bull case, bear case, risk gates, confirmation/invalidation conditions) is written natively in that language from the same underlying evidence.",
  },
  {
    q: "Can I use Zynost on mobile?",
    a: "Yes. The workspace is responsive and works in desktop, tablet, and phone browsers. Mobile uses touch-first navigation and reorganized panels rather than a squeezed desktop layout.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — see our Refund Policy for the full, straightforward process.",
  },
];
