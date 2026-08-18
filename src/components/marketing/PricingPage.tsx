import React, { useState } from 'react';
import { 
  Check, Zap, ShieldCheck, Lock, Star, Sparkles, ArrowRight, CreditCard, User, Mail, Phone
} from 'lucide-react';
import { getAdminSession, saveAdminSession, syncAdminToSupabase } from '../../utils/adminSeed';

interface PricingPageProps {
  onOpenOrderModal: () => void;
  onLaunchPlatform: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenOrderModal, onLaunchPlatform }) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'enterprise'>('pro');

  return (
    <div className="bg-white text-slate-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-black uppercase tracking-wider">
            30-DAY RISK-FREE TRIAL
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Start Your 30-Day Free Trial Today</h1>
          <p className="text-slate-700 font-medium text-sm sm:text-base">No upfront commitment. Full access to all 12 tools & 37 Cookbook Funnel templates.</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Plan 1: Basic */}
          <div className="p-8 bg-white border border-emerald-200 rounded-3xl space-y-6 flex flex-col justify-between shadow-sm hover:border-emerald-400 transition-all">
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">Basic Starter</h3>
              <p className="text-xs text-slate-700 font-medium">Perfect for solo entrepreneurs starting their first sales funnel.</p>
              <div className="pt-2">
                <span className="text-4xl font-black text-slate-900">£0</span>
                <span className="text-xs text-slate-700 font-bold ml-2">For 30 Days</span>
                <p className="text-[11px] text-emerald-700 font-extrabold mt-1">Then £20/mo • Cancel Anytime</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-4 border-t border-emerald-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1 Workspaces & Custom Domain</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 20 Active Funnels & 100 Steps</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Visual Canvas Drag & Drop</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 37 Cookbook Templates</li>
              </ul>
            </div>
            <button
              onClick={() => { setSelectedPlan('basic'); onOpenOrderModal(); }}
              className="w-full py-3.5 rounded-xl text-xs font-black text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
            >
              START BASIC 30-DAY TRIAL
            </button>
          </div>

          {/* Plan 2: Pro (Featured) */}
          <div className="p-8 bg-white border-2 border-emerald-500 rounded-3xl space-y-6 flex flex-col justify-between shadow-2xl relative transform scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              ★ MOST POPULAR AGENCY CHOICE
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-2xl font-black text-slate-900">Pro Agency</h3>
              <p className="text-xs text-slate-800 font-medium">For scaling agencies and businesses requiring full suite access.</p>
              <div className="pt-2">
                <span className="text-4xl font-black text-slate-900">£0</span>
                <span className="text-xs text-emerald-400 font-bold ml-2">For 30 Days</span>
                <p className="text-[11px] text-emerald-400 font-bold mt-1">Then £50/mo • Unlimited Usage</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-900 font-medium pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Workspaces & Domains</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Funnels, Steps & Pages</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-400" /> BountyPack Affiliate Engine</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-400" /> ChronoChimp Appointments</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-400" /> TribeNexus Community Portal</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-400" /> Supabase Real-Time DB Sync</li>
              </ul>
            </div>

            <button
              onClick={() => { setSelectedPlan('pro'); onOpenOrderModal(); }}
              className="w-full py-4 rounded-xl text-xs font-black text-slate-900 shadow-xl transition-all hover:brightness-110 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #ee5d00 100%)' }}
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>CLAIM PRO 30-DAY FREE TRIAL</span>
            </button>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="p-8 bg-white border border-emerald-200 rounded-3xl space-y-6 flex flex-col justify-between shadow-sm hover:border-emerald-400 transition-all">
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">Enterprise VIP</h3>
              <p className="text-xs text-slate-700 font-medium">High-volume enterprises needing dedicated priority infrastructure.</p>
              <div className="pt-2">
                <span className="text-4xl font-black text-slate-900">£0</span>
                <span className="text-xs text-slate-700 font-bold ml-2">For 30 Days</span>
                <p className="text-[11px] text-emerald-700 font-extrabold mt-1">Then £100/mo • Dedicated VIP Support</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-4 border-t border-emerald-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Everything in Pro Agency</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Custom Certificate Generator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1-on-1 Funnel Hacker Onboarding</li>
              </ul>
            </div>
            <button
              onClick={() => { setSelectedPlan('enterprise'); onOpenOrderModal(); }}
              className="w-full py-3.5 rounded-xl text-xs font-black text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
            >
              START VIP 30-DAY TRIAL
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

