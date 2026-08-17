const fs = require('fs');
let modalPath = 'src/components/builder/ClickPopConfigModal.tsx';
let t = fs.readFileSync(modalPath, 'utf8');

const stylingControls = `
                {/* Styling Controls */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <h4 className="font-bold text-slate-100">Styling & Colors</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Background Color:</label>
                      <input 
                        type="color" 
                        value={formData.backgroundColor || '#ffffff'}
                        onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                        className="w-full h-8 bg-slate-950 border border-slate-800 rounded px-1 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Text Color:</label>
                      <input 
                        type="color" 
                        value={formData.textColor || '#0f172a'}
                        onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                        className="w-full h-8 bg-slate-950 border border-slate-800 rounded px-1 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Button Color:</label>
                      <input 
                        type="color" 
                        value={formData.buttonColor || '#2563eb'}
                        onChange={(e) => setFormData({ ...formData, buttonColor: e.target.value })}
                        className="w-full h-8 bg-slate-950 border border-slate-800 rounded px-1 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Button Text Color:</label>
                      <input 
                        type="color" 
                        value={formData.buttonTextColor || '#ffffff'}
                        onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                        className="w-full h-8 bg-slate-950 border border-slate-800 rounded px-1 cursor-pointer"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block font-semibold text-slate-300 mb-1">Font Family:</label>
                      <select 
                        value={formData.fontFamily || 'Inter'}
                        onChange={(e) => setFormData({ ...formData, fontFamily: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Outfit">Outfit</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Poppins">Poppins</option>
                        <option value="sans-serif">System Sans</option>
                      </select>
                    </div>
                  </div>
                </div>
`;

t = t.replace(
  '</div>\n              </form>',
  stylingControls + '\n                </div>\n              </form>'
);

fs.writeFileSync(modalPath, t);
console.log('Added styling controls to ClickPopConfigModal.');
