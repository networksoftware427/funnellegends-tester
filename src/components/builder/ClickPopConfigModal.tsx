import React, { useState } from 'react';
import { ClickPopSettings } from '../../types/builder';
import { clickPopTemplates, ClickPopTemplateItem } from '../../data/clickpopTemplates';
import { 
  Sparkles, X, MousePointerClick, DoorOpen, Clock, Copy, Check, Eye, ShieldCheck, Code, Layers, LayoutGrid, CheckCircle
} from 'lucide-react';

interface ClickPopConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ClickPopSettings;
  onSave: (updatedSettings: ClickPopSettings) => void;
  onTestTrigger: () => void;
}

export const ClickPopConfigModal: React.FC<ClickPopConfigModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  onTestTrigger
}) => {
  const [formData, setFormData] = useState<ClickPopSettings>(settings || {
    enabled: true,
    triggerType: 'button',
    delaySeconds: 5,
    title: "WAIT! Don't Leave Empty Handed...",
    subtitle: "Claim your 80% exclusive discount + free bonus training before leaving this page!",
    buttonText: "YES! CLAIM MY 80% DISCOUNT NOW",
    redirectUrl: "/checkout",
    badgeText: "LIMITED TIME EXCLUSIVE POPUP OFFER",
    backdropBlur: true,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80"
  });

  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [activeTab, setActiveTab] = useState<'templates' | 'settings' | 'embed'>('templates');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [appliedTemplateId, setAppliedTemplateId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Lead Magnet', 'Discount & Exit', 'Webinar', 'Agency & Coaching', 'SaaS & Trial', 'E-Commerce', 'Flash Sale'];

  const filteredTemplates = selectedCategory === 'All' 
    ? clickPopTemplates 
    : clickPopTemplates.filter(t => t.category === selectedCategory);

  const handleApplyTemplate = (template: ClickPopTemplateItem) => {
    setFormData(template.settings);
    setAppliedTemplateId(template.id);
    setTimeout(() => setAppliedTemplateId(null), 2000);
  };

  const embedCodeSnippet = `<!-- LaunchEngine ClickPop Button Embed Code for External Blogs/Websites -->
<a href="${formData.redirectUrl}" data-clickpop-trigger="cp_8915" class="launchengine-clickpop-btn">
  ${formData.buttonText}
</a>
<script src="https://launchengine.io/js/clickpop.v1.js" data-id="cp_8915" async></script>`;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full flex flex-col shadow-2xl overflow-hidden animate-fade-in text-slate-100 max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink-950/80 text-pink-400 border border-pink-500/30 rounded-xl">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">ClickPop & Exit Intent Manager (10 High-Converting Templates)</h3>
              <p className="text-[11px] text-slate-400">Select pre-designed popup templates or customize triggers & blog embed codes</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-4 pt-2 gap-2 text-xs font-bold">
          <button 
            onClick={() => setActiveTab('templates')}
            className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'templates' ? 'border-pink-500 text-pink-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>10 ClickPop Templates</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'settings' ? 'border-pink-500 text-pink-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <Layers className="w-4 h-4" />
            <span>Popup Customizer & Rules</span>
          </button>
          <button 
            onClick={() => setActiveTab('embed')}
            className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === 'embed' ? 'border-pink-500 text-pink-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <Code className="w-4 h-4" />
            <span>External Blog / Site Embed Code</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'templates' ? (
            <div className="space-y-4">
              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${selectedCategory === cat ? 'bg-pink-600 text-white shadow' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredTemplates.map((tpl) => {
                  const isApplied = appliedTemplateId === tpl.id;
                  return (
                    <div 
                      key={tpl.id}
                      className="p-4 bg-slate-950 border border-slate-800 hover:border-pink-500/60 rounded-2xl flex flex-col justify-between space-y-3 transition-all group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold text-white bg-gradient-to-r ${tpl.badgeColor} px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                            {tpl.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{tpl.settings.triggerType.replace('_', ' ')}</span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className="text-xs font-black text-white group-hover:text-pink-300">{tpl.name}</h4>
                          <p className="text-[11px] text-slate-400 leading-tight mt-1">{tpl.description}</p>
                        </div>

                        {/* Live Mini Preview Box */}
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-left">
                          <div className="text-[11px] font-extrabold text-amber-300 truncate">{tpl.settings.badgeText}</div>
                          <div className="text-xs font-black text-slate-100 truncate">{tpl.settings.title}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-2">{tpl.settings.subtitle}</div>

                          {/* Mini Form Input & Button */}
                          <div className="space-y-1.5 pt-1">
                            <div className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-500 font-mono">
                              Email Address Input Form...
                            </div>
                            <div className="bg-pink-600 text-white font-extrabold text-[10px] py-1.5 px-2 rounded text-center truncate">
                              {tpl.settings.buttonText}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleApplyTemplate(tpl)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${isApplied ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-pink-600 text-slate-200 hover:text-white'}`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-white" />
                            <span>Template Applied to Canvas!</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Use This Template</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Enable Toggle */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Enable ClickPop for this Funnel Step</div>
                  <div className="text-[11px] text-slate-400">When enabled, popups will trigger based on your selected rule</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.enabled} 
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>

              {/* Trigger Type Selection */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-200">Select Popup Trigger Rule:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  <label 
                    onClick={() => setFormData({ ...formData, triggerType: 'button' })}
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center gap-1.5 text-center transition-all ${formData.triggerType === 'button' ? 'bg-pink-950/60 border-pink-500 text-pink-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <MousePointerClick className="w-5 h-5 text-pink-400" />
                    <span className="text-xs">On Button Click</span>
                    <span className="text-[10px] opacity-70 font-normal">Triggers when user clicks ClickPop button</span>
                  </label>

                  <label 
                    onClick={() => setFormData({ ...formData, triggerType: 'exit_intent' })}
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center gap-1.5 text-center transition-all ${formData.triggerType === 'exit_intent' ? 'bg-pink-950/60 border-pink-500 text-pink-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <DoorOpen className="w-5 h-5 text-amber-400" />
                    <span className="text-xs">Exit Intent</span>
                    <span className="text-[10px] opacity-70 font-normal">Triggers when cursor leaves window top</span>
                  </label>

                  <label 
                    onClick={() => setFormData({ ...formData, triggerType: 'timed_delay' })}
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col items-center gap-1.5 text-center transition-all ${formData.triggerType === 'timed_delay' ? 'bg-pink-950/60 border-pink-500 text-pink-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <Clock className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs">Timed Delay</span>
                    <span className="text-[10px] opacity-70 font-normal">Triggers after N seconds on page</span>
                  </label>
                </div>
              </div>

              {formData.triggerType === 'timed_delay' && (
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Delay Seconds Before Popup Triggers:</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="60"
                    value={formData.delaySeconds}
                    onChange={(e) => setFormData({ ...formData, delaySeconds: parseInt(e.target.value) || 5 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 font-mono"
                  />
                </div>
              )}

              {/* Popup Content Fields */}
              <div className="space-y-3 pt-1 border-t border-slate-800">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Popup Urgency Badge Text:</label>
                  <input 
                    type="text" 
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-amber-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Main Popup Headline:</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Subheadline Copy:</label>
                  <textarea 
                    rows={2}
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Button CTA Text:</label>
                  <input 
                    type="text" 
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-emerald-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Offer Image Graphic URL (Optional):</label>
                  <input 
                    type="text" 
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 font-mono"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-indigo-950/60 border border-indigo-500/40 rounded-xl space-y-1">
                <div className="font-extrabold text-indigo-300">How External ClickPop Embeds Work:</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Copy the HTML code below and place it on your WordPress blog, Medium articles, or third-party websites. Clicking the button on your blog will launch this LaunchEngine popup dynamically!
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-300">HTML & JavaScript Embed Code:</label>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-emerald-400 whitespace-pre-wrap relative">
                  {embedCodeSnippet}
                </div>
              </div>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText(embedCodeSnippet);
                  setCopiedEmbed(true);
                  setTimeout(() => setCopiedEmbed(false), 2000);
                }}
                className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow"
              >
                {copiedEmbed ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmbed ? 'Embed Code Copied to Clipboard!' : 'Copy HTML Embed Snippet'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button 
            type="button"
            onClick={onTestTrigger}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-pink-400 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-pink-500/30"
          >
            <Eye className="w-4 h-4" />
            <span>Test Trigger ClickPop Now</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button 
              onClick={() => handleSubmit()} 
              className="px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-pink-600/30"
            >
              Save ClickPop Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
