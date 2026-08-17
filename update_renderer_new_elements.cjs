const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

const newCases = `
    case 'announcement_bar':
      return (
        <div style={containerStyle} onClick={onSelect} className={\`element-node relative \${isInteractiveMode ? 'preview-element-clean' : ''} \${isSelected ? 'is-selected' : ''}\`}>
          <div 
            style={{ backgroundColor: props.barColor || '#ef4444' }} 
            className="w-full px-4 py-2.5 flex items-center justify-center text-center shadow-md cursor-pointer hover:opacity-90 transition-opacity"
          >
            <a 
              href={props.linkUrl || '#'} 
              style={{ color: props.textColor || '#ffffff' }} 
              className="font-bold text-sm md:text-base flex items-center gap-2"
              onClick={(e) => { if (!isInteractiveMode) e.preventDefault(); }}
            >
              <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
              <span>{props.text || 'FLASH SALE: Get 50% Off All Plans Today Only!'}</span>
            </a>
          </div>
        </div>
      );

    case 'footer_block':
      const links = (props.menuLinks || 'Home, About, Terms, Privacy').split(',').map(l => l.trim());
      return (
        <div style={containerStyle} onClick={onSelect} className={\`element-node relative \${isInteractiveMode ? 'preview-element-clean' : ''} \${isSelected ? 'is-selected' : ''}\`}>
          <footer className="w-full bg-slate-950 border-t border-slate-800 py-12 px-6 flex flex-col items-center justify-center space-y-6">
            
            {props.showMenu !== false && (
              <nav className="flex flex-wrap items-center justify-center gap-6">
                {links.map((link, idx) => (
                  <a key={idx} href="#" className="text-sm font-semibold text-slate-400 hover:text-indigo-400 transition-colors" onClick={(e) => e.preventDefault()}>
                    {link}
                  </a>
                ))}
              </nav>
            )}

            {props.showSocials !== false && (
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500 transition-colors" onClick={(e) => e.preventDefault()}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500 transition-colors" onClick={(e) => e.preventDefault()}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500 transition-colors" onClick={(e) => e.preventDefault()}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            )}

            <div className="text-xs text-slate-500 font-medium">
              {props.copyrightText || '© 2026 Funnel Legends. All Rights Reserved.'}
            </div>

          </footer>
        </div>
      );

`;

if (!r.includes("case 'footer_block':")) {
  r = r.replace(
    "    case 'custom_html':",
    newCases + "    case 'custom_html':"
  );
  fs.writeFileSync(rendererPath, r);
  console.log('Added footer and announcement bar elements to ElementRenderer.');
} else {
  console.log('Elements already exist.');
}
