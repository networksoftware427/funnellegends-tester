import React, { useState } from 'react';
import { WEBSITE_TEMPLATES, WebsiteTemplate } from '../../data/websiteTemplates';
import { FunnelData } from '../../types/builder';
import { 
  Globe, Layout, Sparkles, Check, ArrowRight, Eye, Search, Layers, 
  ChevronRight, FileText, Palette, Users, PhoneCall, HelpCircle, BookOpen, Star
} from 'lucide-react';

interface WebsitesManagerProps {
  onSelectTemplate: (website: FunnelData) => void;
}

export const WebsitesManager: React.FC<WebsitesManagerProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<WebsiteTemplate | null>(null);

  const categories = ['All', 'Technology & SaaS', 'Corporate & Legal', 'Real Estate & Hospitality', 'Healthcare & Wellness', 'Creative Agency'];

  const filteredTemplates = WEBSITE_TEMPLATES.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Globe className="w-4 h-4" /> Traditional Website Suite
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Full Website Templates</h1>
            <p className="text-slate-400 text-sm mt-1">
              Complete 6-page traditional websites ready to launch. Each includes Home, Team, Contact Us, Features, About Us, and Blog pages.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Website Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => (
            <div 
              key={tpl.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/50 transition-all flex flex-col group"
            >
              {/* Card Banner Image */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img 
                  src={tpl.thumbnailUrl} 
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-slate-700">
                    {tpl.category}
                  </span>
                  <span className="px-2.5 py-1 bg-indigo-600/90 text-white text-[10px] font-bold rounded-lg shadow">
                    6 Pages Included
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span 
                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: tpl.themeColor }}
                    title={`Theme Color: ${tpl.themeColor}`}
                  />
                  <span className="text-[11px] font-mono text-slate-300 bg-slate-950/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {tpl.fontFamily} Font
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>

                  {/* Included Pages Badge Pills */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Included Website Pages:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.funnelData.steps.map((step) => (
                        <span 
                          key={step.id} 
                          className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/50 flex items-center gap-1"
                        >
                          <FileText className="w-2.5 h-2.5 text-indigo-400" />
                          {step.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button 
                    onClick={() => setPreviewTemplate(tpl)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Pages</span>
                  </button>

                  <button 
                    onClick={() => onSelectTemplate(tpl.funnelData)}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Page Preview Drawer / Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded">
                  {previewTemplate.category}
                </span>
                <h2 className="text-xl font-black text-white mt-1">{previewTemplate.name}</h2>
              </div>
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Pages List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <p className="text-xs text-slate-400 mb-4">{previewTemplate.description}</p>
              
              <div className="text-xs font-bold text-white uppercase tracking-wider">Template Pages Structure ({previewTemplate.funnelData.steps.length} Pages):</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {previewTemplate.funnelData.steps.map((step, idx) => (
                  <div key={step.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{step.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">/{step.slug}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold"
              >
                Close Preview
              </button>
              <button 
                onClick={() => {
                  const data = previewTemplate.funnelData;
                  setPreviewTemplate(null);
                  onSelectTemplate(data);
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
              >
                <span>Edit This Website Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
