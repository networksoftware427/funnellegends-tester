// PingPanda Omnichannel Message Hub Domain Types

export type ChannelType = 
  | 'webchat' 
  | 'sms' 
  | 'email' 
  | 'whatsapp' 
  | 'facebook' 
  | 'telegram' 
  | 'custom_api';

export type ConversationStatus = 'open' | 'pending' | 'assigned' | 'resolved' | 'archived';

export type ContactLeadScore = 'Hot Lead' | 'VIP Customer' | 'Trial User' | 'High Value Deal' | 'Support Request';

export type TeamRole = 'Admin' | 'Manager' | 'Agent' | 'Bot Supervised';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: TeamRole;
  status: 'online' | 'busy' | 'offline';
  assignedCount: number;
  avgResponseTime: string;
  csatRating: number;
}

export interface ChatAttachment {
  name: string;
  url: string;
  type: 'image' | 'document' | 'audio' | 'video';
  size?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderType: 'customer' | 'agent' | 'system' | 'ai_bot';
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  channel: ChannelType;
  isInternalNote?: boolean;
  attachments?: ChatAttachment[];
  isAutomatedResponse?: boolean;
}

export interface Conversation {
  id: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactAvatar: string;
  channel: ChannelType;
  status: ConversationStatus;
  leadScore: ContactLeadScore;
  leadValue: number;
  unread: boolean;
  unreadCount: number;
  assignedAgentId?: string;
  lastMessage: string;
  lastMessageTime: string;
  tags: string[];
  notes: string;
  isVip: boolean;
  location?: string;
}

export interface AutoResponseRule {
  id: string;
  name: string;
  triggerKeyword: string;
  triggerChannel: ChannelType | 'all';
  responseText: string;
  isActive: boolean;
  actionType: 'auto_reply' | 'route_agent' | 'start_sequence' | 'webhook';
  assignToAgentId?: string;
}

export interface FollowUpSequence {
  id: string;
  name: string;
  description: string;
  stepsCount: number;
  activeContacts: number;
  conversionRate: string;
  channel: ChannelType;
  status: 'active' | 'paused';
}

export interface PlatformIntegration {
  id: string;
  name: string;
  type: ChannelType;
  iconName: string;
  connected: boolean;
  statusMessage: string;
  apiKey?: string;
  webhookUrl?: string;
  syncTime?: string;
  color: string;
}

export interface MessageHubAnalytics {
  totalMessages: number;
  avgResponseTimeSeconds: number;
  resolutionRatePercentage: number;
  csatScore: number;
  revenueAttributed: number;
  activeConversationsCount: number;
}
