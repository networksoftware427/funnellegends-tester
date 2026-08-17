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
      q: "What is FunnelLegends and how is it different from ClickFunnels?",
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
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* ── HERO VSL SECTION ── */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Attention Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-black text-xs uppercase tracking-widest animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ATTENTION: ENTREPRENEURS, AGENCIES & DIGITAL MARKETERS</span>
        </div>

        {/* Main VSL Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-5xl mx-auto">
          How To <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">10x Your Conversions</span> & Turn Cold Clicks Into High-Ticket Clients Without Technical Overwhelm!
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
          Watch the short presentation below to see how FunnelLegends combines high-speed page building, automated CRM workflows, courses, and 1-click checkout in one platform.
        </p>

        {/* ── HIGH-CONVERTING VSL VIDEO PLAYER BLOCK ── */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-slate-900 shadow-2xl shadow-emerald-900/30 group">
          
          {/* Top Live Bar */}
          <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs font-bold">
            <div className="flex items-center gap-2 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>🔴 LIVE PRESENTATION (1,842 VIEWERS WATCHING NOW)</span>
            </div>
            <span className="text-slate-400 hidden sm:inline">Volume: High 🔊</span>
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
                  <h3 className="text-xl sm:text-2xl font-black text-white">Click Play To Watch VSL Presentation</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">Duration: 12 mins • Includes 37 Free Funnel Templates</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-emerald-400 font-mono text-sm border border-emerald-500/30 p-8">
                  <div className="space-y-3 text-center">
                    <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                    <p className="font-bold text-white text-base">Streaming FunnelLegends Masterclass Presentation...</p>
                    <p className="text-xs text-slate-400">Simulating High-Definition VSL Playback Stream</p>
                  </div>
                </div>
              </div>
            )}

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Video Progress Bar Simulation */}
          <div className="w-full bg-slate-950 h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-2/3 transition-all" />
          </div>
        </div>

        {/* ── GIANT CALL-TO-ACTION BUTTON ── */}
        <div className="pt-6 space-y-4">
          <button
            onClick={onOpenOrderModal}
            className="px-8 sm:px-12 py-5 rounded-2xl text-lg sm:text-xl font-black text-white shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-3"
            style={{ 
              background: 'linear-gradient(135deg, #FF6A00 0%, #ee5d00 100%)',
              boxShadow: '0 10px 40px rgba(255, 106, 0, 0.45)'
            }}
          >
            <Zap className="w-6 h-6 fill-white" />
            <span>CLAIM YOUR 30-DAY FREE TRIAL NOW →</span>
          </button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant Setup in 60 Seconds</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-teal-400" /> 256-Bit SSL Encrypted</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Cancel Anytime</span>
          </div>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHT GRID (CLICKFUNNELS STYLE) ── */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-850 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white">Everything You Need To Build A 7-Figure Online Enterprise</h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">Replace 10+ expensive tools with FunnelLegends unified ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Visual Drag-and-Drop Builder</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Section, Row, Column & Element ClickFunnels architecture with real-time bidirectional styling.</p>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">BountyPack Affiliate Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Recruit affiliates, manage tier-1/tier-2 commission payouts, and issue promo materials automatically.</p>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">ChronoChimp Appointments</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Schedule strategy calls, client consultations, and webinar appointments directly inside your funnels.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400">Everything you need to know about starting your 30-day free trial.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="p-5 flex items-center justify-between font-bold text-sm text-white">
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
