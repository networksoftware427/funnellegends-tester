import { FunnelData, FunnelStepData, CanvasState, StepType, ElementNode } from '../types/builder';
import { createDefaultStyle } from './initialTemplates';

const generateId = () => Math.random().toString(36).substring(2, 9);

const createHeader = (siteTitle: string, themeColor: string, fontFamily: string) => ({
  id: `sec-hdr-${generateId()}`,
  name: 'Header Area',
  isFullWidth: true,
  displayMode: 'block',
  background: { bgType: 'solid', backgroundColor: '#0f172a' } as any,
  paddingTop: '20px',
  paddingBottom: '20px',
  style: createDefaultStyle({
    background: { bgType: 'solid', backgroundColor: '#0f172a' },
    boxModel: { paddingTop: '20px', paddingBottom: '20px', marginBottom: '0px' },
    borders: { borderStyle: 'solid', borderColor: '#1e293b', borderWidth: '0 0 1px 0' }
  }),
  rows: [{
    id: `row-hdr-${generateId()}`,
    name: 'Nav Row',
    columnCount: 2,
    gap: '20px',
    alignItems: 'center',
    background: createDefaultStyle().background,
    columns: [
      {
        id: `col-logo-${generateId()}`, widthFraction: 0.3, verticalAlign: 'center', padding: '0px', margin: '0px',
        elements: [
          { id: `el-${generateId()}`, type: 'headline', name: 'Brand Logo', props: { text: siteTitle, headlineLevel: 'h3' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '24px', fontWeight: '900', color: themeColor } }) }
        ]
      },
      {
        id: `col-nav-${generateId()}`, widthFraction: 0.7, verticalAlign: 'center', padding: '0px', margin: '0px',
        elements: [
          { id: `el-${generateId()}`, type: 'menu_navigation', name: 'Main Navigation', props: { items: 'Home, About, Services, Features, Blog, Contact' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '14px', fontWeight: '600', color: '#cbd5e1', textAlign: 'right' } }) }
        ]
      }
    ]
  }]
});

const createFooter = (siteTitle: string, themeColor: string, fontFamily: string) => ({
  id: `sec-ftr-${generateId()}`,
  name: 'Footer Area',
  isFullWidth: true,
  displayMode: 'block',
  background: { bgType: 'solid', backgroundColor: '#020617' } as any,
  paddingTop: '60px',
  paddingBottom: '40px',
  style: createDefaultStyle({
    background: { bgType: 'solid', backgroundColor: '#020617' },
    boxModel: { paddingTop: '60px', paddingBottom: '40px', marginBottom: '0px' },
    borders: { borderStyle: 'solid', borderColor: '#1e293b', borderWidth: '1px 0 0 0' }
  }),
  rows: [
    {
      id: `row-ftr-${generateId()}`, name: 'Footer Main', columnCount: 3, gap: '40px', alignItems: 'top', background: createDefaultStyle().background,
      columns: [
        {
          id: `col-f1-${generateId()}`, widthFraction: 0.4, verticalAlign: 'top', padding: '0px', margin: '0px',
          elements: [
            { id: `el-${generateId()}`, type: 'headline', name: 'Brand', props: { text: siteTitle, headlineLevel: 'h4' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '20px', fontWeight: '800', color: themeColor } }) },
            { id: `el-${generateId()}`, type: 'paragraph', name: 'Desc', props: { text: 'Premium industry solutions tailored for excellence and enterprise growth.' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '14px', color: '#94a3b8' }, boxModel: { marginTop: '16px', marginBottom: '24px' } }) },
            { id: `el-${generateId()}`, type: 'social_share', name: 'Social', props: { align: 'left' }, style: createDefaultStyle() }
          ]
        },
        {
          id: `col-f2-${generateId()}`, widthFraction: 0.3, verticalAlign: 'top', padding: '0px', margin: '0px',
          elements: [
            { id: `el-${generateId()}`, type: 'headline', name: 'Company', props: { text: 'Company', headlineLevel: 'h5' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '16px', fontWeight: '700', color: '#ffffff' } }) },
            { id: `el-${generateId()}`, type: 'paragraph', name: 'Links', props: { text: 'About Us\nCareers\nNewsroom\nContact' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '14px', color: '#94a3b8', lineHeight: '2' }, boxModel: { marginTop: '16px' } }) }
          ]
        },
        {
          id: `col-f3-${generateId()}`, widthFraction: 0.3, verticalAlign: 'top', padding: '0px', margin: '0px',
          elements: [
            { id: `el-${generateId()}`, type: 'headline', name: 'Legal', props: { text: 'Legal', headlineLevel: 'h5' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '16px', fontWeight: '700', color: '#ffffff' } }) },
            { id: `el-${generateId()}`, type: 'paragraph', name: 'Links', props: { text: 'Privacy Policy\nTerms of Service\nCookie Policy' }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '14px', color: '#94a3b8', lineHeight: '2' }, boxModel: { marginTop: '16px' } }) }
          ]
        }
      ]
    },
    {
      id: `row-cpy-${generateId()}`, name: 'Copyright', columnCount: 1, gap: '0px', alignItems: 'center', background: createDefaultStyle().background,
      columns: [
        {
          id: `col-cpy-${generateId()}`, widthFraction: 1, verticalAlign: 'center', padding: '0px', margin: '0px',
          elements: [
            { id: `el-${generateId()}`, type: 'paragraph', name: 'Copy', props: { text: `© ${new Date().getFullYear()} ${siteTitle}. All Rights Reserved.` }, style: createDefaultStyle({ typography: { fontFamily, fontSize: '12px', color: '#64748b', textAlign: 'center' }, boxModel: { marginTop: '40px', paddingTop: '20px' }, borders: { borderStyle: 'solid', borderColor: '#0f172a', borderWidth: '1px 0 0 0' } }) }
          ]
        }
      ]
    }
  ]
});

