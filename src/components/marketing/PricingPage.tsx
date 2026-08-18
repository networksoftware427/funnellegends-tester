import React, { useState } from 'react';
import { 
  Check, Zap, ShieldCheck, Lock, Star, Sparkles, ArrowRight, CreditCard, User, Mail, Phone, X, FileText
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
              START 30-DAY FREE TRIAL
            </button>
          </div>

          {/* Plan 2: Pro Agency (FEATURED) */}
          <div className="p-8 bg-white border-2 border-emerald-500 rounded-3xl space-y-6 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-slate-950" />
              <span>MOST POPULAR CHOICE</span>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-2xl font-black text-slate-900">Pro Agency</h3>
              <p className="text-xs text-slate-800 font-medium">For scaling agencies and businesses requiring full suite access.</p>
              <div className="pt-2">
                <span className="text-4xl font-black text-slate-900">£0</span>
                <span className="text-xs text-emerald-600 font-bold ml-2">For 30 Days</span>
                <p className="text-[11px] text-emerald-600 font-bold mt-1">Then £50/mo • Unlimited Usage</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-900 font-medium pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Workspaces & Domains</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Funnels, Steps & Pages</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> BountyPack Affiliate Engine</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> ChronoChimp Appointments</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> TribeNexus Community Portal</li>
                <li className="flex items-center gap-2 text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> Cloud Real-Time Database Sync</li>
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
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dedicated Cloud Edge IP Routing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1-on-1 Strategy & Setup Support</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 99.99% Guaranteed SLA Uptime</li>
              </ul>
            </div>
            <button
              onClick={() => { setSelectedPlan('enterprise'); onOpenOrderModal(); }}
              className="w-full py-3.5 rounded-xl text-xs font-black text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all"
            >
              START 30-DAY FREE TRIAL
            </button>
          </div>

        </div>

        {/* Guarantee Banner */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">100% Risk-Free 30-Day Money-Back Guarantee</h4>
              <p className="text-xs text-slate-600 font-medium">Cancel anytime inside your account dashboard with a single click. Zero hidden cancellation fees.</p>
            </div>
          </div>
          <button
            onClick={onOpenOrderModal}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shrink-0 transition-all shadow-lg shadow-emerald-600/20"
          >
            ACTIVATE MY FREE TRIAL NOW
          </button>
        </div>

      </div>
    </div>
  );
};

// Legal Documents Content Data for In-Modal Viewer
const LEGAL_DOCS: Record<'privacy' | 'terms' | 'disclaimer', { title: string; subtitle: string; content: string[] }> = {
  privacy: {
    title: "FunnelLegends Privacy Policy",
    subtitle: "Last Updated: August 2026 • Enterprise Data Protection & Security",
    content: [
      "1. Information We Collect: We collect information you provide directly to us when creating an account, including your full name, email address, company details, billing information, and custom domain settings.",
      "2. How We Use Information: We use your data to operate, maintain, and provide the features of the FunnelLegends marketing and funnel suite, process payments securely, and deliver automated email/SMS services.",
      "3. Data Protection & Encryption: All platform traffic and stored data are secured using industry-standard 256-Bit SSL encryption and enterprise cloud firewall protocols.",
      "4. Third-Party Disclosures: We do not sell or rent your personal information to third parties. Data is shared exclusively with certified payment processors (e.g., Stripe) to fulfill your transactions.",
      "5. Data Retention & Deletion: You retain full ownership of all customer data, funnels, and course materials. You may request complete deletion of your account and records at any time via support."
    ]
  },
  terms: {
    title: "FunnelLegends Terms of Service",
    subtitle: "Last Updated: August 2026 • Platform Agreement",
    content: [
      "1. Account Terms: By creating an account, you agree to provide true, accurate, and complete information. You are responsible for safeguarding your account credentials.",
      "2. 30-Day Free Trial: Your 30-day free trial allows complete access to all 12 platform tools and templates. You may cancel at any point before day 30 without being billed.",
      "3. Acceptable Use: You agree not to use FunnelLegends for unlawful activities, distribution of malware, unsolicited spam emails, or deceptive marketing practices.",
      "4. Intellectual Property: You retain all rights and intellectual property in the content, funnels, courses, and media assets you create or publish through the platform.",
      "5. Service Availability: FunnelLegends provides high-availability edge cloud hosting with continuous 99.9% uptime targets and automated daily backups."
    ]
  },
  disclaimer: {
    title: "Earnings & Conversion Disclaimer",
    subtitle: "Official Transparency Notice",
    content: [
      "1. Educational & Software Purpose: FunnelLegends is a software platform designed to provide conversion tools, visual funnel builders, and marketing infrastructure.",
      "2. No Income Guarantee: We do not guarantee, represent, or warrant that you will earn any specific amount of money or achieve particular conversion rates by using the software.",
      "3. Individual Results May Vary: Results depend on your individual business acumen, market demand, traffic generation quality, product pricing, and execution effort.",
      "4. Case Studies & Examples: Any earnings examples, conversion statistics, or testimonials shown on our website represent exceptional results and are not typical guarantees.",
      "5. Due Diligence: You agree to perform your own business due diligence and make informed marketing and financial decisions."
    ]
  }
};

