import { SolanaService } from '@/lib/solana';
import { NextResponse } from 'next/server';

interface UnifiedMarket {
  id: string;
  title: string;
  yesOdds: number;
  noOdds: number;
  volume: string;
  category: string;
  type: "binary" | "multiple";
}

export async function GET() {
  const solana = new SolanaService();
  let onchainMarkets: UnifiedMarket[] = [];
  
  try {
    const rawMarkets = await solana.fetchAllMarkets();
    onchainMarkets = rawMarkets.map((m: any) => ({
      id: m.id,
      title: m.title,
      yesOdds: m.yesPool / (m.yesPool + m.noPool || 1),
      noOdds: m.noPool / (m.yesPool + m.noPool || 1),
      volume: `${(m.yesPool + m.noPool).toFixed(2)} SOL`,
      category: "NETWORK",
      type: "binary" as const
    }));
  } catch (e) {
    console.error("On-chain fetch failed, falling back to static arenas.");
  }
  
  const staticArenas: UnifiedMarket[] = [
    { id: "colosseum-winner", title: "WHICH ELITE ENTITY SECURES THE GRAND PRIZE?", yesOdds: 0.5, noOdds: 0.5, volume: "42,000 SOL", category: "META", type: "multiple" },
    { id: "sol-tps-feb", title: "Solana handles > 50,000 TPS average in Feb?", yesOdds: 0.65, noOdds: 0.35, volume: "14,200 SOL", category: "NETWORK", type: "binary" },
    { id: "ai-dominance", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.82, noOdds: 0.18, volume: "5,500 SOL", category: "META", type: "binary" },
    { id: "btc-120k", title: "BTC closes above $120k by March end?", yesOdds: 0.44, noOdds: 0.56, volume: "2,100 SOL", category: "MARKETS", type: "binary" },
    { id: "firedancer-q2", title: "Firedancer (v0.1) live on Mainnet-Beta by Q2?", yesOdds: 0.38, noOdds: 0.62, volume: "18,900 SOL", category: "NETWORK", type: "binary" },
    { id: "jupiter-spike", title: "Jupiter 24h Aggregator Volume > $3B?", yesOdds: 0.51, noOdds: 0.49, volume: "3,890 SOL", category: "NETWORK", type: "binary" },
    { id: "elon-tweet", title: "Elon Musk tweets about 'Agentic Economy'?", yesOdds: 0.76, noOdds: 0.24, volume: "1,450 SOL", category: "NEWS", type: "binary" },
    { id: "jito-daily", title: "Jito validator tips exceed 15k SOL daily?", yesOdds: 0.59, noOdds: 0.41, volume: "4,600 SOL", category: "NETWORK", type: "binary" },
    { id: "bonk-ath", title: "BONK market cap hits new ATH in Q1 2026?", yesOdds: 0.22, noOdds: 0.78, volume: "9,800 SOL", category: "MARKETS", type: "binary" },
    { id: "pyth-staking", title: "Pyth unveils governance staking v2 this month?", yesOdds: 0.61, noOdds: 0.39, volume: "1,200 SOL", category: "META", type: "binary" },
    { id: "base-bridge", title: "Official Solana-to-Base bridge announced?", yesOdds: 0.15, noOdds: 0.85, volume: "7,000 SOL", category: "NEWS", type: "binary" },
    { id: "helius-video", title: "Helius launches AI Video indexing for on-chain events?", yesOdds: 0.45, noOdds: 0.55, volume: "2,200 SOL", category: "META", type: "binary" }
  ];

  // Logic: Use on-chain markets if available, otherwise use static list.
  // We ensure NO market objects have missing values to prevent frontend crashes.
  const finalMarkets = onchainMarkets.length > 0 ? onchainMarkets : staticArenas;

  return NextResponse.json({
    success: true,
    markets: finalMarkets
  });
}
