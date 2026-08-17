import { 
  Conversation, ChatMessage, TeamMember, AutoResponseRule, FollowUpSequence, PlatformIntegration, MessageHubAnalytics 
} from '../types/messageHub';

const STORAGE_KEY_CONVERSATIONS = 'pingpanda_conversations_v1';
const STORAGE_KEY_MESSAGES = 'pingpanda_messages_v1';
const STORAGE_KEY_TEAM = 'pingpanda_team_v1';
const STORAGE_KEY_RULES = 'pingpanda_rules_v1';
const STORAGE_KEY_SEQUENCES = 'pingpanda_sequences_v1';
const STORAGE_KEY_INTEGRATIONS = 'pingpanda_integrations_v1';

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Sarah Connor',
    email: 'sarah@growthlabs.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Admin',
    status: 'online',
    assignedCount: 4,
    avgResponseTime: '1m 12s',
    csatRating: 4.9
  },
  {
    id: 'team-2',
    name: 'Alex Mercer',
    email: 'alex.mercer@growthlabs.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Manager',
    status: 'online',
    assignedCount: 6,
    avgResponseTime: '2m 05s',
    csatRating: 4.8
  },
  {
    id: 'team-3',
    name: 'Elena Rostova',
    email: 'elena@growthlabs.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Agent',
    status: 'busy',
    assignedCount: 8,
    avgResponseTime: '1m 45s',
    csatRating: 5.0
  },
  {
    id: 'team-4',
    name: 'David Kim',
    email: 'david.kim@growthlabs.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Agent',
    status: 'offline',
    assignedCount: 2,
    avgResponseTime: '3m 20s',
    csatRating: 4.7
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    contactName: 'Marcus Vance',
    contactEmail: 'marcus.vance@techcorp.io',
    contactPhone: '+1 (555) 234-5678',
    contactAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    channel: 'whatsapp',
    status: 'open',
    leadScore: 'VIP Customer',
    leadValue: 12500,
    unread: true,
    unreadCount: 2,
    assignedAgentId: 'team-1',
    lastMessage: 'Can we upgrade our enterprise seat count before tomorrow’s funnel launch?',
    lastMessageTime: '10:42 AM',
    tags: ['Enterprise', 'Funnel Launch', 'High Priority'],
    notes: 'Marcus is the VP of Sales at TechCorp. Looking to onboard 50 sub-accounts.',
    isVip: true,
    location: 'San Francisco, CA'
  },
  {
    id: 'conv-2',
    contactName: 'Sophia Lin',
    contactEmail: 'sophia@designstudio.co',
    contactPhone: '+1 (555) 876-5432',
    contactAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    channel: 'webchat',
    status: 'open',
    leadScore: 'Hot Lead',
    leadValue: 4800,
    unread: true,
    unreadCount: 1,
    assignedAgentId: 'team-2',
    lastMessage: 'How quickly does the ChronoChimp calendar sync with my Google Workspace calendar?',
    lastMessageTime: '10:35 AM',
    tags: ['Inbound Lead', 'ChronoChimp', 'Demo Requested'],
    notes: 'Interested in annual growth plan if calendar sync is instant.',
    isVip: false,
    location: 'Austin, TX'
  },
  {
    id: 'conv-3',
    contactName: 'Jordan Rivera',
    contactEmail: 'jordan@scalingapps.net',
    contactPhone: '+1 (555) 432-1098',
    contactAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    channel: 'sms',
    status: 'pending',
    leadScore: 'Trial User',
    leadValue: 1990,
    unread: false,
    unreadCount: 0,
    assignedAgentId: 'team-3',
    lastMessage: 'Got the SMS verification code, thanks! Testing the 1-click upsell flow now.',
    lastMessageTime: '09:58 AM',
    tags: ['Trial', 'SMS Optin', 'Checkout Test'],
    notes: 'Onboarding step 3 completed.',
    isVip: false,
    location: 'Chicago, IL'
  },
  {
    id: 'conv-4',
    contactName: 'Amara Okafor',
    contactEmail: 'amara@globalventure.org',
    contactPhone: '+44 20 7946 0912',
    contactAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    channel: 'email',
    status: 'open',
    leadScore: 'High Value Deal',
    leadValue: 24000,
    unread: true,
    unreadCount: 3,
    assignedAgentId: 'team-1',
    lastMessage: 'Re: Proposal for Custom Domain Whitelabeling & Affiliate Payout Integration',
    lastMessageTime: 'Yesterday',
    tags: ['Whitelabel', 'Contract Pending', 'BountyPack'],
    notes: 'Legal review stage. Requested custom SLA addendum.',
    isVip: true,
    location: 'London, UK'
  },
  {
    id: 'conv-5',
    contactName: 'Liam O’Connor',
    contactEmail: 'liam@agencyboost.io',
    contactPhone: '+1 (555) 998-1122',
    contactAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    channel: 'facebook',
    status: 'assigned',
    leadScore: 'Support Request',
    leadValue: 990,
    unread: false,
    unreadCount: 0,
    assignedAgentId: 'team-3',
    lastMessage: 'Is there a limit on how many webhook triggers I can add per automation workflow?',
    lastMessageTime: 'Yesterday',
    tags: ['Support', 'Automation', 'FB Messenger'],
    notes: 'Resolved query about webhook throttling limits.',
    isVip: false,
    location: 'Toronto, Canada'
  },
  {
    id: 'conv-6',
    contactName: 'Chloé Dubois',
    contactEmail: 'chloe@luxemedia.fr',
    contactPhone: '+33 1 42 68 55 00',
    contactAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    channel: 'telegram',
    status: 'resolved',
    leadScore: 'VIP Customer',
    leadValue: 18500,
    unread: false,
    unreadCount: 0,
    assignedAgentId: 'team-2',
    lastMessage: 'Awesome! The TribeNexus community portal import worked seamlessly. Thank you!',
    lastMessageTime: '2 days ago',
    tags: ['TribeNexus', 'Community', 'VIP'],
    notes: 'Successfully imported 1,200 course members into TribeNexus.',
    isVip: true,
    location: 'Paris, France'
  },
  {
    id: 'conv-7',
    contactName: 'Devon Thorne',
    contactEmail: 'devon@apibuilders.dev',
    contactPhone: '+1 (555) 345-6789',
    contactAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    channel: 'custom_api',
    status: 'open',
    leadScore: 'Hot Lead',
    leadValue: 8500,
    unread: true,
    unreadCount: 1,
    assignedAgentId: 'team-1',
    lastMessage: 'Webhook payload received: event = lead.created. Testing custom API dispatch payload.',
    lastMessageTime: 'Just Now',
    tags: ['API Integration', 'Custom Webhook', 'Developer'],
    notes: 'Building custom ERP integration.',
    isVip: false,
    location: 'Seattle, WA'
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'msg-1-1',
      conversationId: 'conv-1',
      senderType: 'customer',
      senderName: 'Marcus Vance',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      content: 'Hey Sarah! We are launching our q3 mega funnel tomorrow morning.',
      timestamp: '10:38 AM',
      channel: 'whatsapp'
    },
    {
      id: 'msg-1-2',
      conversationId: 'conv-1',
      senderType: 'agent',
      senderName: 'Sarah Connor',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: 'Hi Marcus! Excited for your launch 🚀 How can we support your rollout?',
      timestamp: '10:40 AM',
      channel: 'whatsapp'
    },
    {
      id: 'msg-1-3',
      conversationId: 'conv-1',
      senderType: 'agent',
      senderName: 'Sarah Connor',
      content: 'INTERNAL NOTE: Marcus is preparing a 50-seat expansion order. Priority support flagged.',
      timestamp: '10:41 AM',
      channel: 'whatsapp',
      isInternalNote: true
    },
    {
      id: 'msg-1-4',
      conversationId: 'conv-1',
      senderType: 'customer',
      senderName: 'Marcus Vance',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      content: 'Can we upgrade our enterprise seat count before tomorrow’s funnel launch?',
      timestamp: '10:42 AM',
      channel: 'whatsapp'
    }
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      conversationId: 'conv-2',
      senderType: 'customer',
      senderName: 'Sophia Lin',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      content: 'Hello! I am viewing your landing page builder.',
      timestamp: '10:30 AM',
      channel: 'webchat'
    },
    {
      id: 'msg-2-2',
      conversationId: 'conv-2',
      senderType: 'ai_bot',
      senderName: 'PingPanda Bot 🐼',
      content: 'Welcome to LaunchEngine! 🐼 How can I assist your team today? Feel free to ask about our 1-click funnels or ChronoChimp booking.',
      timestamp: '10:30 AM',
      channel: 'webchat',
      isAutomatedResponse: true
    },
    {
      id: 'msg-2-3',
      conversationId: 'conv-2',
      senderType: 'customer',
      senderName: 'Sophia Lin',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      content: 'How quickly does the ChronoChimp calendar sync with my Google Workspace calendar?',
      timestamp: '10:35 AM',
      channel: 'webchat'
    }
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      conversationId: 'conv-3',
      senderType: 'system',
      senderName: 'PingPanda SMS Gateway',
      content: '[Automated SMS Outbound] Welcome to LaunchEngine! Your trial code is 884-912.',
      timestamp: '09:55 AM',
      channel: 'sms',
      isAutomatedResponse: true
    },
    {
      id: 'msg-3-2',
      conversationId: 'conv-3',
      senderType: 'customer',
      senderName: 'Jordan Rivera',
      content: 'Got the SMS verification code, thanks! Testing the 1-click upsell flow now.',
      timestamp: '09:58 AM',
      channel: 'sms'
    }
  ],
  'conv-4': [
    {
      id: 'msg-4-1',
      conversationId: 'conv-4',
      senderType: 'customer',
      senderName: 'Amara Okafor',
      content: 'Hello Sarah, Our legal department reviewed the Whitelabel SLA document.',
      timestamp: 'Yesterday 3:15 PM',
      channel: 'email'
    },
    {
      id: 'msg-4-2',
      conversationId: 'conv-4',
      senderType: 'customer',
      senderName: 'Amara Okafor',
      content: 'Re: Proposal for Custom Domain Whitelabeling & Affiliate Payout Integration. Attached is our signed schedule A.',
      timestamp: 'Yesterday 4:20 PM',
      channel: 'email'
    }
  ]
};

