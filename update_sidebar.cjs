const fs = require('fs');
let sidebarPath = 'src/components/builder/SidebarCatalog.tsx';
let t = fs.readFileSync(sidebarPath, 'utf8');

const oldProps = "formBgColor: '#0f172a', formBgOpacity: 100, formShadow: 'none', fieldTextColor: '#f1f5f9', titleColor: '#ffffff', titleFontFamily: 'Inter', buttonText: 'COMPLETE ORDER NOW', buttonColor: '#22c55e', buttonHoverColor: '#16a34a', buttonTextColor: '#ffffff', buttonFontFamily: 'Inter', buttonFontSize: '16px', buttonFontWeight: '700', buttonBorderRadius: '12px', buttonBorderWidth: '0px', buttonBorderColor: 'transparent'";

const newProps = "formBgColor: '#0f172a', formBorderColor: 'transparent', formBorderRadius: '8px', formPadding: '24px', fieldBgColor: '#020617', fieldBorderColor: '#1e293b', fieldTextColor: '#f1f5f9', fieldFontFamily: 'inherit', fieldFontSize: '14px', titleColor: '#ffffff', titleFontFamily: 'inherit', titleFontSize: '14px', buttonText: 'COMPLETE ORDER NOW', buttonColor: '#22c55e', buttonHoverColor: '#16a34a', buttonTextColor: '#ffffff', buttonFontFamily: 'inherit', buttonFontSize: '16px', buttonFontWeight: '700', buttonBorderRadius: '12px', buttonBorderWidth: '0px', buttonBorderColor: 'transparent'";

t = t.replace(oldProps, newProps);

fs.writeFileSync(sidebarPath, t);
console.log('Updated SidebarCatalog.tsx defaultProps for two_step_checkout');
