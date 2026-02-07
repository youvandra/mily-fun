import { SolanaService } from '@/lib/solana';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const solana = new SolanaService();
    const leaderboard = await solana.fetchLeaderboard();
    
    return NextResponse.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
