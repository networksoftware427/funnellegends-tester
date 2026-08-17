const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let t = fs.readFileSync(rendererPath, 'utf8');

const oldCode = `    if (
      style.borders.borderRadiusTopLeft !== '0' ||
      style.borders.borderRadiusTopRight !== '0' ||
      style.borders.borderRadiusBottomRight !== '0' ||
      style.borders.borderRadiusBottomLeft !== '0' ||
      style.borders.borderRadiusTopLeft !== '0px'
    ) {
      containerStyle.overflow = 'hidden';
    }`;

const newCode = `    if (
      (style.borders.borderRadiusTopLeft !== '0' && style.borders.borderRadiusTopLeft !== '0px') ||
      (style.borders.borderRadiusTopRight !== '0' && style.borders.borderRadiusTopRight !== '0px') ||
      (style.borders.borderRadiusBottomRight !== '0' && style.borders.borderRadiusBottomRight !== '0px') ||
      (style.borders.borderRadiusBottomLeft !== '0' && style.borders.borderRadiusBottomLeft !== '0px')
    ) {
      containerStyle.overflow = 'hidden';
    }`;

t = t.replace(oldCode, newCode);
fs.writeFileSync(rendererPath, t);
console.log('Fixed TS error in ElementRenderer.tsx');
