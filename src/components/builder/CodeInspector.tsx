import React, { useState } from 'react';
import { CanvasState } from '../../types/builder';
import { Code, X, Copy, Check } from 'lucide-react';

interface CodeInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  canvasState: CanvasState;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({
  isOpen,
  onClose,
  canvasState,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(canvasState, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col shadow-2xl text-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
            <Code className="w-4 h-4" />
            <span>Raw Canvas State JSON Inspector</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>
            <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded text-slate-600 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-white font-mono text-[11px] text-emerald-400">
          <pre>{jsonString}</pre>
        </div>
      </div>
    </div>
  );
};
