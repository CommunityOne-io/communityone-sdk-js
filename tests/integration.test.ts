import { CommunityOneSDK } from '../src';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SERVER_ID', 'API_KEY', 'DISCORD_USER_ID', 'CUSTOM_QUEST_ID'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// These tests are skipped by default since they would make real API calls
// To run them, replace test.skip with test and provide valid credentials
describe('CommunityOneSDK Integration Tests', () => {
  // Use environment variables instead of hardcoded values
  const server_id = process.env.SERVER_ID!;
  const api_key = process.env.API_KEY!;
  const discord_user_id = process.env.DISCORD_USER_ID!;
  const custom_quest_id = Number(process.env.CUSTOM_QUEST_ID);
  
  let sdk: CommunityOneSDK;

  beforeAll(() => {
    // Initialize SDK
    sdk = new CommunityOneSDK(server_id, api_key);
  });

  test('should fetch custom quests', async () => {
    const quests = await sdk.getCustomQuests();
    console.log(quests);
    expect(Array.isArray(quests)).toBe(true);
  });

  test('should fetch player info', async () => {
    const playerInfo = await sdk.getPlayerInfo(discord_user_id);
    console.log(playerInfo);
    expect(playerInfo).toHaveProperty('discord_user_id');
    expect(playerInfo).toHaveProperty('discord_username');
  });

  test('should complete a quest', async () => {
    const result = await sdk.completeCustomQuest(custom_quest_id, discord_user_id);
    console.log(result);
    expect(result).toHaveProperty('success');
  });

  test('should fetch completed members', async () => {
    const result = await sdk.getCompletedMembers(custom_quest_id);
    
    console.log(result);
    // Verify the response has the expected structure
    expect(result).toHaveProperty('custom_quest_id');
    expect(result).toHaveProperty('testing_mode');
    expect(result).toHaveProperty('members');
    expect(Array.isArray(result.members)).toBe(true);
    
    // If members are returned, verify they have the expected structure
    if (result.members.length > 0) {
      expect(result.members[0]).toHaveProperty('discord_user_id');
      expect(result.members[0]).toHaveProperty('last_completed');
      expect(result.members[0]).toHaveProperty('times_completed');
    }
  });
}); 