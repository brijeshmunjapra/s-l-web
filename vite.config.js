import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imageCompressionPlugin from './plugins/image-compression-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imageCompressionPlugin({
      // Source directory containing images
      srcDir: 'src/assets',
      // Compression quality (1-100, higher = better quality but larger files)
      quality: 80,
      // PNG compression level (0-9, higher = better compression but slower)
      compressionLevel: 6,
      // Supported image formats
      formats: ['jpg', 'jpeg', 'png', 'webp'],
      // Directories to exclude from compression
      exclude: ['node_modules', '.git'],
      // Cache directory for compressed images
      cacheDir: '.image-cache'
    })
  ],
  // Performance optimizations for smooth scrolling
  build: {
    // Optimize chunk splitting for better loading performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          lenis: ['lenis']
        }
      }
    },
    // Enable source maps for debugging but optimize for production
    sourcemap: false,
    // Minimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize dev server for smooth development experience
  server: {
    host: true,
    port: 5173,
    // Enable HMR for instant updates
    hmr: true,
    // Optimize file watching
    watch: {
      usePolling: false
    }
  }
})
