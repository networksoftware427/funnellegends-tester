import React, { useState, useRef, useEffect } from 'react';
import { CertElement, CustomBuiltCertificate, CertElementType } from '../../types/certificate';
import { X, Save, Type, Image as ImageIcon, Stamp, PenTool, Layout, AlignLeft, AlignCenter, AlignRight, Trash2 } from 'lucide-react';

interface CertificateBuilderProps {
  initialCert?: CustomBuiltCertificate;
  onSave: (cert: CustomBuiltCertificate) => void;
  onCancel: () => void;
}

export const CertificateBuilder: React.FC<CertificateBuilderProps> = ({ initialCert, onSave, onCancel }) => {
  const [cert, setCert] = useState<CustomBuiltCertificate>(initialCert || {
    id: `custom_${Date.now()}`,
    title: 'My Custom Certificate',
    bgColor: '#ffffff',
    elements: []
  });
  
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const addElement = (type: CertElementType, content: string) => {
    const newElement: CertElement = {
      id: `el_${Date.now()}`,
      type,
      content,
      x: 30, // Default 30%
      y: 40, // Default 40%
      fontSize: 24,
      color: '#0f2d1e',
      fontFamily: 'Inter',
      textAlign: 'center',
      isDynamic: type === 'variable'
    };
    
    setCert(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    setSelectedElementId(newElement.id);
  };

  const updateSelectedElement = (updates: Partial<CertElement>) => {
    if (!selectedElementId) return;
    setCert(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === selectedElementId ? { ...el, ...updates } : el)
    }));
  };

  const removeSelectedElement = () => {
    if (!selectedElementId) return;
    setCert(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== selectedElementId)
    }));
    setSelectedElementId(null);
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElementId(id);
    
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const el = cert.elements.find(e => e.id === id);
      if (el) {
        // Calculate mouse offset relative to the element's top-left corner in percentages
        const mouseXPct = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseYPct = ((e.clientY - rect.top) / rect.height) * 100;
        setDragOffset({
          x: mouseXPct - el.x,
          y: mouseYPct - el.y
        });
        setIsDragging(true);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElementId || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseXPct = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseYPct = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Calculate new position
    let newX = mouseXPct - dragOffset.x;
    let newY = mouseYPct - dragOffset.y;
    
    // Constrain to canvas bounds (0 to 100)
    newX = Math.max(0, Math.min(newX, 95));
    newY = Math.max(0, Math.min(newY, 95));

    updateSelectedElement({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach mouseup/mousemove to window to prevent getting stuck if mouse leaves canvas
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const selectedElement = cert.elements.find(el => el.id === selectedElementId);

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col font-sans">
      {/* Top Header */}
      <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-slate-50"></div>
          <input 
            type="text" 
            value={cert.title}
            onChange={(e) => setCert({...cert, title: e.target.value})}
            className="bg-transparent border-none text-slate-900 font-bold text-lg focus:ring-0 w-64"
            placeholder="Certificate Title"
          />
        </div>
        <button 
          onClick={() => onSave(cert)}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all"
        >
          <Save className="w-4 h-4" />
          Save Certificate
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Element Catalog */}
        <div className="w-64 border-r border-slate-200 bg-white p-4 space-y-6 overflow-y-auto shrink-0">
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Add Elements</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => addElement('text', 'New Text Block')}
                className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                <Type className="w-6 h-6 text-slate-700" />
                <span className="text-[10px] font-bold text-slate-700">Text</span>
              </button>
              
              <button 
                onClick={() => addElement('variable', '{{Student Name}}')}
                className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                <Layout className="w-6 h-6 text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400">Student</span>
              </button>

              <button 
                onClick={() => addElement('badge', '🏆')}
                className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                <Stamp className="w-6 h-6 text-orange-400" />
                <span className="text-[10px] font-bold text-slate-700">Badge</span>
              </button>
              
              <button 
                onClick={() => addElement('signature', '_________________')}
                className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                <PenTool className="w-6 h-6 text-slate-700" />
                <span className="text-[10px] font-bold text-slate-700">Signature</span>
              </button>

              <label className="flex flex-col items-center justify-center gap-2 p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer text-center">
                <ImageIcon className="w-6 h-6 text-indigo-400" />
                <span className="text-[10px] font-bold text-slate-700">Image/Logo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      addElement('image', url);
                    }
                    e.target.value = '';
                  }} 
                />
              </label>
            </div>
          </div>
        </div>

        {/* Center: Canvas Workspace */}
        <div 
          className="flex-1 bg-white overflow-auto flex items-center justify-center p-8 relative"
          onMouseMove={handleMouseMove}
        >
          {/* Certificate Canvas Container (A4 Landscape Aspect Ratio approx 1.414) */}
          <div 
            ref={canvasRef}
            onClick={() => setSelectedElementId(null)}
            className="relative w-full max-w-4xl shadow-2xl overflow-hidden ring-1 ring-slate-800"
            style={{ 
              aspectRatio: '1.414 / 1', 
              backgroundColor: cert.bgColor,
              backgroundImage: cert.bgImageUrl ? `url(${cert.bgImageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Grid Overlay for Visual Aid */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] pointer-events-none opacity-50"></div>

            {/* Elements */}
            {cert.elements.map(el => (
              <div
                key={el.id}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                className={`absolute cursor-move ${selectedElementId === el.id ? 'ring-2 ring-green-500 shadow-lg' : 'hover:ring-1 hover:ring-slate-400/50'}`}
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  color: el.color,
                  fontSize: `${el.fontSize}px`,
                  fontFamily: el.fontFamily,
                  fontWeight: el.fontWeight,
                  textAlign: el.textAlign,
                  width: el.width ? `${el.width}%` : 'auto',
                  height: el.height ? `${el.height}%` : 'auto',
                  userSelect: 'none',
                  padding: '4px',
                  transform: 'translate(-50%, -50%)', // Center based on X/Y
                }}
              >
                {el.type === 'image' ? (
                  <img src={el.content} alt="Element" className="max-w-full" draggable={false} />
                ) : el.type === 'variable' ? (
                  <span className="px-2 py-1 bg-amber-400/20 text-amber-600 rounded border border-amber-400/30 font-bold whitespace-nowrap">
                    {el.content}
                  </span>
                ) : (
                  <div style={{ whiteSpace: 'pre-wrap' }}>{el.content}</div>
                )}
                
                {selectedElementId === el.id && (
                  <div className="absolute -top-6 -right-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeSelectedElement(); }}
                      className="bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Properties */}
        <div className="w-80 border-l border-slate-200 bg-white p-6 overflow-y-auto shrink-0 space-y-8">
          {selectedElement ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-green-400" />
                  Element Properties
                </h3>
                <p className="text-xs text-slate-600 mt-1">Editing selected {selectedElement.type}</p>
              </div>

              {selectedElement.type !== 'image' && (
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1.5">Content</label>
                  {selectedElement.type === 'variable' ? (
                    <select
                      value={selectedElement.content}
                      onChange={(e) => updateSelectedElement({ content: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-green-500"
                    >
                      <option value="{{Student Name}}">Student Name</option>
                      <option value="{{Course Title}}">Course Title</option>
                      <option value="{{Completion Date}}">Completion Date</option>
                    </select>
                  ) : (
                    <textarea 
                      value={selectedElement.content}
                      onChange={(e) => updateSelectedElement({ content: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-green-500"
                      rows={3}
                    />
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1.5">Font Size</label>
                  <input 
                    type="number" 
                    value={selectedElement.fontSize || 16}
                    onChange={(e) => updateSelectedElement({ fontSize: parseInt(e.target.value) || 16 })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1.5">Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={selectedElement.color || '#000000'}
                      onChange={(e) => updateSelectedElement({ color: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer bg-white border border-slate-200 p-0"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1.5">Font Family</label>
                <select
                  value={selectedElement.fontFamily || 'Inter'}
                  onChange={(e) => updateSelectedElement({ fontFamily: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-green-500"
                >
                  <option value="Inter">Inter (Sans)</option>
                  <option value="serif">Serif (Classic)</option>
                  <option value="monospace">Mono (Code)</option>
                  <option value="cursive">Cursive (Signature)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1.5">Alignment</label>
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
                  <button 
                    onClick={() => updateSelectedElement({ textAlign: 'left' })}
                    className={`flex-1 flex justify-center py-1.5 rounded-lg ${selectedElement.textAlign === 'left' ? 'bg-slate-50 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => updateSelectedElement({ textAlign: 'center' })}
                    className={`flex-1 flex justify-center py-1.5 rounded-lg ${selectedElement.textAlign === 'center' ? 'bg-slate-50 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => updateSelectedElement({ textAlign: 'right' })}
                    className={`flex-1 flex justify-center py-1.5 rounded-lg ${selectedElement.textAlign === 'right' ? 'bg-slate-50 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-slate-600" />
                  Canvas Settings
                </h3>
                <p className="text-xs text-slate-600 mt-1">Select an element on the canvas to edit it, or adjust global settings here.</p>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1.5">Background Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={cert.bgColor}
                    onChange={(e) => setCert({ ...cert, bgColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer bg-white border border-slate-200 p-0"
                  />
                  <input 
                    type="text" 
                    value={cert.bgColor}
                    onChange={(e) => setCert({ ...cert, bgColor: e.target.value })}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1.5">Background Image URL</label>
                <input 
                  type="text" 
                  value={cert.bgImageUrl || ''}
                  onChange={(e) => setCert({ ...cert, bgImageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-green-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
