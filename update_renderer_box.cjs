const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

// Replace h-auto with h-full for images to respect box model height
r = r.replace(/h-auto/g, 'h-full');

fs.writeFileSync(rendererPath, r);
console.log('Fixed Image Box Model Height.');
