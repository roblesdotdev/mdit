import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: true,
    minify: true,
    sourcemap: true,
  },
  plugins: [react(), viteCompression()],
})
