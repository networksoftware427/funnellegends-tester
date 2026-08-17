const fs = require('fs');
let catalogPath = 'src/components/builder/SidebarCatalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');

catalog = catalog.replace(
  "buttonColor: '#4f46e5', borderColor: 'transparent', iconName: '', shadow: 'lg'",
  "buttonColor: '#4f46e5', buttonHoverColor: '#4338ca', borderColor: 'transparent', iconName: '', shadow: 'lg'"
);

fs.writeFileSync(catalogPath, catalog);
console.log('SidebarCatalog updated for button hover.');
