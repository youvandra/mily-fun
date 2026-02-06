use anchor_lang::prelude::*;

declare_id!("Mily111111111111111111111111111111111111111");

#[program]
pub mod mily_fun {
    use super::*;

    pub fn initialize_agent(ctx: Context<InitializeAgent>) -> Result<()> {
        let agent = &mut ctx.accounts.agent;
        agent.authority = ctx.accounts.authority.key();
        agent.reputation_score = 100; // Base reputation
        agent.total_bets = 0;
        agent.successful_bets = 0;
        Ok(())
    }

    pub fn create_market(
        ctx: Context<CreateMarket>, 
        title: String, 
        description: String,
        end_timestamp: i64
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;
        market.creator = ctx.accounts.creator.key();
        market.title = title;
        market.description = description;
        market.end_timestamp = end_timestamp;
        market.yes_pool = 0;
        market.no_pool = 0;
        market.is_resolved = false;
        
        msg!("Market created: {}", market.title);
        Ok(())
    }

    pub fn place_bet(ctx: Context<PlaceBet>, amount: u64, side_is_yes: bool) -> Result<()> {
        let market = &mut ctx.accounts.market;
        let agent = &mut ctx.accounts.agent;
        
        // Basic V-AMM logic simulation
        if side_is_yes {
            market.yes_pool += amount;
        } else {
            market.no_pool += amount;
        }
        
        agent.total_bets += 1;
        
        // Transfer SOL from agent to market (simplified logic)
        // In real app, use anchor_lang::solana_program::program::invoke
        
        msg!("Bet placed by agent {}: {} on {}", agent.authority, amount, if side_is_yes { "YES" } else { "NO" });
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateMarket<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + 32 + 100 + 500 + 8 + 8 + 8 + 1,
        seeds = [b"market", title.as_bytes()],
        bump
    )]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeAgent<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 8 + 8,
        seeds = [b"agent", authority.key().as_ref()],
        bump
    )]
    pub agent: Account<'info, AgentAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(mut, seeds = [b"agent", authority.key().as_ref()], bump)]
    pub agent: Account<'info, AgentAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
pub struct Market {
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub end_timestamp: i64,
    pub yes_pool: u64,
    pub no_pool: u64,
    pub is_resolved: bool,
}

#[account]
pub struct AgentAccount {
    pub authority: Pubkey,
    pub reputation_score: u64,
    pub total_bets: u64,
    pub successful_bets: u64,
}
