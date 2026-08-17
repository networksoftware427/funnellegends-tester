const fs = require('fs');

let inspectorPath = 'src/components/builder/InspectorPanel.tsx';
let content = fs.readFileSync(inspectorPath, 'utf8');

// 1. Ensure catalogItems is imported
if (!content.includes("import { catalogItems }")) {
  content = content.replace(
    "import { ElementNode, ElementStyle, SectionNode, RowNode } from '../../types/builder';",
    "import { ElementNode, ElementStyle, SectionNode, RowNode } from '../../types/builder';\nimport { catalogItems } from './SidebarCatalog';"
  );
}

// 2. Merge defaultProps when reading element props
content = content.replace(
  "const { style, props } = selectedElement;",
  `const { style } = selectedElement;
  const catalogItem = catalogItems.find(item => item.type === selectedElement.type);
  const props = { ...(catalogItem?.defaultProps || {}), ...selectedElement.props };`
);

// 3. Define 35 font options list
const fontOptionsHtml = `
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

// Replace Styles tab font select
const oldStylesSelectRegex = /<select\s+value=\{style\.typography\.fontFamily\}[\s\S]*?<\/select>/;
const newStylesSelect = `<select 
                  value={style.typography.fontFamily}
                  onChange={(e) => handleTypoChange('fontFamily', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5"
                >${fontOptionsHtml}
                </select>`;

content = content.replace(oldStylesSelectRegex, newStylesSelect);

fs.writeFileSync(inspectorPath, content);
console.log('Successfully updated InspectorPanel.tsx imports, props merging, and Styles tab fonts!');
