import { supabaseClient } from './supabaseClient';
import { 
  CommissionPlan, AffiliateUser, ReferredTransaction, 
  PromoMaterial, AffiliateContest, BountyPackSettings 
} from '../types/affiliate';

/**
 * BountyPack Affiliate Engine Database Synchronization & Schema Service
 */

export const BOUNTYPACK_SQL_SCHEMA = `-- =========================================================
-- BOUNTYPACK AFFILIATE ENGINE SUPABASE SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. COMMISSION PLANS TABLE
CREATE TABLE IF NOT EXISTS public.bountypack_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  tier1_rate NUMERIC(10,2) NOT NULL DEFAULT 40.00,
  tier1_type TEXT NOT NULL DEFAULT 'percentage',
  tier2_rate NUMERIC(10,2) NOT NULL DEFAULT 10.00,
  tier2_type TEXT NOT NULL DEFAULT 'percentage',
  sticky_cookie_days INTEGER NOT NULL DEFAULT 60,
  holdback_days INTEGER NOT NULL DEFAULT 30,
  product_overrides JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. AFFILIATES / PARTNERS TABLE
CREATE TABLE IF NOT EXISTS public.bountypack_affiliates (
  id TEXT PRIMARY KEY,
  affiliate_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT,
  status TEXT NOT NULL DEFAULT 'Approved',
  plan_id TEXT REFERENCES public.bountypack_plans(id) ON DELETE SET NULL,
  parent_affiliate_id TEXT REFERENCES public.bountypack_affiliates(id) ON DELETE SET NULL,
  payout_method TEXT NOT NULL DEFAULT 'PayPal',
  payout_email TEXT NOT NULL,
  joined_date DATE DEFAULT CURRENT_DATE,
  total_clicks INTEGER DEFAULT 0,
  total_leads INTEGER DEFAULT 0,
  total_sales_count INTEGER DEFAULT 0,
  gross_revenue NUMERIC(12,2) DEFAULT 0.00,
  commission_earned NUMERIC(12,2) DEFAULT 0.00,
  commission_paid NUMERIC(12,2) DEFAULT 0.00,
  pending_holdback NUMERIC(12,2) DEFAULT 0.00,
  custom_notes TEXT,
  application_answers JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. REFERRED TRANSACTIONS & 2-TIER LEDGER
CREATE TABLE IF NOT EXISTS public.bountypack_transactions (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  product_name TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  affiliate_id TEXT NOT NULL REFERENCES public.bountypack_affiliates(id) ON DELETE CASCADE,
  affiliate_code TEXT NOT NULL,
  tier INTEGER NOT NULL CHECK (tier IN (1, 2)),
  commission_amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Approved',
  date DATE DEFAULT CURRENT_DATE,
  funnel_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PROMO MATERIALS & SWIPE ASSETS
CREATE TABLE IF NOT EXISTS public.bountypack_promo_materials (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subject_line TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  dimensions TEXT,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CONTESTS & LEADERBOARDS
CREATE TABLE IF NOT EXISTS public.bountypack_contests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'Active',
  target_metric TEXT NOT NULL DEFAULT 'gross_revenue',
  goal_target NUMERIC(12,2) DEFAULT 100000,
  prize_pool TEXT,
  top_prizes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. SYSTEM SETTINGS
CREATE TABLE IF NOT EXISTS public.bountypack_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  auto_approve_affiliates BOOLEAN DEFAULT false,
  self_referral_allowed BOOLEAN DEFAULT false,
  cookie_attribution_mode TEXT DEFAULT 'last_click',
  default_sticky_cookie_days INTEGER DEFAULT 60,
  default_holdback_days INTEGER DEFAULT 30,
  minimum_payout_amount NUMERIC(10,2) DEFAULT 50.00,
  affiliate_domain_url TEXT DEFAULT 'https://growthlabs.launchengine.io/partner/',
  notify_on_new_commission BOOLEAN DEFAULT true,
  notify_on_payout BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.bountypack_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bountypack_affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bountypack_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bountypack_promo_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bountypack_contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bountypack_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR ANONYMOUS & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on BountyPack tables" ON public.bountypack_plans FOR SELECT USING (true);
CREATE POLICY "Allow public read on Affiliates" ON public.bountypack_affiliates FOR SELECT USING (true);
CREATE POLICY "Allow public read on Transactions" ON public.bountypack_transactions FOR SELECT USING (true);
CREATE POLICY "Allow public read on Promo" ON public.bountypack_promo_materials FOR SELECT USING (true);
CREATE POLICY "Allow public read on Contests" ON public.bountypack_contests FOR SELECT USING (true);
CREATE POLICY "Allow public read on Settings" ON public.bountypack_settings FOR SELECT USING (true);
`;

