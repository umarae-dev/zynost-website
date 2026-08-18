"use client";

import { useCallback, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { BSC_CHAIN_ID, BSC_CHAIN_ID_HEX, BSC_CHAIN_PARAMS } from "@/lib/web3/presaleConfig";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

/** Connects to whatever injected wallet is available (MetaMask, Trust
 * Wallet's in-app browser, etc.) — no WalletConnect Cloud project needed,
 * which covers the large majority of both desktop and mobile-in-app-browser
 * presale buyers without an extra dependency/setup step. */
export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasInjectedWallet = typeof window !== "undefined" && !!window.ethereum;

  const refreshChain = useCallback(async () => {
    if (!window.ethereum) return;
    const hex = (await window.ethereum.request({ method: "eth_chainId" })) as string;
    setChainId(parseInt(hex, 16));
  }, []);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError("No wallet found. Install MetaMask or open this page inside a wallet's browser.");
      return;
    }
    setConnecting(true);
    setError(null);
    try {
      const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
      setAddress(accounts[0] ?? null);
      await refreshChain();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect wallet.");
    } finally {
      setConnecting(false);
    }
  }, [refreshChain]);

  const switchToBsc = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BSC_CHAIN_ID_HEX }],
      });
    } catch (switchError) {
      // 4902 = chain not added to the wallet yet
      if ((switchError as { code?: number })?.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [BSC_CHAIN_PARAMS],
        });
      } else {
        throw switchError;
      }
    }
    await refreshChain();
  }, [refreshChain]);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  const getProvider = useCallback(() => {
    if (!window.ethereum) return null;
    return new BrowserProvider(window.ethereum);
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccounts = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      setAddress(accounts[0] ?? null);
    };
    const handleChain = () => {
      refreshChain();
    };
    window.ethereum.on("accountsChanged", handleAccounts);
    window.ethereum.on("chainChanged", handleChain);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccounts);
      window.ethereum?.removeListener("chainChanged", handleChain);
    };
  }, [refreshChain]);

  return {
    address,
    chainId,
    isOnBsc: chainId === BSC_CHAIN_ID,
    connecting,
    error,
    hasInjectedWallet,
    connect,
    disconnect,
    switchToBsc,
    getProvider,
  };
}
