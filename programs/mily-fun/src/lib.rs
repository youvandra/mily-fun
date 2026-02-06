use anchor_lang::prelude::*;

declare_id!("Mily111111111111111111111111111111111111111");

#[program]
pub mod mily_fun {
    use super::*;

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
        market.total_pool = 0;
        market.is_resolved = false;
        
        msg!("Market created: {}", market.title);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMarket<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + 32 + 100 + 500 + 8 + 8 + 1, // rough estimate
        seeds = [b"market", title_as_seed(&title)],
        bump
    )]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Market {
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub end_timestamp: i64,
    pub total_pool: u64,
    pub is_resolved: bool,
}

fn title_as_seed(title: &str) -> &[u8] {
    // simplified for mockup
    title.as_bytes()
}
