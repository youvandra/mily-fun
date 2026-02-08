import { SolanaService } from '@/lib/solana';
import { NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const COMMITMENT_ARENAS = [
    { id: "MILY-ARENA-COLOSSEUM", title: "WHICH ELITE ENTITY SECURES THE GRAND PRIZE?", yesOdds: 0.52, noOdds: 0.48, volume: "4.00 SOL", category: "META", type: "multiple", description: "The ultimate showdown of the Solana Colosseum AI Agent Hackathon." },
    { id: "SOL-TPS-TARGET-50K", title: "Solana handles > 50,000 TPS average in Feb?", yesOdds: 0.65, noOdds: 0.35, volume: "3.00 SOL", category: "NETWORK", type: "binary", description: "Prediction on Solana network throughput milestones." },
    { id: "BTC-PRICE-MARCH-120K", title: "BTC closes above $120k by March end?", yesOdds: 0.45, noOdds: 0.55, volume: "3.00 SOL", category: "MARKETS", type: "binary", description: "Bitcoin price action sentiment for Q1 2026." },
    { id: "AI-WIN-HACKATHON-META", title: "Will an AI agent win the Colosseum Grand Prize?", yesOdds: 0.5, noOdds: 0.5, volume: "0.50 SOL", category: "META", type: "binary", description: "Meta-prediction on the emergence of autonomous winners." },
    { id: "SOL-FIREDANCER-BETA-Q2", title: "Firedancer (v0.1) live on Mainnet-Beta by Q2?", yesOdds: 0.5, noOdds: 0.5, volume: "0.25 SOL", category: "NETWORK", type: "binary", description: "Tracking the deployment of the highly anticipated validator client." },
    { id: "JUPITER-AGGR-VOL-3B", title: "Jupiter 24h Aggregator Volume > $3B?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NETWORK", type: "binary", description: "Daily trading volume targets for Solana's leading aggregator." },
    { id: "ELON-AGENTIC-POST-FEB", title: "Elon Musk tweets about 'Agentic Economy'?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NEWS", type: "binary", description: "Sentiment tracking of social media catalysts." },
    { id: "JITO-TIPS-DAILY-ATH", title: "Jito validator tips exceed 15k SOL daily?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NETWORK", type: "binary", description: "Network health and validator incentive monitoring." },
    { id: "BONK-MARKET-CAP-REV", title: "BONK market cap hits new ATH in Q1 2026?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "MARKETS", type: "binary", description: "Meme-coin momentum analytics on Solana." },
    { id: "PYTH-STAKING-GOV-V2", title: "Pyth unveils governance staking v2 this month?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "META", type: "binary", description: "Governance and protocol evolution tracking." },
    { id: "BASE-SOLANA-BRIDGE-26", title: "Official Solana-to-Base bridge announced?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "NEWS", type: "binary", description: "Interoperability and cross-chain expansion milestones." },
    { id: "HELIUS-AI-VIDEO-INDEX", title: "Helius launches AI Video indexing for on-chain events?", yesOdds: 0.5, noOdds: 0.5, volume: "0.10 SOL", category: "META", type: "binary", description: "Data infrastructure and AI integration milestones." }
];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const solana = new SolanaService();

  try {
    const onchain = await solana.fetchMarketDetails(id);
    const fallback = COMMITMENT_ARENAS.find(m => m.id === id);

    if (!onchain && !fallback) {
      return NextResponse.json({ success: false, error: "Arena not found" }, { status: 404 });
    }

    const data = onchain ? {
        id,
        title: onchain.title,
        description: onchain.description,
        yesPool: onchain.yesPool,
        noPool: onchain.noPool,
        volume: `${(onchain.yesPool + onchain.noPool).toFixed(2)} SOL`,
        yesOdds: (onchain.yesPool + onchain.noPool) > 0 ? onchain.yesPool / (onchain.yesPool + onchain.noPool) : 0.5,
        noOdds: (onchain.yesPool + onchain.noPool) > 0 ? onchain.noPool / (onchain.yesPool + onchain.noPool) : 0.5,
        recentSignatures: onchain.recentSignatures || []
    } : fallback;

    return NextResponse.json({ success: true, market: data });
  } catch (e) {
    const fallback = COMMITMENT_ARENAS.find(m => m.id === id);
    if (fallback) return NextResponse.json({ success: true, market: fallback });
    return NextResponse.json({ success: false, error: "Gateway failure" }, { status: 500 });
  }
}
