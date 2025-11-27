import { createWeb3Modal, defaultWagmiConfig } from 'https://unpkg.com/@web3modal/wagmi@3/dist/wagmi.js';
import { sepolia, mainnet } from 'https://cdn.jsdelivr.net/npm/viem/chains/dist/index.js';

// 1. WalletConnect Project ID (buat gratis di https://cloud.walletconnect.com)
const projectId = "19201e3aed7dc4fcc0d43c44240a6317"; // ← Ganti dengan project ID Anda

// 2. Konfigurasi wagmi
const metadata = {
  name: "Web3 Wallet Connect",
  description: "Demo connect wallet",
  url: "https://example.com",
  icons: ["https://example.com/icon.png"]
};

const chains = [mainnet, sepolia];

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Buat modal connect wallet
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false
});

// ============ UI ELEMENTS ============
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const walletInfo = document.getElementById("wallet-info");
const addressTag = document.getElementById("address");
const chainTag = document.getElementById("chain");

// ============ CONNECT WALLET ============
connectBtn.addEventListener("click", async () => {
  try {
    await config.wagmiClient.connect();
    updateWalletInfo();
  } catch (err) {
    console.log("Connect error:", err);
  }
});

// ============ DISCONNECT ============
disconnectBtn.addEventListener("click", async () => {
  await config.wagmiClient.disconnect();
  walletInfo.classList.add("hidden");
});

// ============ UPDATE UI ============
async function updateWalletInfo() {
  const state = config.wagmiClient.getState();
  const addr = state.current?.signer?.address;
  const chainId = state.chainId;

  if (addr) {
    addressTag.textContent = addr;
    chainTag.textContent = chainId;
    walletInfo.classList.remove("hidden");
  }
}
