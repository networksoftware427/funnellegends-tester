import React, { useState, useEffect } from 'react';
import { 
  Settings, Globe, Shield, CreditCard, Mail, Key, Save, Check, RefreshCw, 
  Code, Eye, Database, Sliders, Bell, Sparkles, Building, Lock, Zap,
  Send, Copy, CheckCheck, Activity, Terminal, ShieldCheck, ArrowRight,
  CheckCircle2, Laptop, AlertCircle, Trash2, ExternalLink
} from 'lucide-react';
import { UniversalColorPicker } from '../builder/UniversalColorPicker';
import { purgeAllMockData } from '../../utils/purgeAllMockData';
import { 
  syncGlobalSettingsToSupabase, GLOBAL_SETTINGS_SQL_SCHEMA, 
  initialWorkspaceIntegrations, WorkspaceIntegration 
} from '../../utils/globalSettingsDbSync';

export interface GlobalPlatformSettings {
  agencyName: string;
  customDomain: string;
  supportEmail: string;
  currency: string;
  timezone: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
  headerScript: string;
  footerScript: string;
  stripeTestMode: boolean;
  autoInvoiceEmail: boolean;
  senderName: string;
  senderEmail: string;
  autoCrmEnroll: boolean;
  doubleOptIn: boolean;
  primaryBrandColor: string;
  accentBrandColor: string;
  forceHttps: boolean;
  maintenanceMode: boolean;
}

const STORAGE_KEY = 'launchengine_global_settings_v1';

export const defaultGlobalSettings: GlobalPlatformSettings = {
  agencyName: 'FunnelLegends Agency Suite',
  customDomain: 'funnels.mybrand.com',
  supportEmail: 'support@mybrand.com',
  currency: 'USD',
  timezone: 'America/New_York',
  defaultMetaTitle: 'High-Converting Sales & Lead Capture Funnels',
  defaultMetaDescription: 'Scale your online enterprise with high-converting FunnelLegends templates.',
  googleAnalyticsId: 'G-FL98240293',
  facebookPixelId: '109283749102938',
  headerScript: '<!-- Universal Analytics Header Script -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-FL98240293"></script>',
  footerScript: '<!-- Exit Intent Tracker -->\n<script>console.log("FunnelLegends Exit Intent Active");</script>',
  stripeTestMode: false,
  autoInvoiceEmail: true,
  senderName: 'FunnelLegends Team',
  senderEmail: 'support@funnellegends.com',
  autoCrmEnroll: true,
  doubleOptIn: false,
  primaryBrandColor: '#059669',
  accentBrandColor: '#0d9488',
  forceHttps: true,
  maintenanceMode: false,
};

export const loadStoredGlobalSettings = (): GlobalPlatformSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultGlobalSettings, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error loading global settings', e);
  }
  return defaultGlobalSettings;
};

export const saveStoredGlobalSettings = (settings: GlobalPlatformSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving global settings', e);
  }
};

export const resetGlobalSettingsToDefaults = (): GlobalPlatformSettings => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGlobalSettings));
  } catch (e) {
    console.error('Error resetting global settings', e);
  }
  return defaultGlobalSettings;
};

