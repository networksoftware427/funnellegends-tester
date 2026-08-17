import React, { useState } from 'react';
import { Settings, Globe, Link2, Code2, X, Check, Save, Activity, Trash2, ShieldCheck, Zap } from 'lucide-react';
import { purgeAllMockData } from '../../utils/purgeAllMockData';

interface GlobalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSettingsModal: React.FC<GlobalSettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'domains' | 'integrations' | 'scripts' | 'diagnostics'>('general');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Global Workspace Settings</h2>
              <p className="text-xs text-slate-400">Configure platform defaults, domains, and global scripts.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-64 border-r border-slate-800 p-4 space-y-2 shrink-0 bg-slate-950/30">
            <button 
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'general' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Settings className="w-4 h-4" />
              General Config
            </button>
            <button 
              onClick={() => setActiveTab('domains')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'domains' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Globe className="w-4 h-4" />
              Custom Domains
            </button>
            <button 
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'integrations' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Link2 className="w-4 h-4" />
              API Integrations
            </button>
            <button 
              onClick={() => setActiveTab('scripts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'scripts' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Code2 className="w-4 h-4" />
              Global Scripts
            </button>
            <button 
              onClick={() => setActiveTab('diagnostics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'diagnostics' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20' : 'text-emerald-400 hover:bg-slate-800 hover:text-emerald-300'}`}
            >
              <Activity className="w-4 h-4" />
              Diagnostics & Purge
            </button>
          </div>

          {/* Form Area */}
          <div className="flex-1 overflow-y-auto p-8 bg-slate-950/10">
            
            {activeTab === 'general' && (
              <div className="space-y-6 max-w-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Workspace Details</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Workspace Name</label>
                  <input type="text" defaultValue="GrowthLabs Funnels" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Default Timezone</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none">
                      <option>Eastern Time (EST)</option>
                      <option>Pacific Time (PST)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Default Currency</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'domains' && (
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Custom Domains</h3>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors">Add Domain</button>
                </div>
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">growthlabs.launchengine.io</div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                      <Check className="w-3 h-3" /> System Default
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">Connected</span>
                </div>
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">go.myagency.com</div>
                    <div className="text-xs text-slate-400 mt-1">CNAME record pointed</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">Connected</span>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6 max-w-2xl">
                <h3 className="text-lg font-bold text-white mb-4">3rd Party API Keys</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stripe Secret Key (Payments)</label>
                  <input type="password" defaultValue="sk_live_1234567890abcdef" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Twilio Auth Token (SMS)</label>
                  <input type="password" placeholder="Enter Twilio token..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">SendGrid API Key (Email)</label>
                  <input type="password" placeholder="Enter SendGrid API key..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none font-mono" />
                </div>
              </div>
            )}

            {activeTab === 'scripts' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Global Tracking Scripts</h3>
                  <p className="text-xs text-slate-400 mb-4">These scripts will be injected into every funnel page published on this workspace.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global Header Tracking &lt;head&gt;</label>
                  <textarea 
                    rows={6}
                    placeholder="<!-- Facebook Pixel Code -->" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 font-mono text-xs focus:border-indigo-500 outline-none"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global Body Tracking &lt;body&gt;</label>
                  <textarea 
                    rows={6}
                    placeholder="<!-- Google Tag Manager (noscript) -->" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 font-mono text-xs focus:border-indigo-500 outline-none"
                  ></textarea>
                </div>
              </div>
            )}

            {activeTab === 'diagnostics' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <span>System Integration Diagnostics & Data Purge</span>
                  </h3>
                  <p className="text-xs text-slate-400">Run diagnostic verification on 3rd-party REST APIs or wipe demo data for production live traffic.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">25-Point Integration Diagnostic Engine</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Scans Twilio, Resend, Stripe, Zoom, Google Calendar & Webhooks.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Engine Ready
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-rose-400" />
                      <span>Delete All Mock & Demo Data</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Permanently clear mock contacts, dummy deals, sample appointments, and demo messages across all 5 LaunchEngine tools to operate in clean production integration mode.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm('Purge all mock data across software tools and switch workspace to clean integration mode?')) {
                        purgeAllMockData();
                        alert('Mock data successfully deleted! LaunchEngine software is operating in clean production mode.');
                        window.location.reload();
                      }
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-red-600/20 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Purge Mock Data Now</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-300 hover:text-white transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
