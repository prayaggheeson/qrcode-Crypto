"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Web3 from "web3";
import QRCode from "qrcode.react";

const Web3TokenTransfer = () => {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [tokenAmount, setTokenAmount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);

  const checkMetaMaskInstalled = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId !== "0x61") {
          throw new Error(
            "Please switch to Binance Smart Chain Testnet (BNB) network."
          );
        }

        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];
        setConnectedWallet({ web3, selectedAccount });
        toast.success("Wallet connected successfully!");
      }
    } catch (error) {
      if (error.code === 4001) {
        toast.error("Wallet connection request cancelled by the user.");
      } else {
        toast.error(`Error connecting wallet: ${error.message}`);
      }
    }
  };

  const connectWallet = async () => {
    await checkMetaMaskInstalled();
  };

  const generateQRCodeData = () => {
    const { selectedAccount } = connectedWallet;

    return {
      from: selectedAccount,
      to: receiverAddress,
      amount: Number(tokenAmount),
    };
  };

  const generateQRCodeUrl = (data) => {
    const baseUrl = `${window.origin}/payment`;
    const queryString = Object.entries(data)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return `${baseUrl}?${queryString}`;
  };

  const transferTokens = async () => {
    try {
      if (!connectedWallet) {
        throw new Error("Please connect your wallet first.");
      }

      const qrCodeData = generateQRCodeData();
      const qrCodeUrl = generateQRCodeUrl(qrCodeData);

      setQrCodeData(qrCodeUrl);
      setTokenAmount("");
      setReceiverAddress("");
    } catch (error) {
      toast.error(`Error transferring tokens: ${error.message}`);
      console.error("Error transferring tokens:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={transferTokens}
        >
          Transfer Tokens
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Token Amount:</label>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Receiver Address:</label>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
      </div>

      {qrCodeData && (
        <div className="mb-4">
          <label className="block text-gray-700">QR Code:</label>
          <QRCode value={qrCodeData} />
        </div>
      )}
    </div>
  );
};

export default Web3TokenTransfer;
