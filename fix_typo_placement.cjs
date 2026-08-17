const fs = require('fs');
let p = fs.readFileSync('src/components/builder/InspectorPanel.tsx', 'utf8');

const typoBlock = `              <div>
                <label className="block text-slate-400 mb-1">Text Alignment</label>
                <select 
                  value={style.typography.textAlign || 'left'}
                  onChange={(e) => handleTypoChange('textAlign', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
`;

// Remove the wrongly placed typo block
p = p.replace(typoBlock + '\n', '');
p = p.replace(typoBlock, '');

// Now inject it after Font Weight where it belongs. Let's find the correct Font Weight block.
const correctTarget = `<option value="800">800 (ExtraBold)</option>
                  </select>
                </div>
              </div>`;

if (p.includes(correctTarget)) {
  p = p.replace(correctTarget, correctTarget + '\n\n' + typoBlock);
  console.log('Successfully moved Text Alignment.');
} else {
  console.log('Could not find correct target.');
}

fs.writeFileSync('src/components/builder/InspectorPanel.tsx', p);
