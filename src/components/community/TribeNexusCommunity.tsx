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
  const [activeTab, setActiveTab] = useState<'feed' | 'spaces' | 'leaderboard' | 'simulations' | 'database' | 'settings'>('feed');

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

  // ── SIMULATION ENGINE STATES ──
  const [simAuthorId, setSimAuthorId] = useState(members[0]?.id || 'm_1');
  const [simSpaceSlug, setSimSpaceSlug] = useState('wins-of-the-day');
  const [simPostTitle, setSimPostTitle] = useState('🔥 Generated 42 High-Ticket Strategy Bookings in 48 Hours!');
  const [simPostContent, setSimPostContent] = useState('Plugged in the ChronoChimp 2-step scheduler at the end of our VSL and our show-up rate jumped from 68% to 94%! Highly recommend using SMS automated reminders.');
  const [simMediaUrl, setSimMediaUrl] = useState('https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80');
  const [simAutoEngage, setSimAutoEngage] = useState(true);
  const [isSimulatingPost, setIsSimulatingPost] = useState(false);
  const [simToast, setSimToast] = useState<string | null>(null);

  // Gamification XP Simulation
  const [xpSimMemberId, setXpSimMemberId] = useState(members[0]?.id || 'm_1');
  const [xpSimActionType, setXpSimActionType] = useState<'win_share' | 'post' | 'coach_reply' | 'order_bump'>('win_share');
  const [xpSimFeedback, setXpSimFeedback] = useState<string | null>(null);

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

  // ── SIMULATION 1: LIVE POST & AUTO-ENGAGEMENT CASCADE ──
  const handleSimulatePostWithEngagement = () => {
    if (!simPostTitle.trim() || !simPostContent.trim()) {
      alert('Please provide post title and content.');
      return;
    }

    setIsSimulatingPost(true);

    setTimeout(() => {
      const selectedMember = members.find(m => m.id === simAuthorId) || members[0];
      const coachMember = members.find(m => m.id !== simAuthorId) || members[1];

      const newSimPost: CommunityPost = {
        id: `post_sim_${Date.now()}`,
        spaceSlug: simSpaceSlug,
        authorName: selectedMember.name,
        authorAvatar: selectedMember.avatar,
        authorRole: selectedMember.badge,
        title: simPostTitle,
        content: simPostContent,
        mediaUrl: simMediaUrl.trim() || undefined,
        mediaType: 'image',
        tags: [simSpaceSlug, 'VerifiedBreakthrough'],
        likesCount: simAutoEngage ? 6 : 1,
        commentsCount: simAutoEngage ? 1 : 0,
        comments: simAutoEngage ? [
          {
            id: `c_coach_${Date.now()}`,
            authorName: coachMember.name,
            authorAvatar: coachMember.avatar,
            authorRole: coachMember.badge,
            content: '🎯 Exceptional execution! That jump in show-up rate directly validates the multi-channel SMS automation playbook. Keep crushing it!',
            createdAt: 'Just now',
            likesCount: 3
          }
        ] : [],
        createdAt: 'Just now',
        isPinned: false
      };

      // Award XP to author
      const updatedMembers = members.map(m => m.id === selectedMember.id ? {
        ...m,
        points: m.points + (simAutoEngage ? 120 : 50)
      } : m);

      setMembers(updatedMembers);
      setPosts([newSimPost, ...posts]);
      setIsSimulatingPost(false);
      setSimToast(`🎉 Post simulated from ${selectedMember.name}! +${simAutoEngage ? '120' : '50'} XP awarded & auto-engagement fired!`);
      setTimeout(() => setSimToast(null), 5000);
    }, 600);
  };

  // ── SIMULATION 2: GAMIFICATION XP & LEVEL UP ──
  const handleSimulateXpAward = () => {
    const target = members.find(m => m.id === xpSimMemberId) || members[0];
    const pointsToAdd = xpSimActionType === 'win_share' ? 150 :
                        xpSimActionType === 'coach_reply' ? 75 :
                        xpSimActionType === 'order_bump' ? 200 : 50;

    const newPoints = target.points + pointsToAdd;
    const newLevel = Math.floor(newPoints / 1000) + 1;
    const levelUp = newLevel > target.level;

    const updated = members.map(m => m.id === target.id ? {
      ...m,
      points: newPoints,
      level: newLevel,
      badge: newLevel >= 10 ? '👑 VIP FOUNDER' : newLevel >= 7 ? '🔥 MASTERMIND ELITE' : newLevel >= 4 ? '⚡ FUNNEL ARCHITECT' : '🔥 CONTRIBUTOR'
    } : m);

    // Sort leaderboard by points descending
    updated.sort((a, b) => b.points - a.points);
    setMembers(updated);

    setXpSimFeedback(`🏆 Awarded +${pointsToAdd} XP to ${target.name}! Total: ${newPoints.toLocaleString()} XP ${levelUp ? `(🎉 LEVELED UP TO LEVEL ${newLevel}!)` : ''}`);
    setTimeout(() => setXpSimFeedback(null), 5000);
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
            onClick={() => setActiveTab('simulations')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${activeTab === 'simulations' ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20 font-black' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>⚡ Fun Simulations</span>
          </button>

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
          onClick={() => setActiveTab('simulations')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'simulations' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/25 font-black' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'}`}
        >
          <Zap className="w-4 h-4 fill-amber-500" />
          <span>Simulations & Workflows</span>
        </button>

        <button 
          onClick={() => setActiveTab('database')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Database className="w-4 h-4" />
          <span>Database & Schema</span>
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
      {(postSuccessToast || simToast) && (
        <div className="mx-6 mt-4 p-4 bg-emerald-900 text-white border-2 border-emerald-400 rounded-2xl flex items-center justify-between shadow-2xl animate-fade-in text-xs font-bold">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>{postSuccessToast || simToast}</span>
          </div>
          <button onClick={() => { setPostSuccessToast(null); setSimToast(null); }} className="text-emerald-300 hover:text-white">
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
                    No posts found in this space. Click "New Post" or launch a simulation!
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

              <button 
                onClick={() => setActiveTab('simulations')}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-xl text-xs shadow-md shadow-amber-500/20 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Simulate XP Point Level-Up</span>
              </button>
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

        {/* ── TAB 4: FUN SIMULATIONS & WORKFLOWS ENGINE ── */}
        {activeTab === 'simulations' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-black font-mono flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-4 h-4 fill-slate-950" /> TRIBENEXUS SANDBOX
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                TribeNexus Community & Gamification Simulations
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed">
                Test rich post creation with simulated mastermind auto-engagement, peer feedback cascades, gamified XP leveling, and automated funnel community gates.
              </p>
            </div>

            {/* SIMULATION 1: LIVE POST & AUTO-ENGAGEMENT */}
            <div className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">Simulation 1: Live Post & Mastermind Auto-Engagement Cascade</h4>
                    <p className="text-xs text-slate-500">Publish a breakthrough or question and trigger instant simulated upvotes, coach feedback, and XP rewards.</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  REAL-TIME FEED SYNC
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Post Author</label>
                  <select 
                    value={simAuthorId}
                    onChange={(e) => setSimAuthorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold"
                  >
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.badge})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Space</label>
                  <select 
                    value={simSpaceSlug}
                    onChange={(e) => setSimSpaceSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold"
                  >
                    {spaces.map(s => (
                      <option key={s.id} value={s.slug}>{s.icon} #{s.slug}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input 
                      type="checkbox"
                      checked={simAutoEngage}
                      onChange={(e) => setSimAutoEngage(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-0 accent-emerald-600"
                    />
                    <span>Trigger Auto-Upvotes (+5) & AI Coach Reply</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Post Title</label>
                  <input 
                    type="text"
                    value={simPostTitle}
                    onChange={(e) => setSimPostTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Post Content</label>
                  <textarea 
                    rows={3}
                    value={simPostContent}
                    onChange={(e) => setSimPostContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>

              <button 
                onClick={handleSimulatePostWithEngagement}
                disabled={isSimulatingPost}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                {isSimulatingPost ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5 animate-spin" />
                    Publishing Post & Firing Auto-Engagement Cascade...
                  </span>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-white" />
                    <span>SIMULATE COMMUNITY POST & TRIGGER ENGAGEMENT CASCADE →</span>
                  </>
                )}
              </button>
            </div>

            {/* SIMULATION 2: GAMIFICATION XP & LEVEL UP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="text-base font-black text-slate-900">Simulation 2: Gamification XP & Level-Up Simulator</h4>
                </div>
                <p className="text-xs text-slate-500">Test awarding gamification points for community actions and triggering level-up badge rewards.</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Member</label>
                    <select 
                      value={xpSimMemberId}
                      onChange={(e) => setXpSimMemberId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                    >
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.name} - Level {m.level} ({m.points.toLocaleString()} XP)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Simulated Action</label>
                    <select 
                      value={xpSimActionType}
                      onChange={(e) => setXpSimActionType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                    >
                      <option value="win_share">🏆 Share Sales Milestone / Breakthrough (+150 XP)</option>
                      <option value="coach_reply">🎓 Helpful Mastermind Feedback (+75 XP)</option>
                      <option value="order_bump">⚡ Order Bump Optimization Winner (+200 XP)</option>
                      <option value="post">💬 General Discussion Contribution (+50 XP)</option>
                    </select>
                  </div>

                  <button 
                    onClick={handleSimulateXpAward}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-black rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 fill-slate-950" />
                    <span>Award XP Points & Simulate Level-Up</span>
                  </button>

                  {xpSimFeedback && (
                    <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 font-bold animate-fade-in text-xs">
                      {xpSimFeedback}
                    </div>
                  )}
                </div>
              </div>

              {/* SIMULATION 3: COMMUNITY ACCESS & FUNNEL GATE */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">Simulation 3: Funnel Community Gate</h4>
                </div>
                <p className="text-xs text-slate-500">Simulate granting instant community portal access when a buyer completes a funnel checkout.</p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-800">
                    <span>Funnel Hook: 1-Click Mastermind Enrollment</span>
                    <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded text-[10px]">WEBHOOK READY</span>
                  </div>
                  <p className="text-slate-600">
                    When customer signs up via FunnelLegends checkout, TribeNexus automatically creates their member profile, assigns initial 500 Welcome XP, and unlocks private discussion spaces.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    const newGuest: CommunityMember = {
                      id: `m_guest_${Date.now()}`,
                      name: 'Jonathan Hayes',
                      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
                      level: 1,
                      badge: '⚡ NEW MEMBER',
                      points: 500,
                      bio: 'Enrolled via 1-Click Sales Funnel Checkout.'
                    };
                    setMembers([newGuest, ...members]);
                    alert('🎉 Simulated buyer enrollment! Jonathan Hayes added to TribeNexus with 500 Welcome XP.');
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Simulate 1-Click Funnel Checkout Enrollment</span>
                </button>
              </div>
            </div>

            {/* VISUAL PIPELINE DIAGRAM */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                <div>
                  <h4 className="text-lg font-black text-white" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                    TribeNexus Community Retention Architecture
                  </h4>
                  <p className="text-xs text-slate-400">Automated end-to-end flow from checkout to high-retention mastermind engagement.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center text-xs">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">1</span>
                  <h5 className="font-bold text-emerald-300">Checkout Gate</h5>
                  <p className="text-[11px] text-slate-300">Buyer purchases course or mastermind membership</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">2</span>
                  <h5 className="font-bold text-emerald-300">Auto Onboard</h5>
                  <p className="text-[11px] text-slate-300">Instant member profile creation + 500 Welcome XP</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">3</span>
                  <h5 className="font-bold text-emerald-300">Topic Feeds</h5>
                  <p className="text-[11px] text-slate-300">Join #announcements, #wins, and #funnel-teardowns</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">4</span>
                  <h5 className="font-bold text-teal-300">Peer Feedback</h5>
                  <p className="text-[11px] text-slate-300">Share VSL copy and get feedback from 7-figure mentors</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">5</span>
                  <h5 className="font-bold text-amber-300">XP Level-Up</h5>
                  <p className="text-[11px] text-slate-300">Gamification points unlock VIP Founder badges</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-green-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">6</span>
                  <h5 className="font-bold text-green-300">Zero Churn</h5>
                  <p className="text-[11px] text-slate-300">Active peer network delivers 90%+ monthly retention</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: DATABASE & SCHEMA ── */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Supabase SQL Database & Schema Inspector</h3>
                <p className="text-xs text-slate-500">Inspect database tables, sync state, and copy production SQL migration script.</p>
              </div>

              <button 
                onClick={handleTriggerSupabaseSync}
                disabled={isSyncingDb}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingDb ? 'animate-spin' : ''}`} />
                <span>{isSyncingDb ? 'Syncing to Supabase...' : 'Sync to Supabase Now'}</span>
              </button>
            </div>

            {dbSyncStatus && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${dbSyncStatus.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-amber-50 text-amber-900 border-amber-300'}`}>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>{dbSyncStatus.message}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">{dbSyncStatus.timestamp}</span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Spaces Table</span>
                <div className="text-xl font-black text-slate-900">{spaces.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Posts Table</span>
                <div className="text-xl font-black text-emerald-700">{posts.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Members Table</span>
                <div className="text-xl font-black text-teal-700">{members.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Settings</span>
                <div className="text-xl font-black text-green-700">1 Row (Active)</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">PostgreSQL / Supabase DDL Migration Script</h4>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(TRIBENEXUS_SQL_SCHEMA);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSchema ? 'Copied SQL Script!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs max-h-96 overflow-y-auto">
                <pre>{TRIBENEXUS_SQL_SCHEMA}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: PORTAL SETTINGS ── */}
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
