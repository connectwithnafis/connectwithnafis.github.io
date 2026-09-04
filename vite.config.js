import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works on both GitHub user pages
// (user.github.io) and project pages (user.github.io/repo).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // Split heavy vendors into their own chunks so they download in
    // parallel and stay cached across deploys (only app code changes).
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
