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
  let markets: UnifiedMarket[] = [];
  
  try {
    const rawMarkets = await solana.fetchAllMarkets();
    
    // STRICT RULE: No dummy data allowed.
    // If the chain is empty, returning empty list so the UI shows current network reality.
    markets = rawMarkets.map((m: any) => ({
      id: m.id,
      title: m.title,
      yesOdds: (m.yesPool + m.noPool) > 0 ? m.yesPool / (m.yesPool + m.noPool) : 0.5,
      noOdds: (m.yesPool + m.noPool) > 0 ? m.noPool / (m.yesPool + m.noPool) : 0.5,
      volume: `${(m.yesPool + m.noPool).toFixed(2)} SOL`,
      category: "NETWORK",
      type: "binary" as const
    }));

    // Always include the Meta-Arena by ID if we can prove its existence, 
    // but its volume stays at 0.00 unless bets exist.
    const metaArenaOnChain = markets.find(m => m.id === "MILY-ARENA-COLOSSEUM");
    if (!metaArenaOnChain) {
        // Only return what is found on the ledger.
    }

  } catch (e) {
    console.error("ON-CHAIN SYNC FAILURE");
    return NextResponse.json({ success: false, error: "Protocol Desync" }, { status: 503 });
  }

  return NextResponse.json({
    success: true,
    markets: markets,
    source: "Solana Mainnet/Devnet Ledger"
  });
}
