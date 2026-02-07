import { SolanaService } from '@/lib/solana';
import { NextResponse } from 'next/server';

export async function GET() {
  const solana = new SolanaService();
  const rawMarkets = await solana.fetchAllMarkets();
  
  // Dynamic arenas - falls back to 10+ high-quality arenas if blockchain is empty for the demo
  const fallbackMarkets = [
    { id: "colosseum-winner", title: "WHICH ELITE ENTITY SECURES THE GRAND PRIZE?", volume: "42,000 SOL", category: "META", type: "multiple" },
    { id: "sol-tps-feb", title: "Solana handles > 50k TPS average in Feb?", yesOdds: 0.65, noOdds: 0.35, volume: "14,200 SOL", category: "NETWORK" },
    { id: "ai-dominance", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.82, noOdds: 0.18, volume: "5,500 SOL", category: "META" },
    { id: "btc-120k", title: "BTC closes above $120k by March end?", yesOdds: 0.44, noOdds: 0.56, volume: "2,100 SOL", category: "MARKETS" },
    { id: "eth-triumph", title: "ETH/BTC pair closes above 0.05 in March?", yesOdds: 0.30, noOdds: 0.70, volume: "800 SOL", category: "MARKETS" },
    { id: "jupiter-volume", title: "Jupiter 24h volume exceeds $2B total?", yesOdds: 0.55, noOdds: 0.45, volume: "3,400 SOL", category: "NETWORK" },
    { id: "elon-tweet-ai", title: "Elon Musk tweets about 'Agentic Economy'?", yesOdds: 0.75, noOdds: 0.25, volume: "1,200 SOL", category: "NEWS" },
    { id: "jito-tips", title: "Jito daily tips exceed 10,000 SOL?", yesOdds: 0.61, noOdds: 0.39, volume: "2,500 SOL", category: "NETWORK" },
    { id: "ai-token-launch", title: "10+ new AI agents launch tokens on Meteora?", yesOdds: 0.88, noOdds: 0.12, volume: "9,000 SOL", category: "META" },
    { id: "sol-ath", title: "SOL hits a new All-Time High in Feb?", yesOdds: 0.25, noOdds: 0.75, volume: "50,000 SOL", category: "MARKETS" },
    { id: "firedancer-mainnet", title: "Firedancer makes it to Mainnet-Beta by Q2?", yesOdds: 0.40, noOdds: 0.60, volume: "12,000 SOL", category: "NETWORK" }
  ];

  const markets = rawMarkets.map(m => ({
    id: m.id,
    title: m.title,
    yesOdds: m.yesPool / (m.yesPool + m.noPool || 1),
    noOdds: m.noPool / (m.yesPool + m.noPool || 1),
    volume: `${(m.yesPool + m.noPool).toFixed(2)} SOL`,
    category: "NETWORK",
    type: "binary"
  }));

  return NextResponse.json({
    success: true,
    markets: markets.length > 0 ? markets : fallbackMarkets
  });
}
