import React, { useState, useEffect } from 'react';
import { 
  CommissionPlan, AffiliateUser, ReferredTransaction, 
  PromoMaterial, AffiliateContest, BountyPackSettings, AffiliateStatus, PayoutMethod, TransactionStatus 
} from '../../types/affiliate';
import { 
  loadStoredPlans, saveStoredPlans, 
  loadStoredAffiliates, saveStoredAffiliates, 
  loadStoredTransactions, saveStoredTransactions, 
  loadStoredPromoMaterials, saveStoredPromoMaterials, 
  loadStoredContests, saveStoredContests, 
  loadStoredSettings, saveStoredSettings,
  resetBountyPackStorageToDefaults
} from '../../utils/affiliateStorage';
import { syncBountyPackToSupabase, BOUNTYPACK_SQL_SCHEMA } from '../../utils/bountypackDbSync';
import { 
  Users, DollarSign, Award, Gift, Link, Copy, FileText, CheckCircle2, XCircle, 
  Clock, ShieldCheck, Flame, Plus, Search, Filter, ArrowUpRight, Download, 
  RefreshCw, ChevronRight, Eye, Settings, Layers, PieChart, TrendingUp, 
  Sparkles, ExternalLink, Trash2, Edit3, UserPlus, Check, X, AlertCircle, 
  Share2, HelpCircle, CheckSquare, Zap, BarChart2, CornerDownRight, Smartphone, 
  CreditCard, Megaphone, Database, Play, ArrowRight, Server, Terminal, Radio,
  Lock, Activity, Send, CheckCheck, RefreshCcw
} from 'lucide-react';

