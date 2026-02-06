import { Connection, PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';

// This is the Brain of our Solana connection
export class SolanaService {
  private connection: Connection;
  private programId: PublicKey;

  constructor() {
    // Using Helius or public RPC for devnet
    this.connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    this.programId = new PublicKey('Mily111111111111111111111111111111111111111');
  }

  async fetchAllMarkets() {
    try {
      // Fetch all accounts belonging to our program
      const accounts = await this.connection.getProgramAccounts(this.programId, {
        filters: [
          { dataSize: 8 + 32 + 100 + 500 + 8 + 8 + 8 + 1 } // Size of our Market struct
        ]
      });

      return accounts.map(({ pubkey, account }) => {
        // Here we would use Anchor's coder to parse the data properly
        // For now, returning raw info to check connectivity
        return {
          id: pubkey.toBase58(),
          data: account.data
        };
      });
    } catch (error) {
      console.error('Error fetching markets:', error);
      return [];
    }
  }
}