/* ── 2-STEP ORDER FORM MODAL ── */
export const OrderModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}> = ({
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
  
  // In-Modal Legal Document Viewer State
  const [viewingDoc, setViewingDoc] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save Admin Session
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

    try {
      await syncAdminToSupabase();
    } catch (err) {
      console.warn('Background sync:', err);
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white border-2 border-emerald-500/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">2-STEP ORDER FORM</span>
            <h3 className="text-xl font-black text-slate-900">Activate Your 30-Day Free Trial</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 text-xs font-bold p-1">Close ✕</button>
        </div>

        {/* Step Indicator Pills */}
        <div className="grid grid-cols-2 gap-3 text-xs font-bold">
          <div className={`p-3 rounded-xl border flex items-center gap-2 ${step === 1 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-200 text-slate-600'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-[10px]">1</span>
            <span>Contact Details</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${step === 2 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-200 text-slate-600'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-[10px]">2</span>
            <span>Trial Confirmation</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
          
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900">
                  <User className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    required 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full bg-transparent outline-none font-medium" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" 
                    className="w-full bg-transparent outline-none font-medium" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Phone Number (Optional)</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000" 
                    className="w-full bg-transparent outline-none font-medium" 
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl font-black text-sm text-white shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #ee5d00 100%)' }}
              >
                <span>CONTINUE TO STEP 2 (FREE TRIAL ACTIVATION)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Summary */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
                  <span>FunnelLegends Pro VIP Pass (30 Days)</span>
                  <span className="text-emerald-600 font-black">£0.00 TODAY</span>
                </div>
                <p className="text-[11px] text-slate-600">Includes all 12 tools, ultra-secure cloud storage & 37 Cookbook templates.</p>
              </div>

              {/* Order Bump Box */}
              <div className="p-4 bg-amber-50 border-2 border-dashed border-amber-400 rounded-2xl space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={addBump}
                    onChange={(e) => setAddBump(e.target.checked)}
                    className="w-5 h-5 accent-amber-600 rounded mt-0.5"
                  />
                  <div>
                    <div className="font-extrabold text-amber-900 text-xs">⚡ ONE-TIME OFFER: Add 100+ High-Converting Lead Magnet Copy Templates for £17!</div>
                    <p className="text-[11px] text-amber-800 mt-1">Get instant access to pre-written headline formulas, email sequences, and high-ticket sales hooks.</p>
                  </div>
                </label>
              </div>

              {/* Terms and Conditions Checkbox with Clickable In-Modal Links */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600 rounded mt-0.5"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed font-medium">
                    <span>I agree to the </span>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); setViewingDoc('privacy'); }}
                      className="text-emerald-700 font-bold underline hover:text-emerald-600"
                    >
                      Privacy Policy
                    </button>
                    <span>, </span>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); setViewingDoc('terms'); }}
                      className="text-emerald-700 font-bold underline hover:text-emerald-600"
                    >
                      Terms of Service
                    </button>
                    <span>, and </span>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); setViewingDoc('disclaimer'); }}
                      className="text-emerald-700 font-bold underline hover:text-emerald-600"
                    >
                      Earnings Disclaimer
                    </button>
                    <span>.</span>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-black text-sm text-white shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
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

        {/* ── IN-MODAL LEGAL DOCUMENT VIEWER POPUP ── */}
        {viewingDoc && (
          <div className="absolute inset-0 z-50 bg-white p-6 rounded-3xl flex flex-col space-y-4 shadow-2xl border-2 border-emerald-400 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-sm font-black text-slate-900">{LEGAL_DOCS[viewingDoc].title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{LEGAL_DOCS[viewingDoc].subtitle}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewingDoc(null)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs text-slate-700 leading-relaxed font-medium">
              {LEGAL_DOCS[viewingDoc].content.map((paragraph, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  {paragraph}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setAgreedToTerms(true);
                  setViewingDoc(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Agree & Return to Order</span>
              </button>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Back to Order
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export const FunnelLegendsOrderModal = OrderModal;
