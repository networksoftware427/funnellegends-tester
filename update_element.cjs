const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let t = fs.readFileSync(rendererPath, 'utf8');

const oldBlock = `
    case 'two_step_checkout':
      const titleStyle = {
        color: props.titleColor || undefined,
        fontFamily: props.titleFontFamily || undefined
      };
      const btnStyle = {
        backgroundColor: props.buttonColor || '#22c55e',
        color: props.buttonTextColor || '#ffffff',
        fontFamily: props.buttonFontFamily || undefined,
        fontSize: props.buttonFontSize || '14px',
        fontWeight: props.buttonFontWeight || '700',
        borderRadius: props.buttonBorderRadius || '12px',
        borderWidth: props.buttonBorderWidth || '0px',
        borderColor: props.buttonBorderColor || 'transparent',
        borderStyle: props.buttonBorderWidth && props.buttonBorderWidth !== '0px' && props.buttonBorderWidth !== '0' ? 'solid' : 'none'
      };
      return (
        <div style={containerStyle} onClick={onSelect} className={\`element-node relative \${isInteractiveMode ? 'preview-element-clean' : ''} space-y-4 \${isSelected ? 'is-selected' : ''}\`}>
          {/* Step tabs */}
          <div className="flex border-b border-slate-800">
            <button 
              onClick={() => setStep(1)} 
              className={\`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors \${step === 1 ? 'border-indigo-500 bg-slate-800/40' : 'border-transparent opacity-60'}\`}
              style={titleStyle}
            >
              1. Contact Info
            </button>
            <button 
              onClick={() => setStep(2)} 
              className={\`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors \${step === 2 ? 'border-indigo-500 bg-slate-800/40' : 'border-transparent opacity-60'}\`}
              style={titleStyle}
            >
              2. Payment & Complete
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={titleStyle}>Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={titleStyle}>Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <button 
                onClick={() => setStep(2)} 
                className="w-full transition-all shadow-lg flex items-center justify-center gap-2 mt-4 py-3"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = props.buttonColor || '#22c55e')}
              >
                <span>{props.buttonText || 'GO TO STEP 2'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 border border-slate-800 rounded bg-slate-950/50 space-y-2">
                <div className="flex justify-between font-bold text-sm" style={{ color: props.titleColor || undefined }}>
                  <span>{props.productName || 'Product'}</span>
                  <span>{props.price || '$97.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 border-t border-slate-800 pt-2">
                  <span>Total</span>
                  <span className="font-bold text-slate-200" style={{ color: props.titleColor || undefined }}>{props.price || '$97.00'}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={titleStyle}>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-slate-200" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold mb-1" style={titleStyle}>Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-slate-200" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold mb-1" style={titleStyle}>CVC</label>
                  <input type="text" placeholder="123" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-mono text-slate-200" style={{ color: props.fieldTextColor || undefined, textAlign: 'inherit' }} />
                </div>
              </div>
              <button 
                className="w-full transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 mt-4 py-3"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = props.buttonColor || '#22c55e')}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{props.buttonText || 'COMPLETE ORDER'}</span>
              </button>
            </div>
          )}
        </div>
      );
`;

