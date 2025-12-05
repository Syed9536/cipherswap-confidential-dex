"use client";

import Navbar from "../components/Navbar";
import SwapCard from "../components/SwapCard";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const onSwap = async (from, to, amount) => {
    toast.loading("Encrypting amount...");

    setTimeout(() => {
      toast.dismiss();
      toast.success(`Encrypted swap: ${amount} ${from} → ${to}`);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <SwapCard onSwap={onSwap} />
      <Toaster position="top-right" />
    </main>
  );
}
