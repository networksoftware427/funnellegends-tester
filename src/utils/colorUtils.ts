/**
 * Converts any valid CSS color string (Hex 3/6/8-digit, RGB, RGBA, HSL, HSLA, named color, transparent)
 * into a standard 6-digit hex string (#rrggbb) suitable for HTML5 <input type="color">
 */
export function cssColorToHex(colorStr: string): string {
  if (!colorStr) return '#000000';
  const str = colorStr.trim().toLowerCase();
  
  if (str === 'transparent') return '#000000';
  
  // 6-digit hex
  if (/^#[0-9a-f]{6}$/i.test(str)) {
    return str;
  }
  
  // 3-digit hex (#f00 -> #ff0000)
  if (/^#[0-9a-f]{3}$/i.test(str)) {
    return `#${str[1]}${str[1]}${str[2]}${str[2]}${str[3]}${str[3]}`;
  }

  // 8-digit hex (#ff000080 -> #ff0000)
  if (/^#[0-9a-f]{8}$/i.test(str)) {
    return str.substring(0, 7);
  }

  // RGB or RGBA: rgb(255, 106, 0) or rgba(16, 185, 129, 0.8)
  const rgbaMatch = str.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (rgbaMatch) {
    const r = Math.min(255, Math.max(0, parseInt(rgbaMatch[1], 10)));
    const g = Math.min(255, Math.max(0, parseInt(rgbaMatch[2], 10)));
    const b = Math.min(255, Math.max(0, parseInt(rgbaMatch[3], 10)));
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // HSL or HSLA: hsl(24, 100%, 50%) or hsla(160, 84%, 39%, 0.9)
  const hslaMatch = str.match(/^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (hslaMatch) {
    const h = parseInt(hslaMatch[1], 10) / 360;
    const s = parseInt(hslaMatch[2], 10) / 100;
    const l = parseInt(hslaMatch[3], 10) / 100;

    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // Canvas conversion fallback for named colors (e.g., 'indigo', 'emerald', 'crimson')
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.fillStyle = str;
      const computed = ctx.fillStyle;
      if (/^#[0-9a-f]{6}$/i.test(computed)) {
        return computed;
      }
    }
  } catch (e) {}

  return '#000000';
}

/**
 * Converts a hex string to RGB string: rgb(r, g, b)
 */
export function hexToRgbStr(hex: string): string {
  const cleanHex = cssColorToHex(hex).replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converts a hex string to RGBA string with opacity: rgba(r, g, b, alpha)
 */
export function hexToRgbaStr(hex: string, alpha: number = 1): string {
  const cleanHex = cssColorToHex(hex).replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Converts a hex string to HSL string: hsl(h, s%, l%)
 */
export function hexToHslStr(hex: string): string {
  const cleanHex = cssColorToHex(hex).replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
