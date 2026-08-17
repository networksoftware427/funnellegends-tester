import React, { useState } from 'react';
import { Sparkles, X, Wand2, Copy, Check, FileText, Layout, Send } from 'lucide-react';
import { CanvasState } from '../../types/builder';
import { createDemoSalesCanvas } from '../../data/initialTemplates';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedCanvas?: (canvas: CanvasState) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyGeneratedCanvas,
}) => {
  const [prompt, setPrompt] = useState('Build a high-ticket agency funnel for selling $5,000 SaaS growth consulting with a VSL video and 1-click upsell.');
  const [mode, setMode] = useState<'copy' | 'funnel_builder'>('funnel_builder');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [isApplied, setIsApplied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedOutput(null);

    setTimeout(() => {
      setIsGenerating(false);
      if (mode === 'copy') {
        setGeneratedOutput(`### AI Generated VSL Sales Copy & Headline Pack:

**Primary Headline:**
"How We Built a $1.2M Funnel Pipeline in 60 Days Without Spending a Single Dollar on Cold Ads"

**Subheadline:**
"Discover the exact 3-step visual stack and automated 1-click upsell system top high-ticket agencies rely on."

**VSL Script Opening Hook (0:00 - 1:30):**
"If you are still sending prospects to standard static websites, you are leaking up to 80% of your revenue..."`);
      } else {
        setGeneratedOutput(`⚡ AI Funnel Architecture Generated Successfully!
- Section 1: Hero Banner with High-Converting Gradient Headline
- Section 2: VSL Video Player with Custom Skins
- Section 3: 2-Step Checkout with Order Bump Checkbox
- Section 4: Evergreen Scarcity Countdown Timer & Social Proof
- Section 5: 1-Click Post-Purchase Upsell Trigger`);
      }
    }, 1500);
  };

  const handleApplyToCanvas = () => {
    if (onApplyGeneratedCanvas) {
      onApplyGeneratedCanvas(createDemoSalesCanvas());
      setIsApplied(true);
      setTimeout(() => {
        setIsApplied(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl text-slate-900 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">LaunchEngine AI Asset & Funnel Copilot</h3>
              <p className="text-[11px] text-slate-600">Generate high-converting headlines, VSL scripts, or full funnel page layouts.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded text-slate-600 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="p-3 border-b border-slate-200 flex gap-2 bg-white/50">
          <button 
            onClick={() => setMode('funnel_builder')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${mode === 'funnel_builder' ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow' : 'bg-slate-50 text-slate-600'}`}
          >
            <Layout className="w-4 h-4" />
            <span>Generate Full Funnel Canvas</span>
          </button>
          <button 
            onClick={() => setMode('copy')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${mode === 'copy' ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow' : 'bg-slate-50 text-slate-600'}`}
          >
            <FileText className="w-4 h-4" />
            <span>AI Sales Copywriter</span>
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Describe your product, offer, or target audience:</label>
            <textarea 
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Wand2 className="w-4 h-4" />
            <span>{isGenerating ? 'AI Engine Thinking & Building...' : 'Generate AI Assets Now'}</span>
          </button>

          {/* Generated Result Output */}
          {generatedOutput && (
            <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">{generatedOutput}</div>
              
              {mode === 'funnel_builder' && (
                <button 
                  onClick={handleApplyToCanvas}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow flex items-center justify-center gap-2"
                >
                  {isApplied ? <Check className="w-4 h-4 text-slate-900" /> : <Wand2 className="w-4 h-4" />}
                  <span>{isApplied ? 'Canvas Updated with AI Layout ✓' : 'Apply AI Layout to Live Canvas'}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
