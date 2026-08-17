import { FunnelLegendsLogo } from '../../App';
import { ShieldCheck, Lock, CheckCircle, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'features' | 'pricing' | 'login') => void;
  onOpenOrderModal: () => void;
}

export const MarketingFooter: React.FC<FooterProps> = ({ onNavigate, onOpenOrderModal }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-850 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-teal-900/60 border border-emerald-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Ready To Build High-Converting Funnels In Seconds?</h2>
          <p className="max-w-2xl mx-auto text-sm text-white font-medium">Join thousands of entrepreneurs, coaches, and digital agencies scaling their enterprise with FunnelLegends. Try it 100% risk-free for 30 days.</p>
          <div className="pt-2">
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
          <div className="flex items-center justify-center gap-6 text-xs text-white pt-2 font-bold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 30-Day Money-Back Guarantee</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-teal-400" /> 256-Bit SSL Encrypted Checkout</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-indigo-400" /> Cancel Anytime in 1-Click</span>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FunnelLegendsLogo size={36} />
              <div className="flex items-baseline gap-0.5 leading-none">
                <span className="font-black text-lg text-emerald-400">FUNNEL</span>
                <span className="font-black text-lg text-teal-400">LEGENDS</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">The ultimate ClickFunnels 2.0 alternative built for maximum speed, enterprise conversions, and zero technical friction.</p>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('features')} className="hover:text-emerald-400 transition-colors">Visual Drag-and-Drop Canvas</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-emerald-400 transition-colors">BountyPack Affiliate Engine</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-emerald-400 transition-colors">ChronoChimp Appointment Scheduler</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-emerald-400 transition-colors">TribeNexus Community Portal</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-emerald-400 transition-colors">PingPanda Multi-Channel Hub</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">Resources & Cookbook</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors">37 Cookbook Funnel Recipes</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-emerald-400 transition-colors">30-Day VIP Free Trial</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-emerald-400 transition-colors">2-Step Order Form Templates</button></li>
              <li><button onClick={() => onNavigate('login')} className="hover:text-emerald-400 transition-colors">Admin Portal Login</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">Enterprise Compliance</h4>
            <p className="text-xs leading-relaxed mb-4">Powered by Supabase PostgreSQL Database and Vercel Cloud Infrastructure.</p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] font-mono text-emerald-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Status: All Systems Operational (100% Uptime)</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} FunnelLegends Suite. Designed for High-Converting Digital Enterprises. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Earnings Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
