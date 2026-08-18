import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, 
  ShieldCheck, Globe, Calendar, ArrowRight, Sparkles, Building, Headphones, ExternalLink
} from 'lucide-react';

interface ContactPageProps {
  onNavigateToSupport?: () => void;
  onNavigateToGuides?: () => void;
  onNavigateToAppointments?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateToSupport,
  onNavigateToGuides,
  onNavigateToAppointments
}) => {
  const [name, setName] = useState('Stephen Tofield');
  const [email, setEmail] = useState('tofield69@gmail.com');
  const [inquiryType, setInquiryType] = useState('Enterprise Growth Consulting');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      {/* ── TOP HEADER ── */}
      <div 
        className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <Mail className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                Contact & Enterprise Desk
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Headphones className="w-3 h-3 text-emerald-300" />
                Dedicated Account Rep Active
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">Direct communications channel for inquiries, enterprise licensing & strategic support.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onNavigateToSupport && (
            <button
              onClick={onNavigateToSupport}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>Support Helpdesk</span>
            </button>
          )}

          {onNavigateToGuides && (
            <button
              onClick={onNavigateToGuides}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Tool Guides</span>
            </button>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-6">
        
        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm hover:border-emerald-400 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Direct Email Support</h3>
            <p className="text-xs text-slate-500">Fast response within 2-4 hours for all active members and enterprise clients.</p>
            <div className="pt-2 font-mono text-xs font-bold text-emerald-700">
              support@funnellegends.com
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm hover:border-teal-400 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Global Operating Hours</h3>
            <p className="text-xs text-slate-500">Round-the-clock priority response queue with engineering coverage across all timezones.</p>
            <div className="pt-2 text-xs font-bold text-slate-800">
              24/7/365 Global Coverage
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm hover:border-green-400 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center font-black">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-slate-900">1-on-1 Strategy Demo</h3>
            <p className="text-xs text-slate-500">Schedule a dedicated screen-share session with a senior FunnelLegends growth architect.</p>
            {onNavigateToAppointments && (
              <button 
                onClick={onNavigateToAppointments}
                className="pt-2 text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
              >
                <span>Book via ChronoChimp →</span>
              </button>
            )}
          </div>

        </div>

        {/* Contact Form Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">Send Direct Inquiry / Request</h3>
            <p className="text-xs text-slate-500 mt-0.5">Your message is routed directly to your assigned FunnelLegends customer success manager.</p>
          </div>

          {submitSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-950 font-bold animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been dispatched successfully. A customer success specialist will reply via email shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Inquiry Department / Type</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium"
                >
                  <option value="Enterprise Growth Consulting">Enterprise Growth Consulting</option>
                  <option value="Custom Funnel Architecture Review">Custom Funnel Architecture Review</option>
                  <option value="Custom Domain & DNS Setup Assistance">Custom Domain & DNS Setup Assistance</option>
                  <option value="Payment Gateway & Stripe Integration">Payment Gateway & Stripe Integration</option>
                  <option value="Affiliate & Partner Program Inquiries">Affiliate & Partner Program Inquiries</option>
                  <option value="General Feedback & Feature Request">General Feedback & Feature Request</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject Line</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Scaling multi-step sales funnel traffic"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Message Details</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry, requirements, or how our team can best assist you..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Protected by 256-Bit SSL Encryption. Your privacy is guaranteed.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Team →</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
