export const IDL = {
  "version": "0.1.0",
  "name": "mily_fun",
  "instructions": [
    {
      "name": "initializeAgent",
      "accounts": [
        { "name": "agent", "isMut": true, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "createMarket",
      "accounts": [
        { "name": "market", "isMut": true, "isSigner": false },
        { "name": "creator", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "title", "type": "string" },
        { "name": "description", "type": "string" },
        { "name": "endTimestamp", "type": "i64" }
      ]
    },
    {
      "name": "placeBet",
      "accounts": [
        { "name": "market", "isMut": true, "isSigner": false },
        { "name": "agent", "isMut": true, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true }
      ],
      "args": [
        { "name": "amount", "type": "u64" },
        { "name": "sideIsYes", "type": "bool" }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Market",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "creator", "type": "publicKey" },
          { "name": "title", "type": "string" },
          { "name": "description", "type": "string" },
          { "name": "endTimestamp", "type": "i64" },
          { "name": "yesPool", "type": "u64" },
          { "name": "noPool", "type": "u64" },
          { "name": "isResolved", "type": "bool" }
        ]
      }
    },
    {
      "name": "AgentAccount",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "authority", "type": "publicKey" },
          { "name": "reputationScore", "type": "u64" },
          { "name": "totalBets", "type": "u64" },
          { "name": "successfulBets", "type": "u64" }
        ]
      }
    }
  ]
};
