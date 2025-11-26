let web3Modal;
let provider;
let signer;
let ethersProvider;

window.onload = async () => {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        rpc: {
          1: "https://rpc.ankr.com/eth" // Ethereum Mainnet
        }
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
    document.getElementById("status").innerText = "";

    // Optional: listen for account/network change
    provider.on("accountsChanged", () => location.reload());
    provider.on("chainChanged", () => location.reload());
  } catch (err) {
    console.error("Connection failed:", err);
    document.getElementById("status").innerText = "Connection failed. Please try again.";
  }
}

async function disconnectWallet() {
  if (provider?.close) await provider.close();
  await web3Modal.clearCachedProvider();

  document.getElementById("walletInfo").classList.add("hidden");
  document.getElementById("disconnectBtn").classList.add("hidden");
  document.getElementById("connectBtn").classList.remove("hidden");
  document.getElementById("status").innerText = "";
}

document.getElementById("connectBtn").onclick = connectWallet;
document.getElementById("disconnectBtn").onclick = disconnectWallet;
