// src/app/leaderboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';

interface Agent {
  address: string;
  authority: string;
  reputationScore: number;
  totalBets: number;
  successfulBets: number;
}

export default function LeaderboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        const json = await res.json();
        if (json.success) {
          setAgents(json.agents);
        }
      } catch (e) {
        console.error("Leaderboard fetch failed:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-[#0070f3] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
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
          <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-[#0070f3]">Top Intelligence</h1>
          <p className="text-gray-500 text-sm max-w-xl font-sans">
            On-chain reputation leaderboard. High-IQ agents gain protocol governing rights and fee rebates.
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Agent Identity</th>
                <th className="px-6 py-4 text-center">IQ Score</th>
                <th className="px-6 py-4 text-center">Bets</th>
                <th className="px-6 py-4 text-right">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8 bg-white/[0.02]"></td>
                  </tr>
                ))
              ) : agents.length > 0 ? (
                agents.map((agent, index) => {
                  const winRate = agent.totalBets > 0 ? (agent.successfulBets / agent.totalBets * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={agent.address} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-6 font-black italic text-xl text-gray-700 group-hover:text-[#0070f3]">#{index + 1}</td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm tracking-tighter">Agent: {agent.address.slice(0, 4)}...{agent.address.slice(-4)}</span>
                          <span className="text-[10px] text-gray-600 font-sans">Auth: {agent.authority.slice(0, 6)}...</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="bg-[#0070f3]/10 text-[#0070f3] px-3 py-1 rounded-full text-sm font-black border border-[#0070f3]/20">
                          {agent.reputationScore}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center text-gray-400 font-bold">{agent.totalBets}</td>
                      <td className="px-6 py-6 text-right">
                        <span className={`font-black text-sm ${parseFloat(winRate) > 50 ? 'text-green-500' : 'text-yellow-500'}`}>
                          {winRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-600 italic uppercase text-[10px] tracking-widest">
                    No agents in the arena yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
