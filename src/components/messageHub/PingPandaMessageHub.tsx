import React, { useState, useEffect } from 'react';
import { 
  Conversation, ChatMessage, TeamMember, AutoResponseRule, FollowUpSequence, PlatformIntegration, MessageHubAnalytics, ChannelType, ConversationStatus, TeamRole
} from '../../types/messageHub';
import { 
  loadStoredConversations, saveStoredConversations, 
  loadStoredMessages, saveStoredMessages, 
  loadStoredTeam, saveStoredTeam, 
  loadStoredRules, saveStoredRules, 
  loadStoredSequences, saveStoredSequences, 
  loadStoredIntegrations, saveStoredIntegrations,
  INITIAL_ANALYTICS 
} from '../../utils/messageHubStorage';
import { 
  MessageSquare, Send, Phone, Mail, MessageCircle, Share2, Code, 
  Search, Filter, Plus, CheckCircle2, Clock, User, Users, Shield, 
  Sparkles, Settings, BarChart3, TrendingUp, Zap, Star, AlertCircle, 
  ChevronRight, Copy, Check, Lock, Globe, FileText, Paperclip, RefreshCw, 
  Bot, Award, DollarSign, ArrowUpRight, Smile, Eye, Trash2, Edit3, X, UserPlus, Sliders, Play, Pause
} from 'lucide-react';

