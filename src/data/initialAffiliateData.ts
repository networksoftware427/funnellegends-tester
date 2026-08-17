import { 
  CommissionPlan, AffiliateUser, ReferredTransaction, 
  PromoMaterial, AffiliateContest, BountyPackSettings 
} from '../types/affiliate';

export const initialCommissionPlans: CommissionPlan[] = [
  {
    id: 'plan_std_40',
    name: 'Standard Partner Plan (40% + 10% 2nd Tier)',
    description: 'Default commission tier for all approved affiliates. 40% direct, 10% 2nd-tier sub-affiliate kickback.',
    isDefault: true,
    tier1Rate: 40,
    tier1Type: 'percentage',
    tier2Rate: 10,
    tier2Type: 'percentage',
    stickyCookieDays: 60,
    holdbackDays: 30,
    productOverrides: [
      { productId: 'prod_mastermind', productName: 'High Ticket Mastermind ($9,997)', overrideRate: 25, overrideType: 'percentage' },
      { productId: 'prod_book_bump', productName: 'Physical Book Order Bump ($27)', overrideRate: 15, overrideType: 'flat' }
    ]
  },
  {
    id: 'plan_vip_50',
    name: 'VIP Super Affiliate Plan (50% + 15% 2nd Tier)',
    description: 'Exclusive plan reserved for top-performing partners generating >$50k/mo. Lifetime sticky cookies.',
    isDefault: false,
    tier1Rate: 50,
    tier1Type: 'percentage',
    tier2Rate: 15,
    tier2Type: 'percentage',
    stickyCookieDays: 365,
    holdbackDays: 14,
    productOverrides: []
  },
  {
    id: 'plan_agency_flat',
    name: 'Agency Hybrid ($500 Flat + 5% Recurring)',
    description: 'Flat payout per enterprise lead conversion + 5% ongoing monthly SaaS recurring commission.',
    isDefault: false,
    tier1Rate: 500,
    tier1Type: 'flat',
    tier2Rate: 5,
    tier2Type: 'percentage',
    stickyCookieDays: 90,
    holdbackDays: 30,
    productOverrides: []
  }
];

export const initialAffiliates: AffiliateUser[] = [
  {
    id: 'aff_alex_h',
    affiliateCode: 'HORMOZI',
    name: 'Alex Hormozi',
    email: 'alex@acquisition.demo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'VIP',
    planId: 'plan_vip_50',
    payoutMethod: 'PayPal',
    payoutEmail: 'payouts@acquisition.demo',
    joinedDate: '2026-01-15',
    totalClicks: 14250,
    totalLeads: 3890,
    totalSalesCount: 412,
    grossRevenue: 246000,
    commissionEarned: 123000,
    commissionPaid: 105000,
    pendingHoldback: 18000,
    customNotes: 'Keynote Speaker & Launch Partner. Unlocked 50% VIP tier.',
    applicationAnswers: {
      trafficSource: 'YouTube (2.1M subs), Podcast, Email List (850k)',
      monthlyAudience: '1,500,000+',
      websiteUrl: 'https://acquisition.demo',
      promotionalMethods: 'VSL reviews, dedicated email blasts, podcast integrations'
    }
  },
  {
    id: 'aff_sarah_j',
    affiliateCode: 'SARAHGLOW',
    name: 'Sarah Jenkins',
    email: 'sarah@digitalgrowth.demo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'Approved',
    planId: 'plan_std_40',
    parentAffiliateId: 'aff_alex_h', // Referred by Alex (Tier 2 test)
    payoutMethod: 'Wise',
    payoutEmail: 'sarah@digitalgrowth.demo',
    joinedDate: '2026-03-02',
    totalClicks: 4890,
    totalLeads: 1120,
    totalSalesCount: 145,
    grossRevenue: 72500,
    commissionEarned: 29000,
    commissionPaid: 22000,
    pendingHoldback: 7000,
    customNotes: 'Sub-affiliate under Alex Hormozi network.',
    applicationAnswers: {
      trafficSource: 'Instagram Reels & Newsletter',
      monthlyAudience: '320,000',
      websiteUrl: 'https://digitalgrowth.demo',
      promotionalMethods: 'Social media stories, bio link funnels'
    }
  },
  {
    id: 'aff_marcus_v',
    affiliateCode: 'MARCUSV',
    name: 'Marcus Vance',
    email: 'marcus@funnelsquad.demo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Approved',
    planId: 'plan_std_40',
    parentAffiliateId: 'aff_alex_h',
    payoutMethod: 'Stripe',
    payoutEmail: 'marcus@funnelsquad.demo',
    joinedDate: '2026-04-10',
    totalClicks: 3100,
    totalLeads: 680,
    totalSalesCount: 88,
    grossRevenue: 44000,
    commissionEarned: 17600,
    commissionPaid: 14000,
    pendingHoldback: 3600,
    customNotes: 'Focuses on paid Google Ads & VSL campaigns.'
  },
  {
    id: 'aff_pending_1',
    affiliateCode: 'BIZBOOST',
    name: 'David Sterling',
    email: 'david@sterlingbiz.demo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Pending',
    planId: 'plan_std_40',
    payoutMethod: 'Direct Wire',
    payoutEmail: 'payments@sterlingbiz.demo',
    joinedDate: '2026-08-10',
    totalClicks: 0,
    totalLeads: 0,
    totalSalesCount: 0,
    grossRevenue: 0,
    commissionEarned: 0,
    commissionPaid: 0,
    pendingHoldback: 0,
    customNotes: 'Applied via partner portal. Requires admin approval.',
    applicationAnswers: {
      trafficSource: 'B2B LinkedIn Agency Network (45k followers)',
      monthlyAudience: '90,000',
      websiteUrl: 'https://sterlingbiz.demo',
      promotionalMethods: 'Direct outreach, webinars, client bundle bonuses'
    }
  },
  {
    id: 'aff_pending_2',
    affiliateCode: 'LAURA_GROWTH',
    name: 'Laura Croft',
    email: 'laura@growthhacks.demo',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'Pending',
    planId: 'plan_std_40',
    payoutMethod: 'PayPal',
    payoutEmail: 'laura@growthhacks.demo',
    joinedDate: '2026-08-11',
    totalClicks: 0,
    totalLeads: 0,
    totalSalesCount: 0,
    grossRevenue: 0,
    commissionEarned: 0,
    commissionPaid: 0,
    pendingHoldback: 0,
    customNotes: 'TikTok media buyer looking to run spark ads.',
    applicationAnswers: {
      trafficSource: 'TikTok Ads & Organic Shorts',
      monthlyAudience: '500,000 views/mo',
      websiteUrl: 'https://tiktok.com/@lauragrowth',
      promotionalMethods: 'Paid video ads and bridge pages'
    }
  }
];

