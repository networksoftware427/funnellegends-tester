import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // ── Performance: Target modern browsers, drop legacy polyfills
    target: 'es2020',
    // ── Bundle size reporting
    reportCompressedSize: true,
    // ── Chunk splitting: separate vendor, builder, marketing bundles
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom'],
          // Lucide icon library (large — isolate so it can be cached)
          'vendor-lucide': ['lucide-react'],
          // Supabase client
          'vendor-supabase': ['@supabase/supabase-js'],
          // Builder canvas + element renderer (heaviest module)
          'builder-core': [
            './src/components/builder/Canvas.tsx',
            './src/components/builder/ElementRenderer.tsx',
            './src/components/builder/InspectorPanel.tsx',
            './src/components/builder/BuilderLayout.tsx',
          ],
          // Marketing website (lazy-loadable separately)
          'marketing': [
            './src/components/marketing/HomePageVSL.tsx',
            './src/components/marketing/FeaturesPage.tsx',
            './src/components/marketing/PricingPage.tsx',
            './src/components/marketing/Footer.tsx',
            './src/components/marketing/Navbar.tsx',
          ],
        },
        // Consistent hashed filenames for long-term caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // ── Minification: use esbuild (fast, ships with Vite)
    minify: 'esbuild',
    // ── Inline assets smaller than 4KB (reduces requests)
    assetsInlineLimit: 4096,
    // ── Source maps for production debugging (external)
    sourcemap: false,
    // ── CSS code splitting
    cssCodeSplit: true,
  },
  // ── Development performance
  server: {
    // Warm up the main entry point for faster HMR
    warmup: {
      clientFiles: [
        './src/main.tsx',
        './src/App.tsx',
        './src/components/builder/BuilderLayout.tsx',
        './src/components/marketing/MarketingWebsiteContainer.tsx',
      ],
    },
  },
  // ── Optimise dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@supabase/supabase-js',
      'clsx',
      'tailwind-merge',
    ],
  },
});
