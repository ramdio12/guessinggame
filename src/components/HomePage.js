import { useState, useEffect } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk, { waitForConfirmation } from 'algosdk';
import { Routes, Route, Link } from 'react-router-dom';
import GamePage from "./GamePage";

const peraWallet = new PeraWalletConnect();

// The app ID on testnet
const appIndex = 210026084;

// connect to the algorand node
const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', 443);


export default function HomePage() {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="home-page">
      <meta name="name" content="Guessing Game App" />

      <div className="home-page-option">
        <div className="title">
          <h1>
            Number Guessing Game
          </h1>
          <h3>Decentralized Version</h3>
        </div>
        <button
          onClick={
            isConnectedToPeraWallet
              ? handleDisconnectWalletClick
              : handleConnectWalletClick
          }
          className="wallet-connect"
        >
          {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
        </button>
        {isConnectedToPeraWallet ? (
          <nav>
            <Link to="/game-page" className="btn-start">Start Guessing Now</Link>
          </nav>

        ) : null}
      </div>

    </div>
  );

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress(null);
  }
}
