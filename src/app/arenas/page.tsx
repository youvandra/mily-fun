"use client";

import { useEffect, useState } from "react";
import { MarketCard } from "@/components/dashboard/MarketCard";
import Link from 'next/link';

const categories = ["ALL", "NETWORK", "META", "MARKETS", "NEWS"];

interface Market {
  id: string;
  title: string;
  yesOdds?: number;
  noOdds?: number;
  volume: string;
  category: string;
  type?: "binary" | "multiple";
}

export default function ArenaExplorerPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArenas() {
      try {
        const res = await fetch('/api/markets');
        const json = await res.json();
        if (json.success) {
          setMarkets(json.markets);
        }
      } catch (e) {
        console.error("Arenas fetch loop failed:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchArenas();
  }, []);

  const filteredMarkets = activeTab === "ALL" 
    ? markets 
    : markets.filter(m => m.category.toUpperCase() === activeTab);

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
           {loading ? (
              [1,2,3,4,5,6].map(i => (
                <div key={i} className="h-64 bg-white/5 animate-pulse rounded-3xl border border-white/5"></div>
              ))
           ) : filteredMarkets.length > 0 ? (
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
