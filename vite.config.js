import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { locationSourceHtmlPlugin } from './build/locationSourceHtmlPlugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), locationSourceHtmlPlugin()],
  build: {
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          carousel: ['swiper'],
          seo: ['react-helmet-async']
        }
      }
    }
  },
  server: {
    host: true, // or '0.0.0.0'
    port: 5173  // you can also specify a custom port here
  }
})