export const INITIAL_RULES: AutoResponseRule[] = [
  {
    id: 'rule-1',
    name: 'After-Hours Instant VIP Auto-Responder',
    triggerKeyword: 'after_hours',
    triggerChannel: 'all',
    responseText: 'Thanks for reaching out to GrowthLabs! 🐼 We received your message and our team will respond within 15 minutes. For urgent launch inquiries, reply VIP.',
    isActive: true,
    actionType: 'auto_reply'
  },
  {
    id: 'rule-2',
    name: 'High Ticket Pricing Inquiry Auto-Route',
    triggerKeyword: 'pricing',
    triggerChannel: 'webchat',
    responseText: 'I see you are interested in our Enterprise Growth tier! Routing you directly to Senior Director Sarah Connor.',
    isActive: true,
    actionType: 'route_agent',
    assignToAgentId: 'team-1'
  },
  {
    id: 'rule-3',
    name: 'SMS Cart Recovery Trigger',
    triggerKeyword: 'abandon_cart',
    triggerChannel: 'sms',
    responseText: 'Hey {{first_name}}! 🐼 You left your LaunchEngine Growth Pass in your cart. Claim 20% off with code PANDA20 right now: {{checkout_url}}',
    isActive: true,
    actionType: 'start_sequence'
  },
  {
    id: 'rule-4',
    name: 'Custom Webhook Lead Synchronization',
    triggerKeyword: 'new_lead',
    triggerChannel: 'custom_api',
    responseText: '{"status":"success","action":"webhook_dispatched","target":"crm_pipeline"}',
    isActive: true,
    actionType: 'webhook'
  }
];

