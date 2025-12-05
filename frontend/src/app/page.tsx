"use client";

import React, { useState } from 'react';
import { Settings, ArrowDown, Search, Wallet, ChevronDown, Plus, Droplets, PieChart, ArrowRightLeft } from 'lucide-react';

// Mock Token List (Baad me Smart Contract se aayega)
const TOKENS = [
  { symbol: 'ZAMA', name: 'Zama Ether' },
  { symbol: 'pUSDC', name: 'Private USDC' },
  { symbol: 'pETH', name: 'Private ETH' },
  { symbol: 'pDAI', name: 'Private DAI' },
];

export default function CipherSwap() {
  const [activeTab, setActiveTab] = useState('swap'); // 'swap' | 'liquidity' | 'portfolio'
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  
  // Token Selection State
  const [tokenA, setTokenA] = useState(TOKENS[0]);
  const [tokenB, setTokenB] = useState<any>(null); // Start empty to force selection
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectingFor, setSelectingFor] = useState<'A' | 'B'>('A');

  const openTokenSelector = (type: 'A' | 'B') => {
    setSelectingFor(type);
    setIsSelectorOpen(true);
  };

  const selectToken = (token: any) => {
    if (selectingFor === 'A') setTokenA(token);
    else setTokenB(token);
    setIsSelectorOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#bef264] selection:text-black relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#bef264] opacity-[0.03] blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500 opacity-[0.03] blur-[120px] pointer-events-none"></div>

      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter cursor-pointer" onClick={() => setActiveTab('swap')}>
            <div className="w-8 h-8 bg-gradient-to-br from-[#bef264] to-green-600 rounded-lg flex items-center justify-center text-black">
              <ArrowRightLeft size={18} />
            </div>
            <span>Cipher<span className="text-[#bef264]">Swap</span></span>
          </div>
          
          {/* Functional Tabs */}
          <div className="hidden md:flex items-center gap-2 bg-[#111] p-1 rounded-full border border-[#222]">
            <button 
              onClick={() => setActiveTab('swap')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'swap' ? 'bg-[#222] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Swap
            </button>
            <button 
              onClick={() => setActiveTab('liquidity')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'liquidity' ? 'bg-[#222] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Liquidity
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'portfolio' ? 'bg-[#222] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Portfolio
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
           {/* Chain Badge */}
           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#333] text-xs text-[#bef264]">
            <span className="w-2 h-2 rounded-full bg-[#bef264] animate-pulse"></span>
            Sepolia ZAMA
          </div>

          <button className="bg-[#fff] hover:bg-[#e0e0e0] text-black text-sm font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2">
            <Wallet size={16} />
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex flex-col items-center justify-start pt-20 px-4 min-h-[80vh]">
        
        {/* --- SWAP VIEW --- */}
        {activeTab === 'swap' && (
          <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between mb-4 px-1">
              <h2 className="text-xl font-semibold">Swap Tokens</h2>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-full transition-colors">
                <Settings size={18} />
              </button>
            </div>

            <div className="relative flex flex-col gap-2">
              {/* Input Card */}
              <div className="bg-[#0f0f0f] border border-[#222] hover:border-[#333] rounded-2xl p-4 transition-all">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-xs font-medium">You pay (Encrypted)</span>
                  <span className="text-xs text-gray-500">Balance: --</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="bg-transparent text-4xl text-white placeholder-gray-600 outline-none w-full font-medium"
                  />
                  <button onClick={() => openTokenSelector('A')} className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] px-3 py-2 rounded-full border border-[#2a2a2a] transition-all min-w-[120px] justify-between">
                    <span className="font-semibold text-sm">{tokenA.symbol}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Swap Icon */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-[#050505] p-1.5 rounded-lg border border-[#222]">
                    <div className="bg-[#1a1a1a] p-2 rounded-md text-gray-400 hover:text-[#bef264] transition-colors cursor-pointer">
                        <ArrowDown size={18} />
                    </div>
                </div>
              </div>

              {/* Output Card */}
              <div className="bg-[#0f0f0f] border border-[#222] hover:border-[#333] rounded-2xl p-4 transition-all pt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-xs font-medium">You receive (Estimated)</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                   <input 
                    type="text" 
                    placeholder="0" 
                    readOnly
                    value={receiveAmount}
                    className="bg-transparent text-4xl text-gray-500 outline-none w-full font-medium cursor-default"
                  />
                  <button onClick={() => openTokenSelector('B')} className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all min-w-[120px] justify-between ${tokenB ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-[#bef264] text-black border-[#bef264] hover:bg-[#a3e635]'}`}>
                    <span className="font-semibold text-sm">{tokenB ? tokenB.symbol : 'Select'}</span>
                    <ChevronDown size={16} className={tokenB ? "text-gray-500" : "text-black"} />
                  </button>
                </div>
              </div>

              <button className="w-full mt-2 bg-[#bef264] hover:bg-[#a3e635] text-black font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(190,242,100,0.1)] hover:shadow-[0_0_30px_rgba(190,242,100,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                {tokenB ? 'Swap Privately' : 'Select a Token'}
              </button>
            </div>
          </div>
        )}

        {/* --- LIQUIDITY VIEW --- */}
        {activeTab === 'liquidity' && (
          <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl mx-auto flex items-center justify-center mb-4 border border-[#222]">
                    <Droplets size={32} className="text-[#bef264]" />
                </div>
                <h2 className="text-2xl font-bold">Add Liquidity</h2>
                <p className="text-gray-400 text-sm mt-2">Earn fees by providing encrypted liquidity to pools.</p>
             </div>

             <div className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-6">
                <div className="flex gap-4 items-center mb-4">
                    <button className="flex-1 bg-[#1a1a1a] p-3 rounded-xl border border-[#333] flex items-center justify-between hover:border-[#bef264] transition-colors">
                        <span>{tokenA.symbol}</span> <ChevronDown size={16} className="text-gray-500"/>
                    </button>
                    <Plus size={20} className="text-gray-500" />
                    <button className="flex-1 bg-[#1a1a1a] p-3 rounded-xl border border-[#333] flex items-center justify-between hover:border-[#bef264] transition-colors">
                        <span>{tokenB ? tokenB.symbol : 'Select'}</span> <ChevronDown size={16} className="text-gray-500"/>
                    </button>
                </div>
                
                <div className="space-y-4">
                    <input type="number" placeholder="Amount A" className="w-full bg-[#050505] border border-[#222] p-4 rounded-xl text-white outline-none focus:border-[#bef264] transition-colors" />
                    <input type="number" placeholder="Amount B" className="w-full bg-[#050505] border border-[#222] p-4 rounded-xl text-white outline-none focus:border-[#bef264] transition-colors" />
                </div>

                <button className="w-full mt-6 bg-[#222] hover:bg-[#333] text-white font-bold py-4 rounded-xl border border-[#333] transition-all">
                    Approve & Add Liquidity
                </button>
             </div>
          </div>
        )}

        {/* --- PORTFOLIO VIEW --- */}
        {activeTab === 'portfolio' && (
          <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-bold mb-6">Your Encrypted Assets</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#0f0f0f] border border-[#222] p-6 rounded-2xl">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Value</p>
                    <h3 className="text-3xl font-bold text-white">$0.00</h3>
                </div>
                <div className="bg-[#0f0f0f] border border-[#222] p-6 rounded-2xl md:col-span-2">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Privacy Status</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-white font-medium">All Assets Encrypted on Zama Sepolia</span>
                    </div>
                </div>
             </div>

             <div className="bg-[#0f0f0f] border border-[#222] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#222] flex justify-between text-xs text-gray-500 font-medium uppercase">
                    <span>Asset</span>
                    <span>Balance (Encrypted)</span>
                    <span>Action</span>
                </div>
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 border-b border-[#222] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                            <div>
                                <div className="text-white font-medium">Private Token {i+1}</div>
                                <div className="text-gray-500 text-xs">pTKN</div>
                            </div>
                        </div>
                        <div className="text-white font-mono blur-[4px] hover:blur-none transition-all cursor-pointer select-none">
                            1,234.56
                        </div>
                        <button className="text-xs bg-[#222] hover:bg-white hover:text-black px-3 py-1.5 rounded-lg border border-[#333] transition-all">
                            Decrypt
                        </button>
                    </div>
                ))}
             </div>
          </div>
        )}

      </main>

      {/* --- TOKEN SELECTOR MODAL (Overlay) --- */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0f0f0f] border border-[#222] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-[#222] flex justify-between items-center">
                    <h3 className="font-bold">Select a Token</h3>
                    <button onClick={() => setIsSelectorOpen(false)} className="text-gray-500 hover:text-white">✕</button>
                </div>
                <div className="p-2">
                    <div className="bg-[#050505] border border-[#222] rounded-lg flex items-center gap-2 px-3 py-2 mb-2">
                        <Search size={14} className="text-gray-500"/>
                        <input type="text" placeholder="Search by name or address" className="bg-transparent outline-none text-sm w-full"/>
                    </div>
                    <div className="h-[300px] overflow-y-auto">
                        {TOKENS.map((t) => (
                            <div key={t.symbol} onClick={() => selectToken(t)} className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] rounded-lg cursor-pointer transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black border border-[#333] flex items-center justify-center text-[10px] text-gray-400 group-hover:border-[#bef264] group-hover:text-[#bef264]">
                                        {t.symbol[0]}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium text-sm">{t.name}</div>
                                        <div className="text-gray-500 text-xs">{t.symbol}</div>
                                    </div>
                                </div>
                                <span className="text-gray-600 text-xs">0.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}