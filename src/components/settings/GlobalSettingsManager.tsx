import React, { useState, useEffect } from 'react';
import { 
  Settings, Globe, Shield, CreditCard, Mail, Key, Save, Check, RefreshCw, 
  Code, Eye, Database, Sliders, Bell, Sparkles, Building, Lock
} from 'lucide-react';
import { UniversalColorPicker } from '../builder/UniversalColorPicker';
import { purgeAllMockData } from '../../utils/purgeAllMockData';

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

export const loadStoredGlobalSettings = (): GlobalPlatformSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading global settings', e);
  }
  return {
    agencyName: 'FunnelLegends Agency Suite',
    customDomain: 'funnels.mybrand.com',
    supportEmail: 'support@mybrand.com',
    currency: 'USD',
    timezone: 'America/New_York',
    defaultMetaTitle: 'High-Converting Sales & Lead Capture Funnels',
    defaultMetaDescription: 'Scale your online enterprise with high-converting FunnelLegends templates.',
    googleAnalyticsId: 'G-FL98240293',
    facebookPixelId: '109283749102938',
    headerScript: '<!-- Universal Analytics Header Script -->',
    footerScript: '<!-- Exit Intent Tracker -->',
    stripeTestMode: false,
    autoInvoiceEmail: true,
    senderName: 'Marcus @ FunnelLegends',
    senderEmail: 'marcus@funnellegends.com',
    autoCrmEnroll: true,
    doubleOptIn: false,
    primaryBrandColor: '#22c55e',
    accentBrandColor: '#4f46e5',
    forceHttps: true,
    maintenanceMode: false,
  };
};

export const saveStoredGlobalSettings = (settings: GlobalPlatformSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving global settings', e);
  }
};

