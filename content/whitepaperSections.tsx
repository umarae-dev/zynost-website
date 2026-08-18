import Link from "next/link";
import { AGENTS, EXCHANGES, SITE } from "@/lib/constants";
import type { LegalSection } from "@/components/legal/LegalPageShell";
import { EcosystemDiagram } from "@/components/whitepaper/EcosystemDiagram";

const TIER1 = AGENTS.filter((a) => a.tier === 1);
const TIER2 = AGENTS.filter((a) => a.tier === 2);
const TIER3 = AGENTS.filter((a) => a.tier === 3);
const TIER4 = AGENTS.filter((a) => a.tier === 4);

export const whitepaperSections: LegalSection[] = [
  {
    id: "abstract",
    title: "Abstract",
    body: (
      <>
        <p>
          This document describes the Zynost ecosystem — an AI-driven crypto research platform
          (Zynost), a non-custodial payment gateway (Zynost Pay), and a utility token (UQX) that
          connects the two. It is written for three audiences at once: people deciding whether to
          mine or buy UQX, developers who want to understand how the pieces actually work, and
          anyone doing basic due diligence before trusting a token with real money.
        </p>
        <p>
          We've tried to write this the way we'd want a whitepaper written if we were the ones
          reading it — plainly, with specific numbers instead of adjectives, and with an honest
          account of what's actually shipped in production today versus what's still a plan on a
          roadmap. Where we don't know something yet (an exact CEX listing date, for instance), we
          say so instead of inventing a number that sounds confident. Every technical claim about
          Zynost and Zynost Pay in this document was independently checked against the live
          production codebase before publication, not written from a slide deck.
        </p>
        <p>
          If you take one thing away from this abstract, take this: UQX is not a token looking for
          a product. The product came first — Zynost and Zynost Pay were built, shipped, and used
          before a single line of tokenomics was drafted. That ordering matters, and it shapes
          almost every design decision described below.
        </p>
      </>
    ),
  },
  {
    id: "intro",
    title: "1. Introduction",
    body: (
      <>
        <h3 className="text-base font-semibold text-foreground">1.1 Why we're writing this</h3>
        <p>
          Most people's experience with "crypto whitepapers" is not a good one. A huge fraction of
          them describe a product that doesn't exist yet, staffed by a team of stock-photo
          executives, with a roadmap that reads like a wish list and a tokenomics table that was
          clearly built to make the founders' allocation look smaller than it is. That pattern
          poisoned the word "whitepaper" for a lot of genuinely careful builders, and we don't
          blame anyone for being skeptical on sight.
        </p>
        <p>
          We're not asking you to trust this document. We're asking you to verify it. Every
          product claim below is either something you can open in a browser right now
          (app.zynost.com, pay.zynost.com), or something we've marked explicitly as planned and
          not yet built. Every tokenomics number is on-chain-enforceable, not a promise. Where we
          made a design choice specifically to avoid a mistake other projects made, we explain the
          mistake and the mechanism that avoids it, instead of just asserting "we're different."
        </p>
        <h3 className="mt-6 text-base font-semibold text-foreground">1.2 The three problems we started from</h3>
        <p>
          <strong className="text-foreground">The trading-tools problem.</strong> Most retail crypto
          traders get their information from one of two bad sources: signal channels that sell
          conviction with no visible reasoning ("BUY NOW 🚀"), or raw data terminals that dump
          every number they have and expect the trader to synthesize it themselves at 2am. Neither
          teaches anything, neither shows its work, and neither tells you when it's wrong. We
          wanted something that argues with itself before it tells you anything, and that shows
          you the argument.
        </p>
        <p>
          <strong className="text-foreground">The payments problem.</strong> Accepting crypto as a
          merchant usually means either custodying funds yourself (a security and regulatory
          liability most small merchants shouldn't take on) or paying a centralized processor a
          meaningful cut to do it for you, with your customer stuck paying a separate, often
          unpredictable gas fee on top of whatever they're actually buying. We wanted checkout to
          feel like checkout — no gas prompt, no bridging tutorial, no custody risk for the
          merchant.
        </p>
        <p>
          <strong className="text-foreground">The "free token" problem.</strong> Reward-mining apps
          have earned a bad reputation, and largely deserve it: enormous token supplies handed out
          for near-zero effort, with no real product behind them and no restraint on how fast that
          supply can hit the market once trading opens. We look at this pattern in detail in
          Section 6, because UQX's entire tokenomics design exists specifically to not repeat it.
        </p>
        <h3 className="mt-6 text-base font-semibold text-foreground">1.3 What we actually built, in one sentence each</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Zynost</strong> — an AI research workspace that runs {AGENTS.length} specialist agents against live market data and gives you one evidence-grounded verdict, in your own language, with the reasoning attached.</li>
          <li><strong className="text-foreground">Zynost Pay</strong> — a non-custodial payment gateway that lets merchants accept crypto across four chains without ever holding customer funds themselves, with an optional gasless checkout mode for the customer.</li>
          <li><strong className="text-foreground">UQX</strong> — a utility token, currently earned through the UQX app's mining system, designed from day one to become a real self-custodied asset with a fixed, capped supply and a vesting schedule that can't be bypassed by anyone, including us.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ecosystem",
    title: "2. Ecosystem Architecture",
    body: (
      <>
        <h3 className="text-base font-semibold text-foreground">2.1 One parent, two independent products, one connecting token</h3>
        <p>
          Zynost is the parent brand. Underneath it sit two products that were each built to stand
          on their own — Zynost (the research platform, at app.zynost.com) and Zynost Pay (the
          payment gateway, at pay.zynost.com). They share infrastructure and a company, but neither
          one depends on the other to function: you can use Zynost without ever touching Zynost
          Pay, and a merchant can run Zynost Pay checkout without any of their customers knowing
          Zynost the research platform exists.
        </p>
        <p>
          UQX is the layer that connects them. It's earned in a separate app (currently branded
          UQX), and its long-term utility runs through both products — see Section 5.3 for the
          specifics. We deliberately did not fold UQX mining into either Zynost or Zynost Pay's own
          apps: research tools and payment infrastructure attract a different, more risk-averse
          audience than a mining/rewards app, and mixing "serious financial tooling" with "tap this
          button daily for points" tends to cheapen both.
        </p>
        <EcosystemDiagram />
        <h3 className="mt-6 text-base font-semibold text-foreground">2.2 Why this structure, specifically</h3>
        <p>
          Large, credible companies almost never bolt speculative token mechanics directly onto
          their core product. The core product stays focused on the job it does; the token, if
          there is one, lives adjacent to it with its own clear boundary. We copied that pattern on
          purpose. It also has a practical benefit for app store compliance: Zynost and Zynost Pay
          can each be described accurately, on their own terms, without either listing having to
          carry the regulatory complexity of token mechanics it doesn't actually contain.
        </p>
      </>
    ),
  },
  {
    id: "zynost-deep",
    title: "3. Zynost — AI Intelligence Platform",
    body: (
      <>
        <h3 className="text-base font-semibold text-foreground">3.1 What "17 specialist agents" actually means</h3>
        <p>
          This isn't one large language model wearing 17 different hats in the same conversation.
          Each agent is a distinct pipeline with its own prompt, its own data inputs, and its own
          narrow job — a Liquidity agent never touches sentiment data, a Trading Psychology agent
          only ever sees your own logged trade history, never anyone else's. Splitting the work
          this way means each agent's output can be checked independently, and a failure in one
          (say, a stale news feed) doesn't silently corrupt the others.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet">Tier 1 — Core Market Read</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {TIER1.map((a) => (
                <li key={a.name}><strong className="text-foreground">{a.name}</strong> — {a.description}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet">Tier 2 — Context &amp; Narrative</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {TIER2.map((a) => (
                <li key={a.name}><strong className="text-foreground">{a.name}</strong> — {a.description}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet">Tier 3 — Personal &amp; Risk</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {TIER3.map((a) => (
                <li key={a.name}><strong className="text-foreground">{a.name}</strong> — {a.description}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet">Tier 4 — Synthesis</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {TIER4.map((a) => (
                <li key={a.name}><strong className="text-foreground">{a.name}</strong> — {a.description}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              Two more agents work alongside Decision Brief but aren't in the public-facing count of
              17: a <strong className="text-foreground">Skeptic</strong>, whose only job is to find the
              strongest argument against whatever the other agents are converging on, and a{" "}
              <strong className="text-foreground">Judge</strong>, who weighs the bull case, the bear
              case, and the Skeptic's objection into one final verdict. We keep them separate from
              the "17" figure because internally we count them as part of the synthesis layer, not
              the specialist layer — but their output is what you actually read in a Decision
              Brief.
            </p>
          </div>
        </div>

        <h3 className="mt-6 text-base font-semibold text-foreground">3.2 The deterministic layers — math, not AI guesswork</h3>
        <p>
          Underneath the language-model agents sits a layer of pure computation that runs first and
          feeds everything else. <strong className="text-foreground">Institutional Lenses</strong>{" "}
          computes five separate reads — options risk surface, leverage-crowding, absorption and
          exhaustion, institutional positioning, and cross-market dislocation — each one a formula
          against real market data, not a language model's opinion. If the underlying data for a
          given lens isn't reliable enough for a given coin, that lens says so explicitly rather
          than guessing.{" "}
          <strong className="text-foreground">FlowState</strong> reduces the current market regime
          to five numbers — fresh capital, leverage dependency, holder pressure, execution quality,
          supply shock — computed from order books, funding rates, and holder concentration.{" "}
          <strong className="text-foreground">Market Twin</strong> takes the current regime and
          searches a library of over 7,600 real historical snapshots per coin (BTC and ETH today,
          dating back to May 2023) for genuine historical analogues, then reports what actually
          happened next in those analogues — median return, best case, worst case, and how many
          samples that's based on. For any coin outside BTC/ETH, it reports "collecting history"
          honestly instead of fabricating a match.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">3.3 System Planned Trade</h3>
        <p>
          Every ten minutes, an always-on background process re-scans a rotating universe of live
          movers across {EXCHANGES.length} centralized exchanges ({EXCHANGES.join(", ")}) plus DEX
          activity. A candidate has to clear a liquidity and relative-volume gate before the same
          planning engine used for manual trade plans builds a setup around it — entry, stop,
          target, all computed from real ATR and support/resistance structure, not picked by
          feel. The gate itself is backtested against historical data rather than chosen
          arbitrarily, and the site's own FAQ discloses the exact methodology and sample size
          behind that backtest rather than quoting a headline number without context — see{" "}
          <Link href="/pricing#faq" className="text-violet underline underline-offset-2">the Pricing FAQ</Link>{" "}
          for the full breakdown.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">3.4 Order Book Radar</h3>
        <p>
          A wall-persistence and spoof-detection layer that polls order books across up to 14
          exchanges roughly every 45 seconds, watching a default set of major pairs for walls that
          persist versus walls that appear and vanish (a classic spoofing pattern). This is
          explicitly not full tick-level Level 2 depth streaming — we say that plainly rather than
          implying real-time millisecond order-book access we don't actually offer.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">3.5 Portfolio, Performance &amp; Trading Psychology</h3>
        <p>
          These three agents read from your own logged holdings and trade history — nothing
          simulated, nothing pulled from someone else's data. Portfolio surfaces concentration and
          correlation risk in what you actually hold. Performance Coach computes your real win
          rate, average P/L, and hold time. Trading Psychology looks for real behavioral patterns
          in your own history — revenge trading after a loss, FOMO entries chasing a move that's
          already run — the same way a good trading journal would, except it's reading the data for
          you.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">3.6 Decision Brief and language</h3>
        <p>
          Decision Brief is the synthesis a user actually reads: a bull case, a bear case, and a
          verdict, hunting explicitly for the strongest contradiction to its own emerging view
          before committing to one. It's generated fresh, in whatever language you request, from
          the same underlying evidence every time — not a static template translated after the
          fact. There's no fixed list of supported languages because it isn't pre-translated
          content; it's written natively in the requested language at generation time.
        </p>
      </>
    ),
  },
  {
    id: "pay-deep",
    title: "4. Zynost Pay — Payment Infrastructure",
    body: (
      <>
        <h3 className="text-base font-semibold text-foreground">4.1 Non-custodial by construction, not by policy</h3>
        <p>
          The distinction matters. A "non-custodial" claim that just means "we promise not to touch
          your funds" is a policy, and policies can change or be violated. Zynost Pay's
          non-custodial design is architectural: funds move directly between the customer's wallet
          and the merchant's wallet on-chain. Zynost Pay's backend never holds a private key capable
          of moving customer or merchant funds — it can verify that a payment happened, and it can
          sponsor gas for a smart-account transaction, but it cannot redirect where the money goes.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">4.2 Gasless checkout, explained properly</h3>
        <p>
          Ordinarily, paying with crypto means the customer needs a small amount of the network's
          native gas token sitting in their wallet before they can pay for anything else — a real
          onboarding barrier for anyone new to crypto. Zynost Pay's gasless checkout uses ERC-4337
          account abstraction: the customer's smart contract wallet submits a "UserOperation"
          instead of a normal transaction, and a Paymaster contract — funded and rate-limited by
          Zynost Pay — covers the gas on the customer's behalf. The customer pays only for what
          they're buying, in USDT or USDC; no separate gas top-up, no separate token to acquire
          first. This currently runs on BNB Smart Chain specifically; it is not yet available on
          every chain Zynost Pay supports for standard (non-gasless) payments.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">4.3 Wallet connectivity</h3>
        <p>
          Checkout supports WalletConnect v2 for broad wallet compatibility, plus dedicated
          deep-link flows for MetaMask and Trust Wallet specifically, and direct EIP-6963
          injected-wallet detection for browser-extension wallets. A customer chooses whichever
          wallet they already have — there's no requirement to install anything Zynost-specific to
          pay a Zynost Pay merchant.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">4.4 Multi-chain settlement</h3>
        <p>
          Standard (non-gasless) payments settle across four networks — Ethereum, BNB Smart Chain,
          Polygon, and Solana — in USDT and USDC. A multi-RPC consensus check cross-verifies
          payment confirmations against more than one node provider before treating a payment as
          final, specifically to protect against a single lying or compromised RPC endpoint
          reporting a payment that didn't actually happen.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">4.5 Merchant tooling</h3>
        <p>
          Merchants get a dashboard, API key rotation with a grace period so a key rotation never
          causes a hard outage, webhook secret rotation, and branded checkout (custom logo and
          brand color on the payment page). Business profile fields today are self-reported and
          admin-reviewed rather than backed by full document-based identity verification (KYB) — we
          say this plainly rather than calling a self-reported field "verified," and full KYB is on
          the roadmap as the merchant base grows.
        </p>
      </>
    ),
  },
  {
    id: "uqx-overview",
    title: "5. UQX — The Utility Token",
    body: (
      <>
        <h3 className="text-base font-semibold text-foreground">5.1 Why a token, when the products already work without one</h3>
        <p>
          This is a fair question and we want to answer it directly instead of gesturing at "future
          utility." Zynost and Zynost Pay both function completely on their own — a token isn't
          patching a hole in either product. What a token adds is a shared unit of value and
          participation across an ecosystem that would otherwise be three separate silos: a
          research subscription, a payment gateway fee, and a mining app with no connection between
          them. UQX is the mechanism that lets someone who mines for free eventually get real
          utility inside a serious, already-live research platform and payment gateway — and lets
          those two products reward their own users in a currency with an actual market, not an
          internal points system with no exit.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">5.2 What UQX is not</h3>
        <p>
          UQX is not a security, an investment contract, or a promise of financial return. Nobody
          associated with Zynost offers price targets, guaranteed yields, or "get in before it
          moons" framing, and this document doesn't either. Mining UQX is a digital participation
          and engagement activity, not a job with a wage and not a deposit with a return. Full
          formal risk disclosures are in Section 10.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">5.3 Utility today vs. utility at each phase</h3>
        <p>
          Today, UQX's only function is being earned and tracked — there is no live on-chain token
          yet (see Section 7 for exactly what that means technically). As the ecosystem moves
          through the phases described in Section 8, planned utility includes: fee discounts and
          payment options inside Zynost Pay checkout, referral-tier speed boosts inside the mining
          app (already live — see 5.4), and preferential access to Zynost research features. None
          of this is contractually guaranteed by this document; it describes intent and design
          direction, not a binding commitment with a delivery date.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">5.4 What's actually live right now</h3>
        <p>
          The UQX app's mining system is a real, server-tracked 24-hour session — not on-device
          proof-of-work, which is explicitly against Google Play policy and isn't what "mining"
          means here. Referral tiers (Bronze through God Tier, based on direct referral count) apply
          a real percentage boost to session rewards, tracked and paid out by the backend today.
          Internal peer-to-peer transfers between UQX app users work today, backed by a real ledger
          — external withdrawal to an outside wallet is disabled until the real token exists
          on-chain, described next.
        </p>
      </>
    ),
  },
  {
    id: "tokenomics-deep",
    title: "6. Tokenomics",
    body: (
      <>
        <h3 className="text-base font-semibold text-foreground">6.1 The failure pattern we designed against</h3>
        <p>
          Reward-token ecosystems with very large total supplies have a recurring failure mode,
          visible across more than one real, large-scale project: tens or hundreds of millions of
          participants accumulate a token for close to zero cost, that accumulated balance becomes
          fully transferable the moment trading opens with no time-based release, and the resulting
          sell pressure — from people who paid nothing and have every incentive to realize any
          non-zero price — overwhelms whatever genuine buy-side demand exists. The people who paid
          real money for the token, often at a much higher price during presale or early trading,
          absorb that sell pressure directly. This isn't a hypothetical; it's the observed pattern
          in the highest-profile mobile mining app of the last several years, where a total supply
          in the tens of billions and a launch with no vesting on mined balances produced exactly
          this outcome.
        </p>
        <p>
          Two variables drive this, not one. Total supply matters, but so does what fraction of it
          is free-to-market at any given moment. A token can have a comparatively modest total
          supply and still crash hard if all of it unlocks simultaneously; equally, a very large
          supply with a slow, structured release schedule behaves completely differently on-chain
          than the same supply dumped in a single block. UQX's design treats both variables as
          first-class decisions, not afterthoughts.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">6.2 Supply</h3>
        <p>
          UQX has a fixed total supply of <strong className="text-foreground">1,000,000,000
          tokens</strong>, set once at contract deployment. The token contract has no mint function
          — not a rate-limited one, not an owner-gated one, none at all. Supply cannot increase
          after deployment under any circumstance, including a decision by us. This is a much
          smaller absolute supply than comparable large-scale mining-reward tokens, deliberately.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">6.3 Allocation, and the reasoning behind each bucket</h3>
        <p>
          The full interactive breakdown with exact token counts lives on the{" "}
          <Link href="/tokenomics" className="text-violet underline underline-offset-2">Tokenomics page</Link>
          . The reasoning behind each bucket:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Mining Rewards (25%)</strong> — kept meaningfully below half of total supply specifically so free-mined tokens can never structurally dominate circulating supply the way they have in comparable projects.</li>
          <li><strong className="text-foreground">Presale (15%)</strong> — allocated to the people taking on real financial risk earliest; given a faster, but still gradual, vesting schedule than mining rewards in recognition of that risk.</li>
          <li><strong className="text-foreground">DEX Liquidity (15%)</strong> — locked for 12–24 months in a publicly verifiable liquidity lock, so anyone can independently confirm the trading pair can't be pulled out from under holders.</li>
          <li><strong className="text-foreground">Team (15%)</strong> — subject to a 6-month cliff and 18-month linear vest, the longest lockup of any bucket, so the people building this are aligned with the token's long-term health rather than its first trading day.</li>
          <li><strong className="text-foreground">Ecosystem &amp; Treasury (20%)</strong> — reserved for exchange listing costs, market-making, and future cross-product incentives between UQX, Zynost, and Zynost Pay.</li>
          <li><strong className="text-foreground">Advisors (5%)</strong> — same cliff-then-vest structure as team, at a smaller scale.</li>
          <li><strong className="text-foreground">Community &amp; Airdrop (5%)</strong> — reserved for organic growth and early-community recognition, details to be published closer to use.</li>
        </ul>

        <h3 className="mt-6 text-base font-semibold text-foreground">6.4 Vesting mechanics, explained without jargon</h3>
        <p>
          Every allocation above vests instead of unlocking all at once — including mining rewards,
          which is the part most comparable projects get wrong. At the token generation event
          (TGE), <strong className="text-foreground">20% of every individual allocation becomes
          immediately liquid</strong> — this isn't a total lockup, people can access and use a
          meaningful portion right away. The remaining 80% unlocks
          linearly over time: <strong className="text-foreground">8 months for mining rewards</strong>,{" "}
          <strong className="text-foreground">6 months for presale purchases</strong>. A user (or
          the vesting contract itself, on their behalf) can claim whatever portion has vested at
          any time — there's no need to wait for the full period to claim something.
        </p>
        <p>
          Mechanically, this is enforced by a smart contract, not a company policy. A snapshot of
          every user's earned or purchased balance is committed on-chain as a single cryptographic
          commitment (a Merkle root) at launch. Each user then proves their own allocation against
          that commitment and claims whatever has vested so far — the contract computes the vested
          amount directly from elapsed time since launch, with no function anywhere that lets an
          owner move someone's tokens, change their vesting schedule, or claim on their behalf. See
          Section 7.2 for the technical detail.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">6.5 Why this is different from a policy promise</h3>
        <p>
          A project can promise gradual unlocks in a whitepaper and simply not honor it — nothing
          stops a team from minting extra tokens or unlocking early if the token contract allows
          it. UQX's token contract has no mint function and no owner-gated transfer function, and
          the vesting contract's root, once set, cannot be changed. The constraint isn't "we said
          we would" — it's "the code doesn't have a function that would let us do otherwise," which
          is independently verifiable by anyone who reads the contract once it's deployed and
          verified on-chain.
        </p>
      </>
    ),
  },
  {
    id: "technical",
    title: "7. Technical Architecture & Security",
    body: (
      <>
        <h3 className="text-base font-semibold text-foreground">7.1 Non-custodial wallet design</h3>
        <p>
          The UQX app generates a real wallet — a BIP39 recovery phrase and a standard secp256k1
          keypair, the same cryptography behind every major Ethereum-compatible wallet — directly
          on the user's device. The private key is encrypted at rest using the device's own secure
          storage and never leaves the device, and never touches a Zynost server in any form. This
          is the same non-custodial principle Zynost Pay already runs in production, applied to the
          UQX wallet from day one rather than bolted on later.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">7.2 Smart contract design principles</h3>
        <p>
          Two contracts govern UQX: a token contract and a vesting contract, kept deliberately
          separate so the token itself carries zero privileged functions. The token contract mints
          the entire fixed supply once, at deployment, to a treasury address, and exposes no mint,
          pause, blacklist, or owner-gated function of any kind — there is no admin key that can do
          anything to a UQX holder's balance, ever, by design. The vesting contract holds the
          mining and presale allocations and releases them according to the schedule in Section
          6.4; its owner can set the launch snapshot exactly once and can never afterward change
          it, redirect a claim, or move a user's tokens without that user's own transaction.
        </p>
        <p>
          The vesting contract does carry one narrow safety valve — a pause switch that can halt
          new claims in a genuine emergency (for example, a bug discovered after launch). Vesting
          continues to accrue normally while paused; nothing already vested is lost or altered, it
          simply can't be withdrawn until unpaused. We deliberately did not put this switch on the
          token itself — UqxToken remains permanently free of any pause function, so the core
          asset people hold and trade can never be frozen, only the claim mechanism for newly
          vesting tokens.
        </p>
        <p>
          This switch isn't controlled by a single key. The vesting contract's ownership sits with
          an OpenZeppelin <code>TimelockController</code>, not a wallet. Proposing any owner action —
          setting the launch snapshot, pausing, or unpausing — is restricted to a Safe{"{Wallet}"}{" "}
          multisig requiring multiple independent approvals, and every proposed action then sits
          publicly queued on-chain for a mandatory delay (48 hours by default) before it can
          execute. Nobody, including us, can use this switch instantly or silently — anyone
          watching the chain sees a proposed action and has the full delay window to react before
          it takes effect.
        </p>
        <p>
          Both contracts are built on OpenZeppelin's audited base libraries rather than custom
          cryptographic or token-standard code, and both are covered by an automated test suite
          that verifies the exact behaviors described in this document — the vesting math, the
          one-time root-set restriction, rejection of tampered or invalid claims, correct
          fixed-supply minting, and the full multisig-propose → delay → execute flow for every
          owner action — run against a local blockchain simulation before any deployment.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">7.3 Honest status: audits and deployment</h3>
        <p>
          As of this document's publication, the UQX token and vesting contracts have been written
          and tested locally but have <strong className="text-foreground">not yet been deployed to
          any live network</strong>, and have not yet undergone a third-party security audit. We
          are stating this plainly rather than implying otherwise. The plan is a testnet deployment
          first, a public verification period, and a professional audit before any mainnet
          deployment carrying real value. This document will be updated as each of those steps
          completes.
        </p>

        <h3 className="mt-6 text-base font-semibold text-foreground">7.4 Verify it yourself</h3>
        <p>
          Most reward-token projects ask you to trust a whitepaper. We&apos;d rather you didn&apos;t
          have to — once the contracts are live, here&apos;s exactly how to check our claims against
          the actual blockchain, using free public tools, without asking us for anything:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Confirm the supply is really fixed.</strong> Open the UqxToken contract on BscScan, go to the &quot;Contract&quot; tab, and read the source code directly — search for any function containing the word <code>mint</code>. There isn&apos;t one, and BscScan&apos;s verified-source view means you&apos;re reading the exact code that&apos;s running, not a claim about it.</li>
          <li><strong className="text-foreground">Confirm your own vesting schedule.</strong> The UQX app will show you the exact numbers it&apos;s using — your total allocation, your allocation type, and the cryptographic proof tied to your address — the same inputs the <code>claim()</code> function checks on-chain. You can call <code>claimable(yourAddress, yourAmount, yourType)</code> directly on BscScan&apos;s &quot;Read Contract&quot; tab at any time and get the same answer the app shows you, independently.</li>
          <li><strong className="text-foreground">Confirm the liquidity lock.</strong> Once DEX liquidity is locked, the lock will be through a well-known public locker service, and the lock address and unlock date will be published — checkable by anyone, not just us.</li>
          <li><strong className="text-foreground">Confirm the vesting root matches the real snapshot.</strong> The full mining and presale allocation data used to build the Merkle root will be published so anyone technical enough can independently recompute the same root from scratch and compare it against what&apos;s on-chain.</li>
          <li><strong className="text-foreground">Watch for any pending admin action before it happens.</strong> Because every owner action on the vesting contract goes through the timelock, a proposed action is visible on-chain the moment it&apos;s queued — the timelock&apos;s <code>TimelockController</code> address on BscScan shows every scheduled operation and exactly when it becomes executable, well before it can run.</li>
        </ul>
        <p>
          None of this requires trusting us specifically — it requires trusting arithmetic and
          public blockchain data, which is the whole point.
        </p>
      </>
    ),
  },
  {
    id: "roadmap-deep",
    title: "8. Roadmap",
    body: (
      <>
        <p>
          The complete, continuously updated roadmap — including what's shipped today across every
          product — lives on the{" "}
          <Link href="/roadmap" className="text-violet underline underline-offset-2">Roadmap page</Link>
          {" "}rather than being duplicated here, since that page is the one we actually keep current.
          UQX's token launch specifically moves through four phases:
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong className="text-foreground">Mining</strong> — live today. Earning continues exactly as it works now; nothing changes for existing users before launch.</li>
          <li><strong className="text-foreground">Presale</strong> — real UQX sent directly to a buyer's own non-custodial wallet, vesting on the schedule in Section 6.4. Full presale terms will be published as a separate document before it opens, including jurisdictional restrictions.</li>
          <li><strong className="text-foreground">DEX Listing</strong> — trading opens with liquidity locked and publicly verifiable, on the timeline described on the Roadmap page. This is an internal target, not a guarantee — it depends on audit completion and regulatory review, not just a calendar date.</li>
          <li><strong className="text-foreground">Ecosystem</strong> — UQX utility expands into Zynost Pay and the broader Zynost platform as described in Section 5.3.</li>
        </ol>
      </>
    ),
  },
  {
    id: "governance",
    title: "9. Team & Governance",
    body: (
      <>
        <p>
          We're not going to fill this section with stock-photo executive bios, because we don't
          have any to give you honestly, and a fabricated team section is exactly the kind of thing
          this document is trying not to do. Zynost is built and operated by a small, focused team.
          What we'd rather you evaluate is what's actually verifiable: the products are live and
          usable right now, the smart contract code will be public and verifiable on-chain before
          any real value touches it, and the token mechanics are enforced by that code rather than
          by anyone's promise. Plenty of respected projects in this space have built credibility
          through exactly that — working software and verifiable code — rather than through
          headshots. We intend to earn trust the same way, and we'll expand this section with
          concrete organizational detail (legal entity, jurisdiction, formal governance structure)
          as those pieces are finalized ahead of the presale.
        </p>
      </>
    ),
  },
  {
    id: "risks",
    title: "10. Risk Factors",
    body: (
      <>
        <p>
          This section is deliberately long. If you only read one section of this document before
          deciding whether to mine, hold, or buy UQX, it should be this one.
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li><strong className="text-foreground">Market risk.</strong> UQX, like any digital asset, may lose some or all of its value. There is no floor price, no buyback guarantee, and no entity obligated to purchase UQX from you at any price.</li>
          <li><strong className="text-foreground">Regulatory risk.</strong> The legal treatment of utility tokens varies by jurisdiction and is actively evolving. Future regulation could restrict UQX's availability, transferability, or the legality of participating from certain countries. We may restrict access from specific jurisdictions as a result, without advance notice if required to do so.</li>
          <li><strong className="text-foreground">Technology risk.</strong> Smart contracts, however carefully tested, can contain bugs. We have tested the UQX contracts extensively against a local simulation (Section 7.2) and plan a third-party audit before mainnet deployment, but no amount of testing eliminates risk entirely.</li>
          <li><strong className="text-foreground">Liquidity risk.</strong> Before a DEX listing exists, UQX has no trading market at all. After listing, trading liquidity may be thin, especially early on, meaning large trades could move the price significantly in either direction.</li>
          <li><strong className="text-foreground">Execution risk.</strong> Roadmap timelines in this document are targets based on current plans, not commitments. Audits, regulatory review, exchange negotiations, and ordinary software development can all shift a timeline.</li>
          <li><strong className="text-foreground">Custody risk (yours, not ours).</strong> Because UQX wallets are non-custodial, you are solely responsible for your own recovery phrase. If you lose it, nobody — including us — can recover your funds. If someone else obtains it, they can take your funds, and there is no reversal mechanism.</li>
          <li><strong className="text-foreground">No investment advice.</strong> Nothing in this document, the UQX app, or any associated communication is financial, investment, tax, or legal advice. Consult your own professional advisors before making any decision involving real money.</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal",
    title: "11. Legal Disclaimer",
    body: (
      <>
        <p>
          This document is for informational purposes only and does not constitute an offer or
          solicitation to sell securities or any regulated financial instrument in any
          jurisdiction. UQX is designed and intended to function as a utility token providing
          access to features within the Zynost ecosystem, not as a security, and this document
          should not be relied upon as such. Statements about future features, timelines, or
          utility are forward-looking, are based on current plans, and are subject to change
          without notice. {SITE.name} makes no representation or warranty as to the accuracy or
          completeness of the information in this document and disclaims all liability for any
          direct or indirect loss arising from its use. By participating in UQX mining, the
          presale, or any related activity, you acknowledge that you have read and understood the
          Risk Factors in Section 10 and the{" "}
          <Link href="/privacy-policy" className="text-violet underline underline-offset-2">Privacy Policy</Link>
          {" "}and{" "}
          <Link href="/terms" className="text-violet underline underline-offset-2">Terms of Service</Link>.
        </p>
      </>
    ),
  },
  {
    id: "glossary",
    title: "12. Glossary",
    body: (
      <dl className="space-y-3">
        {[
          ["Account Abstraction (ERC-4337)", "A standard that lets a wallet be a smart contract instead of a plain key pair, enabling features like gasless transactions and custom recovery logic."],
          ["Cliff", "A vesting term meaning a period during which nothing unlocks at all, before linear unlocking begins."],
          ["Merkle root / Merkle proof", "A cryptographic technique for committing to a large dataset (like a full allocation snapshot) with a single small hash on-chain, letting any individual entry be verified cheaply against that hash without publishing the entire dataset on-chain."],
          ["Non-custodial", "A design where a service never holds the private keys needed to move a user's funds — the user retains sole control at all times."],
          ["TGE (Token Generation Event)", "The moment a token's smart contract is deployed and its initial supply is created."],
          ["Vesting", "A schedule that releases an allocation of tokens gradually over time rather than all at once."],
        ].map(([term, def]) => (
          <div key={term}>
            <dt className="font-semibold text-foreground">{term}</dt>
            <dd className="text-sm">{def}</dd>
          </div>
        ))}
      </dl>
    ),
  },
];
