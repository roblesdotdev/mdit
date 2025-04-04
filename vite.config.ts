import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'
import tsconfigPaths from 'vite-tsconfig-paths'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      external: [/\node./],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('remark') || id.includes('rehype')) {
              return 'markdown'
            }
            return 'vendor'
          }
        },
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    preact(),
    iconsSpritesheet({
      withTypes: true,
      inputDir: 'resources/icons',
      outputDir: 'src/components/ui/icons',
      fileName: 'sprite.svg',
      formatter: 'prettier',
      iconNameTransformer: name => name.toLocaleLowerCase(),
    }),
    compression(),
  ],
  ssr: {
    noExternal: ['react-helmet-async'],
  },
})
