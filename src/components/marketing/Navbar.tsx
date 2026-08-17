import { FunnelLegendsLogo } from '../../App';
import { Rocket, ArrowRight, ShieldCheck, Zap, User, Lock, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'features' | 'pricing' | 'login';
  onNavigate: (tab: 'home' | 'features' | 'pricing' | 'login') => void;
  onOpenOrderModal: () => void;
  onLaunchPlatform: () => void;
}

export const MarketingNavbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenOrderModal,
  onLaunchPlatform
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 text-white text-center py-2 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
        <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold tracking-wide">SPECIAL OFFER</span>
        <span>🎉 Claim Your 30-Day Free Trial + 37 High-Converting Cookbook Templates Included!</span>
        <button 
          onClick={onOpenOrderModal}
          className="underline hover:text-orange-300 transition-colors ml-2 font-extrabold flex items-center gap-1 text-orange-400"
        >
          Claim Now <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <FunnelLegendsLogo size={42} />
          <div>
            <div className="flex items-baseline gap-0.5 leading-none">
              <span className="font-black text-xl tracking-tight text-emerald-600 group-hover:text-emerald-500 transition-colors">FUNNEL</span>
              <span className="font-black text-xl tracking-tight text-teal-700 group-hover:text-teal-600 transition-colors">LEGENDS</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">Next-Gen Funnel & Sales Architecture</p>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors py-1 border-b-2 ${activeTab === 'home' ? 'text-emerald-600 border-emerald-500 font-extrabold' : 'text-slate-700 hover:text-emerald-600 border-transparent'}`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('features')}
            className={`transition-colors py-1 border-b-2 ${activeTab === 'features' ? 'text-emerald-600 border-emerald-500 font-extrabold' : 'text-slate-700 hover:text-emerald-600 border-transparent'}`}
          >
            Features
          </button>

          <button
            onClick={() => onNavigate('pricing')}
            className={`transition-colors py-1 border-b-2 ${activeTab === 'pricing' ? 'text-emerald-600 border-emerald-500 font-extrabold' : 'text-slate-700 hover:text-emerald-600 border-transparent'}`}
          >
            Pricing
          </button>

          <button
            onClick={() => onNavigate('login')}
            className={`transition-colors py-1 border-b-2 flex items-center gap-1.5 ${activeTab === 'login' ? 'text-emerald-600 border-emerald-500 font-extrabold' : 'text-slate-700 hover:text-emerald-600 border-transparent'}`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Admin Login</span>
          </button>
        </nav>

        {/* Right CTA Group */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchPlatform}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-teal-400" />
            <span>Launch App</span>
          </button>

          <button
            onClick={onOpenOrderModal}
            className="px-5 py-2.5 rounded-xl text-xs font-black text-white shadow-xl transition-all hover:scale-105 animate-pulse flex items-center gap-2"
            style={{ 
              background: 'linear-gradient(135deg, #FF6A00 0%, #ee5d00 100%)',
              boxShadow: '0 4px 20px rgba(255, 106, 0, 0.4)'
            }}
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>START 30-DAY FREE TRIAL</span>
          </button>
        </div>
      </div>
    </header>
  );
};
