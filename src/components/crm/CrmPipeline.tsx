import React, { useState, useEffect } from 'react';
import { DealData, ContactData } from '../../types/builder';
import { 
  loadStoredDeals, saveStoredDeals, loadStoredContacts, saveStoredContacts, 
  resetCrmStorageToDefaults 
} from '../../utils/storage';
import { 
  syncCrmToSupabase, CRM_ENGINE_SQL_SCHEMA, initialCrmIntegrations, ThirdPartyIntegration 
} from '../../utils/crmDbSync';
import { 
  Users, DollarSign, Plus, Flame, Award, ShieldCheck, Mail, Phone, 
  ChevronRight, Move, Search, Filter, Trash2, X, Zap, Database, 
  RefreshCw, Check, Copy, CheckCheck, Globe, Link2, Send, Activity,
  ArrowRight, CheckCircle2, TrendingUp, BarChart3, Layers, Sliders
} from 'lucide-react';

export const CrmPipeline: React.FC = () => {
  const [deals, setDeals] = useState<DealData[]>(loadStoredDeals());
  const [contacts, setContacts] = useState<ContactData[]>(loadStoredContacts());
  const [activeTab, setActiveTab] = useState<'kanban' | 'simulations' | 'contacts' | 'integrations' | 'database'>('kanban');
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(contacts[0] || null);
  const [contactSearchQuery, setContactSearchQuery] = useState('');

  // Modals
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealValue, setNewDealValue] = useState('2997');
  const [newDealContact, setNewDealContact] = useState('');
  const [newDealContactEmail, setNewDealContactEmail] = useState('');

  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('+1 (555) 019-2831');

  // Integrations state
  const [integrations, setIntegrations] = useState<ThirdPartyIntegration[]>(initialCrmIntegrations);
  const [testedWebhookResult, setTestedWebhookResult] = useState<string | null>(null);

  // Supabase Database Sync State
  const [dbSyncStatus, setDbSyncStatus] = useState<{ success: boolean; message: string; timestamp: string } | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  // ── SIMULATION SANDBOX STATE ──
  const [simSelectedContact, setSimSelectedContact] = useState<ContactData>(contacts[0] || {
    id: 'cnt_demo', name: 'Sarah Jenkins', email: 'sarah@growthlabs.io', score: 140, tags: ['OptIn'], lastActive: 'Just now', createdDate: '2026-08-01'
  });
  const [simLastAction, setSimLastAction] = useState<string | null>(null);
  const [simWebhookPayload, setSimWebhookPayload] = useState<any | null>(null);
  const [isSimulatingDealWin, setIsSimulatingDealWin] = useState(false);

  // Persist state
  useEffect(() => {
    saveStoredDeals(deals);
  }, [deals]);

  useEffect(() => {
    saveStoredContacts(contacts);
  }, [contacts]);

  const stages: DealData['stage'][] = ['Lead', 'Qualified', 'Proposal', 'Won', 'Lost'];

  const moveDealStage = (dealId: string, newStage: DealData['stage']) => {
    const updated = deals.map((d) => d.id === dealId ? { ...d, stage: newStage } : d);
    setDeals(updated);
    setAppliedToast(`✓ Deal moved to "${newStage}" stage!`);
    setTimeout(() => setAppliedToast(null), 2500);
  };

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter((d) => d.id !== dealId));
    setAppliedToast('✓ Deal removed from pipeline');
    setTimeout(() => setAppliedToast(null), 2500);
  };

  const handleCreateDeal = () => {
    if (!newDealTitle.trim()) return;
    const newDeal: DealData = {
      id: `deal_${Date.now()}`,
      title: newDealTitle,
      value: parseFloat(newDealValue) || 1000,
      contactName: newDealContact || 'New Lead Contact',
      contactEmail: newDealContactEmail || 'lead@example.com',
      stage: 'Lead',
      score: 50,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setDeals([newDeal, ...deals]);
    setIsAddDealOpen(false);
    setNewDealTitle('');
    setNewDealContact('');
    setNewDealContactEmail('');
    setAppliedToast('✓ New deal added to Kanban pipeline!');
    setTimeout(() => setAppliedToast(null), 2500);
  };

  const handleCreateContact = () => {
    if (!newContactEmail.trim()) return;
    const newContact: ContactData = {
      id: `cnt_${Date.now()}`,
      name: newContactName || 'Anonymous Prospect',
      email: newContactEmail,
      phone: newContactPhone || '+1 555-0100',
      score: 50,
      tags: ['Manual Entry', 'OptIn'],
      lastActive: 'Just now',
      createdDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newContact, ...contacts];
    setContacts(updated);
    setSelectedContact(newContact);
    setIsAddContactOpen(false);
    setNewContactName('');
    setNewContactEmail('');
    setAppliedToast('✓ New lead added to CRM database!');
    setTimeout(() => setAppliedToast(null), 2500);
  };

  // Reset to default demo CRM data
  const handleResetCrm = () => {
    if (confirm('Reset CRM contacts and deals to default demo state?')) {
      const reset = resetCrmStorageToDefaults();
      setContacts(reset.contacts);
      setDeals(reset.deals);
      setSelectedContact(reset.contacts[0]);
      setAppliedToast('✓ Reset CRM pipeline & contacts to default demo state!');
      setTimeout(() => setAppliedToast(null), 3000);
    }
  };

  // Trigger Supabase Sync
  const handleTriggerSupabaseSync = async () => {
    setIsSyncingDb(true);
    const res = await syncCrmToSupabase(contacts, deals);
    setDbSyncStatus(res);
    setIsSyncingDb(false);
  };

  // ── SIMULATION HANDLERS ──
  const handleSimulateFunnelTrigger = (actionType: 'optin' | 'vsl_watch' | 'checkout' | 'high_ticket') => {
    let pointsToAdd = 0;
    let tagToAdd = '';
    let actionDesc = '';
    let dealTitle = '';
    let dealVal = 0;

    if (actionType === 'optin') {
      pointsToAdd = 25;
      tagToAdd = 'OptIn_Lead';
      actionDesc = '⚡ Opt-In Form Submitted on Squeeze Page (+25 pts)';
    } else if (actionType === 'vsl_watch') {
      pointsToAdd = 40;
      tagToAdd = 'VSL_Engaged';
      actionDesc = '🎥 Watched 80% of Core VSL Video Stream (+40 pts)';
    } else if (actionType === 'checkout') {
      pointsToAdd = 100;
      tagToAdd = 'Customer_VIP';
      actionDesc = '💳 2-Step Checkout Purchase Completed for $497 (+100 pts)';
      dealTitle = `${simSelectedContact.name} - Front-End Course ($497)`;
      dealVal = 497;
    } else if (actionType === 'high_ticket') {
      pointsToAdd = 150;
      tagToAdd = 'Mastermind_Applicant';
      actionDesc = '👑 High-Ticket Mastermind Application Submitted ($4,997) (+150 pts)';
      dealTitle = `${simSelectedContact.name} - Mastermind Consulting ($4,997)`;
      dealVal = 4997;
    }

    const updatedScore = (simSelectedContact.score || 0) + pointsToAdd;
    const updatedTags = Array.from(new Set([...(simSelectedContact.tags || []), tagToAdd]));
    const updatedContact = {
      ...simSelectedContact,
      score: updatedScore,
      tags: updatedTags,
      lastActive: 'Just now'
    };

    setSimSelectedContact(updatedContact);
    setSimLastAction(actionDesc);

    // Update contacts list
    const updatedList = contacts.map(c => c.id === simSelectedContact.id ? updatedContact : c);
    setContacts(updatedList);

    // If deal generated, add to pipeline
    if (dealVal > 0) {
      const newDeal: DealData = {
        id: `deal_${Date.now()}`,
        title: dealTitle,
        value: dealVal,
        contactName: simSelectedContact.name,
        contactEmail: simSelectedContact.email,
        stage: actionType === 'checkout' ? 'Won' : 'Proposal',
        score: updatedScore,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setDeals([newDeal, ...deals]);
    }

    // Prepare outbound webhook payload
    setSimWebhookPayload({
      event: `crm.lead.${actionType}`,
      timestamp: new Date().toISOString(),
      contact: {
        id: simSelectedContact.id,
        name: simSelectedContact.name,
        email: simSelectedContact.email,
        score: updatedScore,
        tags: updatedTags
      },
      action: actionDesc,
      dealCreated: dealVal > 0 ? { title: dealTitle, value: dealVal } : null
    });
  };

  // Simulate Winning a Deal
  const handleSimulateDealWin = () => {
    setIsSimulatingDealWin(true);
    setTimeout(() => {
      const openDeal = deals.find(d => d.stage !== 'Won') || deals[0];
      if (openDeal) {
        const updated = deals.map(d => d.id === openDeal.id ? { ...d, stage: 'Won' as const } : d);
        setDeals(updated);
        setAppliedToast(`🎉 Deal "${openDeal.title}" marked as WON ($${openDeal.value.toLocaleString()})! Outbound Webhook Dispatched.`);
      }
      setIsSimulatingDealWin(false);
    }, 600);
  };

  // Test Outbound Webhook
  const handleTestIntegrationWebhook = (integration: ThirdPartyIntegration) => {
    setTestedWebhookResult(`⚡ Dispatched test event to ${integration.name} (${integration.endpoint}). HTTP 200 OK.`);
    setTimeout(() => setTestedWebhookResult(null), 4000);
  };

  const calculateStageTotal = (stageName: DealData['stage']) => {
    return deals
      .filter((d) => d.stage === stageName)
      .reduce((sum, d) => sum + d.value, 0);
  };

  const totalPipelineValue = deals.reduce((sum, d) => sum + d.value, 0);
  const totalWonValue = calculateStageTotal('Won');

  // Filtered contacts
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(contactSearchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 flex flex-col overflow-hidden font-sans">
      {/* ── TOP HEADER ── */}
      <div 
        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <Users className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                Funnel Sales Pipeline & CRM
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                Lead Scoring Engine Active
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">
              Pipeline Value: <strong className="text-white font-mono">${totalPipelineValue.toLocaleString()}</strong> • Won: <strong className="text-emerald-300 font-mono">${totalWonValue.toLocaleString()}</strong> • Leads: <strong className="text-white">{contacts.length}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={handleResetCrm}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Reset CRM deals and contacts to default demo state"
          >
            Reset Demo CRM
          </button>

          <button 
            onClick={() => setIsAddDealOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Add Deal</span>
          </button>

          <button 
            onClick={() => setIsAddContactOpen(true)}
            className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white border border-emerald-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>

          <button 
            onClick={handleTriggerSupabaseSync}
            disabled={isSyncingDb}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncingDb ? 'animate-spin' : ''}`} />
            <span>{isSyncingDb ? 'Syncing...' : 'Sync Supabase'}</span>
          </button>
        </div>
      </div>

      {/* ── SUB-NAV BAR ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button 
          onClick={() => setActiveTab('kanban')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'kanban' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Layers className="w-4 h-4" />
          <span>Kanban Pipeline Board</span>
        </button>

        <button 
          onClick={() => setActiveTab('simulations')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'simulations' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Zap className="w-4 h-4" />
          <span>⚡ Simulations & Workflows</span>
        </button>

        <button 
          onClick={() => setActiveTab('contacts')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'contacts' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Users className="w-4 h-4" />
          <span>Leads Database ({contacts.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('integrations')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'integrations' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Globe className="w-4 h-4" />
          <span>🔌 3rd Party Integrations ({integrations.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('database')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Database className="w-4 h-4" />
          <span>Database & Schema</span>
        </button>
      </div>

      {appliedToast && (
        <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-md animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{appliedToast}</span>
        </div>
      )}

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="p-6 flex-1 flex flex-col min-h-0 w-full max-w-[1600px] mx-auto overflow-y-auto">

        {/* ── VIEW 1: KANBAN BOARD ── */}
        {activeTab === 'kanban' && (
          <div className="flex-1 overflow-x-auto overflow-y-hidden flex gap-4 pb-4">
            {stages.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              const totalVal = calculateStageTotal(stage);
              const isWon = stage === 'Won';

              return (
                <div key={stage} className={`w-80 bg-white border ${isWon ? 'border-emerald-300 shadow-md' : 'border-slate-200'} rounded-2xl flex flex-col shrink-0 overflow-hidden shadow-sm`}>
                  {/* Stage Header */}
                  <div className={`p-4 border-b border-slate-100 ${isWon ? 'bg-emerald-50/80' : 'bg-slate-50'} flex items-center justify-between`}>
                    <div>
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">{stage}</h3>
                      <span className="text-xs text-emerald-700 font-mono font-black">${totalVal.toLocaleString()}</span>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shadow-xs">
                      {stageDeals.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {stageDeals.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                        No deals in {stage} stage
                      </div>
                    ) : (
                      stageDeals.map((deal) => (
                        <div key={deal.id} className="p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl space-y-2.5 shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-emerald-700 font-mono">${deal.value.toLocaleString()}</span>
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center gap-1 text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{deal.score} pts</span>
                              </div>
                              <button onClick={() => handleDeleteDeal(deal.id)} className="hover:text-rose-500 text-slate-400 p-0.5">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{deal.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">{deal.contactName} ({deal.contactEmail})</p>
                          </div>

                          {/* Quick Move Stage Select */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                            <span className="text-slate-500 font-semibold">Stage:</span>
                            <select 
                              value={deal.stage}
                              onChange={(e) => moveDealStage(deal.id, e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 text-slate-800 font-bold focus:outline-none"
                            >
                              {stages.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── VIEW 2: SIMULATIONS & WORKFLOWS ── */}
        {activeTab === 'simulations' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">CRM Lead Ingestion & Real-Time Scoring Cascade Simulator</h3>
                    <p className="text-xs text-slate-500">Test live lead capture events, point increments, automated tagging, and outbound webhook dispatches.</p>
                  </div>
                </div>
              </div>

              {/* SIMULATION CONTACT SELECTOR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Simulated Lead</label>
                  <select 
                    value={simSelectedContact.id}
                    onChange={(e) => {
                      const found = contacts.find(c => c.id === e.target.value) || contacts[0];
                      setSimSelectedContact(found);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    {contacts.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.email}) - {c.score} pts</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Dynamic Lead Score</label>
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-xs font-black text-amber-800 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{simSelectedContact.score || 0} Total Lead Points</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Behavioral Tags</label>
                  <div className="flex flex-wrap gap-1">
                    {(simSelectedContact.tags || []).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] rounded font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIMULATION TRIGGER BUTTONS */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono text-[10px]">
                  ⚡ Fire Live Funnel Event:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <button 
                    onClick={() => handleSimulateFunnelTrigger('optin')}
                    className="p-3.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left space-y-1 transition-all"
                  >
                    <div className="font-bold text-xs text-slate-900">🎯 Squeeze Page Opt-In</div>
                    <div className="text-[10px] text-slate-500">+25 Lead Points • Tag: OptIn_Lead</div>
                  </button>

                  <button 
                    onClick={() => handleSimulateFunnelTrigger('vsl_watch')}
                    className="p-3.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left space-y-1 transition-all"
                  >
                    <div className="font-bold text-xs text-slate-900">🎥 VSL 80% Video Watch</div>
                    <div className="text-[10px] text-slate-500">+40 Lead Points • Tag: VSL_Engaged</div>
                  </button>

                  <button 
                    onClick={() => handleSimulateFunnelTrigger('checkout')}
                    className="p-3.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left space-y-1 transition-all"
                  >
                    <div className="font-bold text-xs text-emerald-800">💳 2-Step Checkout ($497)</div>
                    <div className="text-[10px] text-slate-500">+100 Pts • Tag: Customer_VIP • Deals Won</div>
                  </button>

                  <button 
                    onClick={() => handleSimulateFunnelTrigger('high_ticket')}
                    className="p-3.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-left space-y-1 transition-all"
                  >
                    <div className="font-bold text-xs text-teal-800">👑 Mastermind Application</div>
                    <div className="text-[10px] text-slate-500">+150 Pts • $4,997 Proposal Deal Created</div>
                  </button>
                </div>
              </div>

              {simLastAction && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-2 animate-fade-in">
                  <div className="text-xs font-black text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{simLastAction}</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Lead score was dynamically recalculated and recorded into the persistent CRM database.
                  </p>
                </div>
              )}

              {/* LIVE OUTBOUND WEBHOOK PAYLOAD PREVIEW */}
              {simWebhookPayload && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-emerald-600" />
                      Live Outbound Zapier / Make.com JSON Webhook Payload:
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      HTTP 200 OK DISPATCHED
                    </span>
                  </div>
                  <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs max-h-56 overflow-y-auto">
                    <pre>{JSON.stringify(simWebhookPayload, null, 2)}</pre>
                  </div>
                </div>
              )}

              {/* SIMULATE DEAL WIN */}
              <div className="pt-2">
                <button 
                  onClick={handleSimulateDealWin}
                  disabled={isSimulatingDealWin}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  {isSimulatingDealWin ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
                  <span>{isSimulatingDealWin ? 'Simulating Stage Advancement...' : 'SIMULATE KANBAN DEAL ADVANCEMENT TO WON ($ WON CASH COLLECTED) →'}</span>
                </button>
              </div>
            </div>

            {/* 6-STAGE CRM DATA PIPELINE ARCHITECTURE */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                FunnelLegends CRM & Lead Ingestion Pipeline Architecture
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {[
                  { step: '1', title: 'Funnel Opt-In', desc: 'Squeeze & VSL Lead Capture' },
                  { step: '2', title: 'Real-Time Scoring', desc: 'Algorithmic +Pts Attribution' },
                  { step: '3', title: 'Deal Generation', desc: 'Instant Kanban Stage Ingestion' },
                  { step: '4', title: 'Tag Assignment', desc: 'VIP / Buyer / Applicant Flags' },
                  { step: '5', title: '3rd Party Webhook', desc: 'Outbound Zapier / Stripe Stream' },
                  { step: '6', title: 'Retention & Close', desc: '1-Click Upsell & Call Booking' }
                ].map((st) => (
                  <div key={st.step} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center mx-auto">
                      {st.step}
                    </span>
                    <div className="text-xs font-bold text-slate-900">{st.title}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── VIEW 3: LEADS DATABASE ── */}
        {activeTab === 'contacts' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 overflow-hidden flex flex-col shadow-sm">
              {/* Search input */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text" 
                  placeholder="Search leads by name, email, or tag..."
                  value={contactSearchQuery}
                  onChange={(e) => setContactSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-black bg-slate-50 sticky top-0">
                    <tr>
                      <th className="p-3">Contact Lead</th>
                      <th className="p-3">Lead Score</th>
                      <th className="p-3">Tags</th>
                      <th className="p-3">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredContacts.map((cnt) => (
                      <tr 
                        key={cnt.id}
                        onClick={() => setSelectedContact(cnt)}
                        className={`cursor-pointer transition-colors ${selectedContact?.id === cnt.id ? 'bg-emerald-50 text-emerald-950 font-bold' : 'hover:bg-slate-50'}`}
                      >
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{cnt.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{cnt.email}</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{cnt.score} PTS</span>
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {cnt.tags.map((t) => (
                              <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-medium">{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-slate-500 text-[11px] font-mono">{cnt.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contact Details Card */}
            {selectedContact && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
                <div className="pb-4 border-b border-slate-100">
                  <span className="text-[10px] uppercase font-mono font-bold text-emerald-700">CONTACT AUDIT PROFILE</span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{selectedContact.name}</h3>
                  <p className="text-xs font-mono text-slate-500">{selectedContact.email}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 font-medium">Dynamic Lead Score</span>
                    <span className="font-black text-amber-700 text-sm flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                      {selectedContact.score} Points
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-600 font-bold">Assigned Tags:</label>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {selectedContact.tags.map((t) => (
                        <span key={t} className="px-2 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-lg font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <label className="block text-slate-600 font-bold">Activity Audit Timeline:</label>
                    <div className="space-y-2 pt-1 text-[11px] text-slate-700">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        ⚡ Submitted Opt-In Form on VSL Funnel Step (+25 pts)
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        🎥 Watched 85% of VSL Video Stream (+40 pts)
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        💳 Executed 1-Click Post Purchase Upsell (+100 pts)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── VIEW 4: 3RD PARTY INTEGRATIONS ── */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">3rd Party CRM & Marketing Integrations Hub</h3>
                <p className="text-xs text-slate-500">Connect Zapier, Stripe, HubSpot, Twilio SMS, and ActiveCampaign to automate external customer data flows.</p>
              </div>
            </div>

            {testedWebhookResult && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-sm animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{testedWebhookResult}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{item.category}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.status === 'Connected' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                    <div className="text-slate-500 font-mono text-[10px]">Endpoint:</div>
                    <div className="font-mono text-slate-800 truncate font-semibold">{item.endpoint}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex gap-1 flex-wrap">
                      {item.events.map(ev => (
                        <span key={ev} className="text-[9px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {ev}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleTestIntegrationWebhook(item)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Test Endpoint</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VIEW 5: DATABASE & SCHEMA ── */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Supabase SQL Database & Schema Inspector</h3>
                <p className="text-xs text-slate-500">Inspect CRM tables, sync state, and copy production PostgreSQL schema script.</p>
              </div>

              <button 
                onClick={handleTriggerSupabaseSync}
                disabled={isSyncingDb}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingDb ? 'animate-spin' : ''}`} />
                <span>{isSyncingDb ? 'Syncing to Supabase...' : 'Sync to Supabase Now'}</span>
              </button>
            </div>

            {dbSyncStatus && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${dbSyncStatus.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-amber-50 text-amber-900 border-amber-300'}`}>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>{dbSyncStatus.message}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">{dbSyncStatus.timestamp}</span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Total Leads</span>
                <div className="text-xl font-black text-slate-900">{contacts.length} Leads</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Active Deals</span>
                <div className="text-xl font-black text-emerald-700">{deals.length} Deals</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Pipeline Total</span>
                <div className="text-xl font-black text-teal-700">${totalPipelineValue.toLocaleString()}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Integrations</span>
                <div className="text-xl font-black text-green-700">{integrations.length} Connected</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">PostgreSQL / Supabase DDL Migration Script</h4>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(CRM_ENGINE_SQL_SCHEMA);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSchema ? 'Copied SQL Script!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs max-h-96 overflow-y-auto">
                <pre>{CRM_ENGINE_SQL_SCHEMA}</pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CREATE DEAL MODAL ── */}
      {isAddDealOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Pipeline Deal</h3>
              <button onClick={() => setIsAddDealOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Deal Title</label>
                <input type="text" placeholder="e.g. Enterprise Consulting Package" value={newDealTitle} onChange={(e) => setNewDealTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Deal Value ($)</label>
                <input type="number" placeholder="2997" value={newDealValue} onChange={(e) => setNewDealValue(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Contact Name</label>
                <input type="text" placeholder="e.g. Sarah Jenkins" value={newDealContact} onChange={(e) => setNewDealContact(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Contact Email</label>
                <input type="email" placeholder="e.g. sarah@company.io" value={newDealContactEmail} onChange={(e) => setNewDealContactEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={handleCreateDeal} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/25">Create Deal</button>
              <button onClick={() => setIsAddDealOpen(false)} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE CONTACT MODAL ── */}
      {isAddContactOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Lead Contact</h3>
              <button onClick={() => setIsAddContactOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Alex Rivera" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Email Address</label>
                <input type="email" placeholder="alex@company.io" value={newContactEmail} onChange={(e) => setNewContactEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Phone Number</label>
                <input type="text" placeholder="+1 (555) 019-2831" value={newContactPhone} onChange={(e) => setNewContactPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={handleCreateContact} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/25">Add Lead</button>
              <button onClick={() => setIsAddContactOpen(false)} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
