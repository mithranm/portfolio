import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // This syntax tells Tailwind to construct RGB colors
        // and allows opacity modifiers like `/20` to work.
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'card-bg': 'rgb(var(--color-card-bg) / <alpha-value>)',
        cut: 'rgb(var(--color-cut) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
export default config