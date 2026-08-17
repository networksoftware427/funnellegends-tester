const fs = require('fs');
let overlayPath = 'src/components/builder/ClickPopOverlay.tsx';
let t = fs.readFileSync(overlayPath, 'utf8');

const flatClickPopVariant = `
        {/* VARIANT: FLAT CLICK POP */}
        {layoutVariant === 'flat_click_pop' && (
          <div 
            className="rounded-xl overflow-hidden shadow-2xl p-8 space-y-6 text-center relative max-w-md mx-auto"
            style={{ 
              backgroundColor: settings.backgroundColor || '#ffffff',
              color: settings.textColor || '#0f172a',
              fontFamily: settings.fontFamily || 'Inter'
            }}
          >
            <button onClick={onClose} className="absolute top-3 right-3 z-20 p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            {settings.imageUrl && (
              <img src={settings.imageUrl} alt="Logo" className="h-12 mx-auto mb-4 object-contain" />
            )}
            
            <h2 className="text-2xl font-black leading-tight" style={{ color: settings.textColor || '#1e40af' }}>
              {settings.title}
            </h2>
            
            {!isSubmitted ? (
              <form onSubmit={handleOptinSubmit} className="space-y-4 pt-2">
                <input 
                  type="email" 
                  required 
                  placeholder="Email Address" 
                  value={emailInput} 
                  onChange={(e) => setEmailInput(e.target.value)} 
                  className="w-full bg-white border border-slate-300 outline-none rounded-md px-4 py-3 text-sm text-slate-900 transition-all"
                  style={{ fontFamily: settings.fontFamily || 'Inter' }}
                />
                <button 
                  type="submit" 
                  className="w-full font-bold py-3 px-4 rounded-md text-sm shadow-md transition-all hover:opacity-90"
                  style={{
                    backgroundColor: settings.buttonColor || '#2563eb',
                    color: settings.buttonTextColor || '#ffffff',
                    fontFamily: settings.fontFamily || 'Inter'
                  }}
                >
                  {settings.buttonText}
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Success!</h4>
              </div>
            )}
          </div>
        )}
`;

t = t.replace("{layoutVariant === 'default' && (", flatClickPopVariant + "\n        {layoutVariant === 'default' && (");

fs.writeFileSync(overlayPath, t);
console.log('Added flat_click_pop variant to ClickPopOverlay.');
