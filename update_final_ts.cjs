const fs = require('fs');

// Fix ElementRenderer type errors
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');
r = r.replace("|| style.borders.borderRadiusTopLeft !== '0px'", "");
r = r.replace(".map(l => l.trim())", ".map((l: string) => l.trim())");
r = r.replace("links.map((link, idx) =>", "links.map((link: string, idx: number) =>");
fs.writeFileSync(rendererPath, r);

// Fix types/builder.ts ElementType
let typesPath = 'src/types/builder.ts';
let t = fs.readFileSync(typesPath, 'utf8');
const oldType = "  | 'video_player'\n  | 'audio_player'";
const newType = "  | 'video_player'\n  | 'audio_player'\n  | 'announcement_bar'\n  | 'footer_block'";
t = t.replace(oldType, newType);
fs.writeFileSync(typesPath, t);

console.log('Fixed TS errors.');
