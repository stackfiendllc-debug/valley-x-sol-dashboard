const connectButton = document.getElementById("connect");
const walletInfo = document.getElementById("walletInfo");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

async function connectWallet() {
  try {
    const provider = window.solana;

    if (!provider || !provider.isPhantom) {
      alert("Please open inside Phantom browser");
      return;
    }

    const response = await provider.connect({
      onlyIfTrusted: false
    });

    const publicKey = response.publicKey.toString();

    walletInfo.style.display = "block";
    addressEl.textContent = publicKey;

    connectButton.innerText = "Connected";

    balanceEl.textContent = "Connected to Phantom";

  } catch (err) {
    console.error(err);
    alert("Connection failed: " + err.message);
  }
}

connectButton.onclick = connectWallet;

window.addEventListener("load", async () => {
  if (window.solana?.isPhantom) {
    try {
      const resp = await window.solana.connect({
        onlyIfTrusted: true
      });

      if (resp.publicKey) {
        walletInfo.style.display = "block";
        addressEl.textContent = resp.publicKey.toString();
        connectButton.innerText = "Connected";
        balanceEl.textContent = "Wallet Restored";
      }
    } catch {}
  }
});