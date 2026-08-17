const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

// Add overflow: hidden dynamically
const overflowLogic = `
    if (
      style.borders.borderRadiusTopLeft !== '0' ||
      style.borders.borderRadiusTopRight !== '0' ||
      style.borders.borderRadiusBottomRight !== '0' ||
      style.borders.borderRadiusBottomLeft !== '0' ||
      style.borders.borderRadiusTopLeft !== '0px'
    ) {
      containerStyle.overflow = 'hidden';
    }
`;

if (!r.includes("containerStyle.overflow = 'hidden'")) {
  r = r.replace(
    "const handleContentBlur = (e: React.FocusEvent<HTMLElement>) => {",
    overflowLogic + "\n    const handleContentBlur = (e: React.FocusEvent<HTMLElement>) => {"
  );
}

// Strip hardcoded border-radius classes from core media/buttons
r = r.replace(/rounded-xl/g, '');
r = r.replace(/rounded-lg/g, '');
r = r.replace(/rounded-2xl/g, '');
r = r.replace(/rounded-md/g, '');
r = r.replace(/rounded/g, '');

fs.writeFileSync(rendererPath, r);
console.log('Fixed Box Model and Border Radius overflow logic.');
