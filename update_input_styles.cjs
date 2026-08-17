const fs = require('fs');
let r = fs.readFileSync('src/components/builder/ElementRenderer.tsx', 'utf8');

const target = `style={{ color: props.fieldTextColor || undefined }}`;
const replacement = `style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }}`;

if (r.includes(target)) {
  r = r.replaceAll(target, replacement);
  fs.writeFileSync('src/components/builder/ElementRenderer.tsx', r);
  console.log('Successfully added textAlign: inherit to form inputs.');
} else {
  console.log('Target string not found.');
}
