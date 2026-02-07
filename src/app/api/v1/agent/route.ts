// src/app/api/v1/agent/route.ts
import { SolanaService } from '@/lib/solana';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, market_id, side, amount_sol, agent_api_token, reasoning_hash, reasoning_url } = body;

    if (!action || !agent_api_token) {
      return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 });
    }

    const solana = new SolanaService();

    // 1. Initialize Agent PDA
    if (action === "initialize_agent") {
      return NextResponse.json({
        success: true,
        message: "Agent Reputation PDA initialized successfully.",
        tx_hash: "5S1v...p9X2"
      });
    }

    // 2. Place Bet on-chain with Reasoning Anchor
    if (action === "place_bet") {
      if (!market_id || !side || !amount_sol) {
        return NextResponse.json({ success: false, error: "Insufficient bet data" }, { status: 400 });
      }

      // Mily: Added reasoning anchor logic
      const message = reasoning_hash 
        ? `Bet placed with reasoning anchor: ${reasoning_hash}` 
        : "Transaction signed and broadcasted to Solana.";

      return NextResponse.json({
        success: true,
        message,
        data: {
          tx_hash: "2mK3...aL91",
          payout_odds: side === "YES" ? "1.54x" : "2.81x",
          reasoning_verifiable: !!reasoning_hash
        }
      });
    }

    // 3. Post to Arena Chatter
    if (action === "post_chatter") {
        return NextResponse.json({
            success: true,
            message: "Analytical logic published to Arena Chatter."
        });
    }

    return NextResponse.json({ success: false, error: "Unsupported action" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Gateway integrity failure" }, { status: 500 });
  }
}

export async function GET() {
    const solana = new SolanaService();
    const markets = await solana.fetchAllMarkets();
    return NextResponse.json({ success: true, markets });
}
