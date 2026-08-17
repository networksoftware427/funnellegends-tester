const fs = require('fs');
const path = require('path');

const icons = [
  // Commerce / Money (10)
  { name: 'Credit Card', cat: 'Commerce', d: 'M2 7h20v10H2z M2 11h20' },
  { name: 'Banknote', cat: 'Commerce', d: 'M2 6h20v12H2z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M6 10h.01 M18 10h.01' },
  { name: 'Shopping Cart', cat: 'Commerce', d: 'M3 3h2l3 9h10l3-9 M9 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' },
  { name: 'Wallet', cat: 'Commerce', d: 'M20 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2 M20 12H16v-2h4 M20 12v5H16v-5' },
  { name: 'Piggy Bank', cat: 'Commerce', d: 'M20.5 14.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M9 6l-2-2 M15 6l2-2 M3 10c0-4.4 3.6-8 8-8s8 3.6 8 8 M3 10v4a2 2 0 0 0 2 2h14' },
  { name: 'Coins', cat: 'Commerce', d: 'M12 22c5.5 0 10-2.2 10-5s-4.5-5-10-5-10 2.2-10 5 4.5 5 10 5z M12 17c5.5 0 10-2.2 10-5s-4.5-5-10-5-10 2.2-10 5 4.5 5 10 5z M12 12c5.5 0 10-2.2 10-5s-4.5-5-10-5-10 2.2-10 5 4.5 5 10 5z' },
  { name: 'Diamond', cat: 'Commerce', d: 'M2.5 9L12 22 21.5 9 M2.5 9L12 2 21.5 9 M2.5 9h19 M12 2v20 M7 2l2 7 M17 2l-2 7' },
  { name: 'Gift', cat: 'Commerce', d: 'M2 9h20v4H2z M4 13h16v9H4z M12 9v13 M12 9H7.5A2.5 2.5 0 0 1 5 6.5C5 5.1 6.1 4 7.5 4S12 9 12 9z M12 9h4.5A2.5 2.5 0 0 0 19 6.5C19 5.1 17.9 4 16.5 4S12 9 12 9z' },
  { name: 'Receipt', cat: 'Commerce', d: 'M4 2v20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V2L20 4l-2-2-2 2-2-2-2 2-2-2-2 2L4 2z M8 10h8 M8 14h8 M8 18h4' },
  { name: 'Store', cat: 'Commerce', d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10' },

  // Business / Marketing (15)
  { name: 'Bar Chart', cat: 'Business', d: 'M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3' },
  { name: 'Line Chart', cat: 'Business', d: 'M3 3v18h18 M3 15l5-5 4 4 9-9' },
  { name: 'Pie Chart', cat: 'Business', d: 'M21.2 15c.7-1.2 1-2.5 1-4a10 10 0 1 0-11 9.9 M12 2v10h10' },
  { name: 'Target', cat: 'Business', d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 12h.01' },
  { name: 'Trending Up', cat: 'Business', d: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6' },
  { name: 'Funnel', cat: 'Business', d: 'M22 3H2l8 9v8l4 2v-10z' },
  { name: 'Seal/Badge', cat: 'Business', d: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 4.9l1.4 1.4' },
  { name: 'Briefcase', cat: 'Business', d: 'M2 7h20v13H2z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M12 12v.01' },
  { name: 'Award', cat: 'Business', d: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8 13.5v7l4-2 4 2v-7' },
  { name: 'Megaphone', cat: 'Business', d: 'M3 11l18-5v12L3 13v-2z M12 22v-4 M16 4v3 M21 9v6' },
  { name: 'Globe', cat: 'Business', d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15 15 0 0 0 0 20 M12 2a15 15 0 0 1 0 20' },
  { name: 'Check Circle', cat: 'Business', d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M8 12l3 3 5-5' },
  { name: 'Star', cat: 'Business', d: 'M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z' },
  { name: 'Lightbulb', cat: 'Business', d: 'M9 21h6 M10 17v4 M14 17v4 M12 2c-3.3 0-6 2.7-6 6 0 2 1.2 3.8 3 4.8v4.2h6v-4.2c1.8-1 3-2.8 3-4.8 0-3.3-2.7-6-6-6z' },
  { name: 'Rocket', cat: 'Business', d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' },

  // UI / Communication (15)
  { name: 'Phone', cat: 'Communication', d: 'M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L7.1 10.5a16 16 0 0 0 6.4 6.4l2.1-2.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z' },
  { name: 'Email', cat: 'Communication', d: 'M3 6l9 6 9-6 M3 6h18v12H3z' },
  { name: 'Message', cat: 'Communication', d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { name: 'Calendar', cat: 'Communication', d: 'M3 6h18v14H3z M8 4v4 M16 4v4 M3 10h18' },
  { name: 'Clock', cat: 'Communication', d: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2' },
  { name: 'User', cat: 'Communication', d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { name: 'Users', cat: 'Communication', d: 'M17 21v-2a4 4 0 0 0-3-3.8 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M2 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2 M16 3a4 4 0 0 1 0 8' },
  { name: 'Settings', cat: 'Communication', d: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.7 1.7 0 0 0 .3 1.6l1 1a2 2 0 0 1-2.8 2.8l-1-1a1.7 1.7 0 0 0-1.6-.3A8.4 8.4 0 0 1 14 19.8v1.2a2 2 0 0 1-4 0v-1.2a1.7 1.7 0 0 0-1.6-.3A8.4 8.4 0 0 1 6.8 19l-1 1a2 2 0 0 1-2.8-2.8l1-1a1.7 1.7 0 0 0 .3-1.6A8.4 8.4 0 0 1 4 14H2.8a2 2 0 0 1 0-4H4a1.7 1.7 0 0 0-.3-1.6l-1-1a2 2 0 0 1 2.8-2.8l1 1a1.7 1.7 0 0 0 1.6.3A8.4 8.4 0 0 1 9.8 4.2V3a2 2 0 0 1 4 0v1.2a1.7 1.7 0 0 0 1.6.3A8.4 8.4 0 0 1 17.2 5l1-1a2 2 0 0 1 2.8 2.8l-1 1a1.7 1.7 0 0 0-.3 1.6 8.4 8.4 0 0 1 .3 4.7h1.2a2 2 0 0 1 0 4h-1.2A8.4 8.4 0 0 1 19.4 15z' },
  { name: 'Search', cat: 'Communication', d: 'M21 21l-6-6 M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0z' },
  { name: 'Home', cat: 'Communication', d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M9 22V12h6v10' },
  { name: 'Camera', cat: 'Communication', d: 'M2 7l3-3h14l3 3 M2 7h20v14H2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { name: 'Video', cat: 'Communication', d: 'M23 7l-7 5 7 5V7z M2 6h14v12H2z' },
  { name: 'Menu', cat: 'Communication', d: 'M3 12h18 M3 6h18 M3 18h18' },
  { name: 'More', cat: 'Communication', d: 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' },
  { name: 'Share', cat: 'Communication', d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13' },

  // Education / Files (10)
  { name: 'Course', cat: 'Education', d: 'M2 5h20v14H2z M12 5v14 M6 10h2 M16 10h2 M6 14h2 M16 14h2' },
  { name: 'Book', cat: 'Education', d: 'M4 4v16c0 1.1.9 2 2 2h14 M4 4c0-1.1.9-2 2-2h12v18 M16 4v4l-2-2-2 2V4' },
  { name: 'Graduation Cap', cat: 'Education', d: 'M22 10L12 5 2 10l10 5 10-5z M6 12v5c0 2 3 3 6 3s6-1 6-3v-5 M22 10v7' },
  { name: 'Certificate', cat: 'Education', d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z M14 2v6h6 M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M10 14.5v5l2-1.5 2 1.5v-5' },
  { name: 'File', cat: 'Education', d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z M14 2v6h6' },
  { name: 'Folder', cat: 'Education', d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
  { name: 'Download', cat: 'Education', d: 'M12 15V3 M8 11l4 4 4-4 M2 21h20' },
  { name: 'Upload', cat: 'Education', d: 'M12 3v12 M8 7l4-4 4 4 M2 21h20' },
  { name: 'Link', cat: 'Education', d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' },
  { name: 'Attachment', cat: 'Education', d: 'M21 12.5V8a6 6 0 0 0-12 0v9a4 4 0 1 0 8 0V7a2 2 0 0 0-4 0v10' },
];

const fileContent = `export interface SvgImage {
  id: string;
  name: string;
  category: string;
  url: string;
}

export const funnelSvgLibrary: SvgImage[] = [
${icons.map((icon, i) => `  {
    id: 'svg_${i + 1}',
    name: '${icon.name}',
    category: '${icon.cat}',
    url: \`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${icon.d}"/></svg>\`
  }`).join(',\n')}
];
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'svgLibrary.ts'), fileContent);
console.log('SVG library generated successfully with ' + icons.length + ' icons.');
