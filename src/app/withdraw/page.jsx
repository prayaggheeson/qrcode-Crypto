"use client";
import React, { useState } from "react";
import axios from "axios";
export default function Withdraw() {
  const [formData, setFormData] = useState({
    currency: "",
    amount: "",
    walletAddress: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post("your-api-endpoint", formData);

      // Handle the response (e.g., show success message)
      console.log("Response:", response.data);

      // Optionally, reset the form after successful submission
      setFormData({
        currency: "",
        amount: "",
        walletAddress: "",
      });
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error:", error.response.data);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crypto Withdraw
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-purple-500" htmlFor="currency">
                Currency
              </label>
              <select
                id="currency"
                className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="" disabled selected>
                  Select a currency
                </option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="litecoin">Litecoin</option>
              </select>
            </div>
            <div>
              <label className="text-purple-500" htmlFor="amount">
                Amount
              </label>
              <input
                className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3"
                id="amount"
                placeholder="Enter amount"
                type="number"
              />
            </div>
            <div>
              <label className="text-purple-500" htmlFor="wallet-address">
                Wallet Address
              </label>
              <input
                className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3"
                id="wallet-address"
                placeholder="Enter wallet address"
                type="text"
              />
            </div>
          </div>
          <div>
            <button
              className="w-full bg-purple-500 hover:bg-purple-700 text-white rounded-md py-2 px-4"
              type="submit"
            >
              Withdraw
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Transaction History
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Transaction Cards */}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Account Balance
          </h3>
          <p className="mt-2 text-sm text-gray-500">Current balance: 2.5 BTC</p>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Security Information
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Please double-check the wallet address before submitting the
            withdrawal request. Cryptocurrency transactions are irreversible and
            can be risky.
          </p>
        </div>
      </div>
    </main>
  );
}
