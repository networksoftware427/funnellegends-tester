const fs = require('fs');

let templatesPath = 'src/data/initialTemplates.ts';
let content = fs.readFileSync(templatesPath, 'utf8');

const defaultTwoStepProps = `{ productName: 'LaunchEngine SaaS License', price: '$297.00', formBgColor: '#0f172a', formBorderColor: '#1e293b', formBorderRadius: '8px', formPadding: '24px', fieldBgColor: '#020617', fieldBorderColor: '#1e293b', fieldTextColor: '#f1f5f9', fieldFontFamily: 'inherit', fieldFontSize: '14px', titleColor: '#ffffff', titleFontFamily: 'inherit', titleFontSize: '14px', buttonText: 'COMPLETE ORDER NOW', buttonColor: '#22c55e', buttonHoverColor: '#16a34a', buttonTextColor: '#ffffff', buttonFontFamily: 'inherit', buttonFontSize: '16px', buttonFontWeight: '700', buttonBorderRadius: '12px', buttonBorderWidth: '0px', buttonBorderColor: 'transparent' }`;

content = content.replace("type: 'two_step_checkout', name: 'Two Step Checkout', props: {}", `type: 'two_step_checkout', name: 'Two Step Checkout', props: ${defaultTwoStepProps}`);

fs.writeFileSync(templatesPath, content);
console.log('Successfully updated two_step_checkout props in initialTemplates.ts!');