export const PingPandaMessageHub: React.FC = () => {
  // Main State
  const [conversations, setConversations] = useState<Conversation[]>(loadStoredConversations());
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(loadStoredMessages());
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(loadStoredTeam());
  const [autoRules, setAutoRules] = useState<AutoResponseRule[]>(loadStoredRules());
  const [sequences, setSequences] = useState<FollowUpSequence[]>(loadStoredSequences());
  const [integrations, setIntegrations] = useState<PlatformIntegration[]>(loadStoredIntegrations());
  const [analytics] = useState<MessageHubAnalytics>(INITIAL_ANALYTICS);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'inbox' | 'automations' | 'team' | 'analytics' | 'integrations'>('inbox');

  // Selected Conversation State
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const selectedConv = conversations.find(c => c.id === selectedConvId) || conversations[0];
  const activeMessages = selectedConvId ? (messagesMap[selectedConvId] || []) : [];

  // Message Composer State
  const [messageInput, setMessageInput] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [isAiSuggestOpen, setIsAiSuggestOpen] = useState(false);
  const [showContactDrawer, setShowContactDrawer] = useState(true);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState<ChannelType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ConversationStatus | 'all'>('all');
  const [vipFilterOnly, setVipFilterOnly] = useState(false);

  // Modal States
  const [isNewConvModalOpen, setIsNewConvModalOpen] = useState(false);
  const [isEmbedWidgetModalOpen, setIsEmbedWidgetModalOpen] = useState(false);
  const [isNewRuleModalOpen, setIsNewRuleModalOpen] = useState(false);
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form Inputs for Modals
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactChannel, setNewContactChannel] = useState<ChannelType>('webchat');
  const [initialMsg, setInitialMsg] = useState('');

  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleKeyword, setNewRuleKeyword] = useState('');
  const [newRuleChannel, setNewRuleChannel] = useState<ChannelType | 'all'>('all');
  const [newRuleResponse, setNewRuleResponse] = useState('');

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<TeamRole>('Agent');

  // Internal Team Chat State
  const [teamChatMessages, setTeamChatMessages] = useState<Array<{ id: string; sender: string; avatar: string; text: string; time: string }>>([
    { id: 'tc-1', sender: 'Sarah Connor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', text: 'Hey team! Marcus Vance is scaling his seats to 50 tomorrow. @Alex keep an eye on his onboarding.', time: '10:15 AM' },
    { id: 'tc-2', sender: 'Alex Mercer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', text: 'Got it! I am preparing his custom Whitelabel DNS package now.', time: '10:20 AM' },
    { id: 'tc-3', sender: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', text: 'CSAT scores just hit 5.0 for the week! Amazing work everyone 🎉', time: '10:32 AM' }
  ]);
  const [teamChatInput, setTeamChatInput] = useState('');

  // Persist Changes
  useEffect(() => {
    saveStoredConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    saveStoredMessages(messagesMap);
  }, [messagesMap]);

  useEffect(() => {
    saveStoredTeam(teamMembers);
  }, [teamMembers]);

  useEffect(() => {
    saveStoredRules(autoRules);
  }, [autoRules]);

  useEffect(() => {
    saveStoredSequences(sequences);
  }, [sequences]);

  useEffect(() => {
    saveStoredIntegrations(integrations);
  }, [integrations]);

  // Copy Helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper for Channel Icon & Colors
  const getChannelBadge = (channel: ChannelType) => {
    switch (channel) {
      case 'whatsapp':
        return { label: 'WhatsApp', icon: MessageCircle, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'sms':
        return { label: 'SMS', icon: Phone, color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      case 'email':
        return { label: 'Email', icon: Mail, color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' };
      case 'webchat':
        return { label: 'Live Chat', icon: MessageSquare, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' };
      case 'facebook':
        return { label: 'Messenger', icon: Share2, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'telegram':
        return { label: 'Telegram', icon: Send, color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' };
      case 'custom_api':
        return { label: 'Custom API', icon: Code, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
      default:
        return { label: 'Web', icon: Globe, color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
    }
  };

  // Filtered Conversations
  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesVip = !vipFilterOnly || c.isVip;

    return matchesSearch && matchesChannel && matchesStatus && matchesVip;
  });

  // Handle Send Message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !selectedConvId) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConvId,
      senderType: isInternalNote ? 'agent' : 'agent',
      senderName: 'Sarah Connor',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: selectedConv.channel,
      isInternalNote: isInternalNote
    };

    const currentMsgs = messagesMap[selectedConvId] || [];
    const updatedMsgs = [...currentMsgs, newMsg];

    setMessagesMap({
      ...messagesMap,
      [selectedConvId]: updatedMsgs
    });

    // Update conversation last message
    setConversations(conversations.map(c => {
      if (c.id === selectedConvId) {
        return {
          ...c,
          lastMessage: isInternalNote ? `[Internal Note] ${messageInput}` : messageInput,
          lastMessageTime: 'Just now',
          unread: false,
          unreadCount: 0
        };
      }
      return c;
    }));

    setMessageInput('');
    setIsInternalNote(false);
  };

  // Create New Conversation
  const handleCreateConversation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim()) return;

    const timestamp = Date.now();
    const newConv: Conversation = {
      id: `conv-${timestamp}`,
      contactName: newContactName,
      contactEmail: newContactEmail || `${newContactName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      contactPhone: newContactPhone || '+1 (555) 000-1122',
      contactAvatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      channel: newContactChannel,
      status: 'open',
      leadScore: 'Hot Lead',
      leadValue: 3500,
      unread: false,
      unreadCount: 0,
      assignedAgentId: 'team-1',
      lastMessage: initialMsg || 'Conversation initiated.',
      lastMessageTime: 'Just Now',
      tags: ['New Contact', 'Direct Outreach'],
      notes: 'New manual contact created in PingPanda Message Hub.',
      isVip: false,
      location: 'New York, USA'
    };

    const initialChatMessage: ChatMessage = {
      id: `msg-init-${timestamp}`,
      conversationId: newConv.id,
      senderType: 'agent',
      senderName: 'Sarah Connor',
      content: initialMsg || 'Hello! How can our team assist you today?',
      timestamp: 'Just Now',
      channel: newContactChannel
    };

    setConversations([newConv, ...conversations]);
    setMessagesMap({ ...messagesMap, [newConv.id]: [initialChatMessage] });
    setSelectedConvId(newConv.id);
    setIsNewConvModalOpen(false);

    // Reset Form
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
    setInitialMsg('');
  };

  // Add Auto Rule
  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    const newRule: AutoResponseRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      triggerKeyword: newRuleKeyword || 'general',
      triggerChannel: newRuleChannel,
      responseText: newRuleResponse || 'Thanks for reaching out to PingPanda 🐼! We will get back to you shortly.',
      isActive: true,
      actionType: 'auto_reply'
    };

    setAutoRules([...autoRules, newRule]);
    setIsNewRuleModalOpen(false);
    setNewRuleName('');
    setNewRuleKeyword('');
    setNewRuleResponse('');
  };

  // Add Team Member
  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: newMemberName,
      email: newMemberEmail || `${newMemberName.toLowerCase().replace(/\s+/g, '.')}@growthlabs.io`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: newMemberRole,
      status: 'online',
      assignedCount: 0,
      avgResponseTime: '1m 30s',
      csatRating: 5.0
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsNewTeamModalOpen(false);
    setNewMemberName('');
    setNewMemberEmail('');
  };

  // AI Assistant Response Injector
  const handleApplyAiSuggestion = (suggestionText: string) => {
    setMessageInput(suggestionText);
    setIsAiSuggestOpen(false);
  };

  // Send Internal Team Chat Message
  const handleSendTeamChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamChatInput.trim()) return;

    const newTeamMsg = {
      id: `tc-${Date.now()}`,
      sender: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: teamChatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTeamChatMessages([...teamChatMessages, newTeamMsg]);
    setTeamChatInput('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white text-gray-900 overflow-hidden font-sans">
      
      {/* ================= TOP BRANDING & TAB HEADER ================= */}
      <header className="px-6 py-4 bg-green-600 border-b border-green-700 flex flex-wrap items-center justify-between gap-4 shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-green-500 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-600/30 text-2xl font-black">
            🐼
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">PingPanda</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20 text-white border border-white/30 tracking-wider">
                Omnichannel Message Hub
              </span>
            </div>
            <p className="text-xs text-green-100 font-medium">Unified Inbox • AI Smart Sequences • Team Collaboration • Chat ROI</p>
          </div>
        </div>

        {/* Main Section Navigation Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-50 border border-gray-200 rounded-2xl">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'inbox' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Unified Inbox</span>
            {conversations.filter(c => c.unread).length > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-pink-500 text-white animate-pulse">
                {conversations.filter(c => c.unread).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('automations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'automations' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Automations & Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'team' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team & Roles</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'analytics' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            <span>Analytics & ROI</span>
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'integrations' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-500" />
            <span>Channels & API</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEmbedWidgetModalOpen(true)}
            className="px-3.5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-green-600 shadow-sm transition-colors"
          >
            <Code className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Webchat Embed Code</span>
          </button>

          <button
            onClick={() => setIsNewConvModalOpen(true)}
            className="px-4 py-2 bg-white hover:bg-green-50 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-green-600/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
      </header>


      {/* ================= MAIN TAB CONTENT BODY ================= */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* TAB 1: UNIFIED INBOX (3-COLUMN SPLIT PANE) */}
        {activeTab === 'inbox' && (
          <div className="flex-1 flex overflow-hidden w-full">
            
            {/* INBOX LEFT LIST (Conversations Column) */}
            <div className="w-80 md:w-96 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
              
              {/* Search & Channel Selector */}
              <div className="p-3.5 border-b border-gray-200 space-y-3 bg-white">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search contact, email, text..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500"
                  />
                </div>

                {/* Channel Filter Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
                  <button
                    onClick={() => setChannelFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                      channelFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {(['webchat', 'sms', 'email', 'whatsapp', 'facebook', 'telegram', 'custom_api'] as ChannelType[]).map(ch => {
                    const badge = getChannelBadge(ch);
                    return (
                      <button
                        key={ch}
                        onClick={() => setChannelFilter(ch)}
                        className={`px-2 py-1 rounded-lg font-bold shrink-0 flex items-center gap-1 border text-[11px] transition-colors ${
                          channelFilter === ch ? 'bg-slate-800 text-white border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <badge.icon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Filters (Status & VIP toggle) */}
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="open">Open</option>
                      <option value="pending">Pending</option>
                      <option value="assigned">Assigned</option>
                      <option value="resolved">Resolved</option>
                    </select>

                    <button
                      onClick={() => setVipFilterOnly(!vipFilterOnly)}
                      className={`px-2 py-1 rounded-lg flex items-center gap-1 border transition-colors ${
                        vipFilterOnly ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>VIP</span>
                    </button>
                  </div>
                  <span>{filteredConversations.length} chats</span>
                </div>
              </div>

              {/* Conversation List Stream */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>No conversations found matching filters.</p>
                  </div>
                ) : (
                  filteredConversations.map(conv => {
                    const badge = getChannelBadge(conv.channel);
                    const isSelected = conv.id === selectedConvId;
                    const assignedAgent = teamMembers.find(t => t.id === conv.assignedAgentId);

                    return (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConvId(conv.id)}
                        className={`p-3.5 cursor-pointer transition-all hover:bg-slate-800/40 flex items-start gap-3 relative ${
                          isSelected ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : ''
                        }`}
                      >
                        {/* Contact Avatar */}
                        <div className="relative shrink-0">
                          <img
                            src={conv.contactAvatar}
                            alt={conv.contactName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700"
                          />
                          <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border border-slate-900 ${badge.color}`}>
                            <badge.icon className="w-2.5 h-2.5" />
                          </div>
                        </div>

                        {/* Contact info & last message */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <h4 className={`text-xs font-bold truncate ${conv.unread ? 'text-white font-extrabold' : 'text-slate-200'}`}>
                                {conv.contactName}
                              </h4>
                              {conv.isVip && (
                                <span title="VIP Customer"><Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" /></span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0 font-medium">{conv.lastMessageTime}</span>
                          </div>

                          <p className={`text-[11px] truncate mt-0.5 ${conv.unread ? 'text-indigo-200 font-semibold' : 'text-slate-400'}`}>
                            {conv.lastMessage}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-1">
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase ${badge.color}`}>
                              {badge.label}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {assignedAgent && (
                                <img
                                  src={assignedAgent.avatar}
                                  alt={assignedAgent.name}
                                  title={`Assigned to ${assignedAgent.name}`}
                                  className="w-4 h-4 rounded-full border border-slate-700"
                                />
                              )}
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                conv.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                conv.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                conv.status === 'resolved' ? 'bg-slate-800 text-slate-400' : 'bg-indigo-500/10 text-indigo-400'
                              }`}>
                                {conv.status}
                              </span>
                              {conv.unread && (
                                <span className="w-2 h-2 rounded-full bg-pink-500 shadow-sm shadow-pink-500"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>


            {/* INBOX MIDDLE CHAT WINDOW */}
            <div className="flex-1 flex flex-col bg-white min-w-0 overflow-hidden">
              {selectedConv ? (
                <>
                  {/* Chat Header Bar */}
                  <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between gap-4 shrink-0 backdrop-blur-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={selectedConv.contactAvatar}
                        alt={selectedConv.contactName}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900 truncate">{selectedConv.contactName}</h3>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${getChannelBadge(selectedConv.channel).color}`}>
                            {getChannelBadge(selectedConv.channel).label}
                          </span>
                          {selectedConv.isVip && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-300" /> VIP Pass
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {selectedConv.contactEmail} • {selectedConv.contactPhone} {selectedConv.location ? `• ${selectedConv.location}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Chat Header Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      
                      {/* Assign Agent Selector */}
                      <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 text-xs">
                        <User className="w-3.5 h-3.5 text-gray-500" />
                        <select
                          value={selectedConv.assignedAgentId || ''}
                          onChange={(e) => {
                            const newAgentId = e.target.value;
                            setConversations(conversations.map(c => c.id === selectedConv.id ? { ...c, assignedAgentId: newAgentId } : c));
                          }}
                          className="bg-transparent text-gray-900 focus:outline-none text-xs font-semibold cursor-pointer"
                        >
                          <option value="">Unassigned</option>
                          {teamMembers.map(t => (
                            <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                          ))}
                        </select>
                      </div>

                      {/* Status Toggle */}
                      <button
                        onClick={() => {
                          const newStatus = selectedConv.status === 'resolved' ? 'open' : 'resolved';
                          setConversations(conversations.map(c => c.id === selectedConv.id ? { ...c, status: newStatus } : c));
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                          selectedConv.status === 'resolved' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{selectedConv.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}</span>
                      </button>

                      {/* Contact Drawer Toggle */}
                      <button
                        onClick={() => setShowContactDrawer(!showContactDrawer)}
                        className={`p-2 rounded-xl border transition-colors ${
                          showContactDrawer ? 'bg-green-600 text-white border-green-500' : 'bg-gray-100 text-gray-500 border-gray-200 hover:text-gray-900'
                        }`}
                        title="Toggle Contact Sidebar"
                      >
                        <Sliders className="w-4 h-4" />
                      </button>
                    </div>
                  </div>


                  {/* Messages Thread Stream */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50">
                    
                    {/* Channel Security Banner */}
                    <div className="p-3 rounded-2xl bg-white border border-gray-200 text-center text-xs text-gray-500 max-w-lg mx-auto flex items-center justify-center gap-2 shadow-sm">
                      <Lock className="w-3.5 h-3.5 text-green-600" />
                      <span>PingPanda Omnichannel Tunnel Active • 256-bit Encrypted via {getChannelBadge(selectedConv.channel).label} API</span>
                    </div>

                    {activeMessages.map(msg => {
                      const isAgent = msg.senderType === 'agent';
                      const isBot = msg.senderType === 'ai_bot';
                      const isSystem = msg.senderType === 'system';
                      const isNote = msg.isInternalNote;

                      if (isNote) {
                        return (
                          <div key={msg.id} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs max-w-xl mx-auto space-y-1 shadow">
                            <div className="flex items-center justify-between font-bold text-amber-300">
                              <span className="flex items-center gap-1.5">
                                <Lock className="w-3 h-3" />
                                Internal Team Note ({msg.senderName})
                              </span>
                              <span className="text-[10px] text-amber-400/80">{msg.timestamp}</span>
                            </div>
                            <p className="leading-relaxed">{msg.content}</p>
                          </div>
                        );
                      }

                      if (isSystem) {
                        return (
                          <div key={msg.id} className="text-center text-xs text-gray-500 my-2 italic">
                            <span>{msg.content} • {msg.timestamp}</span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-3 max-w-2xl ${isAgent || isBot ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                          <img
                            src={msg.senderAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                            alt={msg.senderName}
                            className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200 mt-1"
                          />

                          <div className={`space-y-1 ${isAgent || isBot ? 'items-end text-right' : 'items-start text-left'}`}>
                            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold px-1">
                              <span>{msg.senderName}</span>
                              {isBot && (
                                <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold">
                                  AI Bot 🐼
                                </span>
                              )}
                              <span>•</span>
                              <span>{msg.timestamp}</span>
                            </div>

                            <div
                              className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                                isAgent 
                                  ? 'bg-green-600 text-white rounded-tr-none' 
                                  : isBot 
                                  ? 'bg-purple-50 text-purple-900 border border-purple-200 rounded-tr-none'
                                  : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'
                              }`}
                            >
                              <p>{msg.content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>


                  {/* AI Copilot Response Suggestion Box */}
                  {isAiSuggestOpen && (
                    <div className="p-3 bg-purple-950/40 border-t border-purple-800/60 flex items-center justify-between gap-3 animate-fade-in text-xs">
                      <div className="flex items-center gap-2 text-purple-300 font-bold">
                        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                        <span>AI Assistant Quick Reply Generator:</span>
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto">
                        <button
                          onClick={() => handleApplyAiSuggestion(`Hi ${selectedConv.contactName}! Thanks for your message. I have reviewed your account and can immediately upgrade your seats.`)}
                          className="px-3 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/60 rounded-xl font-medium shrink-0"
                        >
                          ⚡ Enterprise Upgrade Reply
                        </button>
                        <button
                          onClick={() => handleApplyAiSuggestion(`Great question! You can schedule a strategy demo call with our account manager here: https://launchengine.io/book`)}
                          className="px-3 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/60 rounded-xl font-medium shrink-0"
                        >
                          📅 Share ChronoChimp Booking Link
                        </button>
                        <button
                          onClick={() => handleApplyAiSuggestion(`I have assigned this high-priority ticket to our senior escalation engineer. We'll update you within 10 minutes!`)}
                          className="px-3 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/60 rounded-xl font-medium shrink-0"
                        >
                          🚀 Priority Escalation
                        </button>
                      </div>

                      <button onClick={() => setIsAiSuggestOpen(false)} className="text-slate-400 hover:text-white p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}


                  {/* Composer Input Area */}
                  <form onSubmit={handleSendMessage} className={`p-4 border-t border-gray-200 shrink-0 transition-colors ${
                    isInternalNote ? 'bg-amber-50 border-amber-200' : 'bg-white'
                  }`}>
                    
                    {/* Composer Toolbar */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {/* Toggle Mode: Customer Reply vs Internal Note */}
                        <button
                          type="button"
                          onClick={() => setIsInternalNote(false)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            !isInternalNote ? 'bg-green-600 text-white shadow' : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          Reply Customer
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsInternalNote(true)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                            isInternalNote ? 'bg-amber-500 text-white font-extrabold shadow' : 'text-gray-500 hover:text-amber-600'
                          }`}
                        >
                          <Lock className="w-3 h-3" />
                          <span>Internal Note</span>
                        </button>
                      </div>

                      {/* AI Generator Button */}
                      <button
                        type="button"
                        onClick={() => setIsAiSuggestOpen(!isAiSuggestOpen)}
                        className="px-3 py-1 bg-purple-900/50 hover:bg-purple-800/60 text-purple-300 border border-purple-700/50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>AI Reply Copilot</span>
                      </button>
                    </div>

                    {/* Input Field & Send Button */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder={isInternalNote ? "Write an internal team note (only visible to team)..." : `Reply to ${selectedConv.contactName} via ${getChannelBadge(selectedConv.channel).label}...`}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none border ${
                          isInternalNote 
                            ? 'bg-white border-amber-200 focus:border-amber-400 shadow-sm' 
                            : 'bg-gray-50 border-gray-200 focus:border-green-500 shadow-sm'
                        }`}
                      />

                      <button
                        type="submit"
                        disabled={!messageInput.trim()}
                        className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-md ${
                          isInternalNote
                            ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-amber-500/20'
                            : 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/30'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <span>{isInternalNote ? 'Save Note' : 'Send'}</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400">
                  <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm font-semibold">Select a conversation to start chatting</p>
                </div>
              )}
            </div>


            {/* INBOX RIGHT DRAWER (Contact Profile & Metadata) */}
            {showContactDrawer && selectedConv && (
              <div className="w-80 bg-white border-l border-gray-200 p-5 flex flex-col shrink-0 overflow-y-auto space-y-6">
                
                {/* Contact Hero Info */}
                <div className="text-center space-y-2 pb-4 border-b border-gray-200">
                  <img
                    src={selectedConv.contactAvatar}
                    alt={selectedConv.contactName}
                    className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-green-500 shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">{selectedConv.contactName}</h3>
                    <p className="text-xs text-gray-500">{selectedConv.contactEmail}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedConv.contactPhone}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        const updated = conversations.map(c => c.id === selectedConv.id ? { ...c, isVip: !c.isVip } : c);
                        setConversations(updated);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all ${
                        selectedConv.isVip 
                          ? 'bg-amber-50 text-amber-600 border-amber-200' 
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${selectedConv.isVip ? 'fill-amber-300 text-amber-300' : ''}`} />
                      <span>{selectedConv.isVip ? 'VIP Customer' : 'Make VIP'}</span>
                    </button>
                  </div>
                </div>

                {/* Deal Value & Lead Score Stat Card */}
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Customer Lifetime Value:</span>
                    <span className="text-green-600 font-mono font-extrabold">${selectedConv.leadValue.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200 mt-2">
                    <span className="text-gray-500 font-medium mt-1">Lead Stage:</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-green-100 text-green-700 border border-green-200 mt-1">
                      {selectedConv.leadScore}
                    </span>
                  </div>
                </div>

                {/* Contact Tags Manager */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>CRM Tags</span>
                    <span className="text-[10px] text-gray-500">{selectedConv.tags.length} active</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedConv.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-gray-700 border border-gray-200 shadow-sm text-[11px] font-semibold flex items-center gap-1">
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Internal Notes */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700">Internal Account Notes</label>
                  <textarea
                    value={selectedConv.notes}
                    onChange={(e) => {
                      const newNotes = e.target.value;
                      setConversations(conversations.map(c => c.id === selectedConv.id ? { ...c, notes: newNotes } : c));
                    }}
                    rows={3}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none shadow-sm"
                    placeholder="Add notes about this customer..."
                  />
                </div>

                {/* Cross-App Shortcuts */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Actions</h4>

                  <button 
                    onClick={() => alert(`Strategy call invite link dispatched to ${selectedConv.contactEmail}!`)}
                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-green-600" />
                    <span>Send ChronoChimp Invite</span>
                  </button>

                  <button 
                    onClick={() => alert(`Created $${selectedConv.leadValue} deal for ${selectedConv.contactName} in CRM Pipeline!`)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Create CRM Deal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}


        {/* TAB 2: AUTOMATIONS & FOLLOW-UP SEQUENCES */}
        {activeTab === 'automations' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
            
            {/* Header Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-green-600 border border-green-500 shadow-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                  <h2 className="text-lg font-black text-white">Smart Auto-Responders & Drip Sequences</h2>
                </div>
                <p className="text-xs text-green-100 mt-1 max-w-xl">
                  Set up keyword triggers, after-hours auto replies, and multi-channel follow-up sequences that turn every lead interaction into sale opportunities.
                </p>
              </div>

              <button
                onClick={() => setIsNewRuleModalOpen(true)}
                className="px-4 py-2.5 bg-white text-green-700 hover:bg-gray-50 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-black/10"
              >
                <Plus className="w-4 h-4 text-green-600" />
                <span>New Auto-Reply Rule</span>
              </button>
            </div>


            {/* Section 1: Auto-Response Rules */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-green-600" />
                  <span>Keyword & Instant Auto-Response Rules</span>
                </h3>
                <span className="text-xs text-gray-500 font-bold">{autoRules.filter(r => r.isActive).length} active rules</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {autoRules.map(rule => (
                  <div key={rule.id} className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-sm hover:border-gray-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${rule.isActive ? 'bg-emerald-500 shadow-sm shadow-emerald-400' : 'bg-gray-400'}`}></span>
                        <h4 className="text-xs font-bold text-gray-900">{rule.name}</h4>
                      </div>

                      <button
                        onClick={() => {
                          setAutoRules(autoRules.map(r => r.id === rule.id ? { ...r, isActive: !r.isActive } : r));
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-colors ${
                          rule.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}
                      >
                        {rule.isActive ? 'ACTIVE' : 'PAUSED'}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 leading-relaxed font-mono">
                      "{rule.responseText}"
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                      <span>Trigger: <code className="text-amber-600 font-mono">{rule.triggerKeyword}</code></span>
                      <span className="capitalize">Channel: {rule.triggerChannel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Section 2: Drip Follow-Up Sequences */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span>Omnichannel Follow-Up Sequences</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sequences.map(seq => (
                  <div key={seq.id} className="p-5 rounded-2xl bg-white border border-gray-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        {seq.channel}
                      </span>
                      <span className="text-xs font-mono font-extrabold text-green-600">{seq.conversionRate} conv</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{seq.name}</h4>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{seq.description}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-medium text-gray-500">
                      <span>{seq.stepsCount} steps</span>
                      <span>{seq.activeContacts} active contacts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB 3: TEAM & ROLES */}
        {activeTab === 'team' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
            
            {/* Team Roster Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 p-6 rounded-3xl bg-green-600 border border-green-500 shadow-2xl">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>Team Roster & Role Permissions</span>
                </h2>
                <p className="text-xs text-green-100 mt-0.5">
                  Manage agent permissions, round-robin auto-assignments, and team performance metrics.
                </p>
              </div>

              <button
                onClick={() => setIsNewTeamModalOpen(true)}
                className="px-4 py-2.5 bg-white text-green-700 hover:bg-gray-50 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-black/10"
              >
                <UserPlus className="w-4 h-4 text-green-600" />
                <span>Add Team Member</span>
              </button>
            </div>


            {/* Team Member Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.map(member => (
                <div key={member.id} className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 space-y-4 shadow-sm text-center relative transition-colors">
                  <div className="relative inline-block">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-green-500 shadow-md"
                    />
                    <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-emerald-500' : member.status === 'busy' ? 'bg-amber-500' : 'bg-gray-400'
                    }`}></span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                    <p className="text-xs text-gray-500">{member.email}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-green-50 text-green-700 border border-green-200">
                      {member.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200 text-xs">
                    <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="block text-[10px] text-gray-500">Avg Speed</span>
                      <span className="font-mono font-bold text-green-600">{member.avgResponseTime}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="block text-[10px] text-gray-500">CSAT Score</span>
                      <span className="font-mono font-bold text-emerald-600">⭐ {member.csatRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* Internal Team Discussion Chat Room */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span>Internal Team Discussion Channel (#pingpanda-team)</span>
                </h3>
                <span className="text-xs text-gray-500 font-mono">Internal Agent Only</span>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {teamChatMessages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">{msg.sender}</span>
                        <span className="text-[10px] text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendTeamChat} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={teamChatInput}
                  onChange={(e) => setTeamChatInput(e.target.value)}
                  placeholder="Post internal message to team..."
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 shadow-sm"
                />
                <button type="submit" className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}


        {/* TAB 4: ANALYTICS & ROI */}
        {activeTab === 'analytics' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
            
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-gray-500 font-medium">Total Messages Handled</span>
                <div className="text-2xl font-black text-gray-900 font-mono">{analytics.totalMessages.toLocaleString()}</div>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +18.4% this month
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-gray-500 font-medium">Avg Response Time</span>
                <div className="text-2xl font-black text-green-600 font-mono">1m 24s</div>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 35% faster vs benchmark
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-gray-500 font-medium">Resolution Rate</span>
                <div className="text-2xl font-black text-emerald-600 font-mono">{analytics.resolutionRatePercentage}%</div>
                <span className="text-[10px] text-gray-500 font-bold">14,354 resolved</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-gray-500 font-medium">Customer CSAT Score</span>
                <div className="text-2xl font-black text-amber-500 font-mono">⭐ {analytics.csatScore} / 5.0</div>
                <span className="text-[10px] text-amber-600 font-bold">Based on 1,420 reviews</span>
              </div>

              <div className="p-5 rounded-2xl bg-green-600 border border-green-500 space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs text-green-100 font-medium">Chat Revenue Attributed</span>
                <div className="text-2xl font-black text-white font-mono">${analytics.revenueAttributed.toLocaleString()}</div>
                <span className="text-[10px] text-white font-bold">54 Deals Converted</span>
              </div>
            </div>


            {/* Channel Performance Comparison */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <span>Omnichannel Conversion & Message Breakdown</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'WhatsApp Business', volume: '4,820 msgs', revenue: '$34,200', pct: 85, color: 'bg-emerald-500' },
                  { name: 'Live Website Chat Widget', volume: '5,140 msgs', revenue: '$28,400', pct: 70, color: 'bg-indigo-500' },
                  { name: 'SMS Gateway (Twilio)', volume: '2,900 msgs', revenue: '$14,800', pct: 55, color: 'bg-green-500' },
                  { name: 'Unified Email (SMTP)', volume: '1,430 msgs', revenue: '$7,550', pct: 35, color: 'bg-cyan-500' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-900">{item.name}</span>
                      <span className="text-gray-500 font-mono">{item.volume} • <strong className="text-green-600">{item.revenue}</strong></span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 border border-gray-200">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* TAB 5: CHANNELS & INTEGRATIONS */}
        {activeTab === 'integrations' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
            
            <div className="p-6 rounded-3xl bg-green-600 border border-green-500 shadow-xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <span>Omnichannel Integrations & API Suite</span>
                </h2>
                <p className="text-xs text-green-100 mt-0.5">
                  Connect website chat, SMS, Email, WhatsApp, Messenger, Telegram, and custom API webhooks in one place.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-white border border-green-400 text-xs font-mono text-green-700 font-bold">
                API Key: pk_live_pingpanda_998127394
              </div>
            </div>


            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {integrations.map(int => (
                <div key={int.id} className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 space-y-4 shadow-sm transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-green-600 font-bold">
                        🌐
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-900">{int.name}</h3>
                        <p className="text-[10px] text-gray-500">{int.syncTime}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIntegrations(integrations.map(i => i.id === int.id ? { ...i, connected: !i.connected } : i));
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition-colors ${
                        int.connected ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}
                    >
                      {int.connected ? 'CONNECTED' : 'CONNECT'}
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 font-medium">{int.statusMessage}</p>

                  <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono text-[10px] text-gray-500 flex items-center justify-between">
                    <span className="truncate">{int.webhookUrl}</span>
                    <button
                      onClick={() => copyToClipboard(int.webhookUrl || '', int.id)}
                      className="p-1 hover:text-gray-900 shrink-0 ml-2"
                    >
                      {copiedId === int.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>


      {/* ================= MODALS ================= */}

      {/* 1. New Conversation Modal */}
      {isNewConvModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                <span>Start New Customer Conversation</span>
              </h3>
              <button onClick={() => setIsNewConvModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateConversation} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    placeholder="rachel@tech.com"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    placeholder="+1 (555) 000-1122"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Communication Channel</label>
                <select
                  value={newContactChannel}
                  onChange={(e) => setNewContactChannel(e.target.value as ChannelType)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="webchat">Live Website Chat</option>
                  <option value="sms">SMS Text Message</option>
                  <option value="email">Unified Email</option>
                  <option value="whatsapp">WhatsApp Business</option>
                  <option value="facebook">Facebook Messenger</option>
                  <option value="telegram">Telegram Bot</option>
                  <option value="custom_api">Custom API</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Initial Outbound Message</label>
                <textarea
                  value={initialMsg}
                  onChange={(e) => setInitialMsg(e.target.value)}
                  rows={3}
                  placeholder="Hi Rachel! Welcome to LaunchEngine. How can we support your rollout?"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewConvModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-extrabold shadow-lg shadow-indigo-600/30"
                >
                  Start Conversation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* 2. Webchat Embed Code Modal */}
      {isEmbedWidgetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" />
                <span>Webchat Widget 1-Click Embed Snippet</span>
              </h3>
              <button onClick={() => setIsEmbedWidgetModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Copy and paste this script tag right before the closing <code className="text-indigo-300 font-mono">&lt;/head&gt;</code> tag on any website or funnel page.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 leading-relaxed relative">
              <pre className="whitespace-pre-wrap break-all">
{`<!-- PingPanda Omnichannel Live Chat Widget -->
<script 
  src="https://growthlabs.launchengine.io/widget/pingpanda.js" 
  data-app-key="pk_live_pingpanda_998127394" 
  async>
</script>`}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-medium">Auto-synced with PingPanda Unified Inbox</span>
              <button
                onClick={() => copyToClipboard(`<script src="https://growthlabs.launchengine.io/widget/pingpanda.js" data-app-key="pk_live_pingpanda_998127394" async></script>`, 'embed-script')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                {copiedId === 'embed-script' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === 'embed-script' ? 'Copied Snippet!' : 'Copy Embed Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 3. New Auto-Response Rule Modal */}
      {isNewRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Create Auto-Responder Rule</span>
              </h3>
              <button onClick={() => setIsNewRuleModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Rule Name *</label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="e.g. VIP Demo Request Auto-Quote"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Trigger Keyword</label>
                <input
                  type="text"
                  value={newRuleKeyword}
                  onChange={(e) => setNewRuleKeyword(e.target.value)}
                  placeholder="e.g. demo, pricing, support"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Channel</label>
                <select
                  value={newRuleChannel}
                  onChange={(e) => setNewRuleChannel(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="all">All Channels</option>
                  <option value="webchat">Live Chat</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Auto-Response Message</label>
                <textarea
                  value={newRuleResponse}
                  onChange={(e) => setNewRuleResponse(e.target.value)}
                  rows={3}
                  placeholder="Thanks for reaching out to PingPanda 🐼! We received your request..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewRuleModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add Team Member Modal */}
      {isNewTeamModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span>Add Team Member & Assign Role</span>
              </h3>
              <button onClick={() => setIsNewTeamModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTeamMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Jason Thorne"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Work Email</label>
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="jason@growthlabs.io"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Role & Permission Tier</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as TeamRole)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Agent">Agent (Respond to assigned chats)</option>
                  <option value="Manager">Manager (Assign chats & view analytics)</option>
                  <option value="Admin">Admin (Full system control & API keys)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTeamModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-600/30"
                >
                  Add Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
