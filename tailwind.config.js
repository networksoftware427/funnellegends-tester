/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // FunnelLegends Brand Colors
        fl: {
          green: '#22c55e',       // Primary bright green (FUNNEL text)
          greenLight: '#4ade80',  // Light green (star/funnel top)
          greenMid: '#16a34a',    // Mid green (hover states)
          teal: '#0d7270',        // Dark teal (LEGENDS text)
          tealLight: '#0d9488',   // Lighter teal
          tealDark: '#0a5c5a',    // Deep teal (hover)
          bg: '#ffffff',          // White background
          surface: '#f8fffe',     // Slightly tinted white surface
          surface2: '#f0faf4',    // Light green-tinted surface
          border: '#d1fae5',      // Very light green border
          border2: '#a7f3d0',     // Slightly deeper green border
          text: '#0f2d1e',        // Near-black dark green text
          textSub: '#374151',     // Secondary text (gray)
          textMuted: '#6b7280',   // Muted text
          textLight: '#9ca3af',   // Light muted text
        },
        builder: {
          section: '#22c55e',   // Brand green for sections
          row: '#0d9488',       // Teal for rows
          column: '#059669',    // Emerald for columns
          element: '#16a34a',   // Green for elements
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
          accent: '#0d9488',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-green': '0 0 20px -5px rgba(34, 197, 94, 0.35)',
        'glow-teal': '0 0 25px -5px rgba(13, 148, 136, 0.35)',
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'card-md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'card-lg': '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.04)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)'
      }
    },
  },
  plugins: [],
}
