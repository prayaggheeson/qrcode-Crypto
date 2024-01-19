"use client";
import SparklesPreview from "./components/Herosection";
import Web3TokenTransfer from "./components/Qrcode";
import GoogleGeminiEffectDemo from "./components/heroGEMINI";
import WavyBackgroundDemo from "./components/WavyBackground";
import BackgroundBeamsDemo from "./components/heroBeams";
import ThreeDCardDemo from "./components/Cards";

import HeroParallaxDemo from "./components/heroParallex";
import TracingBeamDemo from "./components/herobeam";
export default function Home() {
  return (
    <div className="bg-white">
      <GoogleGeminiEffectDemo />
      <br />
      <br />
      <SparklesPreview />
      <br />
      <br />
      <WavyBackgroundDemo />
      <br />
      <br />
      <BackgroundBeamsDemo />
      <br />
      {/* <br />
      <ThreeDCardDemo /> */}
      <br />
      <br />
      <HeroParallaxDemo />
      <br />
      <br />
      <TracingBeamDemo />
      <Web3TokenTransfer />
    </div>
  );
}
