const fs = require('fs');
let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let r = fs.readFileSync(rendererPath, 'utf8');

const startTag = "case 'two_step_checkout':";
const endTag = "case 'shipping_address':";

const startIndex = r.indexOf(startTag);
const endIndex = r.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newCase = `case 'two_step_checkout':
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
            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold mb-1" style={titleStyle}>Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs" style={{ color: props.fieldTextColor || undefined }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={titleStyle}>Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs" style={{ color: props.fieldTextColor || undefined }} />
              </div>
              <button 
                onClick={() => setStep(2)} 
                className="w-full transition-all shadow-lg flex items-center justify-center gap-2 mt-4 py-3"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = btnStyle.backgroundColor}
              >
                <span>Go To Step 2 (Payment)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3 text-left">
              {/* Product summary */}
              <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 text-xs">
                <span className="font-semibold" style={titleStyle}>{props.productName || 'LaunchEngine Enterprise Pass'}</span>
                <span className="font-bold text-emerald-400">{props.price || '$297.00'}</span>
              </div>

              {/* Order Bump Box */}
              <div className={\`p-4 rounded-xl border-2 transition-all cursor-pointer \${isCheckedBump ? 'border-emerald-500 bg-emerald-950/20' : 'border-dashed border-slate-700 bg-slate-900/50 hover:border-slate-500'}\`} onClick={() => setIsCheckedBump(!isCheckedBump)}>
                <div className="flex gap-3">
                  <div className={\`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 \${isCheckedBump ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 bg-slate-950'}\`}>
                    {isCheckedBump && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span className="text-xs font-extrabold text-amber-400">Yes, add the VIP Coaching Call (+$97)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Check this box to get a 1-on-1 implementation call with our experts. Normally $297.
                    </p>
                  </div>
                </div>
              </div>

              {/* Credit Card Mock */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold mb-1" style={titleStyle}>Credit Card Number</label>
                <div className="relative">
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs pl-10" style={{ color: props.fieldTextColor || undefined }} />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-center" style={{ color: props.fieldTextColor || undefined }} />
                  <input type="text" placeholder="CVC" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-center" style={{ color: props.fieldTextColor || undefined }} />
                </div>
              </div>

              <button 
                className="w-full transition-all shadow-xl flex items-center justify-center gap-2 mt-4 py-3.5"
                style={btnStyle}
                onMouseOver={(e) => props.buttonHoverColor && (e.currentTarget.style.backgroundColor = props.buttonHoverColor)}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = btnStyle.backgroundColor}
              >
                <span>{props.buttonText || 'COMPLETE ORDER NOW'}</span>
                <ShieldCheck className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      );
    `;

  r = r.substring(0, startIndex) + newCase + r.substring(endIndex);
  fs.writeFileSync(rendererPath, r);
  console.log('Successfully replaced two_step_checkout block.');
} else {
  console.log('Could not find start or end tags.');
}
