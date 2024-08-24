import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    minify: 'terser',
  },
  plugins: [react(), viteCompression()],
})
