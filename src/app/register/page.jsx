"use client";
import React, { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [walletAddress, setWalletAddress] = useState("No Wallet");
  const [referralCode, setReferralCode] = useState("");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let selectedAccount = null;

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
        selectedAccount = accounts[0];
      }

      // Now you can use selectedAccount directly in the API call
      const { data } = await axios.post("/api/register", {
        walletAddress: selectedAccount,
        referralCode,
      });

      setApiData(data);
      setWalletAddress("");
      setReferralCode("");
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        console.error("Error", error.message);
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
      setWalletAddress("");
      setReferralCode("");
    }
  };

  return (
    <div className="bg-slate-400 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white p-8 rounded-lg">
        <h1 className="text-4xl text-center mb-8">User Registration </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Wallet Address"
            value={walletAddress}
            disabled
          />
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Referral Code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <button className="w-full  bg-blue-500 p-4 rounded-lg text-white">
            {loading ? "Registering user..." : "Register"}
          </button>
        </form>
        {apiData && <p>{apiData.message}</p>}
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default Page;
