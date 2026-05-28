const connectButton = document.getElementById("connect");
const walletInfo = document.getElementById("walletInfo");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

const connection = new solanaWeb3.Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

async function updateBalance(pubKey) {
  try {
    const lamports = await connection.getBalance(pubKey);
    const sol = lamports / solanaWeb3.LAMPORTS_PER_SOL;
    balanceEl.textContent = `${sol.toFixed(4)} SOL`;
  } catch (err) {
    balanceEl.textContent = "Balance unavailable";
    console.error(err);
  }
}

async function connectWallet() {
  try {
    const provider = window.solana;

    if (!provider?.isPhantom) {
      alert("Open this inside Phantom browser");
      return;
    }

    const resp = await provider.connect();

    walletInfo.style.display = "block";

    addressEl.textContent =
      resp.publicKey.toString().slice(0, 6) +
      "..." +
      resp.publicKey.toString().slice(-4);

    connectButton.textContent = "Connected";

    balanceEl.textContent = "Loading balance...";

    await updateBalance(resp.publicKey);

  } catch (err) {
    console.error(err);
    alert("Connection failed");
  }
}

connectButton.addEventListener("click", connectWallet);