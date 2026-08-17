import React, { useState, useEffect } from 'react';
import { FunnelData, FunnelStepData, CanvasState, PageStatus } from './types/builder';
import { loadStoredFunnels, saveStoredFunnels } from './utils/storage';
import { BuilderLayout } from './components/builder/BuilderLayout';
import { TemplateLibraryModal } from './components/templates/TemplateLibraryModal';
import { MembershipManager } from './components/membership/MembershipManager';
import { PublishingManager } from './components/publishing/PublishingManager';
import { LivePreviewModal } from './components/preview/LivePreviewModal';
import { AutomationWorkflowBuilder } from './components/automation/AutomationWorkflowBuilder';
import { CrmPipeline } from './components/crm/CrmPipeline';
import { BountyPackAffiliateManager } from './components/affiliate/BountyPackAffiliateManager';
import { ChronoChimpAppointmentManager } from './components/appointment/ChronoChimpAppointmentManager';
import { TribeNexusCommunity } from './components/community/TribeNexusCommunity';
import { PingPandaMessageHub } from './components/messageHub/PingPandaMessageHub';
import { AiAssistantModal } from './components/ai/AiAssistantModal';
import { CodeInspector } from './components/builder/CodeInspector';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { GlobalSettingsManager } from './components/settings/GlobalSettingsManager';
import { MarketingWebsiteContainer } from './components/marketing/MarketingWebsiteContainer';
import { GlobalSettingsModal } from './components/settings/GlobalSettingsModal';
import { WebsitesManager } from './components/websites/WebsitesManager';
import { 
  Rocket, Layers, Sparkles, GraduationCap, Globe, GitBranch, Users, 
  Settings, Plus, ChevronRight, Download, Eye, ExternalLink, Play, Trash2, 
  Gift, CalendarCheck, MessageSquare, LayoutDashboard, Menu, ArrowLeft
} from 'lucide-react';

// FunnelLegends inline SVG Logo
export const FunnelLegendsLogo = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="flGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="60%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>
    {/* Funnel wide ellipse top */}
    <ellipse cx="50" cy="22" rx="36" ry="10" fill="none" stroke="url(#flGrad)" strokeWidth="5" />
    {/* Funnel tapered body */}
    <path d="M14 22 Q28 65 43 88 Q47 96 50 98 Q53 96 57 88 Q72 65 86 22 Q68 30 50 30 Q32 30 14 22Z" fill="url(#flGrad)" opacity="0.9" />
    {/* Swirl highlight lines */}
    <path d="M20 32 Q50 40 80 32" stroke="white" strokeWidth="3" fill="none" strokeOpacity="0.55" strokeLinecap="round" />
    <path d="M30 48 Q50 54 70 48" stroke="white" strokeWidth="2.5" fill="none" strokeOpacity="0.4" strokeLinecap="round" />
    {/* 7-pointed star */}
    <g transform="translate(50, 18) scale(0.85)">
      <polygon
        points="0,-13 2.9,-4 12.4,-4 5.0,1.5 7.8,10.5 0,5.2 -7.8,10.5 -5.0,1.5 -12.4,-4 -2.9,-4"
        fill="#86efac"
      />
    </g>
  </svg>
);

