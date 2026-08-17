const fs = require('fs');

let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let content = fs.readFileSync(rendererPath, 'utf8');

content = content.replaceAll(
  "onMouseOut={(e) => e.currentTarget.style.backgroundColor = btnStyle.backgroundColor}",
  "onMouseOut={(e) => e.currentTarget.style.backgroundColor = (btnStyle.backgroundColor as string) || '#22c55e'}"
);

fs.writeFileSync(rendererPath, content);
console.log('Fixed button style mouseOut type error in ElementRenderer.tsx');
