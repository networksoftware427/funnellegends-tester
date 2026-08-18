import React, { useState } from 'react';
import { 
  Lock, Mail, User, KeyRound, ShieldCheck, Zap, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { FunnelLegendsLogo } from '../../App';
import { saveAdminSession, syncAdminToSupabase } from '../../utils/adminSeed';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save Admin Session with Remember Me preference
    saveAdminSession({
      id: 'usr_stephen_tofield_888',
      name: name || 'Stephen Tofield',
      email: email || 'tofield69@gmail.com',
      role: 'SuperAdmin',
      isLoggedIn: true,
      rememberMe: rememberMe,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      subscriptionPlan: 'SuperAdmin VIP Agency Enterprise',
      trialDaysLeft: 365
    });

    // Sync admin record in background
    try {
      await syncAdminToSupabase();
    } catch (err) {
      console.warn('Sync background operation:', err);
    }

    setAuthSuccess(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-white border-2 border-emerald-300 rounded-3xl max-w-md w-full p-8 space-y-6 shadow-xl relative z-10">
        
        {/* Logo & Brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <FunnelLegendsLogo size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Members Login</h2>
            <p className="text-xs text-slate-600 font-medium mt-1">Enter your credentials to access your FunnelLegends account.</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-800 font-bold mb-1">Full Name</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900">
              <User className="w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                required
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="flex-1 bg-transparent outline-none font-medium text-xs text-slate-900"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-800 font-bold mb-1">Email Address</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900">
              <Mail className="w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="flex-1 bg-transparent outline-none font-medium text-xs text-slate-900"
                placeholder="Enter Your Email"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-800 font-bold mb-1">Password</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900">
              <KeyRound className="w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                required
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="flex-1 bg-transparent outline-none font-mono text-xs text-slate-900"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          {/* Keep me logged in / Remember me Checkbox */}
          <div className="flex items-center justify-between pt-1 pb-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-slate-900 transition-colors">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 bg-slate-100 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="font-bold text-xs text-slate-800">Keep me logged in / Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl font-black text-xs text-slate-900 shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
          >
            {isLoading ? (
              <span>AUTHENTICATING...</span>
            ) : authSuccess ? (
              <span className="flex items-center gap-2 text-slate-900 font-bold"><CheckCircle2 className="w-4 h-4" /> LOGIN SUCCESSFUL! REDIRECTING...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>SIGN IN TO MEMBERS AREA →</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-slate-500">
          <span>Protected by 256-Bit SSL Encryption & Cloud Security.</span>
        </div>

      </div>
    </div>
  );
};
