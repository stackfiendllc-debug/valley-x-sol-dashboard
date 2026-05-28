const connectButton = document.getElementById("connect");
const walletInfo = document.getElementById("walletInfo");
const addressEl = document.getElementById("address");
const balanceEl = document.getElementById("balance");

async function fetchBalance(walletAddress) {
  try {
    balanceEl.textContent = "Loading...";

    const response = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [walletAddress]
      })
    });

    const data = await response.json();

    if (data.result && data.result.value !== undefined) {
      const sol = data.result.value / 1000000000;
      balanceEl.textContent = `${sol.toFixed(4)} SOL`;
    } else {
      balanceEl.textContent = "0.0000 SOL";
    }

  } catch (error) {
    console.error(error);
    balanceEl.textContent = "RPC Error";
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