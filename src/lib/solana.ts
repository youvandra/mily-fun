import { Connection, PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { IDL } from './idl';

export class SolanaService {
  private connection: Connection;
  private programId: PublicKey;
  private coder: anchor.BorshAccountsCoder;

  constructor() {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';
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
        filters: [{ dataSize: 818 }] 
      });

      return accounts.map(({ pubkey, account }) => {
        const decoded = this.coder.decode('Market', account.data);
        return {
          id: pubkey.toBase58(),
          title: decoded.title,
          description: decoded.description,
          yesPool: decoded.yesPool ? decoded.yesPool.toNumber() / 1e9 : 0,
          noPool: decoded.noPool ? decoded.noPool.toNumber() / 1e9 : 0,
          isResolved: decoded.isResolved,
          endTimestamp: decoded.endTimestamp ? decoded.endTimestamp.toNumber() : 0
        };
      });
    } catch (error) {
      console.error('Error fetching real on-chain markets:', error);
      return [];
    }
  }

  async fetchMarketDetails(marketId: string) {
    try {
      const marketPubkey = new PublicKey(marketId);
      const accountInfo = await this.connection.getAccountInfo(marketPubkey);
      if (!accountInfo) return null;

      const decoded = this.coder.decode('Market', accountInfo.data);
      if (!decoded) return null;

      const signatures = await this.connection.getSignaturesForAddress(marketPubkey, { limit: 10 });
      
      return {
        id: marketId,
        title: decoded.title || "Unknown Market",
        description: decoded.description || "",
        yesPool: decoded.yesPool ? decoded.yesPool.toNumber() / 1e9 : 0,
        noPool: decoded.noPool ? decoded.noPool.toNumber() / 1e9 : 0,
        isResolved: decoded.isResolved,
        recentSignatures: signatures.map(s => s.signature)
      };
    } catch (error) {
      console.error('Error fetching market details:', error);
      return null;
    }
  }

  async fetchLeaderboard() {
    try {
      const accounts = await this.connection.getProgramAccounts(this.programId, {
        filters: [{ dataSize: 56 }]
      });

      return accounts.map(({ pubkey, account }) => {
        const decoded = this.coder.decode('AgentAccount', account.data);
        return {
           address: pubkey.toBase58(),
           authority: decoded.authority.toBase58(),
           reputationScore: decoded.reputationScore ? decoded.reputationScore.toNumber() : 0,
           totalBets: decoded.totalBets ? decoded.totalBets.toNumber() : 0,
           successfulBets: decoded.successfulBets ? decoded.successfulBets.toNumber() : 0
        };
      }).sort((a, b) => b.reputationScore - a.reputationScore);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }
}
