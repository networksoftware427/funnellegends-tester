import React, { useState } from 'react';
import { FunnelData } from '../../types/builder';
import { initialSystemTemplates } from '../../data/initialTemplates';
import { 
  Sparkles, X, Check, Copy, Share2, Layers, Download, Search, Filter 
} from 'lucide-react';

interface TemplateLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstantiateTemplate: (template: FunnelData) => void;
}

export const TemplateLibraryModal: React.FC<TemplateLibraryModalProps> = ({
  isOpen,
  onClose,
  onInstantiateTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [shareToken, setShareToken] = useState<string>('');
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen) return null;

  const categories = ['All', 'Presell', 'Optin', 'Thank You', 'Sales', 'Order Forms', 'OTO', 'Webinar', 'Membership', 'Affiliate', 'Specialized'];

  const filteredTemplates = initialSystemTemplates.filter((t) => {
    if (selectedCategory === 'All') return true;
    return t.type === selectedCategory;
  });

  const handleGenerateShareToken = (funnelId: string) => {
    const token = `fl_tpl_share_${funnelId}_${Math.random().toString(36).substr(2, 9)}`;
    setShareToken(token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-slate-900 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>ENTERPRISE ASSET ENGINE</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">Funnel Archetype Template Library</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-2 bg-white/50">
          <Filter className="w-4 h-4 text-slate-600 ml-2" />
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-50 text-slate-600 hover:text-slate-800'}`}
            >
              {cat} Funnels
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Empty Canvas Option */}
          <div className="bg-white border-2 border-dashed border-indigo-500/50 hover:border-indigo-400 rounded-2xl p-5 flex flex-col justify-center items-center group transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/20"
            onClick={() => {
              onInstantiateTemplate({
                id: `empty_${Date.now()}`,
                name: 'Empty Funnel',
                slug: 'empty-funnel',
                type: 'Misc',
                steps: [{
                  id: `step_${Date.now()}`,
                  name: 'Page 1',
                  slug: 'page-1',
                  stepOrder: 1,
                  stepType: 'OptIn',
                  status: 'Draft',
                  canvasState: {
                    sections: [],
                    globalTokens: {
                      primaryColor: '#4f46e5',
                      secondaryColor: '#ec4899',
                      accentColor: '#f59e0b',
                      backgroundColor: '#0f172a',
                      textColor: '#f1f5f9',
                      headingFont: 'Outfit',
                      bodyFont: 'Inter',
                      borderRadiusPreset: '12px'
                    }
                  }
                }],
                hasAutomationTemplate: false,
                createdAt: new Date().toISOString()
              });
              onClose();
            }}
          >
            <div className="w-16 h-16 rounded-full bg-slate-50/80 text-slate-600 group-hover:text-indigo-400 flex items-center justify-center mb-4 transition-colors">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-400 transition-colors mb-2">Empty Canvas</h3>
            <p className="text-xs text-slate-600 text-center px-4">
              Start completely from scratch. Add your own pages and build exactly what you want without any pre-defined template logic.
            </p>
          </div>

          {filteredTemplates.map((tpl) => {
            const primaryColor = tpl.steps?.[0]?.canvasState?.globalTokens?.primaryColor;
            const isColorVariant = tpl.type === 'Application' && primaryColor && tpl.id.startsWith('tpl_app_');
            return (
            <div key={tpl.id} className="bg-white border border-slate-200 hover:border-indigo-500/60 rounded-2xl p-5 flex flex-col justify-between group transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {tpl.type} FUNNEL ARCHETYPE
                    </span>
                    {isColorVariant && (
                      <span
                        className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0"
                        style={{ backgroundColor: primaryColor }}
                        title={`Color: ${primaryColor}`}
                      />
                    )}
                    {tpl.hasAutomationTemplate && (
                      <span className="text-[10px] uppercase font-extrabold px-2 py-1 rounded bg-amber-950/60 text-amber-400 border border-amber-500/30 flex items-center gap-1" title="Includes pre-configured automation workflow for form submissions">
                        <Sparkles className="w-3 h-3" />
                        Automation Attached
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{tpl.steps.length} Steps</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-400 transition-colors mb-2">{tpl.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Pre-configured with global design tokens, optimized step routing, checkout triggers, and high-converting copy.
                </p>

                {/* Steps List Badge */}
                <div className="space-y-1.5 mb-6">
                  {tpl.steps.map((s) => (
                    <div key={s.id} className="text-[11px] text-slate-700 flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200">
                      <span className="w-4 h-4 rounded-full bg-slate-50 text-slate-600 font-bold text-[9px] flex items-center justify-center">{s.stepOrder}</span>
                      <span className="font-medium">{s.name}</span>
                      <span className="ml-auto text-[9px] text-slate-500 font-mono">({s.stepType})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-200/80">
                <button 
                  onClick={() => {
                    onInstantiateTemplate(tpl);
                    onClose();
                  }}
                  className="flex-1 py-2.5 text-slate-900 font-extrabold rounded-xl text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
                  style={isColorVariant && primaryColor ? { backgroundColor: primaryColor, boxShadow: `0 4px 14px ${primaryColor}55` } : { backgroundColor: '#4f46e5', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
                >
                  <Download className="w-4 h-4" />
                  <span>1-Click Instantiate</span>
                </button>
                <button 
                  onClick={() => handleGenerateShareToken(tpl.id)}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold"
                  title="Generate Secret Share Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            );
          })}

        </div>

        {/* Secret Token Generator Footer */}
        {shareToken && (
          <div className="p-4 bg-indigo-950/60 border-t border-indigo-500/40 flex items-center justify-between text-xs text-indigo-200">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>Share Token: <strong className="font-mono text-slate-900">{shareToken}</strong></span>
            </div>
            <span className="text-emerald-400 font-bold">✓ Copied share URL token to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};
