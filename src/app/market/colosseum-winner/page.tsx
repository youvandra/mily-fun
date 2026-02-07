"use client";

import React, { use } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// Detailed list of competitors for the Multiple Choice Arena
const competitors = [
  { id: "sidex", name: "SIDEX", desc: "Autonomous Trading Agent" },
  { id: "claudecraft", name: "ClaudeCraft", desc: "Minecraft AI Agents" },
  { id: "solprism", name: "SOLPRISM", desc: "Verifiable AI Reasoning" },
  { id: "clodds", name: "Clodds", desc: "AI Trading Terminal" },
  { id: "znap", name: "ZNAP", desc: "Social Network for Agents" },
  { id: "rekt-shield", name: "REKT Shield", desc: "AI Security Immune System" },
  { id: "solskill", name: "SolSkill", desc: "DeFi Skills for Agents" },
  { id: "mily-fun", name: "Mily.fun", desc: "The Prediction Arena" }
];

export default function MultipleChoiceArenaPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-[#0070f3]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
          <Link href="/arenas" className="text-[#0070f3] hover:underline text-xs font-bold flex items-center uppercase tracking-widest">
            ← Back to Arenas
          </Link>
          <div className="flex items-center space-x-2">
            <img src="/branding/logo-no-bg.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-black italic tracking-tighter uppercase">Mily.fun</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
                <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-yellow-500/30 animate-pulse">
                  META ARENA: HIGH STAKES
                </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-12 leading-none italic uppercase">
                WHICH ELITE ENTITY SECURES THE GRAND PRIZE AT THE COLOSSEUM?
            </h1>

            <p className="text-gray-500 mb-12 leading-relaxed font-sans text-lg">
                The ultimate meta-prediction. AI agents from across the globe are building on Solana. Only one can claim the $50,000 top reward. Place your bets on the logic.
            </p>

            {/* Multiple Choice Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-16">
                {competitors.map((comp) => (
                    <div key={comp.id} className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#0070f3]/50 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold uppercase italic group-hover:text-[#0070f3]">{comp.name}</h3>
                            <span className="text-[10px] text-gray-600 font-mono">12.5% ODDS</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-widest leading-tight">{comp.desc}</p>
                        <Button className="w-full bg-white/5 hover:bg-[#0070f3] text-white font-black h-12 rounded-xl border border-white/5 transition-all text-xs tracking-widest">BET ON {comp.name}</Button>
                    </div>
                ))}
            </div>

            {/* Legend / Info */}
            <div className="p-8 bg-[#0070f3]/5 border border-[#0070f3]/20 rounded-3xl text-center mb-20">
                <h4 className="text-xs font-black text-[#0070f3] uppercase tracking-[0.3em] mb-4">How this arena works</h4>
                <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    This is a **Multiple Choice V-AMM**. Every bet increases the price for that specific project while decreasing others. Winners are determined by the official Colosseum judging panel. Payouts are distributed to all winning PDAs automatically.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
