const fs = require('fs');
let overlayPath = 'src/components/builder/ClickPopOverlay.tsx';
let t = fs.readFileSync(overlayPath, 'utf8');

t = t.replaceAll("fontFamily: settings.fontFamily || 'Inter'", "fontFamily: settings.fontFamily || 'Open Sans'");

fs.writeFileSync(overlayPath, t);
console.log('Updated font fallback in ClickPopOverlay.');
