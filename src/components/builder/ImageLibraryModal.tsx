import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { funnelSvgLibrary, SvgImage } from '../../data/svgLibrary';

interface ImageLibraryModalProps {
  onClose: () => void;
  onSelect: (url: string) => void;
}

export const ImageLibraryModal: React.FC<ImageLibraryModalProps> = ({ onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(funnelSvgLibrary.map(img => img.category)))];

  const filteredImages = funnelSvgLibrary.filter(img => {
    const matchesSearch = img.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-white/80 z-[200] flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Image Library</h2>
            <p className="text-sm text-slate-600 mt-1">Select an SVG icon to use as an image</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 shrink-0 bg-white">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search images..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {filteredImages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <p>No images found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredImages.map(img => (
                <div 
                  key={img.id}
                  onClick={() => {
                    onSelect(img.url);
                    onClose();
                  }}
                  className="bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer group transition-all hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-50/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={img.url} alt={img.name} className="w-10 h-10 object-contain" />
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-xs font-bold text-slate-700 truncate w-full" title={img.name}>{img.name}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{img.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
