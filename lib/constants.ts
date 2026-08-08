export const SITE = {
  name: "Zynost",
  tagline: "Decision Intelligence, Not Signals.",
  description:
    "18 specialist AI agents analyze any coin from every angle and hand you one clear verdict — buy, sell, or wait — with real reasoning and backtested evidence, not another guess.",
  url: "https://zynost.com",
  appUrl: "https://app.zynost.com",
  twitter: "@zynost",
};

export const NAV_LINKS = [
  { label: "Product", href: "/#agents" },
  { label: "How it works", href: "/#system-planned-trade" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

// Zynost Pay is a fully separate product (own backend, own frontend, own
// domain) — this is deliberately just a link out, not a page of its own
// here, so the two products never get tangled together.
export const ZYNOST_PAY_URL = "https://pay.zynost.com";

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
  { tier: 4, name: "Skeptic", role: "Finds the holes", description: "Actively hunts for contradictions in the bullish case before you ever see a verdict." },
  { tier: 4, name: "Judge", role: "Final verdict", description: "Weighs every agent's evidence and delivers one clear, reasoned decision." },
];

export const STATS = [
  { value: 18, suffix: "", label: "AI Agents" },
  { value: 8098, suffix: "", label: "Coins Tracked" },
  { value: 14, suffix: "", label: "Exchanges Merged" },
  { value: 45, suffix: "%", label: "Backtested Win Rate" },
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
    description: "3 full analyses, forever — no card, no crypto, no trial.",
    features: [
      "3 full analyses — lifetime",
      "11-agent analysis + Judge/Skeptic verdict",
      "Trade Plan, Portfolio, Coach & Psychology agents",
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
      "11-agent analysis + Judge/Skeptic verdict",
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
      "11-agent analysis + Judge/Skeptic verdict",
      "System Planned Trade — auto-picked trades",
      "Early Activity alerts",
      "Everything in Pro",
    ],
  },
];

export const FAQS = [
  {
    q: "What makes Zynost different from signal groups?",
    a: "Signal groups sell conviction with no evidence. Zynost's every setup is backtested against real historical data with a published win rate and average return, and a dedicated Skeptic agent actively argues against the bullish case before you ever see a verdict.",
  },
  {
    q: "How does System Planned Trade work?",
    a: "Every 10 minutes, Zynost scans real coins across 14 merged CEX exchanges plus on-chain DEX activity for unusual, confirmed volume — not just price movement. Anything that clears the bar gets the exact same real ATR and support/resistance math as a manual analysis, automatically.",
  },
  {
    q: "Is the backtest data real?",
    a: "Yes — every published number (win rate, average R, sample size) comes from walking real historical daily candles across a fixed universe of liquid coins, reproduced across repeat runs for stability. It's published, not just claimed.",
  },
  {
    q: "Can I use Zynost on mobile?",
    a: "Yes, Zynost is fully responsive and works on any device's browser — desktop, tablet, or phone.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — see our Refund Policy for the full, straightforward process.",
  },
];
