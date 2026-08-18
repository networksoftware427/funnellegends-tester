import React, { useState, useEffect } from 'react';
import { CanvasState, FunnelData, FunnelStepData, StyleBackground, ClickPopSettings } from '../../types/builder';
import { ElementRenderer } from '../builder/ElementRenderer';
import { ClickPopOverlay } from '../builder/ClickPopOverlay';
import { Globe, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LivePublishedPageRendererProps {
  funnel: FunnelData;
  step: FunnelStepData;
  onExitToPlatform: () => void;
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

export const LivePublishedPageRenderer: React.FC<LivePublishedPageRendererProps> = ({
  funnel,
  step,
  onExitToPlatform,
}) => {
  const canvasState: CanvasState = step.canvasState;
  const [isClickPopOverlayOpen, setIsClickPopOverlayOpen] = useState(false);

  const activeClickPopSettings: ClickPopSettings = canvasState.clickPopSettings || {
    enabled: true,
    triggerType: 'button',
    delaySeconds: 5,
    title: "WAIT! Don't Leave Empty Handed...",
    subtitle: "Claim your exclusive discount before leaving this page!",
    buttonText: "YES! CLAIM MY DISCOUNT NOW",
    redirectUrl: "/checkout",
    badgeText: "EXCLUSIVE LIVE OFFER",
    backdropBlur: true,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80"
  };

  useEffect(() => {
    const handleCustomOpenClickPop = () => {
      if (activeClickPopSettings.enabled) {
        setIsClickPopOverlayOpen(true);
      }
    };

    const handleExitIntent = (e: MouseEvent) => {
      if (activeClickPopSettings.enabled && activeClickPopSettings.triggerType === 'exit_intent' && e.clientY <= 5) {
        setIsClickPopOverlayOpen(true);
      }
    };

    window.addEventListener('open-clickpop', handleCustomOpenClickPop);
    window.addEventListener('mouseleave', handleExitIntent);

    return () => {
      window.removeEventListener('open-clickpop', handleCustomOpenClickPop);
      window.removeEventListener('mouseleave', handleExitIntent);
    };
  }, [activeClickPopSettings]);

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative selection:bg-emerald-500 selection:text-white">
      {googleFontsUrl && <link rel="stylesheet" href={googleFontsUrl} />}

      {/* Floating Top Indicator & Navigation Bar */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xl border border-slate-700/60 transition-all text-xs font-bold">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-medium text-slate-300">Live Published: <strong className="text-white">{step.name}</strong></span>
        <div className="h-3 w-px bg-slate-700 mx-1"></div>
        <button
          onClick={onExitToPlatform}
          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Platform Studio</span>
        </button>
      </div>

      {/* Canvas Sections Rendering */}
      <main className="flex-1 w-full">
        {canvasState.sections.map((section) => {
          const bgStyle = getBackgroundStyles(section.background);
          if (section.paddingTop) bgStyle.paddingTop = section.paddingTop;
          if (section.paddingBottom) bgStyle.paddingBottom = section.paddingBottom;

          return (
            <section key={section.id} className="relative w-full overflow-hidden" style={bgStyle}>
              <div className={`${section.isFullWidth ? 'w-full px-4' : 'w-full max-w-6xl mx-auto px-4 sm:px-6'}`}>
                {section.rows.map((row) => (
                  <div 
                    key={row.id} 
                    className="relative my-4"
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
                          className={`relative min-h-[40px] p-2 flex flex-col justify-${column.verticalAlign}`}
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
                                viewportMode="desktop"
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* ClickPop Modal Overlay */}
      {isClickPopOverlayOpen && activeClickPopSettings.enabled && (
        <ClickPopOverlay
          isOpen={isClickPopOverlayOpen}
          onClose={() => setIsClickPopOverlayOpen(false)}
          settings={activeClickPopSettings}
        />
      )}
    </div>
  );
};