export const BountyPackAffiliateManager: React.FC = () => {
  // State
  const [plans, setPlans] = useState<CommissionPlan[]>(loadStoredPlans());
  const [affiliates, setAffiliates] = useState<AffiliateUser[]>(loadStoredAffiliates());
  const [transactions, setTransactions] = useState<ReferredTransaction[]>(loadStoredTransactions());
  const [promoMaterials, setPromoMaterials] = useState<PromoMaterial[]>(loadStoredPromoMaterials());
  const [contests, setContests] = useState<AffiliateContest[]>(loadStoredContests());
  const [settings, setSettings] = useState<BountyPackSettings>(loadStoredSettings());

  // Active Main Sub-Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'roster' | 'plans' | 'ledger' | 'payouts' | 'promo_assets' | 'contests' | 'portal' | 'simulations' | 'database' | 'settings'
  >('overview');

  // Roster Filter & Search
  const [rosterFilter, setRosterFilter] = useState<AffiliateStatus | 'All'>('All');
  const [rosterSearch, setRosterSearch] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateUser | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isAddAffiliateOpen, setIsAddAffiliateOpen] = useState(false);

  // Plan Modals (Create & Edit)
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<CommissionPlan | null>(null);
  const [planFormName, setPlanFormName] = useState('');
  const [planFormDesc, setPlanFormDesc] = useState('');
  const [planFormTier1, setPlanFormTier1] = useState('40');
  const [planFormTier2, setPlanFormTier2] = useState('10');
  const [planFormCookieDays, setPlanFormCookieDays] = useState('60');
  const [planFormHoldbackDays, setPlanFormHoldbackDays] = useState('30');

  // Add Affiliate Form State
  const [newAffName, setNewAffName] = useState('');
  const [newAffEmail, setNewAffEmail] = useState('');
  const [newAffCode, setNewAffCode] = useState('');
  const [newAffPlanId, setNewAffPlanId] = useState(plans[0]?.id || 'plan_std_40');
  const [newAffParentId, setNewAffParentId] = useState('');
  const [newAffPayoutMethod, setNewAffPayoutMethod] = useState<PayoutMethod>('PayPal');
  const [newAffPayoutEmail, setNewAffPayoutEmail] = useState('');
  const [newAffStatus, setNewAffStatus] = useState<AffiliateStatus>('Approved');

  // Payout Selection
  const [selectedPayoutIds, setSelectedPayoutIds] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Partner Portal Preview Affiliate Selection
  const [portalAffiliateId, setPortalAffiliateId] = useState<string>(affiliates[0]?.id || '');
  const [portalSubId, setPortalSubId] = useState('campaign_vsl');
  const [portalSelectedProduct, setPortalSelectedProduct] = useState('7-Figure Launch Accelerator System');

  // Promo Add Modal
  const [isAddPromoOpen, setIsAddPromoOpen] = useState(false);
  const [newPromoType, setNewPromoType] = useState<PromoMaterial['type']>('email');
  const [newPromoTitle, setNewPromoTitle] = useState('');
  const [newPromoCategory, setNewPromoCategory] = useState('Email Swipe');
  const [newPromoSubject, setNewPromoSubject] = useState('');
  const [newPromoContent, setNewPromoContent] = useState('');
  const [newPromoImageUrl, setNewPromoImageUrl] = useState('');

  // ── SIMULATION ENGINE STATES ──
  const [simAffiliateId, setSimAffiliateId] = useState<string>(affiliates[1]?.id || affiliates[0]?.id || '');
  const [simProductPrice, setSimProductPrice] = useState('2997');
  const [simProductName, setSimProductName] = useState('7-Figure Launch Accelerator System');
  const [simCustomerName, setSimCustomerName] = useState('Oliver Green');
  const [simCustomerEmail, setSimCustomerEmail] = useState('oliver@scalestrategy.demo');
  const [simFunnelName, setSimFunnelName] = useState('Main VSL Sales Funnel');
  const [simResultNotification, setSimResultNotification] = useState<{
    orderId: string;
    tier1Name: string;
    tier1Amount: number;
    tier2Name?: string;
    tier2Amount?: number;
    gross: number;
  } | null>(null);
  const [isSimulatingSale, setIsSimulatingSale] = useState(false);

  // Cookie simulation
  const [simCookieVisitorEmail, setSimCookieVisitorEmail] = useState('visitor_lead_99@gmail.com');
  const [simCookieAffCode, setSimCookieAffCode] = useState('SARAHGLOW');
  const [simCookieDuration, setSimCookieDuration] = useState('60');
  const [simCookieStatus, setSimCookieStatus] = useState<string | null>(null);

  // Clawback simulation
  const [selectedClawbackTxId, setSelectedClawbackTxId] = useState<string>(transactions[0]?.id || '');
  const [clawbackStatusNotice, setClawbackStatusNotice] = useState<string | null>(null);

  // Webhook Simulation
  const [webhookSimOutput, setWebhookSimOutput] = useState<string | null>(null);

  // Supabase Sync Status
  const [dbSyncStatus, setDbSyncStatus] = useState<{ success: boolean; message: string; timestamp: string } | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Persist edits to localStorage
  useEffect(() => { saveStoredPlans(plans); }, [plans]);
  useEffect(() => { saveStoredAffiliates(affiliates); }, [affiliates]);
  useEffect(() => { saveStoredTransactions(transactions); }, [transactions]);
  useEffect(() => { saveStoredPromoMaterials(promoMaterials); }, [promoMaterials]);
  useEffect(() => { saveStoredContests(contests); }, [contests]);
  useEffect(() => { saveStoredSettings(settings); }, [settings]);

  // Derived Metrics
  const totalGrossRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCommissionEarned = transactions.reduce((acc, curr) => acc + curr.commissionAmount, 0);
  const totalCommissionPaid = affiliates.reduce((acc, curr) => acc + curr.commissionPaid, 0);
  const totalPendingPayout = Math.max(0, totalCommissionEarned - totalCommissionPaid);
  const pendingAppsCount = affiliates.filter(a => a.status === 'Pending').length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Status Change handlers
  const handleUpdateAffiliateStatus = (id: string, newStatus: AffiliateStatus) => {
    const updated = affiliates.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setAffiliates(updated);
    if (selectedAffiliate && selectedAffiliate.id === id) {
      setSelectedAffiliate({ ...selectedAffiliate, status: newStatus });
    }
  };

  // Transaction Status change
  const handleUpdateTransactionStatus = (id: string, newStatus: TransactionStatus) => {
    const updated = transactions.map(t => t.id === id ? { ...t, status: newStatus } : t);
    setTransactions(updated);
  };

  // Create or Update Plan
  const handleSavePlan = () => {
    if (!planFormName.trim()) return;

    if (editingPlan) {
      // Update existing
      const updated = plans.map(p => p.id === editingPlan.id ? {
        ...p,
        name: planFormName,
        description: planFormDesc || 'Custom affiliate tier plan',
        tier1Rate: parseFloat(planFormTier1) || 40,
        tier2Rate: parseFloat(planFormTier2) || 10,
        stickyCookieDays: parseInt(planFormCookieDays) || 60,
        holdbackDays: parseInt(planFormHoldbackDays) || 30
      } : p);
      setPlans(updated);
    } else {
      // Create new
      const newPlan: CommissionPlan = {
        id: `plan_${Date.now()}`,
        name: planFormName,
        description: planFormDesc || 'Custom affiliate tier plan',
        isDefault: false,
        tier1Rate: parseFloat(planFormTier1) || 40,
        tier1Type: 'percentage',
        tier2Rate: parseFloat(planFormTier2) || 10,
        tier2Type: 'percentage',
        stickyCookieDays: parseInt(planFormCookieDays) || 60,
        holdbackDays: parseInt(planFormHoldbackDays) || 30,
        productOverrides: []
      };
      setPlans([...plans, newPlan]);
    }

    setIsPlanModalOpen(false);
    setEditingPlan(null);
    setPlanFormName('');
    setPlanFormDesc('');
  };

  const handleOpenEditPlan = (plan: CommissionPlan) => {
    setEditingPlan(plan);
    setPlanFormName(plan.name);
    setPlanFormDesc(plan.description);
    setPlanFormTier1(plan.tier1Rate.toString());
    setPlanFormTier2(plan.tier2Rate.toString());
    setPlanFormCookieDays(plan.stickyCookieDays.toString());
    setPlanFormHoldbackDays(plan.holdbackDays.toString());
    setIsPlanModalOpen(true);
  };

  const handleDeletePlan = (planId: string) => {
    if (plans.length <= 1) {
      alert('Must maintain at least 1 default commission plan.');
      return;
    }
    const target = plans.find(p => p.id === planId);
    if (target?.isDefault) {
      alert('Cannot delete the default system plan.');
      return;
    }
    if (confirm('Delete this commission plan?')) {
      setPlans(plans.filter(p => p.id !== planId));
    }
  };

  // Add New Affiliate
  const handleAddAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffName.trim() || !newAffEmail.trim() || !newAffCode.trim()) return;

    const newPartner: AffiliateUser = {
      id: `aff_${Date.now()}`,
      affiliateCode: newAffCode.toUpperCase().replace(/\s+/g, '_'),
      name: newAffName,
      email: newAffEmail,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (affiliates.length * 100)}?w=150&auto=format&fit=crop&q=80`,
      status: newAffStatus,
      planId: newAffPlanId,
      parentAffiliateId: newAffParentId || undefined,
      payoutMethod: newAffPayoutMethod,
      payoutEmail: newAffPayoutEmail || newAffEmail,
      joinedDate: new Date().toISOString().split('T')[0],
      totalClicks: 0,
      totalLeads: 0,
      totalSalesCount: 0,
      grossRevenue: 0,
      commissionEarned: 0,
      commissionPaid: 0,
      pendingHoldback: 0,
      customNotes: 'Manually onboarded by Admin.'
    };

    setAffiliates([newPartner, ...affiliates]);
    setIsAddAffiliateOpen(false);
    setNewAffName('');
    setNewAffEmail('');
    setNewAffCode('');
    setNewAffPayoutEmail('');
  };

  // Execute Mass Payout
  const handleBatchPayout = () => {
    if (selectedPayoutIds.length === 0) return;
    const updatedAffiliates = affiliates.map(aff => {
      if (selectedPayoutIds.includes(aff.id)) {
        const unpaid = aff.commissionEarned - aff.commissionPaid;
        return {
          ...aff,
          commissionPaid: aff.commissionPaid + unpaid
        };
      }
      return aff;
    });
    setAffiliates(updatedAffiliates);
    // Mark approved transactions as paid
    const updatedTx = transactions.map(t => {
      if (selectedPayoutIds.includes(t.affiliateId) && t.status === 'Approved') {
        return { ...t, status: 'Paid' as TransactionStatus };
      }
      return t;
    });
    setTransactions(updatedTx);
    setSelectedPayoutIds([]);
    alert(`Successfully processed payout for ${selectedPayoutIds.length} partners!`);
  };

  // Download Mass Payout CSV (PayPal MassPay format)
  const handleDownloadPayoutCsv = () => {
    const readyAffiliates = affiliates.filter(a => (a.commissionEarned - a.commissionPaid) >= settings.minimumPayoutAmount);
    if (readyAffiliates.length === 0) {
      alert('No affiliates meet the minimum payout threshold.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,RecipientEmail,PayoutAmount,Currency,AffiliateCode,Note\n';
    readyAffiliates.forEach(aff => {
      const amount = (aff.commissionEarned - aff.commissionPaid).toFixed(2);
      csvContent += `${aff.payoutEmail},${amount},USD,${aff.affiliateCode},BountyPack Partner Commission Payout\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bountypack_masspay_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Promo Material
  const handleAddPromo = () => {
    if (!newPromoTitle.trim() || !newPromoContent.trim()) return;
    const newAsset: PromoMaterial = {
      id: `promo_${Date.now()}`,
      type: newPromoType,
      title: newPromoTitle,
      category: newPromoCategory || (newPromoType === 'email' ? 'Email Swipe' : newPromoType === 'banner' ? 'Banner Ad' : 'Social Asset'),
      subjectLine: newPromoSubject,
      content: newPromoContent,
      imageUrl: newPromoImageUrl || undefined,
      downloadsCount: 0
    };
    setPromoMaterials([newAsset, ...promoMaterials]);
    setIsAddPromoOpen(false);
    setNewPromoTitle('');
    setNewPromoSubject('');
    setNewPromoContent('');
    setNewPromoImageUrl('');
  };

  // Reset to default demo data
  const handleResetDefaults = () => {
    if (confirm('Reset all BountyPack affiliate data back to initial demo state?')) {
      resetBountyPackStorageToDefaults();
      setPlans(loadStoredPlans());
      setAffiliates(loadStoredAffiliates());
      setTransactions(loadStoredTransactions());
      setPromoMaterials(loadStoredPromoMaterials());
      setContests(loadStoredContests());
      setSettings(loadStoredSettings());
      setSimResultNotification(null);
      alert('BountyPack data reset to factory demo state.');
    }
  };

  // ── SIMULATION 1: RUN LIVE REFERRED SALE ──
  const handleSimulateReferredSale = () => {
    const affiliate = affiliates.find(a => a.id === simAffiliateId);
    if (!affiliate) {
      alert('Please select an active affiliate.');
      return;
    }

    setIsSimulatingSale(true);

    setTimeout(() => {
      const orderAmount = parseFloat(simProductPrice) || 2997;
      const assignedPlan = plans.find(p => p.id === affiliate.planId) || plans[0];
      
      // Calculate Tier 1 Direct Commission
      const tier1Rate = assignedPlan.tier1Rate;
      const tier1Commission = assignedPlan.tier1Type === 'percentage' 
        ? (orderAmount * (tier1Rate / 100))
        : tier1Rate;

      const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      const newTransactions: ReferredTransaction[] = [];

      // 1. Add Tier 1 Transaction
      const txTier1: ReferredTransaction = {
        id: `tx_${Date.now()}_1`,
        orderId,
        customerName: simCustomerName,
        customerEmail: simCustomerEmail,
        productName: simProductName,
        amount: orderAmount,
        affiliateId: affiliate.id,
        affiliateCode: affiliate.affiliateCode,
        tier: 1,
        commissionAmount: tier1Commission,
        status: 'Approved',
        date: new Date().toISOString().split('T')[0],
        funnelName: simFunnelName
      };
      newTransactions.push(txTier1);

      // Check if Parent Affiliate exists for Tier 2 Sub-Kickback
      let parentAffiliate = affiliate.parentAffiliateId ? affiliates.find(a => a.id === affiliate.parentAffiliateId) : null;
      let tier2Commission = 0;

      if (parentAffiliate) {
        const tier2Rate = assignedPlan.tier2Rate;
        tier2Commission = assignedPlan.tier2Type === 'percentage'
          ? (orderAmount * (tier2Rate / 100))
          : tier2Rate;

        const txTier2: ReferredTransaction = {
          id: `tx_${Date.now()}_2`,
          orderId,
          customerName: simCustomerName,
          customerEmail: simCustomerEmail,
          productName: simProductName,
          amount: orderAmount,
          affiliateId: parentAffiliate.id,
          affiliateCode: parentAffiliate.affiliateCode,
          tier: 2,
          commissionAmount: tier2Commission,
          status: 'Approved',
          date: new Date().toISOString().split('T')[0],
          funnelName: simFunnelName
        };
        newTransactions.push(txTier2);
      }

      // Update Affiliates Stats
      const updatedAffiliates = affiliates.map(a => {
        if (a.id === affiliate.id) {
          return {
            ...a,
            totalSalesCount: a.totalSalesCount + 1,
            grossRevenue: a.grossRevenue + orderAmount,
            commissionEarned: a.commissionEarned + tier1Commission,
            pendingHoldback: a.pendingHoldback + tier1Commission
          };
        }
        if (parentAffiliate && a.id === parentAffiliate.id) {
          return {
            ...a,
            commissionEarned: a.commissionEarned + tier2Commission,
            pendingHoldback: a.pendingHoldback + tier2Commission
          };
        }
        return a;
      });

      setAffiliates(updatedAffiliates);
      setTransactions([...newTransactions, ...transactions]);
      setIsSimulatingSale(false);

      setSimResultNotification({
        orderId,
        tier1Name: affiliate.name,
        tier1Amount: tier1Commission,
        tier2Name: parentAffiliate?.name,
        tier2Amount: tier2Commission,
        gross: orderAmount
      });
    }, 600);
  };

  // ── SIMULATION 2: STICKY COOKIE ATTRIBUTION ──
  const handleSimulateCookieDrop = () => {
    setSimCookieStatus(
      `🍪 Sticky Cookie Stored in Local Session! Tied Email [${simCookieVisitorEmail}] to Affiliate [${simCookieAffCode}] for ${simCookieDuration} days. Any purchase by this email will auto-attribute even on direct visits.`
    );
  };

  // ── SIMULATION 3: CLAWBACK SIMULATION ──
  const handleSimulateClawback = () => {
    const tx = transactions.find(t => t.id === selectedClawbackTxId);
    if (!tx) return;

    if (tx.status === 'ClawedBack') {
      setClawbackStatusNotice(`Order ${tx.orderId} is already clawed back.`);
      return;
    }

    const updatedTx = transactions.map(t => t.id === tx.id ? { ...t, status: 'ClawedBack' as TransactionStatus } : t);
    setTransactions(updatedTx);

    // Adjust affiliate earned
    const updatedAff = affiliates.map(a => {
      if (a.id === tx.affiliateId) {
        return {
          ...a,
          commissionEarned: Math.max(0, a.commissionEarned - tx.commissionAmount),
          pendingHoldback: Math.max(0, a.pendingHoldback - tx.commissionAmount)
        };
      }
      return a;
    });
    setAffiliates(updatedAff);

    setClawbackStatusNotice(
      `✅ Commission Clawback Complete! Order ${tx.orderId} status set to ClawedBack. $${tx.commissionAmount.toFixed(2)} deducted from ${tx.affiliateCode}'s balance.`
    );
  };

  // ── SIMULATION 4: TEST WEBHOOK DISPATCH ──
  const handleSimulateWebhook = () => {
    const payload = {
      event: 'bountypack.commission.created',
      timestamp: new Date().toISOString(),
      platform: 'FunnelLegends BountyPack v2.0',
      data: {
        orderId: 'ORD-99381',
        grossAmount: 2997.00,
        currency: 'USD',
        affiliate: {
          code: 'HORMOZI',
          name: 'Alex Hormozi',
          tier: 1,
          commissionRate: '50%',
          commissionEarned: 1498.50,
          payoutEmail: 'payouts@acquisition.demo'
        },
        stickyCookie: {
          daysRemaining: 365,
          attributionMode: settings.cookieAttributionMode
        }
      }
    };
    setWebhookSimOutput(JSON.stringify(payload, null, 2));
  };

  // ── SUPABASE SYNC TRIGGER ──
  const handleTriggerSupabaseSync = async () => {
    setIsSyncingDb(true);
    const res = await syncBountyPackToSupabase(plans, affiliates, transactions, settings);
    setDbSyncStatus(res);
    setIsSyncingDb(false);
  };

  // Filtered Roster
  const filteredAffiliates = affiliates.filter(aff => {
    const matchesFilter = rosterFilter === 'All' || aff.status === rosterFilter;
    const matchesSearch = aff.name.toLowerCase().includes(rosterSearch.toLowerCase()) || 
                          aff.email.toLowerCase().includes(rosterSearch.toLowerCase()) || 
                          aff.affiliateCode.toLowerCase().includes(rosterSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activePortalUser = affiliates.find(a => a.id === portalAffiliateId) || affiliates[0];

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      {/* ── TOP BOUNTYPACK BRAND HEADER ── */}
      <div 
        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <Gift className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                BountyPack
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                2-Tier Affiliate Engine
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">Complete partner recruitment, commission tracking, sticky cookies & MassPay engine.</p>
          </div>
        </div>

        {/* Action Controls Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => setActiveTab('simulations')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${activeTab === 'simulations' ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20 font-black' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>⚡ Fun Simulations</span>
          </button>

          <button 
            onClick={() => setActiveTab('portal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${activeTab === 'portal' ? 'bg-white text-emerald-800 border-white shadow-emerald-900/20 font-black' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}`}
          >
            <Eye className="w-4 h-4 text-emerald-200" />
            <span>Partner Portal</span>
          </button>
          
          <button 
            onClick={() => { setEditingPlan(null); setPlanFormName(''); setPlanFormDesc(''); setIsPlanModalOpen(true); }}
            className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>New Plan</span>
          </button>

          <button 
            onClick={handleDownloadPayoutCsv}
            className="px-3.5 py-2 bg-emerald-950/40 hover:bg-emerald-950/60 text-white border border-emerald-400/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>MassPay CSV</span>
          </button>

          <button 
            onClick={handleResetDefaults}
            className="p-2 bg-white/10 hover:bg-rose-500/30 text-white hover:text-rose-200 border border-white/20 rounded-xl text-xs transition-all"
            title="Reset to Demo State"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── SECONDARY BOUNTYPACK TAB NAVIGATION ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button 
          onClick={() => setActiveTab('roster')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 relative ${activeTab === 'roster' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Users className="w-4 h-4" />
          <span>Affiliate Roster ({affiliates.length})</span>
          {pendingAppsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center animate-bounce">
              {pendingAppsCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('plans')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'plans' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Layers className="w-4 h-4" />
          <span>Commission Plans ({plans.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('ledger')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'ledger' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <FileText className="w-4 h-4" />
          <span>Sales Ledger</span>
        </button>

        <button 
          onClick={() => setActiveTab('payouts')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'payouts' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Mass Payouts</span>
        </button>

        <button 
          onClick={() => setActiveTab('promo_assets')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'promo_assets' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Promo Swipes</span>
        </button>

        <button 
          onClick={() => setActiveTab('contests')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'contests' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Award className="w-4 h-4" />
          <span>Contests & Ranks</span>
        </button>

        <button 
          onClick={() => setActiveTab('portal')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'portal' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Eye className="w-4 h-4" />
          <span>Partner Portal</span>
        </button>

        <button 
          onClick={() => setActiveTab('simulations')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'simulations' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/25 font-black' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'}`}
        >
          <Zap className="w-4 h-4 fill-amber-500" />
          <span>Simulations & Workflows</span>
        </button>

        <button 
          onClick={() => setActiveTab('database')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Database className="w-4 h-4" />
          <span>Database & Schema</span>
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      <div className="p-6 flex-1 max-w-[1600px] w-full mx-auto space-y-6">
        
        {/* ── SIMULATION RECEIPT TOAST NOTIFICATION ── */}
        {simResultNotification && (
          <div className="bg-emerald-900 text-white border-2 border-emerald-400 rounded-2xl p-5 shadow-2xl animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 font-black">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-black text-white">Live Commission Simulation Success!</h4>
                  <span className="px-2 py-0.5 bg-emerald-800 text-emerald-200 rounded font-mono text-[10px] font-bold">{simResultNotification.orderId}</span>
                </div>
                <p className="text-xs text-emerald-100 mt-1">
                  Referred Gross: <strong className="text-white">${simResultNotification.gross.toLocaleString()}</strong> • 
                  Tier 1 to <strong>{simResultNotification.tier1Name}</strong>: <strong className="text-emerald-300">+${simResultNotification.tier1Amount.toFixed(2)}</strong>
                  {simResultNotification.tier2Name && (
                    <span> • Tier 2 Kickback to <strong>{simResultNotification.tier2Name}</strong>: <strong className="text-amber-300">+${simResultNotification.tier2Amount?.toFixed(2)}</strong></span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => setActiveTab('ledger')}
                className="px-3 py-1.5 bg-white text-emerald-950 hover:bg-emerald-100 rounded-xl text-xs font-black transition-all"
              >
                View in Ledger →
              </button>
              <button 
                onClick={() => setSimResultNotification(null)}
                className="p-1.5 text-emerald-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── TAB 1: OVERVIEW DASHBOARD ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Referred Gross Sales</p>
                  <h3 className="text-2xl font-black text-slate-900">${totalGrossRevenue.toLocaleString()}</h3>
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +28.4% live affiliate attribution
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Total Commissions Earned</p>
                  <h3 className="text-2xl font-black text-teal-700">${totalCommissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </div>
                <div className="text-[11px] text-teal-700 font-bold">
                  Average commission ~42.1%
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Pending Payout Balance</p>
                  <h3 className="text-2xl font-black text-amber-600">${totalPendingPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </div>
                <div className="text-[11px] text-amber-700 font-bold">
                  {transactions.filter(t => t.status === 'Approved').length} approved orders ready for batch pay
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center border border-green-200">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Active Partners & Affiliates</p>
                  <h3 className="text-2xl font-black text-green-700">{affiliates.length}</h3>
                </div>
                <div className="text-[11px] text-green-700 font-bold">
                  {affiliates.filter(a => a.status === 'VIP').length} VIP Super-Affiliates
                </div>
              </div>
            </div>

            {/* SECONDARY ROW: 2-TIER KICKBACK & QUICK ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 2-Tier Breakdown Card */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h3 className="text-base font-black text-slate-900">2-Tier Commission Distribution</h3>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Sticky Cookies Active ({settings.defaultStickyCookieDays} Days)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Tier 1 Direct Referrals</span>
                      <span className="text-xs text-emerald-700 font-mono font-black bg-emerald-100 px-2 py-0.5 rounded">40% - 50%</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                      ${transactions.filter(t => t.tier === 1).reduce((acc, c) => acc + c.commissionAmount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium">Direct sales attributed to primary partner tracking links.</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Tier 2 Sub-Affiliate Network</span>
                      <span className="text-xs text-teal-700 font-mono font-black bg-teal-100 px-2 py-0.5 rounded">10% - 15%</span>
                    </div>
                    <p className="text-2xl font-black text-teal-700">
                      ${transactions.filter(t => t.tier === 2).reduce((acc, c) => acc + c.commissionAmount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium">Passive kickbacks earned by parent affiliates recruiting sub-partners.</p>
                  </div>
                </div>

                {/* Sticky Cookie Engine Status */}
                <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-black text-emerald-950">BountyPack Sticky Cookie Attribution Engine</h4>
                      <p className="text-[11px] text-emerald-800">When a customer buys, sticky cookies permanently tie their email to the referrer for future upsells & recurring subscription commissions.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[10px] font-mono font-black shrink-0">ACTIVE</span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Quick Actions
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Manage partner applications, commission tiers and simulations.</p>
                </div>

                <div className="space-y-2.5">
                  <button 
                    onClick={() => setActiveTab('simulations')}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-between shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Run Live Commission Simulation</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('roster')}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-emerald-600" />
                      <span>Review Pending Applications</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-mono rounded font-black">{pendingAppsCount}</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('payouts')}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>Process Ready Payouts</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('portal')}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-teal-600" />
                      <span>Partner Portal Preview</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* RECENT SALES STREAM */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">Recent Referred Transactions</h3>
                  <p className="text-xs text-slate-500">Live sales stream linked to affiliate tracking codes.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('ledger')}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  View Full Sales Ledger <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-mono text-[10px]">
                      <th className="py-2.5 px-3 font-bold">Order ID</th>
                      <th className="py-2.5 px-3 font-bold">Customer</th>
                      <th className="py-2.5 px-3 font-bold">Product</th>
                      <th className="py-2.5 px-3 font-bold">Order Value</th>
                      <th className="py-2.5 px-3 font-bold">Partner Code</th>
                      <th className="py-2.5 px-3 font-bold">Tier</th>
                      <th className="py-2.5 px-3 font-bold">Commission</th>
                      <th className="py-2.5 px-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {transactions.slice(0, 6).map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-emerald-700">{tx.orderId}</td>
                        <td className="py-3 px-3 text-slate-900 font-bold">{tx.customerName}</td>
                        <td className="py-3 px-3 text-slate-600">{tx.productName}</td>
                        <td className="py-3 px-3 font-black text-slate-900">${tx.amount.toLocaleString()}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded font-mono text-[11px] font-bold">
                            {tx.affiliateCode}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${tx.tier === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}`}>
                            Tier {tx.tier}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-black text-emerald-600">${tx.commissionAmount.toFixed(2)}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            tx.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            tx.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                            tx.status === 'Paid' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                            'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: AFFILIATE ROSTER ── */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Affiliate Partner Roster</h3>
                <p className="text-xs text-slate-500">Manage partners, assign commission plans, approve applicants & inspect 2-tier networks.</p>
              </div>

              <button 
                onClick={() => setIsAddAffiliateOpen(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Partner Manually</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Search by partner name, email, or ref code..."
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['All', 'Approved', 'Pending', 'VIP', 'Denied'] as const).map(status => (
                  <button 
                    key={status}
                    onClick={() => setRosterFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${rosterFilter === status ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'}`}
                  >
                    {status}
                    {status === 'Pending' && pendingAppsCount > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[10px] rounded-full font-black">
                        {pendingAppsCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Affiliates Grid Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-mono text-[10px]">
                    <th className="py-3 px-4 font-bold">Affiliate / Partner</th>
                    <th className="py-3 px-4 font-bold">Ref Code</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">Commission Plan</th>
                    <th className="py-3 px-4 font-bold">Sales / Rev</th>
                    <th className="py-3 px-4 font-bold">Earned / Paid</th>
                    <th className="py-3 px-4 font-bold">Payout Method</th>
                    <th className="py-3 px-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAffiliates.map(aff => {
                    const assignedPlan = plans.find(p => p.id === aff.planId) || plans[0];
                    const parentAff = affiliates.find(a => a.id === aff.parentAffiliateId);

                    return (
                      <tr key={aff.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Name & Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img src={aff.avatar} alt={aff.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{aff.name}</span>
                                {parentAff && (
                                  <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5" title={`Referred by ${parentAff.name}`}>
                                    <CornerDownRight className="w-3 h-3" /> Sub-Tier of {parentAff.name}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500">{aff.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Ref Code */}
                        <td className="py-3.5 px-4">
                          <button 
                            onClick={() => handleCopy(`${settings.affiliateDomainUrl}?ref=${aff.affiliateCode}`, aff.id)}
                            className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:border-emerald-500 text-emerald-800 rounded font-mono text-xs font-bold flex items-center gap-1.5 group"
                          >
                            <span>{aff.affiliateCode}</span>
                            {copiedLink === aff.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />}
                          </button>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                            aff.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                            aff.status === 'VIP' ? 'bg-purple-100 text-purple-800 border border-purple-300 shadow-sm' :
                            aff.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse' :
                            'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {aff.status}
                          </span>
                        </td>

                        {/* Plan */}
                        <td className="py-3.5 px-4">
                          <span className="text-slate-700 font-medium">{assignedPlan?.name || 'Standard'}</span>
                        </td>

                        {/* Sales / Rev */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-slate-900">{aff.totalSalesCount} sales</div>
                          <div className="text-[11px] text-slate-500">${aff.grossRevenue.toLocaleString()} gross</div>
                        </td>

                        {/* Earned / Paid */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-emerald-600">${aff.commissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                          <div className="text-[11px] text-slate-500">${aff.commissionPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })} paid</div>
                        </td>

                        {/* Payout method */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded text-[11px] border border-slate-200 font-mono">
                            {aff.payoutMethod}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {aff.applicationAnswers && (
                            <button 
                              onClick={() => { setSelectedAffiliate(aff); setIsAppModalOpen(true); }}
                              className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200"
                              title="View Application Details"
                            >
                              App Details
                            </button>
                          )}

                          {aff.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleUpdateAffiliateStatus(aff.id, 'Approved')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-sm"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleUpdateAffiliateStatus(aff.id, 'Denied')}
                                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {aff.status === 'Approved' && (
                            <button 
                              onClick={() => handleUpdateAffiliateStatus(aff.id, 'VIP')}
                              className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-bold"
                            >
                              Upgrade VIP
                            </button>
                          )}

                          <button 
                            onClick={() => { setPortalAffiliateId(aff.id); setActiveTab('portal'); }}
                            className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-bold"
                            title="Preview Partner Portal as this affiliate"
                          >
                            Portal
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: COMMISSION PLANS & 2-TIER STRUCTURES ── */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Commission Tiers & Plans</h3>
                <p className="text-xs text-slate-500">Configure 1st-Tier direct payouts, 2nd-Tier sub-affiliate kickbacks, product overrides & sticky cookies.</p>
              </div>

              <button 
                onClick={() => { setEditingPlan(null); setPlanFormName(''); setPlanFormDesc(''); setIsPlanModalOpen(true); }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Plan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map(plan => (
                <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm hover:border-emerald-400 transition-all relative flex flex-col justify-between">
                  {plan.isDefault && (
                    <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full">
                      DEFAULT SYSTEM PLAN
                    </span>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-slate-900">{plan.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-bold">1st-Tier Direct Payout:</span>
                      <span className="font-black text-emerald-600 font-mono text-sm">
                        {plan.tier1Type === 'percentage' ? `${plan.tier1Rate}%` : `$${plan.tier1Rate}`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-bold">2nd-Tier Sub-Kickback:</span>
                      <span className="font-black text-teal-600 font-mono text-sm">
                        {plan.tier2Type === 'percentage' ? `${plan.tier2Rate}%` : `$${plan.tier2Rate}`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
                      <span className="text-slate-600 font-bold">Sticky Cookie Duration:</span>
                      <span className="font-black text-amber-700 font-mono">{plan.stickyCookieDays} Days</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-bold">Refund Holdback Period:</span>
                      <span className="font-black text-slate-700 font-mono">{plan.holdbackDays} Days</span>
                    </div>
                  </div>

                  {/* Product Overrides */}
                  {plan.productOverrides && plan.productOverrides.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase font-mono">Custom Product Overrides ({plan.productOverrides.length})</span>
                      <div className="space-y-1.5">
                        {plan.productOverrides.map((ov, idx) => (
                          <div key={idx} className="p-2 bg-slate-50 rounded-lg text-[11px] flex items-center justify-between border border-slate-200">
                            <span className="text-slate-800 font-medium truncate max-w-[180px]">{ov.productName}</span>
                            <span className="font-mono font-black text-emerald-600">
                              {ov.overrideType === 'percentage' ? `${ov.overrideRate}%` : `$${ov.overrideRate}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenEditPlan(plan)}
                      className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Edit Plan Rules</span>
                    </button>

                    {!plan.isDefault && (
                      <button 
                        onClick={() => handleDeletePlan(plan.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 text-xs"
                        title="Delete Plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: SALES LEDGER ── */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Referred Sales Ledger</h3>
                <p className="text-xs text-slate-500">Audit sales attribution, 2-tier commission split allocations, and holdback statuses.</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveTab('simulations')}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Simulate New Sale</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-mono text-[10px]">
                    <th className="py-3.5 px-4 font-bold">Date</th>
                    <th className="py-3.5 px-4 font-bold">Order ID</th>
                    <th className="py-3.5 px-4 font-bold">Customer</th>
                    <th className="py-3.5 px-4 font-bold">Product / Funnel</th>
                    <th className="py-3.5 px-4 font-bold">Order Total</th>
                    <th className="py-3.5 px-4 font-bold">Affiliate Code</th>
                    <th className="py-3.5 px-4 font-bold">Tier Split</th>
                    <th className="py-3.5 px-4 font-bold">Commission</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-500">{tx.date}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{tx.orderId}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{tx.customerName}</div>
                        <div className="text-[11px] text-slate-500">{tx.customerEmail}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{tx.productName}</div>
                        <div className="text-[10px] text-teal-700 font-mono">{tx.funnelName}</div>
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900 font-mono">${tx.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">{tx.affiliateCode}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${tx.tier === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}`}>
                          Tier {tx.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-emerald-600 font-mono">${tx.commissionAmount.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                          tx.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          tx.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          tx.status === 'Paid' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                          'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        {tx.status === 'Pending' && (
                          <button 
                            onClick={() => handleUpdateTransactionStatus(tx.id, 'Approved')}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold"
                          >
                            Approve
                          </button>
                        )}
                        {tx.status !== 'ClawedBack' && (
                          <button 
                            onClick={() => handleUpdateTransactionStatus(tx.id, 'ClawedBack')}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-[11px] font-bold"
                            title="Clawback commission on refund"
                          >
                            Clawback
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 5: PAYOUTS ENGINE ── */}
        {activeTab === 'payouts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-bold">Total Unpaid Balance Owed</span>
                <h3 className="text-2xl font-black text-amber-600">${totalPendingPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                <p className="text-[11px] text-slate-500 font-medium">Commissions past holdback window</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-bold">Minimum Payout Rule</span>
                <h3 className="text-2xl font-black text-emerald-700">${settings.minimumPayoutAmount}.00</h3>
                <p className="text-[11px] text-slate-500 font-medium">Threshold required before payout release</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <span className="text-xs text-slate-500 font-bold">Lifetime Paid Out</span>
                <h3 className="text-2xl font-black text-teal-700">${totalCommissionPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                <p className="text-[11px] text-slate-500 font-medium">Processed via PayPal MassPay & CSV exports</p>
              </div>
            </div>

            {/* Payout Table & Selection */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-slate-900">Ready Payout Queue</h3>
                  <p className="text-xs text-slate-500">Select partners to issue batch payouts or export CSV file.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleBatchPayout}
                    disabled={selectedPayoutIds.length === 0}
                    className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all ${selectedPayoutIds.length > 0 ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Mark Selected as Paid ({selectedPayoutIds.length})</span>
                  </button>

                  <button 
                    onClick={handleDownloadPayoutCsv}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-emerald-300" />
                    <span>Export PayPal CSV</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-mono text-[10px]">
                      <th className="py-3 px-4 w-10">
                        <input 
                          type="checkbox"
                          checked={selectedPayoutIds.length === affiliates.filter(a => (a.commissionEarned - a.commissionPaid) > 0).length && affiliates.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPayoutIds(affiliates.filter(a => (a.commissionEarned - a.commissionPaid) > 0).map(a => a.id));
                            } else {
                              setSelectedPayoutIds([]);
                            }
                          }}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-0"
                        />
                      </th>
                      <th className="py-3 px-4 font-bold">Partner</th>
                      <th className="py-3 px-4 font-bold">Payout Method</th>
                      <th className="py-3 px-4 font-bold">Payout Address / Email</th>
                      <th className="py-3 px-4 font-bold">Total Earned</th>
                      <th className="py-3 px-4 font-bold">Already Paid</th>
                      <th className="py-3 px-4 font-bold">Unpaid Balance</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {affiliates.map(aff => {
                      const unpaid = aff.commissionEarned - aff.commissionPaid;
                      const meetsThreshold = unpaid >= settings.minimumPayoutAmount;

                      return (
                        <tr key={aff.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <input 
                              type="checkbox"
                              checked={selectedPayoutIds.includes(aff.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPayoutIds([...selectedPayoutIds, aff.id]);
                                } else {
                                  setSelectedPayoutIds(selectedPayoutIds.filter(id => id !== aff.id));
                                }
                              }}
                              disabled={unpaid <= 0}
                              className="rounded border-slate-300 text-emerald-600 focus:ring-0"
                            />
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">{aff.name} ({aff.affiliateCode})</td>
                          <td className="py-3.5 px-4 font-mono text-slate-700">{aff.payoutMethod}</td>
                          <td className="py-3.5 px-4 font-mono text-emerald-700">{aff.payoutEmail}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">${aff.commissionEarned.toFixed(2)}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">${aff.commissionPaid.toFixed(2)}</td>
                          <td className="py-3.5 px-4 font-mono font-black text-amber-600 text-sm">
                            ${unpaid.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4">
                            {unpaid <= 0 ? (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold">SETTLED</span>
                            ) : meetsThreshold ? (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-[10px] font-black">READY TO PAY</span>
                            ) : (
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-bold">BELOW ${settings.minimumPayoutAmount} MIN</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: PROMO MATERIALS ── */}
        {activeTab === 'promo_assets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Promotional Swipes & Asset Vault</h3>
                <p className="text-xs text-slate-500">High-converting email copy, banner graphic embed codes & social post swipes for your affiliates.</p>
              </div>

              <button 
                onClick={() => setIsAddPromoOpen(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Promo Asset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promoMaterials.map(item => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:border-emerald-400 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-black px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.type.toUpperCase()} ({item.category})
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{item.downloadsCount} Uses</span>
                    </div>

                    <h4 className="text-base font-black text-slate-900">{item.title}</h4>

                    {item.subjectLine && (
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                        <span className="text-slate-500 font-bold">Subject Line: </span>
                        <span className="text-emerald-800 font-mono font-bold">{item.subjectLine}</span>
                      </div>
                    )}

                    {item.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 h-36">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                      <pre className="text-[11px] text-slate-800 whitespace-pre-wrap font-mono">{item.content}</pre>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => handleCopy(item.content, item.id)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      {copiedLink === item.id ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink === item.id ? 'Copied to Clipboard!' : 'Copy Asset & Code'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 7: LEADERBOARDS & CONTESTS ── */}
        {activeTab === 'contests' && (
          <div className="space-y-6">
            {contests.map(c => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-full text-xs font-mono font-black flex items-center gap-1">
                        <Flame className="w-4 h-4 text-amber-600 fill-amber-600" /> ACTIVE CONTEST
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Ends Sept 30, 2026</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{c.title}</h3>
                    <p className="text-sm text-slate-600">{c.description}</p>
                  </div>

                  <div className="bg-amber-50 p-5 rounded-2xl border border-amber-300 space-y-1 text-center shrink-0">
                    <span className="text-xs text-amber-800 font-black uppercase font-mono">Grand Prize Pool</span>
                    <div className="text-2xl font-black text-amber-700">{c.prizePool}</div>
                  </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" /> Live Contest Leaderboard Standings
                  </h4>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-600 uppercase font-mono text-[10px]">
                          <th className="py-2.5 px-3 font-bold">Rank</th>
                          <th className="py-2.5 px-3 font-bold">Partner</th>
                          <th className="py-2.5 px-3 font-bold">Sales Count</th>
                          <th className="py-2.5 px-3 font-bold">Gross Revenue</th>
                          <th className="py-2.5 px-3 font-bold">Goal Progress ($100k)</th>
                          <th className="py-2.5 px-3 text-right font-bold">Contest Prize</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {affiliates
                          .filter(a => a.status === 'Approved' || a.status === 'VIP')
                          .sort((a, b) => b.grossRevenue - a.grossRevenue)
                          .map((aff, idx) => {
                            const percent = Math.min(100, Math.round((aff.grossRevenue / c.goalTarget) * 100));
                            const prize = c.topPrizes[idx]?.prize || 'Partner Recognition';

                            return (
                              <tr key={aff.id} className="hover:bg-white/80 transition-colors">
                                <td className="py-3 px-3">
                                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs font-mono ${
                                    idx === 0 ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/40' :
                                    idx === 1 ? 'bg-slate-300 text-slate-950' :
                                    idx === 2 ? 'bg-amber-700 text-white' :
                                    'bg-slate-200 text-slate-700'
                                  }`}>
                                    #{idx + 1}
                                  </span>
                                </td>

                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-2.5">
                                    <img src={aff.avatar} alt={aff.name} className="w-7 h-7 rounded-full object-cover" />
                                    <span className="font-black text-slate-900">{aff.name}</span>
                                  </div>
                                </td>

                                <td className="py-3 px-3 font-mono text-slate-700 font-bold">{aff.totalSalesCount} Sales</td>
                                <td className="py-3 px-3 font-mono font-black text-emerald-700">${aff.grossRevenue.toLocaleString()}</td>
                                
                                <td className="py-3 px-3 w-48">
                                  <div className="space-y-1">
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono font-bold">{percent}% of target</span>
                                  </div>
                                </td>

                                <td className="py-3 px-3 text-right font-black text-amber-700 font-mono">{prize}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 8: PARTNER PORTAL PREVIEW ── */}
        {activeTab === 'portal' && (
          <div className="space-y-6">
            {/* Impersonation Banner Bar */}
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-emerald-950">Live Affiliate Dashboard Preview</h4>
                  <p className="text-[11px] text-emerald-800">This is exact live view your affiliates see inside their dedicated partner center.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-700 font-bold">Impersonate Partner:</span>
                <select 
                  value={portalAffiliateId}
                  onChange={(e) => setPortalAffiliateId(e.target.value)}
                  className="bg-white border border-emerald-300 text-emerald-900 text-xs rounded-xl px-3 py-1.5 font-black focus:outline-none"
                >
                  {affiliates.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.affiliateCode})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* LIVE PORTAL UI */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
              {/* Partner Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <img src={activePortalUser.avatar} alt={activePortalUser.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Welcome Back, {activePortalUser.name}!</h3>
                    <p className="text-xs text-slate-600">
                      Partner Code: <strong className="text-emerald-700 font-mono">{activePortalUser.affiliateCode}</strong> • 
                      Plan: <strong className="text-teal-700">{(plans.find(p => p.id === activePortalUser.planId)?.name) || 'Standard 40% + 10% 2-Tier'}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-black font-mono">
                    STATUS: {activePortalUser.status}
                  </span>
                </div>
              </div>

              {/* Partner KPI Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-bold">Total Clicks</span>
                  <div className="text-2xl font-black text-slate-900">{activePortalUser.totalClicks.toLocaleString()}</div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-bold">Total Sales Count</span>
                  <div className="text-2xl font-black text-emerald-700">{activePortalUser.totalSalesCount}</div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-bold">Total Commissions Earned</span>
                  <div className="text-2xl font-black text-teal-700">${activePortalUser.commissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-bold">Unpaid Balance</span>
                  <div className="text-2xl font-black text-amber-600">${(activePortalUser.commissionEarned - activePortalUser.commissionPaid).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
              </div>

              {/* Unique Link Generator */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Link className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">Your Custom Affiliate Tracking Link Generator</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Funnel / Product</label>
                    <select 
                      value={portalSelectedProduct}
                      onChange={(e) => setPortalSelectedProduct(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                    >
                      <option value="7-Figure Launch Accelerator System">7-Figure Launch Accelerator System ($2,997)</option>
                      <option value="Course Portal VIP Membership">Course Portal VIP Membership ($997)</option>
                      <option value="High Ticket Mastermind">High Ticket Mastermind ($9,997)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Sub-ID / Campaign Tracking Tag</label>
                    <input 
                      type="text"
                      value={portalSubId}
                      onChange={(e) => setPortalSubId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <code className="text-xs text-emerald-800 font-mono font-bold break-all">
                    {settings.affiliateDomainUrl}?ref={activePortalUser.affiliateCode}&subid={portalSubId}
                  </code>

                  <button 
                    onClick={() => handleCopy(`${settings.affiliateDomainUrl}?ref=${activePortalUser.affiliateCode}&subid=${portalSubId}`, 'portal_link')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shrink-0 shadow-md shadow-emerald-600/20"
                  >
                    {copiedLink === 'portal_link' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink === 'portal_link' ? 'Copied Link!' : 'Copy Tracking Link'}</span>
                  </button>
                </div>
              </div>

              {/* 2-Tier Sub-Affiliates Network Tree */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-teal-600" />
                    <h4 className="text-base font-black text-slate-900">Your 2-Tier Sub-Affiliate Network Tree</h4>
                  </div>
                  <span className="text-xs text-teal-700 font-mono font-black bg-teal-100 px-2.5 py-1 rounded">10% Sub-Kickback Active</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {affiliates.filter(a => a.parentAffiliateId === activePortalUser.id).length > 0 ? (
                    affiliates.filter(a => a.parentAffiliateId === activePortalUser.id).map(sub => (
                      <div key={sub.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <img src={sub.avatar} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{sub.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{sub.totalSalesCount} sales generated</div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-teal-700 font-mono">${sub.grossRevenue.toLocaleString()} volume</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-6 text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
                      Share your recruitment link to invite partners and earn 10% sub-affiliate commissions on all their sales!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 9: FUN SIMULATIONS & WORKFLOWS ENGINE ── */}
        {activeTab === 'simulations' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-black font-mono flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-4 h-4 fill-slate-950" /> BETA TESTER SANDBOX
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                BountyPack Interactive Simulations & 2-Tier Workflows
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed">
                Test and experience live checkout attributions, real-time 2-tier commission calculations, sticky cookie attribution simulations, clawbacks, and automated webhook payloads.
              </p>
            </div>

            {/* SIMULATION 1: LIVE 2-TIER CHECKOUT SIMULATOR */}
            <div className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                    <Play className="w-5 h-5 fill-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">Simulation 1: Live Checkout & 2-Tier Split Processor</h4>
                    <p className="text-xs text-slate-500">Simulate a high-ticket customer purchase through an affiliate link and watch live commission splits.</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  REAL-TIME DB SYNC
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Select Affiliate */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Referring Partner (Tier 1)</label>
                  <select 
                    value={simAffiliateId}
                    onChange={(e) => setSimAffiliateId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                  >
                    {affiliates.map(a => {
                      const parent = affiliates.find(p => p.id === a.parentAffiliateId);
                      return (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.affiliateCode}) {parent ? `[Sub-tier of ${parent.name}]` : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Product & Price */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Product Offer</label>
                  <select 
                    value={simProductPrice}
                    onChange={(e) => {
                      setSimProductPrice(e.target.value);
                      if (e.target.value === '2997') setSimProductName('7-Figure Launch Accelerator System');
                      else if (e.target.value === '997') setSimProductName('Course Portal VIP Membership');
                      else if (e.target.value === '9997') setSimProductName('High Ticket Mastermind');
                      else if (e.target.value === '97') setSimProductName('Funnel Starter Toolkit');
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="2997">7-Figure Launch Accelerator ($2,997)</option>
                    <option value="997">Course Portal VIP Membership ($997)</option>
                    <option value="9997">High Ticket Mastermind ($9,997)</option>
                    <option value="97">Funnel Starter Toolkit ($97)</option>
                  </select>
                </div>

                {/* Mock Customer */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Simulated Customer Name</label>
                  <input 
                    type="text"
                    value={simCustomerName}
                    onChange={(e) => setSimCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleSimulateReferredSale}
                disabled={isSimulatingSale}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                {isSimulatingSale ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5 animate-spin" />
                    Processing 2-Tier Split & Dropping Sticky Cookie...
                  </span>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-white" />
                    <span>SIMULATE LIVE PURCHASE & PROCESS 2-TIER COMMISSIONS →</span>
                  </>
                )}
              </button>
            </div>

            {/* SIMULATION 2: STICKY COOKIE & SIMULATION 3: CLAWBACK */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sticky Cookie Simulation */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">Simulation 2: Sticky Cookie Attribution</h4>
                </div>
                <p className="text-xs text-slate-500">Test how sticky cookies permanently lock customer emails to their originating referrer for lifetime upsells.</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Visitor Email</label>
                    <input 
                      type="email"
                      value={simCookieVisitorEmail}
                      onChange={(e) => setSimCookieVisitorEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tracking Code</label>
                      <input 
                        type="text"
                        value={simCookieAffCode}
                        onChange={(e) => setSimCookieAffCode(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Cookie Days</label>
                      <input 
                        type="number"
                        value={simCookieDuration}
                        onChange={(e) => setSimCookieDuration(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleSimulateCookieDrop}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Drop Sticky Cookie Simulation</span>
                  </button>

                  {simCookieStatus && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-medium animate-fade-in">
                      {simCookieStatus}
                    </div>
                  )}
                </div>
              </div>

              {/* Clawback / Refund Simulation */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-5 h-5 text-rose-600" />
                  <h4 className="text-base font-black text-slate-900">Simulation 3: Refund & Clawback Engine</h4>
                </div>
                <p className="text-xs text-slate-500">Simulate customer chargebacks and automatically adjust unpaid affiliate commission balances.</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Transaction to Clawback</label>
                    <select 
                      value={selectedClawbackTxId}
                      onChange={(e) => setSelectedClawbackTxId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                    >
                      {transactions.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.orderId} - ${t.commissionAmount.toFixed(2)} to {t.affiliateCode} ({t.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button 
                    onClick={handleSimulateClawback}
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Execute Commission Clawback</span>
                  </button>

                  {clawbackStatusNotice && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs font-medium animate-fade-in">
                      {clawbackStatusNotice}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SIMULATION 4: AUTOMATED WEBHOOK PAYLOAD DISPATCHER */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Send className="w-5 h-5 text-teal-600" />
                  <h4 className="text-base font-black text-slate-900">Simulation 4: Automated Webhook & Zapier Payload Dispatcher</h4>
                </div>
                <button 
                  onClick={handleSimulateWebhook}
                  className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Test Fire Webhook Event</span>
                </button>
              </div>
              <p className="text-xs text-slate-500">Test real-time commission event payloads sent to external CRM endpoints, Zapier, Make, and SMS webhooks.</p>

              {webhookSimOutput && (
                <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{webhookSimOutput}</pre>
                </div>
              )}
            </div>

            {/* VISUAL 2-TIER WORKFLOW ARCHITECTURE DIAGRAM */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                <div>
                  <h4 className="text-lg font-black text-white" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                    BountyPack 2-Tier Automated Workflow Engine Pipeline
                  </h4>
                  <p className="text-xs text-slate-400">Step-by-step automated lifecycle executed on every referred visit and customer checkout.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center text-xs">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">1</span>
                  <h5 className="font-bold text-emerald-300">Tracking Link</h5>
                  <p className="text-[11px] text-slate-300">Visitor clicks affiliate link with ?ref=CODE & Sub-ID</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">2</span>
                  <h5 className="font-bold text-emerald-300">Sticky Cookie</h5>
                  <p className="text-[11px] text-slate-300">60-day cookie dropped in browser + IP hashed</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">3</span>
                  <h5 className="font-bold text-emerald-300">Checkout</h5>
                  <p className="text-[11px] text-slate-300">Buyer purchases high-ticket VSL or subscription</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">4</span>
                  <h5 className="font-bold text-teal-300">2-Tier Split</h5>
                  <p className="text-[11px] text-slate-300">Direct partner gets 40%, Parent partner gets 10%</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">5</span>
                  <h5 className="font-bold text-amber-300">30-Day Holdback</h5>
                  <p className="text-[11px] text-slate-300">Protects from refund & chargeback clawbacks</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-green-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">6</span>
                  <h5 className="font-bold text-green-300">MassPay CSV</h5>
                  <p className="text-[11px] text-slate-300">One-click export to PayPal MassPay & Stripe</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 10: DATABASE & SCHEMA ── */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Supabase SQL Database & Schema Inspector</h3>
                <p className="text-xs text-slate-500">Review database schema, sync state, and copy production SQL migration scripts.</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleTriggerSupabaseSync}
                  disabled={isSyncingDb}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncingDb ? 'animate-spin' : ''}`} />
                  <span>{isSyncingDb ? 'Syncing to Supabase...' : 'Sync to Supabase Now'}</span>
                </button>
              </div>
            </div>

            {/* Sync Feedback Alert */}
            {dbSyncStatus && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${dbSyncStatus.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-amber-50 text-amber-900 border-amber-300'}`}>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>{dbSyncStatus.message}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">{dbSyncStatus.timestamp}</span>
              </div>
            )}

            {/* Table Stats Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Plans Table</span>
                <div className="text-xl font-black text-slate-900">{plans.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Affiliates Table</span>
                <div className="text-xl font-black text-emerald-700">{affiliates.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Ledger Table</span>
                <div className="text-xl font-black text-teal-700">{transactions.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Promo Assets</span>
                <div className="text-xl font-black text-slate-900">{promoMaterials.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Contests Table</span>
                <div className="text-xl font-black text-amber-600">{contests.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Settings Table</span>
                <div className="text-xl font-black text-green-700">1 Row (Active)</div>
              </div>
            </div>

            {/* SQL Migration Script Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">PostgreSQL / Supabase DDL Migration Script</h4>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(BOUNTYPACK_SQL_SCHEMA);
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
                <pre>{BOUNTYPACK_SQL_SCHEMA}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 11: SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-black text-slate-900">BountyPack System Settings</h3>
              <p className="text-xs text-slate-500">Configure global attribution rules, self-referral blocks & payout defaults.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Auto-Approve Partner Applications</h4>
                  <p className="text-xs text-slate-500">Automatically grant affiliate access upon application submit.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={settings.autoApproveAffiliates}
                  onChange={(e) => setSettings({ ...settings, autoApproveAffiliates: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Self-Referral Commission Protection</h4>
                  <p className="text-xs text-slate-500">Block affiliates from earning commission on their own email purchases.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={!settings.selfReferralAllowed}
                  onChange={(e) => setSettings({ ...settings, selfReferralAllowed: !e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="space-y-2 border-b border-slate-100 pb-4">
                <h4 className="text-sm font-bold text-slate-900">Cookie Attribution Priority Mode</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSettings({ ...settings, cookieAttributionMode: 'last_click' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all ${settings.cookieAttributionMode === 'last_click' ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-sm' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    <div className="font-black text-emerald-900">Last-Click Priority (Recommended)</div>
                    <div className="text-[10px] text-slate-600 font-normal mt-0.5">Most recent affiliate link gets 100% direct attribution.</div>
                  </button>

                  <button 
                    onClick={() => setSettings({ ...settings, cookieAttributionMode: 'first_click' })}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all ${settings.cookieAttributionMode === 'first_click' ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-sm' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    <div className="font-black text-emerald-900">First-Click Priority</div>
                    <div className="text-[10px] text-slate-600 font-normal mt-0.5">First affiliate link clicked locks lifetime attribution.</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2 border-b border-slate-100 pb-4">
                <h4 className="text-sm font-bold text-slate-900">Minimum Payout Threshold ($)</h4>
                <input 
                  type="number"
                  value={settings.minimumPayoutAmount}
                  onChange={(e) => setSettings({ ...settings, minimumPayoutAmount: parseFloat(e.target.value) || 50 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Default Tracking Domain URL</h4>
                <input 
                  type="text"
                  value={settings.affiliateDomainUrl}
                  onChange={(e) => setSettings({ ...settings, affiliateDomainUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── MODAL 1: VIEW APPLICATION DETAILS ── */}
      {isAppModalOpen && selectedAffiliate && selectedAffiliate.applicationAnswers && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img src={selectedAffiliate.avatar} alt={selectedAffiliate.name} className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedAffiliate.name} Application</h3>
                  <p className="text-xs text-slate-500">{selectedAffiliate.email}</p>
                </div>
              </div>
              <button onClick={() => setIsAppModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800">Traffic Source & Channels:</span>
                <p className="text-slate-800">{selectedAffiliate.applicationAnswers.trafficSource}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800">Monthly Audience Reach:</span>
                <p className="text-slate-800 font-mono font-bold">{selectedAffiliate.applicationAnswers.monthlyAudience}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800">Website URL / Social Handle:</span>
                <p className="text-teal-700 font-mono font-bold">{selectedAffiliate.applicationAnswers.websiteUrl}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800">Planned Promotional Methods:</span>
                <p className="text-slate-800">{selectedAffiliate.applicationAnswers.promotionalMethods}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button 
                onClick={() => {
                  handleUpdateAffiliateStatus(selectedAffiliate.id, 'Approved');
                  setIsAppModalOpen(false);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
              >
                Approve Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: CREATE / EDIT COMMISSION PLAN ── */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900">{editingPlan ? 'Edit Commission Plan' : 'Create New Commission Plan'}</h3>
              <button onClick={() => setIsPlanModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Plan Title</label>
                <input 
                  type="text"
                  placeholder="e.g. VIP Mastermind 50% + 15%"
                  value={planFormName}
                  onChange={(e) => setPlanFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <input 
                  type="text"
                  placeholder="Short description of who gets this plan"
                  value={planFormDesc}
                  onChange={(e) => setPlanFormDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">1st Tier Rate (%)</label>
                  <input 
                    type="number"
                    value={planFormTier1}
                    onChange={(e) => setPlanFormTier1(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">2nd Tier Rate (%)</label>
                  <input 
                    type="number"
                    value={planFormTier2}
                    onChange={(e) => setPlanFormTier2(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sticky Cookie (Days)</label>
                  <input 
                    type="number"
                    value={planFormCookieDays}
                    onChange={(e) => setPlanFormCookieDays(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Holdback (Days)</label>
                  <input 
                    type="number"
                    value={planFormHoldbackDays}
                    onChange={(e) => setPlanFormHoldbackDays(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button 
                onClick={handleSavePlan}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
              >
                {editingPlan ? 'Update Plan Rules' : 'Save Commission Plan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: ADD AFFILIATE MANUALLY ── */}
      {isAddAffiliateOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900">Add New Affiliate Partner</h3>
              <button onClick={() => setIsAddAffiliateOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAffiliate} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Partner Full Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Stephen Tofield"
                    value={newAffName}
                    onChange={(e) => setNewAffName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input 
                    type="email"
                    required
                    placeholder="e.g. stephen@agency.demo"
                    value={newAffEmail}
                    onChange={(e) => setNewAffEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tracking Code (Ref Code)</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. VIPSTEPHEN"
                    value={newAffCode}
                    onChange={(e) => setNewAffCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Commission Plan</label>
                  <select 
                    value={newAffPlanId}
                    onChange={(e) => setNewAffPlanId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Parent Partner (Tier-2 Kickback)</label>
                  <select 
                    value={newAffParentId}
                    onChange={(e) => setNewAffParentId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="">None (Top-Level Parent)</option>
                    {affiliates.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.affiliateCode})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Status</label>
                  <select 
                    value={newAffStatus}
                    onChange={(e) => setNewAffStatus(e.target.value as AffiliateStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  >
                    <option value="Approved">Approved</option>
                    <option value="VIP">VIP</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payout Method</label>
                  <select 
                    value={newAffPayoutMethod}
                    onChange={(e) => setNewAffPayoutMethod(e.target.value as PayoutMethod)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                  >
                    <option value="PayPal">PayPal</option>
                    <option value="Stripe">Stripe</option>
                    <option value="Direct Wire">Direct Wire</option>
                    <option value="Wise">Wise</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payout Email / Account</label>
                  <input 
                    type="text"
                    placeholder="Same as email or PayPal ID"
                    value={newAffPayoutEmail}
                    onChange={(e) => setNewAffPayoutEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
                >
                  Onboard Affiliate Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 4: ADD PROMO ASSET ── */}
      {isAddPromoOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900">Add Promotional Marketing Asset</h3>
              <button onClick={() => setIsAddPromoOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Asset Type</label>
                <select 
                  value={newPromoType}
                  onChange={(e) => setNewPromoType(e.target.value as PromoMaterial['type'])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                >
                  <option value="email">Email Swipe</option>
                  <option value="banner">Banner Ad</option>
                  <option value="social">Social Media Swipe</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Asset Title</label>
                <input 
                  type="text"
                  placeholder="e.g. VSL Broadcast Email Swipe #3"
                  value={newPromoTitle}
                  onChange={(e) => setNewPromoTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              {newPromoType === 'email' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject Line</label>
                  <input 
                    type="text"
                    placeholder="e.g. How {FIRST_NAME} scaled to $10k/day..."
                    value={newPromoSubject}
                    onChange={(e) => setNewPromoSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Content / HTML / Swipe Text</label>
                <textarea 
                  rows={6}
                  placeholder="Insert body copy. Use {AFFILIATE_LINK} for link replacement tag."
                  value={newPromoContent}
                  onChange={(e) => setNewPromoContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button 
                onClick={handleAddPromo}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
              >
                Publish Promo Asset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
