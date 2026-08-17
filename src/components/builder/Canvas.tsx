import React, { useState, useEffect } from 'react';
import { CanvasState, SectionNode, RowNode, ColumnNode, ElementNode, ElementType, StyleBackground } from '../../types/builder';
import { ElementRenderer } from './ElementRenderer';
import { 
  Plus, Trash2, Copy, Move, Settings, Columns, Layers, ChevronUp, ChevronDown, 
  ArrowUp, ArrowDown
} from 'lucide-react';
import { createDefaultStyle } from '../../data/initialTemplates';

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

interface CanvasProps {
  canvasState: CanvasState;
  selectedNodeId: string | null;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onSelectNode: (id: string, type: 'section' | 'row' | 'column' | 'element') => void;
  onUpdateCanvasState: (newState: CanvasState) => void;
  onOpenElementCatalog: (targetColumnId: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  canvasState,
  selectedNodeId,
  viewportMode,
  onSelectNode,
  onUpdateCanvasState,
  onOpenElementCatalog,
}) => {
  const [colDrag, setColDrag] = useState<{ secId: string; rowId: string; colIdx: number; startX: number; startWidth1: number; startWidth2: number } | null>(null);
  const [secDrag, setSecDrag] = useState<{ secId: string; type: 'top' | 'bottom'; startY: number; startPadding: number } | null>(null);
  const [elDrag, setElDrag] = useState<{ secId: string; rowId: string; colIdx: number; elIdx: number; startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);

  useEffect(() => {
    if (!colDrag && !secDrag && !elDrag) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (colDrag) {
        const deltaX = e.clientX - colDrag.startX;
        const fractionDelta = deltaX / 1000;
        
        const newWidth1 = Math.max(0.05, Math.min(0.95, colDrag.startWidth1 + fractionDelta));
        const newWidth2 = colDrag.startWidth1 + colDrag.startWidth2 - newWidth1;

        if (newWidth1 >= 0.05 && newWidth2 >= 0.05) {
          const updatedSections = canvasState.sections.map((sec) => {
            if (sec.id !== colDrag.secId) return sec;
            const updatedRows = sec.rows.map((row) => {
              if (row.id !== colDrag.rowId) return row;
              const updatedCols = [...row.columns];
              updatedCols[colDrag.colIdx] = { ...updatedCols[colDrag.colIdx], widthFraction: newWidth1 };
              updatedCols[colDrag.colIdx + 1] = { ...updatedCols[colDrag.colIdx + 1], widthFraction: newWidth2 };
              return { ...row, columns: updatedCols };
            });
            return { ...sec, rows: updatedRows };
          });
          onUpdateCanvasState({ ...canvasState, sections: updatedSections });
        }
      } else if (secDrag) {
        const deltaY = e.clientY - secDrag.startY;
        // if dragging top padding down, deltaY is positive, padding increases
        // if dragging bottom padding down, deltaY is positive, padding increases
        let newPadding = secDrag.startPadding;
        if (secDrag.type === 'top') {
          newPadding = Math.max(0, secDrag.startPadding + deltaY);
        } else {
          newPadding = Math.max(0, secDrag.startPadding + deltaY);
        }
        
        const updatedSections = canvasState.sections.map((sec) => {
          if (sec.id !== secDrag.secId) return sec;
          if (secDrag.type === 'top') {
            return { ...sec, paddingTop: `${newPadding}px` };
          } else {
            return { ...sec, paddingBottom: `${newPadding}px` };
          }
        });
        onUpdateCanvasState({ ...canvasState, sections: updatedSections });
      } else if (elDrag) {
        const deltaX = e.clientX - elDrag.startX;
        const deltaY = e.clientY - elDrag.startY;
        
        const newWidth = Math.max(20, elDrag.startWidth + deltaX);
        const newHeight = Math.max(20, elDrag.startHeight + deltaY);
        
        const updatedSections = canvasState.sections.map((sec) => {
          if (sec.id !== elDrag.secId) return sec;
          const updatedRows = sec.rows.map((row) => {
            if (row.id !== elDrag.rowId) return row;
            const updatedCols = [...row.columns];
            const col = { ...updatedCols[elDrag.colIdx] };
            const elements = [...col.elements];
            const el = { ...elements[elDrag.elIdx] };
            el.style = {
              ...el.style,
              boxModel: {
                ...el.style.boxModel,
                width: `${newWidth}px`,
                height: `${newHeight}px`
              }
            };
            elements[elDrag.elIdx] = el;
            col.elements = elements;
            updatedCols[elDrag.colIdx] = col;
            return { ...row, columns: updatedCols };
          });
          return { ...sec, rows: updatedRows };
        });
        onUpdateCanvasState({ ...canvasState, sections: updatedSections });
      }
    };

    const handleMouseUp = () => {
      setColDrag(null);
      setSecDrag(null);
      setElDrag(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [colDrag, secDrag, elDrag, canvasState, onUpdateCanvasState]);

  // Move Section Up/Down
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...canvasState.sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;
    onUpdateCanvasState({ ...canvasState, sections: newSections });
  };

  // Duplicate Section
  const handleDuplicateSection = (secId: string) => {
    const secIndex = canvasState.sections.findIndex((s) => s.id === secId);
    if (secIndex === -1) return;
    const sectionToDup = canvasState.sections[secIndex];

    const clonedSection: SectionNode = {
      ...JSON.parse(JSON.stringify(sectionToDup)),
      id: `sec_${Date.now()}`,
      name: `${sectionToDup.name} (Copy)`
    };

    const newSections = [...canvasState.sections];
    newSections.splice(secIndex + 1, 0, clonedSection);
    onUpdateCanvasState({ ...canvasState, sections: newSections });
  };

  // Delete Section
  const handleDeleteSection = (secId: string) => {
    const updatedSections = canvasState.sections.filter((s) => s.id !== secId);
    onUpdateCanvasState({ ...canvasState, sections: updatedSections });
  };

  // Add Row to Section
  const handleAddRow = (sectionId: string, colCount: number) => {
    const newColumns: ColumnNode[] = Array.from({ length: colCount }).map((_, idx) => ({
      id: `col_${Date.now()}_${idx}`,
      widthFraction: 1 / colCount,
      verticalAlign: 'top',
      padding: '16px',
      margin: '0px',
      elements: []
    }));

    const newRow: RowNode = {
      id: `row_${Date.now()}`,
      columnCount: colCount,
      gap: '24px',
      alignItems: 'stretch',
      columns: newColumns
    };

    const updatedSections = canvasState.sections.map((sec) => {
      if (sec.id === sectionId) {
        return { ...sec, rows: [...sec.rows, newRow] };
      }
      return sec;
    });

    onUpdateCanvasState({ ...canvasState, sections: updatedSections });
  };

  // Change Column Count in Row
  const handleSetRowColumnCount = (secId: string, rowId: string, newCount: number) => {
    const updatedSections = canvasState.sections.map((sec) => {
      if (sec.id !== secId) return sec;
      const updatedRows = sec.rows.map((row) => {
        if (row.id !== rowId) return row;
        const currentCols = row.columns;
        let newCols: ColumnNode[] = [];
        if (newCount > currentCols.length) {
          newCols = [...currentCols];
          for (let i = currentCols.length; i < newCount; i++) {
            newCols.push({
              id: `col_${Date.now()}_${i}`,
              widthFraction: 1 / newCount,
              verticalAlign: 'top',
              padding: '16px',
              margin: '0px',
              elements: []
            });
          }
        } else {
          newCols = currentCols.slice(0, newCount);
        }
        // Normalize width fractions
        newCols = newCols.map((c) => ({ ...c, widthFraction: 1 / newCount }));
        return { ...row, columnCount: newCount, columns: newCols };
      });
      return { ...sec, rows: updatedRows };
    });
    onUpdateCanvasState({ ...canvasState, sections: updatedSections });
  };

  // Move Element Up/Down in Column
  const handleMoveElement = (secId: string, rowId: string, colId: string, elIndex: number, direction: 'up' | 'down') => {
    const updatedSections = canvasState.sections.map((sec) => {
      if (sec.id !== secId) return sec;
      const updatedRows = sec.rows.map((row) => {
        if (row.id !== rowId) return row;
        const updatedCols = row.columns.map((col) => {
          if (col.id !== colId) return col;
          const newElements = [...col.elements];
          const targetIdx = direction === 'up' ? elIndex - 1 : elIndex + 1;
          if (targetIdx < 0 || targetIdx >= newElements.length) return col;
          const temp = newElements[elIndex];
          newElements[elIndex] = newElements[targetIdx];
          newElements[targetIdx] = temp;
          return { ...col, elements: newElements };
        });
        return { ...row, columns: updatedCols };
      });
      return { ...sec, rows: updatedRows };
    });
    onUpdateCanvasState({ ...canvasState, sections: updatedSections });
  };

  // Duplicate Element
  const handleDuplicateElement = (secId: string, rowId: string, colId: string, elId: string) => {
    const updatedSections = canvasState.sections.map((sec) => {
      if (sec.id !== secId) return sec;
      const updatedRows = sec.rows.map((row) => {
        if (row.id !== rowId) return row;
        const updatedCols = row.columns.map((col) => {
          if (col.id !== colId) return col;
          const elIdx = col.elements.findIndex((e) => e.id === elId);
          if (elIdx === -1) return col;
          const elToDup = col.elements[elIdx];
          const clonedEl: ElementNode = {
            ...JSON.parse(JSON.stringify(elToDup)),
            id: `el_${Date.now()}`,
            name: `${elToDup.name} (Copy)`
          };
          const newEls = [...col.elements];
          newEls.splice(elIdx + 1, 0, clonedEl);
          return { ...col, elements: newEls };
        });
        return { ...row, columns: updatedCols };
      });
      return { ...sec, rows: updatedRows };
    });
    onUpdateCanvasState({ ...canvasState, sections: updatedSections });
  };

  // Delete Element
  const handleDeleteElement = (secId: string, rowId: string, colId: string, elId: string) => {
    const updatedSections = canvasState.sections.map((sec) => {
      if (sec.id !== secId) return sec;
      const updatedRows = sec.rows.map((row) => {
        if (row.id !== rowId) return row;
        const updatedCols = row.columns.map((col) => {
          if (col.id !== colId) return col;
          return { ...col, elements: col.elements.filter((el) => el.id !== elId) };
        });
        return { ...row, columns: updatedCols };
      });
      return { ...sec, rows: updatedRows };
    });
    onUpdateCanvasState({ ...canvasState, sections: updatedSections });
  };

  // Viewport Container Widths
  const getViewportWidthClass = () => {
    if (viewportMode === 'mobile') return 'max-w-[390px] shadow-2xl rounded-[32px] border-[8px] border-green-200 my-8';
    if (viewportMode === 'tablet') return 'max-w-[768px] shadow-2xl rounded-2xl border-[4px] border-green-200 my-6';
    return 'w-full';
  };

  const isDesktop = viewportMode === 'desktop';

  // Construct Global Background & CSS Variables Style
  const globalBgStyle: React.CSSProperties = {
    backgroundColor: isDesktop ? (canvasState.globalTokens.backgroundColor || '#ffffff') : '#f0fdf4',
    '--primary-color': canvasState.globalTokens?.primaryColor || '#6366f1',
    '--secondary-color': canvasState.globalTokens?.secondaryColor || '#ec4899',
    '--accent-color': canvasState.globalTokens?.accentColor || '#10b981',
    '--heading-font': canvasState.globalTokens?.headingFont || 'Outfit',
    '--body-font': canvasState.globalTokens?.bodyFont || 'Inter',
    '--bg-color': canvasState.globalTokens?.backgroundColor || '#ffffff',
    '--text-color': canvasState.globalTokens?.textColor || '#0f172a',
    '--radius-preset': canvasState.globalTokens?.borderRadiusPreset || '12px'
  } as any;

  if (isDesktop && canvasState.globalTokens.backgroundImage) {
    const overlay = canvasState.globalTokens.backgroundOverlayColor
      ? `linear-gradient(${canvasState.globalTokens.backgroundOverlayColor}, ${canvasState.globalTokens.backgroundOverlayColor}), ` 
      : '';
    
    globalBgStyle.backgroundImage = `${overlay}url(${canvasState.globalTokens.backgroundImage})`;
    globalBgStyle.backgroundSize = canvasState.globalTokens.backgroundSize || 'cover';
    globalBgStyle.backgroundPosition = canvasState.globalTokens.backgroundPosition || 'center center';
    globalBgStyle.backgroundRepeat = 'no-repeat';
  }

  return (
    <div
      className={`flex-1 min-w-0 overflow-y-auto builder-mode-active ${isDesktop ? 'block' : 'flex justify-center p-6'}`}
      style={globalBgStyle}
    >
      <div className={`transition-all duration-300 ${isDesktop && !canvasState.globalTokens.backgroundImage ? 'bg-white' : 'bg-transparent'} text-gray-900 ${getViewportWidthClass()}`} style={isDesktop ? { minHeight: '100%' } : {}}>
        {canvasState.sections.length === 0 ? (
          <div className="p-16 text-center border-2 border-dashed border-green-200 rounded-2xl m-8 bg-white">
            <Layers className="w-12 h-12 text-green-300 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-gray-700 mb-1">Canvas is Empty</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">Start building your high-converting page by adding your first Section.</p>
            <button 
              onClick={() => {
                const newSec: SectionNode = {
                  id: `sec_${Date.now()}`,
                  name: 'Hero Section',
                  isFullWidth: false,
                  displayMode: 'flex',
                  paddingTop: '48px',
                  paddingBottom: '48px',
                  background: createDefaultStyle().background,
                  rows: []
                };
                onUpdateCanvasState({ ...canvasState, sections: [newSec] });
              }}
              className="px-4 py-2.5 text-white rounded-lg text-xs font-bold flex items-center gap-2 mx-auto shadow-lg"
              style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}
            >
              <Plus className="w-4 h-4" />
              <span>Add First Section</span>
            </button>
          </div>
        ) : (
          canvasState.sections.map((section, secIdx) => {
            const isSecSelected = selectedNodeId === section.id;
            return (
              <div 
                key={section.id} 
                className={`section-node relative group transition-all ${isSecSelected ? 'is-selected' : ''}`}
                style={{
                  paddingTop: section.paddingTop,
                  paddingBottom: section.paddingBottom,
                  ...getBackgroundStyles(section.background)
                }}
              >
                {/* SECTION toolbar badge — FunnelLegends Green */}
                <div className="absolute top-0 left-4 -translate-y-1/2 z-20 hidden group-hover:flex items-center gap-1.5 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow-lg" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>
                  <span className="uppercase tracking-wider">SECTION</span>
                  <div className="h-3 w-px bg-green-300"></div>
                  <button onClick={() => handleMoveSection(secIdx, 'up')} disabled={secIdx === 0} title="Move Section Up" className="hover:text-emerald-200 disabled:opacity-30">
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleMoveSection(secIdx, 'down')} disabled={secIdx === canvasState.sections.length - 1} title="Move Section Down" className="hover:text-emerald-200 disabled:opacity-30">
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button onClick={() => onSelectNode(section.id, 'section')} title="Section Settings" className="hover:text-emerald-200">
                    <Settings className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDuplicateSection(section.id)} title="Duplicate Section" className="hover:text-emerald-200">
                    <Copy className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDeleteSection(section.id)} title="Delete Section" className="hover:text-rose-300">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Section Content Area */}
                <div
                  className="absolute top-0 left-0 right-0 h-4 cursor-row-resize z-10 group-hover:bg-green-100/60 flex items-center justify-center transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSecDrag({
                      secId: section.id,
                      type: 'top',
                      startY: e.clientY,
                      startPadding: parseInt(section.paddingTop || '0')
                    });
                  }}
                >
                  <div className="h-1 w-12 rounded-full opacity-0 group-hover:opacity-100" style={{ backgroundColor: '#22c55e' }} />
                </div>
                
                <div
                  className="absolute bottom-0 left-0 right-0 h-4 cursor-row-resize z-10 group-hover:bg-green-100/60 flex items-center justify-center transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSecDrag({
                      secId: section.id,
                      type: 'bottom',
                      startY: e.clientY,
                      startPadding: parseInt(section.paddingBottom || '0')
                    });
                  }}
                >
                  <div className="h-1 w-12 rounded-full opacity-0 group-hover:opacity-100" style={{ backgroundColor: '#22c55e' }} />
                </div>

                <div className={`${section.isFullWidth ? 'w-full px-4' : 'w-full max-w-5xl mx-auto px-6'}`}>
                  {section.rows.map((row) => {
                    const isRowSelected = selectedNodeId === row.id;
                    return (
                      <div 
                        key={row.id} 
                        className={`row-node relative my-4 p-3 rounded-lg group/row ${isRowSelected ? 'is-selected' : ''}`}
                        style={{ 
                          gap: row.gap,
                          ...getBackgroundStyles(row.background)
                        }}
                      >
                        {/* ROW toolbar badge — FunnelLegends Teal */}
                        <div className="absolute top-0 left-4 -translate-y-1/2 z-20 hidden group-hover/row:flex items-center gap-1.5 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow-md" style={{ background: 'linear-gradient(135deg,#0d9488,#0d7270)' }}>
                          <span className="uppercase tracking-wider">ROW</span>
                          <div className="h-3 w-px bg-teal-300"></div>
                          {/* Column count switcher 1-6 */}
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px]" style={{ backgroundColor: '#0a5c5a' }}>
                            <Columns className="w-3 h-3" />
                            <span>Cols:</span>
                            {[1, 2, 3, 4, 6].map((num) => (
                              <button 
                                key={num}
                                onClick={() => handleSetRowColumnCount(section.id, row.id, num)}
                                className={`px-1 rounded font-bold ${row.columnCount === num ? 'bg-white text-teal-700' : 'hover:bg-teal-600'}`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Flex Grid Columns */}
                        <div 
                          className="flex flex-col md:flex-row gap-4"
                          style={{ alignItems: row.alignItems }}
                        >
                          {row.columns.map((column, colIdx) => {
                            const isColSelected = selectedNodeId === column.id;
                            const widthPercent = Math.round(column.widthFraction * 100);
                            return (
                              <div 
                                key={column.id} 
                                className={`column-node relative min-h-[100px] p-3 rounded-lg flex flex-col justify-${column.verticalAlign} group/col ${isColSelected ? 'is-selected' : ''}`}
                                style={{ 
                                  flex: `${column.widthFraction} 1 0%`,
                                  ...getBackgroundStyles(column.background)
                                }}
                              >
                                {colIdx < row.columns.length - 1 && (
                                  <div
                                    className="absolute right-[-10px] top-0 bottom-0 w-5 cursor-col-resize z-30 group-hover/col:bg-green-100/60 flex items-center justify-center transition-colors"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      setColDrag({
                                        secId: section.id,
                                        rowId: row.id,
                                        colIdx: colIdx,
                                        startX: e.clientX,
                                        startWidth1: column.widthFraction,
                                        startWidth2: row.columns[colIdx + 1].widthFraction
                                      });
                                    }}
                                  >
                                    <div className="w-1 h-8 rounded-full opacity-0 group-hover/col:opacity-100" style={{ backgroundColor: '#22c55e' }} />
                                  </div>
                                )}
                                {/* COLUMN badge — FunnelLegends Green */}
                                <div className="absolute top-0 left-3 -translate-y-1/2 z-20 hidden group-hover/col:flex items-center gap-1 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm" style={{ backgroundColor: '#16a34a' }}>
                                  <span>COL ({widthPercent}%)</span>
                                  <button onClick={() => onSelectNode(column.id, 'column')} className="ml-1 hover:text-green-200" title="Column Settings">
                                    <Settings className="w-3 h-3" />
                                  </button>
                                </div>

                                {/* Render Elements inside Column */}
                                {column.elements.length === 0 ? (
                                  <div className="flex-1 flex flex-col items-center justify-center p-4 border border-dashed border-green-200 rounded-lg bg-green-50/40 text-center">
                                    <p className="text-[11px] text-gray-400 mb-2">Drop elements here</p>
                                    <button 
                                      onClick={() => onOpenElementCatalog(column.id)}
                                      className="px-3 py-1.5 text-white rounded text-[11px] font-bold flex items-center gap-1"
                                      style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
                                    >
                                      <Plus className="w-3 h-3" />
                                      <span>Add Element</span>
                                    </button>
                                  </div>
                                ) : (
                                  column.elements.map((element, elIdx) => {
                                    const isElSelected = selectedNodeId === element.id;
                                    return (
                                      <div key={element.id} className="relative group/el">
                                        {/* ELEMENT toolbar badge — FunnelLegends Teal/Dark */}
                                        <div className="absolute -top-2 right-2 z-30 hidden group-hover/el:flex items-center gap-1 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow" style={{ background: 'linear-gradient(135deg,#0d9488,#0d7270)' }}>
                                          <span>{element.type}</span>
                                          <button onClick={() => handleMoveElement(section.id, row.id, column.id, elIdx, 'up')} disabled={elIdx === 0} className="hover:text-green-200 disabled:opacity-30">
                                            <ArrowUp className="w-3 h-3" />
                                          </button>
                                          <button onClick={() => handleMoveElement(section.id, row.id, column.id, elIdx, 'down')} disabled={elIdx === column.elements.length - 1} className="hover:text-green-200 disabled:opacity-30">
                                            <ArrowDown className="w-3 h-3" />
                                          </button>
                                          <button onClick={() => handleDuplicateElement(section.id, row.id, column.id, element.id)} className="hover:text-green-200">
                                            <Copy className="w-3 h-3" />
                                          </button>
                                          <button onClick={() => handleDeleteElement(section.id, row.id, column.id, element.id)} className="hover:text-red-300">
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>

                                        {/* RESIZE HANDLE - Bottom Right */}
                                        {isElSelected && (
                                          <div 
                                            className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border border-indigo-500 rounded-full cursor-se-resize z-40 shadow flex items-center justify-center opacity-0 group-hover/el:opacity-100 transition-opacity"
                                            onMouseDown={(e) => {
                                              e.stopPropagation();
                                              e.preventDefault();
                                              const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                                              setElDrag({
                                                secId: section.id,
                                                rowId: row.id,
                                                colIdx,
                                                elIdx,
                                                startX: e.clientX,
                                                startY: e.clientY,
                                                startWidth: rect.width,
                                                startHeight: rect.height
                                              });
                                            }}
                                          >
                                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full pointer-events-none" />
                                          </div>
                                        )}

                                        <ElementRenderer 
                                          element={element}
                                          isSelected={isElSelected}
                                          onSelect={() => onSelectNode(element.id, 'element')}
                                          onTextChange={(newText) => {
                                            let propKey = 'text';
                                            if (element.type === 'clickpop_button') propKey = 'buttonText';
                                            else if (element.type === 'callout_box' || element.type === 'audio_player' || element.type === 'video_popup') propKey = 'title';
                                            else if (element.type === 'quote_block') propKey = 'quote';
                                            
                                            const updatedSections = canvasState.sections.map((s) => {
                                              if (s.id !== section.id) return s;
                                              const updatedRows = s.rows.map((r) => {
                                                if (r.id !== row.id) return r;
                                                const updatedCols = r.columns.map((c) => {
                                                  if (c.id !== column.id) return c;
                                                  return {
                                                    ...c,
                                                    elements: c.elements.map((el) => {
                                                      if (el.id === element.id) {
                                                        return { ...el, props: { ...el.props, [propKey]: newText } };
                                                      }
                                                      return el;
                                                    })
                                                  };
                                                });
                                                return { ...r, columns: updatedCols };
                                              });
                                              return { ...s, rows: updatedRows };
                                            });
                                            onUpdateCanvasState({ ...canvasState, sections: updatedSections });
                                          }}
                                          viewportMode={viewportMode}
                                        />
                                      </div>
                                    );
                                  })
                                )}

                                {/* Add Element Button bottom of column */}
                                {column.elements.length > 0 && (
                                  <button 
                                    onClick={() => onOpenElementCatalog(column.id)}
                                    className="mt-2 w-full py-1.5 text-white rounded border border-dashed text-[11px] font-semibold flex items-center justify-center gap-1 transition-all opacity-0 group-hover/col:opacity-100"
                                    style={{ borderColor: '#22c55e', background: 'rgba(34,197,94,0.08)', color: '#16a34a' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='linear-gradient(135deg,#22c55e,#0d9488)'; (e.currentTarget as HTMLButtonElement).style.color='#fff'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(34,197,94,0.08)'; (e.currentTarget as HTMLButtonElement).style.color='#16a34a'; }}
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add Element</span>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Add Row Button — FunnelLegends Teal */}
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => handleAddRow(section.id, 2)}
                      className="px-4 py-2 rounded-lg text-xs font-bold border border-dashed inline-flex items-center gap-1.5 transition-all text-white"
                      style={{ borderColor: '#0d9488', background: 'linear-gradient(135deg,#0d9488,#0d7270)', boxShadow: '0 2px 8px rgba(13,148,136,0.2)' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Row (+2 Columns)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Global Add Section Floating Bar — FunnelLegends */}
        {canvasState.sections.length > 0 && (
          <div className="my-8 text-center">
            <button 
              onClick={() => {
                const newSec: SectionNode = {
                  id: `sec_${Date.now()}`,
                  name: 'New Section Block',
                  isFullWidth: false,
                  displayMode: 'flex',
                  paddingTop: '48px',
                  paddingBottom: '48px',
                  background: createDefaultStyle().background,
                  rows: [
                    {
                      id: `row_${Date.now()}`,
                      columnCount: 2,
                      gap: '24px',
                      alignItems: 'stretch',
                      columns: [
                        { id: `col_${Date.now()}_0`, widthFraction: 0.5, verticalAlign: 'top', padding: '16px', margin: '0px', elements: [] },
                        { id: `col_${Date.now()}_1`, widthFraction: 0.5, verticalAlign: 'top', padding: '16px', margin: '0px', elements: [] }
                      ]
                    }
                  ]
                };
                onUpdateCanvasState({ ...canvasState, sections: [...canvasState.sections, newSec] });
              }}
              className="px-6 py-3 text-white font-extrabold rounded-xl text-xs inline-flex items-center gap-2 transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}
            >
              <Plus className="w-4 h-4" />
              <span>ADD NEW SECTION</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
