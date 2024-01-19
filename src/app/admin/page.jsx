"use client";
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const [apiData, setApiData] = useState(null);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/getdata");
      setApiData(data.getData);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="text-2xl font-semibold mb-6">Admin Page</h1>
      <div className="flex flex-col items-center">
        <button
          onClick={getData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Get Users
        </button>
        {apiData && (
          <div className="mt-6">
            {apiData.map((user) => (
              <div key={user._id} className="bg-white p-4 rounded shadow mb-4">
                <p className="mb-2">Wallet Address: {user.walletAddress}</p>
                <p className="mb-2">Referral Code: {user.referralCode}</p>
                <p className="mb-2">Referral Count: {user.referralCount}</p>
                <p className="mb-2">Referral Income: {user.referralIncome}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
