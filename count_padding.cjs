const fs = require('fs');
let p = fs.readFileSync('src/components/builder/InspectorPanel.tsx', 'utf8');

const paddingMatches = p.match(/paddingLeft/g);
console.log(`Found paddingLeft ${paddingMatches ? paddingMatches.length : 0} times.`);

