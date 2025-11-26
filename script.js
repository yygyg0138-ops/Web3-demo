let web3Modal;
let provider;
let signer;
let ethersProvider;

// RPC (multi-chain support)
const RPCs = {
  1: "https://rpc.ankr.com/eth",         // Ethereum Mainnet
  56: "https://bsc-dataseed.binance.org/", // BSC
  137: "https://polygon-rpc.com/",       // Polygon
  66: "https://exchainrpc.okex.org"      // OKX Chain
};

window.onload = async () => {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        rpc: RPCs
      }
    }
  };

  web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    disableInjectedProvider: false
  });
};

async function connectWallet() {
  try {
    provider = await web3Modal.connect();

    ethersProvider = new ethers.providers.Web3Provider(provider);
    signer = ethersProvider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = address;

    const balance = await ethersProvider.getBalance(address);
    document.getElementById("walletBalance").innerText =
      Number(ethers.utils.formatEther(balance)).toFixed(4);

    document.getElementById("walletInfo").classList.remove("hidden");
    document.getElementById("disconnectBtn").classList.remove("hidden");
    document.getElementById("connectBtn").classList.add("hidden");

  } catch (err) {
    document.getElementById("status").innerText = "Connection failed";
  }
}

async function disconnectWallet() {
  if (provider?.close) {
    await provider.close();
  }

  await web3Modal.clearCachedProvider();

  document.getElementById("walletInfo").classList.add("hidden");
  document.getElementById("disconnectBtn").classList.add("hidden");
  document.getElementById("connectBtn").classList.remove("hidden");
}

document.getElementById("connectBtn").onclick = connectWallet;
document.getElementById("disconnectBtn").onclick = disconnectWallet;
