const fs = require('fs');
let templatesPath = 'src/data/initialTemplates.ts';
let t = fs.readFileSync(templatesPath, 'utf8');

t = t.replace('export const createDefaultStyle = (overrides?: Partial<ElementStyle>): ElementStyle => ({', 'export const createDefaultStyle = (overrides?: any): ElementStyle => ({');

fs.writeFileSync(templatesPath, t);
console.log('Fixed createDefaultStyle type.');
