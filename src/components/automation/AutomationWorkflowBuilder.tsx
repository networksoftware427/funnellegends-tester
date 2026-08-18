import React, { useState, useEffect } from 'react';
import { WorkflowNodeData, WorkflowEdgeData } from '../../types/builder';
import { loadStoredWorkflows, saveStoredWorkflows, loadStoredContacts, saveStoredContacts } from '../../utils/storage';
import { syncAutomationsToSupabase, AUTOMATION_SQL_SCHEMA } from '../../utils/automationDbSync';
import { 
  GitBranch, Plus, Play, Mail, Tag, Clock, ShieldCheck, Send, CheckCircle, 
  Settings, Trash2, Zap, ArrowRight, Check, Sparkles, GraduationCap, MessageSquare, 
  ShoppingBag, Eye, BookOpen, Database, RefreshCw, Terminal, Copy, CheckCheck, 
  Sliders, User, Phone, CheckCircle2, ChevronRight, Activity, Award, Flame, X
} from 'lucide-react';

const defaultAutomationsNodes: WorkflowNodeData[] = [
  {
    id: 'wf_landing',
    type: 'trigger',
    label: '🎯 Funnel Landing Trigger',
    subtitle: 'When visitor lands on Sales VSL page',
    config: { event: 'funnel_landed' },
    x: 100,
    y: 200
  },
  {
    id: 'wf_optin',
    type: 'trigger',
    label: '📥 Opt-In & Form Submit',
    subtitle: 'Responds instantly when lead opts in',
    config: { event: 'form_optin' },
    x: 350,
    y: 200
  },
  {
    id: 'wf_message',
    type: 'action',
    label: '📩 Send Instant Message / Email',
    subtitle: 'Sends personalized message & access link',
    config: { channel: 'email_sms' },
    x: 600,
    y: 200
  },
  {
    id: 'wf_enroll',
    type: 'action',
    label: '🎓 Enroll in LMS Course',
    subtitle: 'Instant course enrollment & lesson unlock',
    config: { courseId: 'course_101' },
    x: 850,
    y: 200
  },
  {
    id: 'wf_sequence',
    type: 'action',
    label: '⚡ Trigger Behavioral Sequence',
    subtitle: 'Personalized sequence based on behavior',
    config: { sequenceId: 'seq_vip_nurture' },
    x: 1100,
    y: 200
  }
];

const defaultAutomationsEdges: WorkflowEdgeData[] = [
  { id: 'e1', source: 'wf_landing', target: 'wf_optin' },
  { id: 'e2', source: 'wf_optin', target: 'wf_message' },
  { id: 'e3', source: 'wf_message', target: 'wf_enroll' },
  { id: 'e4', source: 'wf_enroll', target: 'wf_sequence' }
];

export interface AutomationMessageTemplate {
  id: string;
  title: string;
  category: string;
  channel: 'email' | 'sms' | 'email_sms';
  subject: string;
  body: string;
  badge: string;
}

