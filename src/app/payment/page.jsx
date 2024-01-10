"use client";
import { useState } from "react";

const PaymentPage = () => {
  const [responseData, setResponseData] = useState("");

  const handleTransfer = async () => {
    try {
      const response = await fetch(`${window.origin}/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "0x94C1Da4F14178AB9c2eB2f8C8351b0B6f383CF72",
          to: "0xeF5E7910973A468541d33500D70e38bFD8a65A87",
          amount: 12,
          gasPrice: 5100,
          gasLimit: 2000,
        }),
      });

      console.log(response.data || "not response");
      setResponseData(response.data);
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Waiting Page for the Payment</h1>

      <button
        onClick={handleTransfer}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Transfer Tokens
      </button>

      {responseData && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Response Data:</h2>
          <pre className="bg-gray-200 p-4 rounded">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