export const INITIAL_SEQUENCES: FollowUpSequence[] = [
  {
    id: 'seq-1',
    name: '3-Day Omnichannel VIP Nurture',
    description: 'Automated SMS + Email nurture sequence for high-intent webinar registrants.',
    stepsCount: 5,
    activeContacts: 142,
    conversionRate: '34.8%',
    channel: 'sms',
    status: 'active'
  },
  {
    id: 'seq-2',
    name: 'Cart Abandonment Text Recovery',
    description: '2-step rapid SMS follow-up triggered 15 mins after uncompleted checkout.',
    stepsCount: 2,
    activeContacts: 89,
    conversionRate: '28.4%',
    channel: 'sms',
    status: 'active'
  },
  {
    id: 'seq-3',
    name: 'Post-Trial Onboarding & Upgrade Blitz',
    description: 'Email & WhatsApp interactive onboarding guide to convert free trial users.',
    stepsCount: 4,
    activeContacts: 310,
    conversionRate: '41.2%',
    channel: 'whatsapp',
    status: 'active'
  },
  {
    id: 'seq-4',
    name: 'VIP Client Review & CSAT Check-in',
    description: 'Automated CSAT score request sent 48 hours after ticket resolution.',
    stepsCount: 1,
    activeContacts: 54,
    conversionRate: '92.1%',
    channel: 'email',
    status: 'active'
  }
];

