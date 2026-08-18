"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Contract, JsonRpcProvider, formatEther, parseEther, MaxUint256 } from "ethers";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, ArrowRight, CheckCircle2, Loader2, AlertTriangle, Clock } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import {
  UQX_PRESALE_ADDRESS,
  PAYMENT_TOKENS,
  PRESALE_ABI,
  ERC20_ABI,
  PRICE_PER_UQX_USD,
  BSC_CHAIN_PARAMS,
} from "@/lib/web3/presaleConfig";

const readProvider = new JsonRpcProvider(BSC_CHAIN_PARAMS.rpcUrls[0]);

// tsconfig targets ES2017, which doesn't allow BigInt *literal* syntax
// (0n, 18n) at the type-check level even though the runtime supports
// BigInt fine — using BigInt(...) calls instead avoids bumping a
// project-wide compiler setting for one component.
const ZERO = BigInt(0);
const WAD = BigInt(10) ** BigInt(18); // 1e18, matches UQX/USDT/USDC's 18 decimals

type Stage = "idle" | "approving" | "buying" | "claiming";

function fmt(n: number, decimals = 2) {
  return n.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

export function PresaleWidget() {
  const wallet = useWallet();
  const [totalSold, setTotalSold] = useState<bigint | null>(null);
  const [cap, setCap] = useState<bigint | null>(null);
  const [paused, setPaused] = useState(false);

  const [tokenIndex, setTokenIndex] = useState(0);
  const paymentToken = PAYMENT_TOKENS[tokenIndex];

  const [amount, setAmount] = useState("");
  const [tokenBalance, setTokenBalance] = useState<bigint | null>(null);
  const [allowance, setAllowance] = useState<bigint | null>(null);

  const [purchased, setPurchased] = useState<bigint | null>(null);
  const [claimed, setClaimed] = useState<bigint | null>(null);
  const [claimable, setClaimable] = useState<bigint | null>(null);
  const [vested, setVested] = useState<bigint | null>(null);
  const [firstPurchaseAt, setFirstPurchaseAt] = useState<bigint | null>(null);

  const [stage, setStage] = useState<Stage>("idle");
  const [txError, setTxError] = useState<string | null>(null);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);

  // Public, wallet-independent stats — visible to everyone.
  const loadPublicStats = useCallback(async () => {
    const presale = new Contract(UQX_PRESALE_ADDRESS, PRESALE_ABI, readProvider);
    const [sold, capVal, isPaused] = await Promise.all([
      presale.totalSold(),
      presale.PRESALE_CAP(),
      presale.paused(),
    ]);
    setTotalSold(sold);
    setCap(capVal);
    setPaused(isPaused);
  }, []);

  useEffect(() => {
    loadPublicStats();
    const id = setInterval(loadPublicStats, 20_000);
    return () => clearInterval(id);
  }, [loadPublicStats]);

  const loadWalletData = useCallback(async () => {
    if (!wallet.address) return;
    const presale = new Contract(UQX_PRESALE_ADDRESS, PRESALE_ABI, readProvider);
    const token = new Contract(paymentToken.address, ERC20_ABI, readProvider);
    const [buyerInfo, claimableAmt, vestedAmt, balance, allowed] = await Promise.all([
      presale.buyers(wallet.address),
      presale.claimable(wallet.address),
      presale.vestedAmount(wallet.address),
      token.balanceOf(wallet.address),
      token.allowance(wallet.address, UQX_PRESALE_ADDRESS),
    ]);
    setPurchased(buyerInfo.totalPurchased);
    setClaimed(buyerInfo.claimed);
    setClaimable(claimableAmt);
    setVested(vestedAmt);
    setFirstPurchaseAt(buyerInfo.firstPurchaseAt);
    setTokenBalance(balance);
    setAllowance(allowed);
  }, [wallet.address, paymentToken.address]);

  useEffect(() => {
    if (wallet.address && wallet.isOnBsc) loadWalletData();
  }, [wallet.address, wallet.isOnBsc, loadWalletData]);

  const stillLocked = purchased !== null && vested !== null ? purchased - vested : null;

  const fullyUnlockedAt = useMemo(() => {
    if (!firstPurchaseAt || firstPurchaseAt === ZERO) return null;
    const VESTING_DURATION_SECONDS = 180 * 24 * 60 * 60;
    return new Date((Number(firstPurchaseAt) + VESTING_DURATION_SECONDS) * 1000);
  }, [firstPurchaseAt]);

  const amountWei = useMemo(() => {
    if (!amount || Number.isNaN(Number(amount))) return ZERO;
    try {
      return parseEther(amount);
    } catch {
      return ZERO;
    }
  }, [amount]);

  const uqxQuote = useMemo(() => {
    if (amountWei === ZERO) return ZERO;
    return (amountWei * WAD) / BigInt(Math.round(PRICE_PER_UQX_USD * 1e18));
  }, [amountWei]);

  const needsApproval = allowance !== null && amountWei > ZERO && allowance < amountWei;
  const insufficientBalance = tokenBalance !== null && amountWei > ZERO && amountWei > tokenBalance;

  async function handleApprove() {
    setTxError(null);
    setTxSuccess(null);
    const provider = wallet.getProvider();
    if (!provider) return;
    setStage("approving");
    try {
      const signer = await provider.getSigner();
      const token = new Contract(paymentToken.address, ERC20_ABI, signer);
      const tx = await token.approve(UQX_PRESALE_ADDRESS, MaxUint256);
      await tx.wait();
      setTxSuccess("Approved. You can now buy.");
      await loadWalletData();
    } catch (e) {
      setTxError(e instanceof Error ? e.message : "Approval failed.");
    } finally {
      setStage("idle");
    }
  }

  async function handleBuy() {
    setTxError(null);
    setTxSuccess(null);
    const provider = wallet.getProvider();
    if (!provider) return;
    setStage("buying");
    try {
      const signer = await provider.getSigner();
      const presale = new Contract(UQX_PRESALE_ADDRESS, PRESALE_ABI, signer);
      const tx = await presale.buy(paymentToken.address, amountWei);
      await tx.wait();
      setTxSuccess(`Purchased ${fmt(Number(formatEther(uqxQuote)), 0)} UQX.`);
      setAmount("");
      await Promise.all([loadWalletData(), loadPublicStats()]);
    } catch (e) {
      setTxError(e instanceof Error ? e.message : "Purchase failed.");
    } finally {
      setStage("idle");
    }
  }

  async function handleClaim() {
    setTxError(null);
    setTxSuccess(null);
    const provider = wallet.getProvider();
    if (!provider) return;
    setStage("claiming");
    try {
      const signer = await provider.getSigner();
      const presale = new Contract(UQX_PRESALE_ADDRESS, PRESALE_ABI, signer);
      const tx = await presale.claim();
      await tx.wait();
      setTxSuccess("Claimed successfully.");
      await loadWalletData();
    } catch (e) {
      setTxError(e instanceof Error ? e.message : "Claim failed.");
    } finally {
      setStage("idle");
    }
  }

  const soldPct = totalSold !== null && cap !== null && cap > ZERO
    ? Number((totalSold * BigInt(10000)) / cap) / 100
    : 0;

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Progress card */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Presale progress</span>
          <span className="font-semibold text-foreground">{fmt(soldPct)}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet to-sky"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(soldPct, 100)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{totalSold !== null ? fmt(Number(formatEther(totalSold)), 0) : "…"} UQX sold</span>
          <span>{cap !== null ? fmt(Number(formatEther(cap)), 0) : "…"} UQX cap</span>
        </div>
      </div>

      {paused && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-warn/40 bg-warn/10 p-3 text-sm text-warn">
          <AlertTriangle size={16} />
          Presale is currently paused. Purchases and claims are temporarily unavailable.
        </div>
      )}

      {/* Wallet / buy card */}
      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        {!wallet.address ? (
          <button
            onClick={wallet.connect}
            disabled={wallet.connecting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-dim disabled:opacity-60"
          >
            {wallet.connecting ? <Loader2 size={16} className="animate-spin" /> : <Wallet size={16} />}
            {wallet.connecting ? "Connecting…" : "Connect Wallet"}
          </button>
        ) : !wallet.isOnBsc ? (
          <button
            onClick={wallet.switchToBsc}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-warn px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Switch to BNB Smart Chain
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Connected</span>
              <span className="font-mono">{wallet.address.slice(0, 6)}…{wallet.address.slice(-4)}</span>
            </div>

            {/* Payment token selector */}
            <div className="flex gap-2">
              {PAYMENT_TOKENS.map((t, i) => (
                <button
                  key={t.symbol}
                  onClick={() => setTokenIndex(i)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                    i === tokenIndex ? "border-violet bg-violet/10 text-violet" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.symbol}
                </button>
              ))}
            </div>

            {/* Amount input */}
            <div>
              <label className="text-xs text-muted-foreground">Amount ({paymentToken.symbol})</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-lg font-semibold outline-none focus:border-violet"
              />
              {tokenBalance !== null && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Balance: {fmt(Number(formatEther(tokenBalance)))} {paymentToken.symbol}
                </p>
              )}
            </div>

            {amountWei > ZERO && (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-background p-3 text-sm">
                <span className="text-muted-foreground">You&apos;ll receive</span>
                <ArrowRight size={14} className="text-muted-foreground" />
                <span className="font-semibold text-violet">{fmt(Number(formatEther(uqxQuote)), 0)} UQX</span>
              </div>
            )}

            {insufficientBalance && (
              <p className="text-xs text-bearish">Insufficient {paymentToken.symbol} balance.</p>
            )}

            {needsApproval ? (
              <button
                onClick={handleApprove}
                disabled={stage !== "idle" || amountWei === ZERO || insufficientBalance || paused}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-dim disabled:opacity-50"
              >
                {stage === "approving" && <Loader2 size={16} className="animate-spin" />}
                Approve {paymentToken.symbol}
              </button>
            ) : (
              <button
                onClick={handleBuy}
                disabled={stage !== "idle" || amountWei === ZERO || insufficientBalance || paused}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-dim disabled:opacity-50"
              >
                {stage === "buying" && <Loader2 size={16} className="animate-spin" />}
                Buy UQX
              </button>
            )}

            <AnimatePresence>
              {txError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-bearish">
                  {txError}
                </motion.p>
              )}
              {txSuccess && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-xs text-bullish">
                  <CheckCircle2 size={14} /> {txSuccess}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Buyer's own position */}
            {purchased !== null && purchased > ZERO && (
              <div className="mt-2 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Clock size={12} /> Your allocation
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total purchased</p>
                    <p className="font-semibold">{fmt(Number(formatEther(purchased)), 0)} UQX</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Already claimed</p>
                    <p className="font-semibold">{fmt(Number(formatEther(claimed ?? ZERO)), 0)} UQX</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Unlocked so far</p>
                    <p className="font-semibold text-bullish">{fmt(Number(formatEther(vested ?? ZERO)), 2)} UQX</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Still locked</p>
                    <p className="font-semibold">{fmt(Number(formatEther(stillLocked ?? ZERO)), 2)} UQX</p>
                  </div>
                </div>
                {purchased !== null && purchased > ZERO && (
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet to-sky"
                      style={{
                        width: `${Math.min(
                          100,
                          Number(((vested ?? ZERO) * BigInt(10000)) / purchased) / 100,
                        )}%`,
                      }}
                    />
                  </div>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  20% is liquid immediately, the rest vests linearly over 6 months from your first purchase.
                  {fullyUnlockedAt && (
                    <> Fully unlocks {fullyUnlockedAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}.</>
                  )}
                </p>
                <button
                  onClick={handleClaim}
                  disabled={stage !== "idle" || !claimable || claimable === ZERO || paused}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-violet px-6 py-2.5 text-sm font-semibold text-violet transition-colors hover:bg-violet/10 disabled:opacity-50"
                >
                  {stage === "claiming" && <Loader2 size={16} className="animate-spin" />}
                  Claim {claimable ? fmt(Number(formatEther(claimable)), 2) : "0"} UQX
                </button>
              </div>
            )}
          </div>
        )}
        {wallet.error && <p className="mt-3 text-xs text-bearish">{wallet.error}</p>}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        $0.005 per UQX · Paid in USDT or USDC on BNB Smart Chain · Real tokens sent directly to your wallet
      </p>
    </div>
  );
}
