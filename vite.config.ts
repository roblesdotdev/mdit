import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  plugins: [
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
  ],
})
