const connectBtn = document.getElementById("connectBtn");
const status = document.getElementById("status");
const walletInfo = document.getElementById("walletInfo");
const walletAddressSpan = document.getElementById("walletAddress");
const walletBalanceSpan = document.getElementById("walletBalance");

const contractCallDiv = document.getElementById("contractCall");
const contractValueSpan = document.getElementById("contractValue");
const readContractBtn = document.getElementById("readContract");

// Contoh: dummy smart contract read-only
const contractAddress = "0x0000000000000000000000000000000000000000"; // ganti sesuai contract
const abi = [
  "function name() view returns (string)"
];

connectBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      walletAddressSpan.innerText = account;

      const balance = await provider.getBalance(account);
      walletBalanceSpan.innerText = ethers.utils.formatEther(balance);

      walletInfo.classList.remove("hidden");
      contractCallDiv.classList.remove("hidden");
      connectBtn.style.display = "none";
    } catch {
      status.innerHTML = "User rejected connection";
    }
  } else {
    status.innerHTML = "MetaMask not detected";
  }
};

readContractBtn.onclick = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const value = await contract.name(); // contoh read
    contractValueSpan.innerText = value;
  } catch (err) {
    contractValueSpan.innerText = "Error reading contract";
  }
};
