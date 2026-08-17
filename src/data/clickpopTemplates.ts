import { ClickPopSettings } from '../types/builder';

export interface ClickPopTemplateItem {
  id: string;
  name: string;
  category: 'Lead Magnet' | 'Discount & Exit' | 'Webinar' | 'Agency & Coaching' | 'SaaS & Trial' | 'E-Commerce' | 'Flash Sale';
  description: string;
  badgeColor: string;
  settings: ClickPopSettings;
}

export const clickPopTemplates: ClickPopTemplateItem[] = [
  {
    id: 'ebook_blueprint',
    name: '1. Free E-Book Blueprint Vault (2-Col Split Layout)',
    category: 'Lead Magnet',
    description: 'Split 2-column layout featuring 3D book cover graphics and single-click instant PDF download form.',
    badgeColor: 'from-indigo-600 to-blue-600',
    settings: {
      enabled: true,
      triggerType: 'button',
      delaySeconds: 5,
      layoutVariant: 'book_split',
      badgeText: '⚡ FREE INSTANT PDF DOWNLOAD (2026 EDITION)',
      title: 'Get The 2026 Funnel Architecture Blueprint',
      subtitle: 'Discover the 7 proven steps top 1% agencies use to scale high-ticket sales funnels to 7-figures.',
      buttonText: 'DOWNLOAD 48-PAGE PDF GUIDE (FREE)',
      redirectUrl: '/thank-you-ebook',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'exit_80_discount',
    name: '2. Cyberpunk Exit Intent 80% Off (Glow Neon Lightbox)',
    category: 'Discount & Exit',
    description: 'High-urgency neon glow exit intent lightbox stopping leaving visitors with a $150 voucher code.',
    badgeColor: 'from-pink-600 to-purple-600',
    settings: {
      enabled: true,
      triggerType: 'exit_intent',
      delaySeconds: 0,
      layoutVariant: 'cyber_exit',
      badgeText: "⚠️ WAIT! DON'T LEAVE EMPTY HANDED!",
      title: 'Claim Your $150 Instant Voucher Code Before You Go!',
      subtitle: 'Enter your best email below to unlock your instant $150 promo code before it expires at midnight.',
      buttonText: 'CLAIM MY $150 DISCOUNT VOUCHER NOW',
      redirectUrl: '/checkout?discount=80OFF',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'webinar_gate',
    name: '3. Masterclass Webinar Pass Gate (Live Avatar Studio)',
    category: 'Webinar',
    description: 'Clean emerald studio layout with live presenter avatar badge, countdown pill, and date selector.',
    badgeColor: 'from-emerald-600 to-teal-600',
    settings: {
      enabled: true,
      triggerType: 'button',
      delaySeconds: 5,
      layoutVariant: 'webinar_pass',
      badgeText: '🎓 VIP MASTERCLASS SEAT RESERVATION (LIVE WORKSHOP)',
      title: 'Reserve Your Seat for the 60-Minute Masterclass: Zero to 7-Figure Funnels',
      subtitle: 'Learn how to build, launch, and automate high-converting upsell funnels without tech confusion.',
      buttonText: 'CONFIRM MY FREE WORKSHOP SEAT',
      redirectUrl: '/webinar-room',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'agency_strategy_audit',
    name: '4. 1-on-1 VIP Strategy Call Audit (Gold Luxury Card)',
    category: 'Agency & Coaching',
    description: 'Luxury gold metallic card with rating badge, phone number field, and high-ticket audit application.',
    badgeColor: 'from-amber-600 to-orange-600',
    settings: {
      enabled: true,
      triggerType: 'button',
      delaySeconds: 5,
      layoutVariant: 'gold_luxury',
      badgeText: '🔥 LIMITED TO FIRST 10 APPLICANTS TODAY (5.0/5.0 RATED)',
      title: 'Apply for a Private 1-on-1 Sales Funnel Audit & Revenue Review',
      subtitle: 'Our senior architects will review your sales process line-by-line and show you where you are losing revenue.',
      buttonText: 'SUBMIT VIP AUDIT APPLICATION',
      redirectUrl: '/apply-strategy',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'saas_trial_popup',
    name: '5. Free 14-Day Pro Software Trial (SaaS Feature Card)',
    category: 'SaaS & Trial',
    description: 'Modern SaaS product card with interactive feature tags, zero-card badge, and instant trial setup.',
    badgeColor: 'from-violet-600 to-indigo-600',
    settings: {
      enabled: true,
      triggerType: 'timed_delay',
      delaySeconds: 10,
      layoutVariant: 'saas_card',
      badgeText: '🚀 14-DAY UNLIMITED PRO TRIAL (ZERO CREDIT CARD REQUIRED)',
      title: 'Start Your Free 14-Day LaunchEngine Pro Trial Account',
      subtitle: 'Instant access to visual drag & drop builder, tokenized Stripe checkout, membership drip portals, and AI copywriter.',
      buttonText: 'CREATE MY FREE SAAS ACCOUNT NOW',
      redirectUrl: '/dashboard',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'insider_newsletter',
    name: '6. VIP Growth Insider Newsletter (Editorial Minimalist)',
    category: 'Lead Magnet',
    description: 'Minimalist editorial layout with serif typography accents, subscriber count badge, and Tuesday swipes.',
    badgeColor: 'from-cyan-600 to-blue-600',
    settings: {
      enabled: true,
      triggerType: 'button',
      delaySeconds: 5,
      layoutVariant: 'editorial',
      badgeText: '📩 JOIN 45,280 MARKETERS & SAAS FOUNDERS',
      title: 'Get Weekly High-Ticket Funnel Breakdown Swipes Every Tuesday',
      subtitle: 'Join 45,000+ growth marketers receiving our breakdown of top-converting landing page designs every Tuesday morning.',
      buttonText: 'SUBSCRIBE TO FREE INSIDER SWIPES',
      redirectUrl: '/newsletter-confirmed',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'flash_sale_countdown',
    name: '7. Flash Sale All-Access Bundle (Scarcity Clock Box)',
    category: 'Flash Sale',
    description: 'Crimson scarcity popup with live ticking digital clock container and 90% discount deal.',
    badgeColor: 'from-rose-600 to-red-600',
    settings: {
      enabled: true,
      triggerType: 'timed_delay',
      delaySeconds: 5,
      layoutVariant: 'flash_scarcity',
      badgeText: '⚡ FLASH SALE EXPIRES IN 15 MINUTES (90% OFF DEAL)',
      title: 'Unlock the Ultimate All-Access Funnel Vault for $97',
      subtitle: 'Get every template, course module, and automation workflow for 90% off retail value before clock hits zero.',
      buttonText: 'YES! UPGRADE MY PASS FOR $97',
      redirectUrl: '/checkout-flash',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'case_study_video',
    name: '8. Free 12-Min Video Case Study (Dark VSL Cinema)',
    category: 'Lead Magnet',
    description: 'Dark VSL cinema player layout with centered video thumbnail play button frame and instant video unlock.',
    badgeColor: 'from-indigo-600 to-cyan-600',
    settings: {
      enabled: true,
      triggerType: 'button',
      delaySeconds: 5,
      layoutVariant: 'vsl_cinema',
      badgeText: '📹 12-MINUTE CASE STUDY VIDEO BREAKDOWN',
      title: 'Watch How Sarah Generated $142,000 in 30 Days Without Paid Ads',
      subtitle: 'See the exact 2-step opt-in funnel structure and organic traffic source used to pull in 500+ buyers effortlessly.',
      buttonText: 'UNLOCK INSTANT VIDEO CASE STUDY',
      redirectUrl: '/case-study-vsl',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'beta_waitlist',
    name: '9. Early Access VIP Beta Waitlist (Futuristic Glassmorphism)',
    category: 'SaaS & Trial',
    description: 'Futuristic dark glassmorphism card with glowing ticket badge and company URL lead field.',
    badgeColor: 'from-purple-600 to-indigo-600',
    settings: {
      enabled: true,
      triggerType: 'button',
      delaySeconds: 5,
      layoutVariant: 'beta_glass',
      badgeText: '🔒 EXCLUSIVE BETA WAITLIST PASS (TICKET #0482)',
      title: 'Be First to Deploy LaunchEngine V2 Autonomous AI Engine',
      subtitle: 'Spots are strictly capped at 500 beta users. Register your work email to lock in early adopter lifetime pricing.',
      buttonText: 'SECURE MY VIP BETA TICKET NOW',
      redirectUrl: '/waitlist-success',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'spin_mystery_gift',
    name: '10. Gamified Mystery Gift Unlock (Fortune Wheel Box)',
    category: 'E-Commerce',
    description: 'Gamified e-commerce popup with fortune prize tag badge, gift card code, and cart checkout boost.',
    badgeColor: 'from-amber-500 to-pink-500',
    settings: {
      enabled: true,
      triggerType: 'exit_intent',
      delaySeconds: 0,
      layoutVariant: 'spin_wheel',
      badgeText: '🎁 MYSTERY BONUS GIFT UNLOCKED ($200 VALUE)',
      title: 'You Won a Mystery Gift! Claim Your $200 Discount Voucher',
      subtitle: 'Enter your email to claim your mystery coupon reward and instant checkout gift before leaving this page.',
      buttonText: 'CLAIM MY $200 MYSTERY GIFT NOW',
      redirectUrl: '/checkout?gift=claimed',
      backdropBlur: true,
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    }
  }
];
