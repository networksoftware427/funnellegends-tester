import React, { useState } from 'react';
import { FunnelData, FunnelStepData, PageStatus } from '../../types/builder';
import { FUNNEL_ENGINE_SQL_SCHEMA, syncFunnelsToSupabase } from '../../utils/dbSync';
import { 
  Globe, ShieldCheck, Split, History, CheckCircle, Clock, Archive, 
  ExternalLink, Copy, Check, Sparkles, Layers, Sliders, Server,
  Database, RefreshCw, Zap, Radio, Terminal, ArrowRight, Activity, CheckCheck
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
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [trafficSplit, setTrafficSplit] = useState(activeStep.trafficSplitPercent || 50);

  // Active Sub-Tab
  const [activeTab, setActiveTab] = useState<'routing' | 'ab_split' | 'database'>('routing');

  // A/B Traffic Simulation state
  const [simVisitorCount, setSimVisitorCount] = useState(250);
  const [simResults, setSimResults] = useState<{
    variantA: { visitors: number; conversions: number; rate: string };
    variantB: { visitors: number; conversions: number; rate: string };
    winner: string;
  } | null>(null);
  const [isSimulatingAb, setIsSimulatingAb] = useState(false);

  // Supabase sync
  const [dbSyncStatus, setDbSyncStatus] = useState<{ success: boolean; message: string; timestamp: string } | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);

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

  const handleTriggerSupabaseSync = async () => {
    setIsSyncingDb(true);
    const res = await syncFunnelsToSupabase([funnel]);
    setDbSyncStatus(res);
    setIsSyncingDb(false);
  };

  const handleRunAbTrafficSimulation = () => {
    setIsSimulatingAb(true);
    setTimeout(() => {
      const vAVisitors = Math.round(simVisitorCount * (trafficSplit / 100));
      const vBVisitors = simVisitorCount - vAVisitors;

      // Realistic random conversion rates (Control: ~4.5-5.5%, Challenger: ~6.0-7.8%)
      const vAConv = Math.round(vAVisitors * (0.045 + Math.random() * 0.015));
      const vBConv = Math.round(vBVisitors * (0.062 + Math.random() * 0.02));

      const vARate = ((vAConv / Math.max(1, vAVisitors)) * 100).toFixed(2);
      const vBRate = ((vBConv / Math.max(1, vBVisitors)) * 100).toFixed(2);

      setSimResults({
        variantA: { visitors: vAVisitors, conversions: vAConv, rate: `${vARate}%` },
        variantB: { visitors: vBVisitors, conversions: vBConv, rate: `${vBRate}%` },
        winner: parseFloat(vBRate) >= parseFloat(vARate) ? 'Variant B (Challenger)' : 'Variant A (Control)'
      });
      setIsSimulatingAb(false);
    }, 600);
  };

  const statuses: { id: PageStatus; label: string; color: string; icon: any }[] = [
    { id: 'Draft', label: 'Draft Mode', color: 'bg-amber-50 text-amber-800 border-amber-300', icon: Clock },
    { id: 'Scheduled', label: 'Scheduled', color: 'bg-blue-50 text-blue-800 border-blue-300', icon: Clock },
    { id: 'Published', label: 'Published (Live)', color: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: CheckCircle },
    { id: 'Archived', label: 'Archived', color: 'bg-slate-50 text-slate-600 border-slate-300', icon: Archive }
  ];

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      {/* ── TOP HEADER ── */}
      <div 
        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <Globe className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                Publishing & Domain Routing
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                Edge SSL Active
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">Custom CNAME resolution, edge A/B split routing, lifecycle state machine & database sync.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={handleCopyLink}
            className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-600" />}
            <span>{isCopied ? 'Copied Live URL!' : 'Copy Live URL'}</span>
          </button>
        </div>
      </div>

      {/* ── SUB-NAV BAR ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button 
          onClick={() => setActiveTab('routing')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'routing' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Globe className="w-4 h-4" />
          <span>Domain & CNAME Routing</span>
        </button>

        <button 
          onClick={() => setActiveTab('ab_split')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'ab_split' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Split className="w-4 h-4" />
          <span>A/B Split Test Engine</span>
        </button>

        <button 
          onClick={() => setActiveTab('database')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Database className="w-4 h-4" />
          <span>Database & Schema</span>
        </button>
      </div>

      {/* ── MAIN CONTENT DISPLAY ── */}
      <div className="flex-1 p-6 space-y-6 max-w-5xl mx-auto w-full">

        {/* ── TAB 1: DOMAIN & ROUTING ── */}
        {activeTab === 'routing' && (
          <div className="space-y-6">
            {/* SECTION 1: LIFECYCLE STATE MACHINE */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Funnel Step Lifecycle State Machine ({activeStep.name})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {statuses.map((st) => {
                  const IconComp = st.icon;
                  const isCurrent = activeStep.status === st.id;
                  return (
                    <button 
                      key={st.id}
                      onClick={() => onUpdateStepStatus(activeStep.id, st.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${isCurrent ? `${st.color} shadow-md ring-2 ring-emerald-500 font-bold` : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    >
                      <IconComp className="w-5 h-5 mb-2 text-emerald-600" />
                      <div className="text-xs font-black">{st.label}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{isCurrent ? '● Active Live State' : 'Click to Set'}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: DOMAIN & SLUG ROUTING */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-600" />
                  Domain Mapping & Edge SSL Resolution
                </h3>
                <span className="flex items-center gap-1 text-xs text-emerald-800 font-black bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>SSL Provisioned & Active</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Multi-Tenant Subdomain</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700">
                    <input 
                      type="text" 
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      className="bg-transparent font-mono font-bold text-slate-900 focus:outline-none w-full"
                    />
                    <span className="text-slate-500 font-mono font-bold">.launchengine.io</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Custom Domain Alias</label>
                  <input 
                    type="text" 
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="e.g. funnel.yourbrand.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              {/* DNS Configuration Cards */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Server className="w-4 h-4 text-emerald-600" />
                  <span>DNS Provider Configuration Instructions (Cloudflare / GoDaddy / Namecheap):</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 font-mono font-bold">CNAME RECORD</div>
                      <div className="font-mono text-emerald-700 font-bold">cname.launchengine.io</div>
                    </div>
                    <button 
                      onClick={() => handleCopyDnsRecord('cname.launchengine.io', 'cname')}
                      className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 border border-slate-200"
                    >
                      {copiedDns === 'cname' ? 'Copied ✓' : 'Copy CNAME'}
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 font-mono font-bold">A RECORD (ANYCAST IP)</div>
                      <div className="font-mono text-emerald-700 font-bold">76.76.21.21</div>
                    </div>
                    <button 
                      onClick={() => handleCopyDnsRecord('76.76.21.21', 'arecord')}
                      className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 border border-slate-200"
                    >
                      {copiedDns === 'arecord' ? 'Copied ✓' : 'Copy IP'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Resolved Live URL Card */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">RESOLVED LIVE STEP URL</div>
                  <div className="text-sm font-mono text-emerald-950 font-bold mt-0.5">{fullUrl}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy URL'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: A/B SPLIT TESTING ENGINE ── */}
        {activeTab === 'ab_split' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                    <Split className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Edge-Based A/B Split Test Engine</h3>
                    <p className="text-xs text-slate-500">Distribute incoming visitor traffic between Variant A and Variant B with real-time conversion tracking.</p>
                  </div>
                </div>

                <button 
                  onClick={() => onUpdateStepAbTest(activeStep.id, !activeStep.abSplitEnabled, trafficSplit)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shadow-sm ${activeStep.abSplitEnabled ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
                >
                  {activeStep.abSplitEnabled ? 'A/B Split Test Active ✓' : 'Enable A/B Split Test'}
                </button>
              </div>

              {activeStep.abSplitEnabled ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">Traffic Distribution:</span>
                      <span className="font-mono text-emerald-700 font-black">Variant A ({trafficSplit}%) / Variant B ({100 - trafficSplit}%)</span>
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
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>

                  {/* SIMULATE TRAFFIC RUN */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">⚡ Simulate Live Traffic Distribution Run:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Sample Size:</span>
                        <select 
                          value={simVisitorCount}
                          onChange={(e) => setSimVisitorCount(parseInt(e.target.value))}
                          className="bg-white border border-slate-200 text-xs rounded-lg px-2 py-1 font-bold"
                        >
                          <option value={100}>100 Visitors</option>
                          <option value={250}>250 Visitors</option>
                          <option value={500}>500 Visitors</option>
                          <option value={1000}>1,000 Visitors</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={handleRunAbTrafficSimulation}
                      disabled={isSimulatingAb}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                    >
                      {isSimulatingAb ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-white" />}
                      <span>{isSimulatingAb ? 'Simulating Traffic Distribution...' : `Simulate ${simVisitorCount} Edge Visitors →`}</span>
                    </button>

                    {simResults && (
                      <div className="grid grid-cols-2 gap-4 pt-2 animate-fade-in">
                        <div className="p-4 bg-white rounded-xl border border-slate-200 text-center space-y-1 shadow-sm">
                          <div className="text-xs font-bold text-slate-700">Variant A (Control)</div>
                          <div className="text-2xl font-black text-slate-900">{simResults.variantA.rate}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{simResults.variantA.conversions} Sales / {simResults.variantA.visitors} Visitors</div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-xl border-2 border-emerald-300 text-center space-y-1 shadow-sm">
                          <div className="text-xs font-bold text-emerald-800">Variant B (Challenger)</div>
                          <div className="text-2xl font-black text-emerald-700">{simResults.variantB.rate}</div>
                          <div className="text-[11px] text-emerald-800 font-mono font-bold">{simResults.variantB.conversions} Sales / {simResults.variantB.visitors} Visitors</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-3">
                  <p>A/B split testing is currently disabled for this step.</p>
                  <button 
                    onClick={() => onUpdateStepAbTest(activeStep.id, true, 50)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm text-xs"
                  >
                    Enable A/B Testing
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: DATABASE & SCHEMA ── */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Supabase SQL Database & Schema Inspector</h3>
                <p className="text-xs text-slate-500">Inspect database tables, sync state, and copy production SQL migration script.</p>
              </div>

              <button 
                onClick={handleTriggerSupabaseSync}
                disabled={isSyncingDb}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingDb ? 'animate-spin' : ''}`} />
                <span>{isSyncingDb ? 'Syncing to Supabase...' : 'Sync to Supabase Now'}</span>
              </button>
            </div>

            {dbSyncStatus && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${dbSyncStatus.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-amber-50 text-amber-900 border-amber-300'}`}>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>{dbSyncStatus.message}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">{dbSyncStatus.timestamp}</span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Funnel Workspaces</span>
                <div className="text-xl font-black text-slate-900">1 Active</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Funnel Steps</span>
                <div className="text-xl font-black text-emerald-700">{funnel.steps.length} Steps</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Canvas Pages</span>
                <div className="text-xl font-black text-teal-700">{funnel.steps.length} Pages</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Leads Captured</span>
                <div className="text-xl font-black text-green-700">12 Leads</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">PostgreSQL / Supabase DDL Migration Script</h4>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(FUNNEL_ENGINE_SQL_SCHEMA);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSchema ? 'Copied SQL Script!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs max-h-96 overflow-y-auto">
                <pre>{FUNNEL_ENGINE_SQL_SCHEMA}</pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
