import React from 'react';
import { 
  Layers, Gift, CalendarCheck, Users, MessageSquare, Award, 
  Split, Database, Sparkles, Sliders, Rocket, Check, ArrowRight, Zap, Lock
} from 'lucide-react';

interface FeaturesPageProps {
  onOpenOrderModal: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onOpenOrderModal }) => {
  const tools = [
    {
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      title: "Visual Drag-and-Drop Canvas",
      desc: "Build 2-tab structured sections, rows, columns, and elements with real-time CSS variable bindings."
    },
    {
      icon: <Gift className="w-6 h-6 text-teal-400" />,
      title: "BountyPack Affiliate Engine",
      desc: "Manage affiliate recruitment, tier-1/tier-2 commissions, referral links, and automated payout ledgers."
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-indigo-400" />,
      title: "ChronoChimp Appointment Scheduler",
      desc: "Book consultation calls, high-ticket sales appointments, and webinar reservations natively."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "TribeNexus Community Portal",
      desc: "Host student discussions, mastermind channels, and member spaces directly inside your membership funnels."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      title: "PingPanda Multi-Channel Hub",
      desc: "Unify SMS, WhatsApp, email, and live chat notifications for your leads and buyers."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: "Custom Certificate Generator",
      desc: "Design and issue branded course completion certificates automatically upon lesson completion."
    },
    {
      icon: <Split className="w-6 h-6 text-rose-400" />,
      title: "A/B Split Testing Engine",
      desc: "Test Step Variant A vs Variant B head-to-head with automated traffic distribution and conversion tracking."
    },
    {
      icon: <Database className="w-6 h-6 text-teal-400" />,
      title: "Supabase Cloud Database Sync",
      desc: "All leads, orders, funnel states, and workspace settings are synced to your PostgreSQL database in real-time."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: "AI Copilot Copy Generator",
      desc: "Generate high-converting headlines, sales hooks, and email sequences powered by AI assistant models."
    }
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-black uppercase tracking-wider">
            ALL-IN-ONE ENTERPRISE SUITE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Every Tool You Need To Scale Without Buying 10+ Apps</h1>
          <p className="text-slate-700 font-medium text-sm sm:text-base">Explore the full catalog of enterprise tools pre-loaded into your FunnelLegends account.</p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((t, idx) => (
            <div key={idx} className="p-8 bg-white border border-emerald-200 rounded-3xl space-y-4 shadow-sm hover:border-emerald-500 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                {t.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{t.title}</h3>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Experience All 12 Tools Free For 30 Days</h2>
          <p className="text-sm text-white/90 font-medium max-w-2xl mx-auto">No upfront commitments. Cancel anytime in 1-click directly from your dashboard.</p>
          <div>
            <button
              onClick={onOpenOrderModal}
              className="px-8 py-4 rounded-2xl text-base font-black text-white shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-3"
              style={{ 
                background: 'linear-gradient(135deg, #FF6A00 0%, #ee5d00 100%)',
                boxShadow: '0 8px 30px rgba(255, 106, 0, 0.45)'
              }}
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>START YOUR 30-DAY FREE TRIAL NOW</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
