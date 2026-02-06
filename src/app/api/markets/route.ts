import { SolanaService } from '@/lib/solana';
import { NextResponse } from 'next/server';

export async function GET() {
  const solana = new SolanaService();
  const markets = await solana.fetchAllMarkets();
  
  return NextResponse.json({
    success: true,
    markets: markets.length > 0 ? markets : [
      { id: "demo-1", title: "Solana handles > 50k TPS average in Feb?", yesOdds: 0.65, noOdds: 0.35, volume: "14,200 SOL", category: "Network" },
      { id: "demo-2", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.82, noOdds: 0.18, volume: "5,500 SOL", category: "Meta" }
    ]
  });
}
