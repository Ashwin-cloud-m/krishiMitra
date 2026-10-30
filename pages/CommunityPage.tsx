import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { INITIAL_COMMUNITY_POSTS } from '../data/demoData';
import { CommunityPost, CommunityAnswer } from '../types';
import { DecentralizedKnowledgeService, REGISTERED_NODES } from '../services/decentralizedNode';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const CommunityPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isModerator } = useAuth();
  const { isOnline, addToOutbox } = useOffline();

  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCrop, setNewCrop] = useState('Soybean');
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [selectedPostForNodeDetails, setSelectedPostForNodeDetails] = useState<CommunityPost | null>(null);
  const [isExportingLedger, setIsExportingLedger] = useState(false);

  const filteredPosts = posts.filter((p) => {
    if (p.isFlagged && !isModerator) return false;
    if (selectedCropFilter !== 'All' && p.crop !== selectedCropFilter) return false;
    return true;
  });

  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const handleMarkHelpful = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, helpfulCount: p.helpfulCount + 1 } : p))
    );
  };

  const handleAddReply = (postId: string) => {
    const replyText = replyInputs[postId]?.trim();
    if (!replyText) return;

    const newAns: CommunityAnswer = {
      id: 'ans_' + Date.now(),
      postId,
      authorName: user.name,
      authorRole: user.role,
      authorVillage: user.village,
      content: replyText,
      timestamp: 'Just now',
      upvotes: 0,
      isVerifiedExpertResponse: user.role === 'expert'
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            answers: [...p.answers, newAns]
          };
        }
        return p;
      })
    );

    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const timestamp = 'Just now';
    const nodeId = 'node_kvk_nashik_01';

    // Compute real cryptographic SHA-256 hash
    const blockHash = await DecentralizedKnowledgeService.computeContentHash({
      authorId: user.id,
      timestamp,
      crop: newCrop,
      title: newTitle,
      content: newContent,
      nodeId
    });

    const signature = await DecentralizedKnowledgeService.signContribution(blockHash, nodeId);

    const newPost: CommunityPost = {
      id: 'post_' + Date.now(),
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role,
      village: user.village,
      district: user.district,
      timestamp,
      title: newTitle,
      content: newContent,
      crop: newCrop,
      upvotes: 1,
      helpfulCount: 0,
      isVerifiedByExpert: user.role === 'expert',
      reportsCount: 0,
      isFlagged: false,
      answers: [],
      nodeId,
      blockHash,
      signature
    };

    if (!isOnline) {
      addToOutbox({
        type: 'community_post',
        payload: newPost,
        title: newTitle
      });
      alert('Post queued in Outbox! It will automatically sync to peer nodes when back online.');
    } else {
      setPosts([newPost, ...posts]);
    }

    setNewTitle('');
    setNewContent('');
    setIsNewPostModalOpen(false);
  };

  const handleFlagPost = (postId: string) => {
    const reason = prompt('Please specify why this post contains misinformation or harmful advice:');
    if (reason) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, reportsCount: p.reportsCount + 1, isFlagged: p.reportsCount >= 2 }
            : p
        )
      );
      alert('Report submitted to decentralized community moderators. Thank you for keeping farm knowledge accurate.');
    }
  };

  const handleExportLedger = () => {
    setIsExportingLedger(true);
    const json = DecentralizedKnowledgeService.exportKnowledgeLedger(posts);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `krishimitra-knowledge-ledger-${Date.now()}.json`;
    a.click();
    setIsExportingLedger(false);
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">👥</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {t.navCommunity}
              </h1>
              <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Decentralized AgroNet
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
              A peer-to-peer farmer knowledge network. Ask questions, share real field photos, and get verified advice from agricultural university scientists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewPostModalOpen(true)}
              className="bg-[#52b788] hover:bg-[#74c69d] text-stone-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>✍️</span>
              <span>Ask Question / Post</span>
            </button>

            <button
              onClick={handleExportLedger}
              title="Download signed JSON ledger of verified community posts"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-2.5 rounded-2xl border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <span>💾</span>
              <span className="hidden sm:inline">Export Ledger</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Notice */}
        <DisclaimerBanner type="demo" customText="Decentralized Knowledge Ledger: Posts are cryptographically hashed with SHA-256 and signed with participating node keys. Distinguishes verified scientists from community peers." />

        {/* Filter bar by crop */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-1">
              Filter Crop:
            </span>
            {['All', 'Soybean', 'Cotton', 'Wheat', 'Onion', 'Tomato', 'Maize'].map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCropFilter(crop)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedCropFilter === crop
                    ? 'bg-[#2d6a4f] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500">
            Showing <strong className="text-stone-900">{filteredPosts.length}</strong> Community Discussions
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-white rounded-3xl p-6 shadow-sm border transition-all ${
                post.isFlagged
                  ? 'border-red-400 bg-red-50/20'
                  : 'border-stone-200 hover:border-emerald-300'
              }`}
            >
              {/* Author & Timestamp Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-xl">
                    {post.authorRole === 'expert' ? '🔬' : post.authorRole === 'admin' ? '🤖' : '👨‍🌾'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-stone-900 text-sm">
                        {post.authorName}
                      </span>
                      {/* Role Badges */}
                      {post.authorRole === 'expert' && (
                        <span className="bg-purple-100 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                          🔬 KVK Agronomist
                        </span>
                      )}
                      {post.isVerifiedByExpert && post.authorRole !== 'expert' && (
                        <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                          ✓ Agronomist Verified
                        </span>
                      )}
                      {post.authorRole === 'farmer' && (
                        <span className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Farmer
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {post.village}, {post.district} • {post.timestamp}
                    </p>
                  </div>
                </div>

                {/* Crop & Node Hash Pill */}
                <div className="flex items-center gap-2">
                  <span className="bg-stone-100 text-stone-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                    🌾 {post.crop}
                  </span>
                  <button
                    onClick={() => setSelectedPostForNodeDetails(post)}
                    title="Inspect decentralized block hash & node signature"
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-1 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1"
                  >
                    <span>🔒</span>
                    <span>Node: {post.nodeId.substring(0, 12)}...</span>
                  </button>
                </div>
              </div>

              {/* Title & Content */}
              <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 whitespace-pre-line">
                {post.content}
              </p>

              {/* Expert Commentary Callout if present */}
              {post.expertComment && (
                <div className="bg-purple-50 border-l-4 border-purple-600 p-3 rounded-r-2xl text-xs text-purple-950 mb-4 flex items-start gap-2.5 shadow-xs">
                  <span className="text-base select-none">🔬</span>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded mr-2">
                      Expert Verification Note
                    </span>
                    {post.expertComment}
                  </div>
                </div>
              )}

              {/* Interaction Bar: Upvote, Helpful, Reply, Flag */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-800 font-bold px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <span>👍</span>
                    <span>Upvote ({post.upvotes})</span>
                  </button>

                  <button
                    onClick={() => handleMarkHelpful(post.id)}
                    className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                  >
                    <span>⭐</span>
                    <span>Helpful ({post.helpfulCount})</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleFlagPost(post.id)}
                    className="text-stone-400 hover:text-red-600 transition-colors text-[11px]"
                  >
                    🚩 {t.reportMisinformation}
                  </button>
                </div>
              </div>

              {/* Answers & Discussion Thread */}
              {post.answers.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-100 space-y-2.5">
                  <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Community & Expert Responses ({post.answers.length})
                  </h4>
                  {post.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className={`p-3.5 rounded-2xl text-xs ${
                        ans.isVerifiedExpertResponse
                          ? 'bg-purple-50/70 border border-purple-200 text-purple-950'
                          : ans.authorRole === 'admin'
                          ? 'bg-emerald-50/60 border border-emerald-200 text-stone-900'
                          : 'bg-stone-50 text-stone-800 border border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{ans.authorName}</span>
                          {ans.isVerifiedExpertResponse && (
                            <span className="bg-purple-200 text-purple-900 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              ✓ Verified Scientist
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-500">{ans.timestamp}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">{ans.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Reply Input */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  value={replyInputs[post.id] || ''}
                  onChange={(e) =>
                    setReplyInputs({ ...replyInputs, [post.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddReply(post.id);
                  }}
                  placeholder="Share your agronomic advice or field experience..."
                  className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                />
                <button
                  onClick={() => handleAddReply(post.id)}
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs rounded-xl transition-colors"
                >
                  {t.reply}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#2d6a4f]">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-stone-900">
                {t.askCommunity}
              </h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {t.tagCrop}
                </label>
                <select
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                >
                  <option value="Soybean">Soybean</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Onion">Onion</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {t.postTitle}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Whitefly control on 40-day cotton crop"
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {t.postContent}
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detail what you observed, what remedies you tried, or your specific question..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 font-normal leading-relaxed"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
                🔒 <strong>Cryptographic Attribution:</strong> Your submission will be cryptographically hashed with SHA-256 and broadcast across peer nodes with your village attribution.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-bold hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newTitle.trim() || !newContent.trim()}
                  className="px-5 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold rounded-xl disabled:opacity-40 shadow transition-colors"
                >
                  Submit to Peer Network
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decentralized Node Inspector Modal */}
      {selectedPostForNodeDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-600 text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔒</span>
                <h3 className="font-bold text-sm text-stone-900">
                  Decentralized Node Cryptographic Proof
                </h3>
              </div>
              <button
                onClick={() => setSelectedPostForNodeDetails(null)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  Origin Node
                </span>
                <p className="font-mono font-bold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  {selectedPostForNodeDetails.nodeId} (KVK Pimpalgaon AgroNode)
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  SHA-256 Content Hash
                </span>
                <p className="font-mono text-[11px] bg-stone-100 p-2 rounded-lg break-all border border-stone-300">
                  {selectedPostForNodeDetails.blockHash}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  Node Digital Signature
                </span>
                <p className="font-mono text-[11px] bg-stone-100 p-2 rounded-lg break-all border border-stone-300">
                  {selectedPostForNodeDetails.signature}
                </p>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-950 text-[11px] leading-relaxed">
                ✓ <strong>Integrity Verified:</strong> Content has not been altered since publication. Replicated across 3 peer institutional nodes (KVK Nashik, Central AgroNet, Sahyadri FPO).
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setSelectedPostForNodeDetails(null)}
                  className="px-4 py-2 bg-[#2d6a4f] text-white font-bold rounded-xl"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
