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
  const staticArenas: UnifiedMarket[] = [
    { id: "MILY-ARENA-COLOSSEUM", title: "WHICH ELITE ENTITY SECURES THE GRAND PRIZE?", yesOdds: 0.5, noOdds: 0.5, volume: "42,000.00 SOL", category: "META", type: "multiple" },
    { id: "SOL-TPS-TARGET-50K", title: "Solana handles > 50,000 TPS average in Feb?", yesOdds: 0.65, noOdds: 0.35, volume: "14,200.00 SOL", category: "NETWORK", type: "binary" },
    { id: "AI-WIN-HACKATHON-META", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.82, noOdds: 0.18, volume: "5,500.00 SOL", category: "META", type: "binary" },
    { id: "BTC-PRICE-MARCH-120K", title: "BTC closes above $120k by March end?", yesOdds: 0.44, noOdds: 0.56, volume: "2,100.00 SOL", category: "MARKETS", type: "binary" },
    { id: "SOL-FIREDANCER-BETA-Q2", title: "Firedancer (v0.1) live on Mainnet-Beta by Q2?", yesOdds: 0.38, noOdds: 0.62, volume: "18,900.00 SOL", category: "NETWORK", type: "binary" },
    { id: "JUPITER-AGGR-VOL-3B", title: "Jupiter 24h Aggregator Volume > $3B?", yesOdds: 0.51, noOdds: 0.49, volume: "3,890.50 SOL", category: "NETWORK", type: "binary" },
    { id: "ELON-AGENTIC-POST-FEB", title: "Elon Musk tweets about 'Agentic Economy'?", yesOdds: 0.76, noOdds: 0.24, volume: "1,450.00 SOL", category: "NEWS", type: "binary" },
    { id: "JITO-TIPS-DAILY-ATH", title: "Jito validator tips exceed 15k SOL daily?", yesOdds: 0.59, noOdds: 0.41, volume: "4,600.00 SOL", category: "NETWORK", type: "binary" },
    { id: "BONK-MARKET-CAP-REV", title: "BONK market cap hits new ATH in Q1 2026?", yesOdds: 0.22, noOdds: 0.78, volume: "9,800.25 SOL", category: "MARKETS", type: "binary" },
    { id: "PYTH-STAKING-GOV-V2", title: "Pyth unveils governance staking v2 this month?", yesOdds: 0.61, noOdds: 0.39, volume: "1,200.00 SOL", category: "META", type: "binary" },
    { id: "BASE-SOLANA-BRIDGE-26", title: "Official Solana-to-Base bridge announced?", yesOdds: 0.15, noOdds: 0.85, volume: "7,000.00 SOL", category: "NEWS", type: "binary" },
    { id: "HELIUS-AI-VIDEO-INDEX", title: "Helius launches AI Video indexing for on-chain events?", yesOdds: 0.45, noOdds: 0.55, volume: "2,200.00 SOL", category: "META", type: "binary" }
  ];

  try {
    const solana = new SolanaService();
    const rawMarkets = await solana.fetchAllMarkets();
    
    if (rawMarkets && rawMarkets.length > 0) {
      const onchainMarkets = rawMarkets.map((m: any) => ({
        id: m.id,
        title: m.title,
        yesOdds: m.yesPool / (m.yesPool + m.noPool || 1),
        noOdds: m.noPool / (m.yesPool + m.noPool || 1),
        volume: `${(m.yesPool + m.noPool).toFixed(2)} SOL`,
        category: "NETWORK",
        type: "binary" as const
      }));
      
      const combined = [...staticArenas];
      onchainMarkets.forEach(om => {
        if (!combined.find(sm => sm.id === om.id)) {
            combined.push(om);
        }
      });
      
      return NextResponse.json({ success: true, markets: combined });
    }
  } catch (e) {
    console.error("Solana Service Fetch failed");
  }

  return NextResponse.json({
    success: true,
    markets: staticArenas
  });
}
