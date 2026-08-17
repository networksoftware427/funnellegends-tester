const fs = require('fs');
let typesPath = 'src/types/builder.ts';
let t = fs.readFileSync(typesPath, 'utf8');

t = t.replace(
  "export type ClickPopLayoutVariant = 'flat_click_pop' | \r\n  | 'default'",
  "export type ClickPopLayoutVariant = 'flat_click_pop' | 'default'"
);
t = t.replace(
  "export type ClickPopLayoutVariant = 'flat_click_pop' | \n  | 'default'",
  "export type ClickPopLayoutVariant = 'flat_click_pop' | 'default'"
);

fs.writeFileSync(typesPath, t);
console.log('Fixed syntax error in builder.ts.');
