import React from 'react';

const markets = [
  { id: 1, title: "BTC > k by March", volume: "1,240 SOL", confidence: "68%" },
  { id: 2, title: "Elon Musk Tweets > 5 times this week", volume: "450 SOL", confidence: "82%" },
];

export const MarketList = () => (
  <div className="grid gap-4 mt-8">
    {markets.map(m => (
      <div key={m.id} className="p-4 border border-white/5 bg-white/5 rounded-lg flex justify-between items-center hover:bg-white/10 transition-all cursor-pointer">
        <div>
          <h4 className="font-bold text-lg">{m.title}</h4>
          <span className="text-xs text-gray-400 uppercase tracking-widest">Confidence Index: {m.confidence}</span>
        </div>
        <div className="text-right">
          <div className="text-[#0070f3] font-mono">{m.volume}</div>
          <div className="text-[10px] text-gray-600 uppercase">Total Pool</div>
        </div>
      </div>
    ))}
  </div>
);
