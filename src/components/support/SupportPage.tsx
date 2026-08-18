import React, { useState } from 'react';
import { 
  LifeBuoy, MessageSquare, Plus, Search, CheckCircle2, Clock, 
  AlertCircle, HelpCircle, ChevronDown, ChevronUp, Send, ShieldCheck, 
  Activity, ExternalLink, Zap, RefreshCw, FileText, Check, ArrowRight
} from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  category: 'Funnels & Pages' | 'Websites' | 'Billing & Stripe' | 'Automations' | 'CRM & Leads' | 'Domains & SSL' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  lastReply: string;
  description: string;
  messages: { sender: 'user' | 'agent'; name: string; text: string; time: string }[];
}

const initialTickets: SupportTicket[] = [
  {
    id: 'TICK-8492',
    subject: 'Custom CNAME domain routing verification for sales funnel',
    category: 'Domains & SSL',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-08-17 14:22',
    lastReply: '2026-08-17 15:40',
    description: 'We pointed our DNS CNAME record to cname.funnellegends.com. Could you please confirm if the edge SSL certificate has been provisioned?',
    messages: [
      { sender: 'user', name: 'Stephen Tofield', text: 'We pointed our DNS CNAME record to cname.funnellegends.com. Could you please confirm if the edge SSL certificate has been provisioned?', time: '2026-08-17 14:22' },
      { sender: 'agent', name: 'FunnelLegends Support (Elena)', text: 'Hello Stephen! We have verified your DNS record. Your wildcard SSL certificate has been provisioned and is currently active across all global edge nodes.', time: '2026-08-17 15:40' }
    ]
  },
  {
    id: 'TICK-8310',
    subject: 'Stripe webhook payment confirmation trigger setup',
    category: 'Billing & Stripe',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-08-15 09:12',
    lastReply: '2026-08-15 10:05',
    description: 'Inquired about triggering automated email receipt when 2-step checkout order completes.',
    messages: [
      { sender: 'user', name: 'Stephen Tofield', text: 'How do we ensure the 2-step checkout automatically fires the confirmation email flow?', time: '2026-08-15 09:12' },
      { sender: 'agent', name: 'FunnelLegends Support (Mark)', text: 'Hi Stephen! Under Automations > Triggers, select "New Order Placed" as the entry trigger node and connect it to the "Send Email" action node. This will immediately dispatch receipt emails on completed checkout.', time: '2026-08-15 10:05' }
    ]
  }
];

const faqs = [
  {
    question: 'How do I connect a custom domain to my funnels and websites?',
    category: 'Domains & SSL',
    answer: 'Navigate to "Publishing & A/B" or "Websites", enter your custom domain (e.g. funnel.yourbrand.com), and add a CNAME record in your DNS provider (Cloudflare, GoDaddy, Namecheap) pointing to cname.funnellegends.com. SSL certificates are provisioned automatically within minutes.'
  },
  {
    question: 'How does the A/B Split Testing engine work?',
    category: 'Funnels & Pages',
    answer: 'In the Publishing tab, enable A/B Split Testing and choose your traffic distribution slider (e.g. 50% / 50%). When visitors load your page, the edge router distributes traffic between Variant A and Variant B with real-time conversion rate tracking.'
  },
  {
    question: 'How do I set up automated email sequences when a lead opts in?',
    category: 'Automations',
    answer: 'Go to Automations > Visual Workflow Builder. Add a trigger node for "Lead Form Submitted", then connect an action node for "Send Email" or "Assign Tag". You can add delays and condition filters to build multi-day nurture funnels.'
  },
  {
    question: 'Can I import and export my visual page canvases as JSON?',
    category: 'Funnels & Pages',
    answer: 'Yes! In the Visual Builder top toolbar, click the Download (Export) icon to save your entire canvas structure as a .json file. You can import any saved JSON canvas using the Upload button.'
  },
  {
    question: 'How are affiliate commissions calculated in BountyPack?',
    category: 'Billing & Stripe',
    answer: 'BountyPack automatically calculates 1st-tier and 2nd-tier recurring or one-time commissions based on the active commission plan assigned to your affiliates when an order is completed through their tracking link.'
  },
  {
    question: 'How do I gate video courses and resources for paying members?',
    category: 'Websites',
    answer: 'In the Course Portal, create your modules and lessons, then set the access tier requirement (e.g. VIP Member, Standard, Free). Only users with the matching tier will be allowed to view the lesson content.'
  }
];

