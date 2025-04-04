import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  plugins: [tailwindcss(), preact()],
})
