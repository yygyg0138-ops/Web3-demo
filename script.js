// ---- SETUP WEB3MODAL ----
const projectId = "19201e3aed7dc4fcc0d43c44240a6317"; // isi dengan WalletConnect Project ID kamu (gratis)

const modal = new window.Web3Modal.default({
    walletConnectVersion: 2,

    projectId: projectId,

    chains: [
        {
            id: 1,
            name: "Ethereum",
            rpcUrls: ["https://rpc.ankr.com/eth"]
        }
    ],

    themeMode: "dark",
});

// ---- ELEMENT UI ----
const connectBtn = document.getElementById("connectBtn");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const walletInfo = document.getElementById("walletInfo");

// ---- CONNECT WALLET ----
async function connectWallet() {
    try {
        const provider = await modal.connect();
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();

        const address = await signer.getAddress();
        const network = await ethersProvider.getNetwork();
        const balanceWei = await ethersProvider.getBalance(address);
        const balance = ethers.formatEther(balanceWei);

        // Tampilkan ke UI
        addressEl.textContent = address;
        networkEl.textContent = network.name + " (" + network.chainId + ")";
        balanceEl.textContent = balance;

        walletInfo.classList.remove("hidden");
    } catch (err) {
        console.error(err);
        alert("Gagal connect wallet.");
    }
}

connectBtn.addEventListener("click", connectWallet);
