import React, { useState, useEffect } from 'react';
import { CanvasState, ElementNode, FunnelData, FunnelStepData, SectionNode, RowNode, ColumnNode, GlobalDesignTokens, ClickPopSettings } from '../../types/builder';
import { Canvas } from './Canvas';
import { InspectorPanel } from './InspectorPanel';
import { SidebarCatalog } from './SidebarCatalog';
import { ClickPopConfigModal } from './ClickPopConfigModal';
import { ClickPopOverlay } from './ClickPopOverlay';
import { 
  Monitor, Tablet, Smartphone, Save, Play, Sparkles, Code, Split, ArrowLeft, 
  Check, Layers, Settings, Eye, HelpCircle, FolderKanban, Plus, Download, Upload, Palette,
  MousePointerClick, X, RefreshCw, Sliders, Globe, ShieldCheck, Trash2, Zap, Activity,
  Undo2, Redo2, ChevronDown
} from 'lucide-react';
import { 
  createDemoSalesCanvas, createSqueezeCanvas, createReverseSqueezeCanvas, 
  createLeadMagnetCanvas, createTwoStepOrderCanvas, createVSLOrderCanvas, 
  createOTOCanvas, createDownsellCanvas, createThankYouCanvas, 
  createMembersAreaCanvas, createMemberAccessCanvas 
} from '../../data/initialTemplates';
import { StepType } from '../../types/builder';
import { UniversalColorPicker } from './UniversalColorPicker';

export interface CustomBrandingTheme {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadiusPreset: string;
  createdAt: string;
}

const initialCustomThemes: CustomBrandingTheme[] = [
  {
    id: 'theme_my_brand_1',
    name: 'GrowthLabs Official Dark',
    headingFont: 'Montserrat',
    bodyFont: 'Open Sans',
    primaryColor: '#4f46e5',
    secondaryColor: '#ec4899',
    accentColor: '#10b981',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    borderRadiusPreset: '12px',
    createdAt: '2026-08-10'
  },
  {
    id: 'theme_agency_gold',
    name: 'High Ticket VIP Gold',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    primaryColor: '#d97706',
    secondaryColor: '#b45309',
    accentColor: '#f59e0b',
    backgroundColor: '#090d16',
    textColor: '#fef3c7',
    borderRadiusPreset: '8px',
    createdAt: '2026-08-11'
  }
];

const loadStoredCustomThemes = (): CustomBrandingTheme[] => {
  try {
    const raw = localStorage.getItem('launchengine_custom_themes_v1');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading custom themes', e);
  }
  return initialCustomThemes;
};

const saveStoredCustomThemes = (themes: CustomBrandingTheme[]) => {
  try {
    localStorage.setItem('launchengine_custom_themes_v1', JSON.stringify(themes));
  } catch (e) {
    console.error('Error saving custom themes', e);
  }
};

interface BuilderLayoutProps {
  funnel: FunnelData;
  activeStep: FunnelStepData;
  canvasState: CanvasState;
  onUpdateCanvasState: (newState: CanvasState) => void;
  onSelectStep: (stepId: string) => void;
  onAddStep?: (newStep: FunnelStepData) => void;
  onBackToDashboard: () => void;
  onOpenLivePreview: () => void;
  onOpenTemplateLibrary: () => void;
  onOpenAiCopilot: () => void;
  onOpenCodeInspector: () => void;
  onUpdateStepVariantB?: (variantBState: CanvasState) => void;
}

