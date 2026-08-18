import React, { useState } from 'react';
import { 
  BookOpen, Search, Sparkles, Layers, Rocket, Globe, GraduationCap, 
  GitBranch, Users, Gift, CalendarCheck, MessageSquare, Settings, 
  CheckCircle2, ArrowRight, ExternalLink, Zap, Sliders, Split, ShieldCheck,
  MousePointerClick, Play, HelpCircle, ChevronRight, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';

interface ToolGuide {
  id: string;
  toolName: string;
  category: string;
  icon: any;
  targetTab: string;
  badge: string;
  summary: string;
  readTime: string;
  features: string[];
  steps: { title: string; desc: string; tip?: string }[];
  proTips: string[];
  faq: { q: string; a: string }[];
}

const toolGuides: ToolGuide[] = [
  {
    id: 'guide-builder',
    toolName: 'Visual Funnel & Page Canvas Builder',
    category: 'Funnel & Web Design',
    icon: Layers,
    targetTab: 'builder',
    badge: 'Core Engine',
    summary: 'Master the drag-and-drop page builder with 30+ responsive element widgets, custom Google Fonts typography, color palettes, and JSON canvas export/import.',
    readTime: '4 min read',
    features: [
      'Flexible Section, Row, and Column nested hierarchy with custom gutters and alignment',
      '30+ Interactive widgets: Headlines, VSL video players, 2-Step order forms, pricing cards, countdown timers, FAQ accordions',
      'Viewport simulation: Desktop, Tablet (768px), and Mobile (390px) responsive previewing',
      'Global Design Tokens: One-click primary, secondary, and accent theme presets with instant site-wide application',
      'ClickPop modal engine: Exit-intent and button-triggered popup overlays',
      'Full JSON Canvas export & import for backup and template migration'
    ],
    steps: [
      { title: '1. Select or Add a Funnel Step', desc: 'Choose the step you want to edit from the top dropdown or click "+ Add Step" to create a new page.', tip: 'Presets are pre-configured with optimal column layouts and high-converting copy frameworks.' },
      { title: '2. Drag & Drop Elements into Columns', desc: 'Open the Sidebar Catalog to browse layout, typography, media, form, and conversion widgets. Drag any widget into a column target.', tip: 'Use the Element Inspector on the right panel to customize spacing, typography, colors, and borders in real-time.' },
      { title: '3. Test Responsive Viewports', desc: 'Click the Desktop, Tablet, or Mobile viewport icons in the top bar to verify that your layouts adapt perfectly across all screen resolutions.', tip: 'Fonts and button sizes automatically scale responsively on mobile.' },
      { title: '4. Save & Preview', desc: 'Click "Save Changes" to store the canvas, then click "Live Preview" to test real user interactions in a clean preview environment.' }
    ],
    proTips: [
      'Always include high-contrast CTA buttons above the fold to maximize initial opt-in conversion.',
      'Use ClickPop exit-intent triggers on order and sales pages to recover up to 15-20% of bouncing visitors.'
    ],
    faq: [
      { q: 'How do I change the font across the entire page?', a: 'Open the Global Tokens palette (Palette icon in the toolbar), choose your desired heading and body fonts, and click "Apply Theme Tokens" to instantly update every text element.' },
      { q: 'How do I download my canvas layout?', a: 'Click the Download (arrow down) icon in the top toolbar to export a complete .json canvas backup.' }
    ]
  },
  {
    id: 'guide-funnels',
    toolName: 'Multi-Step Funnel Workspaces',
    category: 'Conversion Funnels',
    icon: Rocket,
    targetTab: 'funnels',
    badge: 'Multi-Step Architecture',
    summary: 'Build high-converting sales pipelines with lead squeeze pages, VSL pitch pages, 2-step checkout orders, 1-click OTO upsells, and thank you receipts.',
    readTime: '3 min read',
    features: [
      'Pre-built battle-tested blueprints: Lead Magnet, Video Squeeze, VSL Pitch, 2-Step Order, Product Launch, and Webinar funnels',
      'Automated step ordering and sequential funnel flow routing',
      'Multi-tenant workspace isolation with custom URL slugs (/funnel-slug/step-slug)',
      '1-Click template instantiation from the Funnel Cookbook library'
    ],
    steps: [
      { title: '1. Create a New Funnel Workspace', desc: 'From the Funnels overview, click "New Funnel from Template" to browse 37+ conversion blueprints.', tip: 'Choose a funnel type matching your traffic temperature (Cold lead capture, Warm VSL, or Hot 2-step checkout).' },
      { title: '2. Customize Step Progression', desc: 'Reorder steps, configure page slugs, and ensure each page links seamlessly to the next stage in your buyer journey.', tip: 'Order bumps and 1-click upsells increase average cart value by up to 35%.' },
      { title: '3. Configure Domain & Publish', desc: 'Head to Publishing & Domain Routing to assign custom CNAME domains and enable SSL.' }
    ],
    proTips: [
      'Keep your optin form fields minimal (Name + Email only) on step 1 to achieve conversion rates above 40%.',
      'Place your 1-Click OTO (One-Time Offer) immediately after the checkout step before the receipt confirmation.'
    ],
    faq: [
      { q: 'Can I add more steps to an existing funnel?', a: 'Yes! In the Visual Builder, click the "+ Add Step" button in the top bar to insert additional upsells, downsells, or confirmation pages.' }
    ]
  },
  {
    id: 'guide-websites',
    toolName: 'Cookbook Websites Manager',
    category: 'Websites & Portals',
    icon: Globe,
    targetTab: 'websites',
    badge: 'Multi-Page Sites',
    summary: 'Create full-scale multi-page business websites with synchronized navigation, headers, footers, and SEO optimization.',
    readTime: '3 min read',
    features: [
      '5 Complete multi-page website templates: Agency, SaaS, Coaching, Local Business, and E-commerce',
      'Unified brand styling and shared navigation menus across all website pages',
      'Integrated contact forms, pricing tables, team profiles, and case study grids',
      'One-click website template cloning into your active visual workspace'
    ],
    steps: [
      { title: '1. Browse Website Blueprints', desc: 'Navigate to "Websites" to explore pre-assembled multi-page website templates tailored for modern businesses.', tip: 'Each template includes Home, About, Services, Pricing, and Contact pages.' },
      { title: '2. Clone Template to Workspace', desc: 'Click "Use Template & Edit in Visual Builder" to import all pages directly into your active builder.', tip: 'All pages share your chosen color theme and typography.' },
      { title: '3. Customize Content & SEO', desc: 'Update text, imagery, contact info, and configure page titles and meta descriptions in Global Settings.' }
    ],
    proTips: [
      'Ensure your website navigation includes direct CTA links to your high-converting funnels for maximum lead generation.'
    ],
    faq: [
      { q: 'How do I link website buttons to my funnel checkout?', a: 'Set the button element link property to your funnel URL (e.g. /checkout or /vsl) in the element inspector.' }
    ]
  },
  {
    id: 'guide-courses',
    toolName: 'Course & Membership Portal',
    category: 'Education & Gated Content',
    icon: GraduationCap,
    targetTab: 'membership',
    badge: 'LMS Platform',
    summary: 'Deliver premium digital courses, training video modules, downloadable resource attachments, and gated member access.',
    readTime: '3 min read',
    features: [
      'Hierarchical course structure: Modules, Lessons, Chapters, and downloadable worksheets',
      'Multi-tier access control (VIP Enterprise, Pro Member, Standard, Free Trial)',
      'Rich media lesson player supporting YouTube, Vimeo, MP4, and embedded video hosting',
      'Student progress tracking with lesson completion toggles and certificates'
    ],
    steps: [
      { title: '1. Set Up Course Details', desc: 'Enter your course title, description, instructor bio, and cover artwork in the Course Portal.', tip: 'High-quality cover graphics increase student engagement and course perceived value.' },
      { title: '2. Create Modules & Lessons', desc: 'Add structured learning modules and populate lessons with video URLs, text summaries, and downloadable PDF assets.', tip: 'Break complex topics into bite-sized 5-10 minute video lessons.' },
      { title: '3. Gate Access by Membership Tier', desc: 'Assign access permissions so only members with the required tier can unlock specific modules.' }
    ],
    proTips: [
      'Add downloadable bonus action guides and templates under lesson resources to boost student completion rates.'
    ],
    faq: [
      { q: 'Can members stream video lessons on mobile devices?', a: 'Yes! The course portal player is fully responsive and optimized for seamless playback on iOS and Android devices.' }
    ]
  },
  {
    id: 'guide-publishing',
    toolName: 'Publishing & Edge A/B Split Testing',
    category: 'Infrastructure & Traffic',
    icon: Split,
    targetTab: 'publishing',
    badge: 'Edge Routing',
    summary: 'Deploy live pages with custom CNAME domains, automatic SSL, and optimize conversions with edge-based A/B traffic split testing.',
    readTime: '3 min read',
    features: [
      'Instant live URL generation with direct new-tab preview and clipboard copying',
      'Custom domain mapping with Cloudflare / GoDaddy / Namecheap CNAME resolution',
      'Edge A/B Split Testing engine with custom traffic weighting (e.g. 50% / 50% or 70% / 30%)',
      'Traffic simulation runner to forecast conversion rates and determine winning page variants',
      'Lifecycle state machine: Draft, Scheduled, Published (Live), and Archived states'
    ],
    steps: [
      { title: '1. Access Live Step URL', desc: 'In the Publishing tab, your resolved live page URL is displayed ready to share with visitors or launch in a new tab.', tip: 'Use "Copy Live URL" or "Open in New Tab" to test live interactivity.' },
      { title: '2. Set Up Custom CNAME Domain', desc: 'Enter your custom domain (e.g. funnel.yourbrand.com) and add a CNAME record in your DNS provider pointing to cname.funnellegends.com.', tip: 'Edge SSL certificates are automatically provisioned and renewed.' },
      { title: '3. Enable & Run A/B Split Testing', desc: 'Switch to the A/B Split tab, enable split routing, adjust traffic distribution, and test Variant A vs Variant B performance.', tip: 'Simulate 1,000 visitors to evaluate conversion rate lift before launching paid ads.' }
    ],
    proTips: [
      'When split testing, test one high-impact variable at a time (e.g. Headline hook or CTA button offer) for clear statistical attribution.'
    ],
    faq: [
      { q: 'Where do I find my DNS CNAME record?', a: 'In the Publishing > Domain Routing tab, copy the CNAME record "cname.funnellegends.com" and add it in your domain registrar DNS settings.' }
    ]
  },
  {
    id: 'guide-automations',
    toolName: 'Automation Workflow Studio',
    category: 'Email & Marketing Automation',
    icon: GitBranch,
    targetTab: 'automations',
    badge: 'Visual Workflow Builder',
    summary: 'Build intelligent marketing automations with visual node triggers, autoresponder email sequences, delays, conditional splits, and webhook webhooks.',
    readTime: '4 min read',
    features: [
      'Visual drag-and-drop canvas with connecting edges and node execution state indicators',
      'Entry triggers: Form Submitted, Order Completed, Tag Added, Appointment Booked, Course Enrolled',
      'Action nodes: Send Email, Assign Tag, Update CRM Stage, Delay Time (Hours/Days), HTTP Webhook',
      'Condition branches: If/Else splits based on contact tags, deal value, or previous email opens',
      'Direct node execution connecting triggers to multi-step actions and email templates'
    ],
    steps: [
      { title: '1. Select Entry Trigger', desc: 'Choose the event that initiates the workflow (e.g. "New Lead Opted In" or "Stripe Order Completed").', tip: 'Triggers automatically pull lead details into workflow execution variables.' },
      { title: '2. Connect Action Nodes', desc: 'Add a "Send Email" action node with your welcome message, followed by a "Delay" node (e.g. 24 hours), then a follow-up email.', tip: 'Use pre-tested email copy templates for high open and click-through rates.' },
      { title: '3. Activate & Deploy Workflow', desc: 'Review your step sequences and message templates to publish the automated customer journey.' }
    ],
    proTips: [
      'Apply a tag (e.g. "Customer - VIP") immediately upon order completion to segment your buyers from free leads.'
    ],
    faq: [
      { q: 'Can I connect my automations to external apps like Zapier or Make?', a: 'Yes! Add a "Webhook Action" node and paste your webhook destination URL to transmit real-time payload data.' }
    ]
  },
  {
    id: 'guide-crm',
    toolName: 'CRM Pipeline & Lead Manager',
    category: 'Sales & Contact Management',
    icon: Users,
    targetTab: 'crm',
    badge: 'Visual Deal Pipeline',
    summary: 'Track leads, organize visual Kanban deal stages, calculate pipeline revenue, assign tags, and monitor contact activity timelines.',
    readTime: '3 min read',
    features: [
      'Kanban deal pipeline with drag-and-drop deal progression across stages (New Lead, Discovery, Proposal, Won)',
      'Lead scoring algorithm based on page views, form submissions, and email engagement',
      'Contact profiles with interaction timelines, assigned tags, and deal value calculations',
      'CSV import and export for contact database synchronization'
    ],
    steps: [
      { title: '1. Organize Pipeline Stages', desc: 'Customize stages to match your exact sales process (e.g. New Lead → Call Booked → Proposal Sent → Closed Won).', tip: 'Keep deal values updated to see accurate total pipeline revenue forecasts.' },
      { title: '2. Add and Segment Contacts', desc: 'Contacts captured through funnel opt-in forms automatically enroll into your CRM with matching tags.', tip: 'Use contact filtering by tag or stage to target high-intent prospects.' },
      { title: '3. Drag Deals Across Stages', desc: 'Move deal cards across the Kanban board as conversations advance to update status in real-time.' }
    ],
    proTips: [
      'Prioritize follow-ups with leads scoring above 80 points for highest close rates.'
    ],
    faq: [
      { q: 'Do leads captured in my funnels go into the CRM automatically?', a: 'Yes! All form submissions on your published pages instantly create or update contacts in your CRM pipeline.' }
    ]
  },
  {
    id: 'guide-affiliate',
    toolName: 'BountyPack Affiliate & Partner Program',
    category: 'Affiliate Marketing',
    icon: Gift,
    targetTab: 'affiliate',
    badge: 'Partner Network',
    summary: 'Launch an affiliate army with tiered commission structures, unique affiliate referral links, marketing banners, and payout management.',
    readTime: '3 min read',
    features: [
      'Custom commission plans: 1st-Tier (e.g. 40%) and 2nd-Tier (e.g. 10%) recurring and one-time payouts',
      'Automated affiliate referral link generation with cookie tracking duration settings',
      'Affiliate resource hub: Pre-made promotional banners, email swipe copy, and social posts',
      'Payout tracking with automated ledger balances and transaction history'
    ],
    steps: [
      { title: '1. Create Commission Plans', desc: 'Set up commission percentages and payout terms in the BountyPack Plans tab.', tip: 'Offering 40-50% recurring commissions attracts top-tier super affiliates.' },
      { title: '2. Upload Promo Swipe Materials', desc: 'Provide affiliates with pre-written email swipes, banner ads, and video hooks to make promotion effortless.', tip: 'High-performing swipe copy dramatically increases partner sales volume.' },
      { title: '3. Track Referrals & Process Payouts', desc: 'Monitor incoming partner sales, track commission balances, and mark payouts as completed in the ledger.' }
    ],
    proTips: [
      'Run monthly affiliate leaderboard contests in TribeNexus to gamify partner sales competitions.'
    ],
    faq: [
      { q: 'How do affiliates get their tracking links?', a: 'Each affiliate profile in BountyPack has a dedicated referral link (e.g. /partner/?ref=aff_id) with automated cookie attribution.' }
    ]
  },
  {
    id: 'guide-appointments',
    toolName: 'ChronoChimp Appointment Scheduler',
    category: 'Calendar & Bookings',
    icon: CalendarCheck,
    targetTab: 'appointments',
    badge: '1-on-1 Booking System',
    summary: 'Automate calendar scheduling with custom event types, host availability, buffer times, email/SMS reminders, and embeddable booking widgets.',
    readTime: '3 min read',
    features: [
      'Configurable Event Types: 15-min Discovery, 45-min Strategy Demo, 60-min VIP Consulting',
      'Round-robin and individual host calendar availability management',
      'Embeddable booking widget code for funnel pages and websites',
      'Automated confirmation notifications and reminder sequence triggers'
    ],
    steps: [
      { title: '1. Set Up Event Types', desc: 'Configure meeting title, duration, buffer times, and questions for prospects to answer before booking.', tip: 'Add qualifying questions to ensure you only get on calls with high-fit clients.' },
      { title: '2. Configure Host Availability', desc: 'Set available weekly time slots and blackout dates for your team members.', tip: 'Buffer times between meetings prevent schedule fatigue.' },
      { title: '3. Embed Booking Calendar on Funnel Pages', desc: 'Use the ChronoChimp Calendar widget in the Visual Builder to allow prospects to book directly inside your funnel.' }
    ],
    proTips: [
      'Trigger an automated SMS reminder 1 hour before scheduled calls to cut no-shows down to below 5%.'
    ],
    faq: [
      { q: 'Can I redirect attendees to a custom thank you page after booking?', a: 'Yes! Set your custom Redirect URL in the Event Type configuration (e.g. /thank-you-booking).' }
    ]
  },
  {
    id: 'guide-community',
    toolName: 'TribeNexus Community & Social Hub',
    category: 'Community & Engagement',
    icon: Users,
    targetTab: 'community',
    badge: 'Social & Member Hub',
    summary: 'Engage your audience with interactive discussion spaces, rich media posts, member leaderboards, badges, and gamified engagement.',
    readTime: '3 min read',
    features: [
      'Dedicated Community Spaces: General Discussion, Q&A Helpdesk, Wins & Case Studies, VIP Mastermind',
      'Rich media posts with image attachments, polls, tags, likes, and threaded comments',
      'Gamified Member Leaderboard with point scoring, level tiers, and achievement badges',
      'Moderator controls: Pin announcements, lock topics, and manage member permissions'
    ],
    steps: [
      { title: '1. Create Category Spaces', desc: 'Organize your community into focused topic spaces to encourage targeted member discussions.', tip: 'Create a dedicated "#Wins-and-Results" space to showcase social proof.' },
      { title: '2. Publish Welcome Post & Rules', desc: 'Pin an introductory post welcoming new members and outlining community guidelines.', tip: 'Encourage members to introduce themselves to spark early engagement.' },
      { title: '3. Award Badges & Points', desc: 'Reward active participants with points for posts and helpful comments to climb the leaderboard.' }
    ],
    proTips: [
      'Host weekly Q&A threads to answer member questions and foster high retention.'
    ],
    faq: [
      { q: 'Can I restrict certain spaces to VIP members only?', a: 'Yes! You can configure space privacy to be open to all members or gated for VIP enterprise subscribers.' }
    ]
  },
  {
    id: 'guide-messagehub',
    toolName: 'PingPanda Omnichannel Message Hub',
    category: 'Live Chat & Messaging',
    icon: MessageSquare,
    targetTab: 'messagehub',
    badge: 'Unified Inbox',
    summary: 'Consolidate live website chat, SMS, Email, WhatsApp, and Telegram in a unified inbox with AI conversation assistants and canned responses.',
    readTime: '3 min read',
    features: [
      'Unified multi-channel inbox: Live Web Chat, SMS, Email, WhatsApp, Telegram, and Webhook routing',
      'Customizable live chat widget embed script for all your funnel and website pages',
      'AI Assistant copilot to draft smart customer responses in one click',
      'Canned response macros for instant answers to frequently asked questions'
    ],
    steps: [
      { title: '1. Embed PingPanda Live Chat Widget', desc: 'Copy the widget embed snippet and paste it into Global Platform Settings > Header Script.', tip: 'The floating chat widget appears automatically across all published pages.' },
      { title: '2. Manage Incoming Conversations', desc: 'View all active visitor chats in the unified inbox, assign conversations to teammates, and reply in real-time.', tip: 'Use AI suggestion pills to draft high-converting sales responses in seconds.' },
      { title: '3. Set Up Canned Responses', desc: 'Create quick shortcut macros (e.g. /pricing or /booking) to answer common customer inquiries rapidly.' }
    ],
    proTips: [
      'Use PingPanda proactive chat triggers on pricing pages to engage high-intent visitors before they leave.'
    ],
    faq: [
      { q: 'How do I add the live chat widget to my funnel?', a: 'Go to PingPanda > Widget Embed, copy the script tag, and paste it into your page settings or Global Settings.' }
    ]
  },
  {
    id: 'guide-ai',
    toolName: 'AI Copilot & Marketing Copy Generator',
    category: 'AI & Automation',
    icon: Sparkles,
    targetTab: 'dashboard',
    badge: 'AI Intelligence',
    summary: 'Generate high-converting headlines, sales hooks, email sequences, objection handlers, and custom code injection scripts with AI.',
    readTime: '2 min read',
    features: [
      'AI Headline Generator: Curiosity hooks, benefit-driven headlines, and scarcity pitches',
      'Sales Letter & VSL Script Generator: Full video sales letter copy frameworks',
      'Email Sequence Writer: 5-day welcome sequences, abandoned cart recovery, and promotional blasts',
      'Code Injection Copilot: Custom CSS styles and JavaScript snippet generator'
    ],
    steps: [
      { title: '1. Launch AI Copilot', desc: 'Click the "AI Copilot" button in the top header bar from anywhere inside the platform.', tip: 'You can access the AI modal during visual builder editing without leaving your canvas.' },
      { title: '2. Choose Copy Mode or Goal', desc: 'Select your target framework (Headlines, Email Copy, Sales Hooks, or Code).', tip: 'Provide your product name and target audience for hyper-tailored results.' },
      { title: '3. Apply Directly to Canvas', desc: 'Copy generated text or insert it directly into your active visual element with one click.' }
    ],
    proTips: [
      'Generate 3-5 headline variations with AI and test them against each other in the A/B Split Testing engine.'
    ],
    faq: [
      { q: 'Is there a limit on how many AI copy variations I can generate?', a: 'No! All FunnelLegends active members enjoy unlimited AI Copilot generation.' }
    ]
  },
  {
    id: 'guide-settings',
    toolName: 'Global Platform Settings & Master Integrations',
    category: 'Workspace Configuration',
    icon: Settings,
    targetTab: 'settings',
    badge: 'System Config',
    summary: 'Configure master brand identities, custom root domains, currency, SEO tracking pixels, SMTP email gateways, and payment keys.',
    readTime: '3 min read',
    features: [
      'Master Agency branding: Business name, default currency (USD, GBP, EUR), and timezone',
      'Tracking & Analytics: Google Analytics 4, Facebook Meta Pixel, and custom header/footer script injection',
      'Stripe Payment Gateway: Live and test mode toggling with automated invoice receipts',
      'SMTP Email configuration: Sender name, email address, and double opt-in preferences',
      'Workspace security: Enforced HTTPS, maintenance mode, and data backup controls'
    ],
    steps: [
      { title: '1. Configure Agency Identity', desc: 'Set your agency name and master domain in Settings > General & Branding.', tip: 'These settings automatically populate across customer invoices and portal receipts.' },
      { title: '2. Add Analytics & Tracking Pixels', desc: 'Paste your Google Analytics ID (G-XXXX) and Meta Pixel ID in Settings > SEO & Tracking.', tip: 'Scripts are automatically injected across all published funnels on your workspace.' },
      { title: '3. Verify Payment & Email Gateways', desc: 'Connect Stripe and verify your sender email address to ensure 100% deliverability.' }
    ],
    proTips: [
      'Enable "Enforce HTTPS" to guarantee that all funnel and checkout visitors receive encrypted SSL connections.'
    ],
    faq: [
      { q: 'Where do I add custom CSS or Google Tag Manager?', a: 'Go to Settings > SEO & Tracking and paste your scripts into the "Header Tracking Script" or "Footer Script" fields.' }
    ]
  }
];

interface GuidesPageProps {
  onNavigateToTab: (tab: string) => void;
  onNavigateToSupport?: () => void;
  onNavigateToContact?: () => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ 
  onNavigateToTab,
  onNavigateToSupport,
  onNavigateToContact
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeGuideId, setActiveGuideId] = useState<string>(toolGuides[0].id);
  const [copiedTip, setCopiedTip] = useState<string | null>(null);

  const categories = ['All', 'Funnel & Web Design', 'Conversion Funnels', 'Websites & Portals', 'Education & Gated Content', 'Infrastructure & Traffic', 'Email & Marketing Automation', 'Sales & Contact Management', 'Affiliate Marketing', 'Calendar & Bookings', 'Community & Engagement', 'Live Chat & Messaging', 'AI & Automation', 'Workspace Configuration'];

  const filteredGuides = toolGuides.filter(g => {
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    const matchesSearch = g.toolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          g.steps.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeGuide = toolGuides.find(g => g.id === activeGuideId) || filteredGuides[0] || toolGuides[0];

  const handleCopyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTip(key);
    setTimeout(() => setCopiedTip(null), 2000);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      {/* ── TOP HEADER ── */}
      <div 
        className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <BookOpen className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                Tool Guides & Feature Manuals
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                Complete 12-Tool Encyclopedia
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">In-depth feature walkthroughs, step-by-step masterclasses & conversion best practices.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onNavigateToSupport && (
            <button
              onClick={onNavigateToSupport}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-emerald-200" />
              <span>Support Desk</span>
            </button>
          )}

          {onNavigateToContact && (
            <button
              onClick={onNavigateToContact}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>Contact Us</span>
            </button>
          )}
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 space-y-3 shrink-0 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, tools, features, or keywords (e.g. A/B split, stripe, countdown, widgets)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold shrink-0">
            <span>Showing {filteredGuides.length} of {toolGuides.length} Tool Guides</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm font-black'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN 2-COLUMN VIEW ── */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Tool Guide Cards Directory */}
        <div className="lg:col-span-4 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {filteredGuides.map((guide) => {
            const IconComp = guide.icon;
            const isSelected = guide.id === activeGuide.id;
            return (
              <div
                key={guide.id}
                onClick={() => setActiveGuideId(guide.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase text-emerald-700 truncate">{guide.category}</span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{guide.readTime}</span>
                    </div>
                    <h3 className="text-xs font-black text-slate-900 truncate mt-0.5">{guide.toolName}</h3>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">{guide.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: In-Depth Selected Guide Manual */}
        {activeGuide && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 max-h-[calc(100vh-220px)] overflow-y-auto">
            
            {/* Guide Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25 shrink-0">
                  {React.createElement(activeGuide.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {activeGuide.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">• {activeGuide.readTime}</span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mt-1">{activeGuide.toolName}</h2>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTab(activeGuide.targetTab)}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 flex items-center gap-2 shrink-0 transition-all"
              >
                <span>Launch {activeGuide.toolName.split(' ')[0]} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Overview Summary */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 leading-relaxed font-medium">
              <strong>Overview:</strong> {activeGuide.summary}
            </div>

            {/* Key Capabilities & Features */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Key Capabilities & Features</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeGuide.features.map((feat, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>Step-by-Step Masterclass Guide</span>
              </h3>
              <div className="space-y-3">
                {activeGuide.steps.map((st, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                    <h4 className="text-xs font-black text-slate-900">{st.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{st.desc}</p>
                    {st.tip && (
                      <div className="p-2.5 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 font-semibold flex items-center gap-2 border border-emerald-100">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Pro Tip:</strong> {st.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Conversion Strategies */}
            {activeGuide.proTips.length > 0 && (
              <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PRO GROWTH & CONVERSION STRATEGIES</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  {activeGuide.proTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tool FAQs */}
            {activeGuide.faq.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-2.5">
                  {activeGuide.faq.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                      <div className="font-bold text-slate-900">{item.q}</div>
                      <div className="text-slate-600 leading-relaxed font-medium">{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Action CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Ready to apply these techniques in your funnel?</span>
              <button
                onClick={() => onNavigateToTab(activeGuide.targetTab)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                <span>Open {activeGuide.toolName.split(' ')[0]} Workspace →</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
