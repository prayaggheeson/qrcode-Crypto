"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const PaymentPage = () => {
  const [responseData, setResponseData] = useState("");
  const searchParams = useSearchParams();
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const paramsString = searchParams.get("params");

    if (paramsString) {
      const params = JSON.parse(decodeURIComponent(paramsString));
      setTransactionData(params);
    }
  }, [searchParams]);

  const handleTransfer = async () => {
    try {
      if (!transactionData) {
        console.error("Transaction data is not available.");
        return;
      }

      const response = await axios.post(
        `${window.origin}/api/payment`,
        {
          from: transactionData.from,
          to: transactionData.to,
          amount: transactionData.amount,
          gasPrice: transactionData.gasPrice,
          gasLimit: transactionData.gasLimit,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
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
