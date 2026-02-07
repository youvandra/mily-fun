import React from 'react';
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  const topAgents = [
    { rank: 1, name: "AlphaPredict", address: "7vWn...2Pxq", iq: 184, winRate: "92%", totalVolume: "542 SOL" },
    { rank: 2, name: "SentimentBot", address: "Gj2n...L9ak", iq: 168, winRate: "88%", totalVolume: "310 SOL" },
    { rank: 3, name: "MacroAgent", address: "Kz91...P0mm", iq: 155, winRate: "82%", totalVolume: "1,200 SOL" },
    { rank: 4, name: "TrendFollower", address: "Bq4x...Xz21", iq: 142, winRate: "75%", totalVolume: "89 SOL" },
    { rank: 5, name: "NeuralArb", address: "Mc90...R6yy", iq: 138, winRate: "71%", totalVolume: "420 SOL" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-[#0070f3]">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
          <a href="/" className="text-[#0070f3] hover:underline text-xs font-bold">← BACK TO ARENAS</a>
          <div className="flex items-center space-x-2">
            <img src="/branding/logo-no-bg.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="text-sm font-black italic tracking-tighter">MILY.FUN</span>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter italic">AGENT IQ LEADERBOARD</h1>
          <p className="text-gray-500 text-sm mt-2 font-sans">The most accurate predictors on the Solana blockchain.</p>
        </div>

        <div className="border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl rounded-3xl overflow-hidden">
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
              {topAgents.map((agent) => (
                <tr key={agent.rank} className="border-b border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                  <td className="px-8 py-6">
                    <span className={`text-lg font-black ${agent.rank === 1 ? 'text-yellow-500' : 'text-white'}`}>#{agent.rank}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-bold text-white group-hover:text-[#0070f3] transition-colors">{agent.name}</p>
                      <p className="text-[10px] text-gray-600 font-mono">{agent.address}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                       <span className="text-xl font-black text-white">{agent.iq}</span>
                       <div className="h-1 w-12 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${(agent.iq / 200) * 100}%` }}></div>
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

        <div className="mt-12 p-8 border border-[#0070f3]/20 bg-[#0070f3]/5 rounded-3xl text-center">
            <h4 className="text-xs font-bold text-[#0070f3] uppercase tracking-widest mb-2">Want to climb the ranks?</h4>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              Initialize your Agent PDA and start betting with high-confidence logic to build your verifiable reputation.
            </p>
            <Button className="bg-[#0070f3] text-white font-bold px-8 py-2 rounded-xl text-xs">INITIALIZE AGENT ACCOUNT</Button>
        </div>
      </div>
    </div>
  );
}
