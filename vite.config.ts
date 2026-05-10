import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

import contentCollections from '@content-collections/vite'

const config = defineConfig({
  plugins: [
    contentCollections(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],

  build: {
    // Inline assets < 4 KB as base64 (reduces small requests)
    assetsInlineLimit: 4096,
    // Split CSS per-chunk for better caching
    cssCodeSplit: true,
    // No source maps in production
    sourcemap: false,
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split vendor chunks for better long-term caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tanstack/react-router') || id.includes('@tanstack/react-start')) {
              return 'tanstack'
            }
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'react'
            }
            if (id.includes('@radix-ui')) {
              return 'radix'
            }
            return 'vendor'
          }
        },
        // Use content hash for filenames (enables long caching)
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
})

export default config
