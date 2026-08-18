import React, { useState, useEffect } from 'react';
import { CommunitySpace, CommunityPost, CommunityComment, CommunityMember } from '../../types/community';
import { 
  initialCommunityMembers, initialCommunitySpaces, initialCommunityPosts,
  loadStoredPosts, saveStoredPosts, 
  loadStoredSpaces, saveStoredSpaces,
  loadStoredMembers, saveStoredMembers,
  resetTribeNexusStorageToDefaults
} from '../../utils/communityStorage';
import { syncTribeNexusToSupabase, TRIBENEXUS_SQL_SCHEMA } from '../../utils/tribenexusDbSync';
import { 
  Users, MessageSquare, ThumbsUp, Sparkles, Image as ImageIcon, Send, Pin, 
  Search, Plus, Award, ShieldCheck, Flame, ExternalLink, Hash, Heart, Share2, Check,
  Zap, Database, RefreshCw, Trash2, Edit3, CheckCheck, Terminal, Copy, Globe,
  Activity, Crown, Star, Smartphone, Sliders, Settings, Radio, ChevronRight,
  TrendingUp, BarChart2, RefreshCcw, X, CheckCircle2
} from 'lucide-react';

interface TribeNexusCommunityProps {
  defaultSpaceSlug?: string;
}