export const INITIAL_INTEGRATIONS: PlatformIntegration[] = [
  {
    id: 'int-webchat',
    name: 'Website Live Chat Widget',
    type: 'webchat',
    iconName: 'MessageSquare',
    connected: true,
    statusMessage: 'Active • 1-Click Embed Script Live',
    apiKey: 'pk_live_pingpanda_998127394',
    webhookUrl: 'https://growthlabs.launchengine.io/api/v1/pingpanda/chat-widget',
    syncTime: 'Real-time (0s latency)',
    color: '#6366f1'
  },
  {
    id: 'int-sms',
    name: 'SMS Gateway (Twilio & Telnyx)',
    type: 'sms',
    iconName: 'Phone',
    connected: true,
    statusMessage: 'Connected • 2 Toll-Free Numbers Active',
    apiKey: 'AC883921049281749172948',
    webhookUrl: 'https://growthlabs.launchengine.io/api/v1/pingpanda/sms-callback',
    syncTime: 'Instant 2-way SMS',
    color: '#10b981'
  },
  {
    id: 'int-email',
    name: 'Unified Email Inbox (SMTP / Resend)',
    type: 'email',
    iconName: 'Mail',
    connected: true,
    statusMessage: 'Connected • support@growthlabs.io',
    apiKey: 're_89472194872194821',
    webhookUrl: 'https://growthlabs.launchengine.io/api/v1/pingpanda/email-inbound',
    syncTime: 'Synced 1m ago',
    color: '#06b6d4'
  },
  {
    id: 'int-whatsapp',
    name: 'WhatsApp Business Cloud API',
    type: 'whatsapp',
    iconName: 'MessageCircle',
    connected: true,
    statusMessage: 'Connected • Verified Green Badge',
    apiKey: 'EAAKw092384029384230489',
    webhookUrl: 'https://growthlabs.launchengine.io/api/v1/pingpanda/whatsapp',
    syncTime: 'Real-time',
    color: '#22c55e'
  },
  {
    id: 'int-facebook',
    name: 'Facebook Messenger Engine',
    type: 'facebook',
    iconName: 'Share2',
    connected: true,
    statusMessage: 'Connected • GrowthLabs Official Page',
    apiKey: 'EAAB99210392103912093',
    webhookUrl: 'https://growthlabs.launchengine.io/api/v1/pingpanda/messenger',
    syncTime: 'Real-time',
    color: '#3b82f6'
  },
  {
    id: 'int-telegram',
    name: 'Telegram Bot API',
    type: 'telegram',
    iconName: 'Send',
    connected: true,
    statusMessage: 'Connected • @GrowthLabsBot',
    apiKey: '6891230491:AAH89123891283912389',
    webhookUrl: 'https://growthlabs.launchengine.io/api/v1/pingpanda/telegram',
    syncTime: 'Real-time',
    color: '#0284c7'
  },
  {
    id: 'int-custom-api',
    name: 'Custom Webhooks & REST API',
    type: 'custom_api',
    iconName: 'Code',
    connected: true,
    statusMessage: 'Active • 4 Webhook Listeners',
    apiKey: 'sk_live_panda_custom_api_99482104921',
    webhookUrl: 'https://growthlabs.launchengine.io/api/v1/pingpanda/custom-webhook',
    syncTime: 'Real-time Webhook Dispatch',
    color: '#a855f7'
  }
];

export const INITIAL_ANALYTICS: MessageHubAnalytics = {
  totalMessages: 14890,
  avgResponseTimeSeconds: 84, // 1m 24s
  resolutionRatePercentage: 96.4,
  csatScore: 4.9,
  revenueAttributed: 84950,
  activeConversationsCount: 18
};

// Storage Helpers
export const loadStoredConversations = (): Conversation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
    return raw ? JSON.parse(raw) : INITIAL_CONVERSATIONS;
  } catch (e) {
    return INITIAL_CONVERSATIONS;
  }
};

export const saveStoredConversations = (conversations: Conversation[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(conversations));
  } catch (e) {}
};

export const loadStoredMessages = (): Record<string, ChatMessage[]> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    return raw ? JSON.parse(raw) : INITIAL_MESSAGES;
  } catch (e) {
    return INITIAL_MESSAGES;
  }
};

export const saveStoredMessages = (messages: Record<string, ChatMessage[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  } catch (e) {}
};

export const loadStoredTeam = (): TeamMember[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM);
    return raw ? JSON.parse(raw) : INITIAL_TEAM_MEMBERS;
  } catch (e) {
    return INITIAL_TEAM_MEMBERS;
  }
};

export const saveStoredTeam = (team: TeamMember[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(team));
  } catch (e) {}
};

export const loadStoredRules = (): AutoResponseRule[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RULES);
    return raw ? JSON.parse(raw) : INITIAL_RULES;
  } catch (e) {
    return INITIAL_RULES;
  }
};

export const saveStoredRules = (rules: AutoResponseRule[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_RULES, JSON.stringify(rules));
  } catch (e) {}
};

export const loadStoredSequences = (): FollowUpSequence[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SEQUENCES);
    return raw ? JSON.parse(raw) : INITIAL_SEQUENCES;
  } catch (e) {
    return INITIAL_SEQUENCES;
  }
};

export const saveStoredSequences = (sequences: FollowUpSequence[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_SEQUENCES, JSON.stringify(sequences));
  } catch (e) {}
};

export const loadStoredIntegrations = (): PlatformIntegration[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INTEGRATIONS);
    return raw ? JSON.parse(raw) : INITIAL_INTEGRATIONS;
  } catch (e) {
    return INITIAL_INTEGRATIONS;
  }
};

export const saveStoredIntegrations = (integrations: PlatformIntegration[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_INTEGRATIONS, JSON.stringify(integrations));
  } catch (e) {}
};
