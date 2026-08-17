import React, { useState, useEffect } from 'react';
import { DealData, ContactData } from '../../types/builder';
import { loadStoredDeals, saveStoredDeals, loadStoredContacts, saveStoredContacts } from '../../utils/storage';
import { 
  Users, DollarSign, Plus, Flame, Award, ShieldCheck, Mail, Phone, 
  ChevronRight, Move, Search, Filter, Trash2, X
} from 'lucide-react';

export const CrmPipeline: React.FC = () => {
  const [deals, setDeals] = useState<DealData[]>(loadStoredDeals());
  const [contacts, setContacts] = useState<ContactData[]>(loadStoredContacts());
  const [activeView, setActiveView] = useState<'kanban' | 'contacts'>('kanban');
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(contacts[0] || null);

  // Modals
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealValue, setNewDealValue] = useState('2997');
  const [newDealContact, setNewDealContact] = useState('');

  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');

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
  };

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter((d) => d.id !== dealId));
  };

  const handleCreateDeal = () => {
    if (!newDealTitle.trim()) return;
    const newDeal: DealData = {
      id: `deal_${Date.now()}`,
      title: newDealTitle,
      value: parseFloat(newDealValue) || 1000,
      contactName: newDealContact || 'New Lead Contact',
      contactEmail: 'lead@example.com',
      stage: 'Lead',
      score: 50,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setDeals([newDeal, ...deals]);
    setIsAddDealOpen(false);
    setNewDealTitle('');
  };

  const handleCreateContact = () => {
    if (!newContactEmail.trim()) return;
    const newContact: ContactData = {
      id: `cnt_${Date.now()}`,
      name: newContactName || 'Anonymous Prospect',
      email: newContactEmail,
      phone: '+1 555-0100',
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
  };

  const calculateStageTotal = (stageName: DealData['stage']) => {
    return deals
      .filter((d) => d.stage === stageName)
      .reduce((sum, d) => sum + d.value, 0);
  };

  return (
    <div className="flex-1 bg-gray-50 text-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 bg-green-600 backdrop-blur-md border-b border-green-700 px-6 py-4">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-xs tracking-wider uppercase mb-1">
            <Users className="w-4 h-4 text-white" />
            <span className="bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full">DOMAIN E: INTEGRATED CRM & LEAD SCORING PIPELINE</span>
          </div>
          <h1 className="text-2xl font-black text-white">Funnel Sales Pipeline & Leads</h1>
          <p className="text-xs text-green-100 mt-0.5">Track deal stages, lead scoring activity, and customer purchase histories.</p>
        </div>

        <div className="flex items-center gap-2">
          {activeView === 'kanban' ? (
            <button 
              onClick={() => setIsAddDealOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 text-green-700 border border-green-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Deal</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsAddContactOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 text-green-700 border border-green-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Lead</span>
            </button>
          )}

          <button 
            onClick={() => setActiveView('kanban')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeView === 'kanban' ? 'bg-white text-green-700 shadow-lg shadow-green-600/30 border border-green-500' : 'bg-green-700 text-green-100 hover:text-white border border-green-600'}`}
          >
            Kanban Pipeline Board
          </button>
          <button 
            onClick={() => setActiveView('contacts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeView === 'contacts' ? 'bg-white text-green-700 shadow-lg shadow-green-600/30 border border-green-500' : 'bg-green-700 text-green-100 hover:text-white border border-green-600'}`}
          >
            Leads Database ({contacts.length})
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col min-h-0 w-full max-w-[1600px] mx-auto">

      {/* VIEW 1: KANBAN BOARD */}
      {activeView === 'kanban' && (
        <div className="flex-1 overflow-x-auto overflow-y-hidden flex gap-4 pb-4">
          {stages.map((stage) => {
            const stageDeals = deals.filter((d) => d.stage === stage);
            const totalVal = calculateStageTotal(stage);
            return (
              <div key={stage} className="w-80 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shrink-0 overflow-hidden">
                {/* Stage Header */}
                <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">{stage}</h3>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">${totalVal.toLocaleString()}</span>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                    {stageDeals.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="p-4 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl space-y-2 shadow-lg group transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-indigo-400 font-mono">${deal.value.toLocaleString()}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-extrabold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                            <Flame className="w-3 h-3 fill-current" />
                            <span>Score: {deal.score}</span>
                          </div>
                          <button onClick={() => handleDeleteDeal(deal.id)} className="hover:text-rose-400 text-slate-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100">{deal.title}</h4>
                      <p className="text-[11px] text-slate-400">{deal.contactName} ({deal.contactEmail})</p>

                      {/* Quick Move Stage Select */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Move stage:</span>
                        <select 
                          value={deal.stage}
                          onChange={(e) => moveDealStage(deal.id, e.target.value as any)}
                          className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-300 font-bold"
                        >
                          {stages.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: LEADS DATABASE */}
      {activeView === 'contacts' && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-extrabold">
                <tr>
                  <th className="p-3">Contact Lead</th>
                  <th className="p-3">Lead Score</th>
                  <th className="p-3">Tags</th>
                  <th className="p-3">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {contacts.map((cnt) => (
                  <tr 
                    key={cnt.id}
                    onClick={() => setSelectedContact(cnt)}
                    className={`cursor-pointer transition-colors ${selectedContact?.id === cnt.id ? 'bg-indigo-900/40 text-indigo-200' : 'hover:bg-slate-850'}`}
                  >
                    <td className="p-3">
                      <div className="font-bold text-slate-200">{cnt.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{cnt.email}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-950 text-amber-400 border border-amber-800 inline-flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-current" />
                        <span>{cnt.score} PTS</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {cnt.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded font-medium">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px]">{cnt.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contact Details Card */}
          {selectedContact && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <span className="text-[10px] uppercase font-extrabold text-indigo-400 tracking-wider">CONTACT AUDIT LOG</span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedContact.name}</h3>
                <p className="text-xs font-mono text-slate-400">{selectedContact.email}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-medium">Dynamic Lead Score</span>
                  <span className="font-extrabold text-amber-400 text-sm">{selectedContact.score} Points</span>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400 font-semibold">Activity Timeline:</label>
                  <div className="space-y-2 pt-1 text-[11px] text-slate-300">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      ⚡ Submitted Opt-In Form on VSL Funnel Step (+50 pts)
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      🎥 Watched 85% of VSL Video Stream (+40 pts)
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      💳 Executed 1-Click Post Purchase Upsell (+100 pts)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREATE DEAL MODAL */}
      {isAddDealOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 text-slate-100 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create New Pipeline Deal</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Deal Title</label>
                <input type="text" placeholder="e.g. Enterprise License Deal" value={newDealTitle} onChange={(e) => setNewDealTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Deal Value ($)</label>
                <input type="number" placeholder="2997" value={newDealValue} onChange={(e) => setNewDealValue(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Contact Name</label>
                <input type="text" placeholder="e.g. Sarah Jenkins" value={newDealContact} onChange={(e) => setNewDealContact(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreateDeal} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">Create Deal</button>
              <button onClick={() => setIsAddDealOpen(false)} className="px-4 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CONTACT MODAL */}
      {isAddContactOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 text-slate-100 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create New Lead Contact</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Alex Rivera" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <input type="email" placeholder="alex@company.io" value={newContactEmail} onChange={(e) => setNewContactEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCreateContact} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">Add Lead</button>
              <button onClick={() => setIsAddContactOpen(false)} className="px-4 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
