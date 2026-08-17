const fs = require('fs');
let catalogPath = 'src/components/builder/SidebarCatalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const targetStr = "buttonFontSize: '16px', buttonFontWeight: '700'";
const replacementStr = "buttonFontSize: '16px', buttonFontWeight: '700', buttonBorderRadius: '12px', buttonBorderWidth: '0px', buttonBorderColor: 'transparent'";

if (catalog.includes(targetStr)) {
  catalog = catalog.replace(targetStr, replacementStr);
  fs.writeFileSync(catalogPath, catalog);
  console.log('SidebarCatalog updated for 2-step checkout button borders.');
}
