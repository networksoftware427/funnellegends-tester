import React, { useState } from 'react';
import { ElementNode, ElementStyle, SectionNode, RowNode } from '../../types/builder';
import { catalogItems } from './SidebarCatalog';
import { 
  Type, Move, Paintbrush, Box, Layers, Code, Sparkles, Sliders, ChevronDown, 
  Eye, EyeOff, Palette, Layout, Zap, Smartphone, ImageIcon, Upload
} from 'lucide-react';
import { ImageLibraryModal } from './ImageLibraryModal';
import { UniversalColorPicker } from './UniversalColorPicker';
import { cssColorToHex } from '../../utils/colorUtils';
import { createDefaultStyle } from '../../data/initialTemplates';

interface InspectorPanelProps {
  selectedElement: ElementNode | null;
  selectedSection: SectionNode | null;
  selectedRow?: RowNode | null;
  selectedColumn?: import('../../types/builder').ColumnNode | null;
  onUpdateElementStyle: (updatedStyle: ElementStyle) => void;
  onUpdateElementProps: (updatedProps: Record<string, any>) => void;
  onUpdateSection: (updatedSec: SectionNode) => void;
  onUpdateRow?: (updatedRow: RowNode) => void;
  onUpdateColumn?: (updatedColumn: import('../../types/builder').ColumnNode) => void;
  onClose: () => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  selectedElement,
  selectedSection,
  selectedRow,
  selectedColumn,
  onUpdateRow,
  onUpdateColumn,
  onUpdateElementStyle,
  onUpdateElementProps,
  onUpdateSection,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'advanced'>('settings');
  const [showImageLibrary, setShowImageLibrary] = useState<{ isOpen: boolean; onSelect: ((url: string) => void) | null }>({ isOpen: false, onSelect: null });

