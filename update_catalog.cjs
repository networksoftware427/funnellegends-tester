const fs = require('fs');
const catalogPath = 'src/components/builder/SidebarCatalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const elementsToUpdate = [
  'text_input', 'textarea', 'select_dropdown', 'multi_step_optin', 'sms_signup',
  'credit_card_form', 'two_step_checkout', 'shipping_address', 'billing_address',
  'member_user_login', 'affiliate_login'
];

elementsToUpdate.forEach(type => {
  const regexStr = "({ type: '" + type + "',.*defaultProps: {)([^}]*)(} })";
  const regex = new RegExp(regexStr, 'g');
  catalog = catalog.replace(regex, (match, p1, p2, p3) => {
    if (!p2.includes('formBgColor')) {
      const prefix = p2.trim().length > 0 ? p2 + ', ' : '';
      return p1 + prefix + "formBgColor: 'transparent', formShadow: 'none', fieldTextColor: '#f1f5f9'" + p3;
    }
    return match;
  });
});

fs.writeFileSync(catalogPath, catalog);
console.log('SidebarCatalog updated.');