export const automationMessageTemplates: AutomationMessageTemplate[] = [
  {
    id: 'msg_lead_optin',
    title: '💌 Instant Opt-In Lead Magnet Delivery',
    category: 'Opt-In & Lead Gen',
    channel: 'email_sms',
    badge: 'LEAD MAGNET',
    subject: 'Your Free 7-Figure Funnel Blueprint Inside! [Download Link]',
    body: 'Hey {{first_name}}!\n\nThank you for requesting your copy of the 7-Figure Funnel Blueprint. You can download the complete PDF guide immediately using the link below:\n\n👉 Download PDF: {{download_url}}\n\nInside, you will find our exact VSL templates, 1-click upsell sequences, and ChronoChimp calendar booking setups.\n\nTo your success,\n{{sender_name}}'
  },
  {
    id: 'msg_order_receipt',
    title: '💳 Post-Purchase Confirmation & LMS Credentials',
    category: 'Checkout & Orders',
    channel: 'email',
    badge: 'ORDER RECEIPT',
    subject: 'Your Order is Confirmed! Here are your LMS Login Credentials',
    body: 'Hi {{first_name}}!\n\nWelcome to {{course_title}}! Your order has been successfully processed.\n\nHere are your instant student portal access credentials:\n\nPortal URL: {{portal_url}}\nUsername: {{email}}\nTemporary Password: {{temp_password}}\n\nLog in now to watch Module 1 and claim your bonuses!\n\nCheers,\n{{company_name}}'
  },
  {
    id: 'msg_webinar_reminder',
    title: '🔔 Webinar 15-Minute Live Join Reminder',
    category: 'Webinar & Events',
    channel: 'email_sms',
    badge: 'LIVE WEBINAR',
    subject: 'We are going LIVE in 15 Minutes! [Join Room]',
    body: 'Quick reminder {{first_name}}!\n\nOur masterclass "{{webinar_title}}" starts in 15 minutes. Make sure to log in now to secure your seat.\n\n👉 Click Here to Join the Live Room: {{webinar_room_url}}\n\nSee you inside!'
  },
  {
    id: 'msg_abandoned_cart',
    title: '🛒 1-Hour Abandoned Checkout Recovery',
    category: 'Cart Recovery',
    channel: 'email',
    badge: 'CART RECOVERY',
    subject: 'Did you leave something behind? Here is a 10% discount coupon!',
    body: 'Hey {{first_name}},\n\nWe noticed you left {{product_name}} in your cart. We saved your items for you!\n\nTo help you get started today, use special discount code RECOVER10 at checkout to take 10% off.\n\n👉 Complete Your Order Now: {{checkout_url}}'
  },
  {
    id: 'msg_vip_onboarding',
    title: '🏆 VIP High-Ticket Mastermind Call Onboarding',
    category: 'High-Ticket Coaching',
    channel: 'email_sms',
    badge: 'VIP MASTERMIND',
    subject: 'Welcome to the VIP Mastermind! Schedule your 1-on-1 Strategy Call',
    body: 'Welcome aboard {{first_name}}!\n\nAs a VIP Mastermind member, your first step is booking your 1-on-1 strategy call with our head mentor on ChronoChimp.\n\n👉 Select your time slot on ChronoChimp: {{booking_url}}\n\nAlso, join our private TribeNexus community space: #announcements.'
  },
  {
    id: 'msg_drip_module',
    title: '🎓 Drip Content Module 2 Unlock Notification',
    category: 'Course & LMS',
    channel: 'email',
    badge: 'MODULE UNLOCK',
    subject: 'Module 2 is Now Unlocked in your Academy Portal!',
    body: 'Great progress {{first_name}}!\n\nModule 2 (High-Ticket VSL & Copy teardowns) is now unlocked and available in your student portal.\n\n👉 Log in to watch Module 2: {{portal_url}}'
  },
  {
    id: 'msg_affiliate_welcome',
    title: '🎁 BountyPack Affiliate Partner Activation',
    category: 'Affiliates',
    channel: 'email',
    badge: 'AFFILIATE TEAM',
    subject: 'Your BountyPack Affiliate Account is Active! Grab your 2-Tier Link',
    body: 'Welcome to the affiliate team {{first_name}}!\n\nYour unique 2-tier referral link is ready:\n{{referral_link}}\n\nYou earn 30% Tier 1 and 10% Tier 2 commissions on every customer you refer. Promo email swipes and banner assets are waiting in your BountyPack vault.'
  },
  {
    id: 'msg_review_request',
    title: '🌟 Post-Purchase Customer Review Request',
    category: 'Reviews & Feedback',
    channel: 'email',
    badge: 'REVIEW REQUEST',
    subject: 'How are you enjoying {{product_name}}? Share your feedback!',
    body: 'Hey {{first_name}},\n\nIt has been 7 days since you joined {{product_name}}. We would love to hear how your experience has been!\n\n👉 Take 30 seconds to rate us: {{review_link}}\n\nThank you for being a valued member!'
  },
  {
    id: 'msg_winback_reengage',
    title: '🔥 30-Day Inactive User Winback Campaign',
    category: 'Re-engagement',
    channel: 'email',
    badge: 'WINBACK',
    subject: 'We miss you! Here is a free bonus masterclass for you',
    body: 'Hey {{first_name}},\n\nWe noticed you haven\'t logged into the academy lately. We just added a brand new bonus VSL teardown lesson for you!\n\n👉 Watch the Bonus Masterclass: {{bonus_url}}'
  },
  {
    id: 'msg_certificate_award',
    title: '🏅 Verified Course Completion & PDF Certificate',
    category: 'Certificates',
    channel: 'email',
    badge: 'CERTIFICATE AWARD',
    subject: 'Congratulations {{first_name}}! Your Verified Completion Certificate is Ready',
    body: 'Congratulations {{first_name}}!\n\nYou have officially fulfilled all curriculum requirements for {{course_title}}.\n\nYour official verified completion certificate (Credential ID: CERT-2026-X948) is attached and available in your portal.\n\n👉 View & Share Certificate: {{certificate_url}}'
  }
];