interface SupportPageProps {
  onNavigateToGuides?: () => void;
  onNavigateToContact?: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ 
  onNavigateToGuides,
  onNavigateToContact
}) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [activeTab, setActiveTab] = useState<'tickets' | 'faq' | 'status'>('tickets');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // New ticket modal
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<SupportTicket['category']>('Funnels & Pages');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('Medium');
  const [newDescription, setNewDescription] = useState('');
  const [ticketSubmitSuccess, setTicketSubmitSuccess] = useState(false);

  // Active selected ticket view
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) return;

    const newTicket: SupportTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newSubject.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'Open',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lastReply: 'Just now',
      description: newDescription.trim(),
      messages: [
        {
          sender: 'user',
          name: 'Stephen Tofield',
          text: newDescription.trim(),
          time: 'Just now'
        }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setTicketSubmitSuccess(true);
    setTimeout(() => {
      setTicketSubmitSuccess(false);
      setIsNewTicketOpen(false);
      setNewSubject('');
      setNewDescription('');
      setSelectedTicketId(newTicket.id);
    }, 1200);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const userMsg = {
      sender: 'user' as const,
      name: 'Stephen Tofield',
      text: replyText.trim(),
      time: 'Just now'
    };

    const updated = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          lastReply: 'Just now',
          messages: [...t.messages, userMsg]
        };
      }
      return t;
    });

    setTickets(updated);
    setReplyText('');

    // Simulate quick automated response
    setTimeout(() => {
      const agentMsg = {
        sender: 'agent' as const,
        name: 'FunnelLegends Support (Automated Desk)',
        text: 'Thank you for the update! Our support engineering team has received your message and will review it shortly.',
        time: 'Just now'
      };
      setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, messages: [...t.messages, agentMsg] } : t));
    }, 1500);
  };

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      {/* ── TOP HEADER BAR ── */}
      <div 
        className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <LifeBuoy className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                Support & Helpdesk Center
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                24/7 Priority Support
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">Submit support tickets, explore the knowledge base & monitor platform system health.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onNavigateToGuides && (
            <button
              onClick={onNavigateToGuides}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>Tool Guides</span>
            </button>
          )}

          {onNavigateToContact && (
            <button
              onClick={onNavigateToContact}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>Contact Us</span>
            </button>
          )}

          <button
            onClick={() => setIsNewTicketOpen(true)}
            className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Create Support Ticket</span>
          </button>
        </div>
      </div>

      {/* ── SUB-NAV BAR ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'tickets' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>My Support Tickets ({tickets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'faq' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge Base & FAQs</span>
        </button>

        <button
          onClick={() => setActiveTab('status')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'status' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Activity className="w-4 h-4" />
          <span>System Status & Cloud Health</span>
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-6">

        {/* ── TAB 1: TICKETS ── */}
        {activeTab === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left list of tickets */}
            <div className={`${selectedTicket ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Your Support History</span>
                </h3>
                <span className="text-xs text-slate-500 font-bold">{tickets.length} Tickets on record</span>
              </div>

              <div className="space-y-3">
                {tickets.map((ticket) => {
                  const isSelected = ticket.id === selectedTicketId;
                  return (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {ticket.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                            ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            ● {ticket.status}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                            ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{ticket.subject}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{ticket.description}</p>
                      
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100">
                        <span>Category: {ticket.category}</span>
                        <span>Reply: {ticket.lastReply}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right ticket thread view */}
            {selectedTicket && (
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-emerald-700">{selectedTicket.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {selectedTicket.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mt-1">{selectedTicket.subject}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedTicketId(null)}
                    className="text-xs text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
                  >
                    Close View ✕
                  </button>
                </div>

                {/* Conversation Thread */}
                <div className="flex-1 py-4 space-y-4 max-h-[420px] overflow-y-auto pr-2">
                  {selectedTicket.messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                        msg.sender === 'user' 
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 ml-6' 
                          : 'bg-slate-50 border border-slate-200 text-slate-900 mr-6'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold opacity-75">
                        <span>{msg.name}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed font-medium">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response to the support team..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

        {/* ── TAB 2: KNOWLEDGE BASE & FAQS ── */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900">Search Knowledge Base & Documentation</h3>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, keywords (e.g. domain, SSL, stripe, email, JSON)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {faq.category}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{faq.question}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 3: SYSTEM STATUS & CLOUD HEALTH ── */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">All FunnelLegends Systems Operational</h3>
                    <p className="text-xs text-slate-500">Live uptime monitoring across global edge endpoints & cloud database clusters.</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  99.99% 30-Day Uptime
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Edge CDN & Page Delivery</div>
                    <div className="text-[11px] text-slate-500 font-mono">Latency: 28ms • Global DNS</div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Operational
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Funnel Engine & Visual Canvas Builder</div>
                    <div className="text-[11px] text-slate-500 font-mono">Render Engine v2.0 • 30+ Widgets</div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Operational
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Stripe Payments & Webhooks</div>
                    <div className="text-[11px] text-slate-500 font-mono">100% 2-Step Checkout Delivery</div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Operational
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Automations & SMTP Email Queue</div>
                    <div className="text-[11px] text-slate-500 font-mono">Queue processing: 0 pending</div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── CREATE TICKET MODAL ── */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900">Open Support Ticket</h3>
              </div>
              <button 
                onClick={() => setIsNewTicketOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                ✕
              </button>
            </div>

            {ticketSubmitSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">Support Ticket Created Successfully!</h4>
                <p className="text-xs text-emerald-800">Our engineering team has been notified and will assist you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Subject / Summary</label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Custom domain DNS routing help"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">Category / Area</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                    >
                      <option value="Funnels & Pages">Funnels & Pages</option>
                      <option value="Websites">Websites</option>
                      <option value="Billing & Stripe">Billing & Stripe</option>
                      <option value="Automations">Automations</option>
                      <option value="CRM & Leads">CRM & Leads</option>
                      <option value="Domains & SSL">Domains & SSL</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-800 font-bold mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">Detailed Description</label>
                  <textarea
                    required
                    rows={4}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Provide details about what you need assistance with..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewTicketOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
                  >
                    Submit Ticket →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
