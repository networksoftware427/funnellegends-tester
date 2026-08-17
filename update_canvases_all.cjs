const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

t = t.replaceAll("{ id: 's1', name: 'Squeeze Page', slug: 'squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }", "{ id: 's1', name: 'Squeeze Page', slug: 'squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createSqueezeCanvas() }");
t = t.replaceAll("{ id: 's1', name: 'Reverse Squeeze Page', slug: 'reverse-squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }", "{ id: 's1', name: 'Reverse Squeeze Page', slug: 'reverse-squeeze', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createReverseSqueezeCanvas() }");
t = t.replaceAll("{ id: 's1', name: 'Lead Magnet Page', slug: 'optin', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createDemoSalesCanvas() }", "{ id: 's1', name: 'Lead Magnet Page', slug: 'optin', stepOrder: 1, stepType: 'OptIn', status: 'Published', canvasState: createLeadMagnetCanvas() }");

fs.writeFileSync(templatesPath, t);
console.log('Replaced all occurrences of squeeze pages with specific canvases.');
