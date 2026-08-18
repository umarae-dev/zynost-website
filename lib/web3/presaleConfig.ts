// Real, live BSC mainnet addresses — deployed and verified 2026-08-18.
// See zynost-paymaster/UQX_TOKEN_GUIDE.md for the full deployment record.

export const BSC_CHAIN_ID = 56;
export const BSC_CHAIN_ID_HEX = "0x38";

export const BSC_CHAIN_PARAMS = {
  chainId: BSC_CHAIN_ID_HEX,
  chainName: "BNB Smart Chain",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: ["https://bsc-rpc.publicnode.com"],
  blockExplorerUrls: ["https://bscscan.com"],
};

export const UQX_TOKEN_ADDRESS = "0x68B1Eb4b344cc86750bd9Ac9e3f4F53B3aF48A28";
export const UQX_PRESALE_ADDRESS = "0xe2f3931Be4A5e1f7C8266C3312C015E426f625dD";

export const PAYMENT_TOKENS = [
  { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
  { symbol: "USDC", address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18 },
] as const;

export const PRESALE_ABI = [
  "function quote(uint256 paymentAmount) view returns (uint256)",
  "function buy(address paymentToken, uint256 paymentAmount)",
  "function claim()",
  "function claimable(address buyer) view returns (uint256)",
  "function vestedAmount(address buyer) view returns (uint256)",
  "function buyers(address) view returns (uint256 totalPurchased, uint256 claimed, uint256 firstPurchaseAt)",
  "function totalSold() view returns (uint256)",
  "function PRESALE_CAP() view returns (uint256)",
  "function PRICE_PER_TOKEN_USD() view returns (uint256)",
  "function paused() view returns (bool)",
  "event Purchased(address indexed buyer, address indexed paymentToken, uint256 paidAmount, uint256 uqxAmount)",
];

export const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

export const PRICE_PER_UQX_USD = 0.005;