const newBlock = `
    case 'two_step_checkout':
      const titleStyle = {
        color: props.titleColor || undefined,
        fontFamily: props.titleFontFamily || undefined,
        fontSize: props.titleFontSize || undefined
      };
      const fieldStyle = {
        backgroundColor: props.fieldBgColor || '#020617', // slate-950
        color: props.fieldTextColor || undefined,
        fontFamily: props.fieldFontFamily || undefined,
        fontSize: props.fieldFontSize || undefined,
        borderColor: props.fieldBorderColor || '#1e293b', // slate-800
        textAlign: 'inherit' as any
      };
      const btnStyle = {
        backgroundColor: props.buttonColor || '#22c55e',
        color: props.buttonTextColor || '#ffffff',
        fontFamily: props.buttonFontFamily || undefined,
        fontSize: props.buttonFontSize || '14px',
        fontWeight: props.buttonFontWeight || '700',
        borderRadius: props.buttonBorderRadius || '12px',
        borderWidth: props.buttonBorderWidth || '0px',
        borderColor: props.buttonBorderColor || 'transparent',
        borderStyle: props.buttonBorderWidth && props.buttonBorderWidth !== '0px' && props.buttonBorderWidth !== '0' ? 'solid' : 'none'
      };
      
      const formContainerStyle = {
        ...containerStyle,
        backgroundColor: props.formBgColor || containerStyle.backgroundColor,
        padding: props.formPadding || '24px',
        borderRadius: props.formBorderRadius || '8px',
        border: \`1px solid \${props.formBorderColor || 'transparent'}\`
      };

      return (
        <div style={formContainerStyle} onClick={onSelect} className={\`element-node relative \${isInteractiveMode ? 'preview-element-clean' : ''} space-y-4 \${isSelected ? 'is-selected' : ''}\`}>
          {/* Step tabs */}
          <div className="flex border-b" style={{ borderColor: props.fieldBorderColor || '#1e293b' }}>
            <button 
              onClick={() => setStep(1)} 
              className={\`flex-1 py-3 font-bold text-center border-b-2 transition-colors\`}
              style={{ ...titleStyle, borderBottomColor: step === 1 ? (props.buttonColor || '#6366f1') : 'transparent', opacity: step === 1 ? 1 : 0.6 }}
            >
              1. Contact Info
            </button>
            <button 
              onClick={() => setStep(2)} 
              className={\`flex-1 py-3 font-bold text-center border-b-2 transition-colors\`}
              style={{ ...titleStyle, borderBottomColor: step === 2 ? (props.buttonColor || '#6366f1') : 'transparent', opacity: step === 2 ? 1 : 0.6 }}
            >
              2. Payment & Complete
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1" style={titleStyle}>Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full border px-3 py-2 rounded" style={fieldStyle} />
              </div>
              <div>
                <label className="block font-semibold mb-1" style={titleStyle}>Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full border px-3 py-2 rounded" style={fieldStyle} />
              </div>
              <button 
                onClick={() => setStep(2)} 
                className="w-full transition-all shadow-lg flex items-center justify-center gap-2 mt-4 py-3"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = props.buttonColor || '#22c55e')}
              >
                <span>{props.buttonText || 'GO TO STEP 2'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 border rounded space-y-2" style={{ backgroundColor: props.fieldBgColor || '#020617', borderColor: props.fieldBorderColor || '#1e293b' }}>
                <div className="flex justify-between font-bold" style={titleStyle}>
                  <span>{props.productName || 'Product'}</span>
                  <span>{props.price || '$97.00'}</span>
                </div>
                <div className="flex justify-between border-t pt-2" style={{ borderColor: props.fieldBorderColor || '#1e293b', color: props.fieldTextColor || '#94a3b8', fontFamily: props.fieldFontFamily }}>
                  <span>Total</span>
                  <span className="font-bold" style={titleStyle}>{props.price || '$97.00'}</span>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1" style={titleStyle}>Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border px-3 py-2 rounded" style={fieldStyle} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block font-semibold mb-1" style={titleStyle}>Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full border px-3 py-2 rounded" style={fieldStyle} />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1" style={titleStyle}>CVC</label>
                  <input type="text" placeholder="123" className="w-full border px-3 py-2 rounded" style={fieldStyle} />
                </div>
              </div>
              <button 
                className="w-full transition-all shadow-lg flex items-center justify-center gap-2 mt-4 py-3"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = props.buttonColor || '#22c55e')}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{props.buttonText || 'COMPLETE ORDER'}</span>
              </button>
            </div>
          )}
        </div>
      );
`;

t = t.replace(oldBlock.trim(), newBlock.trim());

fs.writeFileSync(rendererPath, t);
console.log('Updated ElementRenderer.tsx for two_step_checkout');