export const GlobalSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<GlobalPlatformSettings>(loadStoredGlobalSettings());
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'payments' | 'email' | 'security'>('general');
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    saveStoredGlobalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    saveStoredGlobalSettings(settings);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handlePurgeCache = () => {
    if (confirm('Are you sure you want to clear system cache and refresh mock data?')) {
      purgeAllMockData();
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-green-100 pb-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-green-600" />
              <span>Platform Global Settings & Control Center</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">Configure global workspace branding, custom domains, SEO tracking, payment gateways, and system defaults.</p>
          </div>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 text-slate-900 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 14px rgba(34,197,94,0.25)' }}
          >
            <Save className="w-4 h-4" />
            <span>Save Global Settings</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-green-100 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 rounded-t-xl flex items-center gap-2 transition-all border-b-2 ${activeTab === 'general' ? 'border-green-500 text-green-700 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            <Building className="w-4 h-4" />
            <span>General & Branding</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`py-3 px-4 rounded-t-xl flex items-center gap-2 transition-all border-b-2 ${activeTab === 'seo' ? 'border-green-500 text-green-700 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-4 rounded-t-xl flex items-center gap-2 transition-all border-b-2 ${activeTab === 'payments' ? 'border-green-500 text-green-700 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments & Checkout</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`py-3 px-4 rounded-t-xl flex items-center gap-2 transition-all border-b-2 ${activeTab === 'email' ? 'border-green-500 text-green-700 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            <Mail className="w-4 h-4" />
            <span>Email & CRM Integration</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-4 rounded-t-xl flex items-center gap-2 transition-all border-b-2 ${activeTab === 'security' ? 'border-green-500 text-green-700 bg-green-50/50' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Maintenance</span>
          </button>
        </div>

        {/* Tab 1: General & Branding */}
        {activeTab === 'general' && (
          <div className="bg-white border border-green-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider text-green-600">Workspace & Agency Branding</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Agency / Platform Name</label>
                <input 
                  type="text" 
                  value={settings.agencyName} 
                  onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-medium focus:outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Custom Domain Name</label>
                <input 
                  type="text" 
                  value={settings.customDomain} 
                  onChange={(e) => setSettings({ ...settings, customDomain: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-mono text-xs focus:outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Support Contact Email</label>
                <input 
                  type="email" 
                  value={settings.supportEmail} 
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-medium focus:outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Platform Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-medium focus:outline-none"
                >
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                  <option value="AUD">AUD ($ - Australian Dollar)</option>
                  <option value="CAD">CAD ($ - Canadian Dollar)</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 space-y-4">
              <h4 className="text-xs font-bold text-gray-900">Brand Palette Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UniversalColorPicker
                  label="Primary Brand Color"
                  value={settings.primaryBrandColor}
                  onChange={(newColor) => setSettings({ ...settings, primaryBrandColor: newColor })}
                />
                <UniversalColorPicker
                  label="Accent Brand Color"
                  value={settings.accentBrandColor}
                  onChange={(newColor) => setSettings({ ...settings, accentBrandColor: newColor })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SEO & Analytics */}
        {activeTab === 'seo' && (
          <div className="bg-white border border-green-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider text-green-600">Global SEO & Tracking Pixels</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Meta Title</label>
                <input 
                  type="text" 
                  value={settings.defaultMetaTitle} 
                  onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-medium focus:outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Meta Description</label>
                <textarea 
                  rows={2}
                  value={settings.defaultMetaDescription} 
                  onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 font-medium focus:outline-none focus:border-green-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Google Analytics Measurement ID</label>
                  <input 
                    type="text" 
                    placeholder="G-XXXXXXXXXX"
                    value={settings.googleAnalyticsId} 
                    onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-mono focus:outline-none focus:border-green-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Meta (Facebook) Pixel ID</label>
                  <input 
                    type="text" 
                    placeholder="1234567890"
                    value={settings.facebookPixelId} 
                    onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-mono focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Global Header Tracking Scripts (&lt;head&gt;)</label>
                <textarea 
                  rows={3}
                  value={settings.headerScript} 
                  onChange={(e) => setSettings({ ...settings, headerScript: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-emerald-400 font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Global Footer Tracking Scripts (&lt;/body&gt;)</label>
                <textarea 
                  rows={3}
                  value={settings.footerScript} 
                  onChange={(e) => setSettings({ ...settings, footerScript: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-emerald-400 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Payments & Checkout */}
        {activeTab === 'payments' && (
          <div className="bg-white border border-green-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider text-green-600">Stripe & Payment Gateway Settings</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800">Stripe Test Mode Simulation</div>
                  <div className="text-gray-500 text-[11px]">Toggle test payments without charging real credit cards.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.stripeTestMode}
                  onChange={(e) => setSettings({ ...settings, stripeTestMode: e.target.checked })}
                  className="w-5 h-5 accent-green-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800">Automated Order Receipts</div>
                  <div className="text-gray-500 text-[11px]">Send instant PDF email invoices on successful 1-click checkout purchases.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.autoInvoiceEmail}
                  onChange={(e) => setSettings({ ...settings, autoInvoiceEmail: e.target.checked })}
                  className="w-5 h-5 accent-green-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Email & CRM */}
        {activeTab === 'email' && (
          <div className="bg-white border border-green-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider text-green-600">Email Marketing & CRM Automation</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Sender Name</label>
                <input 
                  type="text" 
                  value={settings.senderName} 
                  onChange={(e) => setSettings({ ...settings, senderName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-medium focus:outline-none focus:border-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Default Sender Email</label>
                <input 
                  type="email" 
                  value={settings.senderEmail} 
                  onChange={(e) => setSettings({ ...settings, senderEmail: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-medium focus:outline-none focus:border-green-400"
                />
              </div>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800">Auto-Enroll New Leads into CRM Pipeline</div>
                  <div className="text-gray-500 text-[11px]">Automatically add opt-in subscribers to lead scoring CRM.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.autoCrmEnroll}
                  onChange={(e) => setSettings({ ...settings, autoCrmEnroll: e.target.checked })}
                  className="w-5 h-5 accent-green-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800">Double Opt-In Email Verification</div>
                  <div className="text-gray-500 text-[11px]">Require subscribers to click confirmation link before adding to contact list.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.doubleOptIn}
                  onChange={(e) => setSettings({ ...settings, doubleOptIn: e.target.checked })}
                  className="w-5 h-5 accent-green-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Security & Maintenance */}
        {activeTab === 'security' && (
          <div className="bg-white border border-green-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider text-green-600">Security & Cache Management</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800">Force SSL / HTTPS Redirection</div>
                  <div className="text-gray-500 text-[11px]">Automatically enforce encrypted HTTPS connections for all funnel domain visitors.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.forceHttps}
                  onChange={(e) => setSettings({ ...settings, forceHttps: e.target.checked })}
                  className="w-5 h-5 accent-green-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-800">Enable Platform Maintenance Mode</div>
                  <div className="text-gray-500 text-[11px]">Show maintenance page to public visitors while editing workspace.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                />
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">System Cache & Storage Reset</h4>
                  <p className="text-gray-500 text-[11px]">Flush mock browser cache and reload system templates.</p>
                </div>
                <button
                  onClick={handlePurgeCache}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Purge Mock Data Cache</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Toast Notification */}
        {savedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-fade-in">
            <Check className="w-5 h-5" />
            <span>Global platform settings saved successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};
