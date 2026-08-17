const fs = require('fs');
let sidebarPath = 'src/components/builder/SidebarCatalog.tsx';
let rendererPath = 'src/components/builder/ElementRenderer.tsx';

let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
let rendererContent = fs.readFileSync(rendererPath, 'utf8');

const regex = /type:\s*'([^']+)'/g;
let match;
let missing = [];

while ((match = regex.exec(sidebarContent)) !== null) {
  let type = match[1];
  if (!rendererContent.includes(`case '${type}':`)) {
    missing.push(type);
  }
}

if (missing.length > 0) {
  console.log('Missing implementations for:', missing);
} else {
  console.log('All catalog elements are implemented in ElementRenderer.');
}