export const AutomationWorkflowBuilder: React.FC = () => {
  const initial = loadStoredWorkflows();
  const [nodes, setNodes] = useState<WorkflowNodeData[]>(initial.nodes && initial.nodes.length > 0 ? initial.nodes : defaultAutomationsNodes);
  const [edges, setEdges] = useState<WorkflowEdgeData[]>(initial.edges && initial.edges.length > 0 ? initial.edges : defaultAutomationsEdges);
  const [selectedNode, setSelectedNode] = useState<WorkflowNodeData | null>(nodes[0] || null);
  const [activeSubTab, setActiveSubTab] = useState<'canvas' | 'message_templates'>('canvas');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Supabase sync
  const [dbSyncStatus, setDbSyncStatus] = useState<{ success: boolean; message: string; timestamp: string } | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);

  // Persist workflows
  useEffect(() => {
    saveStoredWorkflows(nodes, edges);
  }, [nodes, edges]);

  // Handle Supabase Sync
  const handleTriggerSupabaseSync = async () => {
    setIsSyncingDb(true);
    const res = await syncAutomationsToSupabase(nodes, edges);
    setDbSyncStatus(res);
    setIsSyncingDb(false);
  };

  // Add new Node
  const handleAddActionNode = (type: 'action' | 'delay' | 'condition' | 'webhook') => {
    const newNode: WorkflowNodeData = {
      id: `wf_${Date.now()}`,
      type: type as any,
      label: type === 'action' ? 'Send Instant Notification' : type === 'delay' ? 'Wait 15-Min Buffer Delay' : type === 'condition' ? 'Check If VIP Lead Score > 50' : 'Trigger Zapier / Webhook',
      subtitle: type === 'action' ? 'Email & SMS Dispatch' : type === 'delay' ? 'Time delay step' : type === 'condition' ? 'Multi-branch decision' : 'External Webhook POST',
      config: {},
      x: 300 + nodes.length * 50,
      y: 200
    };

    const newNodes = [...nodes, newNode];
    setNodes(newNodes);

    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      const newEdge = { id: `e_${Date.now()}`, source: lastNode.id, target: newNode.id };
      setEdges([...edges, newEdge]);
    }
  };

  // Delete Node
  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
    if (selectedNode?.id === nodeId) setSelectedNode(null);
  };

  // Reset to default
  const handleResetToDefaults = () => {
    if (confirm('Reset workflow canvas to initial default demo flow?')) {
      setNodes(defaultAutomationsNodes);
      setEdges(defaultAutomationsEdges);
      setSelectedNode(defaultAutomationsNodes[0]);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      
      {/* ── TOP HEADER ── */}
      <div 
        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <GitBranch className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                Behavioral Automations Engine
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Activity className="w-3 h-3 text-emerald-300" />
                Live Triggers Active
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">Automate multi-channel messaging, course enrollment, and behavioral sequences.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={handleResetToDefaults}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Reset workflow canvas to initial default demo state"
          >
            Reset Demo Flow
          </button>
        </div>
      </div>

      {/* ── SUB-NAV BAR ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button 
          onClick={() => setActiveSubTab('canvas')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeSubTab === 'canvas' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Workflow Canvas ({nodes.length} Nodes)</span>
        </button>

        <button 
          onClick={() => setActiveSubTab('message_templates')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeSubTab === 'message_templates' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Message Templates ({automationMessageTemplates.length})</span>
        </button>
      </div>

      {/* ── MAIN CONTENT DISPLAY ── */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── TAB 1: WORKFLOW CANVAS ── */}
        {activeSubTab === 'canvas' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Add Workflow Step:</span>
                <button 
                  onClick={() => handleAddActionNode('action')}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+ Action Step</span>
                </button>
                <button 
                  onClick={() => handleAddActionNode('delay')}
                  className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>+ Wait Delay</span>
                </button>
                <button 
                  onClick={() => handleAddActionNode('condition')}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>+ Condition Branch</span>
                </button>
              </div>
            </div>

            {/* Canvas Node Grid & Properties */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Visual Node Flow View */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 relative overflow-x-auto min-h-[420px] flex items-center shadow-sm">
                <div className="relative z-10 flex flex-wrap items-center justify-start gap-6 py-8">
                  {nodes.map((node, idx) => {
                    const isSelected = selectedNode?.id === node.id;
                    let badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                    if (node.type === 'trigger') badgeColor = 'bg-teal-50 text-teal-800 border-teal-200';
                    if (node.type === 'condition') badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
                    if (node.type === 'delay') badgeColor = 'bg-blue-50 text-blue-800 border-blue-200';

                    return (
                      <React.Fragment key={node.id}>
                        <div 
                          onClick={() => setSelectedNode(node)}
                          className={`w-64 bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all shadow-md hover:scale-105 ${isSelected ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-600/20' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-md border ${badgeColor}`}>
                              {node.type}
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }} 
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete Node"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h3 className="text-xs font-black text-slate-900">{node.label}</h3>
                          <p className="text-[11px] text-slate-500 mt-1 font-medium">{node.subtitle}</p>
                        </div>

                        {idx < nodes.length - 1 && (
                          <div className="flex items-center text-emerald-600">
                            <ArrowRight className="w-5 h-5 animate-pulse" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel: Selected Node Inspector */}
              <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-black uppercase text-slate-800 flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-emerald-600" />
                    Node Settings
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{selectedNode?.id}</span>
                </div>

                {selectedNode ? (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Step Title</label>
                      <input 
                        type="text" 
                        value={selectedNode.label} 
                        onChange={(e) => {
                          const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, label: e.target.value } : n);
                          setNodes(updated);
                          setSelectedNode({ ...selectedNode, label: e.target.value });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subtitle / Action Description</label>
                      <input 
                        type="text" 
                        value={selectedNode.subtitle || ''} 
                        onChange={(e) => {
                          const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, subtitle: e.target.value } : n);
                          setNodes(updated);
                          setSelectedNode({ ...selectedNode, subtitle: e.target.value });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium"
                      />
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-950 text-[11px]">Active Funnel Connection:</div>
                      <p className="text-[10px] text-emerald-800">Directly synchronized with Funnel Canvas Form Opt-in and 2-Step Checkout elements.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic p-4 text-center">Click any node on the canvas to configure parameters.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: MESSAGE TEMPLATES (10) ── */}

        {/* ── TAB 3: MESSAGE TEMPLATES (10) ── */}
        {activeSubTab === 'message_templates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span>10 Proven High-Converting Automation Message Templates</span>
                </h3>
                <p className="text-xs text-slate-500">Ready-to-use email & SMS copy with dynamic customer merge tags.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {automationMessageTemplates.map((msg) => (
                <div key={msg.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-sm flex flex-col justify-between hover:border-emerald-500 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {msg.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 uppercase font-bold">
                        {msg.channel === 'email_sms' ? '✉️ Email + 📱 SMS' : msg.channel === 'email' ? '✉️ Email' : '📱 SMS'}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900">{msg.title}</h4>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Subject Line:</span>
                      {msg.subject}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700 font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                      {msg.body}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500 font-bold">Category: {msg.category}</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`SUBJECT: ${msg.subject}\n\nBODY:\n${msg.body}`);
                        setCopiedTemplateId(msg.id);
                        setTimeout(() => setCopiedTemplateId(null), 2500);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      {copiedTemplateId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Template</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
