import Web3TokenTransfer from "./components/Qrcode";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-4xl font-semibold mt-20">
        QR Code Generator
      </h1>
      <Web3TokenTransfer />
    </>
  );
}
