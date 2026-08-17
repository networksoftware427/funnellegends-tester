import React, { useState } from 'react';
import { ElementType, ElementCategory, ElementNode } from '../../types/builder';
import { createDefaultStyle } from '../../data/initialTemplates';
import { 
  Type, Image as ImageIcon, CheckSquare, ShoppingCart, GraduationCap, 
  Sparkles, Layers, Search, Plus, X, Video, FileText, CreditCard, Clock, Star, HelpCircle,
  Maximize2, Workflow, Link2, BarChart3, PieChart, Key, User, BookOpen, CalendarCheck, Calendar,
  Code2, Mail, Tag, Lock, MousePointerClick, MessageSquare, Share2, LayoutList,
  Minus, MapPin, MessageCircle, Volume2, CheckCircle, ShieldCheck, Grid, Radio, Headphones, Sliders, Globe, ArrowRight, List, Layout
} from 'lucide-react';

interface SidebarCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElement: (element: ElementNode) => void;
}

interface CatalogItem {
  type: ElementType;
  category: ElementCategory;
  name: string;
  description: string;
  icon: any;
  defaultProps: Record<string, any>;
}

export const catalogItems: CatalogItem[] = [
  // Typography
  { type: 'headline', category: 'typography', name: 'Headline', description: 'Large bold primary headline text', icon: Type, defaultProps: { text: 'High-Converting Funnel Headline' } },
  { type: 'subheadline', category: 'typography', name: 'Subheadline', description: 'Supporting subheadline text', icon: Type, defaultProps: { text: 'Subheadline describing key value proposition and benefits.' } },
  { type: 'paragraph', category: 'typography', name: 'Paragraph', description: 'Standard body text block', icon: FileText, defaultProps: { text: 'Write convincing sales copy here to guide your visitors.' } },
  { type: 'bullet_list', category: 'typography', name: 'Bullet List', description: 'Checkmark benefit bullet list', icon: CheckSquare, defaultProps: { items: ['Instant 1-Click Upsell Vaulting', 'Visual Drag & Drop Builder Engine', 'Automated Membership Drip Portals'] } },
  { type: 'quote_block', category: 'typography', name: 'Quote Block', description: 'Testimonial or pull quote', icon: FileText, defaultProps: { quote: 'This builder doubled our conversion rate overnight!', author: 'Mark Vance' } },
  { type: 'callout_box', category: 'typography', name: 'Callout Box', description: 'Highlighted urgency badge box', icon: Sparkles, defaultProps: { title: '⚡ LIMITED TIME OFFER: SAVE 80% TODAY ONLY' } },
  { type: 'text_block', category: 'typography', name: 'Advanced Text Block', description: 'Advanced text editor with direct HTML and CSS source editing', icon: FileText, defaultProps: { text: 'Edit this text or click to modify its HTML/CSS source directly.' } },
  { type: 'image_list', category: 'typography', name: 'Custom Image Bullet List', description: 'Bullet list using your own 32x32px image as the bullet point for custom branding', icon: ImageIcon, defaultProps: { items: ['Benefit 1', 'Benefit 2', 'Benefit 3'], bulletImageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=32&h=32&fit=crop' } },
  { type: 'divider', category: 'typography', name: 'Page Divider', description: 'Horizontal line (solid or dashed) to break up content on your pages', icon: Minus, defaultProps: {} },

  // Media
  { type: 'image', category: 'media', name: 'Single Image', description: 'Responsive image frame', icon: ImageIcon, defaultProps: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80', alt: 'Demo' } },
  { type: 'image_popup', category: 'media', name: 'Image Popup Lightbox', description: 'Image with preview thumbnail that opens full size in lightbox popup', icon: Maximize2, defaultProps: { thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80', fullSizeUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80', caption: 'Click thumbnail to enlarge diagram' } },
  { type: 'video_player', category: 'media', name: 'Video Player (VSL)', description: 'Custom VSL player with poster & skin', icon: Video, defaultProps: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', posterUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80' } },
  { type: 'audio_player', category: 'media', name: 'Audio Player', description: 'Embed podcasts, course audio snippets, or audio testimonials', icon: Volume2, defaultProps: { title: 'Podcast Episode #42: Scaling High Ticket Funnels' } },
  { type: 'video_popup', category: 'media', name: 'Video Popup Lightbox', description: 'Video element playing distraction-free inside lightbox popup when clicked', icon: Video, defaultProps: { title: 'Watch Video Testimonial in Lightbox', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', posterUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&auto=format&fit=crop&q=80' } },
  { type: 'video_playlist', category: 'media', name: 'Video Playlist', description: 'A playlist of videos for courses or showcases', icon: List, defaultProps: { title: 'Masterclass Playlist', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', posterUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&auto=format&fit=crop&q=80' } },
  { type: 'image_gallery', category: 'media', name: 'Image Gallery', description: 'Multi-image grid layout', icon: ImageIcon, defaultProps: {} },
  { type: 'custom_html', category: 'media', name: 'Custom HTML/JS', description: 'Raw code embed container', icon: FileText, defaultProps: { code: '<script>console.log("Custom script")</script>' } },
  { type: 'custom_code', category: 'media', name: 'Custom Code / Scripts', description: 'Embed custom HTML, CSS, JavaScript, or jQuery code blocks', icon: Code2, defaultProps: { code: '<!-- Enter custom HTML, JS, or CSS here -->' } },

  // Form & Capture & Webinar & ClickPop
  { type: 'button', category: 'form', name: 'Button', description: 'Primary call-to-action button for optins, orders, links, and upsells', icon: MousePointerClick, defaultProps: { buttonText: 'CLICK HERE TO SIGN UP', subText: '(Get Instant Access)', buttonColor: '#4f46e5', buttonHoverColor: '#4338ca', borderColor: 'transparent', iconName: '', shadow: 'lg', buttonAction: 'next_step', buttonLink: '' } },
  { type: 'clickpop_button', category: 'form', name: 'ClickPop Trigger Button', description: 'Button that launches the ClickPop optin lightbox popup overlay on click or external blog embed', icon: MousePointerClick, defaultProps: { buttonText: '⚡ OPEN SPECIAL CLICKPOP OPTIN OFFER', buttonColor: '#ec4899', textColor: '#ffffff' } },
  { type: 'autowebinar_registration', category: 'form', name: 'Autowebinar Registration Gate', description: 'Automated evergreen webinar registration with date/time selectors & email triggers', icon: CalendarCheck, defaultProps: { title: 'Reserve Your Seat for the Automated Masterclass', buttonText: 'REGISTER FOR FREE MASTERCLASS NOW', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'webinar_date', category: 'form', name: 'Webinar Date Selector', description: 'Rolling date picker displaying instant "Just in Time" or 3 future calendar dates', icon: Calendar, defaultProps: { label: 'Select Webinar Date', option1: 'Today (Just in Time Session)', option2: 'Tomorrow at 2:00 PM EST', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'webinar_time', category: 'form', name: 'Webinar Time Selector', description: 'Daily time slot selector offering 1 to 5 session times for registrants', icon: Clock, defaultProps: { label: 'Select Session Time', slots: '10:00 AM EST, 2:00 PM EST, 6:00 PM EST', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'add_event', category: 'interactive', name: 'Add Event to Calendar', description: 'Confirmation page button adding scheduled webinar to Google, iCal, or Outlook', icon: CalendarCheck, defaultProps: { buttonText: 'ADD WEBINAR TO GOOGLE / ICAL CALENDAR', buttonColor: '#4f46e5', textColor: '#ffffff' } },
  { type: 'survey', category: 'form', name: 'Interactive Survey App', description: 'Multi-question survey with branching logic, segmentation & custom redirects', icon: Workflow, defaultProps: { title: 'Qualify for Your Tailored Offer', questionText: 'What is your primary monthly revenue target?', options: '$10k - $25k / mo, $25k - $100k / mo, $100k+ / mo', buttonText: 'Submit Application & Qualify', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'text_input', category: 'form', name: 'Text Input', description: 'Form text or email field', icon: Type, defaultProps: { label: 'Email Address', placeholder: 'Enter your best email address...', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'textarea', category: 'form', name: 'Text Area', description: 'Multi-line text area for longer responses, comments, or applications', icon: Type, defaultProps: { label: 'Your Message / Application Details', placeholder: 'Enter your detailed response here...', rows: 4, formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'select_dropdown', category: 'form', name: 'Select Dropdown', description: 'Dropdown selection menu', icon: CheckSquare, defaultProps: { label: 'Select Business Type', options: 'Agency / Consultant, E-Commerce Store Owner, Course Creator / Info Product, SaaS Founder', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'multi_step_optin', category: 'form', name: 'Multi-Step Opt-in', description: 'High-converting 2-step form', icon: CheckSquare, defaultProps: { title: 'Where should we send your free growth report?', placeholder: 'Enter your best business email...', buttonText: 'Continue to Final Step', step2Title: 'Enter your phone number for instant SMS access', step2ButtonText: 'Get Instant Access Now', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'sms_signup', category: 'form', name: 'SMS Signup Form', description: 'Collect phone numbers to send Twilio SMS text messages and webinar reminders', icon: MessageCircle, defaultProps: { label: 'Mobile Phone Number (For SMS Alerts)', placeholder: '(555) 000-0000', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },

  // E-Commerce
  { type: 'credit_card_form', category: 'ecommerce', name: 'Credit Card Payment Form', description: 'Secure credit card input form charging & tokenizing cards prior to post-purchase upsells', icon: CreditCard, defaultProps: { title: 'Secure Credit Card Payment Gate', buttonText: 'PAY & PROCESS ORDER NOW', securityTag: 'Stripe Tokenized Vault', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'order_select', category: 'ecommerce', name: 'Order Product Select', description: 'Product variation & payment plan selector for multi-product checkout pages', icon: ShoppingCart, defaultProps: { title: 'Select Product Package / Payment Plan', product1Name: 'LaunchEngine Enterprise Pass (Save 40%)', product1Price: '$297.00', product2Name: 'LaunchEngine Starter Pass', product2Price: '$147.00', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'order_summary', category: 'ecommerce', name: 'Order Cart Summary', description: 'Itemized purchase summary reviewing base product, order bump, taxes & total', icon: Tag, defaultProps: { title: 'Order Summary & Items Review', mainProductName: 'LaunchEngine Enterprise Pass', mainProductPrice: '$297.00', bumpAddonName: '⚡ Addon: Instant AI VSL Copywriter Pro', bumpAddonPrice: '$27.00', promoCode: 'LAUNCH50 (-$50)', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'order_confirmation', category: 'ecommerce', name: 'Order Confirmation', description: 'Post-purchase receipt and access link', icon: CheckCircle, defaultProps: { title: 'Order Successfully Completed!', subtitle: 'Here is a summary of your purchases.', buttonText: 'ACCESS YOUR PURCHASES NOW', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'two_step_checkout', category: 'ecommerce', name: '2-Step Checkout', description: 'Step 1 contact + Step 2 card & bump', icon: ShoppingCart, defaultProps: { title: '2-Step Checkout', productName: 'LaunchEngine SaaS License', price: '$297.00', formBgColor: '#0f172a', formBorderColor: 'transparent', formBorderRadius: '8px', formPadding: '24px', fieldBgColor: '#020617', fieldBorderColor: '#1e293b', fieldTextColor: '#f1f5f9', fieldFontFamily: 'inherit', fieldFontSize: '14px', titleColor: '#ffffff', titleFontFamily: 'inherit', titleFontSize: '14px', buttonText: 'COMPLETE ORDER NOW', buttonColor: '#22c55e', buttonHoverColor: '#16a34a', buttonTextColor: '#ffffff', buttonFontFamily: 'inherit', buttonFontSize: '16px', buttonFontWeight: '700', buttonBorderRadius: '12px', buttonBorderWidth: '0px', buttonBorderColor: 'transparent' } },
  { type: 'one_click_upsell', category: 'ecommerce', name: '1-Click Upsell Button', description: 'Stripe tokenized post-purchase upsell', icon: CreditCard, defaultProps: { buttonText: 'YES! ADD THIS UPSELL TO MY ORDER WITH 1-CLICK', subText: '(Your card on file will be charged $197)', buttonColor: '#10b981', textColor: '#ffffff' } },
  { type: 'order_bump', category: 'ecommerce', name: 'Order Bump Box', description: '1-click checkout add-on checkbox', icon: ShoppingCart, defaultProps: { title: '⚡ YES! Add Instant AI VSL Copywriter Pro for just $27!', description: '1-Click VSL Scripts & Sales Letter Generator.', price: '$27.00', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'shipping_address', category: 'ecommerce', name: 'Shipping Address Form', description: 'Collect a separate shipping address for physical product fulfillment', icon: MapPin, defaultProps: { title: 'Shipping Address', namePlaceholder: 'Full Name', addressPlaceholder: 'Full Address', cityPlaceholder: 'City', zipPlaceholder: 'Zip/Postal Code', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'billing_address', category: 'ecommerce', name: 'Billing Address Form', description: 'Collect a separate billing address required by some payment gateways', icon: MapPin, defaultProps: { title: 'Billing Address', namePlaceholder: 'Full Name on Card', addressPlaceholder: 'Billing Address', cityPlaceholder: 'City', zipPlaceholder: 'Zip/Postal Code', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },

  // Membership & Affiliate Area
  { type: 'affiliate_image_asset', category: 'membership', name: 'Affiliate Image Banner Asset', description: 'Promotional image banners for affiliates with 1-click HTML embed code generator', icon: ImageIcon, defaultProps: { imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80' } },
  { type: 'affiliate_text_asset', category: 'membership', name: 'Affiliate Text Swipe Asset', description: 'Pre-written email swipes & blog post copy auto-filled with partner tracking links', icon: Mail, defaultProps: {} },
  { type: 'affiliate_link_builder', category: 'membership', name: 'Advanced Affiliate Link Builder', description: 'Multi-link generator for affiliates with target offer selection and custom Sub-ID tracking', icon: Code2, defaultProps: {} },
  { type: 'member_user_login', category: 'membership', name: 'Member User Login', description: 'Authentication gate for membership funnels (Register, Login & Reset Password)', icon: User, defaultProps: { title: 'Member Portal Login', buttonText: 'LOGIN TO MEMBER AREA', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'membership_search', category: 'membership', name: 'Member Area Lesson Search', description: 'Instant keyword search across course modules and video lessons', icon: Search, defaultProps: {} },
  { type: 'membership_navigation', category: 'membership', name: 'Membership Navigation Menu', description: 'Mobile-friendly dynamic menu displaying all Module and Lesson titles', icon: BookOpen, defaultProps: {} },
  { type: 'affiliate_login', category: 'membership', name: 'Affiliate Portal Login', description: 'Affiliate user registration, login & password recovery widget', icon: Key, defaultProps: { title: 'Affiliate Partner Login', buttonText: 'LOGIN TO AFFILIATE DASHBOARD', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },
  { type: 'affiliate_link', category: 'membership', name: 'Affiliate Link Generator', description: 'Dynamic affiliate URL generator with copy link button for affiliate dashboard', icon: Link2, defaultProps: {} },
  { type: 'affiliate_stats', category: 'membership', name: 'Affiliate Stats Dashboard', description: 'Live tracking of referred visitors, buyers, conv rate & commissions earned', icon: BarChart3, defaultProps: {} },
  { type: 'visual_funnel', category: 'membership', name: 'Visual Funnel Structure', description: 'Interactive multi-tier affiliate commission breakdown visualizer', icon: PieChart, defaultProps: {} },
  { type: 'video_lesson_player', category: 'membership', name: 'Lesson Video Player', description: 'Course video player with progress', icon: GraduationCap, defaultProps: {} },
  { type: 'drip_timer_banner', category: 'membership', name: 'Drip Timer Lock', description: 'Scheduled lesson unlock notice', icon: Clock, defaultProps: {} },

  // Interactive
  { type: 'evergreen_timer', category: 'interactive', name: 'Evergreen Timer', description: 'Scarcity countdown clock', icon: Clock, defaultProps: { hours: 14, minutes: 42, seconds: 19 } },
  { type: 'faq_accordion', category: 'interactive', name: 'FAQ Accordion', description: 'Collapsible Q&A list', icon: HelpCircle, defaultProps: {} },
  { type: 'tabs', category: 'interactive', name: 'Tabs Widget', description: 'Multi-tab content box', icon: Layers, defaultProps: {} },
  { type: 'star_rating', category: 'interactive', name: 'Star Rating', description: '5-star social proof widget', icon: Star, defaultProps: { label: 'Rated 4.9/5 Stars' } },
  { type: 'facebook_comments', category: 'interactive', name: 'Facebook Comments', description: 'Social proof widget allowing visitors to comment using their Facebook profile', icon: MessageSquare, defaultProps: {} },
  { type: 'social_share', category: 'interactive', name: 'Social Share Icons', description: 'Social media icons with customizable URL links', icon: Share2, defaultProps: { facebookUrl: '', twitterUrl: '', instagramUrl: '', linkedinUrl: '' } },
  { type: 'pricing_table', category: 'interactive', name: 'Tiered Pricing Table', description: 'Multi-tier pricing table with highlighted best-selling plan for maximum conversions', icon: LayoutList, defaultProps: { plan1Name: 'Starter Pass', plan1Price: '$49/mo', plan2Name: 'Pro Pass (Best Value)', plan2Price: '$147/mo', plan3Name: 'Enterprise Pass', plan3Price: '$297/mo', formBgColor: 'transparent', inputBgColor: '#0f172a', borderColor: '#334155', borderWidth: '1px', borderRadius: '12px', shadow: 'md', fieldTextColor: '#f8fafc' } },

  // ChronoChimp Appointment & Calendar Elements
  { type: 'appointment_calendar', category: 'interactive', name: 'ChronoChimp Interactive Booking Widget', description: 'Complete 1-on-1 date/time slot picker with custom qualification form & Zoom link generation', icon: CalendarCheck, defaultProps: { title: 'Schedule Your 1-on-1 Strategy Call' } },
  { type: 'appointment_host_card', category: 'interactive', name: 'Call Host Profile Card', description: 'Displays assigned strategist avatar, rating, bio, and next available call slot', icon: User, defaultProps: {} },
  { type: 'appointment_summary_receipt', category: 'interactive', name: 'Appointment Confirmation Receipt', description: 'Post-booking confirmation card displaying Zoom link, date/time, and 1-click iCal calendar add button', icon: CheckCircle, defaultProps: {} },
  { type: 'team_schedule_picker', category: 'interactive', name: 'Team Round-Robin Selector', description: 'Multi-host round-robin schedule selector allowing clients to choose their account strategist', icon: Workflow, defaultProps: {} },

  // Widgets Section (30 Elements)
  { 
    type: 'header_navigation', 
    category: 'widgets', 
    name: 'Header Navigation Hero Widget', 
    description: 'Complete hero widget with top brand logo, responsive dropdown sub-menu navigation, background image, headline, subheadline & CTA button', 
    icon: Layout, 
    defaultProps: { 
      brandLogoText: 'LaunchEngine', 
      backgroundImageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80',
      bgOverlayColor: 'rgba(15, 23, 42, 0.85)',
      headlineText: 'Build & Scale High-Converting Funnels',
      subheadlineText: 'The ultimate platform with 50+ conversion widgets, automated A/B testing, and built-in LMS.',
      buttonText: 'Get Started Free',
      buttonColor: '#4f46e5',
      buttonHoverColor: '#4338ca',
      buttonTextColor: '#ffffff',
      buttonBorderRadius: '16px',
      menuItems: [
        { id: 'm1', label: 'Home', linkUrl: '#' },
        { 
          id: 'm2', 
          label: 'Solutions ▾', 
          linkUrl: '#',
          subItems: [
            { id: 'sm2-1', label: 'Visual Funnel Builder', linkUrl: '#builder' },
            { id: 'sm2-2', label: 'Course Portal LMS', linkUrl: '#lms' },
            { id: 'sm2-3', label: 'ChronoChimp Booking', linkUrl: '#booking' },
            { id: 'sm2-4', label: 'CRM Pipelines', linkUrl: '#crm' }
          ] 
        },
        { 
          id: 'm3', 
          label: 'Resources ▾', 
          linkUrl: '#',
          subItems: [
            { id: 'sm3-1', label: 'Documentation', linkUrl: '#docs' },
            { id: 'sm3-2', label: 'Case Studies', linkUrl: '#cases' },
            { id: 'sm3-3', label: 'API Reference', linkUrl: '#api' }
          ] 
        },
        { id: 'm4', label: 'Pricing', linkUrl: '#pricing' },
        { id: 'm5', label: 'Contact', linkUrl: '#contact' }
      ]
    } 
  },
  { 
    type: 'hero_banner_widget', 
    category: 'widgets', 
    name: 'Hero Banner Container', 
    description: 'High-converting hero banner with glowing backdrop, title, subtitle & action button', 
    icon: Sparkles, 
    defaultProps: { 
      title: 'Scale Your Funnel Sales Exponentially', 
      badgeText: '🚀 #1 AUTOMATED FUNNEL ENGINE',
      subtitle: 'Build high-converting VSLs, 1-click upsells, and 2-tier affiliate systems in minutes.',
      buttonText: 'GET STARTED TODAY',
      buttonColor: '#4f46e5',
      buttonHoverColor: '#4338ca',
      buttonTextColor: '#ffffff',
      buttonBorderRadius: '12px',
      brandLogoText: 'Brand',
      hideBrandImage: false,
      menuItems: [
        { id: 'm1', label: 'Home', linkUrl: '#' },
        { id: 'm2', label: 'About', linkUrl: '#' },
        { id: 'm3', label: 'Contact', linkUrl: '#' }
      ]
    } 
  },
  { type: 'cta_box_widget', category: 'widgets', name: 'Call to Action Box', description: 'Highlighted CTA box with urgency badge, timer countdown, and instant order button', icon: MousePointerClick, defaultProps: { title: 'CLAIM YOUR 80% DISCOUNT BEFORE MIDNIGHT' } },
  { type: 'testimonial_card_widget', category: 'widgets', name: 'Testimonial Quote Card', description: 'Verified buyer review card with user avatar, 5-star rating & quote text', icon: Star, defaultProps: { name: 'Alex Hormozi', role: 'Founder, Acquisition.com', quote: 'This funnel stack generated $2.4M in 30 days.' } },
  { type: 'content_slider_widget', category: 'widgets', name: 'Interactive Content Slider', description: 'Sliding hero/banner slider with dot indicators and previous/next navigation arrows', icon: Layers, defaultProps: {} },
  { type: 'shape_divider_widget', category: 'widgets', name: 'SVG Shape Divider', description: 'Curved wave, slant, or zigzag section divider for smooth section transitions', icon: Sliders, defaultProps: {} },
  { type: 'image_carousel_widget', category: 'widgets', name: 'Image Carousel', description: 'Auto-sliding multi-image banner carousel with thumbnail navigation', icon: ImageIcon, defaultProps: {} },
  { type: 'interactive_gallery_widget', category: 'widgets', name: 'Filterable Image Gallery', description: 'Grid gallery with category filter tabs & lightbox preview popup', icon: Grid, defaultProps: {} },
  { type: 'menu_anchor_widget', category: 'widgets', name: 'Smooth Scroll Menu Anchor', description: 'Target anchor point linking navigation buttons to section IDs (#features, #pricing)', icon: Link2, defaultProps: { anchorId: 'pricing-section' } },
  { type: 'sidebar_widget', category: 'widgets', name: 'Conversion Sidebar', description: 'Sticky right/left sidebar widget with opt-in box, author bio & quick links', icon: LayoutList, defaultProps: {} },
  { type: 'spacer_widget', category: 'widgets', name: 'Adjustable Vertical Spacer', description: 'Custom vertical gap spacer element (10px to 200px height)', icon: Minus, defaultProps: { height: '48px' } },
  { type: 'read_more_widget', category: 'widgets', name: 'Expandable Read More Box', description: 'Collapsible long-text box with smooth "Read More / Read Less" toggle button', icon: BookOpen, defaultProps: { title: 'Full Offer Disclosure & Breakdown' } },
  { type: 'login_register_widget', category: 'widgets', name: 'Dual Login / Register Form', description: 'Dual tabbed login and registration form for customer accounts', icon: Key, defaultProps: {} },
  { type: 'price_list_widget', category: 'widgets', name: 'Menu & Service Price List', description: 'Itemized menu listing item names, descriptions, and price tags', icon: Tag, defaultProps: {} },
  { type: 'video_playlist_widget', category: 'widgets', name: 'Video Playlist Player', description: 'Feature video player with side scrollable episode playlist roster', icon: Video, defaultProps: {} },
  { type: 'table_of_contents_widget', category: 'widgets', name: 'Table of Contents (TOC)', description: 'Clickable section menu index for long-form sales letters & articles', icon: List, defaultProps: {} },
  { type: 'reviews_widget', category: 'widgets', name: 'Customer Reviews Summary', description: 'Reviews summary widget showing 4.9/5 star average and distribution bars', icon: Star, defaultProps: {} },
  { type: 'comparison_slider_widget', category: 'widgets', name: 'Before & After Image Slider', description: 'Interactive drag slider comparing Before vs After results', icon: Sliders, defaultProps: {} },
  { type: 'stats_counter_widget', category: 'widgets', name: 'Milestone Stats Counter', description: 'Animated numeric counters showing customer counts & sales metrics', icon: BarChart3, defaultProps: {} },
  { type: 'countdown_banner_widget', category: 'widgets', name: 'Sticky Countdown Banner', description: 'Top/bottom sticky countdown banner with instant coupon code', icon: Clock, defaultProps: {} },
  { type: 'floating_whatsapp_widget', category: 'widgets', name: 'Floating WhatsApp Support Chat', description: 'Floating WhatsApp / live support chat button with popup bubble', icon: MessageCircle, defaultProps: {} },
  { type: 'team_grid_widget', category: 'widgets', name: 'Team & Host Profile Grid', description: 'Grid layout featuring team members, roles, avatars & bio tags', icon: User, defaultProps: {} },
  { type: 'logo_cloud_widget', category: 'widgets', name: 'Featured Logo Cloud', description: '"As Featured In" media & brand partner logo cloud banner', icon: Globe, defaultProps: {} },
  { type: 'guarantee_badge_widget', category: 'widgets', name: 'Money Back Guarantee Seal', description: '30-Day Money Back Guarantee trust seal with security icons', icon: ShieldCheck, defaultProps: {} },
  { type: 'progress_step_widget', category: 'widgets', name: 'Onboarding Progress Bar', description: '3-step checkout / onboarding wizard progress indicator bar', icon: Workflow, defaultProps: {} },
  { type: 'audio_podcast_widget', category: 'widgets', name: 'Audio Podcast Player', description: 'Embedded podcast audio player with episode notes & waveform style', icon: Headphones, defaultProps: {} },
  { type: 'map_location_widget', category: 'widgets', name: 'Interactive Map Location Card', description: 'Business address & location map card with direct GPS directions button', icon: MapPin, defaultProps: {} },
  { type: 'notification_popup_widget', category: 'widgets', name: 'Real-Time Buyer Popup Toast', description: 'Live toast notification popup simulating real-time buyer activity', icon: MessageSquare, defaultProps: {} },
  { type: 'social_feed_widget', category: 'widgets', name: 'Social Grid Feed', description: 'Grid feed widget displaying Instagram / Twitter social posts', icon: Share2, defaultProps: {} },
  { type: 'feature_comparison_widget', category: 'widgets', name: 'Feature Matrix Comparison Table', description: 'Side-by-side feature comparison checklist table (Basic vs Pro vs Agency)', icon: CheckSquare, defaultProps: {} },
  { type: 'search_bar_widget', category: 'widgets', name: 'Interactive Search Bar', description: 'Instant search bar with dropdown results filter', icon: Search, defaultProps: {} },
  { type: 'community_feed_widget', category: 'widgets', name: 'TribeNexus Live Community Stream', description: 'Embed distraction-free live community discussion feed directly inside your funnel or membership portal', icon: MessageSquare, defaultProps: { spaceSlug: 'general-lounge' } },
  
  // Universal
  { type: 'menu_navigation', category: 'universal', name: 'Menu Navigation', description: 'Top level navigation menu allowing up to 5 links to other sections or pages', icon: Layers, defaultProps: { links: [{ label: 'Home', url: '#' }, { label: 'About', url: '#' }, { label: 'Services', url: '#' }, { label: 'Contact', url: '#' }, { label: 'Offer', url: '#' }] } },
  { type: 'logo_image', category: 'universal', name: 'Logo Image', description: 'Brand logo image element', icon: ImageIcon, defaultProps: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&auto=format&fit=crop&q=80', alt: 'Brand Logo' } },
  { type: 'icon', category: 'universal', name: 'Vector Icon', description: 'Customizable vector icon that can be linked to other pages or social media profiles', icon: Star, defaultProps: { iconName: 'Facebook', url: '#', color: '#1877F2', size: '32px' } }
];

export const SidebarCatalog: React.FC<SidebarCatalogProps> = ({
  isOpen,
  onClose,
  onAddElement,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories: { id: ElementCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Elements' },
    { id: 'widgets', label: 'Widgets (30)' },
    { id: 'typography', label: 'Typography' },
    { id: 'media', label: 'Media' },
    { id: 'form', label: 'Forms & Webinar' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'membership', label: 'LMS & Affiliates' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'universal', label: 'Universal' },
  ];

  const filteredItems = catalogItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelect = (item: CatalogItem) => {
    const newElement: ElementNode = {
      id: `el_${Date.now()}`,
      type: item.type,
      name: item.name,
      props: item.defaultProps,
      style: createDefaultStyle({
        typography: { color: item.category === 'typography' ? '#000000' : undefined },
        ...(item.type === 'hero_banner_widget' ? {
          background: {
            bgType: 'gradient',
            backgroundColor: '#0f172a',
            gradient: 'linear-gradient(to bottom right, rgba(30, 27, 75, 0.9), rgba(15, 23, 42, 1), rgba(59, 7, 100, 0.8))',
            bgImageSize: 'cover'
          }
        } : {})
      })
    };
    onAddElement(newElement);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex justify-start">
      <div className="w-96 bg-white border-r border-slate-200 h-full flex flex-col shadow-2xl animate-fade-in text-slate-900">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-sm text-slate-900">Add Canvas Element</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded text-slate-600 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search elements (e.g., ClickPop, Credit Card, Order Select)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="p-3 border-b border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${selectedCategory === cat.id ? 'bg-orange-600 text-white shadow' : 'bg-slate-50 text-slate-600 hover:text-slate-900'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Items Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredItems.map((item) => {
            const IconComp = item.icon;
            return (
              <button 
                key={item.type}
                onClick={() => handleSelect(item)}
                className="w-full p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-500/60 rounded-xl flex items-start gap-3 text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-950/60 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-orange-300">{item.name}</div>
                  <div className="text-[11px] text-slate-600 leading-tight mt-0.5">{item.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
