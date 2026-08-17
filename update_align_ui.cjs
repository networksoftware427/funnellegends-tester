const fs = require('fs');

// 1. Update ElementRenderer.tsx to remove text-left
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');
r = r.replaceAll(' text-left ', ' ');
r = r.replaceAll(' text-left"', '"');
r = r.replaceAll('"text-left ', '"');
r = r.replaceAll(' text-left}', '}');
fs.writeFileSync(rendererPath, r);

// 2. Update InspectorPanel.tsx
let panelPath = 'src/components/builder/InspectorPanel.tsx';
let p = fs.readFileSync(panelPath, 'utf8');

const typographyBlock = `              <div>
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

// Insert Text Alignment after Font Weight block
const fontWeightTarget = `</select>
                </div>
              </div>`;

if (p.includes(fontWeightTarget)) {
  p = p.replace(fontWeightTarget, fontWeightTarget + '\n\n' + typographyBlock);
}

const blockAlignBlock = `
              <div className="space-y-2 pt-2 border-t border-slate-800 mt-2">
                <label className="block text-[11px] text-slate-400 font-medium">Block Position (Alignment)</label>
                <select 
                  value={
                    style.boxModel.marginLeft === 'auto' && style.boxModel.marginRight === 'auto' ? 'center' :
                    style.boxModel.marginLeft === 'auto' ? 'right' : 'left'
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'center') {
                      onUpdateElementStyle({
                        ...style,
                        boxModel: { ...style.boxModel, marginLeft: 'auto', marginRight: 'auto' }
                      });
                    } else if (val === 'right') {
                      onUpdateElementStyle({
                        ...style,
                        boxModel: { ...style.boxModel, marginLeft: 'auto', marginRight: '0px' }
                      });
                    } else {
                      onUpdateElementStyle({
                        ...style,
                        boxModel: { ...style.boxModel, marginLeft: '0px', marginRight: 'auto' }
                      });
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200"
                >
                  <option value="left">Align Left</option>
                  <option value="center">Align Center</option>
                  <option value="right">Align Right</option>
                </select>
              </div>
`;

// Insert Block Alignment at the end of Box Model section
const paddingBlockTarget = `                  <input type="text" placeholder="L" value={style.boxModel.paddingLeft} onChange={(e) => handleBoxChange('paddingLeft', e.target.value)} className="bg-slate-950 border border-slate-800 rounded px-1.5 py-1" />
                </div>
              </div>`;

if (p.includes(paddingBlockTarget)) {
  p = p.replace(paddingBlockTarget, paddingBlockTarget + blockAlignBlock);
}

fs.writeFileSync(panelPath, p);

console.log('Successfully added alignment UI and removed text-left hardcoding.');
