const fs = require('fs');
let typesPath = 'src/types/builder.ts';
let t = fs.readFileSync(typesPath, 'utf8');

t = t.replace('export type ClickPopLayoutVariant = ', "export type ClickPopLayoutVariant = 'flat_click_pop' | ");
t = t.replace(
  "imageUrl?: string;",
  "imageUrl?: string;\n    backgroundColor?: string;\n    textColor?: string;\n    buttonColor?: string;\n    buttonTextColor?: string;\n    fontFamily?: string;"
);

fs.writeFileSync(typesPath, t);
console.log('Added styling properties to ClickPopSettings.');
