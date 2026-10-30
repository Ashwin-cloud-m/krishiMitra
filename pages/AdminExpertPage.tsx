import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { REGISTERED_NODES } from '../services/decentralizedNode';
import { INITIAL_COMMUNITY_POSTS, INITIAL_CROP_ALERTS } from '../data/demoData';
import { DisclaimerBanner } from '../components/Common/DisclaimerBanner';

export const AdminExpertPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, switchRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'expert' | 'moderation' | 'nodes'>('expert');
  const [nodes, setNodes] = useState(REGISTERED_NODES);
  const [isPingingNodes, setIsPingingNodes] = useState(false);
  const [verifiedPosts, setVerifiedPosts] = useState<string[]>([]);
  const [resolvedReports, setResolvedReports] = useState<string[]>([]);

  const handlePingNodes = async () => {
    setIsPingingNodes(true);
    await new Promise((res) => setTimeout(res, 800));
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        latencyMs: Math.round(15 + Math.random() * 40),
        blockHeight: n.blockHeight + 1
      }))
    );
    setIsPingingNodes(false);
  };

  const handleApproveVerification = (postId: string) => {
    setVerifiedPosts((prev) => [...prev, postId]);
    alert('Scientific endorsement recorded. Post will now bear the official "Verified Agronomist" badge.');
  };

  const handleDismissReport = (postId: string) => {
    setResolvedReports((prev) => [...prev, postId]);
    alert('Report cleared. Post deemed compliant with community farming standards.');
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#24523e] to-[#1b4332] text-white py-8 px-4 sm:px-6 lg:px-8 border-b-4 border-[#2d6a4f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">⚙️</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Admin, Expert & Node Control Panel
              </h1>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-2xl">
              Role-restricted workstation for Krishi Vigyan Kendra scientists, community moderators, and decentralized node administrators.
            </p>
          </div>

          {/* Quick Persona Switcher for Evaluation */}
          <div className="flex items-center gap-2 bg-[#2d6a4f] p-1.5 rounded-2xl border border-emerald-500/40 text-xs">
            <span className="text-stone-300 font-semibold px-2">Role:</span>
            {[
              { id: 'expert', label: '🔬 Expert' },
              { id: 'moderator', label: '🛡️ Moderator' },
              { id: 'admin', label: '⚙️ Admin' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  switchRole(r.id as any);
                  setActiveTab(r.id as any);
                }}
                className={`px-3 py-1 rounded-xl font-bold transition-all ${
                  user.role === r.id
                    ? 'bg-white text-stone-900 shadow'
                    : 'text-stone-200 hover:bg-[#1b4332]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Notice */}
        <DisclaimerBanner type="demo" customText="Role-Based Security Console: KVK scientists certify high-risk diagnoses. Moderators triage reported misinformation. Admins monitor cryptographic peer node block heights." />

        {/* Dashboard Tabs */}
        <div className="flex border-b border-stone-200 mb-6 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('expert')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'expert'
                ? 'border-[#2d6a4f] text-[#1b4332] font-black'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>🔬</span>
            <span>Agronomist Verification Queue (2)</span>
          </button>

          <button
            onClick={() => setActiveTab('moderation')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'moderation'
                ? 'border-[#2d6a4f] text-[#1b4332] font-black'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>🛡️</span>
            <span>Content Moderation & Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('nodes')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'nodes'
                ? 'border-[#2d6a4f] text-[#1b4332] font-black'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>🌐</span>
            <span>Decentralized Node Cluster Telemetry</span>
          </button>
        </div>

        {/* TAB 1: Agronomist Verification Queue */}
        {activeTab === 'expert' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
              <h3 className="font-extrabold text-[#1b4332] text-base mb-1">
                KVK Field Verification Workstation
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Logged in as <strong>{user.name}</strong> ({user.expertCredentials || 'Senior Agronomist'}). Review and certify farmer diagnostic submissions:
              </p>

              <div className="space-y-4">
                {INITIAL_COMMUNITY_POSTS.slice(0, 2).map((post) => {
                  const isDone = verifiedPosts.includes(post.id);
                  return (
                    <div
                      key={post.id}
                      className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded text-[10px]">
                            {post.crop}
                          </span>
                          <span className="font-bold text-stone-900">{post.title}</span>
                        </div>
                        <p className="text-stone-600 line-clamp-2">
                          Farmer: {post.authorName} • Village {post.village}, {post.district}
                        </p>
                        <p className="text-stone-500 text-[11px] font-mono">
                          SHA-256 Hash: {post.blockHash.substring(0, 24)}...
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isDone ? (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
                            ✓ Scientist Certified
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleApproveVerification(post.id)}
                              className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-bold rounded-xl transition-colors"
                            >
                              Endorse as Verified
                            </button>
                            <button
                              onClick={() => alert('Correction dispatched to farmer thread.')}
                              className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl"
                            >
                              Add Scientist Note
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Content Moderation */}
        {activeTab === 'moderation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
              <h3 className="font-extrabold text-[#1b4332] text-base mb-1">
                Community Misinformation & Toxic Advice Moderation
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Protecting farmers from unscientific home remedies or illicit pesticide mixing:
              </p>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="bg-red-100 text-red-900 font-bold px-2 py-0.5 rounded text-[10px]">
                    1 User Report (Potential Chemical Hazard)
                  </span>
                  <h4 className="font-bold text-stone-900 mt-1">
                    Reported Comment: "Mix Dichlorvos with Monocrotophos at 3x strength..."
                  </h4>
                  <p className="text-stone-600 text-[11px] mt-1">
                    Report Reason: Recommending banned chemical pesticide cocktail exceeding statutory safety limits.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => alert('Post removed permanently across all replicated decentralized nodes.')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Remove Content
                  </button>
                  <button
                    onClick={() => handleDismissReport('rep_01')}
                    className="px-3 py-2 bg-stone-200 text-stone-800 font-bold rounded-xl"
                  >
                    Dismiss Flag
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Decentralized Nodes Cluster */}
        {activeTab === 'nodes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-extrabold text-[#1b4332] text-base">
                    Active Institutional AgroNodes
                  </h3>
                  <p className="text-xs text-stone-500">
                    Replicating verified agricultural knowledge across cooperative FPOs and KVK research centers.
                  </p>
                </div>

                <button
                  onClick={handlePingNodes}
                  disabled={isPingingNodes}
                  className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
                >
                  <span>🔄</span>
                  <span>{isPingingNodes ? 'Pinging Peers...' : 'Ping Node Peers'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nodes.map((node) => (
                  <div
                    key={node.nodeId}
                    className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-stone-900 text-sm">
                          {node.nodeName}
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>

                      <p className="text-stone-600 font-medium text-[11px] mb-2">
                        {node.organization}
                      </p>

                      <div className="space-y-1 text-[11px] text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200">
                        <p className="flex justify-between">
                          <span>Location:</span>
                          <span className="font-semibold text-stone-800">{node.location}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Block Height:</span>
                          <span className="font-mono font-bold text-[#1b4332]">#{node.blockHeight}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Latency:</span>
                          <span className="font-semibold text-emerald-700">{node.latencyMs} ms</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Peers:</span>
                          <span className="font-semibold text-stone-800">{node.peersCount} connected</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-400 font-mono">
                      <span>Key: {node.publicKeySnippet}</span>
                      <span className="text-emerald-700 font-bold uppercase">Synced</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
