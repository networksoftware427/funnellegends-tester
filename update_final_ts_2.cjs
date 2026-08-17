const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

r = r.replaceAll("|| style.borders.borderRadiusTopLeft !== '0px'", "");

fs.writeFileSync(rendererPath, r);
console.log('Fixed TS error for good.');