export const BuilderLayout: React.FC<BuilderLayoutProps> = ({
  funnel,
  activeStep,
  canvasState,
  onUpdateCanvasState,
  onSelectStep,
  onAddStep,
  onBackToDashboard,
  onOpenLivePreview,
  onOpenTemplateLibrary,
  onOpenAiCopilot,
  onOpenCodeInspector,
  onUpdateStepVariantB,
}) => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNodeType, setSelectedNodeType] = useState<'section' | 'row' | 'column' | 'element' | null>(null);
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Add Funnel Step Modal State
  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false);
  const [newStepName, setNewStepName] = useState('');
  const [newStepType, setNewStepType] = useState<StepType>('OptIn');
  const [newStepSlug, setNewStepSlug] = useState('');
  const [newStepPreset, setNewStepPreset] = useState<string>('squeeze');

  // A/B Variant State Switcher: 'A' or 'B'
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');

  // Global Design Tokens Modal & Theme Tab State
  const [isGlobalTokensOpen, setIsGlobalTokensOpen] = useState(false);
  const [themeTab, setThemeTab] = useState<'palette' | 'custom_branding' | 'reusable_sections'>('palette');
  const [themeApplySuccessToast, setThemeApplySuccessToast] = useState<string | null>(null);

  // Custom Branding Themes State & Persistence
  const [customThemes, setCustomThemes] = useState<CustomBrandingTheme[]>(loadStoredCustomThemes());
  const [newThemeName, setNewThemeName] = useState('');

  useEffect(() => {
    saveStoredCustomThemes(customThemes);
  }, [customThemes]);

  // Save current active global tokens as a new Custom Branding Theme
  const handleSaveCurrentAsCustomTheme = () => {
    if (!newThemeName.trim()) {
      alert('Please enter a custom branding theme name (e.g. Acme Agency Dark).');
      return;
    }
    const newTheme: CustomBrandingTheme = {
      id: `theme_${Date.now()}`,
      name: newThemeName,
      headingFont: canvasState.globalTokens.headingFont || 'Montserrat',
      bodyFont: canvasState.globalTokens.bodyFont || 'Open Sans',
      primaryColor: canvasState.globalTokens.primaryColor || '#6366f1',
      secondaryColor: canvasState.globalTokens.secondaryColor || '#ec4899',
      accentColor: canvasState.globalTokens.accentColor || '#10b981',
      backgroundColor: canvasState.globalTokens.backgroundColor || '#0f172a',
      textColor: canvasState.globalTokens.textColor || '#f8fafc',
      borderRadiusPreset: canvasState.globalTokens.borderRadiusPreset || '12px',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newTheme, ...customThemes];
    setCustomThemes(updated);
    setNewThemeName('');
    setThemeApplySuccessToast(`🎉 Saved custom theme "${newTheme.name}"!`);
    setTimeout(() => setThemeApplySuccessToast(null), 3500);
  };

  // Delete a Custom Theme
  const handleDeleteCustomTheme = (themeId: string) => {
    const updated = customThemes.filter(t => t.id !== themeId);
    setCustomThemes(updated);
  };

  // JSON File Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');

  // Undo & Redo History
  const [undoStack, setUndoStack] = useState<CanvasState[]>([]);
  const [redoStack, setRedoStack] = useState<CanvasState[]>([]);

  // Top Bar Dropdown UI States
  const [isViewportDropdownOpen, setIsViewportDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isStepDropdownOpen, setIsStepDropdownOpen] = useState(false);

  // Current canvas to display depending on Variant A vs Variant B
  const currentDisplayedCanvas = activeVariant === 'B' 
    ? (activeStep.abSplitVariantBState || canvasState) 
    : canvasState;

  // Reset undo/redo when switching steps
  useEffect(() => {
    setUndoStack([]);
    setRedoStack([]);
    setIsStepDropdownOpen(false);
    setIsViewportDropdownOpen(false);
    setIsToolsDropdownOpen(false);
  }, [activeStep.id]);

  // Undo Handler
  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    const newUndo = undoStack.slice(0, -1);
    setUndoStack(newUndo);
    setRedoStack((prev) => [...prev, currentDisplayedCanvas]);

    if (activeVariant === 'B' && onUpdateStepVariantB) {
      onUpdateStepVariantB(previous);
    } else {
      onUpdateCanvasState(previous);
    }
  };

  // Redo Handler
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    const newRedo = redoStack.slice(0, -1);
    setRedoStack(newRedo);
    setUndoStack((prev) => [...prev, currentDisplayedCanvas]);

    if (activeVariant === 'B' && onUpdateStepVariantB) {
      onUpdateStepVariantB(next);
    } else {
      onUpdateCanvasState(next);
    }
  };

  // Global Keyboard Shortcuts for Undo/Redo (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName?.toLowerCase();
      const isContentEditable = (document.activeElement as HTMLElement)?.isContentEditable;
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || isContentEditable) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack, currentDisplayedCanvas, activeVariant]);

  // Handle Create New Funnel Step
  const handleCreateStepSubmit = () => {
    if (!newStepName.trim()) {
      alert('Please enter a name for the new funnel step.');
      return;
    }

    let initialCanvas: CanvasState;
    switch (newStepPreset) {
      case 'squeeze': initialCanvas = createSqueezeCanvas(); break;
      case 'reverse_squeeze': initialCanvas = createReverseSqueezeCanvas(); break;
      case 'lead_magnet': initialCanvas = createLeadMagnetCanvas(); break;
      case 'two_step_order': initialCanvas = createTwoStepOrderCanvas(); break;
      case 'vsl_order': initialCanvas = createVSLOrderCanvas(); break;
      case 'oto': initialCanvas = createOTOCanvas(); break;
      case 'downsell': initialCanvas = createDownsellCanvas(); break;
      case 'thank_you': initialCanvas = createThankYouCanvas(); break;
      case 'member_access': initialCanvas = createMemberAccessCanvas(); break;
      case 'member_area': initialCanvas = createMembersAreaCanvas(); break;
      default: initialCanvas = createDemoSalesCanvas(); break;
    }

    const generatedSlug = newStepSlug.trim() 
      ? newStepSlug.trim().toLowerCase().replace(/\s+/g, '-') 
      : newStepName.trim().toLowerCase().replace(/\s+/g, '-');

    const newStepObj: FunnelStepData = {
      id: `step_${Date.now()}`,
      name: newStepName.trim(),
      slug: generatedSlug,
      stepOrder: funnel.steps.length + 1,
      stepType: newStepType,
      status: 'Published',
      canvasState: initialCanvas
    };

    if (onAddStep) {
      onAddStep(newStepObj);
    }
    setIsAddStepModalOpen(false);
    setNewStepName('');
    setNewStepSlug('');
  };

  // ClickPop Modal & Overlay State
  const [isClickPopModalOpen, setIsClickPopModalOpen] = useState(false);
  const [isClickPopOverlayOpen, setIsClickPopOverlayOpen] = useState(false);

  const activeClickPopSettings: ClickPopSettings = canvasState.clickPopSettings || {
    enabled: true,
    triggerType: 'button',
    delaySeconds: 5,
    title: "WAIT! Don't Leave Empty Handed...",
    subtitle: "Claim your 80% exclusive discount + free bonus training before leaving this page!",
    buttonText: "YES! CLAIM MY 80% DISCOUNT NOW",
    redirectUrl: "/checkout",
    badgeText: "LIMITED TIME EXCLUSIVE POPUP OFFER",
    backdropBlur: true,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80"
  };

  // Event Listeners for ClickPop button trigger & exit-intent
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

  // Find selected element or section
  let selectedElement: ElementNode | null = null;
  let selectedSection: SectionNode | null = null;
  let selectedRow: RowNode | null = null;
  let selectedColumn: ColumnNode | null = null;

  if (selectedNodeType === 'section') {
    selectedSection = canvasState.sections.find((s) => s.id === selectedNodeId) || null;
  } else if (selectedNodeType === 'row') {
    canvasState.sections.forEach((sec) => {
      sec.rows.forEach((row) => {
        if (row.id === selectedNodeId) selectedRow = row;
      });
    });
  } else if (selectedNodeType === 'column') {
    canvasState.sections.forEach((sec) => {
      sec.rows.forEach((row) => {
        row.columns.forEach((col) => {
          if (col.id === selectedNodeId) selectedColumn = col;
        });
      });
    });
  } else if (selectedNodeType === 'element') {
    canvasState.sections.forEach((sec) => {
      sec.rows.forEach((row) => {
        row.columns.forEach((col) => {
          col.elements.forEach((el) => {
            if (el.id === selectedNodeId) selectedElement = el;
          });
        });
      });
    });
  }

  // Handle adding element to targeted column
  const handleAddElementToColumn = (element: ElementNode) => {
    if (!targetColumnId) return;

    const updatedSections = canvasState.sections.map((sec) => ({
      ...sec,
      rows: sec.rows.map((row) => ({
        ...row,
        columns: row.columns.map((col) => {
          if (col.id === targetColumnId) {
            return { ...col, elements: [...col.elements, element] };
          }
          return col;
        })
      }))
    }));

    handleStateChange({ ...canvasState, sections: updatedSections });
    setTargetColumnId(null);
  };

  // State Change Dispatcher considering active Variant A vs Variant B with Undo History
  const handleStateChange = (newState: CanvasState) => {
    setUndoStack((prev) => [...prev.slice(-40), currentDisplayedCanvas]);
    setRedoStack([]);

    if (activeVariant === 'B' && onUpdateStepVariantB) {
      onUpdateStepVariantB(newState);
    } else {
      onUpdateCanvasState(newState);
    }
  };

  // Update selected element's style
  const handleUpdateElementStyle = (updatedStyle: any) => {
    if (!selectedNodeId) return;

    const updatedSections = canvasState.sections.map((sec) => ({
      ...sec,
      rows: sec.rows.map((row) => ({
        ...row,
        columns: row.columns.map((col) => ({
          ...col,
          elements: col.elements.map((el) => {
            if (el.id === selectedNodeId) {
              return { ...el, style: updatedStyle };
            }
            return el;
          })
        }))
      }))
    }));

    handleStateChange({ ...canvasState, sections: updatedSections });
  };

  // Update selected element's props
  const handleUpdateElementProps = (updatedProps: Record<string, any>) => {
    if (!selectedNodeId) return;

    const updatedSections = canvasState.sections.map((sec) => ({
      ...sec,
      rows: sec.rows.map((row) => ({
        ...row,
        columns: row.columns.map((col) => ({
          ...col,
          elements: col.elements.map((el) => {
            if (el.id === selectedNodeId) {
              return { ...el, props: updatedProps };
            }
            return el;
          })
        }))
      }))
    }));

    handleStateChange({ ...canvasState, sections: updatedSections });
  };

  // Update section properties
  const handleUpdateSection = (updatedSec: SectionNode) => {
    const updatedSections = canvasState.sections.map((s) => s.id === updatedSec.id ? updatedSec : s);
    handleStateChange({ ...canvasState, sections: updatedSections });
  };

  // Update row properties
  const handleUpdateRow = (updatedRow: RowNode) => {
    const updatedSections = canvasState.sections.map((sec) => ({
      ...sec,
      rows: sec.rows.map((row) => row.id === updatedRow.id ? updatedRow : row)
    }));
    handleStateChange({ ...canvasState, sections: updatedSections });
  };

  // Update column properties
  const handleUpdateColumn = (updatedColumn: ColumnNode) => {
    const updatedSections = canvasState.sections.map((sec) => ({
      ...sec,
      rows: sec.rows.map((row) => ({
        ...row,
        columns: row.columns.map((col) => col.id === updatedColumn.id ? updatedColumn : col)
      }))
    }));
    handleStateChange({ ...canvasState, sections: updatedSections });
  };

  // Comprehensive Global Theme & Typography Engine Handler
  const handleUpdateGlobalTokens = (tokens: GlobalDesignTokens, applyToAllElements: boolean = true) => {
    let updatedSections = canvasState.sections;

    if (applyToAllElements) {
      // Traverse all sections, rows, columns, and elements to apply global theme styles automatically
      updatedSections = canvasState.sections.map((sec) => {
        const updatedRows = sec.rows.map((row) => ({
          ...row,
          columns: row.columns.map((col) => ({
            ...col,
            elements: col.elements.map((el) => {
              const updatedTypography = { ...el.style.typography };
              const updatedBorders = { ...el.style.borders };
              const updatedBackground = { ...el.style.background };

              // Set font family based on headline vs body element
              if (el.type === 'headline' || el.type === 'subheadline' || el.type === 'one_click_upsell') {
                updatedTypography.fontFamily = tokens.headingFont || 'Montserrat';
              } else {
                updatedTypography.fontFamily = tokens.bodyFont || 'Open Sans';
              }

              // Set primary color on buttons and interactive callouts
              if (el.type === 'button' || el.type === 'instant_pay_button' || el.type === 'one_step_checkout' || el.type === 'two_step_checkout') {
                updatedBackground.backgroundColor = tokens.primaryColor;
              } else if (el.type === 'headline' || el.type === 'subheadline' || el.type === 'paragraph' || el.type === 'text_block') {
                if (!updatedTypography.color || updatedTypography.color === '#000000' || updatedTypography.color === '#f8fafc' || updatedTypography.color === '#1e293b') {
                  updatedTypography.color = tokens.textColor;
                }
              }

              // Set border radius preset
              if (tokens.borderRadiusPreset) {
                updatedBorders.borderRadiusTopLeft = tokens.borderRadiusPreset;
                updatedBorders.borderRadiusTopRight = tokens.borderRadiusPreset;
                updatedBorders.borderRadiusBottomLeft = tokens.borderRadiusPreset;
                updatedBorders.borderRadiusBottomRight = tokens.borderRadiusPreset;
              }

              return {
                ...el,
                style: {
                  ...el.style,
                  typography: updatedTypography,
                  borders: updatedBorders,
                  background: updatedBackground
                }
              };
            })
          }))
        }));

        return { ...sec, rows: updatedRows };
      });
    }

    handleStateChange({
      ...canvasState,
      globalTokens: tokens,
      sections: updatedSections
    });

    const totalElCount = canvasState.sections.reduce((acc, s) => acc + s.rows.reduce((rAcc, r) => rAcc + r.columns.reduce((cAcc, c) => cAcc + c.elements.length, 0), 0), 0);
    setThemeApplySuccessToast(`✨ Applied theme & fonts across all ${totalElCount} canvas elements!`);
    setTimeout(() => setThemeApplySuccessToast(null), 4000);
  };

  // Save ClickPop Settings
  const handleSaveClickPopSettings = (updatedClickPop: ClickPopSettings) => {
    handleStateChange({ ...canvasState, clickPopSettings: updatedClickPop });
  };

  // Save Funnel State
  const handleSaveState = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  // Download JSON File
  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(canvasState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeStep.slug}_canvas.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Raw JSON
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed.sections) {
        handleStateChange(parsed);
        setIsImportModalOpen(false);
        setImportJsonText('');
      } else {
        alert('Invalid Canvas JSON structure. Must contain sections array.');
      }
    } catch (e) {
      alert('Failed parsing JSON: ' + (e as Error).message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 select-none overflow-hidden font-sans">
      {/* TOP COMMAND BAR — FunnelLegends */}
      <header className="h-14 bg-white border-b border-green-100 px-4 flex items-center justify-between shrink-0 z-40 shadow-sm relative">
        {/* Left: Back & Funnel Step Selector Dropdown */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToDashboard} 
            className="p-1.5 hover:bg-green-50 rounded-lg text-gray-500 hover:text-gray-800 transition-colors border border-transparent hover:border-green-200"
            title="Back to Platform Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="h-5 w-px bg-green-100"></div>

          {/* Step Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsStepDropdownOpen(!isStepDropdownOpen);
                setIsViewportDropdownOpen(false);
                setIsToolsDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-white border border-green-200 hover:border-green-400 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 text-[10px] font-black flex items-center justify-center">
                {activeStep.stepOrder}
              </span>
              <span className="max-w-[130px] sm:max-w-[180px] truncate">{activeStep.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-green-50 text-green-700 border border-green-200 uppercase">
                {activeStep.stepType}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isStepDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsStepDropdownOpen(false)} />
                <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-40 p-2 space-y-1 animate-fade-in">
                  <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-green-600">
                    Funnel Steps ({funnel.steps.length})
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {funnel.steps.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          onSelectStep(st.id);
                          setActiveVariant('A');
                          setIsStepDropdownOpen(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${st.id === activeStep.id ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${st.id === activeStep.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {st.stepOrder}
                          </span>
                          <span className="truncate max-w-[150px]">{st.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-mono uppercase bg-slate-100 text-slate-600">
                            {st.stepType}
                          </span>
                          {st.id === activeStep.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Add Step button at bottom of listed steps */}
                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <button
                      onClick={() => {
                        setIsStepDropdownOpen(false);
                        setIsAddStepModalOpen(true);
                      }}
                      className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Funnel Step</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* A/B Variant Selector Tabs if A/B Split enabled */}
          {activeStep.abSplitEnabled && (
            <div className="flex items-center bg-white border border-green-200 p-0.5 rounded-lg text-xs font-bold ml-1">
              <button 
                onClick={() => setActiveVariant('A')}
                className={`px-2.5 py-1 rounded transition-all ${activeVariant === 'A' ? 'text-white' : 'text-gray-500 hover:text-gray-800'}`}
                style={activeVariant === 'A' ? { background: 'linear-gradient(135deg,#22c55e,#16a34a)' } : {}}
              >
                Control (A)
              </button>
              <button 
                onClick={() => {
                  setActiveVariant('B');
                  if (!activeStep.abSplitVariantBState && onUpdateStepVariantB) {
                    onUpdateStepVariantB(JSON.parse(JSON.stringify(canvasState)));
                  }
                }}
                className={`px-2.5 py-1 rounded transition-all ${activeVariant === 'B' ? 'text-white' : 'text-gray-500 hover:text-gray-800'}`}
                style={activeVariant === 'B' ? { background: 'linear-gradient(135deg,#0d9488,#0d7270)' } : {}}
              >
                Challenger (B)
              </button>
            </div>
          )}
        </div>

        {/* Center: Undo/Redo & Viewport Dropdown Menu */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo buttons */}
          <div className="flex items-center bg-gray-50 border border-green-100 p-0.5 rounded-xl shadow-inner">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              title={`Undo (${typeof navigator !== 'undefined' && navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+Z)`}
              className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              title={`Redo (${typeof navigator !== 'undefined' && navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+Y)`}
              className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <div className="h-5 w-px bg-green-100"></div>

          {/* Viewport Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setIsViewportDropdownOpen(!isViewportDropdownOpen);
                setIsStepDropdownOpen(false);
                setIsToolsDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-gray-50 hover:bg-green-50 border border-green-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm transition-all focus:outline-none"
            >
              {viewportMode === 'desktop' && <Monitor className="w-4 h-4 text-emerald-600" />}
              {viewportMode === 'tablet' && <Tablet className="w-4 h-4 text-emerald-600" />}
              {viewportMode === 'mobile' && <Smartphone className="w-4 h-4 text-emerald-600" />}
              <span className="capitalize">{viewportMode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isViewportDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsViewportDropdownOpen(false)} />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl z-40 p-1.5 space-y-1 animate-fade-in">
                  <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Device Viewport
                  </div>
                  <button
                    onClick={() => { setViewportMode('desktop'); setIsViewportDropdownOpen(false); }}
                    className={`w-full p-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${viewportMode === 'desktop' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div>Desktop</div>
                        <div className="text-[10px] text-slate-400 font-normal">100% Canvas (1200px)</div>
                      </div>
                    </div>
                    {viewportMode === 'desktop' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setViewportMode('tablet'); setIsViewportDropdownOpen(false); }}
                    className={`w-full p-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${viewportMode === 'tablet' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Tablet className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div>Tablet</div>
                        <div className="text-[10px] text-slate-400 font-normal">768px Viewport</div>
                      </div>
                    </div>
                    {viewportMode === 'tablet' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setViewportMode('mobile'); setIsViewportDropdownOpen(false); }}
                    className={`w-full p-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${viewportMode === 'mobile' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div>Mobile</div>
                        <div className="text-[10px] text-slate-400 font-normal">390px Viewport</div>
                      </div>
                    </div>
                    {viewportMode === 'mobile' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Tools & Utilities Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsToolsDropdownOpen(!isToolsDropdownOpen);
                setIsStepDropdownOpen(false);
                setIsViewportDropdownOpen(false);
              }}
              className="px-3 py-1.5 bg-white hover:bg-green-50 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-green-200 shadow-sm transition-colors"
            >
              <Sliders className="w-4 h-4 text-green-600" />
              <span className="hidden sm:inline">Tools</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isToolsDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsToolsDropdownOpen(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl z-40 p-2 space-y-1 animate-fade-in text-xs">
                  <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Page & Canvas Tools
                  </div>

                  <button
                    onClick={() => { setIsGlobalTokensOpen(true); setIsToolsDropdownOpen(false); }}
                    className="w-full p-2 hover:bg-slate-50 rounded-xl text-left font-bold text-slate-700 flex items-center gap-2.5 transition-colors"
                  >
                    <Palette className="w-4 h-4 text-purple-600" />
                    <div>
                      <div>Global Design Tokens</div>
                      <div className="text-[10px] text-slate-400 font-normal">Fonts, brand colors & theme</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setIsClickPopModalOpen(true); setIsToolsDropdownOpen(false); }}
                    className="w-full p-2 hover:bg-slate-50 rounded-xl text-left font-bold text-slate-700 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <MousePointerClick className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div>ClickPop & Exit Modal</div>
                        <div className="text-[10px] text-slate-400 font-normal">Triggers & overlay styling</div>
                      </div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-green-50 text-green-700 border border-green-200">
                      {activeClickPopSettings.triggerType.replace('_', ' ').toUpperCase()}
                    </span>
                  </button>

                  <button
                    onClick={() => { onOpenCodeInspector(); setIsToolsDropdownOpen(false); }}
                    className="w-full p-2 hover:bg-slate-50 rounded-xl text-left font-bold text-slate-700 flex items-center gap-2.5 transition-colors"
                  >
                    <Code className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div>Inspect Code Tree</div>
                      <div className="text-[10px] text-slate-400 font-normal">View raw JSON AST canvas tree</div>
                    </div>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => { setIsImportModalOpen(true); setIsToolsDropdownOpen(false); }}
                    className="w-full p-2 hover:bg-slate-50 rounded-xl text-left font-bold text-slate-700 flex items-center gap-2.5 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-slate-500" />
                    <div>Import Canvas JSON</div>
                  </button>

                  <button
                    onClick={() => { handleDownloadJson(); setIsToolsDropdownOpen(false); }}
                    className="w-full p-2 hover:bg-slate-50 rounded-xl text-left font-bold text-slate-700 flex items-center gap-2.5 transition-colors"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    <div>Export Canvas JSON</div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* AI Copilot */}
          <button 
            onClick={onOpenAiCopilot} 
            className="px-3 py-1.5 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:shadow-md"
            style={{ background: 'linear-gradient(135deg,#22c55e,#0d9488)' }}
          >
            <Sparkles className="w-4 h-4 animate-pulse text-white" />
            <span className="text-white hidden sm:inline">AI Copilot</span>
          </button>

          {/* Live Preview */}
          <button 
            onClick={onOpenLivePreview} 
            className="px-3 py-1.5 bg-white hover:bg-green-50 text-gray-700 hover:text-gray-900 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-green-200 shadow-sm transition-colors"
          >
            <Eye className="w-4 h-4 text-green-600" />
            <span className="hidden sm:inline">Live Preview</span>
          </button>

          {/* Save Button */}
          <button 
            onClick={handleSaveState} 
            className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* MAIN BUILDER BODY */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Step Navigator sidebar */}
        <aside className="w-60 bg-white border-r border-green-100 flex flex-col shrink-0 shadow-sm">
          <div className="p-3 border-b border-green-100 flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: '#22c55e' }}>FUNNEL ARCHITECTURE</span>
            <button
              onClick={onOpenTemplateLibrary}
              className="text-[11px] font-bold hover:underline"
              style={{ color: '#22c55e', background: 'none', border: 'none', padding: 0, boxShadow: 'none' }}
            >
              Templates
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {funnel.steps.map((st) => (
              <button 
                key={st.id} 
                onClick={() => {
                  onSelectStep(st.id);
                  setActiveVariant('A');
                }}
                className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-all ${st.id === activeStep.id ? 'text-white' : 'text-gray-500 hover:text-gray-800 bg-transparent hover:bg-green-50'}`}
                style={st.id === activeStep.id ? { background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 2px 8px rgba(34,197,94,0.25)' } : {}}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${st.id === activeStep.id ? 'bg-white/20 text-white' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                    {st.stepOrder}
                  </span>
                  <div>
                    <div className="truncate max-w-[110px] font-bold">{st.name}</div>
                    <div className={`text-[10px] font-mono ${st.id === activeStep.id ? 'text-green-100' : 'text-gray-400'}`}>{st.stepType}</div>
                  </div>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold ${st.id === activeStep.id ? 'bg-white/20 text-white' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                  {st.status}
                </span>
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-green-100 bg-white">
            <button
              onClick={() => setIsAddStepModalOpen(true)}
              className="w-full py-2 px-3 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Funnel Step</span>
            </button>
          </div>
        </aside>

        {/* Center Canvas Viewport */}
        <Canvas 
          canvasState={currentDisplayedCanvas}
          selectedNodeId={selectedNodeId}
          viewportMode={viewportMode}
          onSelectNode={(id, type) => {
            setSelectedNodeId(id);
            setSelectedNodeType(type);
          }}
          onUpdateCanvasState={handleStateChange}
          onOpenElementCatalog={(targetColId) => {
            setTargetColumnId(targetColId);
            setIsCatalogOpen(true);
          }}
        />

        {/* Right Property Inspector Panel */}
        <InspectorPanel 
          selectedElement={selectedElement}
          selectedSection={selectedSection}
          selectedRow={selectedRow}
          selectedColumn={selectedColumn}
          onUpdateElementStyle={handleUpdateElementStyle}
          onUpdateElementProps={handleUpdateElementProps}
          onUpdateSection={handleUpdateSection}
          onUpdateRow={handleUpdateRow}
          onUpdateColumn={handleUpdateColumn}
          onClose={() => {
            setSelectedNodeId(null);
            setSelectedNodeType(null);
          }}
        />
      </div>

      {/* Catalog Drawer Modal */}
      <SidebarCatalog 
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onAddElement={handleAddElementToColumn}
      />

      {/* ClickPop Manager Configuration Modal */}
      <ClickPopConfigModal 
        isOpen={isClickPopModalOpen}
        onClose={() => setIsClickPopModalOpen(false)}
        settings={activeClickPopSettings}
        onSave={handleSaveClickPopSettings}
        onTestTrigger={() => {
          setIsClickPopModalOpen(false);
          setIsClickPopOverlayOpen(true);
        }}
      />

      {/* ClickPop Live Animated Lightbox Overlay */}
      <ClickPopOverlay 
        isOpen={isClickPopOverlayOpen}
        onClose={() => setIsClickPopOverlayOpen(false)}
        settings={activeClickPopSettings}
      />

      {/* ── ADD FUNNEL STEP MODAL ── */}
      {isAddStepModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-green-500 to-emerald-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Add Funnel Step</h3>
                  <p className="text-xs text-green-100">Choose a step type and starting template</p>
                </div>
              </div>
              <button onClick={() => { setIsAddStepModalOpen(false); setNewStepName(''); setNewStepSlug(''); }} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

              {/* Step Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Step Name *</label>
                  <input
                    type="text"
                    value={newStepName}
                    onChange={e => setNewStepName(e.target.value)}
                    placeholder="e.g. Sales Page, Upsell 1"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider">URL Slug <span className="text-slate-400 font-medium normal-case">(optional)</span></label>
                  <input
                    type="text"
                    value={newStepSlug}
                    onChange={e => setNewStepSlug(e.target.value)}
                    placeholder="e.g. sales-page (auto-generated)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Step Type */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Step Type</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {(['OptIn','Sales','Order','Upsell','Downsell','ThankYou','MemberLogin','MemberArea','Webinar','Bridge','Presell','Misc'] as StepType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setNewStepType(type)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${newStepType === type ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Template Preset */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Starting Template</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'squeeze',        label: '🎯 Squeeze / Opt-In Page',         desc: 'Email capture with lead magnet offer' },
                    { id: 'reverse_squeeze',label: '🔄 Reverse Squeeze Page',           desc: 'Content-first, email gate at end' },
                    { id: 'lead_magnet',    label: '📥 Lead Magnet Delivery',           desc: 'Thank you + instant lead magnet delivery' },
                    { id: 'vsl_order',      label: '🎬 VSL + Order Page',              desc: 'Video sales letter with 2-step checkout' },
                    { id: 'two_step_order', label: '🛒 2-Step Order Form',             desc: 'Contact info then payment, high conversions' },
                    { id: 'oto',            label: '⚡ One-Time Offer (OTO)',           desc: 'Upsell immediately after purchase' },
                    { id: 'downsell',       label: '💲 Downsell Page',                 desc: 'Lower-priced alternative after OTO decline' },
                    { id: 'thank_you',      label: '✅ Thank You Page',                desc: 'Post-purchase confirmation & next steps' },
                    { id: 'member_access',  label: '🔐 Member Login Gate',             desc: 'Login/register page for membership area' },
                    { id: 'member_area',    label: '🏆 Members Area / Dashboard',      desc: 'Course and content delivery portal' },
                    { id: 'demo_sales',     label: '📊 Full Sales Page',               desc: 'Long-form sales letter with proof & CTA' },
                  ].map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setNewStepPreset(preset.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${newStepPreset === preset.id ? 'bg-emerald-50 border-emerald-400 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="shrink-0 mt-0.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${newStepPreset === preset.id ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                          {newStepPreset === preset.id && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${newStepPreset === preset.id ? 'text-emerald-700' : 'text-slate-800'}`}>{preset.label}</div>
                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">{preset.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Funnel Position Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">This step will be added as:</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {funnel.steps.map((st, i) => (
                    <React.Fragment key={st.id}>
                      <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700 text-[10px] font-bold border border-green-200">
                        {st.stepOrder}. {st.name}
                      </span>
                      <span className="text-slate-300 text-xs">→</span>
                    </React.Fragment>
                  ))}
                  <span className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-black border border-emerald-600 animate-pulse">
                    {funnel.steps.length + 1}. {newStepName || 'New Step'} ✦ NEW
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between p-5 border-t border-slate-200 bg-slate-50 gap-3">
              <button
                onClick={() => { setIsAddStepModalOpen(false); setNewStepName(''); setNewStepSlug(''); }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateStepSubmit}
                disabled={!newStepName.trim()}
                className="px-6 py-2.5 rounded-xl text-xs font-black text-white flex items-center gap-2 transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
              >
                <Plus className="w-4 h-4" />
                Add Step to Funnel
              </button>
            </div>
          </div>
        </div>
      )}


      {isGlobalTokensOpen && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-6 text-slate-900 shadow-2xl relative my-8">
            <button 
              onClick={() => setIsGlobalTokensOpen(false)} 
              className="text-slate-600 hover:text-slate-900 absolute right-6 top-6"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Global Theme & Brand Typography System</h3>
                <p className="text-xs text-slate-600">Manage global font families, brand colors, and auto-syncing reusable sections.</p>
              </div>
            </div>

            {/* BRAND CONSISTENCY SYSTEM NOTICE BANNER - USER EXACT REQUIREMENT */}
            <div className="p-4 bg-purple-950/40 border border-purple-500/40 rounded-2xl space-y-1.5 shadow-inner">
              <div className="flex items-center gap-2 text-purple-300 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>Brand Consistency Engine Active</span>
              </div>
              <p className="text-xs text-purple-200/90 leading-relaxed font-medium">
                Our theme system ensures your brand stays consistent across every page. Create reusable sections for headers, footers, and content blocks that automatically update everywhere when you make changes.
              </p>
            </div>

            {/* Success Toast inside modal */}
            {themeApplySuccessToast && (
              <div className="p-3 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{themeApplySuccessToast}</span>
              </div>
            )}

            {/* Modal Sub-Tabs */}
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold gap-1">
              <button 
                onClick={() => setThemeTab('palette')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${themeTab === 'palette' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-slate-800'}`}
              >
                <Palette className="w-4 h-4" />
                <span>Fonts & Palette</span>
              </button>

              <button 
                onClick={() => setThemeTab('custom_branding')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${themeTab === 'custom_branding' ? 'bg-purple-600 text-white shadow' : 'text-slate-600 hover:text-slate-800'}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>My Custom Themes ({customThemes.length})</span>
              </button>

              <button 
                onClick={() => setThemeTab('reusable_sections')}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${themeTab === 'reusable_sections' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-slate-800'}`}
              >
                <Layers className="w-4 h-4" />
                <span>Reusable Sections</span>
              </button>
            </div>

            {/* TAB 1: FONTS & COLOR PALETTE */}
            {themeTab === 'palette' && (
              <div className="space-y-5">
                {/* 1-Click Designer Presets */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Quick Designer Palette Presets:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { name: 'Indigo Midnight', headingFont: 'Montserrat', bodyFont: 'Open Sans', primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', borderRadiusPreset: '12px' },
                      { name: 'Cyber Violet', headingFont: 'Plus Jakarta Sans', bodyFont: 'Inter', primaryColor: '#8b5cf6', secondaryColor: '#3b82f6', accentColor: '#f59e0b', backgroundColor: '#030712', textColor: '#f8fafc', borderRadiusPreset: '16px' },
                      { name: 'Luxury Gold', headingFont: 'Playfair Display', bodyFont: 'Inter', primaryColor: '#d97706', secondaryColor: '#b45309', accentColor: '#f59e0b', backgroundColor: '#090d16', textColor: '#fef3c7', borderRadiusPreset: '8px' },
                      { name: 'Emerald SaaS', headingFont: 'Outfit', bodyFont: 'Work Sans', primaryColor: '#059669', secondaryColor: '#0d9488', accentColor: '#10b981', backgroundColor: '#f8fafc', textColor: '#0f172a', borderRadiusPreset: '8px' },
                      { name: 'Crimson Fire', headingFont: 'Montserrat', bodyFont: 'Roboto', primaryColor: '#dc2626', secondaryColor: '#e11d48', accentColor: '#f97316', backgroundColor: '#0f172a', textColor: '#ffffff', borderRadiusPreset: '12px' }
                    ].map((p, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleUpdateGlobalTokens(p, true)}
                        className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left space-y-1.5 transition-all hover:border-indigo-500/50"
                      >
                        <div className="text-[11px] font-bold text-slate-800 truncate">{p.name}</div>
                        <div className="flex gap-1">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.primaryColor }} />
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.secondaryColor }} />
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accentColor }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selector Rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Headline Font Family</label>
                    <select 
                      value={canvasState.globalTokens.headingFont} 
                      onChange={(e) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, headingFont: e.target.value }, true)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium"
                    >
                      <option value="Outfit">Outfit</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Inter">Inter</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Oswald">Oswald</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Body & Input Font Family</label>
                    <select 
                      value={canvasState.globalTokens.bodyFont} 
                      onChange={(e) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, bodyFont: e.target.value }, true)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium"
                    >
                      <option value="Open Sans">Open Sans</option>
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Lato">Lato</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                      <option value="Work Sans">Work Sans</option>
                    </select>
                  </div>
                </div>

                {/* Color Pickers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <UniversalColorPicker
                    label="Primary Color"
                    value={canvasState.globalTokens.primaryColor}
                    onChange={(newColor) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, primaryColor: newColor }, true)}
                    showFormatButtons={false}
                  />

                  <UniversalColorPicker
                    label="Secondary Color"
                    value={canvasState.globalTokens.secondaryColor || '#ec4899'}
                    onChange={(newColor) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, secondaryColor: newColor }, true)}
                    showFormatButtons={false}
                  />

                  <UniversalColorPicker
                    label="Accent Color"
                    value={canvasState.globalTokens.accentColor || '#10b981'}
                    onChange={(newColor) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, accentColor: newColor }, true)}
                    showFormatButtons={false}
                  />

                  <UniversalColorPicker
                    label="Text Color"
                    value={canvasState.globalTokens.textColor || '#f8fafc'}
                    onChange={(newColor) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, textColor: newColor }, true)}
                    showFormatButtons={false}
                  />
                </div>

                {/* Global Background Settings */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Global Canvas Background</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <UniversalColorPicker
                      label="Background Color"
                      value={canvasState.globalTokens.backgroundColor || '#0f172a'}
                      onChange={(newColor) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, backgroundColor: newColor }, true)}
                      showFormatButtons={false}
                    />
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Background Image URL</label>
                      <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200">
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={canvasState.globalTokens.backgroundImage || ''}
                          onChange={(e) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, backgroundImage: e.target.value }, true)}
                          className="w-full bg-transparent border-none px-1 py-1 text-slate-800 text-xs focus:outline-none"
                        />
                        <label className="p-1 bg-slate-50 hover:bg-slate-100 rounded text-emerald-400 cursor-pointer shrink-0" title="Upload from Desktop">
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
                                    handleUpdateGlobalTokens({ ...canvasState.globalTokens, backgroundImage: event.target.result.toString() }, true);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                          <Upload className="w-3.5 h-3.5" />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Image Size</label>
                      <select 
                        value={canvasState.globalTokens.backgroundSize || 'cover'}
                        onChange={(e) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, backgroundSize: e.target.value as any }, true)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-800 outline-none"
                      >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Position</label>
                      <select 
                        value={canvasState.globalTokens.backgroundPosition || 'center center'}
                        onChange={(e) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, backgroundPosition: e.target.value }, true)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-800 outline-none"
                      >
                        <option value="center center">Center</option>
                        <option value="top center">Top</option>
                        <option value="bottom center">Bottom</option>
                        <option value="left center">Left</option>
                        <option value="right center">Right</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Overlay Color</label>
                      <input 
                        type="text" 
                        placeholder="rgba(0,0,0,0.5)"
                        value={canvasState.globalTokens.backgroundOverlayColor || ''}
                        onChange={(e) => handleUpdateGlobalTokens({ ...canvasState.globalTokens, backgroundOverlayColor: e.target.value }, true)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-slate-800 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Border Radius Preset Selector */}
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold text-xs">Border Radius Rounding Preset</label>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {['0px', '8px', '12px', '9999px'].map(r => (
                      <button 
                        key={r}
                        onClick={() => handleUpdateGlobalTokens({ ...canvasState.globalTokens, borderRadiusPreset: r }, true)}
                        className={`py-2 rounded-xl border font-mono font-bold transition-all ${canvasState.globalTokens.borderRadiusPreset === r ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white text-slate-600 border-slate-200 hover:text-slate-800'}`}
                      >
                        {r === '0px' ? 'Sharp (0px)' : r === '8px' ? 'Clean (8px)' : r === '12px' ? 'Soft (12px)' : 'Pill (Full)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => handleUpdateGlobalTokens(canvasState.globalTokens, true)}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>APPLY GLOBAL THEME & FONTS ACROSS ALL CANVAS ELEMENTS</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: MY CUSTOM BRANDING THEMES */}
            {themeTab === 'custom_branding' && (
              <div className="space-y-5">
                {/* Save Current Theme Box */}
                <div className="p-4 bg-white rounded-2xl border border-purple-500/40 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-purple-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Save Current Active Styling as Custom Theme
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">Heading: {canvasState.globalTokens.headingFont}</span>
                  </div>

                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Acme Corp Dark Luxury Palette..." 
                      value={newThemeName}
                      onChange={(e) => setNewThemeName(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button 
                      onClick={handleSaveCurrentAsCustomTheme}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Save Branding Theme</span>
                    </button>
                  </div>
                </div>

                {/* Saved Custom Themes Roster */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Your Saved Brand Palettes & Themes ({customThemes.length}):</label>
                  
                  {customThemes.length === 0 ? (
                    <div className="p-6 text-center bg-white border border-slate-200 rounded-2xl text-xs text-slate-500">
                      No custom themes saved yet. Customize your fonts & colors and click "Save Branding Theme" above.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                      {customThemes.map(ct => (
                        <div key={ct.id} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 hover:border-purple-500/50 transition-all flex flex-col justify-between shadow">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900">{ct.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{ct.createdAt}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300">
                              <span className="bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">{ct.headingFont}</span>
                              <span className="bg-white px-2 py-0.5 rounded text-slate-600">{ct.bodyFont}</span>
                            </div>

                            {/* Color Swatch Bar */}
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="w-4 h-4 rounded-full border border-slate-300 shadow" style={{ backgroundColor: ct.primaryColor }} title="Primary Color" />
                              <span className="w-4 h-4 rounded-full border border-slate-300 shadow" style={{ backgroundColor: ct.secondaryColor }} title="Secondary Color" />
                              <span className="w-4 h-4 rounded-full border border-slate-300 shadow" style={{ backgroundColor: ct.accentColor }} title="Accent Color" />
                              <span className="w-4 h-4 rounded-full border border-slate-300 shadow" style={{ backgroundColor: ct.backgroundColor }} title="Background Color" />
                              <span className="w-4 h-4 rounded-full border border-slate-300 shadow" style={{ backgroundColor: ct.textColor }} title="Text Color" />
                              <span className="ml-auto text-[10px] text-slate-600 font-mono">{ct.borderRadiusPreset}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                            <button 
                              onClick={() => handleUpdateGlobalTokens(ct, true)}
                              className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 shadow"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              <span>Apply Theme to Canvas</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteCustomTheme(ct.id)}
                              className="p-1.5 bg-white hover:bg-rose-950 text-slate-600 hover:text-rose-400 rounded-lg text-xs border border-slate-200"
                              title="Delete custom theme"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: REUSABLE SECTIONS (HEADERS, FOOTERS, CONTENT BLOCKS) */}
            {themeTab === 'reusable_sections' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      Universal Global Header Navigation
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                      AUTO-SYNCED
                    </span>
                  </div>
                  <p className="text-slate-600">Edits to the top menu bar, logo, and links automatically sync across all funnel steps.</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-pink-400" />
                      Universal Global Footer Block
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                      AUTO-SYNCED
                    </span>
                  </div>
                  <p className="text-slate-600">Copyright, privacy terms, and social links update across all pages simultaneously.</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      Reusable Content Blocks & Testimonial Sliders
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono font-bold">
                      GLOBAL ASSET VAULT
                    </span>
                  </div>
                  <p className="text-slate-600">Save any custom section as a reusable global block and drop it anywhere with 1-click.</p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setThemeApplySuccessToast('✨ Reusable global headers, footers & content blocks synchronized across all pages!');
                      setTimeout(() => setThemeApplySuccessToast(null), 3000);
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync Reusable Sections Across All Pages</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* JSON Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              <span>Import Canvas JSON Data</span>
            </h3>
            <textarea 
              rows={8}
              placeholder="Paste raw canvas JSON string here..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-emerald-400 focus:outline-none"
            />
            <div className="flex gap-2">
              <button onClick={handleImportJson} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">Import JSON</button>
              <button onClick={() => setIsImportModalOpen(false)} className="px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}



      {/* Save Notification Toast */}
      {isSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>Step state & A/B variants saved to persistent workspace!</span>
        </div>
      )}
    </div>
  );
};
