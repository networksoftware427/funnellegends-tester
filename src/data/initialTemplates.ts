import { ElementStyle, SectionNode, CanvasState, FunnelData, CourseData, ContactData, DealData, WorkflowNodeData, WorkflowEdgeData } from '../types/builder';

export const createDefaultStyle = (overrides?: any): ElementStyle => ({
  typography: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0px',
    textAlign: 'left',
    color: '#f8fafc',
    textShadow: 'none',
    isGradientFill: false,
    ...overrides?.typography
  },
  boxModel: {
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '16px',
    marginLeft: '0px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    ...overrides?.boxModel
  },
  background: {
    bgType: 'none',
    backgroundColor: 'transparent',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    bgImage: '',
    bgImageSize: 'cover',
    bgImagePosition: 'center',
    isParallax: false,
    bgVideoUrl: '',
    ...overrides?.background
  },
  borders: {
    borderStyle: 'none',
    borderColor: '#334155',
    borderWidth: '1px',
    borderRadiusTopLeft: '8px',
    borderRadiusTopRight: '8px',
    borderRadiusBottomRight: '8px',
    borderRadiusBottomLeft: '8px',
    ...overrides?.borders
  },
  effects: {
    boxShadow: 'none',
    innerShadow: 'none',
    blur: '0px',
    opacity: 1,
    backdropFilter: 'none',
    ...overrides?.effects
  },
  layoutAnim: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    zIndex: 1,
    position: 'relative',
    entranceAnimation: 'none',
    animationDuration: '0.5s',
    animationDelay: '0s',
    deviceVisibility: 'all',
    ...overrides?.layoutAnim
  },
  customCode: {
    customClasses: '',
    scopedCss: '',
    ...overrides?.customCode
  }
});