// Helper to generate a generic section
const createSection = (name: string, bg: string, elementsConfig: {col: number, els: any[]}[]) => {
  return {
    id: `sec-${generateId()}`,
    name,
    isFullWidth: true,
    displayMode: 'block',
    background: { bgType: 'solid', backgroundColor: bg } as any,
    paddingTop: '60px',
    paddingBottom: '60px',
    style: createDefaultStyle({
      background: { bgType: 'solid', backgroundColor: bg },
      boxModel: { paddingTop: '60px', paddingBottom: '60px', marginBottom: '0px' }
    }),
    rows: elementsConfig.map(r => ({
      id: `row-${generateId()}`,
      name: 'Content Row',
      columnCount: r.col,
      gap: '30px',
      alignItems: 'center',
      background: createDefaultStyle().background,
      columns: Array.from({length: r.col}).map((_, i) => ({
        id: `col-${generateId()}`,
        widthFraction: 1/r.col,
        verticalAlign: 'center',
        padding: '0px',
        margin: '0px',
        elements: r.els[i] || []
      }))
    }))
  };
};

const buildPage = (siteTitle: string, themeColor: string, fontFamily: string, pageName: string, sections: any[]): CanvasState => {
  return {
    globalTokens: {
      primaryColor: themeColor,
      secondaryColor: '#1e293b',
      accentColor: '#38bdf8',
      backgroundColor: '#020617',
      textColor: '#f8fafc',
      headingFont: fontFamily,
      bodyFont: fontFamily,
      borderRadiusPreset: '8px'
    },
    sections: [
      createHeader(siteTitle, themeColor, fontFamily),
      ...sections,
      createFooter(siteTitle, themeColor, fontFamily)
    ]
  };
};

// Website Definition Generator
const createWebsite = (id: string, name: string, category: string, desc: string, themeColor: string, font: string, thumb: string, pageData: any[]) => {
  return {
    id: `web-tpl-${id}`,
    name,
    category,
    description: desc,
    themeColor,
    fontFamily: font,
    thumbnailUrl: thumb,
    funnelData: {
      id: `site-${id}`,
      name: `${name} Website`,
      slug: id,
      type: 'Lead' as const,
      createdAt: new Date().toISOString(),
      steps: pageData.map((p, i) => ({
        id: `step-${id}-${i}`,
        name: p.title,
        slug: p.slug,
        stepOrder: i + 1,
        stepType: p.type || 'OptIn',
        status: 'Published' as const,
        canvasState: buildPage(name, themeColor, font, p.title, p.sections)
      }))
    }
  };
};

export interface WebsiteTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  themeColor: string;
  fontFamily: string;
  thumbnailUrl: string;
  funnelData: FunnelData;
}