export function App() {
  const [funnels, setFunnels] = useState<FunnelData[]>(loadStoredFunnels());
  const [activeFunnel, setActiveFunnel] = useState<FunnelData>(funnels[0] || loadStoredFunnels()[0]);
  const [activeStep, setActiveStep] = useState<FunnelStepData>(activeFunnel.steps[0]);
  const [canvasState, setCanvasState] = useState<CanvasState>(activeFunnel.steps[0].canvasState);
  
  // Main App View Mode: 'marketing' (Public Site) vs 'platform' (Builder App)
  const [viewMode, setViewMode] = useState<'marketing' | 'platform'>('marketing');

  // Platform View state
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'builder' | 'funnels' | 'websites' | 'membership' | 'publishing' | 'automations' | 'crm' | 'affiliate' | 'appointments' | 'community' | 'messagehub' | 'settings'>('dashboard');

  const [tabHistory, setTabHistory] = useState<string[]>(['dashboard']);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigateToTab = (tab: any) => {
    setCurrentTab(tab);
    setIsSidebarCollapsed(true);
    setTabHistory(prev => [...prev, tab]);
  };

  const handleBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop();
      const prevTab = newHistory[newHistory.length - 1];
      setCurrentTab(prevTab as any);
      setTabHistory(newHistory);
    }
  };

  // Modals state
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isLivePreviewOpen, setIsLivePreviewOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCodeInspectorOpen, setIsCodeInspectorOpen] = useState(false);
  const [isGlobalSettingsOpen, setIsGlobalSettingsOpen] = useState(false);

  // Persist funnels changes to localStorage
  useEffect(() => {
    saveStoredFunnels(funnels);
  }, [funnels]);

  // Switch step
  const handleSelectStep = (stepId: string) => {
    const foundStep = activeFunnel.steps.find((s) => s.id === stepId);
    if (foundStep) {
      setActiveStep(foundStep);
      setCanvasState(foundStep.canvasState);
    }
  };

  // Update step canvas state (Variant A)
  const handleUpdateCanvasState = (newState: CanvasState) => {
    setCanvasState(newState);
    const updatedSteps = activeFunnel.steps.map((st) => st.id === activeStep.id ? { ...st, canvasState: newState } : st);
    const updatedFunnel = { ...activeFunnel, steps: updatedSteps };
    setActiveFunnel(updatedFunnel);
    setFunnels(funnels.map((f) => f.id === activeFunnel.id ? updatedFunnel : f));
  };

  // Select website template → import as active funnel & open builder
  const handleSelectWebsiteTemplate = (websiteData: FunnelData) => {
    const timestamp = Date.now();
    const clonedSteps = websiteData.steps.map((step, idx) => ({
      ...JSON.parse(JSON.stringify(step)),
      id: `step-site-${timestamp}-${idx}`
    }));

    const newWebsite: FunnelData = {
      ...JSON.parse(JSON.stringify(websiteData)),
      id: `website-${timestamp}`,
      name: `${websiteData.name} (My Site)`,
      createdAt: new Date().toISOString(),
      steps: clonedSteps
    };

    setFunnels([newWebsite, ...funnels]);
    setActiveFunnel(newWebsite);
    setActiveStep(newWebsite.steps[0]);
    setCanvasState(newWebsite.steps[0].canvasState);
    setCurrentTab('builder');
  };

  // Update Variant B canvas state
  const handleUpdateStepVariantB = (variantBState: CanvasState) => {
    const updatedSteps = activeFunnel.steps.map((st) => st.id === activeStep.id ? { ...st, abSplitVariantBState: variantBState } : st);
    const updatedFunnel = { ...activeFunnel, steps: updatedSteps };
    setActiveFunnel(updatedFunnel);
    setActiveStep({ ...activeStep, abSplitVariantBState: variantBState });
    setFunnels(funnels.map((f) => f.id === activeFunnel.id ? updatedFunnel : f));
  };

  // Instantiate template
  const handleInstantiateTemplate = (template: FunnelData) => {
    const cloned: FunnelData = {
      ...JSON.parse(JSON.stringify(template)),
      id: `fnl_${Date.now()}`,
      name: `${template.name} (Active Workspace)`
    };
    const updatedFunnels = [cloned, ...funnels];
    setFunnels(updatedFunnels);
    setActiveFunnel(cloned);
    setActiveStep(cloned.steps[0]);
    setCanvasState(cloned.steps[0].canvasState);
    setCurrentTab('builder');
  };

  // Update step lifecycle status
  const handleUpdateStepStatus = (stepId: string, status: PageStatus) => {
    const updatedSteps = activeFunnel.steps.map((s) => s.id === stepId ? { ...s, status } : s);
    const updatedFunnel = { ...activeFunnel, steps: updatedSteps };
    setActiveFunnel(updatedFunnel);
    setActiveStep({ ...activeStep, status });
    setFunnels(funnels.map((f) => f.id === activeFunnel.id ? updatedFunnel : f));
  };

  // Update A/B split test
  const handleUpdateStepAbTest = (stepId: string, abEnabled: boolean, trafficSplit: number) => {
    const updatedSteps = activeFunnel.steps.map((s) => s.id === stepId ? { ...s, abSplitEnabled: abEnabled, trafficSplitPercent: trafficSplit } : s);
    const updatedFunnel = { ...activeFunnel, steps: updatedSteps };
    setActiveFunnel(updatedFunnel);
    setActiveStep({ ...activeStep, abSplitEnabled: abEnabled, trafficSplitPercent: trafficSplit });
    setFunnels(funnels.map((f) => f.id === activeFunnel.id ? updatedFunnel : f));
  };

  // Add a new funnel step to active funnel
  const handleAddStep = (newStep: FunnelStepData) => {
    const updatedSteps = [...activeFunnel.steps, newStep];
    const updatedFunnel = { ...activeFunnel, steps: updatedSteps };
    setActiveFunnel(updatedFunnel);
    setActiveStep(newStep);
    setCanvasState(newStep.canvasState);
    setFunnels(funnels.map((f) => f.id === activeFunnel.id ? updatedFunnel : f));
  };

  // Delete Funnel
  const handleDeleteFunnel = (funnelId: string) => {
    if (funnels.length <= 1) {
      alert('Must keep at least 1 active funnel workspace.');
      return;
    }
    const updated = funnels.filter(f => f.id !== funnelId);
    setFunnels(updated);
    if (activeFunnel.id === funnelId) {
      setActiveFunnel(updated[0]);
      setActiveStep(updated[0].steps[0]);
      setCanvasState(updated[0].steps[0].canvasState);
    }
  };

  // Shared nav button classes
  const navBtn = (tab: string) =>
    `w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-3 gap-3'} ${
      currentTab === tab
        ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
        : 'text-gray-500 hover:text-gray-800 hover:bg-green-50'
    }`;

  if (viewMode === 'marketing') {
    return (
      <MarketingWebsiteContainer 
        onLaunchPlatformApp={() => setViewMode('platform')}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans text-gray-900">
      
      {/* ============================================
          LEFT SIDEBAR NAVIGATION — FunnelLegends
          ============================================ */}
      <aside className={`bg-white border-r border-green-100 flex flex-col shrink-0 z-40 transition-all duration-300 shadow-sm ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        
        {/* ── LOGO & BRAND ── */}
        <div className={`h-16 border-b border-green-100 flex items-center shrink-0 ${isSidebarCollapsed ? 'justify-center px-2' : 'px-4 gap-3'}`}>
          <div className="shrink-0">
            <FunnelLegendsLogo size={isSidebarCollapsed ? 32 : 36} />
          </div>

          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <div className="flex items-baseline gap-0.5 leading-none">
                <span className="font-black text-sm tracking-tight" style={{ color: '#22c55e', fontFamily: 'Outfit, Inter, sans-serif' }}>FUNNEL</span>
                <span className="font-black text-sm tracking-tight" style={{ color: '#0d7270', fontFamily: 'Outfit, Inter, sans-serif' }}>LEGENDS</span>
              </div>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">Marketing & Funnel Platform</p>
            </div>
          )}
        </div>

        {/* ── VERTICAL NAV LINKS ── */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          
          {/* Dashboard */}
          <button onClick={() => navigateToTab('dashboard')} className={navBtn('dashboard')}>
            <LayoutDashboard className="w-4 h-4 shrink-0" style={{ color: currentTab === 'dashboard' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </button>

          {/* Visual Builder */}
          <button onClick={() => navigateToTab('builder')} className={navBtn('builder')}>
            <Layers className="w-4 h-4 shrink-0" style={{ color: currentTab === 'builder' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && <span>Visual Builder</span>}
          </button>

          {/* Funnels */}
          <button onClick={() => navigateToTab('funnels')} className={navBtn('funnels')}>
            <Rocket className="w-4 h-4 shrink-0" style={{ color: currentTab === 'funnels' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && (
              <>
                <span className="flex-1 text-left">Funnels</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">{funnels.length}</span>
              </>
            )}
          </button>

          {/* Websites */}
          <button onClick={() => navigateToTab('websites')} className={navBtn('websites')}>
            <Globe className="w-4 h-4 shrink-0" style={{ color: currentTab === 'websites' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && (
              <>
                <span className="flex-1 text-left font-bold">Websites</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-bold">5 Templates</span>
              </>
            )}
          </button>

          {/* Course Portal */}
          <button onClick={() => navigateToTab('membership')} className={navBtn('membership')}>
            <GraduationCap className="w-4 h-4 shrink-0" style={{ color: currentTab === 'membership' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && <span>Course Portal</span>}
          </button>

          {/* Publishing */}
          <button onClick={() => navigateToTab('publishing')} className={navBtn('publishing')}>
            <Globe className="w-4 h-4 shrink-0" style={{ color: currentTab === 'publishing' ? '#fff' : '#0d9488' }} />
            {!isSidebarCollapsed && <span>Publishing & A/B</span>}
          </button>

          {/* Automations */}
          <button onClick={() => navigateToTab('automations')} className={navBtn('automations')}>
            <GitBranch className="w-4 h-4 shrink-0" style={{ color: currentTab === 'automations' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && <span>Automations</span>}
          </button>

          {/* CRM */}
          <button onClick={() => navigateToTab('crm')} className={navBtn('crm')}>
            <Users className="w-4 h-4 shrink-0" style={{ color: currentTab === 'crm' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && <span>CRM Pipeline</span>}
          </button>

          {/* Divider */}
          <div className="my-2 border-t border-green-100"></div>

          {/* BountyPack Affiliate */}
          <button onClick={() => navigateToTab('affiliate')} className={navBtn('affiliate')}>
            <Gift className="w-4 h-4 shrink-0" style={{ color: currentTab === 'affiliate' ? '#fff' : '#16a34a' }} />
            {!isSidebarCollapsed && <span>BountyPack</span>}
          </button>

          {/* ChronoChimp Appointments */}
          <button onClick={() => navigateToTab('appointments')} className={navBtn('appointments')}>
            <CalendarCheck className="w-4 h-4 shrink-0" style={{ color: currentTab === 'appointments' ? '#fff' : '#0d9488' }} />
            {!isSidebarCollapsed && <span>ChronoChimp</span>}
          </button>

          {/* TribeNexus */}
          <button onClick={() => navigateToTab('community')} className={navBtn('community')}>
            <Users className="w-4 h-4 shrink-0" style={{ color: currentTab === 'community' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && <span>TribeNexus</span>}
          </button>

          {/* PingPanda Message Hub */}
          <button onClick={() => navigateToTab('messagehub')} className={navBtn('messagehub')}>
            <MessageSquare className="w-4 h-4 shrink-0" style={{ color: currentTab === 'messagehub' ? '#fff' : '#22c55e' }} />
            {!isSidebarCollapsed && (
              <>
                <span className="flex-1 text-left font-bold">PingPanda</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">🐼</span>
              </>
            )}
          </button>
        </nav>

        {/* ── GLOBAL SETTINGS ── */}
        <div className={`p-3 border-t border-green-100 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-center gap-2 px-3'} ${
              currentTab === 'settings' 
                ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' 
                : 'bg-green-50 hover:bg-green-100 text-gray-600 hover:text-gray-900 border border-green-200'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" style={{ color: currentTab === 'settings' ? '#fff' : '#16a34a' }} />
            {!isSidebarCollapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>

      {/* ============================================
          RIGHT MAIN CONTENT AREA
          ============================================ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER BAR */}
        <header className="h-16 bg-white border-b border-green-100 px-6 flex items-center justify-between shrink-0 z-30 shadow-sm">
          
          <div className="flex items-center gap-4">
            {/* Toggle Sidebar */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-green-50 transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Back Button */}
            {tabHistory.length > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-gray-600 hover:text-gray-900 rounded-lg text-xs font-bold transition-colors border border-green-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            {/* Platform badge */}
            <span className="text-[10px] uppercase font-mono font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
              Platform v2.0
            </span>
          </div>

          {/* Right: Marketing Site + Templates + AI Copilot */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('marketing')}
              className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 hover:text-green-950 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-green-300 transition-colors"
            >
              <Globe className="w-4 h-4 text-green-600" />
              <span>Marketing Site</span>
            </button>

            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-3 py-1.5 bg-white hover:bg-green-50 text-gray-700 hover:text-gray-900 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-green-200 transition-colors"
            >
              <Download className="w-4 h-4 text-green-600" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3.5 py-1.5 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all hover:shadow-xl hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Copilot</span>
            </button>
          </div>
        </header>

        {/* ── PLATFORM MAIN CONTENT ── */}
        <main className="flex-1 flex overflow-hidden bg-gray-50">
          
          {/* TAB 0: DASHBOARD */}
          {currentTab === 'dashboard' && (
            <DashboardOverview
              funnels={funnels}
              onNavigate={(tab: any) => setCurrentTab(tab)}
              onOpenTemplates={() => setIsTemplateModalOpen(true)}
            />
          )}

          {/* TAB 1: VISUAL BUILDER */}
          {currentTab === 'builder' && (
            <BuilderLayout
              funnel={activeFunnel}
              activeStep={activeStep}
              canvasState={canvasState}
              onUpdateCanvasState={handleUpdateCanvasState}
              onSelectStep={handleSelectStep}
              onAddStep={handleAddStep}
              onBackToDashboard={() => setCurrentTab('funnels')}
              onOpenLivePreview={() => setIsLivePreviewOpen(true)}
              onOpenTemplateLibrary={() => setIsTemplateModalOpen(true)}
              onOpenAiCopilot={() => setIsAiModalOpen(true)}
              onOpenCodeInspector={() => setIsCodeInspectorOpen(true)}
              onUpdateStepVariantB={handleUpdateStepVariantB}
            />
          )}

          {/* TAB 2: FUNNELS LIST */}
          {currentTab === 'funnels' && (
            <div className="flex-1 bg-white p-6 overflow-y-auto">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Funnel Workspaces <span style={{ color: '#22c55e' }}>({funnels.length})</span></h2>
                    <p className="text-xs text-gray-500 mt-0.5">Manage multi-step lead capture, sales, webinar, and membership funnels.</p>
                  </div>
                  <button
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="px-4 py-2.5 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 14px rgba(34,197,94,0.25)' }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Funnel from Template</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {funnels.map((fnl) => (
                    <div key={fnl.id} className="bg-white border border-green-100 rounded-2xl p-5 space-y-4 shadow-sm hover:border-green-400 hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200">
                          {fnl.type} FUNNEL
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-mono">{fnl.steps.length} Steps</span>
                          <button onClick={() => handleDeleteFunnel(fnl.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors">{fnl.name}</h3>
                        <p className="text-xs font-mono text-gray-400 mt-1">/{fnl.slug}</p>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        {fnl.steps.map((st) => (
                          <div key={st.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs border border-gray-100">
                            <span className="font-semibold text-gray-700">{st.name}</span>
                            <span className="text-[10px] text-green-600 font-mono">Step {st.stepOrder} ({st.stepType})</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setActiveFunnel(fnl);
                          setActiveStep(fnl.steps[0]);
                          setCanvasState(fnl.steps[0].canvasState);
                          setCurrentTab('builder');
                        }}
                        className="w-full py-2.5 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow"
                        style={{ background: 'linear-gradient(135deg, #22c55e, #0d9488)' }}
                      >
                        <span>Open in Visual Canvas Builder</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2.5: WEBSITES MANAGER */}
          {currentTab === 'websites' && (
            <WebsitesManager onSelectTemplate={handleSelectWebsiteTemplate} />
          )}

          {/* TAB 3: MEMBERSHIP PORTAL */}
          {currentTab === 'membership' && (
            <MembershipManager />
          )}

          {/* TAB 4: PUBLISHING */}
          {currentTab === 'publishing' && (
            <PublishingManager
              funnel={activeFunnel}
              activeStep={activeStep}
              onUpdateStepStatus={handleUpdateStepStatus}
              onUpdateStepAbTest={handleUpdateStepAbTest}
            />
          )}

          {/* TAB 5: AUTOMATIONS */}
          {currentTab === 'automations' && (
            <AutomationWorkflowBuilder />
          )}

          {/* TAB 6: CRM */}
          {currentTab === 'crm' && (
            <CrmPipeline />
          )}

          {/* TAB 7: BOUNTYPACK */}
          {currentTab === 'affiliate' && (
            <BountyPackAffiliateManager />
          )}

          {/* TAB 8: CHRONOCHIMP */}
          {currentTab === 'appointments' && (
            <ChronoChimpAppointmentManager />
          )}

          {/* TAB 9: TRIBENEXUS */}
          {currentTab === 'community' && (
            <TribeNexusCommunity />
          )}

          {/* TAB 10: PINGPANDA MESSAGE HUB */}
          {currentTab === 'messagehub' && (
            <PingPandaMessageHub />
          )}

          {/* TAB 11: GLOBAL PLATFORM SETTINGS */}
          {currentTab === 'settings' && (
            <GlobalSettingsManager />
          )}
        </main>
      </div>

      {/* ============================================
          PLATFORM GLOBAL MODALS
          ============================================ */}
      <TemplateLibraryModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onInstantiateTemplate={handleInstantiateTemplate}
      />

      <LivePreviewModal
        isOpen={isLivePreviewOpen}
        onClose={() => setIsLivePreviewOpen(false)}
        activeStep={activeStep}
        canvasState={canvasState}
      />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyGeneratedCanvas={handleUpdateCanvasState}
      />

      <CodeInspector
        isOpen={isCodeInspectorOpen}
        onClose={() => setIsCodeInspectorOpen(false)}
        canvasState={canvasState}
      />

      <GlobalSettingsModal
        isOpen={isGlobalSettingsOpen}
        onClose={() => setIsGlobalSettingsOpen(false)}
      />
    </div>
  );
}