// ── 2-STEP ORDER FORM MODAL ──
export interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const FunnelLegendsOrderModal: React.FC<OrderFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('Stephen Tofield');
  const [email, setEmail] = useState('tofield69@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [addBump, setAddBump] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save Admin Session and sync Stephen Tofield to Supabase
    saveAdminSession({
      id: 'usr_stephen_tofield_888',
      name: fullName || 'Stephen Tofield',
      email: email || 'tofield69@gmail.com',
      role: 'SuperAdmin',
      isLoggedIn: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      subscriptionPlan: '30-Day VIP Agency Pass (Active)',
      trialDaysLeft: 30
    });

    await syncAdminToSupabase();
    
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white border-2 border-emerald-500/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-slate-900">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">2-STEP ORDER FORM</span>
            <h3 className="text-xl font-black text-slate-900">Activate Your 30-Day Free Trial</h3>
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-900 text-xs font-bold">Close ✕</button>
        </div>

        {/* Step Indicator Pills */}
        <div className="grid grid-cols-2 gap-3 text-xs font-bold">
          <div className={`p-3 rounded-xl border flex items-center gap-2 ${step === 1 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white border-slate-200 text-slate-600'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-[10px]">1</span>
            <span>Contact Details</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${step === 2 ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white border-slate-200 text-slate-600'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-[10px]">2</span>
            <span>Trial Confirmation</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
          
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900">
                  <User className="w-4 h-4 text-slate-600" />
                  <input 
                    type="text" 
                    required
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    className="flex-1 bg-transparent outline-none font-medium text-xs"
                    placeholder="Stephen Tofield"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900">
                  <Mail className="w-4 h-4 text-slate-600" />
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
                <label className="block text-slate-700 font-bold mb-1">Phone Number (For Instant SMS Access Link)</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="flex-1 bg-transparent outline-none font-medium text-xs"
                    placeholder="+1 (555) 019-2834"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl font-black text-sm text-slate-900 shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #ee5d00 100%)' }}
              >
                <span>CONTINUE TO STEP 2 (FREE TRIAL ACTIVATION)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Summary */}
              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                  <span>FunnelLegends Pro VIP Pass (30 Days)</span>
                  <span className="text-emerald-400">£0.00 TODAY</span>
                </div>
                <p className="text-[11px] text-slate-600">Includes all 12 tools, Supabase database storage & 37 Cookbook templates.</p>
              </div>

              {/* Order Bump Box */}
              <div className="p-4 bg-amber-950/40 border-2 border-dashed border-amber-500/60 rounded-2xl space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={addBump}
                    onChange={(e) => setAddBump(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded mt-0.5"
                  />
                  <div>
                    <div className="font-extrabold text-amber-300 text-xs">⚡ ONE-TIME OFFER: Add 100+ High-Converting Lead Magnet Copy Templates for £17!</div>
                    <p className="text-[11px] text-slate-700 mt-1">Get instant access to pre-written headline formulas, email sequences, and high-ticket sales hooks.</p>
                  </div>
                </label>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 rounded mt-0.5"
                  />
                  <div>
                    <div className="font-bold text-slate-800 text-xs">I agree to the Privacy Policy, Terms of Service, and Earnings Disclaimer.</div>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-black text-sm text-slate-900 shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
              >
                {isSubmitting ? (
                  <span>ACTIVATING YOUR 30-DAY FREE TRIAL...</span>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-white" />
                    <span>COMPLETE ORDER & LAUNCH PLATFORM APP NOW →</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};
