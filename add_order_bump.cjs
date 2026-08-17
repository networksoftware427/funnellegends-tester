const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let t = fs.readFileSync(rendererPath, 'utf8');

const orderBumpBlock = `
    case 'order_bump':
      return (
        <div style={containerStyle} onClick={onSelect} className={\`element-node relative \${isInteractiveMode ? 'preview-element-clean' : ''} \${isSelected ? 'is-selected' : ''}\`}>
          <div className="border-2 border-dashed border-red-500 bg-red-50/10 p-4 rounded-lg flex gap-4 items-start cursor-pointer transition-colors hover:bg-red-500/10">
            <input type="checkbox" className="mt-1 w-5 h-5 accent-red-600" />
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-400">?? Yes, I want the {props.bumpName || 'VIP Bonus'}!</span>
                <span className="text-white font-bold ml-auto">{props.bumpPrice || '+$27.00'}</span>
              </div>
              <p className="text-sm text-slate-300 mt-1">{props.bumpDescription || 'Add this exclusive bonus to your order right now and get instant access.'}</p>
            </div>
          </div>
        </div>
      );
`;

t = t.replace("case 'one_click_upsell':", orderBumpBlock + "    case 'one_click_upsell':");
fs.writeFileSync(rendererPath, t);
console.log('Added order_bump to ElementRenderer.');
