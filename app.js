const connectButton = document.getElementById("connect");
const walletInfo = document.getElementById("walletInfo");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

async function fetchBalance(walletAddress) {
  try {
    const connection = new solanaWeb3.Connection(
      "https://api.mainnet-beta.solana.com",
      "confirmed"
    );

    const publicKey = new solanaWeb3.PublicKey(walletAddress);

    const lamports = await connection.getBalance(publicKey);

    const solBalance = lamports / solanaWeb3.LAMPORTS_PER_SOL;

    balanceEl.textContent = `${solBalance.toFixed(4)} SOL`;

  } catch (error) {
    console.error(error);
    balanceEl.textContent = "Balance load failed";
  }
}

async function connectWallet() {
  try {
    const provider = window.solana;

    if (!provider || !provider.isPhantom) {
      alert("Open inside Phantom browser");
      return;
    }

    const response = await provider.connect();

    const walletAddress = response.publicKey.toString();

    walletInfo.style.display = "block";

    addressEl.textContent =
      walletAddress.slice(0, 8) +
      "..." +
      walletAddress.slice(-8);

    connectButton.textContent = "Connected";

    balanceEl.textContent = "Loading balance...";

    await fetchBalance(walletAddress);

  } catch (err) {
    console.error(err);
    balanceEl.textContent = "Connection error";
  }
}

connectButton.addEventListener("click", connectWallet);