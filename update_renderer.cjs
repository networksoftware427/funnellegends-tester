const fs = require('fs');
const rendererPath = 'src/components/builder/ElementRenderer.tsx';
let renderer = fs.readFileSync(rendererPath, 'utf8');

// Update containerStyle for formBgColor and formShadow
renderer = renderer.replace(
  "backgroundColor: style.background.bgType === 'color' ? style.background.backgroundColor : undefined,",
  "backgroundColor: (props.formBgColor && props.formBgColor !== 'transparent') ? props.formBgColor : (style.background.bgType === 'color' ? style.background.backgroundColor : undefined),"
);

renderer = renderer.replace(
  "boxShadow: style.effects.boxShadow !== 'none' ? style.effects.boxShadow : undefined,",
  "boxShadow: (props.formShadow && props.formShadow !== 'none') ? `var(--tw-shadow-${props.formShadow === 'sm' ? 'sm' : props.formShadow === 'md' ? 'md' : props.formShadow === 'lg' ? 'lg' : props.formShadow === 'xl' ? 'xl' : props.formShadow === '2xl' ? '2xl' : 'none'})` : (style.effects.boxShadow !== 'none' ? style.effects.boxShadow : undefined),"
);

// Inject fieldTextColor into <input>, <textarea>, and <select>
renderer = renderer.replace(/<(input|textarea|select)\b([^>]*)>/g, (match, tag, p1) => {
  if (match.includes('type="radio"') || match.includes('type="checkbox"')) return match;
  if (match.includes('style={{')) {
    // If it already has style, it's tricky, just skip or carefully inject
    if (match.includes('color: props.fieldTextColor')) return match;
    return `<${tag}${p1.replace('style={{', 'style={{ color: props.fieldTextColor || undefined, ')}>`;
  }
  
  // Replace self closing input
  if (match.endsWith('/>')) {
     return `<${tag}${p1.slice(0, -2)} style={{ color: props.fieldTextColor || undefined }} />`;
  }
  
  return `<${tag}${p1} style={{ color: props.fieldTextColor || undefined }}>`;
});

fs.writeFileSync(rendererPath, renderer);
console.log('ElementRenderer updated.');
