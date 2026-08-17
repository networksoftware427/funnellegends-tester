const fs = require('fs');
let r = fs.readFileSync('src/components/builder/ElementRenderer.tsx', 'utf8');

const matches = r.match(/text-left/g);
console.log(`Found ${matches ? matches.length : 0} instances of text-left.`);