// Pre-built Demo Canvas: High-Converting Sales Funnel Landing Page
export const createDemoSalesCanvas = (): CanvasState => ({
  globalTokens: {
    primaryColor: '#6366f1',
    secondaryColor: '#ec4899',
    accentColor: '#10b981',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    headingFont: 'Montserrat',
    bodyFont: 'Open Sans',
    borderRadiusPreset: '12px'
  },
  sections: [
    // Section 1: Hero Header
    {
      id: 'sec_hero',
      name: 'Hero Banner Section',
      isFullWidth: false,
      displayMode: 'flex',
      paddingTop: '64px',
      paddingBottom: '64px',
      background: {
        bgType: 'gradient',
        backgroundColor: '#0f172a',
        gradient: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 70%)',
        bgImage: '',
        bgImageSize: 'cover',
        bgImagePosition: 'center',
        isParallax: false,
        bgVideoUrl: ''
      },
      rows: [
        {
          id: 'row_hero_top',
          columnCount: 1,
          gap: '24px',
          alignItems: 'center',
          columns: [
            {
              id: 'col_hero_center',
              widthFraction: 1,
              verticalAlign: 'center',
              padding: '16px',
              margin: '0px',
              elements: [
                {
                  id: 'el_badge',
                  type: 'callout_box',
                  name: 'Urgency Badge',
                  props: {
                    title: '⚡ LIMITED TIME OFFER: SAVE 80% TODAY ONLY',
                    badgeColor: '#ec4899',
                    icon: 'Flame'
                  },
                  style: createDefaultStyle({
                    typography: { color: '#f472b6', textAlign: 'center', fontSize: '14px', fontWeight: '700', fontFamily: 'Outfit', lineHeight: '1.2', letterSpacing: '1px', textShadow: 'none', isGradientFill: false },
                    boxModel: { marginBottom: '20px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px', width: 'fit-content', maxWidth: '100%', height: 'auto', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto' },
                    borders: { borderStyle: 'solid', borderColor: '#f472b6', borderWidth: '1px', borderRadiusTopLeft: '9999px', borderRadiusTopRight: '9999px', borderRadiusBottomRight: '9999px', borderRadiusBottomLeft: '9999px' },
                    background: { bgType: 'color', backgroundColor: 'rgba(244, 114, 182, 0.1)', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' }
                  })
                },
                {
                  id: 'el_headline',
                  type: 'headline',
                  name: 'Main Headline',
                  props: {
                    text: 'Build & Scale High-Converting Sales Funnels in Minutes Without Code'
                  },
                  style: createDefaultStyle({
                    typography: { fontFamily: 'Outfit', fontSize: '48px', fontWeight: '800', textAlign: 'center', color: '#ffffff', isGradientFill: true, gradientStart: '#818cf8', gradientEnd: '#c084fc', lineHeight: '1.15', letterSpacing: '-0.5px', textShadow: 'none' },
                    boxModel: { marginBottom: '20px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' }
                  })
                },
                {
                  id: 'el_subheadline',
                  type: 'subheadline',
                  name: 'Subheadline',
                  props: {
                    text: 'Launch Engine combines a visual drag-and-drop builder, automated 1-click upsells, membership portals, and AI copywriting into a single unified stack.'
                  },
                  style: createDefaultStyle({
                    typography: { fontFamily: 'Inter', fontSize: '20px', color: '#94a3b8', textAlign: 'center', fontWeight: '400', lineHeight: '1.6', letterSpacing: '0px', textShadow: 'none', isGradientFill: false },
                    boxModel: { marginBottom: '32px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginTop: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', height: 'auto' }
                  })
                }
              ]
            }
          ]
        },
        // Row 2: VSL Video Player + 2-Step Checkout Preview
        {
          id: 'row_vsl_content',
          columnCount: 2,
          gap: '32px',
          alignItems: 'center',
          columns: [
            {
              id: 'col_video',
              widthFraction: 0.6,
              verticalAlign: 'center',
              padding: '12px',
              margin: '0px',
              elements: [
                {
                  id: 'el_vsl',
                  type: 'video_player',
                  name: 'VSL Video Player',
                  props: {
                    videoProvider: 'custom',
                    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    autoplay: false,
                    showControls: true,
                    posterUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80'
                  },
                  style: createDefaultStyle({
                    borders: { borderStyle: 'solid', borderColor: '#4f46e5', borderWidth: '2px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
                    effects: { boxShadow: '0 20px 50px rgba(99, 102, 241, 0.3)', innerShadow: 'none', blur: '0px', opacity: 1, backdropFilter: 'none' }
                  })
                }
              ]
            },
            {
              id: 'col_checkout',
              widthFraction: 0.4,
              verticalAlign: 'center',
              padding: '24px',
              margin: '0px',
              elements: [
                {
                  id: 'el_checkout_card',
                  type: 'two_step_checkout',
                  name: '2-Step Checkout Widget',
                  props: {
                    step1Title: 'Step 1: Contact Information',
                    step2Title: 'Step 2: Payment Details',
                    productName: 'LaunchEngine Enterprise Pass',
                    price: '$297.00',
                    orderBumpTitle: '⚡ Add Instant AI Copywriter Pro Addon ($47 value)',
                    orderBumpPrice: '$27'
                  },
                  style: createDefaultStyle({
                    background: { bgType: 'color', backgroundColor: 'rgba(30, 41, 59, 0.9)', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
                    borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
                    effects: { boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', innerShadow: 'none', blur: '0px', opacity: 1, backdropFilter: 'blur(12px)' },
                    boxModel: { paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px', marginBottom: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' }
                  })
                }
              ]
            }
          ]
        }
      ]
    },
    // Section 2: Social Proof & Feature Grid
    {
      id: 'sec_features',
      name: 'Features Grid',
      isFullWidth: false,
      displayMode: 'flex',
      paddingTop: '64px',
      paddingBottom: '64px',
      background: {
        bgType: 'color',
        backgroundColor: '#020617',
        gradient: '',
        bgImage: '',
        bgImageSize: 'cover',
        bgImagePosition: 'center',
        isParallax: false,
        bgVideoUrl: ''
      },
      rows: [
        {
          id: 'row_proof_timer',
          columnCount: 3,
          gap: '24px',
          alignItems: 'center',
          columns: [
            {
              id: 'col_timer',
              widthFraction: 0.33,
              verticalAlign: 'center',
              padding: '16px',
              margin: '0px',
              elements: [
                {
                  id: 'el_evergreen_timer',
                  type: 'evergreen_timer',
                  name: 'Evergreen Scarcity Timer',
                  props: {
                    hours: 14,
                    minutes: 42,
                    seconds: 19,
                    label: 'Special Offer Expires In:'
                  },
                  style: createDefaultStyle({
                    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
                    borders: { borderStyle: 'solid', borderColor: '#3b82f6', borderWidth: '1px', borderRadiusTopLeft: '12px', borderRadiusTopRight: '12px', borderRadiusBottomRight: '12px', borderRadiusBottomLeft: '12px' }
                  })
                }
              ]
            },
            {
              id: 'col_social',
              widthFraction: 0.33,
              verticalAlign: 'center',
              padding: '16px',
              margin: '0px',
              elements: [
                {
                  id: 'el_rating',
                  type: 'star_rating',
                  name: 'Star Rating',
                  props: {
                    rating: 5,
                    reviewsCount: '2,840+ verified creators',
                    label: 'Rated 4.9/5 Stars'
                  },
                  style: createDefaultStyle({
                    typography: { color: '#fbbf24', textAlign: 'center', fontSize: '18px', fontFamily: 'Inter', fontWeight: '400', lineHeight: '1.5', letterSpacing: '0px', textShadow: 'none', isGradientFill: false }
                  })
                }
              ]
            },
            {
              id: 'col_guarantee',
              widthFraction: 0.33,
              verticalAlign: 'center',
              padding: '16px',
              margin: '0px',
              elements: [
                {
                  id: 'el_guarantee_badge',
                  type: 'icon_list',
                  name: 'Guarantee Perks',
                  props: {
                    items: [
                      '🔒 30-Day Money-Back Guarantee',
                      '⚡ Instant Lifetime Access',
                      '🚀 24/7 Dedicated Concierge Support'
                    ]
                  },
                  style: createDefaultStyle({
                    typography: { fontSize: '14px', color: '#cbd5e1', fontFamily: 'Inter', fontWeight: '400', lineHeight: '1.5', letterSpacing: '0px', textAlign: 'left', textShadow: 'none', isGradientFill: false }
                  })
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});


export const createLeadMagnetCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '16px' },
  sections: [{
    id: 'sec_lm_1', name: 'Lead Magnet Section', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
    background: { bgType: 'gradient', backgroundColor: '#0f172a', gradient: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 75%)', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [
      {
        id: 'row_lm_top', columnCount: 1, gap: '16px', alignItems: 'center',
        columns: [{
          id: 'col_lm_top', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
          elements: [
            {
              id: 'el_lm_badge', type: 'callout_box', name: 'Urgency Badge',
              props: { title: '⚡ FREE 3D BLUEPRINT: 2026 EDITION', badgeColor: '#10b981', icon: 'Sparkles' },
              style: createDefaultStyle({
                typography: { color: '#34d399', textAlign: 'center', fontSize: '13px', fontWeight: '800', fontFamily: 'Outfit', letterSpacing: '1px' },
                boxModel: { marginBottom: '16px', paddingTop: '6px', paddingBottom: '6px', paddingLeft: '16px', paddingRight: '16px', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' },
                borders: { borderStyle: 'solid', borderColor: '#10b981', borderWidth: '1px', borderRadiusTopLeft: '9999px', borderRadiusTopRight: '9999px', borderRadiusBottomRight: '9999px', borderRadiusBottomLeft: '9999px' },
                background: { bgType: 'color', backgroundColor: 'rgba(16, 185, 129, 0.12)' }
              })
            },
            {
              id: 'el_lm_1', type: 'headline', name: 'Headline',
              props: { text: 'Free 7-Step Blueprint: Explode Your Lead Generation In 30 Days' },
              style: createDefaultStyle({
                typography: { fontSize: '46px', fontWeight: '800', fontFamily: 'Outfit', textAlign: 'center', color: '#ffffff', isGradientFill: true, gradientStart: '#818cf8', gradientEnd: '#34d399', lineHeight: '1.15' },
                boxModel: { marginBottom: '16px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }
              })
            },
            {
              id: 'el_lm_3', type: 'subheadline', name: 'Subheadline',
              props: { text: 'Download this step-by-step PDF cheat sheet to discover the exact 3-step funnel architecture used to generate 10,000+ qualified leads.' },
              style: createDefaultStyle({
                typography: { fontSize: '19px', fontFamily: 'Inter', textAlign: 'center', color: '#94a3b8', lineHeight: '1.6' },
                boxModel: { marginBottom: '40px', maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto' }
              })
            }
          ]
        }]
      },
      {
        id: 'row_lm_body', columnCount: 2, gap: '32px', alignItems: 'center',
        columns: [
          {
            id: 'col_lm_img', widthFraction: 0.45, verticalAlign: 'center', padding: '16px', margin: '0px',
            elements: [
              {
                id: 'el_lm_2', type: 'image', name: 'eBook Cover',
                props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', altText: '3D eBook Guide Mockup' },
                style: createDefaultStyle({
                  borders: { borderStyle: 'solid', borderColor: '#4f46e5', borderWidth: '2px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
                  effects: { boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.4)' },
                  boxModel: { width: '100%', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }
                })
              },
              {
                id: 'el_lm_rating', type: 'star_rating', name: 'Social Proof Stars',
                props: { rating: 5, reviewsCount: '4,920+ Downloads', label: 'Rated 4.95/5 Stars' },
                style: createDefaultStyle({
                  typography: { color: '#fbbf24', textAlign: 'center', fontSize: '15px', fontFamily: 'Inter' },
                  boxModel: { marginTop: '16px' }
                })
              }
            ]
          },
          {
            id: 'col_lm_form', widthFraction: 0.55, verticalAlign: 'center', padding: '24px', margin: '0px',
            elements: [
              {
                id: 'el_lm_card', type: 'callout_box', name: 'Optin Form Card',
                props: { title: '⚡ WHERE SHOULD WE SEND YOUR FREE COPY?' },
                style: createDefaultStyle({
                  background: { bgType: 'color', backgroundColor: 'rgba(15, 23, 42, 0.95)' },
                  borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
                  effects: { boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(16px)' },
                  boxModel: { paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }
                })
              },
              {
                id: 'el_lm_list', type: 'icon_list', name: 'Key Takeaways',
                props: {
                  items: [
                    '✓ 3 Plug-and-Play VSL Copywriting Templates',
                    '✓ 1-Click High Converting Order Bump Formulas',
                    '✓ Visual CRM Node-Based Automation Map'
                  ]
                },
                style: createDefaultStyle({
                  typography: { fontSize: '14px', color: '#cbd5e1', fontWeight: '600', lineHeight: '1.8' },
                  boxModel: { marginBottom: '20px' }
                })
              },
              {
                id: 'el_lm_name', type: 'text_input', name: 'Name Input',
                props: { placeholder: 'Enter your full name...', required: true },
                style: createDefaultStyle({
                  background: { bgType: 'color', backgroundColor: '#020617' },
                  borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '8px', borderRadiusTopRight: '8px', borderRadiusBottomRight: '8px', borderRadiusBottomLeft: '8px' },
                  boxModel: { marginBottom: '12px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px' }
                })
              },
              {
                id: 'el_lm_4', type: 'text_input', name: 'Email Input',
                props: { placeholder: 'Enter your best email address...', required: true },
                style: createDefaultStyle({
                  background: { bgType: 'color', backgroundColor: '#020617' },
                  borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '8px', borderRadiusTopRight: '8px', borderRadiusBottomRight: '8px', borderRadiusBottomLeft: '8px' },
                  boxModel: { marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px' }
                })
              },
              {
                id: 'el_lm_5', type: 'button', name: 'Download Button',
                props: { text: 'DOWNLOAD INSTANT PDF NOW', iconName: 'ArrowRight' },
                style: createDefaultStyle({
                  background: { bgType: 'gradient', gradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
                  borders: { borderStyle: 'none', borderRadiusTopLeft: '10px', borderRadiusTopRight: '10px', borderRadiusBottomRight: '10px', borderRadiusBottomLeft: '10px' },
                  effects: { boxShadow: '0 12px 30px rgba(255, 106, 0, 0.4)' },
                  typography: { fontSize: '17px', fontWeight: '800', fontFamily: 'Outfit', textAlign: 'center', color: '#ffffff' },
                  boxModel: { paddingTop: '16px', paddingBottom: '16px', width: '100%', marginBottom: '12px' }
                })
              },
              {
                id: 'el_lm_trust', type: 'icon_list', name: 'Trust Footer',
                props: { items: ['🔒 100% Free • Instant Download • Spam Free Guarantee'] },
                style: createDefaultStyle({
                  typography: { fontSize: '11px', color: '#64748b', textAlign: 'center' }
                })
              }
            ]
          }
        ]
      }
    ]
  }]
});

export const createReverseSqueezeCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '16px' },
  sections: [{
    id: 'sec_rs_1', name: 'Reverse Squeeze Section', isFullWidth: false, displayMode: 'flex', paddingTop: '48px', paddingBottom: '64px',
    background: { bgType: 'gradient', backgroundColor: '#0f172a', gradient: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 75%)', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [
      {
        id: 'row_rs_top', columnCount: 1, gap: '16px', alignItems: 'center',
        columns: [{
          id: 'col_rs_top', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
          elements: [
            {
              id: 'el_rs_badge', type: 'callout_box', name: 'Top Urgency Header',
              props: { title: '⚡ FREE MASTERCLASS: HOW TO SCALE TO $50K/MO WITHOUT ADS', badgeColor: '#ec4899', icon: 'Flame' },
              style: createDefaultStyle({
                typography: { color: '#f472b6', textAlign: 'center', fontSize: '13px', fontWeight: '800', fontFamily: 'Outfit', letterSpacing: '1px' },
                boxModel: { marginBottom: '16px', paddingTop: '6px', paddingBottom: '6px', paddingLeft: '16px', paddingRight: '16px', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' },
                borders: { borderStyle: 'solid', borderColor: '#ec4899', borderWidth: '1px', borderRadiusTopLeft: '9999px', borderRadiusTopRight: '9999px', borderRadiusBottomRight: '9999px', borderRadiusBottomLeft: '9999px' },
                background: { bgType: 'color', backgroundColor: 'rgba(244, 114, 182, 0.1)' }
              })
            },
            {
              id: 'el_rs_1', type: 'headline', name: 'Headline',
              props: { text: 'Watch Part 1 Below — Enter Your Email To Instantly Unlock Part 2 & Download The Blueprint' },
              style: createDefaultStyle({
                typography: { fontSize: '42px', fontWeight: '800', fontFamily: 'Outfit', textAlign: 'center', color: '#ffffff', isGradientFill: true, gradientStart: '#818cf8', gradientEnd: '#c084fc', lineHeight: '1.15' },
                boxModel: { marginBottom: '16px', maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' }
              })
            },
            {
              id: 'el_rs_sub', type: 'subheadline', name: 'Subheadline',
              props: { text: 'Over 14,200+ entrepreneurs have watched this 12-minute video case study. Learn the exact 3-step framework below.' },
              style: createDefaultStyle({
                typography: { fontSize: '18px', fontFamily: 'Inter', textAlign: 'center', color: '#94a3b8', lineHeight: '1.6' },
                boxModel: { marginBottom: '32px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }
              })
            }
          ]
        }]
      },
      {
        id: 'row_rs_hero', columnCount: 2, gap: '32px', alignItems: 'center',
        columns: [
          {
            id: 'col_rs_video', widthFraction: 0.62, verticalAlign: 'center', padding: '12px', margin: '0px',
            elements: [
              {
                id: 'el_rs_2', type: 'video_player', name: 'VSL Video Stream',
                props: {
                  videoProvider: 'custom',
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                  posterUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80',
                  autoplay: false,
                  showControls: true
                },
                style: createDefaultStyle({
                  borders: { borderStyle: 'solid', borderColor: '#4f46e5', borderWidth: '2px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
                  effects: { boxShadow: '0 25px 60px -15px rgba(99, 102, 241, 0.4)' }
                })
              },
              {
                id: 'el_rs_proof', type: 'star_rating', name: 'Star Proof',
                props: { rating: 5, reviewsCount: '14,200+ Active Viewers', label: 'Rated 4.9/5 Stars' },
                style: createDefaultStyle({
                  typography: { color: '#fbbf24', textAlign: 'center', fontSize: '14px', fontFamily: 'Inter' },
                  boxModel: { marginTop: '16px' }
                })
              }
            ]
          },
          {
            id: 'col_rs_gate', widthFraction: 0.38, verticalAlign: 'center', padding: '24px', margin: '0px',
            elements: [
              {
                id: 'el_rs_card_head', type: 'callout_box', name: 'Gate Card Header',
                props: { title: '🔓 UNLOCK PART 2 & BLUEPRINT' },
                style: createDefaultStyle({
                  background: { bgType: 'color', backgroundColor: 'rgba(15, 23, 42, 0.95)' },
                  borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
                  effects: { boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(16px)' },
                  boxModel: { paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }
                })
              },
              {
                id: 'el_rs_subtext', type: 'subheadline', name: 'Gate Subheadline',
                props: { text: 'Where should we send Part 2 and the step-by-step PDF case study?' },
                style: createDefaultStyle({
                  typography: { fontSize: '13px', color: '#94a3b8', textAlign: 'center' },
                  boxModel: { marginBottom: '20px' }
                })
              },
              {
                id: 'el_rs_name_in', type: 'text_input', name: 'Name Input',
                props: { placeholder: 'Enter your full name...', required: true },
                style: createDefaultStyle({
                  background: { bgType: 'color', backgroundColor: '#020617' },
                  borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '8px', borderRadiusTopRight: '8px', borderRadiusBottomRight: '8px', borderRadiusBottomLeft: '8px' },
                  boxModel: { marginBottom: '12px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px' }
                })
              },
              {
                id: 'el_rs_3', type: 'text_input', name: 'Email Input',
                props: { placeholder: 'Enter your best email address...', required: true },
                style: createDefaultStyle({
                  background: { bgType: 'color', backgroundColor: '#020617' },
                  borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '8px', borderRadiusTopRight: '8px', borderRadiusBottomRight: '8px', borderRadiusBottomLeft: '8px' },
                  boxModel: { marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px' }
                })
              },
              {
                id: 'el_rs_4', type: 'button', name: 'Unlock Button',
                props: { text: 'UNLOCK PART 2 INSTANTLY', iconName: 'ArrowRight' },
                style: createDefaultStyle({
                  background: { bgType: 'gradient', gradient: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)' },
                  borders: { borderStyle: 'none', borderRadiusTopLeft: '10px', borderRadiusTopRight: '10px', borderRadiusBottomRight: '10px', borderRadiusBottomLeft: '10px' },
                  effects: { boxShadow: '0 12px 30px rgba(255, 106, 0, 0.4)' },
                  typography: { fontSize: '16px', fontWeight: '800', fontFamily: 'Outfit', textAlign: 'center', color: '#ffffff' },
                  boxModel: { paddingTop: '16px', paddingBottom: '16px', width: '100%', marginBottom: '12px' }
                })
              },
              {
                id: 'el_rs_guarantee', type: 'icon_list', name: 'Spam Guarantee',
                props: { items: ['🔒 100% Free • No Credit Card Required • Instant Access'] },
                style: createDefaultStyle({
                  typography: { fontSize: '11px', color: '#64748b', textAlign: 'center' }
                })
              }
            ]
          }
        ]
      }
    ]
  }]
});

export const createSqueezeCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Outfit', bodyFont: 'Inter', borderRadiusPreset: '16px' },
  sections: [{
    id: 'sec_sq_1', name: 'Squeeze Section', isFullWidth: false, displayMode: 'flex', paddingTop: '80px', paddingBottom: '80px',
    background: { bgType: 'gradient', backgroundColor: '#0f172a', gradient: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 80%)', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_sq_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_sq_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          {
            id: 'el_sq_badge', type: 'callout_box', name: 'Urgency Badge',
            props: { title: '🔥 2026 CLICKFUNNEL ARCHITECTURE BREAKTHROUGH', badgeColor: '#fbbf24', icon: 'Flame' },
            style: createDefaultStyle({
              typography: { color: '#fbbf24', textAlign: 'center', fontSize: '13px', fontWeight: '800', fontFamily: 'Outfit', letterSpacing: '1px' },
              boxModel: { marginBottom: '20px', paddingTop: '6px', paddingBottom: '6px', paddingLeft: '16px', paddingRight: '16px', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' },
              borders: { borderStyle: 'solid', borderColor: '#fbbf24', borderWidth: '1px', borderRadiusTopLeft: '9999px', borderRadiusTopRight: '9999px', borderRadiusBottomRight: '9999px', borderRadiusBottomLeft: '9999px' },
              background: { bgType: 'color', backgroundColor: 'rgba(251, 191, 36, 0.12)' }
            })
          },
          {
            id: 'el_sq_1', type: 'headline', name: 'Headline',
            props: { text: 'Discover The #1 Secret To Doubling Your Funnel Conversion Rate In 7 Days' },
            style: createDefaultStyle({
              typography: { fontSize: '50px', fontWeight: '800', fontFamily: 'Outfit', textAlign: 'center', color: '#ffffff', isGradientFill: true, gradientStart: '#818cf8', gradientEnd: '#f472b6', lineHeight: '1.12' },
              boxModel: { marginBottom: '20px', maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' }
            })
          },
          {
            id: 'el_sq_sub', type: 'subheadline', name: 'Subheadline',
            props: { text: 'No coding or expensive agencies required. Join 25,000+ top media buyers using this exact conversion stack.' },
            style: createDefaultStyle({
              typography: { fontSize: '20px', fontFamily: 'Inter', textAlign: 'center', color: '#94a3b8', lineHeight: '1.6' },
              boxModel: { marginBottom: '40px', maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto' }
            })
          },
          {
            id: 'el_sq_box', type: 'callout_box', name: 'Lead Form Wrapper',
            props: { title: '⚡ GET FREE INSTANT ACCESS TODAY' },
            style: createDefaultStyle({
              background: { bgType: 'color', backgroundColor: 'rgba(15, 23, 42, 0.95)' },
              borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
              effects: { boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(16px)' },
              boxModel: { paddingTop: '28px', paddingBottom: '28px', paddingLeft: '28px', paddingRight: '28px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }
            })
          },
          {
            id: 'el_sq_2', type: 'text_input', name: 'Email Input',
            props: { placeholder: 'Enter your best email address...', required: true },
            style: createDefaultStyle({
              background: { bgType: 'color', backgroundColor: '#020617' },
              borders: { borderStyle: 'solid', borderColor: '#334155', borderWidth: '1px', borderRadiusTopLeft: '8px', borderRadiusTopRight: '8px', borderRadiusBottomRight: '8px', borderRadiusBottomLeft: '8px' },
              boxModel: { maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px', paddingTop: '14px', paddingBottom: '14px', paddingLeft: '16px', paddingRight: '16px' }
            })
          },
          {
            id: 'el_sq_3', type: 'button', name: 'Button',
            props: { text: 'GET INSTANT ACCESS NOW', iconName: 'ArrowRight' },
            style: createDefaultStyle({
              background: { bgType: 'gradient', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
              borders: { borderStyle: 'none', borderRadiusTopLeft: '10px', borderRadiusTopRight: '10px', borderRadiusBottomRight: '10px', borderRadiusBottomLeft: '10px' },
              effects: { boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)' },
              typography: { fontSize: '18px', fontWeight: '800', fontFamily: 'Outfit', textAlign: 'center', color: '#ffffff' },
              boxModel: { maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '16px', paddingBottom: '16px', width: '100%' }
            })
          }
        ]
      }]
    }]
  }]
});


export const createThankYouCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_ty_1', name: 'Thank You Section', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_ty_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_ty_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_ty_1', type: 'image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_ty_2', type: 'headline', name: 'Headline', props: { text: 'Success! You Are Registered.' }, style: createDefaultStyle({ typography: { fontSize: '48px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_ty_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_ty_4', type: 'subheadline', name: 'Subheadline', props: { text: 'Watch the important 2-minute video above for your next steps.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) }
        ]
      }]
    }]
  }]
});


export const createVSLOrderCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_vsl_order_1', name: 'VSL & Order Form', isFullWidth: false, displayMode: 'flex', paddingTop: '48px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_vsl_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_vsl_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
            elements: [
              { id: 'el_vo_1', type: 'headline', name: 'Headline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' } }) },
              { id: 'el_vo_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_vo_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px' } }) },
              { id: 'el_vo_4', type: 'button', name: 'Add to Cart', props: { text: 'ADD TO CART', iconName: 'ShoppingCart' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '48px' } }) }
            ]
          }]
        },
        {
          id: 'row_vsl_2', columnCount: 2, gap: '32px', alignItems: 'stretch',
          columns: [
            {
              id: 'col_vsl_2', widthFraction: 0.5, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_vo_5', type: 'headline', name: 'Step 1', props: { text: 'Step 1: Contact' }, style: createDefaultStyle({ typography: { fontSize: '20px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_vo_6', type: 'text_input', name: 'Full Name', props: { placeholder: 'Full Name...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_vo_7', type: 'text_input', name: 'Email Address', props: { placeholder: 'Email Address...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_vo_8', type: 'text_input', name: 'Phone Number', props: { placeholder: 'Phone Number...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '48px' } }) },
                { id: 'el_vo_9', type: 'headline', name: 'Step 2', props: { text: 'Step 2: Shipping Address' }, style: createDefaultStyle({ typography: { fontSize: '20px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_vo_10', type: 'shipping_address', name: 'Shipping Form', props: {}, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
              ]
            },
            {
              id: 'col_vsl_3', widthFraction: 0.5, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_vo_11', type: 'headline', name: 'Step 3', props: { text: 'Step 3: Offer Selection' }, style: createDefaultStyle({ typography: { fontSize: '20px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_vo_12', type: 'order_select', name: 'Order Select', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '24px' } }) },
                { id: 'el_vo_13', type: 'credit_card_form', name: 'Credit Card', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
                { id: 'el_vo_14', type: 'order_bump', name: 'Order Bump', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
                { id: 'el_vo_15', type: 'button', name: 'Add to Cart', props: { text: 'ADD TO CART', iconName: 'ShoppingCart' }, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
              ]
            }
          ]
        }
      ]
    }
  ]
});

