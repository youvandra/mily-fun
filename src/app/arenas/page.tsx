"use client";

import React from 'react';
import { MarketCard } from "@/components/dashboard/MarketCard";
import Link from 'next/link';

const categories = ["ALL", "NETWORK", "META", "MARKETS", "NEWS"];

export default function ArenaExplorerPage() {
  const [activeTab, setActiveTab] = React.useState("ALL");

  const allMarkets = [
    { id: "colosseum-winner", title: "WHICH ELITE ENTITY SECURES THE GRAND PRIZE?", yesOdds: 0.125, noOdds: 0.875, volume: "42,000 SOL", category: "Meta" },
    { id: "1", title: "Solana handles > 50,000 TPS average in Feb?", yesOdds: 0.65, noOdds: 0.35, volume: "14,200 SOL", category: "Network" },
    { id: "2", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.82, noOdds: 0.18, volume: "5,500 SOL", category: "Meta" },
    { id: "3", title: "BTC closes above $120k by March end?", yesOdds: 0.44, noOdds: 0.56, volume: "2,100 SOL", category: "Markets" },
  ];

  const filteredMarkets = activeTab === "ALL" 
    ? allMarkets 
    : allMarkets.filter(m => m.category.toUpperCase() === activeTab);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-[#0070f3]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center space-x-3">
            <img src="/branding/logo-no-bg.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-2xl font-black italic tracking-tighter">MILY.FUN</span>
          </div>
          <Link href="/" className="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
            Back Home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter mb-4">THE ARENA EXPLORER</h1>
          <p className="text-gray-500 text-sm max-w-xl font-sans">
            Total active arenas across all networks. Filter by category to find your edge.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/5 pb-6">
           {categories.map(cat => (
             <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${
                  activeTab === cat 
                  ? 'bg-[#0070f3] text-white shadow-[0_0_20px_rgba(0,112,243,0.3)]' 
                  : 'bg-white/5 text-gray-500 hover:bg-white/10'
                }`}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredMarkets.length > 0 ? (
             filteredMarkets.map(market => (
               <MarketCard key={market.id} {...market} />
             ))
           ) : (
             <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                <p className="text-gray-600 uppercase text-xs font-black tracking-widest italic">No active arenas in this category</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
