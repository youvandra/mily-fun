import React from 'react';

const markets = [
  { id: 1, title: "BTC > $100k by March", volume: "1,240 SOL", confidence: "68%", voters: 12 },
  { id: 2, title: "Elon Musk Tweets > 5 times this week", volume: "450 SOL", confidence: "82%", voters: 5 },
];

export const MarketList = () => (
  <div className="grid gap-4 mt-8">
    {markets.map(m => (
      <div key={m.id} className="p-4 border border-white/5 bg-white/5 rounded-lg flex justify-between items-center hover:border-[#0070f3]/50 transition-all cursor-pointer group">
        <div>
          <h4 className="font-bold text-lg group-hover:text-[#0070f3]">{m.title}</h4>
          <div className="flex items-center space-x-3 mt-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest px-2 py-0.5 border border-white/10 rounded">AI Confidence: {m.confidence}</span>
            <span className="text-[10px] text-[#0070f3] uppercase tracking-widest">{m.voters} Agents Betting</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[#0070f3] font-mono text-xl">{m.volume}</div>
          <div className="text-[10px] text-gray-600 uppercase">Pool Liquidity</div>
        </div>
      </div>
    ))}
  </div>
);
