// BountyPack (ClickFunnels Backpack Replica) Types Definition
export type AffiliateStatus = 'Approved' | 'Pending' | 'Denied' | 'VIP';
export type PayoutMethod = 'PayPal' | 'Stripe' | 'Direct Wire' | 'Wise';
export type TransactionStatus = 'Pending' | 'Approved' | 'Paid' | 'ClawedBack';
export type PromoMaterialType = 'email' | 'banner' | 'social' | 'document';

export interface ProductOverride {
  productId: string;
  productName: string;
  overrideRate: number;
  overrideType: 'percentage' | 'flat';
}

export interface CommissionPlan {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  tier1Rate: number; // e.g. 40 (%)
  tier1Type: 'percentage' | 'flat';
  tier2Rate: number; // e.g. 10 (%)
  tier2Type: 'percentage' | 'flat';
  stickyCookieDays: number; // e.g. 60
  holdbackDays: number; // e.g. 30
  productOverrides?: ProductOverride[];
}

export interface ApplicationAnswers {
  trafficSource: string;
  monthlyAudience: string;
  websiteUrl: string;
  promotionalMethods: string;
}

export interface AffiliateUser {
  id: string;
  affiliateCode: string;
  name: string;
  email: string;
  avatar: string;
  status: AffiliateStatus;
  planId: string;
  parentAffiliateId?: string; // For 2-tier parent
  payoutMethod: PayoutMethod;
  payoutEmail: string;
  joinedDate: string;
  totalClicks: number;
  totalLeads: number;
  totalSalesCount: number;
  grossRevenue: number;
  commissionEarned: number;
  commissionPaid: number;
  pendingHoldback: number;
  customNotes?: string;
  applicationAnswers?: ApplicationAnswers;
}

export interface ReferredTransaction {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: number;
  affiliateId: string;
  affiliateCode: string;
  tier: 1 | 2;
  commissionAmount: number;
  status: TransactionStatus;
  date: string;
  funnelName: string;
}

export interface PromoMaterial {
  id: string;
  type: PromoMaterialType;
  title: string;
  category: string;
  subjectLine?: string;
  content: string;
  imageUrl?: string;
  dimensions?: string;
  downloadsCount: number;
}

export interface ContestPrize {
  rank: number;
  prize: string;
}

export interface AffiliateContest {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Upcoming' | 'Ended';
  targetMetric: 'sales_count' | 'gross_revenue';
  goalTarget: number;
  prizePool: string;
  topPrizes: ContestPrize[];
}

export interface BountyPackSettings {
  autoApproveAffiliates: boolean;
  selfReferralAllowed: boolean;
  cookieAttributionMode: 'first_click' | 'last_click';
  defaultStickyCookieDays: number;
  defaultHoldbackDays: number;
  minimumPayoutAmount: number;
  affiliateDomainUrl: string;
  notifyOnNewCommission: boolean;
  notifyOnPayout: boolean;
}
