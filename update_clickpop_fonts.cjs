const fs = require('fs');
let modalPath = 'src/components/builder/ClickPopConfigModal.tsx';
let t = fs.readFileSync(modalPath, 'utf8');

t = t.replace('<option value="Inter">Inter</option>', '<option value="Open Sans">Open Sans</option>');
t = t.replace('<option value="Outfit">Outfit</option>', '<option value="Montserrat">Montserrat</option>');
t = t.replace('<option value="Roboto">Roboto</option>', '<option value="Lato">Lato</option>');
t = t.replace("formData.fontFamily || 'Inter'", "formData.fontFamily || 'Open Sans'");

fs.writeFileSync(modalPath, t);
console.log('Updated font options in ClickPopConfigModal.');
