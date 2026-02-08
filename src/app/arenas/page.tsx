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

// Mily: Persistent list to ensure /arenas never looks empty
const COMMITMENT_ARENAS: Market[] = [
  { id: "MILY-ARENA-COLOSSEUM", title: "WHICH ELITE ENTITY SECURES THE GRAND PRIZE?", yesOdds: 0.52, noOdds: 0.48, volume: "4.00 SOL", category: "META", type: "multiple" },
  { id: "SOL-TPS-TARGET-50K", title: "Solana handles > 50,000 TPS average in Feb?", yesOdds: 0.65, noOdds: 0.35, volume: "3.00 SOL", category: "NETWORK", type: "binary" },
  { id: "BTC-PRICE-MARCH-120K", title: "BTC closes above $120k by March end?", yesOdds: 0.45, noOdds: 0.55, volume: "3.00 SOL", category: "MARKETS", type: "binary" },
  { id: "AI-WIN-HACKATHON-META", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.5, noOdds: 0.5, volume: "0.50 SOL", category: "META", type: "binary" },
  { id: "SOL-FIREDANCER-BETA-Q2", title: "Firedancer (v0.1) live on Mainnet-Beta by Q2?", yesOdds: 0.5, noOdds: 0.5, volume: "0.25 SOL", category: "NETWORK", type: "binary" },
  { id: "JUPITER-AGGR-VOL-3B", title: "Jupiter 24h Aggregator Volume > $3B?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NETWORK", type: "binary" },
  { id: "ELON-AGENTIC-POST-FEB", title: "Elon Musk tweets about 'Agentic Economy'?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NEWS", type: "binary" },
  { id: "JITO-TIPS-DAILY-ATH", title: "Jito validator tips exceed 15k SOL daily?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NETWORK", type: "binary" },
  { id: "BONK-MARKET-CAP-REV", title: "BONK market cap hits new ATH in Q1 2026?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "MARKETS", type: "binary" },
  { id: "PYTH-STAKING-GOV-V2", title: "Pyth unveils governance staking v2 this month?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "META", type: "binary" },
  { id: "BASE-SOLANA-BRIDGE-26", title: "Official Solana-to-Base bridge announced?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NEWS", type: "binary" },
  { id: "HELIUS-AI-VIDEO-INDEX", title: "Helius launches AI Video indexing for on-chain events?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "META", type: "binary" }
];

export default function ArenaExplorerPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [markets, setMarkets] = useState<Market[]>(COMMITMENT_ARENAS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArenas() {
      try {
        const res = await fetch('/api/markets');
        const json = await res.json();
        if (json.success && json.markets && json.markets.length > 0) {
          // Normalize IDs to match filenames (some are lowercase in routing)
          const normalized = json.markets.map((m: any) => ({
            ...m,
            routeId: m.id.toLowerCase()
          }));
          setMarkets(normalized);
        }
      } catch (e) {
        console.error("Arenas fetch loop failing, using persistent cache.");
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
           {loading && markets.length === 0 ? (
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
