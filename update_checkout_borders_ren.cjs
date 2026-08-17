const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

const targetStr = `      const btnStyle = {
        backgroundColor: props.buttonColor || '#22c55e',
        color: props.buttonTextColor || '#ffffff',
        fontFamily: props.buttonFontFamily || undefined,
        fontSize: props.buttonFontSize || '14px',
        fontWeight: props.buttonFontWeight || '700'
      };`;

const newStr = `      const btnStyle = {
        backgroundColor: props.buttonColor || '#22c55e',
        color: props.buttonTextColor || '#ffffff',
        fontFamily: props.buttonFontFamily || undefined,
        fontSize: props.buttonFontSize || '14px',
        fontWeight: props.buttonFontWeight || '700',
        borderRadius: props.buttonBorderRadius || '12px',
        borderWidth: props.buttonBorderWidth || '0px',
        borderColor: props.buttonBorderColor || 'transparent',
        borderStyle: props.buttonBorderWidth && props.buttonBorderWidth !== '0px' && props.buttonBorderWidth !== '0' ? 'solid' : 'none'
      };`;

if (r.includes(targetStr)) {
  r = r.replace(targetStr, newStr);
  
  // also need to remove rounded-xl from the two_step_checkout buttons so it doesn't conflict
  // But wait, the previous update_two_step.cjs hardcoded rounded-xl on the buttons. Let's remove them dynamically.
  // Actually, I can just rely on the style object replacing the Tailwind class because inline styles take precedence!
  fs.writeFileSync(rendererPath, r);
  console.log('ElementRenderer updated for 2-step checkout button borders.');
} else {
  console.log('Target string not found in ElementRenderer.tsx.');
}
