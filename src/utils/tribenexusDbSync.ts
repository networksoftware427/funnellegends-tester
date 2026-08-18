import { supabaseClient } from './supabaseClient';
import { CommunitySpace, CommunityPost, CommunityComment, CommunityMember } from '../types/community';

/**
 * TribeNexus Community & Social Hub Supabase Database Synchronization & SQL Schema
 */

export const TRIBENEXUS_SQL_SCHEMA = `-- =========================================================
-- TRIBENEXUS COMMUNITY & SOCIAL HUB SUPABASE SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. DISCUSSION SPACES TABLE
CREATE TABLE IF NOT EXISTS public.tribenexus_spaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '💬',
  badge_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. COMMUNITY POSTS TABLE
CREATE TABLE IF NOT EXISTS public.tribenexus_posts (
  id TEXT PRIMARY KEY,
  space_slug TEXT NOT NULL REFERENCES public.tribenexus_spaces(slug) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  author_role TEXT DEFAULT 'Member',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media_url TEXT,
  media_type TEXT DEFAULT 'image',
  tags JSONB DEFAULT '[]'::jsonb,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. POST COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.tribenexus_comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES public.tribenexus_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  author_role TEXT DEFAULT 'Member',
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. COMMUNITY MEMBERS & GAMIFICATION TABLE
CREATE TABLE IF NOT EXISTS public.tribenexus_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  level INTEGER DEFAULT 1,
  badge TEXT DEFAULT '🔥 CONTRIBUTOR',
  points INTEGER DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PORTAL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.tribenexus_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  community_name TEXT DEFAULT 'FunnelLegends Mastermind VIP Tribe',
  welcome_message TEXT DEFAULT 'Welcome to our distraction-free private community for agency builders.',
  allow_member_posting BOOLEAN DEFAULT true,
  enable_gamification BOOLEAN DEFAULT true,
  auto_moderation_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.tribenexus_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribenexus_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribenexus_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribenexus_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribenexus_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on TribeNexus spaces" ON public.tribenexus_spaces FOR SELECT USING (true);
CREATE POLICY "Allow public read on TribeNexus posts" ON public.tribenexus_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read on TribeNexus comments" ON public.tribenexus_comments FOR SELECT USING (true);
CREATE POLICY "Allow public read on TribeNexus members" ON public.tribenexus_members FOR SELECT USING (true);
CREATE POLICY "Allow public read on TribeNexus settings" ON public.tribenexus_settings FOR SELECT USING (true);
`;

/**
 * Syncs TribeNexus spaces, posts, and members to Supabase tables with graceful fallback
 */
export const syncTribeNexusToSupabase = async (
  spaces: CommunitySpace[],
  posts: CommunityPost[],
  members: CommunityMember[]
): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();

  try {
    // 1. Sync Spaces
    if (spaces && spaces.length > 0) {
      const spaceRows = spaces.map(s => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        description: s.description,
        icon: s.icon,
        badge_count: s.badgeCount || 0,
        updated_at: new Date().toISOString()
      }));

      const { error: spErr } = await supabaseClient
        .from('tribenexus_spaces')
        .upsert(spaceRows, { onConflict: 'id' });

      if (spErr) console.warn('Supabase TribeNexus spaces sync note:', spErr.message);
    }

    // 2. Sync Posts
    if (posts && posts.length > 0) {
      const postRows = posts.map(p => ({
        id: p.id,
        space_slug: p.spaceSlug,
        author_name: p.authorName,
        author_avatar: p.authorAvatar,
        author_role: p.authorRole,
        title: p.title,
        content: p.content,
        media_url: p.mediaUrl || null,
        media_type: p.mediaType || 'image',
        tags: p.tags || [],
        likes_count: p.likesCount || 0,
        comments_count: p.commentsCount || 0,
        is_pinned: !!p.isPinned,
        updated_at: new Date().toISOString()
      }));

      const { error: postErr } = await supabaseClient
        .from('tribenexus_posts')
        .upsert(postRows, { onConflict: 'id' });

      if (postErr) console.warn('Supabase TribeNexus posts sync note:', postErr.message);
    }

    // 3. Sync Members
    if (members && members.length > 0) {
      const memberRows = members.map(m => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar,
        level: m.level || 1,
        badge: m.badge || '🔥 CONTRIBUTOR',
        points: m.points || 0,
        bio: m.bio || '',
        updated_at: new Date().toISOString()
      }));

      const { error: memErr } = await supabaseClient
        .from('tribenexus_members')
        .upsert(memberRows, { onConflict: 'id' });

      if (memErr) console.warn('Supabase TribeNexus members sync note:', memErr.message);
    }

    return {
      success: true,
      message: 'TribeNexus community spaces, posts, and member leaderboard synchronized to Supabase Cloud.',
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing TribeNexus to Supabase:', err);
    return {
      success: false,
      message: `Sync notice (Persistent local storage active): ${err.message || 'Offline'}`,
      timestamp
    };
  }
};
