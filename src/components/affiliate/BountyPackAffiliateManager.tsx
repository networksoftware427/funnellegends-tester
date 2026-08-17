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
  loadStoredSettings, saveStoredSettings 
} from '../../utils/affiliateStorage';
import { 
  Users, DollarSign, Award, Gift, Link, Copy, FileText, CheckCircle2, XCircle, 
  Clock, ShieldCheck, Flame, Plus, Search, Filter, ArrowUpRight, Download, 
  RefreshCw, ChevronRight, Eye, Settings, Layers, PieChart, TrendingUp, 
  Sparkles, ExternalLink, Trash2, Edit3, UserPlus, Check, X, AlertCircle, 
  Share2, HelpCircle, CheckSquare, Zap, BarChart2, CornerDownRight, Smartphone, CreditCard, Megaphone
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
  const [activeTab, setActiveTab] = useState<'overview' | 'roster' | 'plans' | 'ledger' | 'payouts' | 'promo' | 'promo_assets' | 'contests' | 'portal' | 'settings'>('overview');

  // Roster Filter & Search
  const [rosterFilter, setRosterFilter] = useState<AffiliateStatus | 'All'>('All');
  const [rosterSearch, setRosterSearch] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateUser | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isAddAffiliateOpen, setIsAddAffiliateOpen] = useState(false);

  // Plan Modals
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanDesc, setNewPlanDesc] = useState('');
  const [newPlanTier1, setNewPlanTier1] = useState('40');
  const [newPlanTier2, setNewPlanTier2] = useState('10');
  const [newPlanCookieDays, setNewPlanCookieDays] = useState('60');

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
  const [newPromoSubject, setNewPromoSubject] = useState('');
  const [newPromoContent, setNewPromoContent] = useState('');

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
  const totalPendingPayout = totalCommissionEarned - totalCommissionPaid;
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

  // Create Plan
  const handleCreatePlan = () => {
    if (!newPlanName.trim()) return;
    const newPlan: CommissionPlan = {
      id: `plan_${Date.now()}`,
      name: newPlanName,
      description: newPlanDesc || 'Custom affiliate tier plan',
      isDefault: false,
      tier1Rate: parseFloat(newPlanTier1) || 40,
      tier1Type: 'percentage',
      tier2Rate: parseFloat(newPlanTier2) || 10,
      tier2Type: 'percentage',
      stickyCookieDays: parseInt(newPlanCookieDays) || 60,
      holdbackDays: 30
    };
    setPlans([...plans, newPlan]);
    setIsPlanModalOpen(false);
    setNewPlanName('');
    setNewPlanDesc('');
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
      category: newPromoType === 'email' ? 'Email Swipe' : newPromoType === 'banner' ? 'Banner Ad' : 'Social Asset',
      subjectLine: newPromoSubject,
      content: newPromoContent,
      downloadsCount: 0
    };
    setPromoMaterials([newAsset, ...promoMaterials]);
    setIsAddPromoOpen(false);
    setNewPromoTitle('');
    setNewPromoSubject('');
    setNewPromoContent('');
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
    <div className="flex-1 bg-gray-50 text-gray-900 overflow-y-auto flex flex-col">
      {/* TOP BOUNTYPACK SYSTEM BRAND HEADER */}
      <div className="bg-green-600 backdrop-blur-md border-b border-green-700 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-500 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-xl shadow-green-600/30">
            <Gift className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-slate-900">BountyPack</h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-white/20 text-slate-900 border border-white/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 text-slate-900" />
                Affiliate & 2-Tier Engine
              </span>
            </div>
            <p className="text-xs text-green-100">Complete partner recruitment, commission tracking, sticky cookies & payouts management.</p>
          </div>
        </div>

        {/* Action Controls Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => setActiveTab('portal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${activeTab === 'portal' ? 'bg-white text-green-700 border-green-200 shadow-lg shadow-green-600/20' : 'bg-green-700 text-green-100 hover:text-slate-900 border-green-600'}`}
          >
            <Eye className="w-4 h-4" />
            <span>Preview Partner Portal</span>
          </button>
          
          <button 
            onClick={() => setIsPlanModalOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 text-green-700 border border-green-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4 text-green-600" />
            <span>New Plan</span>
          </button>

          <button 
            onClick={handleDownloadPayoutCsv}
            className="px-3.5 py-2 bg-white text-green-700 hover:bg-gray-50 rounded-xl text-xs font-extrabold shadow-lg shadow-green-600/30 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>MassPay CSV</span>
          </button>
        </div>
      </div>

      {/* SECONDARY BOUNTYPACK TAB NAVIGATION */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'overview' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button 
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 relative ${activeTab === 'roster' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <Users className="w-4 h-4" />
          <span>Affiliate Roster ({affiliates.length})</span>
          {pendingAppsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center animate-bounce">
              {pendingAppsCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'plans' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <Layers className="w-4 h-4" />
          <span>Commission Plans ({plans.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'ledger' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 hover:text-slate-800'}`}
        >
          <FileText className="w-4 h-4" />
          <span>Sales Ledger</span>
        </button>

        <button 
          onClick={() => setActiveTab('payouts')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'payouts' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Mass Payouts</span>
        </button>

        <button 
          onClick={() => setActiveTab('promo_assets')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'promo_assets' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Promo Swipe Files</span>
        </button>
      </div>

      <div className="p-6 flex-1 max-w-[1600px] w-full mx-auto">
        {/* MAIN TAB CONTENT DISPLAY AREA */}
        
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium">Referred Gross Sales</p>
                  <h3 className="text-2xl font-black text-slate-900">${totalGrossRevenue.toLocaleString()}</h3>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <ArrowUpRight className="w-3 h-3" /> +24.8% vs last month
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium">Total Commissions Earned</p>
                  <h3 className="text-2xl font-black text-purple-300">${totalCommissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </div>
                <div className="text-[10px] text-purple-400 font-mono">
                  Average rate ~41.2%
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium">Pending Payout Balance</p>
                  <h3 className="text-2xl font-black text-amber-400">${totalPendingPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </div>
                <div className="text-[10px] text-amber-400/80 font-mono">
                  {transactions.filter(t => t.status === 'Approved').length} approved items ready
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium">Active Partners</p>
                  <h3 className="text-2xl font-black text-emerald-400">{affiliates.length}</h3>
                </div>
                <div className="text-[10px] text-emerald-400/80 font-mono">
                  {affiliates.filter(a => a.status === 'VIP').length} VIP Super-Affiliates
                </div>
              </div>
            </div>

            {/* SECONDARY ROW: 2-TIER KICKBACK & QUICK ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 2-Tier Breakdown Card */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-slate-900">2-Tier Commission Distribution</h3>
                  </div>
                  <span className="text-xs text-slate-600 font-mono">Sticky Cookies Active (60 Days)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Tier 1 Direct Referrals</span>
                      <span className="text-xs text-indigo-400 font-mono font-bold">40% Rate</span>
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">
                      ${transactions.filter(t => t.tier === 1).reduce((acc, c) => acc + c.commissionAmount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[11px] text-slate-600">Direct sales attributed to primary partner tracking links.</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Tier 2 Sub-Affiliate Network</span>
                      <span className="text-xs text-purple-400 font-mono font-bold">10% Kickback</span>
                    </div>
                    <p className="text-2xl font-extrabold text-purple-300">
                      ${transactions.filter(t => t.tier === 2).reduce((acc, c) => acc + c.commissionAmount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[11px] text-slate-600">Passive income earned by parent affiliates recruiting sub-partners.</p>
                  </div>
                </div>

                {/* Sticky Cookie Engine Status */}
                <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-200">Backpack Sticky Cookie Attribution Engine</h4>
                      <p className="text-[11px] text-amber-300/80">When a customer buys, sticky cookies permanently tie their email to the referrer for future upsells & recurring subscription commissions.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-mono font-bold shrink-0">ACTIVE</span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    Quick Actions
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">Manage partner applications, commission tiers and promo assets.</p>
                </div>

                <div className="space-y-2.5">
                  <button 
                    onClick={() => setActiveTab('roster')}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-emerald-400" />
                      <span>Review Pending Applications</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-mono rounded font-bold">{pendingAppsCount}</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('payouts')}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Process Ready Payouts</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('promo_assets')}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-between border border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-indigo-400" />
                      <span>Add Email Swipes & Banners</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('portal')}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Launch Partner Portal Preview</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RECENT SALES STREAM */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Referred Transactions</h3>
                  <p className="text-xs text-slate-600">Live sales stream linked to affiliate tracking codes.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('ledger')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  View Full Sales Ledger <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600 uppercase font-mono text-[10px]">
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Product</th>
                      <th className="py-2.5 px-3">Order Value</th>
                      <th className="py-2.5 px-3">Partner Code</th>
                      <th className="py-2.5 px-3">Tier</th>
                      <th className="py-2.5 px-3">Commission</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {transactions.slice(0, 5).map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3 px-3 font-mono text-indigo-400">{tx.orderId}</td>
                        <td className="py-3 px-3 text-slate-800">{tx.customerName}</td>
                        <td className="py-3 px-3 text-slate-600">{tx.productName}</td>
                        <td className="py-3 px-3 font-bold text-slate-800">${tx.amount}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 bg-slate-50 border border-slate-300 text-amber-300 rounded font-mono text-[11px] font-bold">
                            {tx.affiliateCode}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tx.tier === 1 ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-purple-950 text-purple-300 border border-purple-800'}`}>
                            Tier {tx.tier}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-400">${tx.commissionAmount.toFixed(2)}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            tx.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            tx.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            tx.status === 'Paid' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                            'bg-rose-950 text-rose-400 border border-rose-800'
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

        {/* TAB 2: AFFILIATE ROSTER & APPLICATIONS */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xl">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Search by partner name, email, or ref code..."
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['All', 'Approved', 'Pending', 'VIP', 'Denied'] as const).map(status => (
                  <button 
                    key={status}
                    onClick={() => setRosterFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${rosterFilter === status ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200'}`}
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
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-white/60 text-slate-600 uppercase font-mono text-[10px]">
                    <th className="py-3 px-4">Affiliate / Partner</th>
                    <th className="py-3 px-4">Ref Code</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Commission Plan</th>
                    <th className="py-3 px-4">Sales / Rev</th>
                    <th className="py-3 px-4">Earned / Paid</th>
                    <th className="py-3 px-4">Payout Method</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAffiliates.map(aff => {
                    const assignedPlan = plans.find(p => p.id === aff.planId) || plans[0];
                    const parentAff = affiliates.find(a => a.id === aff.parentAffiliateId);

                    return (
                      <tr key={aff.id} className="hover:bg-slate-50/40 transition-colors">
                        {/* Name & Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img src={aff.avatar} alt={aff.name} className="w-9 h-9 rounded-full object-cover border border-slate-300" />
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{aff.name}</span>
                                {parentAff && (
                                  <span className="text-[10px] text-purple-400 font-mono flex items-center gap-0.5" title={`Referred by ${parentAff.name}`}>
                                    <CornerDownRight className="w-3 h-3" /> Sub-Tier
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-600">{aff.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Ref Code */}
                        <td className="py-3.5 px-4">
                          <button 
                            onClick={() => handleCopy(`${settings.affiliateDomainUrl}?ref=${aff.affiliateCode}`, aff.id)}
                            className="px-2.5 py-1 bg-white border border-slate-200 hover:border-amber-500/50 text-amber-300 rounded font-mono text-xs font-bold flex items-center gap-1.5 group"
                          >
                            <span>{aff.affiliateCode}</span>
                            {copiedLink === aff.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />}
                          </button>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                            aff.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            aff.status === 'VIP' ? 'bg-purple-950 text-purple-300 border border-purple-700 shadow-sm shadow-purple-500/20' :
                            aff.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse' :
                            'bg-rose-950 text-rose-400 border border-rose-800'
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
                          <div className="font-bold text-slate-800">{aff.totalSalesCount} sales</div>
                          <div className="text-[11px] text-slate-600">${aff.grossRevenue.toLocaleString()} gross</div>
                        </td>

                        {/* Earned / Paid */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-emerald-400">${aff.commissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                          <div className="text-[11px] text-slate-600">${aff.commissionPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })} paid</div>
                        </td>

                        {/* Payout method */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 bg-white text-slate-700 rounded text-[11px] border border-slate-200 font-mono">
                            {aff.payoutMethod}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {aff.applicationAnswers && (
                            <button 
                              onClick={() => { setSelectedAffiliate(aff); setIsAppModalOpen(true); }}
                              className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-300"
                              title="View Application Details"
                            >
                              App Details
                            </button>
                          )}

                          {aff.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleUpdateAffiliateStatus(aff.id, 'Approved')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/30"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleUpdateAffiliateStatus(aff.id, 'Denied')}
                                className="px-2.5 py-1 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-slate-900 rounded-lg text-xs font-bold"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {aff.status === 'Approved' && (
                            <button 
                              onClick={() => handleUpdateAffiliateStatus(aff.id, 'VIP')}
                              className="px-2.5 py-1 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-slate-900 rounded-lg text-xs font-bold border border-purple-500/30"
                            >
                              Make VIP
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COMMISSION PLANS & 2-TIER STRUCTURES */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Commission Tiers & Plans</h3>
                <p className="text-xs text-slate-600">Configure 1st-Tier direct payouts, 2nd-Tier sub-affiliate kickbacks, product overrides & sticky cookies.</p>
              </div>

              <button 
                onClick={() => setIsPlanModalOpen(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Plan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map(plan => (
                <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xl hover:border-indigo-500/50 transition-all relative flex flex-col justify-between">
                  {plan.isDefault && (
                    <span className="absolute top-4 right-4 text-[10px] uppercase font-mono font-extrabold bg-indigo-950 text-indigo-300 border border-indigo-800 px-2.5 py-1 rounded-full">
                      DEFAULT SYSTEM PLAN
                    </span>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                    <p className="text-xs text-slate-600">{plan.description}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">1st-Tier Direct Payout:</span>
                      <span className="font-bold text-emerald-400 font-mono text-sm">
                        {plan.tier1Type === 'percentage' ? `${plan.tier1Rate}%` : `$${plan.tier1Rate}`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">2nd-Tier Sub-Kickback:</span>
                      <span className="font-bold text-purple-400 font-mono text-sm">
                        {plan.tier2Type === 'percentage' ? `${plan.tier2Rate}%` : `$${plan.tier2Rate}`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
                      <span className="text-slate-600 font-medium">Sticky Cookie Duration:</span>
                      <span className="font-bold text-amber-300 font-mono">{plan.stickyCookieDays} Days</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Refund Holdback Period:</span>
                      <span className="font-bold text-slate-700 font-mono">{plan.holdbackDays} Days</span>
                    </div>
                  </div>

                  {/* Product Overrides */}
                  {plan.productOverrides && plan.productOverrides.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase font-mono">Custom Product Overrides ({plan.productOverrides.length})</span>
                      <div className="space-y-1.5">
                        {plan.productOverrides.map((ov, idx) => (
                          <div key={idx} className="p-2 bg-white rounded-lg text-[11px] flex items-center justify-between border border-slate-200/60">
                            <span className="text-slate-700 truncate max-w-[180px]">{ov.productName}</span>
                            <span className="font-mono font-bold text-amber-400">
                              {ov.overrideType === 'percentage' ? `${ov.overrideRate}%` : `$${ov.overrideRate}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-300">
                      Edit Plan Rules
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SALES LEDGER */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Referred Sales Ledger</h3>
                <p className="text-xs text-slate-600">Audit sales attribution, 2-tier commission split allocations, and holdback statuses.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-white/60 text-slate-600 uppercase font-mono text-[10px]">
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Product / Funnel</th>
                    <th className="py-3.5 px-4">Order Total</th>
                    <th className="py-3.5 px-4">Affiliate Code</th>
                    <th className="py-3.5 px-4">Tier Split</th>
                    <th className="py-3.5 px-4">Commission</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-600">{tx.date}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{tx.orderId}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{tx.customerName}</div>
                        <div className="text-[11px] text-slate-600">{tx.customerEmail}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800">{tx.productName}</div>
                        <div className="text-[10px] text-indigo-400 font-mono">{tx.funnelName}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 font-mono">${tx.amount}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-300">{tx.affiliateCode}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tx.tier === 1 ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-purple-950 text-purple-300 border border-purple-800'}`}>
                          Tier {tx.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">${tx.commissionAmount.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                          tx.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          tx.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          tx.status === 'Paid' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                          'bg-rose-950 text-rose-400 border border-rose-800'
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
                            className="px-2 py-1 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded text-[11px] font-bold"
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

        {/* TAB 5: PAYOUTS ENGINE */}
        {activeTab === 'payouts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs text-slate-600">Total Unpaid Owed</span>
                <h3 className="text-2xl font-black text-amber-400">${totalPendingPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                <p className="text-[11px] text-slate-600">Commissions past holdback window</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs text-slate-600">Minimum Payout Rule</span>
                <h3 className="text-2xl font-black text-indigo-400">${settings.minimumPayoutAmount}.00</h3>
                <p className="text-[11px] text-slate-600">Threshold required before payout</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs text-slate-600">Lifetime Paid Out</span>
                <h3 className="text-2xl font-black text-emerald-400">${totalCommissionPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                <p className="text-[11px] text-slate-600">Processed via MassPay & CSV</p>
              </div>
            </div>

            {/* Payout Table & Selection */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Ready Payout Queue</h3>
                  <p className="text-xs text-slate-600">Select partners to issue batch payouts or export CSV file.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleBatchPayout}
                    disabled={selectedPayoutIds.length === 0}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all ${selectedPayoutIds.length > 0 ? 'bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500' : 'bg-slate-50 text-slate-500 cursor-not-allowed'}`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Mark Selected as Paid ({selectedPayoutIds.length})</span>
                  </button>

                  <button 
                    onClick={handleDownloadPayoutCsv}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export PayPal CSV</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-white/60 text-slate-600 uppercase font-mono text-[10px]">
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
                          className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                        />
                      </th>
                      <th className="py-3 px-4">Partner</th>
                      <th className="py-3 px-4">Payout Method</th>
                      <th className="py-3 px-4">Payout Address / Email</th>
                      <th className="py-3 px-4">Total Earned</th>
                      <th className="py-3 px-4">Already Paid</th>
                      <th className="py-3 px-4">Unpaid Balance</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {affiliates.map(aff => {
                      const unpaid = aff.commissionEarned - aff.commissionPaid;
                      const meetsThreshold = unpaid >= settings.minimumPayoutAmount;

                      return (
                        <tr key={aff.id} className="hover:bg-slate-50/40 transition-colors">
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
                              className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                            />
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">{aff.name} ({aff.affiliateCode})</td>
                          <td className="py-3.5 px-4 font-mono text-slate-700">{aff.payoutMethod}</td>
                          <td className="py-3.5 px-4 font-mono text-indigo-400">{aff.payoutEmail}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">${aff.commissionEarned.toFixed(2)}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">${aff.commissionPaid.toFixed(2)}</td>
                          <td className="py-3.5 px-4 font-mono font-black text-amber-400 text-sm">
                            ${unpaid.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4">
                            {unpaid <= 0 ? (
                              <span className="px-2 py-0.5 bg-white text-slate-500 rounded text-[10px]">ALL SETTLED</span>
                            ) : meetsThreshold ? (
                              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">READY TO PAY</span>
                            ) : (
                              <span className="px-2 py-0.5 bg-white text-amber-400 border border-slate-200 rounded text-[10px]">BELOW $50 MIN</span>
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

        {/* TAB 6: PROMO MATERIALS */}
        {activeTab === 'promo_assets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Promotional Swipes & Asset Vault</h3>
                <p className="text-xs text-slate-600">High-converting email copy, banner graphic embed codes & social post swipes for your affiliates.</p>
              </div>

              <button 
                onClick={() => setIsAddPromoOpen(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Promo Asset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promoMaterials.map(item => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-extrabold px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {item.type.toUpperCase()} ({item.category})
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{item.downloadsCount} Uses</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{item.title}</h4>

                    {item.subjectLine && (
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                        <span className="text-slate-600 font-bold">Subject Line: </span>
                        <span className="text-amber-300 font-mono">{item.subjectLine}</span>
                      </div>
                    )}

                    {item.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 h-36">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="bg-white p-4 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                      <pre className="text-[11px] text-slate-700 whitespace-pre-wrap font-mono">{item.content}</pre>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button 
                      onClick={() => handleCopy(item.content, item.id)}
                      className="w-full py-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-800 hover:text-slate-900 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all"
                    >
                      {copiedLink === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink === item.id ? 'Copied to Clipboard!' : 'Copy Asset & Code'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: LEADERBOARDS & CONTESTS */}
        {activeTab === 'contests' && (
          <div className="space-y-6">
            {contests.map(c => (
              <div key={c.id} className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-mono font-bold flex items-center gap-1">
                        <Flame className="w-4 h-4 text-amber-400" /> ACTIVE CONTEST
                      </span>
                      <span className="text-xs text-slate-600 font-mono">Ends Sept 30, 2026</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{c.title}</h3>
                    <p className="text-sm text-slate-700">{c.description}</p>
                  </div>

                  <div className="bg-white/80 p-5 rounded-2xl border border-amber-500/30 space-y-2 text-center shrink-0">
                    <span className="text-xs text-slate-600 font-bold uppercase font-mono">Grand Prize Pool</span>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">{c.prizePool}</div>
                  </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white/90 rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" /> Live Contest Leaderboard Standings
                  </h4>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-600 uppercase font-mono text-[10px]">
                          <th className="py-2.5 px-3">Rank</th>
                          <th className="py-2.5 px-3">Partner</th>
                          <th className="py-2.5 px-3">Sales Count</th>
                          <th className="py-2.5 px-3">Gross Revenue</th>
                          <th className="py-2.5 px-3">Goal Progress ($100k)</th>
                          <th className="py-2.5 px-3 text-right">Contest Prize</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-medium">
                        {affiliates
                          .filter(a => a.status === 'Approved' || a.status === 'VIP')
                          .sort((a, b) => b.grossRevenue - a.grossRevenue)
                          .map((aff, idx) => {
                            const percent = Math.min(100, Math.round((aff.grossRevenue / c.goalTarget) * 100));
                            const prize = c.topPrizes[idx]?.prize || 'Partner Recognition';

                            return (
                              <tr key={aff.id} className="hover:bg-slate-50/40 transition-colors">
                                <td className="py-3 px-3">
                                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                                    idx === 0 ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/40' :
                                    idx === 1 ? 'bg-slate-300 text-slate-950' :
                                    idx === 2 ? 'bg-amber-700 text-white' :
                                    'bg-slate-50 text-slate-600'
                                  }`}>
                                    #{idx + 1}
                                  </span>
                                </td>

                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-2.5">
                                    <img src={aff.avatar} alt={aff.name} className="w-7 h-7 rounded-full object-cover" />
                                    <span className="font-bold text-slate-900">{aff.name}</span>
                                  </div>
                                </td>

                                <td className="py-3 px-3 font-mono text-slate-700 font-bold">{aff.totalSalesCount} Sales</td>
                                <td className="py-3 px-3 font-mono font-black text-emerald-400">${aff.grossRevenue.toLocaleString()}</td>
                                
                                <td className="py-3 px-3 w-48">
                                  <div className="space-y-1">
                                    <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                                      <div className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full" style={{ width: `${percent}%` }} />
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-mono">{percent}% of target</span>
                                  </div>
                                </td>

                                <td className="py-3 px-3 text-right font-bold text-amber-300 font-mono">{prize}</td>
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

        {/* TAB 8: PARTNER PORTAL PREVIEW */}
        {activeTab === 'portal' && (
          <div className="space-y-6">
            {/* Impersonation Banner Bar */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-200">Live Affiliate Dashboard Preview</h4>
                  <p className="text-[11px] text-amber-300/80">This is exact live view your affiliates see inside their dedicated partner center.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-700 font-bold">Impersonate Partner:</span>
                <select 
                  value={portalAffiliateId}
                  onChange={(e) => setPortalAffiliateId(e.target.value)}
                  className="bg-white border border-amber-500/40 text-amber-300 text-xs rounded-xl px-3 py-1.5 font-bold focus:outline-none"
                >
                  {affiliates.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.affiliateCode})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* LIVE PORTAL UI */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
              {/* Partner Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                  <img src={activePortalUser.avatar} alt={activePortalUser.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500" />
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Welcome Back, {activePortalUser.name}!</h3>
                    <p className="text-xs text-slate-600">Partner Code: <strong className="text-amber-300 font-mono">{activePortalUser.affiliateCode}</strong> • Plan: <strong className="text-indigo-400">Standard 40% + 10% 2-Tier</strong></p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold font-mono">
                    STATUS: {activePortalUser.status}
                  </span>
                </div>
              </div>

              {/* Partner KPI Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-600">Total Clicks</span>
                  <div className="text-2xl font-black text-slate-900">{activePortalUser.totalClicks.toLocaleString()}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-600">Total Referrals</span>
                  <div className="text-2xl font-black text-indigo-400">{activePortalUser.totalSalesCount}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-600">Total Commissions</span>
                  <div className="text-2xl font-black text-purple-400">${activePortalUser.commissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-600">Unpaid Payout</span>
                  <div className="text-2xl font-black text-amber-400">${(activePortalUser.commissionEarned - activePortalUser.commissionPaid).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
              </div>

              {/* Unique Link Generator */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Link className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-base font-bold text-slate-900">Your Custom Affiliate Tracking Link Generator</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Funnel / Product</label>
                    <select 
                      value={portalSelectedProduct}
                      onChange={(e) => setPortalSelectedProduct(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
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
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <code className="text-xs text-amber-300 font-mono break-all">
                    {settings.affiliateDomainUrl}?ref={activePortalUser.affiliateCode}&subid={portalSubId}
                  </code>

                  <button 
                    onClick={() => handleCopy(`${settings.affiliateDomainUrl}?ref=${activePortalUser.affiliateCode}&subid=${portalSubId}`, 'portal_link')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-indigo-600/30"
                  >
                    {copiedLink === 'portal_link' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink === 'portal_link' ? 'Copied Link!' : 'Copy Tracking Link'}</span>
                  </button>
                </div>
              </div>

              {/* 2-Tier Sub-Affiliates Network Tree */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <h4 className="text-base font-bold text-slate-900">Your 2-Tier Sub-Affiliate Network Tree</h4>
                  </div>
                  <span className="text-xs text-purple-400 font-mono font-bold">10% Sub-Kickback Active</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {affiliates.filter(a => a.parentAffiliateId === activePortalUser.id).length > 0 ? (
                    affiliates.filter(a => a.parentAffiliateId === activePortalUser.id).map(sub => (
                      <div key={sub.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={sub.avatar} alt={sub.name} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-slate-800 text-xs">{sub.name}</div>
                            <div className="text-[10px] text-slate-600 font-mono">{sub.totalSalesCount} sales generated</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-300 font-mono">${sub.grossRevenue.toLocaleString()} volume</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-6 text-xs text-slate-500 bg-white/50 rounded-xl border border-slate-200">
                      Share your recruitment link to invite partners and earn 10% sub-affiliate commissions on all their sales!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-black text-slate-900">BountyPack System Settings</h3>
              <p className="text-xs text-slate-600">Configure global attribution rules, self-referral blocks & payout defaults.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Auto-Approve Partner Applications</h4>
                  <p className="text-xs text-slate-600">Automatically grant affiliate access upon application submit.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={settings.autoApproveAffiliates}
                  onChange={(e) => setSettings({ ...settings, autoApproveAffiliates: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Self-Referral Commission Protection</h4>
                  <p className="text-xs text-slate-600">Block affiliates from earning commission on their own email purchases.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={!settings.selfReferralAllowed}
                  onChange={(e) => setSettings({ ...settings, selfReferralAllowed: !e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="space-y-2 border-b border-slate-200 pb-4">
                <h4 className="text-sm font-bold text-slate-900">Cookie Attribution Priority Mode</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSettings({ ...settings, cookieAttributionMode: 'last_click' })}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${settings.cookieAttributionMode === 'last_click' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    <div>Last-Click Priority (Recommended)</div>
                    <div className="text-[10px] text-slate-700 font-normal mt-0.5">Most recent affiliate link gets 100% direct attribution.</div>
                  </button>

                  <button 
                    onClick={() => setSettings({ ...settings, cookieAttributionMode: 'first_click' })}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${settings.cookieAttributionMode === 'first_click' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    <div>First-Click Priority</div>
                    <div className="text-[10px] text-slate-700 font-normal mt-0.5">First affiliate link clicked locks lifetime attribution.</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Default Tracking Domain URL</h4>
                <input 
                  type="text"
                  value={settings.affiliateDomainUrl}
                  onChange={(e) => setSettings({ ...settings, affiliateDomainUrl: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: VIEW APPLICATION DETAILS */}
      {isAppModalOpen && selectedAffiliate && selectedAffiliate.applicationAnswers && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <img src={selectedAffiliate.avatar} alt={selectedAffiliate.name} className="w-10 h-10 rounded-full border border-slate-300 object-cover" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedAffiliate.name} Application</h3>
                  <p className="text-xs text-slate-600">{selectedAffiliate.email}</p>
                </div>
              </div>
              <button onClick={() => setIsAppModalOpen(false)} className="text-slate-600 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-400">Traffic Source & Channels:</span>
                <p className="text-slate-800">{selectedAffiliate.applicationAnswers.trafficSource}</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-400">Monthly Audience Reach:</span>
                <p className="text-slate-800 font-mono">{selectedAffiliate.applicationAnswers.monthlyAudience}</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-400">Website URL / Social Handle:</span>
                <p className="text-amber-300 font-mono">{selectedAffiliate.applicationAnswers.websiteUrl}</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-400">Planned Promotional Methods:</span>
                <p className="text-slate-800">{selectedAffiliate.applicationAnswers.promotionalMethods}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
              <button 
                onClick={() => {
                  handleUpdateAffiliateStatus(selectedAffiliate.id, 'Approved');
                  setIsAppModalOpen(false);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30"
              >
                Approve Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE COMMISSION PLAN */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-base font-bold text-slate-900">Create New Commission Plan</h3>
              <button onClick={() => setIsPlanModalOpen(false)} className="text-slate-600 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Plan Title</label>
                <input 
                  type="text"
                  placeholder="e.g. VIP Mastermind 50% + 15%"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <input 
                  type="text"
                  placeholder="Short description of who gets this plan"
                  value={newPlanDesc}
                  onChange={(e) => setNewPlanDesc(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">1st Tier Rate (%)</label>
                  <input 
                    type="number"
                    value={newPlanTier1}
                    onChange={(e) => setNewPlanTier1(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">2nd Tier Rate (%)</label>
                  <input 
                    type="number"
                    value={newPlanTier2}
                    onChange={(e) => setNewPlanTier2(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Sticky Cookie Duration (Days)</label>
                <input 
                  type="number"
                  value={newPlanCookieDays}
                  onChange={(e) => setNewPlanCookieDays(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
              <button 
                onClick={handleCreatePlan}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-600/30"
              >
                Save Commission Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD PROMO MATERIAL */}
      {isAddPromoOpen && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-base font-bold text-slate-900">Add Promotional Marketing Asset</h3>
              <button onClick={() => setIsAddPromoOpen(false)} className="text-slate-600 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Asset Type</label>
                <select 
                  value={newPromoType}
                  onChange={(e) => setNewPromoType(e.target.value as PromoMaterial['type'])}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
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
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
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
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
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
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
              <button 
                onClick={handleAddPromo}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-600/30"
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