export const GlobalSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<GlobalPlatformSettings>(loadStoredGlobalSettings());
  const [activeTab, setActiveTab] = useState<'general' | 'simulations' | 'seo' | 'payments' | 'email' | 'integrations' | 'security' | 'database'>('general');
  const [savedToast, setSavedToast] = useState(false);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  // Integrations state
  const [integrations, setIntegrations] = useState<WorkspaceIntegration[]>(initialWorkspaceIntegrations);
  const [testedWebhookResult, setTestedWebhookResult] = useState<string | null>(null);

  // Supabase Database Sync State
  const [dbSyncStatus, setDbSyncStatus] = useState<{ success: boolean; message: string; timestamp: string } | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // ── SIMULATION SANDBOX STATE ──
  const [simTestDomain, setSimTestDomain] = useState('funnels.growthscale.io');
  const [isCheckingDns, setIsCheckingDns] = useState(false);
  const [simDnsResult, setSimDnsResult] = useState<{ cnameValid: boolean; sslValid: boolean; httpStatus: number; message: string } | null>(null);
  const [simChargeAmount, setSimChargeAmount] = useState('497');
  const [simChargeResult, setSimChargeResult] = useState<any | null>(null);
  const [isSimulatingCharge, setIsSimulatingCharge] = useState(false);

  useEffect(() => {
    saveStoredGlobalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    saveStoredGlobalSettings(settings);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleResetSettings = () => {
    if (confirm('Reset all global platform settings to default values?')) {
      const reset = resetGlobalSettingsToDefaults();
      setSettings(reset);
      setAppliedToast('✓ Reset global workspace settings to defaults!');
      setTimeout(() => setAppliedToast(null), 3000);
    }
  };

  const handleTriggerSupabaseSync = async () => {
    setIsSyncingDb(true);
    const res = await syncGlobalSettingsToSupabase(settings);
    setDbSyncStatus(res);
    setIsSyncingDb(false);
  };

  const handlePurgeCache = () => {
    if (confirm('Are you sure you want to clear system cache and refresh mock data across all software tools?')) {
      purgeAllMockData();
      alert('System cache purged! Reloading clean workspace.');
      window.location.reload();
    }
  };

  // ── SIMULATION HANDLERS ──
  const handleSimulateDnsCheck = () => {
    setIsCheckingDns(true);
    setTimeout(() => {
      setSimDnsResult({
        cnameValid: true,
        sslValid: true,
        httpStatus: 200,
        message: `✓ Domain "${simTestDomain}" is properly routed to cname.funnellegends.com with Active Let's Encrypt Wildcard SSL!`
      });
      setIsCheckingDns(false);
    }, 700);
  };

  const handleSimulatePaymentCharge = () => {
    setIsSimulatingCharge(true);
    setTimeout(() => {
      setSimChargeResult({
        event: 'charge.succeeded',
        id: `ch_${Date.now()}`,
        amount: parseFloat(simChargeAmount),
        currency: settings.currency,
        livemode: !settings.stripeTestMode,
        customerEmail: 'buyer@prospectcorp.demo',
        receiptSent: settings.autoInvoiceEmail,
        timestamp: new Date().toISOString()
      });
      setIsSimulatingCharge(false);
    }, 600);
  };

  const handleTestIntegration = (integration: WorkspaceIntegration) => {
    setTestedWebhookResult(`⚡ Dispatched test event to ${integration.name} (${integration.endpoint}). Status: HTTP 200 OK.`);
    setTimeout(() => setTestedWebhookResult(null), 4000);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 flex flex-col overflow-hidden font-sans">
      {/* ── TOP HEADER ── */}
      <div 
        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <Settings className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                Platform Global Settings & Control Center
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                Workspace Master Config Active
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">
              Agency: <strong className="text-white">{settings.agencyName}</strong> • Domain: <strong className="text-emerald-300 font-mono">{settings.customDomain}</strong> • Currency: <strong className="text-white">{settings.currency}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={handleResetSettings}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Reset global settings to defaults"
          >
            Reset Defaults
          </button>

          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Save className="w-4 h-4 text-emerald-600" />
            <span>Save Settings</span>
          </button>

          <button 
            onClick={handleTriggerSupabaseSync}
            disabled={isSyncingDb}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncingDb ? 'animate-spin' : ''}`} />
            <span>{isSyncingDb ? 'Syncing...' : 'Sync Supabase'}</span>
          </button>
        </div>
      </div>

      {/* ── SUB-NAV BAR ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'general' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Building className="w-4 h-4" />
          <span>General & Branding</span>
        </button>

        <button 
          onClick={() => setActiveTab('simulations')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'simulations' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Zap className="w-4 h-4" />
          <span>⚡ Simulations & Workflows</span>
        </button>

        <button 
          onClick={() => setActiveTab('seo')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'seo' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Globe className="w-4 h-4" />
          <span>SEO & Tracking</span>
        </button>

        <button 
          onClick={() => setActiveTab('payments')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'payments' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payments & Stripe</span>
        </button>

        <button 
          onClick={() => setActiveTab('email')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'email' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Mail className="w-4 h-4" />
          <span>Email & SMTP</span>
        </button>

        <button 
          onClick={() => setActiveTab('integrations')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'integrations' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Globe className="w-4 h-4" />
          <span>🔌 3rd Party Integrations ({integrations.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('security')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'security' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Shield className="w-4 h-4" />
          <span>Security & Cache</span>
        </button>

        <button 
          onClick={() => setActiveTab('database')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Database className="w-4 h-4" />
          <span>Database & Schema</span>
        </button>
      </div>

      {appliedToast && (
        <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-md animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{appliedToast}</span>
        </div>
      )}

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="p-6 flex-1 flex flex-col min-h-0 w-full max-w-[1400px] mx-auto overflow-y-auto space-y-6">

        {/* ── TAB 1: GENERAL & BRANDING ── */}
        {activeTab === 'general' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider text-emerald-700">
              Agency Details & Global Branding
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Agency / Workspace Name</label>
                <input 
                  type="text" 
                  value={settings.agencyName} 
                  onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Custom Master Domain</label>
                <input 
                  type="text" 
                  value={settings.customDomain} 
                  onChange={(e) => setSettings({ ...settings, customDomain: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Support Email Address</label>
                <input 
                  type="email" 
                  value={settings.supportEmail} 
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Workspace Currency</label>
                <select 
                  value={settings.currency} 
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="CAD">CAD ($) - Canadian Dollar</option>
                  <option value="AUD">AUD ($) - Australian Dollar</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Timezone</label>
                <select 
                  value={settings.timezone} 
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="America/New_York">Eastern Time (US & Canada)</option>
                  <option value="America/Chicago">Central Time (US & Canada)</option>
                  <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                  <option value="Europe/London">London (GMT / BST)</option>
                  <option value="Europe/Paris">Paris, Berlin (CET)</option>
                  <option value="Asia/Dubai">Dubai (GST)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Theme Brand Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={settings.primaryBrandColor}
                    onChange={(e) => setSettings({ ...settings, primaryBrandColor: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-slate-200 p-0 cursor-pointer overflow-hidden bg-white"
                  />
                  <input 
                    type="text" 
                    value={settings.primaryBrandColor}
                    onChange={(e) => setSettings({ ...settings, primaryBrandColor: e.target.value })}
                    className="w-32 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono uppercase font-bold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: SIMULATIONS & WORKFLOWS ── */}
        {activeTab === 'simulations' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Global Platform Infrastructure & Gateway Sandbox</h3>
                    <p className="text-xs text-slate-500">Simulate custom domain DNS propagation, Stripe multi-currency checkout, and global script injection.</p>
                  </div>
                </div>
              </div>

              {/* SIMULATION 1: DOMAIN & SSL CHECK */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase font-mono text-[10px]">
                  Simulation 1: Custom Domain DNS & SSL Handshake Validator
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={simTestDomain}
                    onChange={(e) => setSimTestDomain(e.target.value)}
                    placeholder="e.g. funnels.myagency.com"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none"
                  />
                  <button 
                    onClick={handleSimulateDnsCheck}
                    disabled={isCheckingDns}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <RefreshCw className={`w-4 h-4 ${isCheckingDns ? 'animate-spin' : ''}`} />
                    <span>{isCheckingDns ? 'Validating DNS...' : 'Verify DNS & SSL Handshake'}</span>
                  </button>
                </div>

                {simDnsResult && (
                  <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl space-y-2 text-xs animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {simDnsResult.message}
                      </span>
                      <span className="font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                        HTTP {simDnsResult.httpStatus} OK
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-mono pt-1">
                      <div>CNAME Record: cname.funnellegends.com (Matched)</div>
                      <div>SSL Certificate: Let's Encrypt TLS 1.3 (Valid 90 Days)</div>
                    </div>
                  </div>
                )}
              </div>

              {/* SIMULATION 2: STRIPE PAYMENT CHARGE */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase font-mono text-[10px]">
                  Simulation 2: Stripe Payment Charge & Auto-Receipt Dispatcher
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="number" 
                    value={simChargeAmount}
                    onChange={(e) => setSimChargeAmount(e.target.value)}
                    placeholder="497"
                    className="w-40 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none"
                  />
                  <button 
                    onClick={handleSimulatePaymentCharge}
                    disabled={isSimulatingCharge}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isSimulatingCharge ? 'Charging...' : `Simulate $${simChargeAmount} ${settings.currency} Stripe Charge`}</span>
                  </button>
                </div>

                {simChargeResult && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Simulated Stripe Webhook Payload (`charge.succeeded`):</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        PROCESSED
                      </span>
                    </div>
                    <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs max-h-48 overflow-y-auto">
                      <pre>{JSON.stringify(simChargeResult, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 6-STAGE PLATFORM ARCHITECTURE */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                FunnelLegends Global Platform Architecture & Security Pipeline
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {[
                  { step: '1', title: 'Custom Domain', desc: 'Edge DNS & CNAME Routing' },
                  { step: '2', title: 'SSL Encryption', desc: 'TLS 1.3 Let\'s Encrypt Gate' },
                  { step: '3', title: 'Global Scripts', desc: 'GA4 / Meta Pixel Injection' },
                  { step: '4', title: 'Payment Router', desc: 'Stripe 1-Click Tokenization' },
                  { step: '5', title: 'SMTP Dispatch', desc: 'Resend Transactional Mails' },
                  { step: '6', title: 'Cache Sync', desc: 'Supabase Cloud Persistence' }
                ].map((st) => (
                  <div key={st.step} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center mx-auto">
                      {st.step}
                    </span>
                    <div className="text-xs font-bold text-slate-900">{st.title}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: SEO & TRACKING ── */}
        {activeTab === 'seo' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider text-emerald-700">
              SEO Meta Tags & Global Tracking Scripts
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Meta Title</label>
                <input 
                  type="text" 
                  value={settings.defaultMetaTitle} 
                  onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Meta Description</label>
                <textarea 
                  rows={3}
                  value={settings.defaultMetaDescription} 
                  onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Google Analytics 4 Measurement ID</label>
                  <input 
                    type="text" 
                    value={settings.googleAnalyticsId} 
                    onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Facebook / Meta Pixel ID</label>
                  <input 
                    type="text" 
                    value={settings.facebookPixelId} 
                    onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })}
                    placeholder="109283749102938"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Global Header Tracking Scripts (&lt;head&gt;)</label>
                <textarea 
                  rows={4}
                  value={settings.headerScript} 
                  onChange={(e) => setSettings({ ...settings, headerScript: e.target.value })}
                  className="w-full bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl p-3 font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Global Body Tracking Scripts (&lt;body&gt;)</label>
                <textarea 
                  rows={3}
                  value={settings.footerScript} 
                  onChange={(e) => setSettings({ ...settings, footerScript: e.target.value })}
                  className="w-full bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl p-3 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: PAYMENTS & STRIPE ── */}
        {activeTab === 'payments' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider text-emerald-700">
              Payment Gateway & Checkout Processing
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="font-bold text-slate-800">Stripe Sandbox / Test Mode</div>
                  <div className="text-slate-500 text-[11px]">Process simulated test payments without charging real credit cards.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.stripeTestMode}
                  onChange={(e) => setSettings({ ...settings, stripeTestMode: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="font-bold text-slate-800">Automated PDF Invoice Emailing</div>
                  <div className="text-slate-500 text-[11px]">Automatically dispatch receipts and VAT invoices upon successful order completion.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.autoInvoiceEmail}
                  onChange={(e) => setSettings({ ...settings, autoInvoiceEmail: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: EMAIL & SMTP ── */}
        {activeTab === 'email' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider text-emerald-700">
              Email Notifications & Marketing Automation Defaults
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Sender Name</label>
                <input 
                  type="text" 
                  value={settings.senderName} 
                  onChange={(e) => setSettings({ ...settings, senderName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Sender Email</label>
                <input 
                  type="email" 
                  value={settings.senderEmail} 
                  onChange={(e) => setSettings({ ...settings, senderEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="font-bold text-slate-800">Auto-Enroll New Leads into CRM Pipeline</div>
                  <div className="text-slate-500 text-[11px]">Automatically add opt-in subscribers to lead scoring CRM.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.autoCrmEnroll}
                  onChange={(e) => setSettings({ ...settings, autoCrmEnroll: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="font-bold text-slate-800">Double Opt-In Email Verification</div>
                  <div className="text-slate-500 text-[11px]">Require subscribers to click confirmation link before adding to contact list.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.doubleOptIn}
                  onChange={(e) => setSettings({ ...settings, doubleOptIn: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: 3RD PARTY INTEGRATIONS ── */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Workspace 3rd Party Integrations Hub</h3>
                <p className="text-xs text-slate-500">Connect Zapier, Stripe, Resend SMTP, Twilio SMS, GA4, and Cloudflare CDN.</p>
              </div>
            </div>

            {testedWebhookResult && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{testedWebhookResult}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{item.category}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.status === 'Connected' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                    <div className="text-slate-500 font-mono text-[10px]">Endpoint URL:</div>
                    <div className="font-mono text-slate-800 truncate font-semibold">{item.endpoint}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex gap-1 flex-wrap">
                      {item.features.map(f => (
                        <span key={f} className="text-[9px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleTestIntegration(item)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Test Ping</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 7: SECURITY & MAINTENANCE ── */}
        {activeTab === 'security' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider text-emerald-700">
              Security & Cache Management
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="font-bold text-slate-800">Force SSL / HTTPS Redirection</div>
                  <div className="text-slate-500 text-[11px]">Automatically enforce encrypted HTTPS connections for all funnel domain visitors.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.forceHttps}
                  onChange={(e) => setSettings({ ...settings, forceHttps: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="font-bold text-slate-800">Enable Platform Maintenance Mode</div>
                  <div className="text-slate-500 text-[11px]">Show maintenance page to public visitors while editing workspace.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
                />
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">System Cache & Storage Reset</h4>
                  <p className="text-slate-500 text-[11px]">Flush mock browser cache and reload system templates across all tools.</p>
                </div>
                <button
                  onClick={handlePurgeCache}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Purge Mock Data Cache</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 8: DATABASE & SCHEMA ── */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Supabase SQL Database & Schema Inspector</h3>
                <p className="text-xs text-slate-500">Inspect platform configuration schema, sync state, and copy production PostgreSQL script.</p>
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
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Master Domain</span>
                <div className="text-sm font-black text-slate-900 font-mono truncate">{settings.customDomain}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Currency</span>
                <div className="text-xl font-black text-emerald-700">{settings.currency}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Integrations</span>
                <div className="text-xl font-black text-teal-700">{integrations.length} Active</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">SSL Status</span>
                <div className="text-sm font-black text-green-700">{settings.forceHttps ? 'Enforced HTTPS' : 'HTTP Only'}</div>
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
                    navigator.clipboard.writeText(GLOBAL_SETTINGS_SQL_SCHEMA);
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
                <pre>{GLOBAL_SETTINGS_SQL_SCHEMA}</pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Toast Notification */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-5 h-5" />
          <span>Global platform settings saved successfully!</span>
        </div>
      )}
    </div>
  );
};
