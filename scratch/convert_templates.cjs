const fs = require('fs');
const path = require('path');

const files = [
  'c:/Users/businessman2026/Desktop/Softwares/funnellegends tester/src/data/initialTemplates.ts',
  'c:/Users/businessman2026/Desktop/Softwares/funnellegends tester/src/data/websiteTemplates.ts'
];

const replacements = [
  // Background colors
  { from: /#0f172a/gi, to: '#ffffff' }, // bg-slate-900 -> white
  { from: /#1e293b/gi, to: '#f8fafc' }, // bg-slate-800 -> slate-50
  { from: /#020617/gi, to: '#f1f5f9' }, // bg-slate-950 -> slate-100
  { from: /#1e1b4b/gi, to: '#f0fdf4' }, // indigo-950 -> green-50

  // Text colors (since bg is white now, white text becomes dark)
  { from: /#f8fafc/gi, to: '#0f172a' }, // text-slate-50 -> slate-900
  { from: /#f1f5f9/gi, to: '#1e293b' }, // text-slate-100 -> slate-800
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    
    // We have to be slightly careful not to replace text colors on buttons.
    // However, the initial templates heavily rely on these hex codes for section bgs and global tokens.
    // Let's just do a blanket replace for the templates, which will flip the dark theme templates to light theme templates.
    for (const rule of replacements) {
      newContent = newContent.replace(rule.from, rule.to);
    }

    if (content !== newContent) {
      fs.writeFileSync(file, newContent);
      console.log('Updated:', file);
    }
  }
});
