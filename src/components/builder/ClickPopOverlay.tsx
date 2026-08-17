import React, { useState } from 'react';
import { ClickPopSettings } from '../../types/builder';
import { 
  Sparkles, X, CheckCircle, ArrowRight, ShieldCheck, Mail, BookOpen, Clock, 
  Gift, Star, Award, Video, Play, Lock, User, Phone, Globe, Check, Flame, Zap
} from 'lucide-react';

interface ClickPopOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ClickPopSettings;
}

export const ClickPopOverlay: React.FC<ClickPopOverlayProps> = ({
  isOpen,
  onClose,
  settings
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleOptinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 2200);
  };

  const layoutVariant = settings.layoutVariant || 'default';

  return (
    <div className="fixed inset-0 z-[100] bg-white/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      {/* Container wrapper rendering layout variant */}
      <div className="relative w-full max-w-2xl my-auto">

        {/* VARIANT 1: BOOK SPLIT (2-Column E-Book Vault) */}
        {layoutVariant === 'book_split' && (
          <div className="bg-white border border-indigo-200 rounded-3xl overflow-hidden shadow-2xl text-slate-900 grid grid-cols-1 md:grid-cols-12 relative">
            <button onClick={onClose} className="absolute top-3 right-3 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full border border-slate-200 transition-colors">
              <X className="w-4 h-4" />
            </button>
            {/* Left 3D Book Graphic */}
            <div className="md:col-span-5 bg-[url('https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-900/70 backdrop-blur-[2px]"></div>
              <div className="w-32 h-44 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg border-2 border-indigo-300 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-4 flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform relative z-10">
                <BookOpen className="w-8 h-8 text-amber-300 drop-shadow-md" />
                <div className="text-[11px] font-black text-slate-900 text-left leading-tight drop-shadow-md">2026 FUNNEL ARCHITECTURE BLUEPRINT</div>
                <div className="text-[9px] text-indigo-100 text-left font-mono font-bold">48 PAGES • PDF</div>
              </div>
              <span className="text-[10px] text-white font-extrabold mt-4 uppercase tracking-wider bg-indigo-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-400/50 relative z-10 shadow-xl">
                100% Free Instant Download
              </span>
            </div>
            {/* Right Form */}
            <div className="md:col-span-7 p-6 space-y-4 bg-gradient-to-br from-indigo-50 to-blue-50">
              <div className="space-y-1.5 text-left">
                <span className="inline-block text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">{settings.badgeText}</span>
                <h2 className="text-xl font-black text-slate-900 leading-tight">{settings.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{settings.subtitle}</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3 pt-1 text-left">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
                    <input type="email" required placeholder="Enter business email for instant PDF..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-900 shadow-inner transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
                    <BookOpen className="w-4 h-4" />
                    <span>{settings.buttonText}</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">PDF Blueprint Dispatched to Inbox!</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 2: CYBER EXIT INTENT (Neon Lightbox) */}
        {layoutVariant === 'cyber_exit' && (
          <div className="bg-white border-2 border-pink-500 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.25)] text-slate-900 p-6 md:p-8 space-y-5 text-center relative bg-[url('https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-overlay">
            <div className="absolute inset-0 bg-white/85 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white text-pink-400 hover:text-pink-300 hover:bg-slate-50 rounded-full border border-pink-500/40 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1.5 bg-pink-950/80 text-pink-300 border border-pink-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider animate-pulse shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                <Zap className="w-4 h-4 text-amber-300" />
                <span>{settings.badgeText}</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight drop-shadow-md">{settings.title}</h2>
                <p className="text-xs md:text-sm text-pink-100/90 max-w-md mx-auto">{settings.subtitle}</p>
              </div>
              <div className="p-3 bg-white/90 border border-pink-500/50 rounded-2xl max-w-md mx-auto flex items-center justify-between font-mono text-xs shadow-lg shadow-pink-500/10">
                <span className="text-slate-600">PROMO CODE:</span>
                <span className="text-pink-400 font-extrabold bg-pink-950 px-3 py-1 rounded border border-pink-500 shadow-inner">SAVE80VIP</span>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3 max-w-md mx-auto">
                  <input type="email" required placeholder="Enter email to lock $150 promo voucher..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white/90 border border-pink-900 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-500 transition-all" />
                  <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black py-3.5 rounded-xl text-xs shadow-lg shadow-pink-500/40 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                    <span>{settings.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-emerald-500/50 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">Voucher Code Locked to Email!</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 3: WEBINAR PASS (Emerald Studio Layout) */}
        {layoutVariant === 'webinar_pass' && (
          <div className="bg-emerald-950 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] text-slate-900 p-6 md:p-8 space-y-5 text-left relative bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-overlay">
            <div className="absolute inset-0 bg-white/85 z-0 backdrop-blur-[2px]"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white text-slate-600 hover:text-slate-900 rounded-full border border-slate-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <Video className="w-4 h-4" />
                  <span>{settings.badgeText}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40 font-bold shadow-sm">
                  <Clock className="w-3 h-3 animate-pulse" />
                  <span>STARTS IN 14 MINS</span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">{settings.title}</h2>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{settings.subtitle}</p>
              </div>
              {/* Host Avatar Row */}
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-emerald-900/50 shadow-inner">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold shrink-0 shadow-md border-2 border-emerald-200">
                  MV
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Host: Mark Vance (Funnel Architect)</div>
                  <div className="text-[10px] text-emerald-300">Live Q&A Session + Free Resource Download</div>
                </div>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <input type="text" required placeholder="First Name..." value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="bg-white/90 border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all" />
                    <input type="email" required placeholder="Best Email Address..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="bg-white/90 border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                    <Video className="w-4 h-4" />
                    <span>{settings.buttonText}</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-emerald-500/40 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">Workshop Pass Reserved! Link sent.</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 4: GOLD LUXURY (Agency & Coaching Audit) */}
        {layoutVariant === 'gold_luxury' && (
          <div className="bg-white border-2 border-amber-500/50 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.15)] text-slate-900 p-6 md:p-8 space-y-5 text-left relative bg-[url('https://images.unsplash.com/photo-1606132338520-2228fbb44005?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-multiply">
            <div className="absolute inset-0 bg-white/80 z-0"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white text-amber-500 hover:text-amber-400 hover:bg-slate-50 rounded-full border border-amber-500/30 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between border-b border-amber-900/50 pb-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">{settings.badgeText}</span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-950/40 px-2 py-1 rounded-md border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>5.0 / 5.0 RATED AUDIT</span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight drop-shadow-md">{settings.title}</h2>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{settings.subtitle}</p>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3">
                  <input type="text" required placeholder="Full Name..." value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full bg-white/80 border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all" />
                  <input type="email" required placeholder="Work Email..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white/80 border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all" />
                  <input type="tel" placeholder="Mobile Phone for SMS Confirmation..." value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} className="w-full bg-white/80 border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all" />
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                    <Award className="w-4 h-4" />
                    <span>{settings.buttonText}</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-emerald-500/40 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">Application Received! We will contact you shortly.</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 5: SAAS CARD (Free Pro Software Trial) */}
        {layoutVariant === 'saas_card' && (
          <div className="bg-gradient-to-br from-violet-900 via-slate-950 to-fuchsia-950 border border-violet-500/40 rounded-3xl overflow-hidden shadow-2xl text-slate-900 p-6 md:p-8 space-y-5 text-center relative bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-overlay">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white text-slate-600 hover:text-slate-900 rounded-full border border-slate-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <span className="inline-block bg-violet-600 text-slate-900 font-extrabold text-xs px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.4)] uppercase tracking-wider">
                {settings.badgeText}
              </span>
              <div className="space-y-2 max-w-lg mx-auto">
                <h2 className="text-2xl font-black text-slate-900 drop-shadow-md">{settings.title}</h2>
                <p className="text-xs text-violet-200/90 font-medium">{settings.subtitle}</p>
              </div>
              {/* Interactive feature pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold text-violet-200">
                <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-violet-500/30 backdrop-blur-sm">✓ Visual Builder Engine</span>
                <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-violet-500/30 backdrop-blur-sm">✓ Stripe Token Vault</span>
                <span className="bg-white/80 px-3 py-1.5 rounded-lg border border-violet-500/30 backdrop-blur-sm">✓ AI VSL Copywriter</span>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3 max-w-md mx-auto pt-2">
                  <input type="email" required placeholder="Enter work email address..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white/90 border border-violet-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 transition-all" />
                  <button type="submit" className="w-full bg-violet-600 hover:bg-violet-500 text-slate-900 font-extrabold py-3.5 rounded-xl text-xs shadow-lg shadow-violet-600/40 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                    <span>{settings.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-emerald-500/40 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">SaaS Trial Provisioned! Redirecting to Workspace...</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 6: EDITORIAL (VIP Growth Newsletter) */}
        {layoutVariant === 'editorial' && (
          <div className="bg-[#fdfbf7] border border-[#e5e0d8] rounded-3xl overflow-hidden shadow-2xl text-slate-900 p-6 md:p-8 space-y-5 text-left font-serif relative">
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-full border border-slate-200 font-sans shadow-sm transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="border-b border-[#e5e0d8] pb-3 flex items-center justify-between font-sans text-xs">
              <span className="font-extrabold text-blue-700 tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">{settings.badgeText}</span>
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">TUESDAY EDITION</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-normal text-slate-900 italic leading-tight">{settings.title}</h2>
              <p className="text-xs font-sans text-slate-600 leading-relaxed font-medium">{settings.subtitle}</p>
            </div>
            {!isSubmitted ? (
              <form onSubmit={handleOptinSubmit} className="space-y-3 font-sans pt-2">
                <input type="email" required placeholder="Enter your email address..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white border border-[#e5e0d8] focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none shadow-inner rounded-xl px-4 py-3 text-xs text-slate-900 transition-all" />
                <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                  <Mail className="w-4 h-4" />
                  <span>{settings.buttonText}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center font-sans animate-fade-in">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-emerald-900">Subscribed! Check your inbox for Tuesday's edition.</h4>
              </div>
            )}
          </div>
        )}

        {/* VARIANT 7: FLASH SCARCITY (Crimson Clock Box) */}
        {layoutVariant === 'flash_scarcity' && (
          <div className="bg-gradient-to-b from-rose-600 to-red-950 border-4 border-red-500 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.3)] text-slate-900 p-6 md:p-8 space-y-5 text-center relative bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-overlay">
            <div className="absolute inset-0 bg-red-950/70 z-0"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white text-slate-700 hover:text-slate-900 rounded-full border border-red-500/50 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider animate-pulse shadow-[0_0_20px_rgba(225,29,72,0.6)] border border-red-400">
                <Flame className="w-4 h-4 fill-current text-amber-300" />
                <span>{settings.badgeText}</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 drop-shadow-lg">{settings.title}</h2>
                <p className="text-xs text-rose-200/90 max-w-md mx-auto font-medium">{settings.subtitle}</p>
              </div>
              {/* Live Ticking Scarcity Digital Clock */}
              <div className="flex items-center justify-center gap-3 bg-white/90 p-3.5 rounded-2xl border border-red-500/50 max-w-xs mx-auto font-mono shadow-inner">
                <div className="text-center"><span className="text-2xl font-black text-red-500">00</span><div className="text-[9px] text-slate-600 font-sans tracking-widest">HRS</div></div>
                <span className="text-red-600 font-bold text-xl pb-3">:</span>
                <div className="text-center"><span className="text-2xl font-black text-red-500">14</span><div className="text-[9px] text-slate-600 font-sans tracking-widest">MIN</div></div>
                <span className="text-red-600 font-bold text-xl pb-3">:</span>
                <div className="text-center"><span className="text-2xl font-black text-red-500 animate-pulse">59</span><div className="text-[9px] text-slate-600 font-sans tracking-widest">SEC</div></div>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3 max-w-md mx-auto pt-1">
                  <input type="email" required placeholder="Enter email to claim $97 bundle..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white/90 border border-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 transition-all" />
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl text-xs shadow-lg shadow-red-600/50 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 border border-red-400/50">
                    <span>{settings.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-emerald-500/50 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">Flash Bundle Pass Claimed!</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 8: VSL CINEMA (Video Case Study Gate) */}
        {layoutVariant === 'vsl_cinema' && (
          <div className="bg-white border border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl text-slate-900 p-6 md:p-8 space-y-5 text-center relative bg-[url('https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-multiply">
            <div className="absolute inset-0 bg-white/85 z-0"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white text-slate-600 hover:text-slate-900 rounded-full border border-slate-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <span className="inline-block text-xs font-black text-indigo-400 uppercase tracking-wider bg-indigo-950/50 px-3 py-1 rounded-md border border-indigo-500/20">{settings.badgeText}</span>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 drop-shadow-md">{settings.title}</h2>
                <p className="text-xs text-slate-700 font-medium">{settings.subtitle}</p>
              </div>
              {/* Video Thumbnail Frame */}
              <div className="relative aspect-video max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-white shadow-xl shadow-indigo-900/20 flex items-center justify-center group">
                <img src={settings.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80'} alt="Video" className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] absolute group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3 max-w-md mx-auto">
                  <input type="email" required placeholder="Enter email to unlock video player..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white/90 border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-500 transition-all" />
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                    <Play className="w-4 h-4 fill-current" />
                    <span>{settings.buttonText}</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-emerald-500/40 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">Video Unlocked! Launching Stream...</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 9: BETA GLASS (Futuristic Waitlist Pass) */}
        {layoutVariant === 'beta_glass' && (
          <div className="bg-white/70 backdrop-blur-2xl border border-purple-500/40 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.2)] text-slate-900 p-6 md:p-8 space-y-5 text-left relative bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-overlay">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-0"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white/80 text-slate-600 hover:text-slate-900 rounded-full border border-slate-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/50 px-2 py-1 rounded">{settings.badgeText}</span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-bold shadow-sm">500 BETA SPOTS</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 drop-shadow-md">{settings.title}</h2>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{settings.subtitle}</p>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <input type="email" required placeholder="Work Email..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="bg-white/80 border border-slate-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all" />
                    <input type="text" placeholder="Company Website URL..." value={companyInput} onChange={(e) => setCompanyInput(e.target.value)} className="bg-white/80 border border-slate-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 border border-purple-400/30">
                    <Lock className="w-4 h-4" />
                    <span>{settings.buttonText}</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/80 rounded-xl border border-emerald-500/40 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">Beta Ticket #0482 Confirmed!</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VARIANT 10: SPIN WHEEL (Gamified Mystery Gift) */}
        {layoutVariant === 'spin_wheel' && (
          <div className="bg-white border-4 border-amber-400 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.3)] text-slate-900 p-6 md:p-8 space-y-5 text-center relative bg-[url('https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center bg-blend-overlay">
            <div className="absolute inset-0 bg-white/85 z-0"></div>
            <div className="relative z-10 space-y-5">
              <button onClick={onClose} className="absolute -top-2 -right-2 z-20 p-2 bg-white text-amber-400 hover:text-amber-300 hover:bg-slate-50 rounded-full border border-amber-500/40 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-900 border-2 border-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                <Gift className="w-4 h-4 text-slate-900" />
                <span>{settings.badgeText}</span>
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-2xl font-black text-slate-900 drop-shadow-md">{settings.title}</h2>
                <p className="text-xs text-amber-100/90 font-medium">{settings.subtitle}</p>
              </div>
              {/* Gamified Spin Wheel Badge */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 p-1.5 mx-auto shadow-[0_0_30px_rgba(251,191,36,0.4)] animate-spin-slow">
                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-center p-2 border border-slate-300">
                  <span className="text-[10px] font-bold text-amber-400 tracking-wider">YOU WON</span>
                  <span className="text-sm font-black text-slate-900 drop-shadow-sm">$200 OFF</span>
                </div>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3 max-w-md mx-auto pt-2">
                  <input type="email" required placeholder="Enter email to claim $200 mystery voucher..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white/90 border border-amber-900/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 transition-all" />
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-900 font-black py-4 rounded-xl text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 border border-white/20">
                    <Gift className="w-4 h-4" />
                    <span>{settings.buttonText}</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-white/90 rounded-xl border border-emerald-500/40 text-center animate-fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-400">$200 Mystery Voucher Unlocked! Applying...</h4>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DEFAULT FALLBACK VARIANT */}
        
        {/* VARIANT: FLAT CLICK POP */}
        {layoutVariant === 'flat_click_pop' && (
          <div 
            className="rounded-xl overflow-hidden shadow-2xl p-8 space-y-6 text-center relative max-w-md mx-auto"
            style={{ 
              backgroundColor: settings.backgroundColor || '#ffffff',
              color: settings.textColor || '#0f172a',
              fontFamily: settings.fontFamily || 'Open Sans'
            }}
          >
            <button onClick={onClose} className="absolute top-3 right-3 z-20 p-2 text-slate-600 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            {settings.imageUrl && (
              <img src={settings.imageUrl} alt="Logo" className="h-12 mx-auto mb-4 object-contain" />
            )}
            
            <h2 className="text-2xl font-black leading-tight" style={{ color: settings.textColor || '#1e40af' }}>
              {settings.title}
            </h2>
            
            {!isSubmitted ? (
              <form onSubmit={handleOptinSubmit} className="space-y-4 pt-2">
                <input 
                  type="email" 
                  required 
                  placeholder="Email Address" 
                  value={emailInput} 
                  onChange={(e) => setEmailInput(e.target.value)} 
                  className="w-full bg-white border border-slate-300 outline-none rounded-md px-4 py-3 text-sm text-slate-900 transition-all"
                  style={{ fontFamily: settings.fontFamily || 'Open Sans' }}
                />
                <button 
                  type="submit" 
                  className="w-full font-bold py-3 px-4 rounded-md text-sm shadow-md transition-all hover:opacity-90"
                  style={{
                    backgroundColor: settings.buttonColor || '#2563eb',
                    color: settings.buttonTextColor || '#ffffff',
                    fontFamily: settings.fontFamily || 'Open Sans'
                  }}
                >
                  {settings.buttonText}
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Success!</h4>
              </div>
            )}
          </div>
        )}

        {layoutVariant === 'default' && (
          <div className="relative max-w-xl w-full bg-gradient-to-b from-slate-900 to-slate-950 border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0 text-slate-900">
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-slate-50 text-slate-700 rounded-full border border-slate-300 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 text-center text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{settings.badgeText || "SPECIAL CLICKPOP EXCLUSIVE OFFER"}</span>
            </div>
            <div className="p-6 md:p-8 space-y-5 text-center">
              {settings.imageUrl && (
                <div className="max-w-xs mx-auto aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                  <img src={settings.imageUrl} alt="Popup Offer" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight drop-shadow-md">{settings.title}</h2>
                <p className="text-xs md:text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-medium">{settings.subtitle}</p>
              </div>
              {!isSubmitted ? (
                <form onSubmit={handleOptinSubmit} className="space-y-3 max-w-md mx-auto pt-2">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-600 absolute left-4 top-3.5" />
                    <input type="email" required placeholder="Enter your email address..." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black py-4 px-6 rounded-2xl text-xs md:text-sm shadow-xl shadow-pink-600/40 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                    <span>{settings.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-semibold pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Secure • We respect your privacy & zero spam policy</span>
                  </div>
                </form>
              ) : (
                <div className="p-6 bg-white rounded-2xl border border-emerald-500/40 text-center space-y-3 animate-fade-in">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-black text-slate-900">Success! Your Special Offer Has Been Unlocked.</h3>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