  if (selectedRow && !selectedElement && onUpdateRow) {
    const bg = selectedRow.background || { bgType: 'none', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center center', bgOverlayColor: 'transparent', bgOverlayOpacity: 0, isParallax: false, bgVideoUrl: '' };

    return (
      <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full text-slate-100 shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Layout className="w-4 h-4" />
            <span>Row Inspector</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">Close</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs pb-32">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Gap</label>
            <input 
              type="text" 
              value={selectedRow.gap} 
              onChange={(e) => onUpdateRow({ ...selectedRow, gap: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Background Type</label>
            <select 
              value={bg.bgType}
              onChange={(e) => onUpdateRow({
                ...selectedRow,
                background: { ...bg, bgType: e.target.value as any }
              })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
            >
              <option value="none">None (Transparent)</option>
              <option value="color">Solid Color</option>
              <option value="gradient">Linear/Radial Gradient</option>
              <option value="image">Background Image</option>
            </select>
          </div>

          {bg.bgType === 'color' && (
            <UniversalColorPicker
              label="Background Color (HEX, RGB, RGBA, HSL, Named Color)"
              value={bg.backgroundColor}
              onChange={(newColor) => onUpdateRow({
                ...selectedRow,
                background: { ...bg, backgroundColor: newColor }
              })}
            />
          )}

          {bg.bgType === 'gradient' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Gradient CSS</label>
              <input 
                type="text" 
                value={bg.gradient}
                onChange={(e) => onUpdateRow({
                  ...selectedRow,
                  background: { ...bg, gradient: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
              />
            </div>
          )}

          {bg.bgType === 'image' && (
            <div className="space-y-4 border-t border-slate-800 pt-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Background Image URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={bg.bgImage || ''}
                    onChange={(e) => onUpdateRow({
                      ...selectedRow,
                      background: { ...bg, bgImage: e.target.value }
                    })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                  />
                  <button 
                    onClick={() => setShowImageLibrary({ 
                      isOpen: true, 
                      onSelect: (url) => onUpdateRow({ ...selectedRow, background: { ...bg, bgImage: url }}) 
                    })}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-indigo-400 shrink-0"
                    title="Browse SVG Library"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <label className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-emerald-400 shrink-0 cursor-pointer" title="Upload from Desktop">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              onUpdateRow({ ...selectedRow, background: { ...bg, bgImage: event.target.result.toString() }});
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                    <Upload className="w-4 h-4" />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Size</label>
                  <select 
                    value={bg.bgImageSize || 'cover'}
                    onChange={(e) => onUpdateRow({
                      ...selectedRow,
                      background: { ...bg, bgImageSize: e.target.value as any }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Position</label>
                  <select 
                    value={bg.bgImagePosition || 'center center'}
                    onChange={(e) => onUpdateRow({
                      ...selectedRow,
                      background: { ...bg, bgImagePosition: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="center center">Center</option>
                    <option value="top center">Top</option>
                    <option value="bottom center">Bottom</option>
                    <option value="left center">Left</option>
                    <option value="right center">Right</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Overlay Color (Hex/RGBA)</label>
                <div className="flex gap-2 items-center mb-3">
                  <input 
                    type="color" 
                    value={bg.bgOverlayColor && bg.bgOverlayColor.startsWith('#') ? bg.bgOverlayColor.slice(0,7) : '#000000'}
                    onChange={(e) => onUpdateRow({
                      ...selectedRow,
                      background: { ...bg, bgOverlayColor: e.target.value }
                    })}
                    className="w-7 h-7 rounded bg-transparent cursor-pointer"
                  />
                  <input 
                    type="text" 
                    placeholder="e.g. rgba(0,0,0,0.5) or #000"
                    value={bg.bgOverlayColor || ''}
                    onChange={(e) => onUpdateRow({
                      ...selectedRow,
                      background: { ...bg, bgOverlayColor: e.target.value }
                    })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs font-mono"
                  />
                </div>
                
                <label className="block font-semibold text-slate-300 mb-1">Overlay Transparency: {bg.bgOverlayOpacity || 0}%</label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={bg.bgOverlayOpacity || 0}
                  onChange={(e) => onUpdateRow({
                    ...selectedRow,
                    background: { ...bg, bgOverlayOpacity: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedColumn && !selectedElement && onUpdateColumn) {
    const bg = selectedColumn.background || { bgType: 'none', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center center', bgOverlayColor: 'transparent', bgOverlayOpacity: 0, isParallax: false, bgVideoUrl: '' };

    return (
      <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full text-slate-100 shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
            <Layout className="w-4 h-4" />
            <span>Column Inspector</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">Close</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs pb-32">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Background Type</label>
            <select 
              value={bg.bgType}
              onChange={(e) => onUpdateColumn({
                ...selectedColumn,
                background: { ...bg, bgType: e.target.value as any }
              })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
            >
              <option value="none">None (Transparent)</option>
              <option value="color">Solid Color</option>
              <option value="gradient">Linear/Radial Gradient</option>
              <option value="image">Background Image</option>
            </select>
          </div>

          {bg.bgType === 'color' && (
            <UniversalColorPicker
              label="Background Color (HEX, RGB, RGBA, HSL, Named Color)"
              value={bg.backgroundColor}
              onChange={(newColor) => onUpdateColumn({
                ...selectedColumn,
                background: { ...bg, backgroundColor: newColor }
              })}
            />
          )}

          {bg.bgType === 'gradient' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Gradient CSS</label>
              <input 
                type="text" 
                value={bg.gradient}
                onChange={(e) => onUpdateColumn({
                  ...selectedColumn,
                  background: { ...bg, gradient: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
              />
            </div>
          )}

          {bg.bgType === 'image' && (
            <div className="space-y-4 border-t border-slate-800 pt-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Background Image URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={bg.bgImage || ''}
                    onChange={(e) => onUpdateColumn({
                      ...selectedColumn,
                      background: { ...bg, bgImage: e.target.value }
                    })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                  />
                  <button 
                    onClick={() => setShowImageLibrary({ 
                      isOpen: true, 
                      onSelect: (url) => onUpdateColumn({ ...selectedColumn, background: { ...bg, bgImage: url }}) 
                    })}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-indigo-400 shrink-0"
                    title="Browse SVG Library"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <label className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-emerald-400 shrink-0 cursor-pointer" title="Upload from Desktop">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              onUpdateColumn({ ...selectedColumn, background: { ...bg, bgImage: event.target.result.toString() }});
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                    <Upload className="w-4 h-4" />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Size</label>
                  <select 
                    value={bg.bgImageSize || 'cover'}
                    onChange={(e) => onUpdateColumn({
                      ...selectedColumn,
                      background: { ...bg, bgImageSize: e.target.value as any }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Position</label>
                  <select 
                    value={bg.bgImagePosition || 'center center'}
                    onChange={(e) => onUpdateColumn({
                      ...selectedColumn,
                      background: { ...bg, bgImagePosition: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="center center">Center</option>
                    <option value="top center">Top</option>
                    <option value="bottom center">Bottom</option>
                    <option value="left center">Left</option>
                    <option value="right center">Right</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Overlay Color (Hex/RGBA)</label>
                <div className="flex gap-2 items-center mb-3">
                  <input 
                    type="color" 
                    value={bg.bgOverlayColor && bg.bgOverlayColor.startsWith('#') ? bg.bgOverlayColor.slice(0,7) : '#000000'}
                    onChange={(e) => onUpdateColumn({
                      ...selectedColumn,
                      background: { ...bg, bgOverlayColor: e.target.value }
                    })}
                    className="w-7 h-7 rounded bg-transparent cursor-pointer"
                  />
                  <input 
                    type="text" 
                    placeholder="e.g. rgba(0,0,0,0.5) or #000"
                    value={bg.bgOverlayColor || ''}
                    onChange={(e) => onUpdateColumn({
                      ...selectedColumn,
                      background: { ...bg, bgOverlayColor: e.target.value }
                    })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs font-mono"
                  />
                </div>
                
                <label className="block font-semibold text-slate-300 mb-1">Overlay Transparency: {bg.bgOverlayOpacity || 0}%</label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={bg.bgOverlayOpacity || 0}
                  onChange={(e) => onUpdateColumn({
                    ...selectedColumn,
                    background: { ...bg, bgOverlayOpacity: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedSection && !selectedElement && !selectedRow && !selectedColumn) {
    return (
      <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full text-slate-100 shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Section Inspector</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">Close</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs pb-32">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Section Name</label>
            <input 
              type="text" 
              value={selectedSection.name} 
              onChange={(e) => onUpdateSection({ ...selectedSection, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300">Full Width Container</span>
            <input 
              type="checkbox" 
              checked={selectedSection.isFullWidth}
              onChange={(e) => onUpdateSection({ ...selectedSection, isFullWidth: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Top Padding</label>
            <input 
              type="text" 
              value={selectedSection.paddingTop}
              onChange={(e) => onUpdateSection({ ...selectedSection, paddingTop: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Bottom Padding</label>
            <input 
              type="text" 
              value={selectedSection.paddingBottom}
              onChange={(e) => onUpdateSection({ ...selectedSection, paddingBottom: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Background Type</label>
            <select 
              value={selectedSection.background.bgType}
              onChange={(e) => onUpdateSection({
                ...selectedSection,
                background: { ...selectedSection.background, bgType: e.target.value as any }
              })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
            >
              <option value="none">None (Transparent)</option>
              <option value="color">Solid Color</option>
              <option value="gradient">Linear/Radial Gradient</option>
              <option value="image">Background Image</option>
            </select>
          </div>

          {selectedSection.background.bgType === 'color' && (
            <UniversalColorPicker
              label="Background Color (HEX, RGB, RGBA, HSL, Named Color)"
              value={selectedSection.background.backgroundColor}
              onChange={(newColor) => onUpdateSection({
                ...selectedSection,
                background: { ...selectedSection.background, backgroundColor: newColor }
              })}
            />
          )}

          {selectedSection.background.bgType === 'gradient' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Gradient CSS</label>
              <input 
                type="text" 
                value={selectedSection.background.gradient}
                onChange={(e) => onUpdateSection({
                  ...selectedSection,
                  background: { ...selectedSection.background, gradient: e.target.value }
                })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
              />
            </div>
          )}

          {selectedSection.background.bgType === 'image' && (
            <div className="space-y-4 border-t border-slate-800 pt-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Background Image URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={selectedSection.background.bgImage || ''}
                    onChange={(e) => onUpdateSection({ 
                      ...selectedSection, 
                      background: { ...selectedSection.background, bgImage: e.target.value }
                    })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                  />
                  <button 
                    onClick={() => setShowImageLibrary({ 
                      isOpen: true, 
                      onSelect: (url) => onUpdateSection({ ...selectedSection, background: { ...selectedSection.background, bgImage: url }}) 
                    })}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-indigo-400 shrink-0"
                    title="Browse SVG Library"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <label className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-emerald-400 shrink-0 cursor-pointer" title="Upload from Desktop">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              onUpdateSection({ ...selectedSection, background: { ...selectedSection.background, bgImage: event.target.result.toString() }});
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                    <Upload className="w-4 h-4" />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Size</label>
                  <select 
                    value={selectedSection.background.bgImageSize || 'cover'}
                    onChange={(e) => onUpdateSection({
                      ...selectedSection,
                      background: { ...selectedSection.background, bgImageSize: e.target.value as any }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Position</label>
                  <select 
                    value={selectedSection.background.bgImagePosition || 'center center'}
                    onChange={(e) => onUpdateSection({
                      ...selectedSection,
                      background: { ...selectedSection.background, bgImagePosition: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="center center">Center</option>
                    <option value="top center">Top</option>
                    <option value="bottom center">Bottom</option>
                    <option value="left center">Left</option>
                    <option value="right center">Right</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Overlay Color (Hex/RGBA)</label>
                <div className="flex gap-2 items-center mb-3">
                  <input 
                    type="color" 
                    value={selectedSection.background.bgOverlayColor && selectedSection.background.bgOverlayColor.startsWith('#') ? selectedSection.background.bgOverlayColor.slice(0,7) : '#000000'}
                    onChange={(e) => onUpdateSection({
                      ...selectedSection,
                      background: { ...selectedSection.background, bgOverlayColor: e.target.value }
                    })}
                    className="w-7 h-7 rounded bg-transparent cursor-pointer"
                  />
                  <input 
                    type="text" 
                    placeholder="e.g. rgba(0,0,0,0.5) or #000"
                    value={selectedSection.background.bgOverlayColor || ''}
                    onChange={(e) => onUpdateSection({
                      ...selectedSection,
                      background: { ...selectedSection.background, bgOverlayColor: e.target.value }
                    })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs font-mono"
                  />
                </div>
                
                <label className="block font-semibold text-slate-300 mb-1">Overlay Transparency: {selectedSection.background.bgOverlayOpacity || 0}%</label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={selectedSection.background.bgOverlayOpacity || 0}
                  onChange={(e) => onUpdateSection({
                    ...selectedSection,
                    background: { ...selectedSection.background, bgOverlayOpacity: parseInt(e.target.value, 10) }
                  })}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!selectedElement) {
    return null;
  }

  // Safe style & props merger to prevent runtime crashes on any clicked element
  const defaultStyle = createDefaultStyle();
  const rawStyle = selectedElement.style || defaultStyle;
  const style: ElementStyle = {
    typography: { ...defaultStyle.typography, ...(rawStyle.typography || {}) },
    boxModel: { ...defaultStyle.boxModel, ...(rawStyle.boxModel || {}) },
    background: { ...defaultStyle.background, ...(rawStyle.background || {}) },
    borders: { ...defaultStyle.borders, ...(rawStyle.borders || {}) },
    effects: { ...defaultStyle.effects, ...(rawStyle.effects || {}) },
    layoutAnim: { ...defaultStyle.layoutAnim, ...(rawStyle.layoutAnim || {}) },
    customCode: { ...defaultStyle.customCode, ...(rawStyle.customCode || {}) },
  };

  const catalogItem = catalogItems.find(item => item.type === selectedElement.type);
  const props = { ...(catalogItem?.defaultProps || {}), ...(selectedElement.props || {}) };

  const handleTypoChange = (key: keyof ElementStyle['typography'], val: any) => {
    onUpdateElementStyle({
      ...style,
      typography: { ...style.typography, [key]: val }
    });
  };

  const handleBoxChange = (key: keyof ElementStyle['boxModel'], val: any) => {
    onUpdateElementStyle({
      ...style,
      boxModel: { ...style.boxModel, [key]: val }
    });
  };

  const handleBgChange = (key: keyof ElementStyle['background'], val: any) => {
    onUpdateElementStyle({
      ...style,
      background: { ...style.background, [key]: val }
    });
  };

  const handleBorderChange = (key: keyof ElementStyle['borders'], val: any) => {
    onUpdateElementStyle({
      ...style,
      borders: { ...style.borders, [key]: val }
    });
  };

  const handleAnimChange = (key: keyof ElementStyle['layoutAnim'], val: any) => {
    onUpdateElementStyle({
      ...style,
      layoutAnim: { ...style.layoutAnim, [key]: val }
    });
  };

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full text-slate-100 shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-orange-400 font-extrabold">ELEMENT INSPECTOR</span>
          <h3 className="text-sm font-bold text-slate-100 capitalize">{selectedElement.name || selectedElement.type.replace('_', ' ')}</h3>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">Close</button>
      </div>

      {/* Inspector Tabs - ClickFunnels 2-Tab Model */}
      <div className="flex border-b border-slate-800 text-xs">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2.5 font-bold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${activeTab === 'settings' ? 'border-orange-500 text-orange-400 bg-slate-850' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
        <button 
          onClick={() => setActiveTab('advanced')}
          className={`flex-1 py-2.5 font-bold transition-colors border-b-2 flex items-center justify-center gap-1.5 ${activeTab === 'advanced' ? 'border-orange-500 text-orange-400 bg-slate-850' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Advanced</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs pb-32">
        {/* TAB 1: SETTINGS (Element Content, Props, Typography & Spacing) */}
        {activeTab === 'settings' && (
          <>
            <div className="space-y-4">
            {/* SPECIAL NAVIGATION MENU & SUB-MENU CONFIGURATOR */}
            {['header_navigation', 'menu_navigation'].includes(selectedElement.type) && (
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-indigo-500/40 space-y-3 mb-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-extrabold text-indigo-400">Navigation & Dropdown Sub-Menus</span>
                  <button 
                    onClick={() => {
                      const items = props.menuItems || props.links || [];
                      const newItem = { id: `m-${Date.now()}`, label: 'New Link', linkUrl: '#', subItems: [] };
                      onUpdateElementProps({ ...props, menuItems: [...items, newItem], links: [...items, newItem] });
                    }}
                    className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold"
                  >
                    + Add Item
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Hide Brand Area</span>
                  <input
                    type="checkbox"
                    checked={props.hideBrandImage || false}
                    onChange={(e) => onUpdateElementProps({ ...props, hideBrandImage: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-3">
                  {((props.menuItems || props.links || []) as any[]).map((item: any, mIdx: number) => (
                    <div key={item.id || mIdx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Item {mIdx + 1}</span>
                        <button 
                          onClick={() => {
                            const items = [...(props.menuItems || props.links || [])];
                            items.splice(mIdx, 1);
                            onUpdateElementProps({ ...props, menuItems: items, links: items });
                          }}
                          className="text-slate-500 hover:text-rose-400 text-[10px]"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <input 
                          type="text" 
                          placeholder="Label (e.g. Services)"
                          value={item.label || ''} 
                          onChange={(e) => {
                            const items = JSON.parse(JSON.stringify(props.menuItems || props.links || []));
                            items[mIdx].label = e.target.value;
                            onUpdateElementProps({ ...props, menuItems: items, links: items });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-white"
                        />
                        <input 
                          type="text" 
                          placeholder="URL (e.g. #pricing)"
                          value={item.linkUrl || item.url || ''} 
                          onChange={(e) => {
                            const items = JSON.parse(JSON.stringify(props.menuItems || props.links || []));
                            items[mIdx].linkUrl = e.target.value;
                            items[mIdx].url = e.target.value;
                            onUpdateElementProps({ ...props, menuItems: items, links: items });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-white font-mono"
                        />
                      </div>

                      {/* Dropdown Sub-Items */}
                      <div className="pt-1.5 border-t border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">Dropdown Sub-Items</span>
                          <button 
                            onClick={() => {
                              const items = JSON.parse(JSON.stringify(props.menuItems || props.links || []));
                              if (!items[mIdx].subItems) items[mIdx].subItems = [];
                              items[mIdx].subItems.push({ id: `sm-${Date.now()}`, label: 'Sub Link', linkUrl: '#' });
                              onUpdateElementProps({ ...props, menuItems: items, links: items });
                            }}
                            className="text-[9px] text-indigo-300 font-bold hover:underline"
                          >
                            + Dropdown Sub-Item
                          </button>
                        </div>

                        {(item.subItems || []).map((sub: any, sIdx: number) => (
                          <div key={sub.id || sIdx} className="flex items-center gap-1 pl-2 border-l border-indigo-500/40">
                            <input 
                              type="text" 
                              placeholder="Sub label..."
                              value={sub.label || ''} 
                              onChange={(e) => {
                                const items = JSON.parse(JSON.stringify(props.menuItems || props.links || []));
                                items[mIdx].subItems[sIdx].label = e.target.value;
                                onUpdateElementProps({ ...props, menuItems: items, links: items });
                              }}
                              className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-200 flex-1"
                            />
                            <input 
                              type="text" 
                              placeholder="URL..."
                              value={sub.linkUrl || ''} 
                              onChange={(e) => {
                                const items = JSON.parse(JSON.stringify(props.menuItems || props.links || []));
                                items[mIdx].subItems[sIdx].linkUrl = e.target.value;
                                onUpdateElementProps({ ...props, menuItems: items, links: items });
                              }}
                              className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-200 font-mono w-20"
                            />
                            <button 
                              onClick={() => {
                                const items = JSON.parse(JSON.stringify(props.menuItems || props.links || []));
                                items[mIdx].subItems.splice(sIdx, 1);
                                onUpdateElementProps({ ...props, menuItems: items, links: items });
                              }}
                              className="text-slate-500 hover:text-rose-400 text-[10px] px-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Form, Webinar, Ecommerce & LMS Styling Box */}
            {['text_input', 'textarea', 'sms_signup', 'select_dropdown', 'multi_step_optin', 'survey', 'autowebinar_registration', 'webinar_date', 'webinar_time', 'add_event', 'button', 'clickpop_button', 'credit_card_form', 'order_select', 'pricing_table', 'checkout_bump', 'upsell_button', 'course_curriculum_widget', 'lesson_video_player', 'certificate_badge_widget', 'drip_schedule_widget', 'hero_banner_widget', 'cta_box_widget', 'testimonial_card_widget', 'appointment_calendar', 'appointment_host_card', 'appointment_summary_receipt'].includes(selectedElement.type) && (
              <div className="p-3 bg-slate-950 rounded-2xl border border-indigo-500/40 space-y-3 mb-4">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-xs pb-2 border-b border-slate-800">
                  <Paintbrush className="w-3.5 h-3.5" />
                  <span>Element Background, Border & Shadow Styling</span>
                </div>

                {/* 1. Element Wrapper Background */}
                <UniversalColorPicker
                  label="Entire Element Background"
                  value={props.formBgColor || 'transparent'}
                  onChange={(newColor) => onUpdateElementProps({ ...props, formBgColor: newColor })}
                />

                {/* 2. Input Field Background */}
                <UniversalColorPicker
                  label="Input Field Background Color"
                  value={props.inputBgColor || '#0f172a'}
                  onChange={(newColor) => onUpdateElementProps({ ...props, inputBgColor: newColor })}
                />

                {/* 3. Border Color */}
                <UniversalColorPicker
                  label="Border Color"
                  value={props.borderColor || '#334155'}
                  onChange={(newColor) => onUpdateElementProps({ ...props, borderColor: newColor })}
                />

                {/* 4. Border Width & Radius */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Border Width</label>
                    <input 
                      type="text" 
                      value={props.borderWidth || '1px'}
                      onChange={(e) => onUpdateElementProps({ ...props, borderWidth: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs"
                      placeholder="1px"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Corner Radius</label>
                    <input 
                      type="text" 
                      value={props.borderRadius || '12px'}
                      onChange={(e) => onUpdateElementProps({ ...props, borderRadius: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs"
                      placeholder="12px"
                    />
                  </div>
                </div>

                {/* 5. Input Shadow */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Input Box Shadow</label>
                  <select 
                    value={props.shadow || props.inputShadow || 'none'}
                    onChange={(e) => onUpdateElementProps({ ...props, shadow: e.target.value, inputShadow: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-100 text-xs"
                  >
                    <option value="none">None (Flat)</option>
                    <option value="sm">Soft Small (SM)</option>
                    <option value="md">Medium Depth (MD)</option>
                    <option value="lg">Large Floating (LG)</option>
                    <option value="xl">Deep Drop Shadow (XL)</option>
                    <option value="2xl">Elevated 3D Shadow (2XL)</option>
                    <option value="glow">✨ Indigo Neon Glow</option>
                    <option value="glow-emerald">✨ Emerald Success Glow</option>
                    <option value="glow-amber">✨ Amber Gold Glow</option>
                  </select>
                </div>
              </div>
            )}
            {Object.keys(props)
              .filter(propKey => !['formBgColor', 'inputBgColor', 'borderColor', 'borderWidth', 'borderRadius', 'shadow', 'inputShadow', 'formShadow'].includes(propKey))
              .map((propKey) => (
              <div key={propKey}>
                <label className="block font-semibold text-slate-300 mb-1 capitalize">{propKey.replace(/([A-Z])/g, ' $1')}</label>
                {typeof props[propKey] === 'boolean' ? (
                  <input 
                    type="checkbox" 
                    checked={props[propKey]}
                    onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-orange-500"
                  />
                
                  ) : propKey === 'buttonAction' ? (
                    <select
                      value={props[propKey]}
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                    >
                      <option value="next_step">Move to Next Step in Funnel</option>
                      <option value="submit_form">Submit Form Data</option>
                      <option value="open_popup">Open ClickPop (Popup)</option>
                      <option value="external_link">Go to Website URL</option>
                    </select>
                  ) : propKey === 'buttonLink' && props['buttonAction'] === 'external_link' ? (
                    <input 
                      type="text" 
                      value={props[propKey]} 
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                      placeholder="https://..."
                    />
                  ) : propKey === 'buttonLink' && props['buttonAction'] !== 'external_link' ? null : propKey.toLowerCase().includes('color') ? (
                  <UniversalColorPicker
                    value={props[propKey] || ''}
                    onChange={(newColor) => onUpdateElementProps({ ...props, [propKey]: newColor })}
                  />
                ) : propKey === 'shadow' || propKey === 'inputShadow' || propKey === 'formShadow' ? (
                  <select 
                    value={props[propKey] || 'none'}
                    onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                  >
                    <option value="none">None (Flat)</option>
                    <option value="sm">Soft Small (SM)</option>
                    <option value="md">Medium Depth (MD)</option>
                    <option value="lg">Large Floating (LG)</option>
                    <option value="xl">Deep Drop Shadow (XL)</option>
                    <option value="2xl">Elevated 3D Shadow (2XL)</option>
                    <option value="glow">✨ Indigo Neon Glow</option>
                    <option value="glow-emerald">✨ Emerald Success Glow</option>
                    <option value="glow-amber">✨ Amber Gold Glow</option>
                  </select>
                ) : propKey === 'iconName' ? (
                  <input 
                    type="text"
                    placeholder="e.g. ArrowRight, CheckCircle"
                    value={props[propKey]}
                    onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 font-mono text-[11px]"
                  />
                ) : typeof props[propKey] === 'string' ? (
                  ['code', 'text', 'quote', 'description', 'options', 'slots', 'items'].includes(propKey) ? (
                    <textarea 
                      rows={3}
                      value={props[propKey] || ''}
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs font-mono"
                    />
                  ) : ['src', 'imageUrl', 'image', 'logo', 'favicon'].some(k => propKey.toLowerCase().includes(k.toLowerCase())) ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={props[propKey] || ''}
                          onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs"
                        />
                        <button 
                          onClick={() => setShowImageLibrary({ 
                            isOpen: true, 
                            onSelect: (url) => onUpdateElementProps({ ...props, [propKey]: url }) 
                          })}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-indigo-400 shrink-0"
                          title="Browse SVG Library"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                        <label className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-emerald-400 shrink-0 cursor-pointer" title="Upload from Desktop">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    onUpdateElementProps({ ...props, [propKey]: event.target.result.toString() });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                          <Upload className="w-4 h-4" />
                        </label>
                      </div>
                      {typeof props[propKey] === 'string' && props[propKey].startsWith('data:image/svg+xml') && (
                        <div className="flex gap-2 items-center bg-slate-900/50 p-2 rounded border border-slate-800">
                          <label className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">SVG Color:</label>
                          <input 
                            type="color"
                            value={props[propKey].match(/%23([a-fA-F0-9]{6})/)?.[0]?.replace('%23', '#') || '#3b82f6'}
                            onChange={(e) => {
                              const newColor = e.target.value.replace('#', '%23');
                              const newUri = props[propKey].replace(/%23[a-fA-F0-9]{6}/g, newColor);
                              onUpdateElementProps({ ...props, [propKey]: newUri });
                            }}
                            className="w-5 h-5 rounded bg-transparent cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <input 
                      type="text"
                      value={props[propKey] || ''}
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs"
                    />
                  )
                ) : typeof props[propKey] === 'number' ? (
                  <input 
                    type="number"
                    value={props[propKey] ?? 0}
                    onChange={(e) => onUpdateElementProps({ ...props, [propKey]: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs"
                  />
                ) : (
                  <textarea 
                    rows={2}
                    value={typeof props[propKey] === 'object' ? JSON.stringify(props[propKey]) : (props[propKey] || '')}
                    onChange={(e) => {
                      let val: any = e.target.value;
                      if (typeof props[propKey] === 'object') {
                        try { val = JSON.parse(val); } catch(err) {}
                      }
                      onUpdateElementProps({ ...props, [propKey]: val });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 font-mono text-[11px]"
                  />
                )}
              </div>
            ))}
          </div>

            {/* CONTENT ALIGNMENT (For elements without full typography) */}
            {['image', 'logo_image', 'video', 'icon', 'button', 'social_share'].includes(selectedElement.type) && (
              <div className="space-y-3 pt-3 pb-3 border-t border-b border-slate-800">
                <div>
                  <label className="block text-slate-400 mb-1">Content Alignment</label>
                  <select 
                    value={style.typography.textAlign || 'center'}
                    onChange={(e) => handleTypoChange('textAlign', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            )}

            {/* TYPOGRAPHY */}
            {!['image', 'logo_image', 'video', 'spacer', 'divider', 'html_code', 'audio', 'icon'].includes(selectedElement.type) && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs pb-1 border-b border-slate-800">
                <Type className="w-3.5 h-3.5 text-orange-400" />
                <span>Typography</span>
              </div>
              
              <div>
                <label className="block text-slate-400 mb-1">Font Family</label>
                <select 
                  value={style.typography.fontFamily}
                  onChange={(e) => handleTypoChange('fontFamily', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                >
                    <option value="Outfit">Outfit (Modern Heading)</option>
                    <option value="Inter">Inter (Clean Body)</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Lato">Lato</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Oswald">Oswald</option>
                    <option value="Source Sans Pro">Source Sans Pro</option>
                    <option value="Slabo 27px">Slabo 27px</option>
                    <option value="Raleway">Raleway</option>
                    <option value="PT Sans">PT Sans</option>
                    <option value="Merriweather">Merriweather</option>
                    <option value="Noto Sans">Noto Sans</option>
                    <option value="Nunito">Nunito</option>
                    <option value="Concert One">Concert One</option>
                    <option value="Prompt">Prompt</option>
                    <option value="Work Sans">Work Sans</option>
                    <option value="Fira Sans">Fira Sans</option>
                    <option value="Rubik">Rubik</option>
                    <option value="Mukta">Mukta</option>
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Lora">Lora</option>
                    <option value="PT Serif">PT Serif</option>
                    <option value="Inconsolata">Inconsolata</option>
                    <option value="Quicksand">Quicksand</option>
                    <option value="Dosis">Dosis</option>
                    <option value="Oxygen">Oxygen</option>
                    <option value="Cabin">Cabin</option>
                    <option value="Anton">Anton</option>
                    <option value="Dancing Script">Dancing Script</option>
                    <option value="Varela Round">Varela Round</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                    <option value="Playfair Display">Playfair Display (Serif)</option>
                    <option value="Fira Code">Fira Code (Mono)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <label className="block text-slate-400 mb-2 flex justify-between">
                    <span>Desktop Font Size</span>
                    <span className="text-slate-500 font-mono text-xs">{style.typography.fontSize}</span>
                  </label>
                  <div className="flex gap-3 items-center">
                    <input 
                      type="range" 
                      min="10" 
                      max="96" 
                      value={parseInt(style.typography.fontSize, 10) || 16}
                      onChange={(e) => handleTypoChange('fontSize', `${e.target.value}px`)}
                      className="flex-1 accent-orange-500 cursor-pointer" 
                    />
                    <input 
                      type="text" 
                      value={style.typography.fontSize}
                      onChange={(e) => handleTypoChange('fontSize', e.target.value)}
                      className="w-16 bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-center font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-slate-400 mb-2 flex justify-between">
                    <span>Mobile Font Size Override</span>
                    <span className="text-slate-500 font-mono text-xs">{style.typography.mobileFontSize || style.typography.fontSize}</span>
                  </label>
                  <div className="flex gap-3 items-center">
                    <input 
                      type="range" 
                      min="10" 
                      max="72" 
                      value={parseInt(style.typography.mobileFontSize || style.typography.fontSize, 10) || 16}
                      onChange={(e) => handleTypoChange('mobileFontSize', `${e.target.value}px`)}
                      className="flex-1 accent-orange-500 cursor-pointer" 
                    />
                    <input 
                      type="text" 
                      value={style.typography.mobileFontSize || ''}
                      placeholder={style.typography.fontSize}
                      onChange={(e) => handleTypoChange('mobileFontSize', e.target.value)}
                      className="w-16 bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-center font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Font Weight</label>
                  <select 
                    value={style.typography.fontWeight}
                    onChange={(e) => handleTypoChange('fontWeight', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Regular (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">SemiBold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">ExtraBold (800)</option>
                    <option value="900">Black (900)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Font Style</label>
                  <select 
                    value={style.typography.fontStyle || 'normal'}
                    onChange={(e) => handleTypoChange('fontStyle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="oblique">Oblique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Text Transform</label>
                  <select 
                    value={style.typography.textTransform || 'none'}
                    onChange={(e) => handleTypoChange('textTransform', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                  >
                    <option value="none">Normal</option>
                    <option value="uppercase">UPPERCASE</option>
                    <option value="lowercase">lowercase</option>
                    <option value="capitalize">Capitalize</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Line Height</label>
                  <input 
                    type="text" 
                    value={style.typography.lineHeight}
                    onChange={(e) => handleTypoChange('lineHeight', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 font-mono text-xs"
                  />
                </div>
              </div>

              <UniversalColorPicker
                label="Text Color (HEX, RGB, RGBA, HSL, Named Color)"
                value={style.typography.color || '#ffffff'}
                onChange={(newColor) => handleTypoChange('color', newColor)}
              />
            </div>
            )}

            {/* MARGIN & PADDING */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs pb-1 border-b border-slate-800">
                <Box className="w-3.5 h-3.5 text-orange-400" />
                <span>Box Model (Spacing)</span>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] text-slate-400 font-medium">Margin (Top / Bottom)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Top (0px)" value={style.boxModel.marginTop} onChange={(e) => handleBoxChange('marginTop', e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-2 py-1" />
                  <input type="text" placeholder="Bottom (16px)" value={style.boxModel.marginBottom} onChange={(e) => handleBoxChange('marginBottom', e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-2 py-1" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] text-slate-400 font-medium">Padding (Top / Right / Bottom / Left)</label>
                <div className="grid grid-cols-4 gap-1 text-[10px]">
                  <input type="text" placeholder="T" value={style.boxModel.paddingTop} onChange={(e) => handleBoxChange('paddingTop', e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-1" />
                  <input type="text" placeholder="R" value={style.boxModel.paddingRight} onChange={(e) => handleBoxChange('paddingRight', e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-1" />
                  <input type="text" placeholder="B" value={style.boxModel.paddingBottom} onChange={(e) => handleBoxChange('paddingBottom', e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-1" />
                  <input type="text" placeholder="L" value={style.boxModel.paddingLeft} onChange={(e) => handleBoxChange('paddingLeft', e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-1" />
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: ADVANCED STYLES & VISIBILITY */}
        {activeTab === 'advanced' && (
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs pb-1 border-b border-slate-800">
                <Layout className="w-3.5 h-3.5 text-orange-400" />
                <span>Borders & Radius</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Border Style</label>
                  <select value={style.borders.borderStyle} onChange={(e) => handleBorderChange('borderStyle', e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <option value="none">None</option>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Thickness (Width)</label>
                  <input 
                    type="text" 
                    placeholder="1px"
                    value={style.borders.borderWidth} 
                    onChange={(e) => handleBorderChange('borderWidth', e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-mono" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
              <div>
                <UniversalColorPicker
                  label="Border Color"
                  value={style.borders.borderColor || '#334155'}
                  onChange={(newColor) => handleBorderChange('borderColor', newColor)}
                  showFormatButtons={false}
                />
              </div>
                <div>
                  <label className="block text-slate-400 mb-1">Corner Radius</label>
                  <input type="text" placeholder="12px" value={style.borders.borderRadiusTopLeft} onChange={(e) => {
                    handleBorderChange('borderRadiusTopLeft', e.target.value);
                    handleBorderChange('borderRadiusTopRight', e.target.value);
                    handleBorderChange('borderRadiusBottomRight', e.target.value);
                    handleBorderChange('borderRadiusBottomLeft', e.target.value);
                  }} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-mono" />
                </div>
              </div>
            </div>

            {/* ANIMATION & ENTRANCE EFFECTS */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs pb-1 border-b border-slate-800">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                <span>Scroll Animations</span>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Entrance Effect</label>
                <select value={style.layoutAnim.entranceAnimation} onChange={(e) => handleAnimChange('entranceAnimation', e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                  <option value="none">None</option>
                  <option value="fade-in">Fade In</option>
                  <option value="slide-up">Slide Up</option>
                  <option value="zoom-in">Zoom In</option>
                  <option value="flip">Flip 3D</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADVANCED SCOPED CODE */}
        {activeTab === 'advanced' && (
          <div className="space-y-5">
            {/* CUSTOM CSS CLASS */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs pb-1 border-b border-slate-800">
                <Code className="w-3.5 h-3.5 text-orange-400" />
                <span>Custom CSS</span>
              </div>
              
              <div>
                <label className="block text-slate-400 mb-1">CSS Class Overrides</label>
                <input 
                  type="text" 
                  placeholder="e.g. animate-bounce custom-shadow"
                  value={style.customCode?.customClasses || ''}
                  onChange={(e) => onUpdateElementStyle({ 
                    ...style, 
                    customCode: { ...style.customCode, customClasses: e.target.value } 
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 font-mono text-xs"
                />
                <p className="text-[10px] text-slate-500 mt-1">Add Tailwind classes to override element styles.</p>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Scoped CSS Block</label>
                <textarea 
                  placeholder={`& {\n  transform: scale(1.05);\n  transition: all 0.3s ease;\n}\n&:hover {\n  opacity: 0.8;\n}`}
                  value={style.customCode?.scopedCss || ''}
                  onChange={(e) => onUpdateElementStyle({ 
                    ...style, 
                    customCode: { ...style.customCode, scopedCss: e.target.value } 
                  })}
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 font-mono text-xs whitespace-pre"
                />
                <p className="text-[10px] text-slate-500 mt-1">Use <code>&</code> to target this element specifically.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showImageLibrary.isOpen && (
        <ImageLibraryModal 
          onClose={() => setShowImageLibrary({ isOpen: false, onSelect: null })}
          onSelect={(url) => {
            if (showImageLibrary.onSelect) {
              showImageLibrary.onSelect(url);
            }
          }}
        />
      )}
    </div>
  );
};