export const initialTransactions: ReferredTransaction[] = [
  {
    id: 'tx_9901',
    orderId: 'ORD-88219',
    customerName: 'Robert Vance',
    customerEmail: 'robert@techcorp.demo',
    productName: '7-Figure Launch Accelerator System',
    amount: 2997,
    affiliateId: 'aff_alex_h',
    affiliateCode: 'HORMOZI',
    tier: 1,
    commissionAmount: 1498.50, // 50% VIP
    status: 'Approved',
    date: '2026-08-11',
    funnelName: 'Main VSL Sales Funnel'
  },
  {
    id: 'tx_9902',
    orderId: 'ORD-88220',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@designstudio.demo',
    productName: '7-Figure Launch Accelerator System',
    amount: 2997,
    affiliateId: 'aff_alex_h',
    affiliateCode: 'HORMOZI',
    tier: 2, // 2nd Tier bonus for Alex because Sarah referred it!
    commissionAmount: 299.70, // 10% sub-affiliate kickback
    status: 'Approved',
    date: '2026-08-10',
    funnelName: 'High-Ticket Webinar Funnel'
  },
  {
    id: 'tx_9903',
    orderId: 'ORD-88221',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@designstudio.demo',
    productName: '7-Figure Launch Accelerator System',
    amount: 2997,
    affiliateId: 'aff_sarah_j',
    affiliateCode: 'SARAHGLOW',
    tier: 1,
    commissionAmount: 1198.80, // 40% Standard
    status: 'Approved',
    date: '2026-08-10',
    funnelName: 'High-Ticket Webinar Funnel'
  },
  {
    id: 'tx_9904',
    orderId: 'ORD-88222',
    customerName: 'Michael Chang',
    customerEmail: 'mchang@ventures.demo',
    productName: 'Course Portal VIP Membership',
    amount: 997,
    affiliateId: 'aff_marcus_v',
    affiliateCode: 'MARCUSV',
    tier: 1,
    commissionAmount: 398.80,
    status: 'Pending',
    date: '2026-08-09',
    funnelName: 'Membership Continuity Funnel'
  },
  {
    id: 'tx_9905',
    orderId: 'ORD-88223',
    customerName: 'Jessica Alba',
    customerEmail: 'jessica@media.demo',
    productName: 'High Ticket Mastermind',
    amount: 9997,
    affiliateId: 'aff_alex_h',
    affiliateCode: 'HORMOZI',
    tier: 1,
    commissionAmount: 2499.25, // Product override 25%
    status: 'Approved',
    date: '2026-08-05',
    funnelName: 'High-Ticket Mastermind Application'
  },
  {
    id: 'tx_9906',
    orderId: 'ORD-88224',
    customerName: 'David Miller',
    customerEmail: 'dmiller@cloud.demo',
    productName: '7-Figure Launch Accelerator System',
    amount: 2997,
    affiliateId: 'aff_sarah_j',
    affiliateCode: 'SARAHGLOW',
    tier: 1,
    commissionAmount: 1198.80,
    status: 'Paid',
    date: '2026-07-28',
    funnelName: 'Main VSL Sales Funnel'
  }
];

