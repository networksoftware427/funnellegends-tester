const fs = require('fs');

let rendererPath = 'src/components/builder/ElementRenderer.tsx';
let content = fs.readFileSync(rendererPath, 'utf8');

const newCheckoutBlock = `    case 'two_step_checkout':
      const titleStyle: React.CSSProperties = {
        color: props.titleColor || undefined,
        fontFamily: props.titleFontFamily && props.titleFontFamily !== 'inherit' ? props.titleFontFamily : undefined,
        fontSize: props.titleFontSize || undefined,
      };
      const fieldStyle: React.CSSProperties = {
        backgroundColor: props.fieldBgColor || undefined,
        borderColor: props.fieldBorderColor || undefined,
        color: props.fieldTextColor || undefined,
        fontFamily: props.fieldFontFamily && props.fieldFontFamily !== 'inherit' ? props.fieldFontFamily : undefined,
        fontSize: props.fieldFontSize || undefined,
        textAlign: 'inherit' as any,
      };
      const btnStyle: React.CSSProperties = {
        backgroundColor: props.buttonColor || '#22c55e',
        color: props.buttonTextColor || '#ffffff',
        fontFamily: props.buttonFontFamily && props.buttonFontFamily !== 'inherit' ? props.buttonFontFamily : undefined,
        fontSize: props.buttonFontSize || '16px',
        fontWeight: props.buttonFontWeight || '700',
        borderRadius: props.buttonBorderRadius || '12px',
        borderWidth: props.buttonBorderWidth || '0px',
        borderColor: props.buttonBorderColor || 'transparent',
        borderStyle: props.buttonBorderWidth && props.buttonBorderWidth !== '0px' && props.buttonBorderWidth !== '0' ? 'solid' : 'none'
      };
      const formWrapperStyle: React.CSSProperties = {
        ...containerStyle,
        backgroundColor: props.formBgColor || containerStyle.backgroundColor || undefined,
        borderColor: props.formBorderColor || undefined,
        borderRadius: props.formBorderRadius || undefined,
        padding: props.formPadding || undefined,
        borderWidth: props.formBorderColor && props.formBorderColor !== 'transparent' ? '1px' : undefined,
        borderStyle: props.formBorderColor && props.formBorderColor !== 'transparent' ? 'solid' : undefined
      };

      return (
        <div style={formWrapperStyle} onClick={onSelect} className={\`element-node relative \${isInteractiveMode ? 'preview-element-clean' : ''} space-y-4 \${isSelected ? 'is-selected' : ''}\`}>
          {/* Step tabs */}
          <div className="flex border-b border-slate-800" style={{ borderColor: props.fieldBorderColor || undefined }}>
            <button 
              onClick={() => setStep(1)} 
              className={\`flex-1 py-3 font-bold text-center border-b-2 transition-colors \${step === 1 ? 'border-indigo-500 bg-slate-800/40' : 'border-transparent opacity-60'}\`}
              style={{ ...titleStyle, borderBottomColor: step === 1 ? (props.buttonColor || '#6366f1') : 'transparent' }}
            >
              1. Contact Info
            </button>
            <button 
              onClick={() => setStep(2)} 
              className={\`flex-1 py-3 font-bold text-center border-b-2 transition-colors \${step === 2 ? 'border-indigo-500 bg-slate-800/40' : 'border-transparent opacity-60'}\`}
              style={{ ...titleStyle, borderBottomColor: step === 2 ? (props.buttonColor || '#6366f1') : 'transparent' }}
            >
              2. Payment & Complete
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1" style={titleStyle}>Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 rounded" style={fieldStyle} />
              </div>
              <div>
                <label className="block font-semibold mb-1" style={titleStyle}>Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 rounded" style={fieldStyle} />
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
            <div className="space-y-3">
              {/* Product summary */}
              <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded" style={fieldStyle}>
                <span className="font-semibold" style={titleStyle}>{props.productName || 'LaunchEngine Enterprise Pass'}</span>
                <span className="font-bold text-emerald-400" style={titleStyle}>{props.price || '$297.00'}</span>
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
                <label className="block font-semibold mb-1" style={titleStyle}>Credit Card Number</label>
                <div className="relative">
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 pl-10 text-slate-200 rounded" style={fieldStyle} />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-center text-slate-200 rounded" style={fieldStyle} />
                  <input type="text" placeholder="CVC" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-center text-slate-200 rounded" style={fieldStyle} />
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
      );`;

const oldCheckoutRegex = /case 'two_step_checkout':[\s\S]*?case 'order_bump':/;
content = content.replace(oldCheckoutRegex, `${newCheckoutBlock}\n\n    case 'order_bump':`);

fs.writeFileSync(rendererPath, content);
console.log('Successfully updated ElementRenderer.tsx for two_step_checkout formatting!');
