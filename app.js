const connectButton = document.getElementById("connect");
const walletInfo = document.getElementById("walletInfo");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

const RPC_URL = "https://solana-mainnet.g.alchemy.com/v2/demo";

async function fetchBalance(walletAddress) {
  try {
    balanceEl.textContent = "Loading...";

    const connection = new solanaWeb3.Connection(
      RPC_URL,
      "confirmed"
    );

    const publicKey = new solanaWeb3.PublicKey(walletAddress);

    const lamports = await connection.getBalance(publicKey);

    const sol = lamports / solanaWeb3.LAMPORTS_PER_SOL;

    balanceEl.textContent = `${sol.toFixed(4)} SOL`;

  } catch (error) {
    console.error(error);
    balanceEl.textContent = "0.0000 SOL";
  }
}

async function connectWallet() {
  try {
    const provider = window.solana;

    if (!provider?.isPhantom) {
      alert("Open inside Phantom browser");
      return;
    }

    const response = await provider.connect();

    const walletAddress = response.publicKey.toString();

    walletInfo.style.display = "block";

    addressEl.textContent =
      walletAddress.slice(0, 6) +
      "..." +
      walletAddress.slice(-4);

    connectButton.textContent = "Connected";

    await fetchBalance(walletAddress);

  } catch (err) {
    console.error(err);
    balanceEl.textContent = "Connection failed";
  }
}

connectButton.addEventListener("click", connectWallet);