import axios, { AxiosResponse } from 'axios';

export const VERSION = '1.0.0';

// Type definitions
export interface CustomQuest {
  custom_quest_id: number;
  title: string;
  description: string;
  external_url?: string;
  reward_points: number;
  reward_role_id?: number;
  archived: boolean;
}

export interface PlayerInfo {
  discord_user_id: string;
  discord_username: string;
  discord_display_name: string;
  discord_avatar?: string;
}

export interface QuestCompletionResult {
  success: boolean;
  message: string;
  completed_at?: string;
}

export interface CompletedMember {
  discord_user_id: string;
  last_completed: string;
  times_completed: number;
}

export interface CompletedMembersResponse {
  custom_quest_id: number;
  testing_mode: boolean;
  members: CompletedMember[];
}

/**
 * CommunityOne SDK for JavaScript/TypeScript
 * 
 * This SDK provides methods to interact with CommunityOne's API endpoints.
 */
export class CommunityOneSDK {
  private readonly BASE_URL = 'https://api.communityone.io/v1';
  private readonly serverId: string;
  private readonly apiKey: string;
  private readonly headers: Record<string, string>;

  /**
   * Initialize the CommunityOne SDK.
   * 
   * @param serverId - The Discord server ID
   * @param apiKey - The API key for authentication
   */
  constructor(serverId: string, apiKey: string) {
    this.serverId = serverId;
    this.apiKey = apiKey;
    this.headers = { 'Authorization': apiKey };
  }

  /**
   * Format the complete URL for an API endpoint.
   * 
   * @param endpoint - The API endpoint path
   * @returns The complete URL
   */
  private formatUrl(endpoint: string): string {
    return `${this.BASE_URL}${endpoint}`;
  }

  /**
   * Handle API response
   * 
   * @param response - The API response
   * @returns The parsed JSON response
   */
  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  /**
   * Get all custom quests for the server.
   * 
   * @returns A list of custom quests
   */
  async getCustomQuests(): Promise<CustomQuest[]> {
    const url = this.formatUrl(`/servers/${this.serverId}/custom-quests`);
    const response = await axios.get<CustomQuest[]>(url, { headers: this.headers });
    return this.handleResponse(response);
  }

  /**
   * Get information about a player.
   * 
   * @param discordUserId - The Discord user ID of the player
   * @returns Player information
   */
  async getPlayerInfo(discordUserId: string): Promise<PlayerInfo> {
    const url = this.formatUrl(`/servers/${this.serverId}/players/${discordUserId}/info`);
    const response = await axios.get<PlayerInfo>(url, { headers: this.headers });
    return this.handleResponse(response);
  }

  /**
   * Mark a custom quest as completed for a Discord member.
   * 
   * @param customQuestId - The ID of the custom quest
   * @param discordUserId - The Discord user ID of the player
   * @returns Completion information
   */
  async completeCustomQuest(customQuestId: number, discordUserId: string): Promise<QuestCompletionResult> {
    const url = this.formatUrl(`/servers/${this.serverId}/custom-quests/${customQuestId}/complete`);
    const data = { discord_user_id: String(discordUserId) };
    const response = await axios.post<QuestCompletionResult>(url, data, { headers: this.headers });
    return this.handleResponse(response);
  }

  /**
   * Get a list of all members who have completed a given custom quest.
   * 
   * @param customQuestId - The ID of the custom quest
   * @returns The completed members response containing quest ID, testing mode and members list
   */
  async getCompletedMembers(customQuestId: number): Promise<CompletedMembersResponse> {
    const url = this.formatUrl(`/servers/${this.serverId}/custom-quests/${customQuestId}/completed-members`);
    const response = await axios.get<CompletedMembersResponse>(url, { headers: this.headers });
    return this.handleResponse(response);
  }
} 