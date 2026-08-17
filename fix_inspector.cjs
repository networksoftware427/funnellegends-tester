const fs = require('fs');
let p = fs.readFileSync('src/components/builder/InspectorPanel.tsx', 'utf8');

const lines = p.split('\n');

// Find the line where the error happened, and remove the block
// Looking at the view_file from before, line 166 had the background overlay color in selectedRow.
// The paddingBlockTarget matched something in selectedRow? No, selectedRow didn't have paddingLeft.
// But selectedSection did! Wait, selectedSection had paddingLeft? No, selectedSection has paddingTop/paddingBottom.
// So why did the replace put it at line 166? 
// Let's just search for the block string and remove it if it occurs before line 400.

let firstOccur = p.indexOf('Block Position (Alignment)');
if (firstOccur !== -1 && firstOccur < p.indexOf('if (!selectedElement)')) {
  // We have a bad insertion before selectedElement logic!
  const regex = /<div className="space-y-2 pt-2 border-t border-slate-800 mt-2">[\s\S]*?<\/select>\s*<\/div>/;
  const match = p.match(regex);
  if (match) {
    p = p.replace(match[0], '');
    fs.writeFileSync('src/components/builder/InspectorPanel.tsx', p);
    console.log('Removed bad block insertion.');
  } else {
    console.log('Regex match failed.');
  }
} else {
  console.log('No bad insertion found before selectedElement.');
}