export const TribeNexusCommunity: React.FC<TribeNexusCommunityProps> = ({ defaultSpaceSlug = 'all' }) => {
  const [spaces, setSpaces] = useState<CommunitySpace[]>(loadStoredSpaces());
  const [posts, setPosts] = useState<CommunityPost[]>(loadStoredPosts());
  const [members, setMembers] = useState<CommunityMember[]>(loadStoredMembers());
  const [selectedSpaceSlug, setSelectedSpaceSlug] = useState<string>(defaultSpaceSlug);

  // Active Main Sub-Tab
  const [activeTab, setActiveTab] = useState<'feed' | 'spaces' | 'leaderboard' | 'settings'>('feed');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  // New Post Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMediaUrl, setNewPostMediaUrl] = useState('');
  const [newPostSpaceSlug, setNewPostSpaceSlug] = useState('general-lounge');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postSuccessToast, setPostSuccessToast] = useState<string | null>(null);

  // New Comment Form State (per post)
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // New Space Form State
  const [isCreatingSpace, setIsCreatingSpace] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [newSpaceSlug, setNewSpaceSlug] = useState('');
  const [newSpaceDesc, setNewSpaceDesc] = useState('');
  const [newSpaceIcon, setNewSpaceIcon] = useState('💬');

  // Supabase Sync Status
  const [dbSyncStatus, setDbSyncStatus] = useState<{ success: boolean; message: string; timestamp: string } | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Persist state
  useEffect(() => { saveStoredPosts(posts); }, [posts]);
  useEffect(() => { saveStoredSpaces(spaces); }, [spaces]);
  useEffect(() => { saveStoredMembers(members); }, [members]);

  // Create New Space
  const handleCreateSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpaceName.trim() || !newSpaceSlug.trim()) {
      alert('Please fill in both a space name and slug.');
      return;
    }
    const newSpace: CommunitySpace = {
      id: `sp_${Date.now()}`,
      name: newSpaceName,
      slug: newSpaceSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      description: newSpaceDesc,
      icon: newSpaceIcon,
      badgeCount: 0
    };
    setSpaces([...spaces, newSpace]);
    setNewSpaceName('');
    setNewSpaceSlug('');
    setNewSpaceDesc('');
    setIsCreatingSpace(false);
    setPostSuccessToast('🎉 New Community Space Created!');
    setTimeout(() => setPostSuccessToast(null), 3000);
  };

  // Create New Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Please fill in both a post title and content.');
      return;
    }

    const currentMember = members[0] || { name: 'Sarah Connor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', badge: '🔥 TOP CONTRIBUTOR' };

    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      spaceSlug: newPostSpaceSlug,
      authorName: currentMember.name,
      authorAvatar: currentMember.avatar,
      authorRole: currentMember.badge,
      title: newPostTitle,
      content: newPostContent,
      mediaUrl: newPostMediaUrl.trim() || undefined,
      mediaType: 'image',
      tags: [newPostSpaceSlug, 'Mastermind'],
      likesCount: 1,
      commentsCount: 0,
      comments: [],
      createdAt: 'Just now'
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostMediaUrl('');
    setIsCreatingPost(false);
    setPostSuccessToast('🎉 Published to TribeNexus Community!');
    setTimeout(() => setPostSuccessToast(null), 3000);
  };

  // Upvote Post
  const handleUpvotePost = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, likesCount: p.likesCount + 1 };
      }
      return p;
    });
    setPosts(updated);
  };

  // Toggle Pin Post
  const handleTogglePinPost = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, isPinned: !p.isPinned };
      }
      return p;
    });
    setPosts(updated);
  };

  // Delete Post
  const handleDeletePost = (postId: string) => {
    if (confirm('Delete this community post?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  // Add Comment to Post
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const currentMember = members[0] || { name: 'Sarah Connor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', badge: '🔥 TOP CONTRIBUTOR' };

    const newComment: CommunityComment = {
      id: `c_${Date.now()}`,
      authorName: currentMember.name,
      authorAvatar: currentMember.avatar,
      authorRole: currentMember.badge,
      content: text,
      createdAt: 'Just now',
      likesCount: 0
    };

    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });

    setPosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  // ── SUPABASE SYNC TRIGGER ──
  const handleTriggerSupabaseSync = async () => {
    setIsSyncingDb(true);
    const res = await syncTribeNexusToSupabase(spaces, posts, members);
    setDbSyncStatus(res);
    setIsSyncingDb(false);
  };

  // Factory Reset
  const handleResetDefaults = () => {
    if (confirm('Reset TribeNexus posts, spaces, and member leaderboard back to default demo state?')) {
      resetTribeNexusStorageToDefaults();
      setSpaces(loadStoredSpaces());
      setPosts(loadStoredPosts());
      setMembers(loadStoredMembers());
      alert('TribeNexus community reset to factory demo state.');
    }
  };

  // Filter posts by space and search query
  const filteredPosts = posts.filter(p => {
    const matchesSpace = selectedSpaceSlug === 'all' || p.spaceSlug === selectedSpaceSlug;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpace && matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      {/* ── TOP TRIBENEXUS BRAND HEADER ── */}
      <div 
        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <Users className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                TribeNexus
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3 h-3 text-amber-300 fill-amber-300" />
                Distraction-Free Community Portal
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">Topic-focused spaces, multimedia post feeds, mastermind Q&A, and gamified XP leaderboards.</p>
          </div>
        </div>

        {/* Action Header Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => { setIsCreatingSpace(true); setIsCreatingPost(false); }}
            className="px-3.5 py-2 bg-emerald-950/40 hover:bg-emerald-950/60 text-white border border-emerald-400/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            <span>Create Space</span>
          </button>

          <button 
            onClick={() => { setIsCreatingPost(true); setIsCreatingSpace(false); }}
            className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>New Post</span>
          </button>

          <button 
            onClick={handleResetDefaults}
            className="p-2 bg-white/10 hover:bg-rose-500/30 text-white hover:text-rose-200 border border-white/20 rounded-xl text-xs transition-all"
            title="Reset to Demo State"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── SECONDARY TAB NAVIGATION ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'feed' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Community Feed ({posts.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('spaces')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'spaces' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Hash className="w-4 h-4" />
          <span>Discussion Spaces ({spaces.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('leaderboard')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'leaderboard' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Award className="w-4 h-4 text-amber-500" />
          <span>VIP Leaderboard & XP ({members.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Portal Settings</span>
        </button>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {postSuccessToast && (
        <div className="mx-6 mt-4 p-4 bg-emerald-900 text-white border-2 border-emerald-400 rounded-2xl flex items-center justify-between shadow-2xl animate-fade-in text-xs font-bold">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>{postSuccessToast}</span>
          </div>
          <button onClick={() => setPostSuccessToast(null)} className="text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── MAIN CONTENT DISPLAY ── */}
      <div className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">

        {/* ── TAB 1: COMMUNITY FEED ── */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Search & Space Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Search posts by keyword, author, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button 
                  onClick={() => setSelectedSpaceSlug('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${selectedSpaceSlug === 'all' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'}`}
                >
                  🌐 All Topics ({posts.length})
                </button>
                {spaces.map(sp => (
                  <button 
                    key={sp.id}
                    onClick={() => setSelectedSpaceSlug(sp.slug)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${selectedSpaceSlug === sp.slug ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'}`}
                  >
                    {sp.icon} #{sp.slug}
                  </button>
                ))}
              </div>
            </div>

            {/* FEED LAYOUT WITH SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column: Discussion Spaces */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-xs font-black uppercase text-slate-700 flex items-center gap-2">
                      <Hash className="w-4 h-4 text-emerald-600" />
                      Discussion Spaces
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">TOPICS</span>
                  </div>

                  <div className="space-y-1.5">
                    <button 
                      onClick={() => setSelectedSpaceSlug('all')}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${selectedSpaceSlug === 'all' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>🌐</span>
                        <span>All Spaces & Feeds</span>
                      </div>
                      <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded text-slate-900 font-bold">{posts.length}</span>
                    </button>

                    {spaces.map(sp => (
                      <button 
                        key={sp.id}
                        onClick={() => setSelectedSpaceSlug(sp.slug)}
                        className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${selectedSpaceSlug === sp.slug ? 'bg-emerald-600 text-white shadow' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span>{sp.icon}</span>
                          <span className="truncate">#{sp.slug}</span>
                        </div>
                        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded text-slate-900 font-bold">{sp.badgeCount}</span>
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setIsCreatingSpace(true)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Create Custom Space</span>
                  </button>
                </div>
              </div>

              {/* Center Column: Posts Feed */}
              <div className="lg:col-span-2 space-y-6">
                {filteredPosts.length === 0 ? (
                  <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-xs text-slate-500 shadow-sm">
                    No posts found in this space. Click "New Post" to start a discussion!
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <div key={post.id} className="p-6 bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl space-y-4 shadow-sm transition-all">
                      {/* Author Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{post.authorName}</span>
                              <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">{post.authorRole}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">{post.createdAt} • #{post.spaceSlug}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {post.isPinned && (
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                              <Pin className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>PINNED</span>
                            </span>
                          )}

                          <button 
                            onClick={() => handleTogglePinPost(post.id)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-slate-50"
                            title="Toggle Pin"
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>

                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                            title="Delete Post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Post Body */}
                      <div className="space-y-2">
                        <h3 className="text-base font-black text-slate-900 leading-snug">{post.title}</h3>
                        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{post.content}</p>
                      </div>

                      {/* Attached Media Card */}
                      {post.mediaUrl && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                          <img src={post.mediaUrl} alt="Attached Media" className="w-full max-h-80 object-cover" />
                        </div>
                      )}

                      {/* Interaction Footer Bar */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleUpvotePost(post.id)}
                            className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-xl font-bold flex items-center gap-1.5 transition-all"
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{post.likesCount} Upvotes</span>
                          </button>

                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                            <span>{post.commentsCount} Comments</span>
                          </span>
                        </div>

                        <div className="flex gap-1">
                          {post.tags.map(t => (
                            <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">#{t}</span>
                          ))}
                        </div>
                      </div>

                      {/* Comments Thread */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 pt-4">
                        <div className="space-y-2.5">
                          {post.comments.map(c => (
                            <div key={c.id} className="flex items-start gap-2.5 text-xs p-2.5 bg-white rounded-xl border border-slate-200">
                              <img src={c.authorAvatar} alt={c.authorName} className="w-7 h-7 rounded-full object-cover border border-emerald-400 shrink-0" />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-slate-900 text-[11px]">{c.authorName}</span>
                                  <span className="text-[9px] text-slate-400 font-mono">{c.createdAt}</span>
                                </div>
                                <p className="text-slate-700 text-xs">{c.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex gap-2 pt-2">
                          <input 
                            type="text" 
                            placeholder="Write a response to join the discussion..."
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                          />
                          <button 
                            onClick={() => handleAddComment(post.id)}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Right Column: Leaderboard Summary */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-xs font-black uppercase text-slate-700 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-500" />
                      VIP Leaderboard
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">XP RANKS</span>
                  </div>

                  <div className="space-y-3">
                    {members.slice(0, 4).map(m => (
                      <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex items-center gap-3">
                          <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500" />
                          <div>
                            <div className="font-bold text-xs text-slate-900">{m.name}</div>
                            <span className="text-[9px] font-mono font-bold text-emerald-800">{m.badge}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">{m.bio}</p>
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-800 pt-1 border-t border-slate-200">
                          <span>Level {m.level} Member</span>
                          <span>{m.points.toLocaleString()} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setActiveTab('leaderboard')}
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center justify-center gap-1.5"
                  >
                    <span>View Full VIP Roster</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: DISCUSSION SPACES ── */}
        {activeTab === 'spaces' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Discussion Spaces & Topic Channels</h3>
                <p className="text-xs text-slate-500">Segment mastermind discussions into clean, distraction-free topics.</p>
              </div>

              <button 
                onClick={() => setIsCreatingSpace(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Space</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaces.map(sp => (
                <div key={sp.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{sp.icon}</span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                        #{sp.slug}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900">{sp.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{sp.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">{posts.filter(p => p.spaceSlug === sp.slug).length} Posts</span>
                    <button 
                      onClick={() => { setSelectedSpaceSlug(sp.slug); setActiveTab('feed'); }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <span>Open Space</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: VIP LEADERBOARD & GAMIFICATION ── */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">VIP Gamification & Member Leaderboard</h3>
                <p className="text-xs text-slate-500">Reward top contributors, sales breakthrough sharers, and mastermind leaders with automated XP levels.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((m, idx) => (
                <div key={m.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-lg font-black font-mono text-slate-300">
                    #{idx + 1}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
                      <div>
                        <h4 className="text-base font-black text-slate-900">{m.name}</h4>
                        <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {m.badge}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{m.bio}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                      <span>Level {m.level} Member</span>
                      <span>{m.points.toLocaleString()} XP Points</span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" 
                        style={{ width: `${Math.min(100, ((m.points % 1000) / 1000) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ── TAB 5: PORTAL SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-black text-slate-900">TribeNexus Portal Settings</h3>
              <p className="text-xs text-slate-500">Manage community rules, gamification point thresholds, and moderation filters.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <label className="text-xs font-bold text-slate-700 block">Community Portal Name</label>
                <input 
                  type="text"
                  defaultValue="FunnelLegends Mastermind VIP Tribe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                />
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Enable Member Gamification & XP</h4>
                  <p className="text-xs text-slate-500">Award XP badges and rank members automatically based on contributions.</p>
                </div>
                <input 
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Allow Direct Member Multimedia Uploads</h4>
                  <p className="text-xs text-slate-500">Allow community members to attach screenshot images and video teardowns.</p>
                </div>
                <input 
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── MODAL 1: CREATE NEW SPACE ── */}
      {isCreatingSpace && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateSpace} className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                Create Discussion Space
              </h3>
              <button type="button" onClick={() => setIsCreatingSpace(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Space Name</label>
                <input 
                  type="text"
                  placeholder="e.g. 📢 Announcements"
                  value={newSpaceName}
                  onChange={(e) => setNewSpaceName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL Slug</label>
                <input 
                  type="text"
                  placeholder="e.g. announcements"
                  value={newSpaceSlug}
                  onChange={(e) => setNewSpaceSlug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input 
                  type="text"
                  placeholder="What is this space for?"
                  value={newSpaceDesc}
                  onChange={(e) => setNewSpaceDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Icon (Emoji)</label>
                <input 
                  type="text"
                  placeholder="💬"
                  value={newSpaceIcon}
                  onChange={(e) => setNewSpaceIcon(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
              >
                Create Space
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── MODAL 2: CREATE NEW POST ── */}
      {isCreatingPost && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreatePost} className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Create New Community Post
              </h3>
              <button type="button" onClick={() => setIsCreatingPost(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Post Title</label>
                  <input 
                    type="text"
                    placeholder="e.g. Just Hit $10k MRR! Key takeaways..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topic Space</label>
                  <select 
                    value={newPostSpaceSlug}
                    onChange={(e) => setNewPostSpaceSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                  >
                    {spaces.map(s => <option key={s.id} value={s.slug}>{s.icon} #{s.slug}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Content & Insights</label>
                <textarea 
                  rows={4}
                  placeholder="Share your detailed breakdown, question, or win..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Attach Image URL (Optional)</label>
                <input 
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newPostMediaUrl}
                  onChange={(e) => setNewPostMediaUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
