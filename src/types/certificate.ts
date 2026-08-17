export type CertElementType = 'text' | 'image' | 'badge' | 'signature' | 'variable';

export interface CertElement {
  id: string;
  type: CertElementType;
  content: string; // The text string, or the image URL
  x: number; // Position X in percentages
  y: number; // Position Y in percentages
  width?: number; // Width in percentages (optional)
  height?: number; // Height in percentages (optional)
  fontSize?: number; // Font size in pixels (if text)
  color?: string; // Hex color
  fontFamily?: string; 
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  isDynamic?: boolean;
}

export interface CustomBuiltCertificate {
  id: string;
  title: string;
  bgColor: string;
  bgImageUrl?: string;
  elements: CertElement[];
}
