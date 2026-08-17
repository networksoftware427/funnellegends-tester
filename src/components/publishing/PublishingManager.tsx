import React, { useState } from 'react';
import { FunnelData, FunnelStepData, PageStatus } from '../../types/builder';
import { 
  Globe, ShieldCheck, Split, History, CheckCircle, Clock, Archive, 
  ExternalLink, Copy, Check, Sparkles, Layers, Sliders, Server
} from 'lucide-react';

interface PublishingManagerProps {
  funnel: FunnelData;
  activeStep: FunnelStepData;
  onUpdateStepStatus: (stepId: string, status: PageStatus) => void;
  onUpdateStepAbTest: (stepId: string, abEnabled: boolean, trafficSplit: number) => void;
}

export const PublishingManager: React.FC<PublishingManagerProps> = ({
  funnel,
  activeStep,
  onUpdateStepStatus,
  onUpdateStepAbTest,
}) => {
  const [subdomain, setSubdomain] = useState('growthlabs');
  const [customDomain, setCustomDomain] = useState('funnel.growthlabs.io');
  const [isCopied, setIsCopied] = useState(false);
  const [copiedDns, setCopiedDns] = useState<string | null>(null);
  const [trafficSplit, setTrafficSplit] = useState(activeStep.trafficSplitPercent || 50);

  const fullUrl = `https://${customDomain || `${subdomain}.launchengine.io`}/${funnel.slug}/${activeStep.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleCopyDnsRecord = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedDns(key);
    setTimeout(() => setCopiedDns(null), 2500);
  };

  const statuses: { id: PageStatus; label: string; color: string; icon: any }[] = [
    { id: 'Draft', label: 'Draft Mode', color: 'bg-amber-950 text-amber-400 border-amber-800', icon: Clock },
    { id: 'Scheduled', label: 'Scheduled', color: 'bg-blue-950 text-blue-400 border-blue-800', icon: Clock },
    { id: 'Published', label: 'Published (Live)', color: 'bg-emerald-950 text-emerald-400 border-emerald-800', icon: CheckCircle },
    { id: 'Archived', label: 'Archived', color: 'bg-slate-50 text-slate-600 border-slate-300', icon: Archive }
  ];

  return (
    <div className="flex-1 bg-white p-6 text-slate-900 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs tracking-wider uppercase mb-1">
            <Globe className="w-4 h-4" />
            <span>DOMAIN D: PUBLISHING & DOMAIN ROUTING ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Publishing & Edge A/B Routing Settings</h1>
          <p className="text-xs text-slate-600 mt-1">Configure domain resolution, custom SSL certificates, lifecycle states, and edge traffic split testing.</p>
        </div>

        {/* SECTION 1: LIFECYCLE STATE MACHINE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Funnel Step Lifecycle State Machine</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {statuses.map((st) => {
              const IconComp = st.icon;
              const isCurrent = activeStep.status === st.id;
              return (
                <button 
                  key={st.id}
                  onClick={() => onUpdateStepStatus(activeStep.id, st.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${isCurrent ? `${st.color} shadow-lg ring-2 ring-indigo-500` : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  <IconComp className="w-5 h-5 mb-2" />
                  <div className="text-xs font-extrabold">{st.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{isCurrent ? 'Active State' : 'Click to Switch'}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: DOMAIN & SLUG ROUTING ENGINE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Domain Mapping & Edge SSL Resolution</h3>
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              <ShieldCheck className="w-4 h-4" />
              <span>SSL Provisioned & Active</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Multi-Tenant Subdomain</label>
              <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700">
                <input 
                  type="text" 
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="bg-transparent font-mono text-slate-900 focus:outline-none w-full"
                />
                <span className="text-slate-500 font-mono">.launchengine.io</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Domain Alias</label>
              <input 
                type="text" 
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="e.g. funnel.yourbrand.com"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
              />
            </div>
          </div>

          {/* DNS Configuration Cards */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Server className="w-4 h-4 text-indigo-400" />
              <span>DNS Provider Configuration Instructions (Cloudflare / GoDaddy / Namecheap):</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono font-bold">CNAME RECORD</div>
                  <div className="font-mono text-indigo-300 font-bold">cname.launchengine.io</div>
                </div>
                <button 
                  onClick={() => handleCopyDnsRecord('cname.launchengine.io', 'cname')}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 rounded text-[11px] font-bold text-slate-700"
                >
                  {copiedDns === 'cname' ? 'Copied ✓' : 'Copy CNAME'}
                </button>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono font-bold">A RECORD (ANYCAST IP)</div>
                  <div className="font-mono text-indigo-300 font-bold">76.76.21.21</div>
                </div>
                <button 
                  onClick={() => handleCopyDnsRecord('76.76.21.21', 'arecord')}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 rounded text-[11px] font-bold text-slate-700"
                >
                  {copiedDns === 'arecord' ? 'Copied ✓' : 'Copy IP'}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Live URL Card */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">RESOLVED LIVE STEP URL</div>
              <div className="text-sm font-mono text-indigo-300 font-bold mt-0.5">{fullUrl}</div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied!' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: EDGE A/B SPLIT TESTING ROUTER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Split className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-800">Edge-Based A/B Split Test Engine</h3>
            </div>
            <button 
              onClick={() => onUpdateStepAbTest(activeStep.id, !activeStep.abSplitEnabled, trafficSplit)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeStep.abSplitEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:text-slate-900'}`}
            >
              {activeStep.abSplitEnabled ? 'A/B Split Test Active ✓' : 'Enable A/B Split Test'}
            </button>
          </div>

          {activeStep.abSplitEnabled && (
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Traffic Split Distribution:</span>
                <span className="font-mono text-indigo-400 font-bold">Variant A ({trafficSplit}%) / Variant B ({100 - trafficSplit}%)</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={90} 
                value={trafficSplit} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setTrafficSplit(val);
                  onUpdateStepAbTest(activeStep.id, true, val);
                }}
                className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-indigo-500/40 text-center">
                  <div className="text-xs font-bold text-indigo-400">Variant A (Control)</div>
                  <div className="text-xl font-black text-slate-900 mt-1">4.82% Conv</div>
                  <div className="text-[10px] text-slate-600">1,420 Visitors</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-pink-500/40 text-center">
                  <div className="text-xs font-bold text-pink-400">Variant B (Challenger)</div>
                  <div className="text-xl font-black text-slate-900 mt-1">6.14% Conv</div>
                  <div className="text-[10px] text-slate-600">1,390 Visitors</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
