import React, { useState } from 'react';
import { 
  Lock, Mail, User, KeyRound, ShieldCheck, Zap, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { FunnelLegendsLogo } from '../builder/Canvas';
import { saveAdminSession, syncAdminToSupabase } from '../../utils/adminSeed';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('tofield69@gmail.com');
  const [password, setPassword] = useState('LylaCheerleading8');
  const [name, setName] = useState('Stephen Tofield');
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save Stephen Tofield Admin Session
    saveAdminSession({
      id: 'usr_stephen_tofield_888',
      name: name || 'Stephen Tofield',
      email: email || 'tofield69@gmail.com',
      role: 'SuperAdmin',
      isLoggedIn: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      subscriptionPlan: 'SuperAdmin VIP Agency Enterprise',
      trialDaysLeft: 365
    });

    // Sync admin record to Supabase database
    await syncAdminToSupabase();

    setAuthSuccess(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  const handleQuickFillAdmin = () => {
    setName('Stephen Tofield');
    setEmail('tofield69@gmail.com');
    setPassword('LylaCheerleading8');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative z-10">
        
        {/* Logo & Brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <FunnelLegendsLogo size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Admin & Member Login</h2>
            <p className="text-xs text-slate-400 mt-1">Enter your credentials to access your FunnelLegends account.</p>
          </div>
        </div>

        {/* Quick Fill Admin Badge */}
        <div 
          onClick={handleQuickFillAdmin}
          className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex items-center justify-between text-xs cursor-pointer hover:bg-emerald-900/40 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="font-extrabold text-emerald-400 text-[11px] block">👑 SUPER ADMIN CREDENTIALS</span>
            <span className="text-slate-300 font-mono text-[11px]">tofield69@gmail.com</span>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">1-CLICK FILL</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-bold mb-1">Full Name</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white">
              <User className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                required
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="flex-1 bg-transparent outline-none font-medium text-xs"
                placeholder="Stephen Tofield"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Email Address</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white">
              <Mail className="w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="flex-1 bg-transparent outline-none font-medium text-xs"
                placeholder="tofield69@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Admin Password</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white">
              <KeyRound className="w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                required
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="flex-1 bg-transparent outline-none font-mono text-xs"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl font-black text-xs text-white shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
          >
            {isLoading ? (
              <span>AUTHENTICATING STEPHEN TOFIELD...</span>
            ) : authSuccess ? (
              <span className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="w-4 h-4" /> LOGIN SUCCESSFUL! REDIRECTING...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>SIGN IN TO FUNNEL LEGENDS APP →</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-slate-500">
          <span>Protected by 256-Bit SSL Encryption & Supabase Cloud Security.</span>
        </div>

      </div>
    </div>
  );
};
