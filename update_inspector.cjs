const fs = require('fs');

// 1. Update SidebarCatalog
let catalogPath = 'src/components/builder/SidebarCatalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');

catalog = catalog.replace(
  "buttonColor: '#4f46e5', buttonHoverColor: '#4338ca', borderColor: 'transparent', iconName: '', shadow: 'lg'",
  "buttonColor: '#4f46e5', buttonHoverColor: '#4338ca', borderColor: 'transparent', iconName: '', shadow: 'lg', buttonAction: 'next_step', buttonLink: ''"
);

fs.writeFileSync(catalogPath, catalog);
console.log('SidebarCatalog updated for button actions.');

// 2. Update InspectorPanel
let panelPath = 'src/components/builder/InspectorPanel.tsx';
let panel = fs.readFileSync(panelPath, 'utf8');

// Fix scrolling for the root wrappers
panel = panel.replace(/className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full text-slate-100 overflow-y-auto"/g, 'className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full text-slate-100 shrink-0"');

// Fix scrolling for the content area
panel = panel.replace(/<div className="p-4 space-y-5 text-xs">/g, '<div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs pb-32">');
panel = panel.replace(/<div className="p-4 space-y-4 text-xs">/g, '<div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs pb-32">');

// Intercept buttonAction for dropdowns
const actionSelectJSX = `
                  ) : propKey === 'buttonAction' ? (
                    <select
                      value={props[propKey]}
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                    >
                      <option value="next_step">Move to Next Step in Funnel</option>
                      <option value="submit_form">Submit Form Data</option>
                      <option value="open_popup">Open ClickPop (Popup)</option>
                      <option value="external_link">Go to Website URL</option>
                    </select>
                  ) : propKey === 'buttonLink' && props['buttonAction'] === 'external_link' ? (
                    <input 
                      type="text" 
                      value={props[propKey]} 
                      onChange={(e) => onUpdateElementProps({ ...props, [propKey]: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100"
                      placeholder="https://..."
                    />
                  ) : propKey === 'buttonLink' && props['buttonAction'] !== 'external_link' ? null : propKey.toLowerCase().includes('color') ? (`;

panel = panel.replace(
  ") : propKey.toLowerCase().includes('color') ? (",
  actionSelectJSX
);

fs.writeFileSync(panelPath, panel);
console.log('InspectorPanel updated for scrolling and button actions.');
