"use client";
import { useState } from "react";
import Web3TokenTransfer from "./components/Qrcode";
import axios from "axios";

export default function Home() {
  const [apiData, setApiData] = useState(null);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/register", {
        headers: {
          walletAddress: "Admin",
        },
      });
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div className="mx-auto max-w-lg mt-20">
      <h1 className="text-center text-4xl font-semibold mb-6">
        QR Code Generator
      </h1>
      <Web3TokenTransfer />
      <div className="flex flex-col items-center">
        <button
          onClick={getData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 focus:outline-none"
        >
          Get Users
        </button>
        {apiData && (
          <div className="mt-6">
            <p className="mb-2">Wallet Address: {apiData.walletAddress}</p>
            <p className="mb-2">Referral Code: {apiData.referralCode}</p>
            <p className="mb-2">Referral Count: {apiData.referralCount}</p>
            <p className="mb-2">Referral Income: {apiData.referralIncome}</p>
          </div>
        )}
      </div>
    </div>
  );
}
