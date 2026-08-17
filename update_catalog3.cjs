const fs = require('fs');
let catalogPath = 'src/components/builder/SidebarCatalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');

// Replace general inheritance
catalog = catalog.replace(
  "typography: { fontFamily: 'Inter', fontSize: '16px', fontWeight: 'normal', color: 'inherit', textAlign: 'left', lineHeight: 'normal', letterSpacing: 'normal', textShadow: 'none', isGradientFill: false, gradientStart: '', gradientEnd: '' }",
  "typography: { fontFamily: 'Inter', fontSize: '16px', fontWeight: 'normal', color: '#e2e8f0', textAlign: 'left', lineHeight: 'normal', letterSpacing: 'normal', textShadow: 'none', isGradientFill: false, gradientStart: '', gradientEnd: '' }"
);

fs.writeFileSync(catalogPath, catalog);
console.log('SidebarCatalog updated.');
