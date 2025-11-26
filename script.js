const connectBtn = document.getElementById("connectBtn");
const status = document.getElementById("status");

connectBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      status.innerHTML = `Wallet connected: ${accounts[0]}`;
      connectBtn.style.display = 'none';
    } catch (err) {
      status.innerHTML = "User rejected connection";
    }
  } else {
    status.innerHTML = "MetaMask not detected";
  }
};
