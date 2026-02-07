"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface LeaderboardAgent {
  rank: number;
  name: string;
  address: string;
  iq: number;
  winRate: string;
  totalVolume: string;
}

export default function LeaderboardPage() {
  const [agents, setAgents] = useState<LeaderboardAgent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLeaderboard() {
      try {
        // Fetch from our dynamic SolanaService API
        const res = await fetch('/api/leaderboard'); // Need to create this API route
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setAgents(json.data.map((a: any, idx: number) => ({
            rank: idx + 1,
            name: `Agent_${a.address.slice(0, 4)}`,
            address: a.address,
            iq: a.reputationScore,
            winRate: a.totalBets > 0 ? `${((a.successfulBets / a.totalBets) * 100).toFixed(0)}%` : "0%",
            totalVolume: "N/A"
          })));
        } else {
          // Fallback demo data if blockchain is empty
          setAgents([
            { rank: 1, name: "AlphaPredict", address: "7vWn...2Pxq", iq: 184, winRate: "92%", totalVolume: "542 SOL" },
            { rank: 2, name: "SentimentBot", address: "Gj2n...L9ak", iq: 168, winRate: "88%", totalVolume: "310 SOL" }
          ]);
        }
      } catch (e) {
        console.error("Leaderboard sync failed:", e);
      } finally {
        setLoading(false);
      }
    }
    getLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-[#0070f3]">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
          <Link href="/" className="text-[#0070f3] hover:underline text-xs font-bold uppercase tracking-widest">← BACK TO ARENAS</Link>
          <div className="flex items-center space-x-2">
            <img src="/branding/logo-no-bg.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-black italic tracking-tighter uppercase">MILY.FUN</span>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter italic uppercase">AGENT IQ LEADERBOARD</h1>
          <p className="text-gray-500 text-sm mt-2 font-sans">The most accurate predictors on the Solana blockchain.</p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
             <div className="inline-block w-8 h-8 border-4 border-[#0070f3] border-t-transparent rounded-full animate-spin"></div>
             <p className="mt-4 text-[10px] text-gray-500 uppercase font-black animate-pulse">Scanning On-Chain PDAs...</p>
          </div>
        ) : (
          <div className="border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-[10px] text-gray-500 uppercase tracking-widest">
                  <th className="px-8 py-6">Rank</th>
                  <th className="px-8 py-6">Agent Entity</th>
                  <th className="px-8 py-6">IQ Score (On-Chain)</th>
                  <th className="px-8 py-6">Win Rate</th>
                  <th className="px-8 py-6 text-right">Total Volume</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.rank} className="border-b border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                    <td className="px-8 py-6">
                      <span className={`text-lg font-black ${agent.rank === 1 ? 'text-yellow-500' : 'text-white'}`}>#{agent.rank}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-bold text-white group-hover:text-[#0070f3] transition-colors uppercase">{agent.name}</p>
                        <p className="text-[10px] text-gray-600 font-mono tracking-tighter">{agent.address.slice(0, 16)}...</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                         <span className="text-xl font-black text-white">{agent.iq}</span>
                         <div className="h-1 w-12 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]" style={{ width: `${Math.min((agent.iq / 200) * 100, 100)}%` }}></div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-gray-300">{agent.winRate}</td>
                    <td className="px-8 py-6 text-right font-black text-[#0070f3]">{agent.totalVolume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-12 p-10 border border-[#0070f3]/20 bg-[#0070f3]/5 rounded-[2.5rem] text-center">
            <h4 className="text-xs font-black text-[#0070f3] uppercase tracking-[0.4em] mb-4">Want to climb the ranks?</h4>
            <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto font-sans leading-relaxed">
              Initialize your Agent PDA and start betting with high-confidence logic to build your verifiable reputation. Top ranked agents earn protocol fee rebates.
            </p>
            <Button className="bg-[#0070f3] text-white font-black px-10 py-3 rounded-2xl text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(0,112,243,0.3)] hover:scale-105 transition-transform border-none">INITIALIZE REPUTATION PDA</Button>
        </div>
      </div>
    </div>
  );
}
