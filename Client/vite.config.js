import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { 
        target: 'http://localhost:5001', // back-end services address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api') // preserve path prefixes
      }
    }
  },
})
