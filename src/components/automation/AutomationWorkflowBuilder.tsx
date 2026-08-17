import React, { useState, useEffect } from 'react';
import { WorkflowNodeData, WorkflowEdgeData } from '../../types/builder';
import { loadStoredWorkflows, saveStoredWorkflows, loadStoredContacts, saveStoredContacts } from '../../utils/storage';
import { 
  GitBranch, Plus, Play, Mail, Tag, Clock, ShieldCheck, Send, CheckCircle, 
  Settings, Trash2, Zap, ArrowRight, Check, Sparkles, GraduationCap, MessageSquare, ShoppingBag, Eye, BookOpen
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
  const [selectedEventPreset, setSelectedEventPreset] = useState<'land' | 'optin' | 'purchase'>('optin');
  const [activeSubTab, setActiveSubTab] = useState<'canvas' | 'message_templates'>('canvas');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testLog, setTestLog] = useState<string[]>([]);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  // Persist workflows
  useEffect(() => {
    saveStoredWorkflows(nodes, edges);
  }, [nodes, edges]);

  // Execute workflow test run simulation & mutate real CRM contact state
  const handleRunTestFlow = () => {
    setIsRunningTest(true);
    setTestLog([]);

    const eventName = selectedEventPreset === 'land' 
      ? '🎯 FUNNEL LANDING DETECTED: Visitor arrived on Sales VSL Page'
      : selectedEventPreset === 'optin'
      ? '📥 FORM OPT-IN CAPTURED: New lead submitted optin form (sarah.connor@apex.io)'
      : '💳 PURCHASE COMPLETED: Customer completed main checkout ($497 order)';

    const steps = [
      eventName,
      '📩 INSTANT MESSAGING: Sent welcome SMS & email with instant portal access links',
      '🎓 COURSE ENROLLMENT: Enrolled user in "High-Ticket Academy 101" & unlocked Module 1',
      '⚡ PERSONALIZED SEQUENCE: Triggered behavior sequence (Tag #VIPCustomer applied & CRM stage updated)',
      '✅ Automation Sequence Executed Successfully in 0.38s'
    ];

    steps.forEach((msg, idx) => {
      setTimeout(() => {
        setTestLog((prev) => [...prev, msg]);
        if (idx === steps.length - 1) {
          setIsRunningTest(false);
          // Mutate CRM contacts state to reflect lead score increase
          const contacts = loadStoredContacts();
          if (contacts.length > 0) {
            const updatedContacts = contacts.map((cnt, cIdx) => {
              if (cIdx === 0) {
                return {
                  ...cnt,
                  score: cnt.score + 50,
                  tags: Array.from(new Set([...cnt.tags, 'Automated Lead', 'LMS Enrolled', 'Sequence Triggered']))
                };
              }
              return cnt;
            });
            saveStoredContacts(updatedContacts);
          }
        }
      }, (idx + 1) * 500);
    });
  };

  // Add new Node
  const handleAddActionNode = (type: 'action' | 'delay' | 'condition') => {
    const newNode: WorkflowNodeData = {
      id: `wf_${Date.now()}`,
      type: type,
      label: type === 'action' ? 'Send Webhook / Message' : type === 'delay' ? 'Wait Delay' : 'Check Behavior',
      subtitle: type === 'action' ? 'Action step' : 'Workflow logic',
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

  return (
    <div className="flex-1 bg-gray-50 text-gray-900 flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 bg-green-600 backdrop-blur-md border-b border-green-700 px-6 py-4">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-xs tracking-wider uppercase mb-1">
            <GitBranch className="w-4 h-4 text-white" />
            <span className="bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full">BEHAVIORAL AUTOMATIONS APP</span>
          </div>
          <h1 className="text-2xl font-black text-white">Visual Workflow Automations Engine</h1>
          <p className="text-xs text-green-100 mt-0.5">Automate messaging, course enrollment, and personalized sequences based on visitor behavior.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 text-xs font-bold mr-2">
            <button 
              onClick={() => setActiveSubTab('canvas')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${activeSubTab === 'canvas' ? 'bg-green-600 text-white shadow' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Workflow Canvas</span>
            </button>
            <button 
              onClick={() => setActiveSubTab('message_templates')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${activeSubTab === 'message_templates' ? 'bg-green-600 text-white shadow' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Template Messages (10)</span>
            </button>
          </div>

          {activeSubTab === 'canvas' && (
            <>
              <select 
                value={selectedEventPreset}
                onChange={(e) => setSelectedEventPreset(e.target.value as any)}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-bold focus:outline-none focus:border-green-500"
              >
                <option value="land">🎯 Event: Funnel Landing</option>
                <option value="optin">📥 Event: Form Opt-In</option>
                <option value="purchase">💳 Event: Order Purchase</option>
              </select>

              <button 
                onClick={() => handleAddActionNode('action')}
                className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-green-600" />
                <span>Add Action Node</span>
              </button>
              <button 
                onClick={handleRunTestFlow}
                disabled={isRunningTest}
                className="px-4 py-2 bg-white text-green-700 hover:bg-gray-50 border border-green-200 rounded-xl text-xs font-extrabold shadow-lg shadow-green-600/30 flex items-center gap-2 transition-all shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunningTest ? 'Simulating Automation...' : 'Run Behavioral Automation Test'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col min-h-0 w-full">

      {/* OFFICIAL REQUIRED BANNER */}
      <div className="p-4 bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 rounded-2xl mb-6 space-y-1.5 shadow-xl shrink-0">
        <div className="flex items-center gap-2 text-purple-300 font-extrabold text-xs">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Automations App Behavioral Engine Active</span>
        </div>
        <p className="text-xs text-purple-200/90 leading-relaxed font-medium">
          When someone lands in your funnel, magic happens automatically. From opt-ins to purchases, the Automations App responds instantly with the perfect next step - sending messages, enrolling in courses, or triggering personalized sequences based on their behavior.
        </p>
      </div>

      {/* SUB-VIEW 1: WORKFLOW CANVAS */}
      {activeSubTab === 'canvas' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Visual Node Flow View */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

          {/* Render Flow Nodes */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 py-12">
            {nodes.map((node, idx) => {
              const isSelected = selectedNode?.id === node.id;
              let badgeColor = 'bg-indigo-950 text-indigo-400 border-indigo-800';
              if (node.type === 'trigger') badgeColor = 'bg-emerald-950 text-emerald-400 border-emerald-800';
              if (node.type === 'condition') badgeColor = 'bg-amber-950 text-amber-400 border-amber-800';

              return (
                <React.Fragment key={node.id}>
                  <div 
                    onClick={() => setSelectedNode(node)}
                    className={`w-64 bg-slate-950 border rounded-2xl p-4 cursor-pointer transition-all shadow-xl hover:scale-105 ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/40' : 'border-slate-800 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border ${badgeColor}`}>
                        {node.type}
                      </span>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }} className="hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    </div>
                    <h3 className="text-xs font-bold text-slate-100">{node.label}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{node.subtitle}</p>
                  </div>

                  {idx < nodes.length - 1 && (
                    <div className="flex items-center text-slate-600">
                      <ArrowRight className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Selected Node Inspector & Test Log */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-extrabold uppercase text-slate-400">Node Properties</span>
              <Settings className="w-4 h-4 text-slate-500" />
            </div>

            {selectedNode ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Node Title</label>
                  <input 
                    type="text" 
                    value={selectedNode.label} 
                    onChange={(e) => {
                      const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, label: e.target.value } : n);
                      setNodes(updated);
                      setSelectedNode({ ...selectedNode, label: e.target.value });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Event Subtitle / Action</label>
                  <input 
                    type="text" 
                    value={selectedNode.subtitle || ''} 
                    onChange={(e) => {
                      const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, subtitle: e.target.value } : n);
                      setNodes(updated);
                      setSelectedNode({ ...selectedNode, subtitle: e.target.value });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">Select any node on the workflow canvas to configure event triggers or actions.</div>
            )}
          </div>

          {/* Execution Log Console */}
          <div className="pt-4 border-t border-slate-800 mt-6">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-2 block">REAL-TIME TEST LOG</span>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-44 overflow-y-auto space-y-1.5 font-mono text-[10px]">
              {testLog.length === 0 ? (
                <div className="text-slate-600 italic">Click "Test Workflow Execution" to simulate live events...</div>
              ) : (
                testLog.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 font-medium">{log}</div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* SUB-VIEW 2: 10 PROVEN AUTOMATION MESSAGE TEMPLATES */}
      {activeSubTab === 'message_templates' && (
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>Automation Template Messages & Sequences (10)</span>
              </h2>
              <p className="text-xs text-slate-400">Pre-written email & SMS sequences ready to drop into your automation workflows.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
            {automationMessageTemplates.map((msg) => (
              <div key={msg.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-xl flex flex-col justify-between hover:border-purple-500/50 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      {msg.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 uppercase">
                      {msg.channel === 'email_sms' ? '✉️ Email + 📱 SMS' : msg.channel === 'email' ? '✉️ Email' : '📱 SMS'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{msg.title}</h3>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                    <span className="text-slate-500 font-bold block text-[10px] uppercase">Subject Line:</span>
                    {msg.subject}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                    {msg.body}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500">Category: {msg.category}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`SUBJECT: ${msg.subject}\n\nBODY:\n${msg.body}`);
                      setCopiedTemplateId(msg.id);
                      setTimeout(() => setCopiedTemplateId(null), 2500);
                    }}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    {copiedTemplateId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Copy Message Template</span>
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