export const createWebinarRegistrationCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_reg_1', name: 'Webinar Registration', isFullWidth: false, displayMode: 'flex', paddingTop: '32px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_reg_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_web_reg_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wr_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wr_2', type: 'menu_navigation', name: 'Navigation', props: { links: 'Home, About, Contact' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
          { id: 'el_wr_3', type: 'headline', name: 'Headline', props: { text: 'Free Masterclass: How to Scale Your SaaS to $10k/MRR' }, style: createDefaultStyle({ typography: { fontSize: '48px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_wr_4', type: 'subheadline', name: 'Subheadline', props: { text: 'Reserve your seat now. Space is strictly limited.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wr_5', type: 'image', name: 'Feature Image', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80' }, style: createDefaultStyle({ boxModel: { width: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wr_6', type: 'text_input', name: 'Email Input', props: { placeholder: 'Enter your best email address...' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wr_7', type: 'button', name: 'Button', props: { text: 'CLAIM MY FREE SPOT' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createWebinarConfirmationCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_conf_1', name: 'Webinar Confirmation', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_conf_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_web_conf_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wc_1', type: 'headline', name: 'Headline', props: { text: 'You Are Registered! Please Read Carefully...' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#10b981' } }) },
          { id: 'el_wc_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Watch this short 2-minute welcome video before you close this page.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wc_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_4', type: 'webinar_date', name: 'Webinar Date', props: { date: 'Thursday, Oct 24th' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_5', type: 'webinar_time', name: 'Webinar Time', props: { time: '2:00 PM EST' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_6', type: 'add_event', name: 'Add Event', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wc_7', type: 'image', name: 'Feature Image', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80' }, style: createDefaultStyle({ boxModel: { width: '400px', marginLeft: 'auto', marginRight: 'auto', marginTop: '32px' } }) },
          { id: 'el_wc_8', type: 'button', name: 'Button', props: { text: 'JOIN FACEBOOK GROUP' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createWebinarBroadcastCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_bc_1', name: 'Broadcast Room', isFullWidth: true, displayMode: 'flex', paddingTop: '32px', paddingBottom: '32px',
    background: { bgType: 'color', backgroundColor: '#020617', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_bc_1', columnCount: 1, gap: '16px', alignItems: 'center',
      columns: [{
        id: 'col_web_bc_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wb_1', type: 'headline', name: 'Headline', props: { text: 'LIVE: How to Scale Your SaaS' }, style: createDefaultStyle({ typography: { fontSize: '32px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_wb_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Please wait, the presentation will begin shortly.' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wb_3', type: 'evergreen_timer', name: 'Countdown', props: { minutes: 5, seconds: 0 }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wb_4', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createWebinarReplayCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_web_rep_1', name: 'Replay Room', isFullWidth: true, displayMode: 'flex', paddingTop: '32px', paddingBottom: '32px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_web_rep_1', columnCount: 1, gap: '16px', alignItems: 'center',
      columns: [{
        id: 'col_web_rep_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
        elements: [
          { id: 'el_wrep_1', type: 'headline', name: 'Headline', props: { text: 'LIMITED REPLAY: How to Scale Your SaaS' }, style: createDefaultStyle({ typography: { fontSize: '36px', fontWeight: '800', textAlign: 'center', color: '#f43f5e' } }) },
          { id: 'el_wrep_2', type: 'subheadline', name: 'Subheadline', props: { text: 'This replay will be taken down soon.' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#94a3b8' } }) },
          { id: 'el_wrep_3', type: 'evergreen_timer', name: 'Countdown', props: { hours: 48, minutes: 0, seconds: 0 }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wrep_4', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' } }) },
          { id: 'el_wrep_5', type: 'button', name: 'Button', props: { text: 'YES! I WANT THE SPECIAL OFFER' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});


export const createMemberAccessCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '12px' },
  sections: [{
    id: 'sec_mem_acc_1', name: 'Member Access Section', isFullWidth: false, displayMode: 'flex', paddingTop: '100px', paddingBottom: '100px',
    background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
    rows: [{
      id: 'row_mem_acc_1', columnCount: 1, gap: '24px', alignItems: 'center',
      columns: [{
        id: 'col_mem_acc_1', widthFraction: 1, verticalAlign: 'center', padding: '32px', margin: '0px',
        elements: [
          { id: 'el_mac_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '24px' } }) },
          { id: 'el_mac_2', type: 'headline', name: 'Headline', props: { text: 'Welcome Back. Please Log In.' }, style: createDefaultStyle({ typography: { fontSize: '32px', fontWeight: '800', textAlign: 'center' } }) },
          { id: 'el_mac_3', type: 'member_user_login', name: 'Member Login', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } }) }
        ]
      }]
    }]
  }]
});

export const createMembersAreaCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#6366f1', secondaryColor: '#ec4899', accentColor: '#10b981', backgroundColor: '#0f172a', textColor: '#f8fafc', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '12px' },
  sections: [
    {
      id: 'sec_mem_nav_1', name: 'Membership Header', isFullWidth: true, displayMode: 'flex', paddingTop: '16px', paddingBottom: '16px',
      background: { bgType: 'color', backgroundColor: '#020617', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [{
        id: 'row_mem_nav_1', columnCount: 1, gap: '16px', alignItems: 'center',
        columns: [{
          id: 'col_mem_nav_1', widthFraction: 1, verticalAlign: 'center', padding: '16px', margin: '0px',
          elements: [
            { id: 'el_marea_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px' } }) },
            { id: 'el_marea_2', type: 'menu_navigation', name: 'Navigation', props: { links: 'Dashboard, Courses, Community, Profile' }, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
          ]
        }]
      }]
    },
    {
      id: 'sec_mem_content_1', name: 'Membership Content', isFullWidth: false, displayMode: 'flex', paddingTop: '32px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#0f172a', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [{
        id: 'row_mem_content_1', columnCount: 1, gap: '24px', alignItems: 'center',
        columns: [{
          id: 'col_mem_content_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
          elements: [
            { id: 'el_marea_3', type: 'membership_search', name: 'Search', props: { placeholder: 'Search lessons...' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '24px' } }) },
            { id: 'el_marea_4', type: 'membership_navigation', name: 'Membership Navigation', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
            { id: 'el_marea_5', type: 'video_lesson_player', name: 'Lesson Content', props: { title: 'Welcome to the Academy', description: 'Watch this orientation video to get started.' }, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
          ]
        }]
      }]
    }
  ]
});


export const createOfferWallCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_offerwall_1', name: 'Offer Wall Content', isFullWidth: false, displayMode: 'flex', paddingTop: '48px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_ow_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_ow_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
            elements: [
              { id: 'el_ow_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '120px', marginBottom: '24px', marginLeft: '0px', marginRight: 'auto' } }) },
              { id: 'el_ow_2', type: 'headline', name: 'Headline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' } }) },
              { id: 'el_ow_3', type: 'subheadline', name: 'Subheadline', props: { text: 'This is your sub-headline to increase credibility or curiosity' }, style: createDefaultStyle({ typography: { fontSize: '18px', textAlign: 'center', color: '#64748b' } }) },
              { id: 'el_ow_4', type: 'order_summary', name: 'Order Summary', props: {}, style: createDefaultStyle({ boxModel: { width: '100%', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginTop: '32px', marginBottom: '32px' } }) }
            ]
          }]
        },
        {
          id: 'row_ow_2', columnCount: 3, gap: '24px', alignItems: 'stretch',
          columns: [
            {
              id: 'col_ow_2', widthFraction: 0.33, verticalAlign: 'top', padding: '8px', margin: '0px',
              elements: [
                { id: 'el_ow_5', type: 'image', name: 'Offer Image 1', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_ow_6', type: 'button', name: 'Offer Button 1', props: { text: 'SPECIAL OFFER CLICK HERE' }, style: createDefaultStyle({ boxModel: { width: '100%' }, typography: { fontSize: '14px', fontWeight: '700' } }) }
              ]
            },
            {
              id: 'col_ow_3', widthFraction: 0.33, verticalAlign: 'top', padding: '8px', margin: '0px',
              elements: [
                { id: 'el_ow_7', type: 'image', name: 'Offer Image 2', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_ow_8', type: 'button', name: 'Offer Button 2', props: { text: 'SPECIAL OFFER CLICK HERE' }, style: createDefaultStyle({ boxModel: { width: '100%' }, typography: { fontSize: '14px', fontWeight: '700' } }) }
              ]
            },
            {
              id: 'col_ow_4', widthFraction: 0.33, verticalAlign: 'top', padding: '8px', margin: '0px',
              elements: [
                { id: 'el_ow_9', type: 'image', name: 'Offer Image 3', props: { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } }) },
                { id: 'el_ow_10', type: 'button', name: 'Offer Button 3', props: { text: 'SPECIAL OFFER CLICK HERE' }, style: createDefaultStyle({ boxModel: { width: '100%' }, typography: { fontSize: '14px', fontWeight: '700' } }) }
              ]
            }
          ]
        }
      ]
    }
  ]
});


