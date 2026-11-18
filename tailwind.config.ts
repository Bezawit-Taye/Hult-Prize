import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Official EF Hult Prize Brand Identity
        brand: {
          pink: '#FF329B',       // Heritage Pink (Primary Accent & Brand Color)
          'pink-hover': '#E02685',
          'pink-light': '#FFF0F7',
          purple: '#8A2890',     // Purple (Secondary Brand Color)
          'purple-light': '#F6EDF8',
          midnight: '#292563',   // Midnight (Headings, nav, contrast, dark sections)
          'midnight-dark': '#1C1948',
          'midnight-light': '#38337D',
          ink: '#150007',        // Ink (Deep contrast text)
          white: '#FFFFFF',      // Gallery White
          blue: '#12B1E7',       // Sky Blue (Occasional accent)
          yellow: '#FDD40E',     // Sun Yellow (Occasional accent)
          green: '#06B47A',      // Aloe Green (Occasional accent)
          red: '#FB0000',        // Red (Occasional accent)
        },
        primary: {
          DEFAULT: '#FF329B',
          dark: '#E02685',
          light: '#FF5EAE',
        },
      },
      fontFamily: {
        sans: ['var(--font-figtree)', 'Figtree', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
