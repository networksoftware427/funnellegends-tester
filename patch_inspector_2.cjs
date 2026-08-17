const fs = require('fs');

let inspectorPath = 'src/components/builder/InspectorPanel.tsx';
let content = fs.readFileSync(inspectorPath, 'utf8');

const fontOptionsHtml = `
                      <option value="inherit">Inherit Global Font</option>
                      <option value="Outfit">Outfit (Modern Heading)</option>
                      <option value="Inter">Inter (Clean Body)</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Lato">Lato</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Oswald">Oswald</option>
                      <option value="Source Sans Pro">Source Sans Pro</option>
                      <option value="Slabo 27px">Slabo 27px</option>
                      <option value="Raleway">Raleway</option>
                      <option value="PT Sans">PT Sans</option>
                      <option value="Merriweather">Merriweather</option>
                      <option value="Noto Sans">Noto Sans</option>
                      <option value="Nunito">Nunito</option>
                      <option value="Concert One">Concert One</option>
                      <option value="Prompt">Prompt</option>
                      <option value="Work Sans">Work Sans</option>
                      <option value="Fira Sans">Fira Sans</option>
                      <option value="Rubik">Rubik</option>
                      <option value="Mukta">Mukta</option>
                      <option value="Ubuntu">Ubuntu</option>
                      <option value="Lora">Lora</option>
                      <option value="PT Serif">PT Serif</option>
                      <option value="Inconsolata">Inconsolata</option>
                      <option value="Quicksand">Quicksand</option>
                      <option value="Dosis">Dosis</option>
                      <option value="Oxygen">Oxygen</option>
                      <option value="Cabin">Cabin</option>
                      <option value="Anton">Anton</option>
                      <option value="Dancing Script">Dancing Script</option>
                      <option value="Varela Round">Varela Round</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                      <option value="Playfair Display">Playfair Display (Serif)</option>
                      <option value="Fira Code">Fira Code (Mono)</option>`;

const targetCode = `) : propKey === 'buttonLink' && props['buttonAction'] !== 'external_link' ? null : propKey.toLowerCase().includes('color') ? (`;

const replacementCode = `) : propKey === 'buttonLink' && props['buttonAction'] !== 'external_link' ? null : propKey.toLowerCase().includes('color') ? (`;

const oldColorBlockRegex = /\) : propKey\.toLowerCase\(\)\.includes\('color'\) \? \([\s\S]*?\) : propKey === 'shadow' \? \(/;

const newColorBlock = `) : propKey.toLowerCase().includes('color') ? (
                  <div className="flex gap-2 items-center">
                    <input 
                      type="color" 
                      value={typeof props[propKey] === 'string' && props[propKey].startsWith('#') ? props[propKey] : '#ffffff'}
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="w-7 h-7 rounded bg-transparent cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={props[propKey]}
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs font-mono"
                    />
                  </div>
                ) : propKey.toLowerCase().includes('font') || propKey.toLowerCase().includes('family') ? (
                  <select 
                    value={props[propKey] || 'inherit'}
                    onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                  >
${fontOptionsHtml}
                  </select>
                ) : propKey.toLowerCase().includes('size') ? (
                  <input 
                    type="text" 
                    placeholder="e.g. 14px, 16px, 1.5rem"
                    value={props[propKey] || ''}
                    onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 text-xs font-mono"
                  />
                ) : propKey === 'shadow' ? (`;

content = content.replace(oldColorBlockRegex, newColorBlock);

fs.writeFileSync(inspectorPath, content);
console.log('Successfully updated InspectorPanel.tsx Content tab font, color, and size handling!');
