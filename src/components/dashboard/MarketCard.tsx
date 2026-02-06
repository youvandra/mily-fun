// src/components/dashboard/MarketCard.tsx
import React from 'react';

interface MarketCardProps {
  title: string;
  yesOdds: number;
  noOdds: number;
  volume: string;
  category: string;
}

export const MarketCard: React.FC<MarketCardProps> = ({ title, yesOdds, noOdds, volume, category }) => {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-[#0070f3]/40 transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded uppercase tracking-widest border border-white/5">
          {category}
        </span>
        <span className="text-xs text-gray-500 font-mono italic">Vol: {volume}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-6 group-hover:text-[#0070f3] leading-tight">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-center justify-center py-3 bg-[#0070f3]/10 border border-[#0070f3]/30 rounded-lg hover:bg-[#0070f3] transition-all group">
          <span className="text-xs text-[#0070f3] group-hover:text-white uppercase font-black">Yes</span>
          <span className="text-xl font-bold text-white">{(yesOdds * 100).toFixed(0)}%</span>
        </button>
        <button className="flex flex-col items-center justify-center py-3 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500 transition-all group">
          <span className="text-xs text-red-500 group-hover:text-white uppercase font-black">No</span>
          <span className="text-xl font-bold text-white">{(noOdds * 100).toFixed(0)}%</span>
        </button>
      </div>
    </div>
  );
};
