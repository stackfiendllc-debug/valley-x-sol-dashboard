const connectButton = document.getElementById("connect");
const walletInfo = document.getElementById("walletInfo");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

async function connectWallet() {
  try {
    const provider = window.phantom?.solana || window.solana;

    if (!provider || !provider.isPhantom) {
      alert("Open inside Phantom browser");
      return;
    }

    const resp = await provider.connect();

    if (!resp.publicKey) {
      alert("Wallet connection failed");
      return;
    }

    const publicKey = resp.publicKey.toString();

    addressEl.textContent = publicKey;

    walletInfo.style.display = "block";

    balanceEl.textContent = "Loading...";

    const connection = new solanaWeb3.Connection(
      "https://api.mainnet-beta.solana.com",
      "confirmed"
    );

    const lamports = await connection.getBalance(resp.publicKey);

    balanceEl.textContent = (lamports / 1000000000).toFixed(4) + " SOL";

    connectButton.textContent = "Connected";

  } catch (err) {
    console.error(err);
    alert("Connection error: " + err.message);
  }
}

connectButton.addEventListener("click", connectWallet);