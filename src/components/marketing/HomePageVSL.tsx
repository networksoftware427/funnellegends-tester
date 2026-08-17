import React, { useState } from 'react';
import { 
  Play, CheckCircle2, ShieldCheck, Zap, Star, ArrowRight, Layers, 
  Users, DollarSign, Rocket, MousePointerClick, Lock, HelpCircle, ChevronDown, ChevronUp, Sparkles, Trophy
} from 'lucide-react';

interface HomePageVSLProps {
  onOpenOrderModal: () => void;
  onNavigate: (tab: 'home' | 'features' | 'pricing' | 'login') => void;
}

export const HomePageVSL: React.FC<HomePageVSLProps> = ({ onOpenOrderModal, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is FunnelLegends and how is it different from other builders?",
      a: "FunnelLegends is a complete all-in-one digital marketing architecture. Unlike basic page builders, FunnelLegends integrates high-converting visual canvas editors, course portals, BountyPack affiliate management, ChronoChimp appointments, TribeNexus community, and PingPanda message hubs in one unified platform."
    },
    {
      q: "How does the 30-Day Free Trial work?",
      a: "You get 100% unrestricted access to all features for 30 days. No upfront commitments. If you love it (which you will), your membership continues automatically at your chosen plan."
    },
    {
      q: "Can I migrate my existing sales funnels and custom domain?",
      a: "Yes! You can connect your custom domain (e.g. funnels.yourbrand.com) in 1 click. Our system supports full SSL encryption and custom domain mapping out of the box."
    },
    {
      q: "Are the 37 Cookbook Funnel Templates included for free?",
      a: "Yes! Every single recipe from the Funnel Hacker's Cookbook (Sales Funnels, Lead Magnets, VSL Orders, Membership Portals, Live Webinars) is pre-loaded into your account."
    }
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      
      {/* ── HERO VSL SECTION ── */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Attention Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 font-black text-xs uppercase tracking-widest animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ATTENTION: ENTREPRENEURS, AGENCIES & DIGITAL MARKETERS</span>
        </div>

        {/* Main VSL Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto">
          Turn Cold Clicks Into <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">High-Ticket Clients</span> On Autopilot
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-semibold leading-relaxed">
          Watch how FunnelLegends combines sales funnels, CRM, appointments, and 1-click checkout in one platform.
        </p>

        {/* ── HIGH-CONVERTING VSL VIDEO PLAYER BLOCK ── */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-white shadow-2xl shadow-emerald-900/30 group">
          
          {/* Top Live Bar */}
          <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-200 text-xs font-bold">
            <div className="flex items-center gap-2 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>🔴 LIVE PRESENTATION (1,842 VIEWERS WATCHING NOW)</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">Volume: High 🔊</span>
          </div>

          {/* Video Container Canvas */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/80 flex flex-col items-center justify-center p-6 text-center">
            {!isPlaying ? (
              <div className="space-y-6 z-10">
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto cursor-pointer shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-all group-hover:brightness-110"
                >
                  <Play className="w-10 h-10 fill-white ml-1" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Click Play To Watch VSL Presentation</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">Duration: 12 mins • Includes 37 Free Funnel Templates</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-emerald-400 font-mono text-sm border border-emerald-500/30 p-8">
                  <div className="space-y-3 text-center">
                    <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                    <p className="font-bold text-slate-900 text-base">Streaming FunnelLegends Masterclass Presentation...</p>
                    <p className="text-xs text-slate-600">Simulating High-Definition VSL Playback Stream</p>
                  </div>
                </div>
              </div>
            )}

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Video Progress Bar Simulation */}
          <div className="w-full bg-white h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-2/3 transition-all" />
          </div>
        </div>

        {/* ── GIANT CALL-TO-ACTION BUTTON ── */}
        <div className="pt-6 space-y-4">
          <button
            onClick={onOpenOrderModal}
            className="px-8 sm:px-12 py-5 rounded-2xl text-lg sm:text-xl font-black text-slate-900 shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-3"
            style={{ 
              background: 'linear-gradient(135deg, #FF6A00 0%, #ee5d00 100%)',
              boxShadow: '0 10px 40px rgba(255, 106, 0, 0.45)'
            }}
          >
            <Zap className="w-6 h-6 fill-white" />
            <span>CLAIM YOUR 30-DAY FREE TRIAL NOW →</span>
          </button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 font-bold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Instant Setup in 60 Seconds</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-teal-600" /> 256-Bit SSL Encrypted</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cancel Anytime</span>
          </div>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHT GRID ── */}
      <section className="py-20 bg-emerald-50/50 border-y border-emerald-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Everything You Need To Build A 7-Figure Online Enterprise</h2>
            <p className="text-sm text-slate-700 font-medium max-w-2xl mx-auto">Replace 10+ expensive tools with FunnelLegends unified ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-white rounded-2xl border border-emerald-200 space-y-4 shadow-sm hover:border-emerald-500 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Visual Drag-and-Drop Builder</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">Section, Row, Column & Element architecture with real-time bidirectional styling.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-emerald-200 space-y-4 shadow-sm hover:border-emerald-500 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">BountyPack Affiliate Engine</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">Recruit affiliates, manage tier-1/tier-2 commission payouts, and issue promo materials automatically.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-emerald-200 space-y-4 shadow-sm hover:border-emerald-500 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">ChronoChimp Appointments</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">Schedule strategy calls, client consultations, and webinar appointments directly inside your funnels.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (STYLISH GLASSMORPHISM ACCORDION) ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
            GOT QUESTIONS? WE'VE GOT ANSWERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">Everything you need to know about starting your 30-day free trial and scaling your enterprise.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className={`rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isOpen 
                    ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-emerald-500 shadow-xl shadow-emerald-950/50 scale-[1.01]' 
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Number Badge */}
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black font-mono text-xs transition-colors shrink-0 ${
                      isOpen ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' : 'bg-slate-50 text-slate-600'
                    }`}>
                      0{idx + 1}
                    </span>

                    <h3 className={`font-bold text-sm sm:text-base transition-colors ${isOpen ? 'text-white' : 'text-slate-800'}`}>
                      {faq.q}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-emerald-500/20 text-emerald-400 rotate-180' : 'bg-slate-50 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-emerald-500/20 space-y-2 animate-fade-in pl-18">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Specialist Support Box */}
        <div className="p-6 rounded-3xl bg-white/60 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Still have questions?</h4>
              <p className="text-xs text-slate-900 font-medium">Our 24/7 Funnel Specialist team is ready to help you set up your account.</p>
            </div>
          </div>
          <button
            onClick={onOpenOrderModal}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shrink-0 flex items-center gap-1.5"
          >
            <span>Talk To A Specialist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </section>
    </div>
  );
};
