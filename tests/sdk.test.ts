import axios from 'axios';
import { CommunityOneSDK } from '../src';


// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CommunityOneSDK', () => {
  // Test variables
  const server_id = "123";
  const api_key = "1234";
  const discord_user_id = "999";
  const custom_quest_id = 1;
  
  let sdk: CommunityOneSDK;

  beforeEach(() => {
    // Initialize SDK before each test
    sdk = new CommunityOneSDK(server_id, api_key);
    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('getCustomQuests', () => {
    it('should fetch custom quests successfully', async () => {
      // Mock data
      const mockQuests = [
        {
          custom_quest_id: 1,
          title: 'Test Quest',
          description: 'A test quest',
          reward_points: 100,
          archived: false
        }
      ];

      // Mock axios response
      mockedAxios.get.mockResolvedValueOnce({ data: mockQuests });

      // Call the method
      const result = await sdk.getCustomQuests();

      // Check that correct URL was called
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.communityone.io/v1/servers/${server_id}/custom-quests`,
        { headers: { Authorization: api_key } }
      );

      // Check the result
      expect(result).toEqual(mockQuests);
    });

    it('should handle errors when fetching custom quests', async () => {
      // Mock error response
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      // Test error handling
      await expect(sdk.getCustomQuests()).rejects.toThrow('API Error');
    });
  });

  describe('getPlayerInfo', () => {
    it('should fetch player info successfully', async () => {
      // Mock data
      const mockPlayerInfo = {
        discord_user_id: discord_user_id,
        discord_username: 'testuser',
        discord_display_name: 'Test User',
        discord_avatar: 'avatar.png'
      };

      // Mock axios response
      mockedAxios.get.mockResolvedValueOnce({ data: mockPlayerInfo });

      // Call the method
      const result = await sdk.getPlayerInfo(discord_user_id);

      // Check that correct URL was called
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.communityone.io/v1/servers/${server_id}/players/${discord_user_id}/info`,
        { headers: { Authorization: api_key } }
      );

      // Check the result
      expect(result).toEqual(mockPlayerInfo);
    });

    it('should handle errors when fetching player info', async () => {
      // Mock error response
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      // Test error handling
      await expect(sdk.getPlayerInfo(discord_user_id)).rejects.toThrow('API Error');
    });
  });

  describe('completeCustomQuest', () => {
    it('should complete a custom quest successfully', async () => {
      // Mock data
      const mockCompletionResult = {
        success: true,
        message: 'Quest completed successfully',
        completed_at: '2023-01-01T12:00:00Z'
      };

      // Mock axios response
      mockedAxios.post.mockResolvedValueOnce({ data: mockCompletionResult });

      // Call the method
      const result = await sdk.completeCustomQuest(custom_quest_id, discord_user_id);

      // Check that correct URL was called
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `https://api.communityone.io/v1/servers/${server_id}/custom-quests/${custom_quest_id}/complete`,
        { discord_user_id: discord_user_id },
        { headers: { Authorization: api_key } }
      );

      // Check the result
      expect(result).toEqual(mockCompletionResult);
    });

    it('should handle errors when completing a custom quest', async () => {
      // Mock error response
      mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));

      // Test error handling
      await expect(sdk.completeCustomQuest(custom_quest_id, discord_user_id)).rejects.toThrow('API Error');
    });
  });

  describe('getCompletedMembers', () => {
    it('should fetch completed members successfully', async () => {
      // Mock data
      const mockCompletedMembers = [
        {
          discord_user_id: discord_user_id,
          last_completed: '2023-01-01T12:00:00Z',
          times_completed: 1
        }
      ];

      // Mock axios response
      mockedAxios.get.mockResolvedValueOnce({ data: mockCompletedMembers });

      // Call the method
      const result = await sdk.getCompletedMembers(custom_quest_id);

      // Check that correct URL was called
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.communityone.io/v1/servers/${server_id}/custom-quests/${custom_quest_id}/completed-members`,
        { headers: { Authorization: api_key } }
      );

      // Check the result
      expect(result).toEqual(mockCompletedMembers);
    });

    it('should handle errors when fetching completed members', async () => {
      // Mock error response
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      // Test error handling
      await expect(sdk.getCompletedMembers(custom_quest_id)).rejects.toThrow('API Error');
    });
  });
}); 