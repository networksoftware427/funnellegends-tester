const fs = require('fs');
let panelPath = 'src/components/builder/InspectorPanel.tsx';
let panel = fs.readFileSync(panelPath, 'utf8');

const alignUI = [
  '                <div>',
  '                  <label className="block text-slate-400 mb-1">Text Alignment</label>',
  '                  <div className="flex border border-slate-800 rounded bg-slate-950 overflow-hidden">',
  "                    {['left', 'center', 'right', 'justify'].map((align) => (",
  '                      <button',
  '                        key={align}',
  "                        onClick={() => handleTypoChange('textAlign', align)}",
  "                        className={`flex-1 py-1.5 text-[10px] uppercase font-bold transition-colors ${style.typography.textAlign === align ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}",
  '                      >',
  '                        {align}',
  '                      </button>',
  '                    ))}',
  '                  </div>',
  '                </div>'
].join('\n');

if (!panel.includes('Text Alignment')) {
  panel = panel.replace(
    '<div className="flex items-center justify-between">\n                  <span className="text-slate-400">Gradient Text Fill</span>',
    alignUI + '\n                <div className="flex items-center justify-between">\n                  <span className="text-slate-400">Gradient Text Fill</span>'
  );
}

fs.writeFileSync(panelPath, panel);
console.log('Added Text Alignment UI');
