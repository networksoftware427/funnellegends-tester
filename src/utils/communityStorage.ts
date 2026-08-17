import { CommunitySpace, CommunityPost, CommunityMember } from '../types/community';

export const initialCommunitySpaces: CommunitySpace[] = [
  { id: 'sp_1', name: '📢 Official Announcements', slug: 'announcements', description: 'Mastermind calls, platform updates, and news', icon: '📢', badgeCount: 4 },
  { id: 'sp_2', name: '💬 General Lounge', slug: 'general-lounge', description: 'Connect, network, and chat with fellow members', icon: '💬', badgeCount: 12 },
  { id: 'sp_3', name: '🏆 Wins of the Day', slug: 'wins-of-the-day', description: 'Share sales milestones, screenshots, and breakthroughs', icon: '🏆', badgeCount: 28 },
  { id: 'sp_4', name: '🔬 Funnel Teardowns', slug: 'funnel-teardowns', description: 'Get expert feedback on VSLs, copy, and order bumps', icon: '🔬', badgeCount: 8 },
  { id: 'sp_5', name: '🎓 Masterclass & Q&A', slug: 'ask-a-coach', description: 'Ask coaches 1-on-1 strategy and technical questions', icon: '🎓', badgeCount: 15 }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post_1',
    spaceSlug: 'wins-of-the-day',
    authorName: 'Alex Hormozi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    authorRole: 'Founder & VIP Mentor',
    title: '🚀 Hit $240,000 in 30 Days Using 1-Click Upsells + ChronoChimp Calendar!',
    content: 'Just closed out our monthly metrics! Switching our VSL checkout to include 2-step opt-ins and instant 1-click upsells bumped our average order value from $185 to $412 overnight. Huge shoutout to this community for the feedback!',
    mediaUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    tags: ['WinOfTheDay', '1ClickUpsell', 'HighTicket'],
    likesCount: 142,
    commentsCount: 3,
    createdAt: '2 hours ago',
    isPinned: true,
    comments: [
      { id: 'c_1', authorName: 'Sarah Connor', authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', authorRole: 'Mastermind Pro', content: 'Incredible numbers Alex! Which order bump angle converted best?', createdAt: '1 hour ago', likesCount: 14 },
      { id: 'c_2', authorName: 'Alex Hormozi', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', authorRole: 'Founder & VIP Mentor', content: 'The 30-Day Implementation Workbook bump at $47 had a 42% take rate!', createdAt: '45 mins ago', likesCount: 22 }
    ]
  },
  {
    id: 'post_2',
    spaceSlug: 'funnel-teardowns',
    authorName: 'Sarah Connor',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    authorRole: 'Mastermind Pro',
    title: '🔬 Need Feedback: Headline & VSL Hook for SaaS Offer',
    content: 'Hey tribe! Launching our new agency SaaS template tomorrow. Would love your eyes on the headline hook: "Scale Your Agency Funnels Without Writing Code". Does this hit hard enough or should we emphasize the automated 2-tier affiliate system more?',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    tags: ['Feedback', 'VSLHook', 'SaaS'],
    likesCount: 58,
    commentsCount: 2,
    createdAt: '5 hours ago',
    comments: [
      { id: 'c_3', authorName: 'David Sterling', authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', authorRole: 'Growth Strategist', content: 'Add the 2-tier affiliate angle! Agencies care deeply about referral loops.', createdAt: '3 hours ago', likesCount: 9 }
    ]
  }
];

export const initialCommunityMembers: CommunityMember[] = [
  { id: 'm_1', name: 'Alex Hormozi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', level: 9, badge: '👑 VIP FOUNDER', points: 14250, bio: 'Scaling high ticket sales funnels & mastermind academies.' },
  { id: 'm_2', name: 'Sarah Connor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', level: 6, badge: '🔥 TOP CONTRIBUTOR', points: 6820, bio: 'Building 7-figure SaaS funnels & community ecosystems.' },
  { id: 'm_3', name: 'David Sterling', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', level: 4, badge: '⚡ FUNNEL ARCHITECT', points: 3410, bio: 'Copywriter & ChronoChimp appointment booking strategist.' }
];

const KEYS = {
  POSTS: 'tribenexus_posts_v1',
  SPACES: 'tribenexus_spaces_v1',
  MEMBERS: 'tribenexus_members_v1'
};

export const loadStoredPosts = (): CommunityPost[] => {
  try {
    const raw = localStorage.getItem(KEYS.POSTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading community posts', e);
  }
  return initialCommunityPosts;
};

export const saveStoredPosts = (posts: CommunityPost[]) => {
  try {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving community posts', e);
  }
};

export const loadStoredSpaces = (): CommunitySpace[] => {
  try {
    const raw = localStorage.getItem(KEYS.SPACES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading community spaces', e);
  }
  return initialCommunitySpaces;
};

export const saveStoredSpaces = (spaces: CommunitySpace[]) => {
  try {
    localStorage.setItem(KEYS.SPACES, JSON.stringify(spaces));
  } catch (e) {
    console.error('Error saving community spaces', e);
  }
};
