import React, { useState, useEffect } from 'react';
import { CommunitySpace, CommunityPost, CommunityComment, CommunityMember } from '../../types/community';
import { initialCommunityMembers, loadStoredPosts, saveStoredPosts, loadStoredSpaces, saveStoredSpaces } from '../../utils/communityStorage';
import { 
  Users, MessageSquare, ThumbsUp, Sparkles, Image as ImageIcon, Send, Pin, 
  Search, Plus, Award, ShieldCheck, Flame, ExternalLink, Hash, Heart, Share2, Check
} from 'lucide-react';
interface TribeNexusCommunityProps {
  defaultSpaceSlug?: string;
}

export const TribeNexusCommunity: React.FC<TribeNexusCommunityProps> = ({ defaultSpaceSlug = 'all' }) => {
  const [spaces, setSpaces] = useState<CommunitySpace[]>(loadStoredSpaces());
  const [posts, setPosts] = useState<CommunityPost[]>(loadStoredPosts());
  const [members] = useState<CommunityMember[]>(initialCommunityMembers);
  const [selectedSpaceSlug, setSelectedSpaceSlug] = useState<string>(defaultSpaceSlug);
  
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

  // Persist posts and spaces to localStorage
  useEffect(() => {
    saveStoredPosts(posts);
  }, [posts]);

  useEffect(() => {
    saveStoredSpaces(spaces);
  }, [spaces]);

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

    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      spaceSlug: newPostSpaceSlug,
      authorName: 'Sarah Connor',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      authorRole: 'Mastermind Pro',
      title: newPostTitle,
      content: newPostContent,
      mediaUrl: newPostMediaUrl.trim() || undefined,
      mediaType: 'image',
      tags: [newPostSpaceSlug, 'CommunityPost'],
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

  // Add Comment to Post
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment: CommunityComment = {
      id: `c_${Date.now()}`,
      authorName: 'Sarah Connor',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      authorRole: 'Mastermind Pro',
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

  // Filter posts by space
  const filteredPosts = posts.filter(p => selectedSpaceSlug === 'all' || p.spaceSlug === selectedSpaceSlug);

  return (
    <div className="flex-1 bg-gray-50 text-gray-900 overflow-y-auto flex flex-col">
      {/* Top Header */}
      <div className="bg-green-600 backdrop-blur-md border-b border-green-700 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-500 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-600/40">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">TribeNexus</h1>
              <span className="text-[10px] uppercase font-mono font-bold bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded">
                Distraction-Free Community App
              </span>
            </div>
            <p className="text-xs text-green-100 mt-0.5">Distraction-free social spaces, multimedia post sharing, and mastermind discussions.</p>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => { setIsCreatingSpace(!isCreatingSpace); setIsCreatingPost(false); }}
            className="px-5 py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-green-900/30 flex items-center gap-2 transition-colors border border-green-700"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreatingSpace ? 'Cancel Space' : 'Create Space'}</span>
          </button>

          <button 
            onClick={() => { setIsCreatingPost(!isCreatingPost); setIsCreatingSpace(false); }}
            className="px-5 py-2.5 bg-white hover:bg-gray-50 text-green-700 rounded-xl text-xs font-extrabold shadow-lg shadow-green-600/30 flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreatingPost ? 'Close Post Editor' : 'Create New Community Post'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 max-w-7xl mx-auto w-full">

      {/* OFFICIAL REQUIRED NOTICE BANNER */}
      <div className="p-4 bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 rounded-2xl mb-6 space-y-1.5 shadow-xl shrink-0">
        <div className="flex items-center gap-2 text-purple-300 font-extrabold text-xs">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>TribeNexus Distraction-Free Community Engine Active</span>
        </div>
        <p className="text-xs text-purple-200/90 leading-relaxed font-medium">
          Create community where members connect, learn, and get inspired daily. With the Community App, you can create beautifully organized spaces for discussions, share multimedia content, and foster meaningful relationships. Organize discussions into focused groups and topics, enable rich media sharing, and keep conversations flowing naturally. members will love having a space where they can truly connect without distractions or algorithms getting in the way.
        </p>
      </div>

      {postSuccessToast && (
        <div className="p-3 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 mb-6 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{postSuccessToast}</span>
        </div>
      )}

      {/* CREATE NEW SPACE COMPOSER */}
      {isCreatingSpace && (
        <form onSubmit={handleCreateSpace} className="p-6 bg-slate-900 border border-emerald-500/50 rounded-3xl mb-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              Create a New Community Space
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">ORGANIZE YOUR TRIBE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Space Name</label>
              <input 
                type="text"
                placeholder="e.g. 📢 Announcements"
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">URL Slug</label>
              <input 
                type="text"
                placeholder="e.g. announcements"
                value={newSpaceSlug}
                onChange={(e) => setNewSpaceSlug(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-300 block mb-1">Description</label>
              <input 
                type="text"
                placeholder="What is this space for?"
                value={newSpaceDesc}
                onChange={(e) => setNewSpaceDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Icon (Emoji)</label>
              <input 
                type="text"
                placeholder="💬"
                value={newSpaceIcon}
                onChange={(e) => setNewSpaceIcon(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button 
              type="button" 
              onClick={() => setIsCreatingSpace(false)}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 text-xs font-bold rounded-xl border border-slate-800"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold rounded-xl shadow-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Space</span>
            </button>
          </div>
        </form>
      )}

      {/* CREATE NEW POST COMPOSER */}
      {isCreatingPost && (
        <form onSubmit={handleCreatePost} className="p-6 bg-slate-900 border border-purple-500/50 rounded-3xl mb-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Share Rich Post or Media with Tribe
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">DISTRACTION-FREE POSTING</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-300 block mb-1">Post Title</label>
              <input 
                type="text"
                placeholder="e.g. Just Hit $10k Monthly Recurring Revenue! Key Takeaways inside..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Select Space Topic</label>
              <select 
                value={newPostSpaceSlug}
                onChange={(e) => setNewPostSpaceSlug(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                {spaces.map(s => <option key={s.id} value={s.slug}>{s.icon} #{s.slug}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Post Content & Insights</label>
            <textarea 
              rows={4}
              placeholder="Write your detailed post breakdown, strategy, or question for the mastermind community..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Attach Media Image URL (Optional)</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
              <ImageIcon className="w-4 h-4 text-purple-400 shrink-0" />
              <input 
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={newPostMediaUrl}
                onChange={(e) => setNewPostMediaUrl(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button 
              type="button" 
              onClick={() => setIsCreatingPost(false)}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 text-xs font-bold rounded-xl border border-slate-800"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold rounded-xl shadow-lg flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post to Community</span>
            </button>
          </div>
        </form>
      )}

      {/* MAIN COMMUNITY DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT COLUMN: SPACES & TOPICS NAVIGATION */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase text-slate-300 flex items-center gap-2">
                <Hash className="w-4 h-4 text-purple-400" />
                Discussion Spaces ({spaces.length})
              </h3>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">TOPICS</span>
            </div>

            <div className="space-y-1.5">
              <button 
                onClick={() => setSelectedSpaceSlug('all')}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${selectedSpaceSlug === 'all' ? 'bg-purple-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'}`}
              >
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>All Spaces & Feeds</span>
                </div>
                <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-300">{posts.length}</span>
              </button>

              {spaces.map((sp) => (
                <button 
                  key={sp.id}
                  onClick={() => setSelectedSpaceSlug(sp.slug)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${selectedSpaceSlug === sp.slug ? 'bg-purple-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'}`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{sp.icon}</span>
                    <span className="truncate">#{sp.slug}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-300">{sp.badgeCount}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: MULTIMEDIA POST FEED */}
        <div className="lg:col-span-2 space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-xs text-slate-500">
              No posts found in this space topic. Click "Create New Community Post" above to start the conversation!
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="p-6 bg-slate-900 border border-slate-800 hover:border-purple-500/40 rounded-3xl space-y-4 shadow-xl transition-all">
                {/* Author Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover border-2 border-purple-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-white">{post.authorName}</span>
                        <span className="text-[9px] font-mono font-bold bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">{post.authorRole}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{post.createdAt} • #{post.spaceSlug}</span>
                    </div>
                  </div>

                  {post.isPinned && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800">
                      <Pin className="w-3 h-3 fill-amber-400" />
                      <span>PINNED POST</span>
                    </span>
                  )}
                </div>

                {/* Post Body */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{post.content}</p>
                </div>

                {/* Attached Media Card */}
                {post.mediaUrl && (
                  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                    <img src={post.mediaUrl} alt="Attached Media" className="w-full max-h-80 object-cover" />
                  </div>
                )}

                {/* Interaction Footer Bar */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleUpvotePost(post.id)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-purple-950 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-800 rounded-xl font-extrabold flex items-center gap-1.5 transition-all"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-purple-400" />
                      <span>{post.likesCount} Upvotes</span>
                    </button>

                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{post.commentsCount} Comments</span>
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {post.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">#{t}</span>
                    ))}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 pt-4">
                  <div className="space-y-2.5">
                    {post.comments.map(c => (
                      <div key={c.id} className="flex items-start gap-2.5 text-xs p-2.5 bg-slate-900 rounded-xl border border-slate-800/60">
                        <img src={c.authorAvatar} alt={c.authorName} className="w-7 h-7 rounded-full object-cover border border-purple-500 shrink-0" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-[11px]">{c.authorName}</span>
                            <span className="text-[9px] text-slate-500 font-mono">{c.createdAt}</span>
                          </div>
                          <p className="text-slate-300 text-xs">{c.content}</p>
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
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow"
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

        {/* RIGHT COLUMN: VIP LEADERBOARD & MEMBERS */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase text-slate-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                VIP Member Roster ({members.length})
              </h3>
              <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">LEADERBOARD</span>
            </div>

            <div className="space-y-3">
              {members.map(m => (
                <div key={m.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover border-2 border-amber-500" />
                    <div>
                      <div className="font-bold text-xs text-white">{m.name}</div>
                      <span className="text-[9px] font-mono font-bold text-amber-400">{m.badge}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{m.bio}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-purple-300 pt-1 border-t border-slate-900">
                    <span>Level {m.level} Member</span>
                    <span>{m.points.toLocaleString()} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