export const createOTOCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#f97316', secondaryColor: '#ea580c', accentColor: '#fb923c', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_oto_1', name: 'One Time Offer', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_oto_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_oto_1', widthFraction: 1, verticalAlign: 'top', padding: '32px', margin: '0px',
            elements: [
              { id: 'el_oto_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_oto_2', type: 'headline', name: 'Headline', props: { text: 'WAIT! Your Order Is Not Complete Yet...' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#ea580c' } }) },
              { id: 'el_oto_3', type: 'subheadline', name: 'Subheadline', props: { text: 'Watch this short video to see how you can upgrade your order today.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#64748b' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_oto_4', type: 'video_player', name: 'Sales Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_oto_5', type: 'button', name: 'Upgrade Button', props: { text: 'YES! ADD THIS TO MY ORDER NOW' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }, typography: { fontSize: '20px', fontWeight: '800' } }) }
            ]
          }]
        }
      ]
    }
  ]
});

export const createDownsellCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#ef4444', secondaryColor: '#dc2626', accentColor: '#f87171', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_downsell_1', name: 'Downsell Offer', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_ds_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_ds_1', widthFraction: 1, verticalAlign: 'top', padding: '32px', margin: '0px',
            elements: [
              { id: 'el_ds_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_ds_2', type: 'headline', name: 'Headline', props: { text: 'Too Expensive? Here\'s A Payment Plan...' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#dc2626' } }) },
              { id: 'el_ds_3', type: 'subheadline', name: 'Subheadline', props: { text: 'We don\'t want you to miss out. Watch the video below.' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#64748b' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_ds_4', type: 'video_player', name: 'Sales Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_ds_5', type: 'button', name: 'Upgrade Button', props: { text: 'YES! I WANT THE PAYMENT PLAN' }, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }, typography: { fontSize: '20px', fontWeight: '800' } }) }
            ]
          }]
        }
      ]
    }
  ]
});


export const createBridgeCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_bridge_1', name: 'Bridge Content', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_bridge_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_bridge_1', widthFraction: 1, verticalAlign: 'top', padding: '48px', margin: '0px',
            elements: [
              { id: 'el_bridge_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_bridge_2', type: 'headline', name: 'Headline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_bridge_3', type: 'video_player', name: 'Bridge Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_bridge_4', type: 'headline', name: 'Sub Headline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '24px', fontWeight: '700', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
              { id: 'el_bridge_5', type: 'paragraph', name: 'Paragraph', props: { text: 'Here\'s where you write your compelling message. Keep your sentences and paragraphs short.\n\nUse bold, underline and italics to emphasize important points.\n\nDon\'t be boring! Pretend you\'re telling a mystery story. Keep your audience captivated. Eliminate any and all superfluous redundant words that only serve to unnecessarily complicate and hinder the flow and ease of the reader\'s experience (i.e. get to the point).' }, style: createDefaultStyle({ typography: { fontSize: '16px', textAlign: 'center', color: '#64748b' }, boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '48px' } }) },
              { id: 'el_bridge_6', type: 'button', name: 'Continue Button', props: { text: 'Go To Step #2 Now ?', iconName: 'ArrowRight' }, style: createDefaultStyle({ boxModel: { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }, typography: { fontSize: '20px', fontWeight: '800' } }) }
            ]
          }]
        }
      ]
    }
  ]
});


export const createShareCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_share_1', name: 'Share Page Content', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_share_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_share_1', widthFraction: 1, verticalAlign: 'top', padding: '48px', margin: '0px',
            elements: [
              { id: 'el_share_1', type: 'logo_image', name: 'Logo', props: { src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&q=80' }, style: createDefaultStyle({ boxModel: { width: '150px', marginBottom: '32px', marginLeft: 'auto', marginRight: 'auto' } }) },
              { id: 'el_share_2', type: 'headline', name: 'Headline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '32px' } }) },
              { id: 'el_share_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px' } }) },
              { id: 'el_share_4', type: 'social_share', name: 'Social Share', props: {}, style: createDefaultStyle({ boxModel: { maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' } }) }
            ]
          }]
        }
      ]
    }
  ]
});


