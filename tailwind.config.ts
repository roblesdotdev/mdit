import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--canvas)',
        panel: 'var(--panel)',
        fg: {
          DEFAULT: 'var(--fg-default)',
          muted: 'var(--fg-muted)',
        },
        border: 'var(--border)',
      },
    },
  },
  plugins: [typography],
} satisfies Config
