const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

// 1. Add hex opacity support to containerStyle
const bgAssignmentOriginal = "backgroundColor: (props.formBgColor && props.formBgColor !== 'transparent') ? props.formBgColor : (style.background.bgType === 'color' ? style.background.backgroundColor : undefined),";
const bgAssignmentNew = `backgroundColor: (props.formBgColor && props.formBgColor !== 'transparent') ? (props.formBgColor.startsWith('#') && props.formBgOpacity !== undefined ? props.formBgColor.substring(0,7) + Math.round((props.formBgOpacity / 100) * 255).toString(16).padStart(2, '0') : props.formBgColor) : (style.background.bgType === 'color' ? style.background.backgroundColor : undefined),`;
if (r.includes(bgAssignmentOriginal)) {
  r = r.replace(bgAssignmentOriginal, bgAssignmentNew);
}

fs.writeFileSync(rendererPath, r);
console.log('Added formBgOpacity logic.');
