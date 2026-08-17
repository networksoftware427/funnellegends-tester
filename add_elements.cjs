const fs = require('fs');
let catalogPath = 'src/components/builder/SidebarCatalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newElements = `
  {
    id: 'elem-footer-01',
    type: 'footer_block',
    name: 'Footer Block',
    category: 'advanced',
    icon: 'layout-panel-top',
    defaultProps: { 
      copyrightText: '© 2026 Funnel Legends. All Rights Reserved.',
      showSocials: true,
      showMenu: true,
      menuLinks: 'Home, About, Terms, Privacy'
    },
    defaultStyle: { ...defaultElementStyle, boxModel: { ...defaultElementStyle.boxModel, width: '100%' } }
  },
  {
    id: 'elem-announcement-01',
    type: 'announcement_bar',
    name: 'Announcement Bar',
    category: 'advanced',
    icon: 'megaphone',
    defaultProps: { 
      text: '?? FLASH SALE: Get 50% Off All Plans Today Only! Click Here',
      barColor: '#ef4444',
      textColor: '#ffffff',
      linkUrl: '#'
    },
    defaultStyle: { ...defaultElementStyle, boxModel: { ...defaultElementStyle.boxModel, width: '100%', marginBottom: '0' } }
  },
`;

// Insert after 'custom_code' element which is in the 'advanced' category
catalog = catalog.replace(
  "{ id: 'elem-code-01', type: 'custom_code', name: 'Custom Code', category: 'advanced', icon: 'code', defaultProps: { code: '<!-- Enter custom HTML/JS here -->' }, defaultStyle: defaultElementStyle },",
  "{ id: 'elem-code-01', type: 'custom_code', name: 'Custom Code', category: 'advanced', icon: 'code', defaultProps: { code: '<!-- Enter custom HTML/JS here -->' }, defaultStyle: defaultElementStyle }," + newElements
);

fs.writeFileSync(catalogPath, catalog);
console.log('Added footer and announcement bar to catalog.');
