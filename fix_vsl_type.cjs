const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

t = t.replace(
  "{ id: 'el_vo_7', type: 'email_input', name: 'Email Address', props: { placeholder: 'Email Address...' }",
  "{ id: 'el_vo_7', type: 'text_input', name: 'Email Address', props: { placeholder: 'Email Address...' }"
);

fs.writeFileSync(templatesPath, t);
console.log('Fixed email_input type.');
