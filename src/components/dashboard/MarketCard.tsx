// src/components/dashboard/MarketCard.tsx
import React from 'react';
import Link from 'next/link';

interface MarketCardProps {
  id: string; // This will be the Pubkey as string
  title: string;
  yesOdds: number;
  noOdds: number;
  volume: string;
  category: string;
}

export const MarketCard: React.FC<MarketCardProps> = ({ id, title, yesOdds, noOdds, volume, category }) => {
  return (
    <Link href={`/market/${id}`}>
      <div className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-[#0070f3]/40 transition-all cursor-pointer group">
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
          <div className="flex flex-col items-center justify-center py-3 bg-[#0070f3]/10 border border-[#0070f3]/30 rounded-lg group-hover:bg-[#0070f3]/20 transition-all">
            <span className="text-xs text-[#0070f3] uppercase font-black">Yes</span>
            <span className="text-xl font-bold text-white">{(yesOdds * 100).toFixed(0)}%</span>
          </div>
          <div className="flex flex-col items-center justify-center py-3 bg-red-500/10 border border-red-500/30 rounded-lg group-hover:bg-red-500/20 transition-all">
            <span className="text-xs text-red-500 uppercase font-black">No</span>
            <span className="text-xl font-bold text-white">{(noOdds * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
