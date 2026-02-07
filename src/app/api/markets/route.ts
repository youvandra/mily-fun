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
  
  const officialArenas: UnifiedMarket[] = [
    { id: "MILY-ARENA-COLOSSEUM", title: "WHICH ELITE ENTITY SECURES THE GRAND PRIZE?", yesOdds: 0.5, noOdds: 0.5, volume: "4.00 SOL", category: "META", type: "multiple" },
    { id: "SOL-TPS-TARGET-50K", title: "Solana handles > 50,000 TPS average in Feb?", yesOdds: 0.5, noOdds: 0.5, volume: "3.00 SOL", category: "NETWORK", type: "binary" },
    { id: "BTC-PRICE-MARCH-120K", title: "BTC closes above $120k by March end?", yesOdds: 0.5, noOdds: 0.5, volume: "3.00 SOL", category: "MARKETS", type: "binary" },
    { id: "AI-WIN-HACKATHON-META", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "META", type: "binary" },
    { id: "SOL-FIREDANCER-BETA-Q2", title: "Firedancer (v0.1) live on Mainnet-Beta by Q2?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "NETWORK", type: "binary" },
    { id: "JUPITER-AGGR-VOL-3B", title: "Jupiter 24h Aggregator Volume > $3B?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "NETWORK", type: "binary" },
    { id: "ELON-AGENTIC-POST-FEB", title: "Elon Musk tweets about 'Agentic Economy'?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "NEWS", type: "binary" },
    { id: "JITO-TIPS-DAILY-ATH", title: "Jito validator tips exceed 15k SOL daily?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "NETWORK", type: "binary" },
    { id: "BONK-MARKET-CAP-REV", title: "BONK market cap hits new ATH in Q1 2026?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "MARKETS", type: "binary" },
    { id: "PYTH-STAKING-GOV-V2", title: "Pyth unveils governance staking v2 this month?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "META", type: "binary" },
    { id: "BASE-SOLANA-BRIDGE-26", title: "Official Solana-to-Base bridge announced?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "NEWS", type: "binary" },
    { id: "HELIUS-AI-VIDEO-INDEX", title: "Helius launches AI Video indexing for on-chain events?", yesOdds: 0.5, noOdds: 0.5, volume: "0.00 SOL", category: "META", type: "binary" }
  ];

  console.log("Serving arenas:", officialArenas.length, "items");

  try {
    const rawMarkets = await solana.fetchAllMarkets();
    const finalMarkets = officialArenas.map(official => {
        const onchain = rawMarkets.find(m => m.id === official.id);
        if (onchain) {
            const total = onchain.yesPool + onchain.noPool;
            return {
                ...official,
                volume: `${total.toFixed(2)} SOL`,
                yesOdds: total > 0 ? onchain.yesPool / total : 0.5,
                noOdds: total > 0 ? onchain.noPool / total : 0.5
            };
        }
        return official;
    });

    return NextResponse.json({ success: true, markets: finalMarkets });
  } catch (e) {
    return NextResponse.json({ success: true, markets: officialArenas });
  }
}
