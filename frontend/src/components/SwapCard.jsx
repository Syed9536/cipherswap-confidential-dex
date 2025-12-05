"use client";

import { useState } from "react";

const TOKENS = [
  { symbol: "pUSDC", name: "Private USDC" },
  { symbol: "pETH", name: "Private Ether" },
];

export default function SwapCard() {
  const [fromToken, setFromToken] = useState(TOKENS[0].symbol);
  const [toToken, setToToken] = useState(TOKENS[1].symbol);
  const [amount, setAmount] = useState("");

  const handleSwapClick = () => {
    alert(
      `Demo only – next phase me isko fhEVM contract se connect karenge.\n\nFrom: ${fromToken}\nTo: ${toToken}\nAmount: ${
        amount || "0"
      }`
    );
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_60px_rgba(16,185,129,0.15)] px-6 py-5 md:px-8 md:py-7">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium tracking-tight">Swap</h2>
          <p className="text-xs text-slate-400">
            Encrypted amounts, transparent prices.
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wide text-emerald-300 border border-emerald-500/30">
          fhEVM Demo
        </span>
      </div>

      <div className="space-y-3">
        {/* FROM */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              From (encrypted)
            </span>
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none"
            >
              {TOKENS.map((t) => (
                <option
                  key={t.symbol}
                  value={t.symbol}
                  className="bg-slate-900 text-slate-100"
                >
                  {t.symbol}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-xl md:text-2xl font-medium outline-none text-slate-50 placeholder-slate-600"
          />
        </div>

        {/* TO */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              To (estimated)
            </span>
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none"
            >
              {TOKENS.map((t) => (
                <option
                  key={t.symbol}
                  value={t.symbol}
                  className="bg-slate-900 text-slate-100"
                >
                  {t.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="h-7 flex items-end text-slate-500 text-sm">
            ~ encrypted output
          </div>
        </div>

        <button
          onClick={handleSwapClick}
          className="mt-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-500 py-3 text-sm font-medium tracking-wide text-slate-950 hover:brightness-110 transition shadow-[0_0_30px_rgba(16,185,129,0.4)]"
        >
          Encrypt &amp; Swap
        </button>
      </div>

      <p className="mt-3 text-[11px] text-slate-500">
        Abhi ye sirf UI demo hai. Agle phase me is button ko fhEVM smart
        contract se connect karenge taaki swap on-chain, encrypted ho.
      </p>
    </div>
  );
}
