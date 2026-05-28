const connectButton = document.getElementById("connect");
const walletInfo = document.getElementById("walletInfo");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

async function connectWallet() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const response = await window.solana.connect();

      const publicKey = response.publicKey.toString();
      addressEl.textContent = publicKey;

      const connection = new solanaWeb3.Connection(
        "https://api.mainnet-beta.solana.com"
      );

      const balance = await connection.getBalance(response.publicKey);

      balanceEl.textContent = (balance / 1000000000).toFixed(4);

      walletInfo.style.display = "block";

    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  } else {
    window.open("https://phantom.app/", "_blank");
  }
}

connectButton.addEventListener("click", connectWallet);
