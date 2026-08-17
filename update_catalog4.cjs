const fs = require('fs');
let catalogPath = 'src/components/builder/SidebarCatalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const oldProps = "defaultProps: { productName: 'LaunchEngine SaaS License', price: '$297.00' , formBgColor: 'transparent', formShadow: 'none', fieldTextColor: '#f1f5f9'}";
const newProps = "defaultProps: { productName: 'LaunchEngine SaaS License', price: '$297.00' , formBgColor: '#0f172a', formBgOpacity: 100, formShadow: 'none', fieldTextColor: '#f1f5f9', titleColor: '#ffffff', titleFontFamily: 'Inter', buttonText: 'COMPLETE ORDER NOW', buttonColor: '#22c55e', buttonHoverColor: '#16a34a', buttonTextColor: '#ffffff', buttonFontFamily: 'Inter', buttonFontSize: '16px', buttonFontWeight: '700' }";

catalog = catalog.replace(oldProps, newProps);

fs.writeFileSync(catalogPath, catalog);
console.log('Updated two_step_checkout props.');
