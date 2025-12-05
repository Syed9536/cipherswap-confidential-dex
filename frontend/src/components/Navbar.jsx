"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="text-xl font-semibold text-white tracking-wide">
        CipherSwap
      </div>

      <div className="flex items-center gap-4">
        <ConnectButton chainStatus="icon" showBalance={false} />
        <Menu className="w-6 h-6 text-white" />
      </div>
    </nav>
  );
}
