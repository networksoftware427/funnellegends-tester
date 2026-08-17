import React from 'react';
import { cssColorToHex, hexToRgbStr, hexToRgbaStr, hexToHslStr } from '../../utils/colorUtils';

interface UniversalColorPickerProps {
  value: string;
  onChange: (newColor: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  showFormatButtons?: boolean;
}

export const UniversalColorPicker: React.FC<UniversalColorPickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'e.g. #FF6A00, rgb(255,106,0), hsl(24,100%,50%), transparent',
  className = '',
  showFormatButtons = true
}) => {
  const currentHex = cssColorToHex(value || '#000000');

  const handleFormatConvert = (targetFormat: 'hex' | 'rgb' | 'rgba' | 'hsl') => {
    if (!value) return;
    if (targetFormat === 'hex') {
      onChange(currentHex);
    } else if (targetFormat === 'rgb') {
      onChange(hexToRgbStr(currentHex));
    } else if (targetFormat === 'rgba') {
      onChange(hexToRgbaStr(currentHex, 0.95));
    } else if (targetFormat === 'hsl') {
      onChange(hexToHslStr(currentHex));
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
      <div className="flex gap-2 items-center">
        {/* Color Wheel Swatch */}
        <div className="relative shrink-0 flex items-center justify-center">
          <input 
            type="color" 
            value={currentHex}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded-lg border border-slate-300 bg-transparent cursor-pointer overflow-hidden p-0 shadow-sm"
            title="Click to open color wheel"
          />
        </div>

        {/* Text Input Supporting HEX, RGB, RGBA, HSL, HSLA & Color Names */}
        <input 
          type="text" 
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        {/* Quick Format Conversion Pills */}
        {showFormatButtons && (
          <div className="flex gap-0.5 bg-white border border-slate-200 p-0.5 rounded-lg text-[9px] font-mono shrink-0">
            <button
              type="button"
              onClick={() => handleFormatConvert('hex')}
              className="px-1.5 py-0.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Convert format to HEX (#FF6A00)"
            >
              HEX
            </button>
            <button
              type="button"
              onClick={() => handleFormatConvert('rgb')}
              className="px-1.5 py-0.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Convert format to RGB rgb(255,106,0)"
            >
              RGB
            </button>
            <button
              type="button"
              onClick={() => handleFormatConvert('rgba')}
              className="px-1.5 py-0.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Convert format to RGBA rgba(255,106,0,0.95)"
            >
              RGBA
            </button>
            <button
              type="button"
              onClick={() => handleFormatConvert('hsl')}
              className="px-1.5 py-0.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Convert format to HSL hsl(24,100%,50%)"
            >
              HSL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