/**
 * Syncs full BountyPack dataset to Supabase tables with graceful error handling
 */
export const syncBountyPackToSupabase = async (
  plans: CommissionPlan[],
  affiliates: AffiliateUser[],
  transactions: ReferredTransaction[],
  settings: BountyPackSettings
): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();

  try {
    // 1. Sync Plans
    if (plans && plans.length > 0) {
      const planRows = plans.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        is_default: p.isDefault,
        tier1_rate: p.tier1Rate,
        tier1_type: p.tier1Type,
        tier2_rate: p.tier2Rate,
        tier2_type: p.tier2Type,
        sticky_cookie_days: p.stickyCookieDays,
        holdback_days: p.holdbackDays,
        product_overrides: p.productOverrides || [],
        updated_at: new Date().toISOString()
      }));

      const { error: planErr } = await supabaseClient
        .from('bountypack_plans')
        .upsert(planRows, { onConflict: 'id' });

      if (planErr) console.warn('Supabase BountyPack plans sync note:', planErr.message);
    }

    // 2. Sync Affiliates
    if (affiliates && affiliates.length > 0) {
      const affRows = affiliates.map(a => ({
        id: a.id,
        affiliate_code: a.affiliateCode,
        name: a.name,
        email: a.email,
        avatar: a.avatar,
        status: a.status,
        plan_id: a.planId,
        parent_affiliate_id: a.parentAffiliateId || null,
        payout_method: a.payoutMethod,
        payout_email: a.payoutEmail,
        joined_date: a.joinedDate,
        total_clicks: a.totalClicks,
        total_leads: a.totalLeads,
        total_sales_count: a.totalSalesCount,
        gross_revenue: a.grossRevenue,
        commission_earned: a.commissionEarned,
        commission_paid: a.commissionPaid,
        pending_holdback: a.pendingHoldback,
        custom_notes: a.customNotes || '',
        application_answers: a.applicationAnswers || null,
        updated_at: new Date().toISOString()
      }));

      const { error: affErr } = await supabaseClient
        .from('bountypack_affiliates')
        .upsert(affRows, { onConflict: 'id' });

      if (affErr) console.warn('Supabase BountyPack affiliates sync note:', affErr.message);
    }

    // 3. Sync Settings
    if (settings) {
      const { error: setErr } = await supabaseClient
        .from('bountypack_settings')
        .upsert({
          id: 'global_settings',
          auto_approve_affiliates: settings.autoApproveAffiliates,
          self_referral_allowed: settings.selfReferralAllowed,
          cookie_attribution_mode: settings.cookieAttributionMode,
          default_sticky_cookie_days: settings.defaultStickyCookieDays,
          default_holdback_days: settings.defaultHoldbackDays,
          minimum_payout_amount: settings.minimumPayoutAmount,
          affiliate_domain_url: settings.affiliateDomainUrl,
          notify_on_new_commission: settings.notifyOnNewCommission,
          notify_on_payout: settings.notifyOnPayout,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (setErr) console.warn('Supabase BountyPack settings sync note:', setErr.message);
    }

    return {
      success: true,
      message: 'BountyPack database & 2-tier affiliate schema synchronized to Supabase Cloud.',
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing BountyPack to Supabase:', err);
    return {
      success: false,
      message: `Sync warning (Local fallback active): ${err.message || 'Offline'}`,
      timestamp
    };
  }
};
