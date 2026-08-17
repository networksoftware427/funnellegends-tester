const fs = require('fs');
let layoutPath = 'src/components/builder/BuilderLayout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

if (!layout.includes(' RowNode,')) {
  layout = layout.replace('SectionNode,', 'SectionNode, RowNode,');
}

fs.writeFileSync(layoutPath, layout);
console.log('BuilderLayout imports fixed.');
