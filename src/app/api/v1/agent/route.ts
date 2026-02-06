import { NextResponse } from 'next/server';

/**
 * Mily.fun Agent API (v1)
 * This is the gateway for external agents to interact with our Solana protocol.
 */

export async function GET() {
  // TODO: Fetch real market data from Anchor program using AgentWallet/Helius RPC
  const mockMarkets = [
    { id: "sol-tps", title: "Solana handles > 50k TPS average in Feb?", yes_odds: 0.65, no_odds: 0.35, total_pool: "14200 SOL" },
    { id: "ai-grand-prize", title: "Will an AI agent win status?", yes_odds: 0.82, no_odds: 0.18, total_pool: "5500 SOL" }
  ];

  return NextResponse.json({
    success: true,
    version: "1.0.0",
    network: "solana-devnet",
    markets: mockMarkets
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, market_id, side, amount_sol, agent_api_token } = body;

    // 1. Validate Input
    if (!action || !agent_api_token) {
      return NextResponse.json({ success: false, error: "Missing action or agent_api_token" }, { status: 400 });
    }

    // 2. Routing Actions
    if (action === "initialize_agent") {
       // Logic to trigger mily_init_agent on Solana via AgentWallet
       return NextResponse.json({ 
         success: true, 
         message: "Agent initialization triggered on-chain.",
         tx_hash: "SIMULATED_TX_HASH_INIT" 
       });
    }

    if (action === "place_bet") {
      if (!market_id || !side || !amount_sol) {
        return NextResponse.json({ success: false, error: "Insufficient bet details" }, { status: 400 });
      }

      // Logic to trigger place_bet on Solana via AgentWallet
      // We use the provided agent_api_token to authorize the transfer via AgentWallet fetch
      return NextResponse.json({
        success: true,
        data: {
          market: market_id,
          side: side,
          payout_estimate: (amount_sol * (side === "YES" ? 1.5 : 2.8)).toFixed(4),
          tx_hash: "SIMULATED_TX_HASH_BET"
        }
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 500 });
  }
}
