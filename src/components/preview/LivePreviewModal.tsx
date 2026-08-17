import React, { useState } from 'react';
import { CanvasState, FunnelStepData, StyleBackground } from '../../types/builder';
import { ElementRenderer } from '../builder/ElementRenderer';
import { Monitor, Tablet, Smartphone, X, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStep: FunnelStepData;
  canvasState: CanvasState;
}
const hexToRgba = (hex: string, opacity: number = 100) => {
  if (!hex || !hex.startsWith('#')) return hex;
  const h = hex.replace('#', '');
  if (h.length !== 6 && h.length !== 3) return hex;
  const r = parseInt(h.length === 3 ? h[0]+h[0] : h.substring(0,2), 16);
  const g = parseInt(h.length === 3 ? h[1]+h[1] : h.substring(2,4), 16);
  const b = parseInt(h.length === 3 ? h[2]+h[2] : h.substring(4,6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

const getBackgroundStyles = (bg?: StyleBackground): React.CSSProperties => {
  if (!bg || bg.bgType === 'none') return {};
  
  if (bg.bgType === 'color') return { backgroundColor: bg.backgroundColor };
  if (bg.bgType === 'gradient') return { backgroundImage: bg.gradient };
  
  if (bg.bgType === 'image' && bg.bgImage) {
    const overlay = bg.bgOverlayOpacity && bg.bgOverlayOpacity > 0 && bg.bgOverlayColor
      ? `linear-gradient(${hexToRgba(bg.bgOverlayColor, bg.bgOverlayOpacity)}, ${hexToRgba(bg.bgOverlayColor, bg.bgOverlayOpacity)}), ` 
      : '';
    
    return {
      backgroundImage: `${overlay}url(${bg.bgImage})`,
      backgroundSize: bg.bgImageSize || 'cover',
      backgroundPosition: bg.bgImagePosition || 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: bg.isParallax ? 'fixed' : 'scroll'
    };
  }
  
  return {};
};

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  isOpen,
  onClose,
  activeStep,
  canvasState,
}) => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showScrollTop, setShowScrollTop] = useState(false);

  if (!isOpen) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    const el = document.getElementById('live-preview-scroll-container');
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getWidthClass = () => {
    if (viewportMode === 'mobile') return 'w-full max-w-[390px] min-h-[840px] rounded-[36px] border-[10px] border-slate-800 shadow-2xl my-6 overflow-visible';
    if (viewportMode === 'tablet') return 'w-full max-w-[768px] min-h-[960px] rounded-2xl border-[6px] border-slate-800 shadow-2xl my-6 overflow-visible';
    return 'w-full min-h-full border-none shadow-none';
  };

  // Extract all unique font families from elements to auto-inject Google Fonts
  const usedFonts = new Set<string>();
  canvasState.sections.forEach(sec => {
    sec.rows.forEach(row => {
      row.columns.forEach(col => {
        col.elements.forEach(el => {
          if (el.style?.typography?.fontFamily) {
            usedFonts.add(el.style.typography.fontFamily);
          }
        });
      });
    });
  });

  const fontFamiliesList = Array.from(usedFonts).map(f => f.replace(/\s+/g, '+')).join('&family=');
  const googleFontsUrl = fontFamiliesList ? `https://fonts.googleapis.com/css2?family=${fontFamiliesList}:wght@300;400;600;700;800;900&display=swap` : '';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col">
      {googleFontsUrl && <link rel="stylesheet" href={googleFontsUrl} />}
      
      {/* Top Navigation & Viewport Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0 text-slate-100 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <h3 className="font-bold text-sm">Live Preview Environment: <span className="text-indigo-400 font-mono">{activeStep.name}</span></h3>
          <span className="hidden lg:inline text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
            {viewportMode.toUpperCase()} VIEW • FULL SCROLL ACTIVE
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
          <button 
            onClick={() => setViewportMode('desktop')} 
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${viewportMode === 'desktop' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" />
            <span>Desktop</span>
          </button>
          <button 
            onClick={() => setViewportMode('tablet')} 
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${viewportMode === 'tablet' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Tablet className="w-4 h-4" />
            <span>Tablet</span>
          </button>
          <button 
            onClick={() => setViewportMode('mobile')} 
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${viewportMode === 'mobile' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile</span>
          </button>
        </div>

        <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Main Preview Scrollable Container Area */}
      <div 
        id="live-preview-scroll-container"
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto scroll-smooth bg-slate-950 flex flex-col ${viewportMode === 'desktop' ? 'p-0' : 'p-4 md:p-8 items-center'}`}
      >
        <div className={`transition-all duration-300 bg-slate-900 mx-auto ${getWidthClass()}`}>
          {canvasState.sections.map((section) => {
            const bgStyle = getBackgroundStyles(section.background);
            if (section.paddingTop) bgStyle.paddingTop = section.paddingTop;
            if (section.paddingBottom) bgStyle.paddingBottom = section.paddingBottom;

            return (
              <div key={section.id} className="relative" style={bgStyle}>
                <div className={`${section.isFullWidth ? 'w-full px-4' : 'w-full max-w-5xl mx-auto px-6'}`}>
                  {section.rows.map((row) => (
                    <div 
                      key={row.id} 
                      className="relative my-4 p-3 rounded-lg"
                      style={{ 
                        gap: row.gap,
                        ...getBackgroundStyles(row.background)
                      }}
                    >
                      <div 
                        className="flex flex-col md:flex-row gap-4"
                        style={{ alignItems: row.alignItems }}
                      >
                        {row.columns.map((column) => (
                          <div 
                            key={column.id} 
                            className={`relative min-h-[50px] p-3 rounded-lg flex flex-col justify-${column.verticalAlign}`}
                            style={{ 
                              flex: `${column.widthFraction || 1} 1 0%`,
                              ...getBackgroundStyles(column.background)
                            }}
                          >
                            {column.elements.map((element) => (
                              <div key={element.id} className="w-full">
                                <ElementRenderer 
                                  element={element}
                                  isInteractiveMode={true}
                                  viewportMode={viewportMode}
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll To Top Floating Action Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl border border-indigo-400/30 transition-all transform hover:scale-110 z-50 flex items-center justify-center"
            title="Scroll to Top of Page"
          >
            <ArrowRight className="w-5 h-5 -rotate-90" />
          </button>
        )}
      </div>
    </div>
  );
};
