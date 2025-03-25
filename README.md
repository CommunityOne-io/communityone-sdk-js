# CommunityOne SDK

Official JavaScript/TypeScript SDK for interacting with the [CommunityOne](https://communityone.io) API.

## About CommunityOne

[CommunityOne](https://communityone.io) is a platform that helps Discord communities grow and engage their members through quests, rewards, and gamification.

## Installation

You can install the package using npm:

```bash
npm install communityone
```

Or using yarn:

```bash
yarn add communityone
```

## Quick Start

```typescript
// TypeScript:
import { CommunityOneSDK } from 'communityone';

// JavaScript:
// const { CommunityOneSDK } = require('communityone');

// Initialize the SDK with your server ID and API key
const sdk = new CommunityOneSDK("YOUR_SERVER_ID", "YOUR_API_KEY");

// Example usage with async/await
async function example() {
  try {
    // Get all custom quests
    const customQuests = await sdk.getCustomQuests();
    console.log(customQuests);

    // Get player information
    const playerInfo = await sdk.getPlayerInfo("DISCORD_USER_ID");
    console.log(playerInfo);

    // Complete a custom quest
    const result = await sdk.completeCustomQuest(CUSTOM_QUEST_ID, "DISCORD_USER_ID");
    console.log(result);

    // Get completed members for a quest
    const completedMembers = await sdk.getCompletedMembers(CUSTOM_QUEST_ID);
    console.log(completedMembers);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
example();
```

## Example with Promises

```typescript
// TypeScript:
import { CommunityOneSDK } from 'communityone';

// JavaScript:
// const { CommunityOneSDK } = require('communityone');

// Initialize the SDK with your server ID and API key
const sdk = new CommunityOneSDK("YOUR_SERVER_ID", "YOUR_API_KEY");

// Get custom quests using promises
sdk.getCustomQuests()
  .then(customQuests => console.log(customQuests))
  .catch(error => console.error("Error:", error));
```

## Available Methods

- `getCustomQuests()`: Get all custom quests for the server
- `getPlayerInfo(discordUserId)`: Get information about a player
- `completeCustomQuest(customQuestId, discordUserId)`: Mark a custom quest as completed
- `getCompletedMembers(customQuestId)`: Get all members who completed a quest

## Testing Mode

CommunityOne allows you to test the full quest completion workflow in your application without affecting production quests data, helping you verify quest functionality before releasing it to your community. When a quest is in testing mode:
- The quest won't be visible to regular Discord server members
- No code changes needed! - use the same SDK methods for testing and production quests (the API automatically routes to our internal test environment)

**How to enable:**
1. Go to your server's [CommunityOne dashboard](https://communityone.io/dashboard)
2. Navigate to Hype Engine > Custom Quests
3. Click the Edit button on your quest
4. Enable testing mode

## Rate Limiting

All API endpoints are subject to rate limiting:
- 60 requests per minute per server
- Rate limits are applied separately for each endpoint
- Exceeding the rate limit will result in a 429 Too Many Requests response

## Requirements

- Node.js 14 or higher

## License

This project is licensed under the MIT License. 