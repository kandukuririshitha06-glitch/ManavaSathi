import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Suppress the 500kB chunk-size warning (acceptable for a full SPA)
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate chunks for better caching
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Leaflet mapping library
          'vendor-leaflet': ['leaflet'],
          // Lucide icons
          'vendor-icons': ['lucide-react'],
        }
      }
    }
  }
})
