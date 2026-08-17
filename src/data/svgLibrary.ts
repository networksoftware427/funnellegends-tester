export interface SvgImage {
  id: string;
  name: string;
  category: string;
  url: string;
}

export const funnelSvgLibrary: SvgImage[] = [
  {
    id: 'svg_1',
    name: 'Credit Card',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h20v10H2z M2 11h20"/></svg>`
  },
  {
    id: 'svg_2',
    name: 'Banknote',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h20v12H2z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M6 10h.01 M18 10h.01"/></svg>`
  },
  {
    id: 'svg_3',
    name: 'Shopping Cart',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l3 9h10l3-9 M9 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`
  },
  {
    id: 'svg_4',
    name: 'Wallet',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2 M20 12H16v-2h4 M20 12v5H16v-5"/></svg>`
  },
  {
    id: 'svg_5',
    name: 'Piggy Bank',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M9 6l-2-2 M15 6l2-2 M3 10c0-4.4 3.6-8 8-8s8 3.6 8 8 M3 10v4a2 2 0 0 0 2 2h14"/></svg>`
  },
  {
    id: 'svg_6',
    name: 'Coins',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.5 0 10-2.2 10-5s-4.5-5-10-5-10 2.2-10 5 4.5 5 10 5z M12 17c5.5 0 10-2.2 10-5s-4.5-5-10-5-10 2.2-10 5 4.5 5 10 5z M12 12c5.5 0 10-2.2 10-5s-4.5-5-10-5-10 2.2-10 5 4.5 5 10 5z"/></svg>`
  },
  {
    id: 'svg_7',
    name: 'Diamond',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9L12 22 21.5 9 M2.5 9L12 2 21.5 9 M2.5 9h19 M12 2v20 M7 2l2 7 M17 2l-2 7"/></svg>`
  },
  {
    id: 'svg_8',
    name: 'Gift',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9h20v4H2z M4 13h16v9H4z M12 9v13 M12 9H7.5A2.5 2.5 0 0 1 5 6.5C5 5.1 6.1 4 7.5 4S12 9 12 9z M12 9h4.5A2.5 2.5 0 0 0 19 6.5C19 5.1 17.9 4 16.5 4S12 9 12 9z"/></svg>`
  },
  {
    id: 'svg_9',
    name: 'Receipt',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V2L20 4l-2-2-2 2-2-2-2 2-2-2-2 2L4 2z M8 10h8 M8 14h8 M8 18h4"/></svg>`
  },
  {
    id: 'svg_10',
    name: 'Store',
    category: 'Commerce',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10"/></svg>`
  },
  {
    id: 'svg_11',
    name: 'Bar Chart',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3"/></svg>`
  },
  {
    id: 'svg_12',
    name: 'Line Chart',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18 M3 15l5-5 4 4 9-9"/></svg>`
  },
  {
    id: 'svg_13',
    name: 'Pie Chart',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 15c.7-1.2 1-2.5 1-4a10 10 0 1 0-11 9.9 M12 2v10h10"/></svg>`
  },
  {
    id: 'svg_14',
    name: 'Target',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 12h.01"/></svg>`
  },
  {
    id: 'svg_15',
    name: 'Trending Up',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6"/></svg>`
  },
  {
    id: 'svg_16',
    name: 'Funnel',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9v8l4 2v-10z"/></svg>`
  },
  {
    id: 'svg_17',
    name: 'Seal/Badge',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 4.9l1.4 1.4"/></svg>`
  },
  {
    id: 'svg_18',
    name: 'Briefcase',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h20v13H2z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M12 12v.01"/></svg>`
  },
  {
    id: 'svg_19',
    name: 'Award',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8 13.5v7l4-2 4 2v-7"/></svg>`
  },
  {
    id: 'svg_20',
    name: 'Megaphone',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 13v-2z M12 22v-4 M16 4v3 M21 9v6"/></svg>`
  },
  {
    id: 'svg_21',
    name: 'Globe',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15 15 0 0 0 0 20 M12 2a15 15 0 0 1 0 20"/></svg>`
  },
  {
    id: 'svg_22',
    name: 'Check Circle',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M8 12l3 3 5-5"/></svg>`
  },
  {
    id: 'svg_23',
    name: 'Star',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>`
  },
  {
    id: 'svg_24',
    name: 'Lightbulb',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21h6 M10 17v4 M14 17v4 M12 2c-3.3 0-6 2.7-6 6 0 2 1.2 3.8 3 4.8v4.2h6v-4.2c1.8-1 3-2.8 3-4.8 0-3.3-2.7-6-6-6z"/></svg>`
  },
  {
    id: 'svg_25',
    name: 'Rocket',
    category: 'Business',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`
  },
  {
    id: 'svg_26',
    name: 'Phone',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L7.1 10.5a16 16 0 0 0 6.4 6.4l2.1-2.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg>`
  },
  {
    id: 'svg_27',
    name: 'Email',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l9 6 9-6 M3 6h18v12H3z"/></svg>`
  },
  {
    id: 'svg_28',
    name: 'Message',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  },
  {
    id: 'svg_29',
    name: 'Calendar',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18v14H3z M8 4v4 M16 4v4 M3 10h18"/></svg>`
  },
  {
    id: 'svg_30',
    name: 'Clock',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2"/></svg>`
  },
  {
    id: 'svg_31',
    name: 'User',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>`
  },
  {
    id: 'svg_32',
    name: 'Users',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-3-3.8 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M2 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2 M16 3a4 4 0 0 1 0 8"/></svg>`
  },
  {
    id: 'svg_33',
    name: 'Settings',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.7 1.7 0 0 0 .3 1.6l1 1a2 2 0 0 1-2.8 2.8l-1-1a1.7 1.7 0 0 0-1.6-.3A8.4 8.4 0 0 1 14 19.8v1.2a2 2 0 0 1-4 0v-1.2a1.7 1.7 0 0 0-1.6-.3A8.4 8.4 0 0 1 6.8 19l-1 1a2 2 0 0 1-2.8-2.8l1-1a1.7 1.7 0 0 0 .3-1.6A8.4 8.4 0 0 1 4 14H2.8a2 2 0 0 1 0-4H4a1.7 1.7 0 0 0-.3-1.6l-1-1a2 2 0 0 1 2.8-2.8l1 1a1.7 1.7 0 0 0 1.6.3A8.4 8.4 0 0 1 9.8 4.2V3a2 2 0 0 1 4 0v1.2a1.7 1.7 0 0 0 1.6.3A8.4 8.4 0 0 1 17.2 5l1-1a2 2 0 0 1 2.8 2.8l-1 1a1.7 1.7 0 0 0-.3 1.6 8.4 8.4 0 0 1 .3 4.7h1.2a2 2 0 0 1 0 4h-1.2A8.4 8.4 0 0 1 19.4 15z"/></svg>`
  },
  {
    id: 'svg_34',
    name: 'Search',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 21l-6-6 M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/></svg>`
  },
  {
    id: 'svg_35',
    name: 'Home',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10"/></svg>`
  },
  {
    id: 'svg_36',
    name: 'Camera',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3-3h14l3 3 M2 7h20v14H2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>`
  },
  {
    id: 'svg_37',
    name: 'Video',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z M2 6h14v12H2z"/></svg>`
  },
  {
    id: 'svg_38',
    name: 'Menu',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18 M3 6h18 M3 18h18"/></svg>`
  },
  {
    id: 'svg_39',
    name: 'More',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>`
  },
  {
    id: 'svg_40',
    name: 'Share',
    category: 'Communication',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13"/></svg>`
  },
  {
    id: 'svg_41',
    name: 'Course',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5h20v14H2z M12 5v14 M6 10h2 M16 10h2 M6 14h2 M16 14h2"/></svg>`
  },
  {
    id: 'svg_42',
    name: 'Book',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16c0 1.1.9 2 2 2h14 M4 4c0-1.1.9-2 2-2h12v18 M16 4v4l-2-2-2 2V4"/></svg>`
  },
  {
    id: 'svg_43',
    name: 'Graduation Cap',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z M6 12v5c0 2 3 3 6 3s6-1 6-3v-5 M22 10v7"/></svg>`
  },
  {
    id: 'svg_44',
    name: 'Certificate',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z M14 2v6h6 M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M10 14.5v5l2-1.5 2 1.5v-5"/></svg>`
  },
  {
    id: 'svg_45',
    name: 'File',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z M14 2v6h6"/></svg>`
  },
  {
    id: 'svg_46',
    name: 'Folder',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`
  },
  {
    id: 'svg_47',
    name: 'Download',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3 M8 11l4 4 4-4 M2 21h20"/></svg>`
  },
  {
    id: 'svg_48',
    name: 'Upload',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12 M8 7l4-4 4 4 M2 21h20"/></svg>`
  },
  {
    id: 'svg_49',
    name: 'Link',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
  },
  {
    id: 'svg_50',
    name: 'Attachment',
    category: 'Education',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.5V8a6 6 0 0 0-12 0v9a4 4 0 1 0 8 0V7a2 2 0 0 0-4 0v10"/></svg>`
  }
];
