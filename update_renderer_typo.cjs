const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

// Strip typography classes from standard text elements
// Headline
r = r.replace('className="bg-clip-text text-transparent outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"', 'className="bg-clip-text text-transparent outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"'); // nothing to strip
r = r.replace('className="outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 opacity-90"', 'className="outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"');
// Paragraph
r = r.replace('className="outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 text-slate-300 leading-relaxed"', 'className="outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"');
r = r.replace('className="outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 text-slate-300 leading-relaxed min-h-[60px]"', 'className="outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 min-h-[60px]"');
r = r.replace('className="text-slate-300 leading-relaxed"', 'className=""');

// Bullet List
r = r.replace('className="flex items-start gap-2.5 text-slate-200"', 'className="flex items-start gap-2.5"');
r = r.replace('className="flex items-start gap-3 text-slate-200"', 'className="flex items-start gap-3"');

// Quote Block
r = r.replace('className="border-l-4 border-indigo-500 pl-4 py-2 italic text-slate-300 bg-slate-900/60 rounded-r-lg"', 'className="border-l-4 border-indigo-500 pl-4 py-2 italic bg-slate-900/60 rounded-r-lg"');

// Button
r = r.replace('className="text-lg md:text-xl text-center leading-tight drop-shadow-sm"', 'className="text-center leading-tight drop-shadow-sm"');

fs.writeFileSync(rendererPath, r);
console.log('Stripped typography classes from ElementRenderer');