export const initialPromoMaterials: PromoMaterial[] = [
  {
    id: 'swipe_1',
    type: 'email',
    title: 'High Converting VSL Swipe #1 - "The 7-Figure Secret"',
    category: 'Cold List Broadcast',
    subjectLine: 'How {FIRST_NAME} generated $100k in 14 days without ads...',
    content: `Hey {FIRST_NAME},

If you've been trying to scale your online funnel but keep hitting a wall, you need to see this immediately.

My good friend just revealed the exact 3-step framework that generated over $2,400,000 in high-ticket sales last month.

👉 Watch the short VSL breakdown here: {AFFILIATE_LINK}

Here is what you'll discover:
1. The 2-minute order bump trick that doubles cart value.
2. How to set up automated 2-tier partner recruitment.
3. The exact page template used by top 1% funnels.

Click here to watch before the video is taken down:
{AFFILIATE_LINK}

To your success,
{AFFILIATE_NAME}`,
    downloadsCount: 1420
  },
  {
    id: 'swipe_2',
    type: 'email',
    title: 'Webinar Invite Email Swipe #2 - "Live Masterclass Tonight"',
    category: 'Webinar Promotion',
    subjectLine: '[LAST CALL] Live Funnel Breakdown starting in 2 hours...',
    content: `Hey {FIRST_NAME},

We are going live in just 2 hours for the ultimate LaunchEngine Masterclass!

Grab your seat now: {AFFILIATE_LINK}

Don't miss out on this live interactive session!`,
    downloadsCount: 980
  },
  {
    id: 'banner_1',
    type: 'banner',
    title: 'Leaderboard Header Banner (728x90 Animated)',
    category: 'Display Ads',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    dimensions: '728x90',
    content: `<a href="{AFFILIATE_LINK}" target="_blank"><img src="https://launchengine.io/banners/728x90_launch.png" alt="Build 7-Figure Funnels Fast" width="728" height="90"/></a>`,
    downloadsCount: 2310
  },
  {
    id: 'banner_2',
    type: 'banner',
    title: 'Instagram & Facebook Square Promo (1080x1080)',
    category: 'Social Graphics',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    dimensions: '1080x1080',
    content: `Use this high-converting image asset for your Instagram post or Facebook Ad campaign with your custom tracking link: {AFFILIATE_LINK}`,
    downloadsCount: 1850
  },
  {
    id: 'social_1',
    type: 'social',
    title: 'Twitter/X Thread & Social Proof Swipe',
    category: 'Organic Social',
    content: `🚀 I just tested the new LaunchEngine platform and built a high-converting webinar funnel in under 12 minutes. 

Here's my full breakdown of why it beats traditional funnel builders:
1. Zero lag drag-and-drop
2. Native BountyPack 2-tier affiliate payouts
3. Built-in AI Copilot funnel generator

Check out the demo here: {AFFILIATE_LINK}`,
    downloadsCount: 620
  }
];

export const initialContests: AffiliateContest[] = [
  {
    id: 'contest_q3_dreamcar',
    title: 'Q3 Dream Car & $25,000 Cash Blitz',
    description: 'Generate the highest total sales volume before September 30th to drive away in a brand new Tesla Model 3 Performance or take $40,000 Cash bonus!',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    status: 'Active',
    targetMetric: 'gross_revenue',
    goalTarget: 100000,
    prizePool: '$40,000 Tesla + $25,000 Cash Pool',
    topPrizes: [
      { rank: 1, prize: 'Tesla Model 3 Performance (or $40,000 Cash)' },
      { rank: 2, prize: '$15,000 Cash Bonus + Rolex Submariner' },
      { rank: 3, prize: '$7,500 Cash Bonus' },
      { rank: 4, prize: '$2,500 Cash Bonus' },
      { rank: 5, prize: '$1,000 Cash Bonus' }
    ]
  }
];

export const initialSettings: BountyPackSettings = {
  autoApproveAffiliates: false,
  selfReferralAllowed: false,
  cookieAttributionMode: 'last_click',
  defaultStickyCookieDays: 60,
  defaultHoldbackDays: 30,
  minimumPayoutAmount: 50,
  affiliateDomainUrl: 'https://growthlabs.launchengine.io/partner/',
  notifyOnNewCommission: true,
  notifyOnPayout: true
};