// -------------------------------------------------------------
// WEBSITES DATA
// -------------------------------------------------------------
export const WEBSITE_TEMPLATES: WebsiteTemplate[] = [

  // 1. SAASIFY PRO (Tech)
  createWebsite('saasify', 'SaaSify Pro', 'Technology & SaaS', 'Modern 6-page software website with custom product feature pages, developer docs, case studies, and demo booking.', '#6366f1', 'Inter', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80', [
    { title: 'Home', slug: 'home', type: 'OptIn', sections: [
      createSection('Hero', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'hero_banner_widget', name: 'Hero', props: { headline: 'Build & Scale Software Products Faster', subheadline: 'The all-in-one developer & automation platform designed for modern engineering teams.', primaryButtonText: 'Start Free Trial', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80' }, style: createDefaultStyle() }
        ]]}
      ]),
      createSection('Features', '#0f172a', [
        { col: 3, els: [
          [{ id: generateId(), type: 'callout_box', name: 'F1', props: { title: 'Global Edge Caching', text: 'Deploy across 300+ edge nodes instantly for zero latency.' }, style: createDefaultStyle() }],
          [{ id: generateId(), type: 'callout_box', name: 'F2', props: { title: 'Automated CI/CD', text: 'Seamless integrations with GitHub, GitLab, and Bitbucket.' }, style: createDefaultStyle() }],
          [{ id: generateId(), type: 'callout_box', name: 'F3', props: { title: 'Zero Downtime', text: 'Blue-green deployments managed entirely by the platform.' }, style: createDefaultStyle() }]
        ]}
      ]),
      createSection('Social Proof', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'logo_cloud_widget', name: 'Logos', props: { title: 'Trusted by engineering teams at' }, style: createDefaultStyle() },
          { id: generateId(), type: 'testimonial_card_widget', name: 'Testimonial', props: { quote: 'SaaSify reduced our deployment times from 45 minutes to 3 seconds.', author: 'Sarah Jenkins', role: 'CTO, TechFlow' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'About Us', slug: 'about', type: 'Sales', sections: [
      createSection('About Hero', '#0f172a', [
        { col: 2, els: [
          [
            { id: generateId(), type: 'headline', name: 'H', props: { text: 'Our Mission to Simplify Cloud Architecture', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
            { id: generateId(), type: 'paragraph', name: 'P', props: { text: 'Founded by former infra engineers, we experienced the pain of configuring Kubernetes clusters manually. SaaSify was built to abstract the complexity.' }, style: createDefaultStyle({ typography: { color: '#cbd5e1', fontSize: '16px' }, boxModel: { marginTop: '16px' } }) }
          ],
          [
            { id: generateId(), type: 'image', name: 'I', props: { imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', imageAlt: 'Team' }, style: createDefaultStyle() }
          ]
        ]}
      ]),
      createSection('Team', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'team_grid_widget', name: 'Team Grid', props: { title: 'Meet the Founders', columns: 3 }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Services', slug: 'services', type: 'Sales', sections: [
      createSection('Services Grid', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Core Platform Services', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900', textAlign: 'center' } }) },
          { id: generateId(), type: 'feature_comparison_widget', name: 'Features', props: { title: 'Enterprise vs Standard Features' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Pricing', slug: 'pricing', type: 'Order', sections: [
      createSection('Pricing Table', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Transparent Pricing', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900', textAlign: 'center' } }) },
          { id: generateId(), type: 'price_list_widget', name: 'Pricing', props: { currency: '$' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) },
          { id: generateId(), type: 'guarantee_badge_widget', name: 'Guarantee', props: { text: '30-Day Money Back Guarantee' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Blog', slug: 'blog', type: 'Sales', sections: [
      createSection('Blog Grid', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Engineering Insights', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
          { id: generateId(), type: 'interactive_gallery_widget', name: 'Blog Posts', props: { columns: 3 }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) },
          { id: generateId(), type: 'audio_podcast_widget', name: 'Podcast', props: { title: 'Latest Podcast: Scaling to 10M Users' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Contact', slug: 'contact', type: 'OptIn', sections: [
      createSection('Contact Form', '#0f172a', [
        { col: 2, els: [
          [
            { id: generateId(), type: 'headline', name: 'H', props: { text: 'Get in Touch', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
            { id: generateId(), type: 'paragraph', name: 'P', props: { text: 'Need a custom SLA or VPC peering? Our enterprise sales team is here to help architect your solution.' }, style: createDefaultStyle({ typography: { color: '#cbd5e1', fontSize: '16px' }, boxModel: { marginTop: '16px', marginBottom: '32px' } }) },
            { id: generateId(), type: 'map_location_widget', name: 'Map', props: { address: 'San Francisco, CA' }, style: createDefaultStyle() }
          ],
          [
            { id: generateId(), type: 'appointment_calendar', name: 'Booking', props: { headerTitle: 'Book a Technical Demo' }, style: createDefaultStyle() }
          ]
        ]}
      ])
    ]}
  ]),

  // 2. JUSTICE LAW FIRM (Corporate & Legal)
  createWebsite('justice', 'Justice Law Firm', 'Corporate & Legal', 'Prestigious law firm template with practice areas, attorney profiles, consultation booking, and case results.', '#1e3a8a', 'Playfair Display', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80', [
    { title: 'Home', slug: 'home', type: 'OptIn', sections: [
      createSection('Hero', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'hero_banner_widget', name: 'Hero', props: { headline: 'Defending Your Future With Unwavering Precision', subheadline: 'Top-tier legal representation for complex corporate and civil litigation.', primaryButtonText: 'Request Free Consultation', imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=80' }, style: createDefaultStyle() }
        ]]}
      ]),
      createSection('Practice Areas', '#020617', [
        { col: 3, els: [
          [{ id: generateId(), type: 'callout_box', name: 'P1', props: { title: 'Corporate Law', text: 'Mergers, acquisitions, and compliance.' }, style: createDefaultStyle() }],
          [{ id: generateId(), type: 'callout_box', name: 'P2', props: { title: 'Civil Litigation', text: 'Aggressive representation in high-stakes civil disputes.' }, style: createDefaultStyle() }],
          [{ id: generateId(), type: 'callout_box', name: 'P3', props: { title: 'Intellectual Property', text: 'Protecting your patents, trademarks, and trade secrets.' }, style: createDefaultStyle() }]
        ]}
      ]),
      createSection('Trust', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'stats_counter_widget', name: 'Stats', props: { stat1: '$500M+', label1: 'Recovered', stat2: '20+', label2: 'Years Experience' }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Attorneys', slug: 'attorneys', type: 'Sales', sections: [
      createSection('Attorneys', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Our Legal Team', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900', textAlign: 'center' } }) },
          { id: generateId(), type: 'team_grid_widget', name: 'Team', props: { columns: 4 }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Practice Areas', slug: 'practice-areas', type: 'Sales', sections: [
      createSection('Areas', '#0f172a', [
        { col: 2, els: [
          [
            { id: generateId(), type: 'image_carousel_widget', name: 'Images', props: {}, style: createDefaultStyle() }
          ],
          [
            { id: generateId(), type: 'headline', name: 'H', props: { text: 'Comprehensive Legal Coverage', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
            { id: generateId(), type: 'paragraph', name: 'P', props: { text: 'We offer specialized counsel across multiple jurisdictions. Our partners bring decades of trial experience to the table.' }, style: createDefaultStyle({ typography: { color: '#cbd5e1', fontSize: '16px' }, boxModel: { marginTop: '16px', marginBottom: '24px' } }) },
            { id: generateId(), type: 'shape_divider_widget', name: 'Divider', props: {}, style: createDefaultStyle() }
          ]
        ]}
      ])
    ]},
    { title: 'Case Results', slug: 'results', type: 'Sales', sections: [
      createSection('Results', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Recent Triumphs', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900', textAlign: 'center' } }) },
          { id: generateId(), type: 'reviews_widget', name: 'Reviews', props: { layout: 'grid' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'News & Insights', slug: 'news', type: 'Sales', sections: [
      createSection('Blog', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Legal Insights', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
          { id: generateId(), type: 'interactive_gallery_widget', name: 'News', props: { columns: 3 }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Consultation', slug: 'contact', type: 'OptIn', sections: [
      createSection('Contact', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'appointment_calendar', name: 'Booking', props: { headerTitle: 'Schedule a Confidential Consultation' }, style: createDefaultStyle() },
          { id: generateId(), type: 'map_location_widget', name: 'Map', props: { address: 'New York, NY' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]}
  ]),

  // 3. PIXEL & CANVAS (Creative Agency)
  createWebsite('pixel', 'Pixel & Canvas', 'Creative Agency', 'Vibrant, bold creative agency template with masonry portfolios, client showcases, and dynamic service grids.', '#ec4899', 'Outfit', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80', [
    { title: 'Home', slug: 'home', type: 'OptIn', sections: [
      createSection('Hero', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'hero_banner_widget', name: 'Hero', props: { headline: 'We Build Digital Masterpieces', subheadline: 'Award-winning design and development for brands that want to stand out.', primaryButtonText: 'View Our Work', imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80' }, style: createDefaultStyle() }
        ]]}
      ]),
      createSection('Work', '#09090b', [
        { col: 1, els: [[
          { id: generateId(), type: 'interactive_gallery_widget', name: 'Portfolio', props: { columns: 3 }, style: createDefaultStyle() },
          { id: generateId(), type: 'logo_cloud_widget', name: 'Clients', props: { title: 'Brands We Love' }, style: createDefaultStyle({ boxModel: { marginTop: '60px' } }) }
        ]]}
      ])
    ]},
    { title: 'Our Studio', slug: 'studio', type: 'Sales', sections: [
      createSection('Studio', '#020617', [
        { col: 2, els: [
          [
            { id: generateId(), type: 'headline', name: 'H', props: { text: 'A Collective of Dreamers', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
            { id: generateId(), type: 'paragraph', name: 'P', props: { text: 'Based in London, we are a multidisciplinary team pushing the boundaries of web design, 3D motion, and branding.' }, style: createDefaultStyle({ typography: { color: '#cbd5e1', fontSize: '16px' }, boxModel: { marginTop: '16px' } }) },
            { id: generateId(), type: 'audio_podcast_widget', name: 'Audio', props: { title: 'Listen to our Studio Playlist' }, style: createDefaultStyle({ boxModel: { marginTop: '32px' } }) }
          ],
          [
            { id: generateId(), type: 'image', name: 'Img', props: { imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' }, style: createDefaultStyle() }
          ]
        ]}
      ])
    ]},
    { title: 'Capabilities', slug: 'capabilities', type: 'Sales', sections: [
      createSection('Services', '#09090b', [
        { col: 1, els: [[
          { id: generateId(), type: 'content_slider_widget', name: 'Services', props: {}, style: createDefaultStyle() },
          { id: generateId(), type: 'feature_comparison_widget', name: 'Tech Stack', props: { title: 'Our Tech Stack' }, style: createDefaultStyle({ boxModel: { marginTop: '60px' } }) }
        ]]}
      ])
    ]},
    { title: 'Process', slug: 'process', type: 'Sales', sections: [
      createSection('Process', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'How We Work', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900', textAlign: 'center' } }) },
          { id: generateId(), type: 'progress_step_widget', name: 'Steps', props: {}, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Journal', slug: 'journal', type: 'Sales', sections: [
      createSection('Blog', '#09090b', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Studio Journal', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
          { id: generateId(), type: 'interactive_gallery_widget', name: 'Grid', props: { columns: 2 }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Start a Project', slug: 'contact', type: 'OptIn', sections: [
      createSection('Contact', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'appointment_calendar', name: 'Booking', props: { headerTitle: 'Book a Discovery Call' }, style: createDefaultStyle() }
        ]]}
      ])
    ]}
  ]),

  // 4. HORIZON REAL ESTATE
  createWebsite('horizon', 'Horizon Realty', 'Real Estate & Hospitality', 'Luxurious real estate template with large hero images, property carousels, agent profiles, and lead capture.', '#d4af37', 'Playfair Display', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', [
    { title: 'Home', slug: 'home', type: 'OptIn', sections: [
      createSection('Hero', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'hero_banner_widget', name: 'Hero', props: { headline: 'Find Your Luxury Dream Home', subheadline: 'Exclusive listings in the most prestigious neighborhoods.', primaryButtonText: 'View Properties', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80' }, style: createDefaultStyle() },
          { id: generateId(), type: 'search_bar_widget', name: 'Search', props: { placeholder: 'Search by city, zip, or neighborhood...' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ]),
      createSection('Featured', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'headline', name: 'H', props: { text: 'Featured Listings', headlineLevel: 'h3' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '32px', fontWeight: '700' } }) },
          { id: generateId(), type: 'image_carousel_widget', name: 'Carousel', props: {}, style: createDefaultStyle({ boxModel: { marginTop: '30px' } }) }
        ]]}
      ])
    ]},
    { title: 'Properties', slug: 'properties', type: 'Sales', sections: [
      createSection('Properties', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'interactive_gallery_widget', name: 'Grid', props: { columns: 3 }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Agents', slug: 'agents', type: 'Sales', sections: [
      createSection('Team', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'team_grid_widget', name: 'Agents', props: { columns: 3, title: 'Meet Our Expert Brokers' }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Neighborhoods', slug: 'neighborhoods', type: 'Sales', sections: [
      createSection('Areas', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'map_location_widget', name: 'Map', props: { address: 'Beverly Hills, CA' }, style: createDefaultStyle() },
          { id: generateId(), type: 'content_slider_widget', name: 'Areas', props: {}, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Market Updates', slug: 'blog', type: 'Sales', sections: [
      createSection('Blog', '#020617', [
        { col: 1, els: [[
          { id: generateId(), type: 'interactive_gallery_widget', name: 'Grid', props: { columns: 3 }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Contact Us', slug: 'contact', type: 'OptIn', sections: [
      createSection('Contact', '#0f172a', [
        { col: 1, els: [[
          { id: generateId(), type: 'appointment_calendar', name: 'Booking', props: { headerTitle: 'Schedule a Viewing' }, style: createDefaultStyle() }
        ]]}
      ])
    ]}
  ]),

  // 5. SERENITY WELLNESS (Health & Wellness)
  createWebsite('serenity', 'Serenity Wellness', 'Healthcare & Wellness', 'Calming clinic template featuring class schedules, practitioner bios, testimonials, and integrated booking.', '#0d9488', 'Inter', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', [
    { title: 'Home', slug: 'home', type: 'OptIn', sections: [
      createSection('Hero', '#042f2e', [
        { col: 1, els: [[
          { id: generateId(), type: 'hero_banner_widget', name: 'Hero', props: { headline: 'Find Your Inner Balance', subheadline: 'Holistic health, yoga, and meditation practices tailored to your wellness journey.', primaryButtonText: 'Book a Session', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80' }, style: createDefaultStyle() }
        ]]}
      ]),
      createSection('Classes', '#134e4a', [
        { col: 3, els: [
          [{ id: generateId(), type: 'callout_box', name: 'C1', props: { title: 'Vinyasa Yoga', text: 'Flow through dynamic postures to build heat and flexibility.' }, style: createDefaultStyle() }],
          [{ id: generateId(), type: 'callout_box', name: 'C2', props: { title: 'Guided Meditation', text: 'Calm the mind with expert-led breathwork and stillness.' }, style: createDefaultStyle() }],
          [{ id: generateId(), type: 'callout_box', name: 'C3', props: { title: 'Acupuncture', text: 'Restore energy flow and alleviate chronic pain.' }, style: createDefaultStyle() }]
        ]}
      ])
    ]},
    { title: 'About Us', slug: 'about', type: 'Sales', sections: [
      createSection('About', '#042f2e', [
        { col: 2, els: [
          [
            { id: generateId(), type: 'headline', name: 'H', props: { text: 'A Sanctuary in the City', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
            { id: generateId(), type: 'paragraph', name: 'P', props: { text: 'Established in 2018, Serenity was built to be a refuge from the chaos of modern life.' }, style: createDefaultStyle({ typography: { color: '#ccfbf1', fontSize: '16px' }, boxModel: { marginTop: '16px' } }) }
          ],
          [
            { id: generateId(), type: 'video_player', name: 'Vid', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle() }
          ]
        ]}
      ])
    ]},
    { title: 'Practitioners', slug: 'practitioners', type: 'Sales', sections: [
      createSection('Team', '#134e4a', [
        { col: 1, els: [[
          { id: generateId(), type: 'team_grid_widget', name: 'Team', props: { columns: 3 }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Pricing & Memberships', slug: 'pricing', type: 'Order', sections: [
      createSection('Pricing', '#042f2e', [
        { col: 1, els: [[
          { id: generateId(), type: 'price_list_widget', name: 'Pricing', props: { currency: '$' }, style: createDefaultStyle() },
          { id: generateId(), type: 'guarantee_badge_widget', name: 'Badge', props: { text: 'Cancel Anytime' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Health Journal', slug: 'blog', type: 'Sales', sections: [
      createSection('Blog', '#134e4a', [
        { col: 1, els: [[
          { id: generateId(), type: 'interactive_gallery_widget', name: 'Posts', props: { columns: 3 }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Book Appointment', slug: 'contact', type: 'OptIn', sections: [
      createSection('Booking', '#042f2e', [
        { col: 1, els: [[
          { id: generateId(), type: 'appointment_calendar', name: 'Booking', props: { headerTitle: 'Reserve Your Spot' }, style: createDefaultStyle() }
        ]]}
      ])
    ]}
  ]),

  // 6. LUMINA COMMERCE (High-End E-Commerce)
  createWebsite('lumina', 'Lumina Style', 'E-Commerce & Retail', 'Minimalist, high-end e-commerce brand template with product lookbooks, video highlights, and sleek shopping cart integration.', '#000000', 'Inter', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', [
    { title: 'Home', slug: 'home', type: 'OptIn', sections: [
      createSection('Hero', '#111111', [
        { col: 1, els: [[
          { id: generateId(), type: 'hero_banner_widget', name: 'Hero', props: { headline: 'The New Minimalist Collection', subheadline: 'Elevate your wardrobe with timeless essentials designed in Paris.', primaryButtonText: 'Shop the Collection', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80' }, style: createDefaultStyle() },
          { id: generateId(), type: 'countdown_banner_widget', name: 'Countdown', props: { title: 'Winter Sale Ends In' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Collections', slug: 'collections', type: 'Sales', sections: [
      createSection('Grid', '#000000', [
        { col: 1, els: [[
          { id: generateId(), type: 'interactive_gallery_widget', name: 'Products', props: { columns: 4 }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Lookbook', slug: 'lookbook', type: 'Sales', sections: [
      createSection('Lookbook', '#111111', [
        { col: 1, els: [[
          { id: generateId(), type: 'image_carousel_widget', name: 'Carousel', props: {}, style: createDefaultStyle() },
          { id: generateId(), type: 'video_player', name: 'Runway', props: { videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, style: createDefaultStyle({ boxModel: { marginTop: '40px' } }) }
        ]]}
      ])
    ]},
    { title: 'Our Story', slug: 'about', type: 'Sales', sections: [
      createSection('About', '#000000', [
        { col: 2, els: [
          [
            { id: generateId(), type: 'image', name: 'Img', props: { imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80' }, style: createDefaultStyle() }
          ],
          [
            { id: generateId(), type: 'headline', name: 'H', props: { text: 'Crafted with Intention', headlineLevel: 'h2' }, style: createDefaultStyle({ typography: { color: '#ffffff', fontSize: '36px', fontWeight: '900' } }) },
            { id: generateId(), type: 'paragraph', name: 'P', props: { text: 'Every piece is sustainably sourced and ethically manufactured. We believe in slow fashion that lasts a lifetime.' }, style: createDefaultStyle({ typography: { color: '#a3a3a3', fontSize: '16px' }, boxModel: { marginTop: '16px' } }) }
          ]
        ]}
      ])
    ]},
    { title: 'Reviews', slug: 'reviews', type: 'Sales', sections: [
      createSection('Reviews', '#111111', [
        { col: 1, els: [[
          { id: generateId(), type: 'reviews_widget', name: 'Reviews', props: { layout: 'grid' }, style: createDefaultStyle() }
        ]]}
      ])
    ]},
    { title: 'Contact', slug: 'contact', type: 'OptIn', sections: [
      createSection('Contact', '#000000', [
        { col: 1, els: [[
          { id: generateId(), type: 'text_input', name: 'Email', props: { labelText: 'Subscribe to Newsletter', placeholderText: 'Enter your email' }, style: createDefaultStyle() },
          { id: generateId(), type: 'button', name: 'Btn', props: { buttonText: 'Subscribe' }, style: createDefaultStyle({ boxModel: { marginTop: '16px' } }) }
        ]]}
      ])
    ]}
  ])
];