export const createTwoStepOrderCanvas = (): CanvasState => ({
  globalTokens: { primaryColor: '#2563eb', secondaryColor: '#4f46e5', accentColor: '#3b82f6', backgroundColor: '#f8fafc', textColor: '#0f172a', headingFont: 'Montserrat', bodyFont: 'Open Sans', borderRadiusPreset: '8px' },
  sections: [
    {
      id: 'sec_two_step_1', name: 'Order Page Content', isFullWidth: false, displayMode: 'flex', paddingTop: '64px', paddingBottom: '64px',
      background: { bgType: 'color', backgroundColor: '#ffffff', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
      rows: [
        {
          id: 'row_two_step_1', columnCount: 1, gap: '24px', alignItems: 'center',
          columns: [{
            id: 'col_two_step_1', widthFraction: 1, verticalAlign: 'top', padding: '16px', margin: '0px',
            elements: [
              { id: 'el_ts_1', type: 'headline', name: 'Headline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '42px', fontWeight: '800', textAlign: 'center', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
              { id: 'el_ts_2', type: 'subheadline', name: 'Subheadline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '20px', textAlign: 'center', color: '#64748b' }, boxModel: { marginBottom: '32px' } }) }
            ]
          }]
        },
        {
          id: 'row_two_step_2', columnCount: 2, gap: '32px', alignItems: 'stretch',
          columns: [
            {
              id: 'col_two_step_2', widthFraction: 0.6, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_ts_3', type: 'video_player', name: 'Video', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }, style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '32px' } }) },
                { id: 'el_ts_4', type: 'headline', name: 'Secondary Headline', props: { text: 'Here\'s Your Attention Getting Headline' }, style: createDefaultStyle({ typography: { fontSize: '24px', fontWeight: '700', textAlign: 'left', color: '#1e40af' }, boxModel: { marginBottom: '16px' } }) },
                { id: 'el_ts_5', type: 'paragraph', name: 'Paragraph', props: { text: 'Here is another paragraph with more awesome information. It should be long enough to explain the concepts, but short enough to keep their attention.' }, style: createDefaultStyle({ typography: { fontSize: '16px', textAlign: 'left', color: '#64748b' } }) }
              ]
            },
            {
              id: 'col_two_step_3', widthFraction: 0.4, verticalAlign: 'top', padding: '16px', margin: '0px',
              elements: [
                { id: 'el_ts_6', type: 'two_step_checkout', name: 'Two Step Checkout', props: { productName: 'LaunchEngine SaaS License', price: '$297.00', formBgColor: '#0f172a', formBorderColor: '#1e293b', formBorderRadius: '8px', formPadding: '24px', fieldBgColor: '#020617', fieldBorderColor: '#1e293b', fieldTextColor: '#f1f5f9', fieldFontFamily: 'inherit', fieldFontSize: '14px', titleColor: '#ffffff', titleFontFamily: 'inherit', titleFontSize: '14px', buttonText: 'COMPLETE ORDER NOW', buttonColor: '#22c55e', buttonHoverColor: '#16a34a', buttonTextColor: '#ffffff', buttonFontFamily: 'inherit', buttonFontSize: '16px', buttonFontWeight: '700', buttonBorderRadius: '12px', buttonBorderWidth: '0px', buttonBorderColor: 'transparent' }, style: createDefaultStyle({ boxModel: { width: '100%' } }) }
              ]
            }
          ]
        }
      ]
    }
  ]
});

// ─── APPLICATION FUNNEL CANVAS BUILDERS (STANDARDIZED 1/1 SCALE ENGINE) ─────────────

interface AppFunnelThemeConfig {
  idPrefix: string;
  nicheTitle: string;
  nicheUpper: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  heroBgImage: string;
  heroImage: string;
  headlineText: string;
  subheadlineText: string;
  buttonTextColor?: string;
}

const buildAppFunnelState = (
  config: AppFunnelThemeConfig,
  stepType: 'OptIn' | 'Application' | 'ThankYou'
): CanvasState => {
  const pfx = config.idPrefix;
  const btnTextColor = config.buttonTextColor || '#ffffff';

  const globalTokens = {
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor,
    headingFont: config.headingFont,
    bodyFont: config.bodyFont,
    borderRadiusPreset: '12px'
  };

  if (stepType === 'OptIn') {
    return {
      globalTokens,
      sections: [
        // Section 1: Header Alert Announcement Bar
        {
          id: `sec_${pfx}_optin_bar`,
          name: 'Announcement Bar',
          isFullWidth: true,
          displayMode: 'flex',
          paddingTop: '12px',
          paddingBottom: '12px',
          background: { bgType: 'color', backgroundColor: config.primaryColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
          rows: [{
            id: `row_${pfx}_bar`,
            columnCount: 1,
            gap: '0px',
            alignItems: 'center',
            columns: [{
              id: `col_${pfx}_bar`,
              widthFraction: 1,
              verticalAlign: 'center',
              padding: '0px 16px',
              margin: '0px',
              elements: [{
                id: `el_${pfx}_bar_1`,
                type: 'headline',
                name: 'Bar Text',
                props: { text: `★ BATTLE-TESTED FUNNEL — THE ${config.nicheUpper} APPLICATION FUNNEL ★` },
                style: createDefaultStyle({
                  typography: { fontFamily: 'Montserrat', fontSize: '14px', fontWeight: '800', textAlign: 'center', color: '#ffffff', lineHeight: '1.4', letterSpacing: '2px', textShadow: 'none', isGradientFill: false },
                  boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' }
                })
              }]
            }]
          }]
        },
        // Section 2: Hero Reverse Squeeze Section
        {
          id: `sec_${pfx}_hero`,
          name: 'Hero Section',
          isFullWidth: true,
          displayMode: 'flex',
          paddingTop: '60px',
          paddingBottom: '60px',
          background: { bgType: 'image', backgroundColor: config.backgroundColor, gradient: '', bgImage: config.heroBgImage, bgImageSize: 'cover', bgImagePosition: 'center top', bgOverlayColor: config.backgroundColor, bgOverlayOpacity: 0.88, isParallax: false, bgVideoUrl: '' },
          rows: [{
            id: `row_${pfx}_hero_1`,
            columnCount: 1,
            gap: '24px',
            alignItems: 'center',
            columns: [{
              id: `col_${pfx}_hero_1`,
              widthFraction: 1,
              verticalAlign: 'center',
              padding: '20px 40px',
              margin: '0px',
              elements: [
                {
                  id: `el_${pfx}_hero_tag`,
                  type: 'callout_box',
                  name: 'Tag Badge',
                  props: { title: `★ INTRODUCING ★  THE ${config.nicheUpper} APPLICATION FUNNEL` },
                  style: createDefaultStyle({
                    typography: { fontFamily: config.bodyFont, fontSize: '12px', fontWeight: '800', textAlign: 'center', color: config.primaryColor, lineHeight: '1.3', letterSpacing: '2px', textShadow: 'none', isGradientFill: false },
                    boxModel: { marginBottom: '20px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', width: 'fit-content', maxWidth: '100%', height: 'auto', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto' },
                    borders: { borderStyle: 'solid', borderColor: config.primaryColor, borderWidth: '1px', borderRadiusTopLeft: '9999px', borderRadiusTopRight: '9999px', borderRadiusBottomRight: '9999px', borderRadiusBottomLeft: '9999px' },
                    background: { bgType: 'color', backgroundColor: 'rgba(15, 23, 42, 0.6)', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' }
                  })
                },
                {
                  id: `el_${pfx}_hero_h1`,
                  type: 'headline',
                  name: 'Main Headline',
                  props: { text: config.headlineText },
                  style: createDefaultStyle({
                    typography: { fontFamily: config.headingFont, fontSize: '48px', fontWeight: '800', textAlign: 'center', color: '#ffffff', lineHeight: '1.15', letterSpacing: '-0.5px', textShadow: `0 4px 20px ${config.primaryColor}55`, isGradientFill: false },
                    boxModel: { marginBottom: '20px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '900px', height: 'auto' }
                  })
                },
                {
                  id: `el_${pfx}_hero_sub`,
                  type: 'subheadline',
                  name: 'Subheadline',
                  props: { text: config.subheadlineText },
                  style: createDefaultStyle({
                    typography: { fontFamily: config.bodyFont, fontSize: '18px', fontWeight: '400', textAlign: 'center', color: '#cbd5e1', lineHeight: '1.6', letterSpacing: '0px', textShadow: 'none', isGradientFill: false },
                    boxModel: { marginBottom: '32px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '720px', height: 'auto' }
                  })
                },
                {
                  id: `el_${pfx}_hero_img`,
                  type: 'image',
                  name: 'Hero Image',
                  props: { src: config.heroImage, alt: config.nicheTitle },
                  style: createDefaultStyle({
                    boxModel: { width: '100%', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '32px', marginTop: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', height: 'auto' },
                    borders: { borderStyle: 'solid', borderColor: config.primaryColor, borderWidth: '3px', borderRadiusTopLeft: '16px', borderRadiusTopRight: '16px', borderRadiusBottomRight: '16px', borderRadiusBottomLeft: '16px' },
                    effects: { boxShadow: `0 20px 60px ${config.primaryColor}44`, innerShadow: 'none', blur: '0px', opacity: 1, backdropFilter: 'none' }
                  })
                },
                {
                  id: `el_${pfx}_ribbon`,
                  type: 'callout_box',
                  name: 'Ribbon Badge',
                  props: { title: 'ENTER YOUR NAME & EMAIL BELOW TO GET INSTANT ACCESS:' },
                  style: createDefaultStyle({
                    typography: { fontFamily: config.bodyFont, fontSize: '14px', fontWeight: '800', textAlign: 'center', color: '#ffffff', lineHeight: '1.4', letterSpacing: '1px', textShadow: 'none', isGradientFill: false },
                    boxModel: { marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px', paddingLeft: '24px', paddingRight: '24px', width: '100%', maxWidth: '520px', height: 'auto', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto' },
                    background: { bgType: 'color', backgroundColor: config.accentColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
                    borders: { borderStyle: 'none', borderColor: 'transparent', borderWidth: '0px', borderRadiusTopLeft: '8px', borderRadiusTopRight: '8px', borderRadiusBottomRight: '8px', borderRadiusBottomLeft: '8px' }
                  })
                },
                {
                  id: `el_${pfx}_name_input`,
                  type: 'text_input',
                  name: 'Name Input',
                  props: { placeholder: 'Your First Name...', label: 'First Name', required: true },
                  style: createDefaultStyle({ boxModel: { maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '12px', marginTop: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', height: 'auto' } })
                },
                {
                  id: `el_${pfx}_email_input`,
                  type: 'text_input',
                  name: 'Email Input',
                  props: { placeholder: 'Your Best Email Address...', label: 'Email Address', required: true },
                  style: createDefaultStyle({ boxModel: { maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', marginTop: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', height: 'auto' } })
                },
                {
                  id: `el_${pfx}_cta_btn`,
                  type: 'button',
                  name: 'CTA Button',
                  props: { text: 'GO TO APPLICATION STEP #2 →', iconName: 'ArrowRight', buttonColor: config.primaryColor },
                  style: createDefaultStyle({
                    background: { bgType: 'color', backgroundColor: config.primaryColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
                    typography: { fontFamily: config.bodyFont, fontSize: '18px', fontWeight: '800', textAlign: 'center', color: btnTextColor, lineHeight: '1.3', letterSpacing: '1px', textShadow: 'none', isGradientFill: false },
                    boxModel: { maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px', marginTop: '0px', paddingTop: '18px', paddingBottom: '18px', paddingLeft: '32px', paddingRight: '32px', width: '100%', height: 'auto' },
                    borders: { borderStyle: 'none', borderColor: 'transparent', borderWidth: '0px', borderRadiusTopLeft: '12px', borderRadiusTopRight: '12px', borderRadiusBottomRight: '12px', borderRadiusBottomLeft: '12px' },
                    effects: { boxShadow: `0 8px 30px ${config.primaryColor}66`, innerShadow: 'none', blur: '0px', opacity: 1, backdropFilter: 'none' }
                  })
                },
                {
                  id: `el_${pfx}_privacy`,
                  type: 'paragraph',
                  name: 'Privacy Text',
                  props: { text: '🔒 100% Secure. We Respect Your Privacy.' },
                  style: createDefaultStyle({
                    typography: { fontFamily: config.bodyFont, fontSize: '12px', fontWeight: '400', textAlign: 'center', color: '#94a3b8', lineHeight: '1.5', letterSpacing: '0px', textShadow: 'none', isGradientFill: false },
                    boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '400px', height: 'auto' }
                  })
                }
              ]
            }]
          }]
        },
        // Section 3: 3-Column Social Proof Bar
        {
          id: `sec_${pfx}_social`,
          name: 'Social Proof Bar',
          isFullWidth: true,
          displayMode: 'flex',
          paddingTop: '20px',
          paddingBottom: '20px',
          background: { bgType: 'color', backgroundColor: config.secondaryColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
          rows: [{
            id: `row_${pfx}_social`,
            columnCount: 3,
            gap: '16px',
            alignItems: 'center',
            columns: [
              { id: `col_${pfx}_s1`, widthFraction: 0.33, verticalAlign: 'center', padding: '8px 16px', margin: '0px', elements: [{ id: `el_${pfx}_s1`, type: 'paragraph', name: 'Proof 1', props: { text: '✅ REAL LEADS. REAL RESULTS.' }, style: createDefaultStyle({ typography: { fontFamily: config.bodyFont, fontSize: '14px', fontWeight: '700', textAlign: 'center', color: '#ffffff', lineHeight: '1.4', letterSpacing: '1px', textShadow: 'none', isGradientFill: false }, boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' } }) }] },
              { id: `col_${pfx}_s2`, widthFraction: 0.33, verticalAlign: 'center', padding: '8px 16px', margin: '0px', elements: [{ id: `el_${pfx}_s2`, type: 'paragraph', name: 'Proof 2', props: { text: '🔥 SET UP IN MINUTES' }, style: createDefaultStyle({ typography: { fontFamily: config.bodyFont, fontSize: '14px', fontWeight: '700', textAlign: 'center', color: '#ffffff', lineHeight: '1.4', letterSpacing: '1px', textShadow: 'none', isGradientFill: false }, boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' } }) }] },
              { id: `col_${pfx}_s3`, widthFraction: 0.33, verticalAlign: 'center', padding: '8px 16px', margin: '0px', elements: [{ id: `el_${pfx}_s3`, type: 'paragraph', name: 'Proof 3', props: { text: '💎 VIDEO TUTORIALS INCLUDED' }, style: createDefaultStyle({ typography: { fontFamily: config.bodyFont, fontSize: '14px', fontWeight: '700', textAlign: 'center', color: '#ffffff', lineHeight: '1.4', letterSpacing: '1px', textShadow: 'none', isGradientFill: false }, boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' } }) }] }
            ]
          }]
        },
        // Section 4: Bottom Urgency Callout
        {
          id: `sec_${pfx}_urgency`,
          name: 'Urgency Section',
          isFullWidth: true,
          displayMode: 'flex',
          paddingTop: '40px',
          paddingBottom: '40px',
          background: { bgType: 'color', backgroundColor: '#090d16', gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
          rows: [{
            id: `row_${pfx}_urgency`,
            columnCount: 1,
            gap: '16px',
            alignItems: 'center',
            columns: [{
              id: `col_${pfx}_urgency`,
              widthFraction: 1,
              verticalAlign: 'center',
              padding: '0px 16px',
              margin: '0px',
              elements: [
                {
                  id: `el_${pfx}_u_sub`,
                  type: 'subheadline',
                  name: 'Urgency Text',
                  props: { text: 'My Time Is Limited And I Can Only Accept 10 New Applicants This Month.' },
                  style: createDefaultStyle({ typography: { fontFamily: config.bodyFont, fontSize: '20px', fontWeight: '700', textAlign: 'center', color: '#ffffff', lineHeight: '1.5' }, boxModel: { marginBottom: '20px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '640px' } })
                },
                {
                  id: `el_${pfx}_u_btn`,
                  type: 'button',
                  name: 'Urgency Button',
                  props: { text: 'GO TO APPLICATION STEP #2 →', iconName: 'ArrowRight', buttonColor: config.primaryColor },
                  style: createDefaultStyle({
                    background: { bgType: 'color', backgroundColor: config.primaryColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
                    typography: { fontFamily: config.bodyFont, fontSize: '18px', fontWeight: '800', textAlign: 'center', color: btnTextColor, lineHeight: '1.3', letterSpacing: '1px' },
                    boxModel: { maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '0px', paddingTop: '18px', paddingBottom: '18px', paddingLeft: '32px', paddingRight: '32px', width: '100%', borderRadiusTopLeft: '12px', borderRadiusTopRight: '12px', borderRadiusBottomRight: '12px', borderRadiusBottomLeft: '12px' },
                    effects: { boxShadow: `0 8px 30px ${config.primaryColor}66` }
                  })
                }
              ]
            }]
          }]
        }
      ]
    };
  }

  if (stepType === 'Application') {
    return {
      globalTokens,
      sections: [
        // Section 1: Header Alert Announcement Bar
        {
          id: `sec_${pfx}_app_bar`,
          name: 'Announcement Bar',
          isFullWidth: true,
          displayMode: 'flex',
          paddingTop: '12px',
          paddingBottom: '12px',
          background: { bgType: 'color', backgroundColor: config.primaryColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
          rows: [{
            id: `row_${pfx}_app_bar`,
            columnCount: 1,
            gap: '0px',
            alignItems: 'center',
            columns: [{
              id: `col_${pfx}_app_bar`,
              widthFraction: 1,
              verticalAlign: 'center',
              padding: '0px 16px',
              margin: '0px',
              elements: [{
                id: `el_${pfx}_app_bar_1`,
                type: 'headline',
                name: 'Bar Text',
                props: { text: '★ APPLICATION PAGE ★' },
                style: createDefaultStyle({
                  typography: { fontFamily: 'Montserrat', fontSize: '14px', fontWeight: '800', textAlign: 'center', color: '#ffffff', lineHeight: '1.4', letterSpacing: '2px', textShadow: 'none', isGradientFill: false },
                  boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' }
                })
              }]
            }]
          }]
        },
        // Section 2: 2-Column Application Hero Section
        {
          id: `sec_${pfx}_app_hero`,
          name: 'Application Hero Section',
          isFullWidth: true,
          displayMode: 'flex',
          paddingTop: '60px',
          paddingBottom: '60px',
          background: { bgType: 'image', backgroundColor: config.backgroundColor, gradient: '', bgImage: config.heroBgImage, bgImageSize: 'cover', bgImagePosition: 'center top', bgOverlayColor: config.backgroundColor, bgOverlayOpacity: 0.88, isParallax: false, bgVideoUrl: '' },
          rows: [{
            id: `row_${pfx}_app_hero`,
            columnCount: 2,
            gap: '40px',
            alignItems: 'center',
            columns: [
              // Left Column (60%)
              {
                id: `col_${pfx}_app_left`,
                widthFraction: 0.6,
                verticalAlign: 'center',
                padding: '20px',
                margin: '0px',
                elements: [
                  {
                    id: `el_${pfx}_app_h1`,
                    type: 'headline',
                    name: 'Application Headline',
                    props: { text: `Apply To Work With Me` },
                    style: createDefaultStyle({
                      typography: { fontFamily: config.headingFont, fontSize: '44px', fontWeight: '800', textAlign: 'left', color: '#ffffff', lineHeight: '1.15', letterSpacing: '-0.5px' },
                      boxModel: { marginBottom: '16px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', width: '100%' }
                    })
                  },
                  {
                    id: `el_${pfx}_app_sub`,
                    type: 'subheadline',
                    name: 'Application Subheadline',
                    props: { text: `Fill out the short application below to see if you qualify for our exclusive ${config.nicheTitle} program.` },
                    style: createDefaultStyle({
                      typography: { fontFamily: config.bodyFont, fontSize: '18px', fontWeight: '400', textAlign: 'left', color: '#cbd5e1', lineHeight: '1.6' },
                      boxModel: { marginBottom: '24px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', width: '100%' }
                    })
                  },
                  {
                    id: `el_${pfx}_app_img`,
                    type: 'image',
                    name: 'Coach Image',
                    props: { src: config.heroImage, alt: config.nicheTitle },
                    style: createDefaultStyle({
                      boxModel: { width: '100%', maxWidth: '420px', marginLeft: '0px', marginRight: 'auto', marginBottom: '24px', height: 'auto' },
                      borders: { borderStyle: 'solid', borderColor: config.primaryColor, borderWidth: '2px', borderRadiusTopLeft: '12px', borderRadiusTopRight: '12px', borderRadiusBottomRight: '12px', borderRadiusBottomLeft: '12px' }
                    })
                  },
                  {
                    id: `el_${pfx}_app_steps`,
                    type: 'icon_list',
                    name: 'Application Steps',
                    props: { items: ['✓ Step 1: Complete the quick 60-second assessment', '✓ Step 2: Choose your preferred strategy call time', '✓ Step 3: Speak directly with our senior growth advisor'] },
                    style: createDefaultStyle({
                      typography: { fontFamily: config.bodyFont, fontSize: '15px', fontWeight: '600', textAlign: 'left', color: '#ffffff', lineHeight: '1.8' },
                      boxModel: { marginBottom: '0px', marginTop: '0px', width: '100%' }
                    })
                  }
                ]
              },
              // Right Column (40%) - Application Form Card
              {
                id: `col_${pfx}_app_right`,
                widthFraction: 0.4,
                verticalAlign: 'center',
                padding: '20px',
                margin: '0px',
                elements: [
                  {
                    id: `el_${pfx}_card_header`,
                    type: 'callout_box',
                    name: 'Card Header',
                    props: { title: 'APPLY FOR THIS PROGRAM' },
                    style: createDefaultStyle({
                      typography: { fontFamily: config.headingFont, fontSize: '14px', fontWeight: '800', textAlign: 'center', color: '#ffffff', letterSpacing: '1px' },
                      boxModel: { paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px', width: '100%', marginBottom: '20px', borderRadiusTopLeft: '8px', borderRadiusTopRight: '8px', borderRadiusBottomRight: '8px', borderRadiusBottomLeft: '8px' },
                      background: { bgType: 'color', backgroundColor: config.accentColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' }
                    })
                  },
                  {
                    id: `el_${pfx}_f_name`,
                    type: 'text_input',
                    name: 'Full Name Input',
                    props: { label: 'Full Name', placeholder: 'Your Full Name...', required: true },
                    style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } })
                  },
                  {
                    id: `el_${pfx}_f_email`,
                    type: 'text_input',
                    name: 'Email Input',
                    props: { label: 'Email Address', placeholder: 'Your Best Email Address...', required: true },
                    style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } })
                  },
                  {
                    id: `el_${pfx}_f_phone`,
                    type: 'text_input',
                    name: 'Phone Input',
                    props: { label: 'Phone Number', placeholder: '(555) 000-0000', required: true },
                    style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } })
                  },
                  {
                    id: `el_${pfx}_f_challenge`,
                    type: 'textarea',
                    name: 'Challenge Textarea',
                    props: { label: 'What is your biggest business goal right now?', placeholder: 'Describe what you want to achieve...', required: true, rows: 3 },
                    style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '16px' } })
                  },
                  {
                    id: `el_${pfx}_f_revenue`,
                    type: 'select_dropdown',
                    name: 'Revenue Dropdown',
                    props: { label: 'Current Revenue Level', options: 'Under $5k/mo, $5k - $20k/mo, $20k - $50k/mo, $50k+/mo', required: true },
                    style: createDefaultStyle({ boxModel: { width: '100%', marginBottom: '24px' } })
                  },
                  {
                    id: `el_${pfx}_app_submit_btn`,
                    type: 'button',
                    name: 'Submit Button',
                    props: { text: 'SUBMIT APPLICATION →', iconName: 'ArrowRight', buttonColor: config.primaryColor },
                    style: createDefaultStyle({
                      background: { bgType: 'color', backgroundColor: config.primaryColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
                      typography: { fontFamily: config.bodyFont, fontSize: '18px', fontWeight: '800', textAlign: 'center', color: btnTextColor, lineHeight: '1.3', letterSpacing: '1px' },
                      boxModel: { width: '100%', maxWidth: '100%', paddingTop: '18px', paddingBottom: '18px', paddingLeft: '32px', paddingRight: '32px', marginBottom: '12px', borderRadiusTopLeft: '12px', borderRadiusTopRight: '12px', borderRadiusBottomRight: '12px', borderRadiusBottomLeft: '12px' },
                      effects: { boxShadow: `0 8px 30px ${config.primaryColor}66` }
                    })
                  }
                ]
              }
            ]
          }]
        }
      ]
    };
  }

  // Step 3: ThankYou
  return {
    globalTokens,
    sections: [
      // Section 1: Header Alert Announcement Bar
      {
        id: `sec_${pfx}_thankyou_bar`,
        name: 'Announcement Bar',
        isFullWidth: true,
        displayMode: 'flex',
        paddingTop: '12px',
        paddingBottom: '12px',
        background: { bgType: 'color', backgroundColor: config.primaryColor, gradient: '', bgImage: '', bgImageSize: 'cover', bgImagePosition: 'center', isParallax: false, bgVideoUrl: '' },
        rows: [{
          id: `row_${pfx}_thankyou_bar`,
          columnCount: 1,
          gap: '0px',
          alignItems: 'center',
          columns: [{
            id: `col_${pfx}_thankyou_bar`,
            widthFraction: 1,
            verticalAlign: 'center',
            padding: '0px 16px',
            margin: '0px',
            elements: [{
              id: `el_${pfx}_ty_bar_1`,
              type: 'headline',
              name: 'Bar Text',
              props: { text: '★ THANK YOU PAGE ★' },
              style: createDefaultStyle({
                typography: { fontFamily: 'Montserrat', fontSize: '14px', fontWeight: '800', textAlign: 'center', color: '#ffffff', lineHeight: '1.4', letterSpacing: '2px', textShadow: 'none', isGradientFill: false },
                boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', width: '100%', maxWidth: '100%', height: 'auto' }
              })
            }]
          }]
        }]
      },
      // Section 2: Centered Thank You Hero Block
      {
        id: `sec_${pfx}_thankyou_hero`,
        name: 'Thank You Hero Section',
        isFullWidth: true,
        displayMode: 'flex',
        paddingTop: '80px',
        paddingBottom: '80px',
        background: { bgType: 'image', backgroundColor: config.backgroundColor, gradient: '', bgImage: config.heroBgImage, bgImageSize: 'cover', bgImagePosition: 'center top', bgOverlayColor: config.backgroundColor, bgOverlayOpacity: 0.88, isParallax: false, bgVideoUrl: '' },
        rows: [{
          id: `row_${pfx}_thankyou_hero`,
          columnCount: 1,
          gap: '24px',
          alignItems: 'center',
          columns: [{
            id: `col_${pfx}_thankyou_hero`,
            widthFraction: 1,
            verticalAlign: 'center',
            padding: '20px 40px',
            margin: '0px',
            elements: [
              {
                id: `el_${pfx}_ty_badge`,
                type: 'callout_box',
                name: 'Confirmation Badge',
                props: { title: '✓ APPLICATION RECEIVED' },
                style: createDefaultStyle({
                  typography: { fontFamily: config.bodyFont, fontSize: '12px', fontWeight: '800', textAlign: 'center', color: config.primaryColor, letterSpacing: '2px' },
                  boxModel: { marginBottom: '20px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '20px', paddingRight: '20px', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' },
                  borders: { borderStyle: 'solid', borderColor: config.primaryColor, borderWidth: '1px', borderRadiusTopLeft: '9999px', borderRadiusTopRight: '9999px', borderRadiusBottomRight: '9999px', borderRadiusBottomLeft: '9999px' },
                  background: { bgType: 'color', backgroundColor: 'rgba(15, 23, 42, 0.6)' }
                })
              },
              {
                id: `el_${pfx}_ty_h1`,
                type: 'headline',
                name: 'Thank You Headline',
                props: { text: 'Talk Soon!' },
                style: createDefaultStyle({
                  typography: { fontFamily: config.headingFont, fontSize: '56px', fontWeight: '800', textAlign: 'center', color: '#ffffff', lineHeight: '1.15', letterSpacing: '-0.5px' },
                  boxModel: { marginBottom: '16px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '800px' }
                })
              },
              {
                id: `el_${pfx}_ty_sub`,
                type: 'subheadline',
                name: 'Thank You Subheadline',
                props: { text: 'We have received your application and will be in touch within 24 hours to schedule your strategy call.' },
                style: createDefaultStyle({
                  typography: { fontFamily: config.bodyFont, fontSize: '18px', fontWeight: '400', textAlign: 'center', color: '#cbd5e1', lineHeight: '1.6' },
                  boxModel: { marginBottom: '32px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '680px' }
                })
              },
              {
                id: `el_${pfx}_ty_list`,
                type: 'icon_list',
                name: 'Next Steps List',
                props: { items: ['📧 Check your email inbox for a confirmation message', '📅 We will reach out within 24 hours to confirm your slot', '📱 Make sure to save our contact number so you don\'t miss our call'] },
                style: createDefaultStyle({
                  typography: { fontFamily: config.bodyFont, fontSize: '16px', fontWeight: '600', textAlign: 'center', color: '#ffffff', lineHeight: '1.8' },
                  boxModel: { marginBottom: '0px', marginTop: '0px', marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '540px' }
                })
              }
            ]
          }]
        }]
      }
    ]
  };
};

const pinkConfig: AppFunnelThemeConfig = {
  idPrefix: 'pink',
  nicheTitle: 'Womanpreneur',
  nicheUpper: 'WOMANPRENEUR',
  primaryColor: '#ec4899',
  secondaryColor: '#db2777',
  accentColor: '#14b8a6',
  backgroundColor: '#0f172a',
  textColor: '#f8fafc',
  headingFont: 'Playfair Display',
  bodyFont: 'Lato',
  heroBgImage: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=1600&auto=format&fit=crop&q=80',
  heroImage: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=900&auto=format&fit=crop&q=80',
  headlineText: 'The Womanpreneur Application Funnel You\'ve Been Waiting For.',
  subheadlineText: 'Discover how female entrepreneurs & executive coaches generate qualified leads and close high-ticket clients on autopilot.'
};

const yellowConfig: AppFunnelThemeConfig = {
  idPrefix: 'yellow',
  nicheTitle: 'High-Ticket Program',
  nicheUpper: 'HIGH-TICKET',
  primaryColor: '#f59e0b',
  secondaryColor: '#d97706',
  accentColor: '#0284c7',
  backgroundColor: '#020617',
  textColor: '#f8fafc',
  headingFont: 'Montserrat',
  bodyFont: 'Open Sans',
  heroBgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=80',
  heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=80',
  headlineText: 'The High-Ticket Application Funnel You\'ve Been Waiting For.',
  subheadlineText: 'Scale your high-ticket consulting & advisory programs to $100k+/month with automated qualification.'
};

const orangeConfig: AppFunnelThemeConfig = {
  idPrefix: 'orange',
  nicheTitle: 'Marketing / FB Ads Agency',
  nicheUpper: 'AGENCY',
  primaryColor: '#f97316',
  secondaryColor: '#ea580c',
  accentColor: '#06b6d4',
  backgroundColor: '#0f172a',
  textColor: '#f8fafc',
  headingFont: 'Montserrat',
  bodyFont: 'Inter',
  heroBgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80',
  heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
  headlineText: 'The FB Ad Agency Application Funnel You\'ve Been Waiting For.',
  subheadlineText: 'Attract high-budget retainer clients and scale your media buying agency with a battle-tested funnel.'
};

const redConfig: AppFunnelThemeConfig = {
  idPrefix: 'red',
  nicheTitle: 'Network Marketer',
  nicheUpper: 'NETWORK MARKETER',
  primaryColor: '#ef4444',
  secondaryColor: '#dc2626',
  accentColor: '#1e293b',
  backgroundColor: '#090d16',
  textColor: '#f8fafc',
  headingFont: 'Montserrat',
  bodyFont: 'Inter',
  heroBgImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1600&auto=format&fit=crop&q=80',
  heroImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=80',
  headlineText: 'The Network Marketer Application Funnel You\'ve Been Waiting For.',
  subheadlineText: 'Recruit top-tier team leaders and duplicate your downline growth using automated reverse-squeeze funnels.'
};

const greenConfig: AppFunnelThemeConfig = {
  idPrefix: 'green',
  nicheTitle: 'Life & Health Coach',
  nicheUpper: 'LIFE / HEALTH COACH',
  primaryColor: '#10b981',
  secondaryColor: '#059669',
  accentColor: '#06b6d4',
  backgroundColor: '#064e3b',
  textColor: '#f8fafc',
  headingFont: 'Lora',
  bodyFont: 'Nunito',
  heroBgImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&auto=format&fit=crop&q=80',
  heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&auto=format&fit=crop&q=80',
  headlineText: 'The Life & Health Coach Application Funnel You\'ve Been Waiting For.',
  subheadlineText: 'Transform more lives and enrol committed coaching clients with a high-converting wellness application funnel.'
};

export const createAppFunnelOptInPink = () => buildAppFunnelState(pinkConfig, 'OptIn');
export const createAppFunnelApplicationPink = () => buildAppFunnelState(pinkConfig, 'Application');
export const createAppFunnelThankYouPink = () => buildAppFunnelState(pinkConfig, 'ThankYou');

export const createAppFunnelOptInYellow = () => buildAppFunnelState(yellowConfig, 'OptIn');
export const createAppFunnelApplicationYellow = () => buildAppFunnelState(yellowConfig, 'Application');
export const createAppFunnelThankYouYellow = () => buildAppFunnelState(yellowConfig, 'ThankYou');

export const createAppFunnelOptInOrange = () => buildAppFunnelState(orangeConfig, 'OptIn');
export const createAppFunnelApplicationOrange = () => buildAppFunnelState(orangeConfig, 'Application');
export const createAppFunnelThankYouOrange = () => buildAppFunnelState(orangeConfig, 'ThankYou');

export const createAppFunnelOptInRed = () => buildAppFunnelState(redConfig, 'OptIn');
export const createAppFunnelApplicationRed = () => buildAppFunnelState(redConfig, 'Application');
export const createAppFunnelThankYouRed = () => buildAppFunnelState(redConfig, 'ThankYou');

export const createAppFunnelOptInGreen = () => buildAppFunnelState(greenConfig, 'OptIn');
export const createAppFunnelApplicationGreen = () => buildAppFunnelState(greenConfig, 'Application');
export const createAppFunnelThankYouGreen = () => buildAppFunnelState(greenConfig, 'ThankYou');

// ─── END APPLICATION FUNNEL CANVAS BUILDERS ──────────────────────────────────

// System Archetype Templates









export const initialSystemTemplates: FunnelData[] = [
  // CATEGORY 1: PRESELL PAGES
  {
    id: 'tpl_presale',
    name: 'Presale Page Funnel',
    slug: 'presale-funnel',
    type: 'Presell',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Presale Warm-Up Page', slug: 'presale', stepOrder: 1, stepType: 'Presell', status: 'Published', canvasState: createSqueezeCanvas() },
      { id: 's2', name: 'Sales Order Page', slug: 'order', stepOrder: 2, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas() }
    ]
  },
  {
    id: 'tpl_article',
    name: 'Article / Magazine Page Funnel',
    slug: 'article-page-funnel',
    type: 'Presell',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Editorial Article Page', slug: 'article', stepOrder: 1, stepType: 'Article', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'Lead Optin Page', slug: 'optin', stepOrder: 2, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() }
    ]
  },
  {
    id: 'tpl_survey',
    name: 'Survey Qualification Funnel',
    slug: 'survey-qualification-funnel',
    type: 'Presell',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Interactive Survey Quiz', slug: 'quiz', stepOrder: 1, stepType: 'Survey', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'Outcome & Offer Page', slug: 'offer', stepOrder: 2, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas() }
    ]
  },
  {
    id: 'tpl_clickpop',
    name: 'ClickPop Lightbox Optin Funnel',
    slug: 'clickpop-funnel',
    type: 'Presell',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'ClickPop Pitch Hero', slug: 'clickpop', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() },
      { id: 's2', name: 'Thank You Page', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },

  // CATEGORY 2: OPTIN PAGES
  {
    id: 'tpl_squeeze',
    name: 'Squeeze Page Lead Funnel',
    slug: 'squeeze-page-funnel',
    type: 'Optin',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Curiosity Squeeze Page', slug: 'squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() },
      { id: 's2', name: 'Thank You Confirmation', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_reverse_squeeze',
    name: 'Reverse Squeeze Training Funnel',
    slug: 'reverse-squeeze-funnel',
    type: 'Optin',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Value Video Squeeze', slug: 'video-squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createReverseSqueezeCanvas() },
      { id: 's2', name: 'Thank You Page', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_lead_magnet',
    name: '3D Lead Magnet Bribe Funnel',
    slug: 'lead-magnet-funnel',
    type: 'Optin',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'eBook Bribe Optin', slug: 'ebook-optin', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createLeadMagnetCanvas() },
      { id: 's2', name: 'Download Thank You Page', slug: 'download', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_coupon',
    name: 'Scarcity Coupon Discount Funnel',
    slug: 'coupon-funnel',
    type: 'Optin',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Discount Voucher Page', slug: 'coupon', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() },
      { id: 's2', name: 'Coupon Claim Confirmation', slug: 'claim', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },

  // CATEGORY 3: THANK YOU PAGES
  {
    id: 'tpl_thank_you',
    name: 'Thank You Confirmation Funnel',
    slug: 'thank-you-funnel',
    type: 'Thank You',
    hasAutomationTemplate: false,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Order & Lead Confirmation', slug: 'thank-you', stepOrder: 1, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_offer_wall',
    name: 'Multi-Product Offer Wall Funnel',
    slug: 'offer-wall-funnel',
    type: 'Thank You',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Backend Catalog Offer Wall', slug: 'offer-wall', stepOrder: 1, stepType: 'OfferWall', status: 'Published', canvasState: createOfferWallCanvas() }
    ]
  },
  {
    id: 'tpl_bridge',
    name: 'Affiliate Pre-Frame Bridge Funnel',
    slug: 'bridge-funnel',
    type: 'Thank You',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Optin Page', slug: 'squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() },
      { id: 's2', name: 'Bridge Pre-Frame Story', slug: 'bridge', stepOrder: 2, stepType: 'Bridge', status: 'Published', canvasState: createBridgeCanvas() }
    ]
  },
  {
    id: 'tpl_share',
    name: 'Viral Loop Social Share Funnel',
    slug: 'share-funnel',
    type: 'Thank You',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Optin Page', slug: 'optin', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() },
      { id: 's2', name: 'Share Incentives Page', slug: 'share', stepOrder: 2, stepType: 'Share', status: 'Published', canvasState: createShareCanvas() }
    ]
  },

  // CATEGORY 4: SALES PAGES
  {
    id: 'tpl_vsl_sales',
    name: 'Video Sales Letter (VSL) Funnel',
    slug: 'vsl-sales-funnel',
    type: 'Sales',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'VSL Pitch Page', slug: 'vsl', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createVSLOrderCanvas() },
      { id: 's2', name: 'OTO 1-Click Upsell', slug: 'upsell', stepOrder: 2, stepType: 'Upsell', status: 'Published', canvasState: createOTOCanvas() },
      { id: 's3', name: 'Offer Wall Receipt', slug: 'receipt', stepOrder: 3, stepType: 'OfferWall', status: 'Published', canvasState: createOfferWallCanvas() }
    ]
  },
  {
    id: 'tpl_sales_letter',
    name: 'Classic Long-Form Sales Letter Funnel',
    slug: 'sales-letter-funnel',
    type: 'Sales',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Long-Form Sales Letter', slug: 'sales-letter', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'OTO Upsell Page', slug: 'upsell', stepOrder: 2, stepType: 'Upsell', status: 'Published', canvasState: createOTOCanvas() },
      { id: 's3', name: 'Thank You Receipt', slug: 'thank-you', stepOrder: 3, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_product_launch',
    name: 'Jeff Walker Product Launch Funnel',
    slug: 'product-launch-funnel',
    type: 'Sales',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Launch Video #1', slug: 'pl-1', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'Launch Video #2', slug: 'pl-2', stepOrder: 2, stepType: 'Sales', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's3', name: 'Launch Video #3', slug: 'pl-3', stepOrder: 3, stepType: 'Sales', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's4', name: 'Open Cart Sales Page', slug: 'cart-open', stepOrder: 4, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas() }
    ]
  },

  // CATEGORY 5: ORDER FORMS
  {
    id: 'tpl_two_step_order',
    name: '2-Step Tripwire Order Funnel',
    slug: '2-step-order-funnel',
    type: 'Order Forms',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: '2-Step Checkout Page', slug: 'checkout', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas() },
      { id: 's2', name: 'OTO 1-Click Upsell', slug: 'upsell', stepOrder: 2, stepType: 'Upsell', status: 'Published', canvasState: createOTOCanvas() },
      { id: 's3', name: 'Downsell Discount', slug: 'downsell', stepOrder: 3, stepType: 'Downsell', status: 'Published', canvasState: createDownsellCanvas() },
      { id: 's4', name: 'Order Wall Confirmation', slug: 'receipt', stepOrder: 4, stepType: 'OfferWall', status: 'Published', canvasState: createOfferWallCanvas() }
    ]
  },
  {
    id: 'tpl_traditional_order',
    name: 'Traditional Single-Page Order Funnel',
    slug: 'traditional-order-funnel',
    type: 'Order Forms',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Single Page Checkout', slug: 'order-form', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas() },
      { id: 's2', name: 'Thank You Receipt', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_vsl_order',
    name: 'VSL + Integrated Checkout Funnel',
    slug: 'vsl-order-funnel',
    type: 'Order Forms',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'VSL Direct Checkout', slug: 'vsl-checkout', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createVSLOrderCanvas() },
      { id: 's2', name: 'OTO Upsell Page', slug: 'upsell', stepOrder: 2, stepType: 'Upsell', status: 'Published', canvasState: createOTOCanvas() },
      { id: 's3', name: 'Confirmation Page', slug: 'thank-you', stepOrder: 3, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_sales_letter_order',
    name: 'Sales Letter + Checkout Funnel',
    slug: 'sales-letter-order-funnel',
    type: 'Order Forms',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Sales Letter + Order Module', slug: 'letter-order', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'OTO Upsell Page', slug: 'upsell', stepOrder: 2, stepType: 'Upsell', status: 'Published', canvasState: createOTOCanvas() }
    ]
  },
  {
    id: 'tpl_launch_order',
    name: 'Product Launch Order Form Funnel',
    slug: 'launch-order-funnel',
    type: 'Order Forms',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Launch Order Page', slug: 'launch-checkout', stepOrder: 1, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas() },
      { id: 's2', name: 'Thank You Confirmation', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },

  // CATEGORY 6: OTO (ONE-TIME OFFER) PAGES
  {
    id: 'tpl_oto',
    name: '1-Click OTO / Upsell Funnel',
    slug: 'oto-upsell-funnel',
    type: 'OTO',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'OTO 1-Click Upsell', slug: 'upsell', stepOrder: 1, stepType: 'Upsell', status: 'Published', canvasState: createOTOCanvas() },
      { id: 's2', name: 'Offer Wall Receipt', slug: 'receipt', stepOrder: 2, stepType: 'OfferWall', status: 'Published', canvasState: createOfferWallCanvas() }
    ]
  },
  {
    id: 'tpl_downsell',
    name: 'Downsell Discount Offer Funnel',
    slug: 'downsell-funnel',
    type: 'OTO',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Downsell Discount Offer', slug: 'downsell', stepOrder: 1, stepType: 'Downsell', status: 'Published', canvasState: createDownsellCanvas() },
      { id: 's2', name: 'Thank You Page', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },

  // CATEGORY 7: WEBINAR PAGES
  {
    id: 'tpl_webinar_reg',
    name: 'Live Webinar Registration Funnel',
    slug: 'webinar-registration-funnel',
    type: 'Webinar',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Webinar Optin Registration', slug: 'registration', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createWebinarRegistrationCanvas() },
      { id: 's2', name: 'Webinar Confirmation & Calendar', slug: 'confirmation', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createWebinarConfirmationCanvas() }
    ]
  },
  {
    id: 'tpl_webinar_broadcast',
    name: 'Webinar Live Broadcast Room',
    slug: 'webinar-broadcast-funnel',
    type: 'Webinar',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Webinar Broadcast Theater', slug: 'broadcast-room', stepOrder: 1, stepType: 'WebinarRoom', status: 'Published', canvasState: createWebinarBroadcastCanvas() }
    ]
  },
  {
    id: 'tpl_webinar_replay',
    name: 'Webinar Replay Room Funnel',
    slug: 'webinar-replay-funnel',
    type: 'Webinar',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Replay Portal with Expiration Timer', slug: 'replay-room', stepOrder: 1, stepType: 'Replay', status: 'Published', canvasState: createWebinarReplayCanvas() }
    ]
  },

  // CATEGORY 8: MEMBERSHIP PAGES
  {
    id: 'tpl_membership_access',
    name: 'Membership Access Portal Funnel',
    slug: 'membership-access-funnel',
    type: 'Membership',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Student Login & Register Gate', slug: 'login', stepOrder: 1, stepType: 'MemberLogin', status: 'Published', canvasState: createMemberAccessCanvas() }
    ]
  },
  {
    id: 'tpl_membership_area',
    name: 'Membership Student Member Area',
    slug: 'membership-area-funnel',
    type: 'Membership',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'LMS Curriculum Dashboard', slug: 'member-dashboard', stepOrder: 1, stepType: 'MemberArea', status: 'Published', canvasState: createMembersAreaCanvas() }
    ]
  },

  // CATEGORY 9: AFFILIATE PAGES
  {
    id: 'tpl_affiliate_access',
    name: 'Affiliate Partner Access Portal',
    slug: 'affiliate-access-funnel',
    type: 'Affiliate',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Affiliate Sign Up & Login', slug: 'partner-login', stepOrder: 1, stepType: 'MemberLogin', status: 'Published', canvasState: createMemberAccessCanvas() }
    ]
  },
  {
    id: 'tpl_affiliate_dashboard',
    name: 'Affiliate Area Resource Dashboard',
    slug: 'affiliate-dashboard-funnel',
    type: 'Affiliate',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Partner Links & Swipes Hub', slug: 'partner-hub', stepOrder: 1, stepType: 'MemberArea', status: 'Published', canvasState: createMembersAreaCanvas() }
    ]
  },

  // CATEGORY 10: EXTENDED & SPECIALIZED PAGES
  {
    id: 'tpl_application',
    name: 'High-Ticket Application Funnel',
    slug: 'application-funnel',
    type: 'Specialized',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Reverse Squeeze Video', slug: 'training', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createReverseSqueezeCanvas() },
      { id: 's2', name: 'Qualifying Application Page', slug: 'application', stepOrder: 2, stepType: 'Application', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's3', name: 'Thank You Booking Page', slug: 'thank-you', stepOrder: 3, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_storefront',
    name: 'E-Commerce Storefront Funnel',
    slug: 'storefront-funnel',
    type: 'Specialized',
    hasAutomationTemplate: false,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Multi-Product Storefront', slug: 'store', stepOrder: 1, stepType: 'Storefront', status: 'Published', canvasState: createDemoSalesCanvas() }
    ]
  },
  {
    id: 'tpl_homepage',
    name: 'Hybrid Brand Homepage Funnel',
    slug: 'homepage-funnel',
    type: 'Specialized',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Brand Homepage', slug: 'home', stepOrder: 1, stepType: 'Home', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'Optin Thank You Page', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_live_demo',
    name: 'Weekly Live Demo Show Funnel',
    slug: 'live-demo-funnel',
    type: 'Specialized',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Live Stream & Purchase Page', slug: 'demo-show', stepOrder: 1, stepType: 'Demo', status: 'Published', canvasState: createDemoSalesCanvas() }
    ]
  },
  {
    id: 'tpl_ask',
    name: 'Ask Campaign Research Funnel',
    slug: 'ask-campaign-funnel',
    type: 'Specialized',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Single Question Ask Page', slug: 'ask', stepOrder: 1, stepType: 'Ask', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'Thank You Page', slug: 'thank-you', stepOrder: 2, stepType: 'ThankYou', status: 'Published', canvasState: createThankYouCanvas() }
    ]
  },
  {
    id: 'tpl_hero',
    name: 'Personal Brand Hero Funnel',
    slug: 'hero-funnel',
    type: 'Specialized',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Influencer Hero Bio Page', slug: 'hero', stepOrder: 1, stepType: 'Hero', status: 'Published', canvasState: createDemoSalesCanvas() }
    ]
  },
  {
    id: 'tpl_indoctrination',
    name: 'Belief-Shifting Indoctrination Funnel',
    slug: 'indoctrination-funnel',
    type: 'Specialized',
    hasAutomationTemplate: true,
    createdAt: '2026-08-17T10:00:00Z',
    steps: [
      { id: 's1', name: 'Indoctrination Value Video', slug: 'indoctrination', stepOrder: 1, stepType: 'Indoctrination', status: 'Published', canvasState: createDemoSalesCanvas() },
      { id: 's2', name: 'Next Step Action Page', slug: 'action', stepOrder: 2, stepType: 'Sales', status: 'Published', canvasState: createTwoStepOrderCanvas() }
    ]
  }
];


// Initial Course Data for Domain C
export const initialCourseData: CourseData = {
  id: 'course_1',
  title: 'LaunchEngine Academy: 7-Figure Funnel Masterclass',
  description: 'Master high-converting page architecture, 1-click upsells, automated email sequences, and student portals.',
  thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  modules: [
    {
      id: 'mod_1',
      title: 'Module 1: High-Converting Funnel Architecture & Copywriting',
      order: 1,
      lessons: [
        {
          id: 'les_101',
          title: 'Lesson 1.1: The 2-Step Opt-in & VSL Framework',
          order: 1,
          dripDays: 0, // Unlocked instantly
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          duration: '14 mins',
          isCompleted: true
        },
        {
          id: 'les_102',
          title: 'Lesson 1.2: Crafting Irresistible Order Bumps & 1-Click Upsells',
          order: 2,
          dripDays: 0,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          duration: '22 mins',
          isCompleted: false
        }
      ]
    },
    {
      id: 'mod_2',
      title: 'Module 2: Advanced Automation, CRM Pipelines & Split Testing',
      order: 2,
      lessons: [
        {
          id: 'les_201',
          title: 'Lesson 2.1: Designing Node-Based Email Workflows',
          order: 1,
          dripDays: 3, // Unlocks 3 days post-enrollment
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          duration: '18 mins',
          isCompleted: false
        },
        {
          id: 'les_202',
          title: 'Lesson 2.2: A/B Split Testing Traffic Routing',
          order: 2,
          dripDays: 7, // Unlocks 7 days post-enrollment
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          duration: '29 mins',
          isCompleted: false
        }
      ]
    }
  ]
};

// Initial Contacts for CRM
export const initialContacts: ContactData[] = [
  { id: 'cnt_1', name: 'Sarah Jenkins', email: 'sarah@growthlabs.io', phone: '+1 555-0192', score: 140, tags: ['VIP Customer', 'OptIn', 'VSL Buyer'], lastActive: '10 mins ago', createdDate: '2026-08-01' },
  { id: 'cnt_2', name: 'Marcus Vance', email: 'marcus@vancemedia.com', phone: '+1 555-0341', score: 85, tags: ['Webinar Attendee', 'Lead'], lastActive: '2 hours ago', createdDate: '2026-08-04' },
  { id: 'cnt_3', name: 'Elena Rostova', email: 'elena@cyberdesign.co', phone: '+44 7700-900', score: 210, tags: ['High-Ticket Applicant', '1-Click Upsell'], lastActive: 'Just now', createdDate: '2026-08-07' },
  { id: 'cnt_4', name: 'David Chen', email: 'd.chen@apexcapital.org', phone: '+1 555-0822', score: 45, tags: ['Abandon Checkout'], lastActive: '1 day ago', createdDate: '2026-08-10' }
];

// Initial Deals for CRM Kanban
export const initialDeals: DealData[] = [
  { id: 'deal_1', contactName: 'David Chen', contactEmail: 'd.chen@apexcapital.org', title: 'Enterprise Funnel Build License', value: 2997, stage: 'Lead', score: 45, createdDate: '2026-08-10' },
  { id: 'deal_2', contactName: 'Marcus Vance', contactEmail: 'marcus@vancemedia.com', title: 'Annual SaaS Pro Plan', value: 1497, stage: 'Qualified', score: 85, createdDate: '2026-08-04' },
  { id: 'deal_3', contactName: 'Sarah Jenkins', contactEmail: 'sarah@growthlabs.io', title: 'Agency Agency Scale Package', value: 4997, stage: 'Proposal', score: 140, createdDate: '2026-08-01' },
  { id: 'deal_4', contactName: 'Elena Rostova', contactEmail: 'elena@cyberdesign.co', title: 'High-Ticket VIP Consulting', value: 9997, stage: 'Won', score: 210, createdDate: '2026-08-07' }
];

// Initial Workflow Nodes for Automation Engine
export const initialWorkflowNodes: WorkflowNodeData[] = [
  { id: 'wf_1', type: 'trigger', label: 'Form Submitted', subtitle: 'Step 1 Checkout OptIn', config: { formId: 'el_checkout_card' }, x: 100, y: 150 },
  { id: 'wf_2', type: 'action', label: 'Add Contact Tag', subtitle: 'Tag: VSL Buyer', config: { tag: 'VSL Buyer' }, x: 380, y: 150 },
  { id: 'wf_3', type: 'delay', label: 'Wait Delay', subtitle: '15 Minutes', config: { duration: '15 mins' }, x: 640, y: 150 },
  { id: 'wf_4', type: 'condition', label: 'Check 1-Click Upsell', subtitle: 'Did purchase Upsell #1?', config: { condition: 'purchased_upsell_1' }, x: 900, y: 150 },
  { id: 'wf_5', type: 'action', label: 'Send Onboarding Email', subtitle: 'Email: Welcome to Academy', config: { templateId: 'welcome_email' }, x: 1180, y: 80 },
  { id: 'wf_6', type: 'action', label: 'Trigger Abandon Sequence', subtitle: 'Email: Special Downsell Offer', config: { templateId: 'downsell_reminder' }, x: 1180, y: 220 }
];

export const initialWorkflowEdges: WorkflowEdgeData[] = [
  { id: 'e1', source: 'wf_1', target: 'wf_2' },
  { id: 'e2', source: 'wf_2', target: 'wf_3' },
  { id: 'e3', source: 'wf_3', target: 'wf_4' },
  { id: 'e4', source: 'wf_4', target: 'wf_5', label: 'Yes' },
  { id: 'e5', source: 'wf_4', target: 'wf_6', label: 'No' }
];
