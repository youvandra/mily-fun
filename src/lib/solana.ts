import { Connection, PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { IDL } from './idl';

export class SolanaService {
  private connection: Connection;
  private programId: PublicKey;
  private coder: anchor.BorshAccountsCoder;

  constructor() {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8899';
    this.connection = new Connection(rpcUrl, 'confirmed');
    this.programId = new PublicKey('Mily111111111111111111111111111111111111111');
    this.coder = new anchor.BorshAccountsCoder(IDL as any);
  }

  getConnection() {
    return this.connection;
  }

  async fetchAllMarkets() {
    try {
      const accounts = await this.connection.getProgramAccounts(this.programId, {
        filters: [{ dataSize: 818 }] // Based on our Market struct size
      });

      return accounts.map(({ pubkey, account }) => {
        const decoded = this.coder.decode('Market', account.data);
        return {
          id: pubkey.toBase58(),
          title: decoded.title,
          description: decoded.description,
          yesPool: decoded.yesPool.toNumber() / 1e9, // Conversion to SOL
          noPool: decoded.noPool.toNumber() / 1e9,
          isResolved: decoded.isResolved,
          endTimestamp: decoded.endTimestamp.toNumber()
        };
      });
    } catch (error) {
      console.error('Error fetching real on-chain markets:', error);
      return [];
    }
  }

  async fetchLeaderboard() {
    try {
      const accounts = await this.connection.getProgramAccounts(this.programId, {
        filters: [{ dataSize: 56 }] // Based on AgentAccount size
      });

      return accounts.map(({ pubkey, account }) => {
        const decoded = this.coder.decode('AgentAccount', account.data);
        return {
           address: pubkey.toBase58(),
           authority: decoded.authority.toBase58(),
           reputationScore: decoded.reputationScore.toNumber(),
           totalBets: decoded.totalBets.toNumber(),
           successfulBets: decoded.successfulBets.toNumber()
        };
      }).sort((a, b) => b.reputationScore - a.reputationScore);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }
}
