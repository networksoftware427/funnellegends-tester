const fs = require('fs');
let inspectorPath = 'src/components/builder/InspectorPanel.tsx';
let t = fs.readFileSync(inspectorPath, 'utf8');

const oldBlock = `<option value="Outfit">Outfit (Modern Heading)</option>
                    <option value="Inter">Inter (Clean Body)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                    <option value="Playfair Display">Playfair Display (Serif)</option>
                    <option value="Fira Code">Fira Code (Mono)</option>`;

const newBlock = `<option value="Outfit">Outfit (Modern Heading)</option>
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

t = t.replace(oldBlock, newBlock);

fs.writeFileSync(inspectorPath, t);
console.log('Replaced fonts in InspectorPanel.tsx');
