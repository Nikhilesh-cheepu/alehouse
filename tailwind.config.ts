import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aleblack: '#0f0f0f',
        crimson: {
          400: '#F87171',
          600: '#FA5252',
          950: '#8B0000',
        },
        stone: {
          950: '#0C0A09',
        },
        alehouse: {
          amber: '#FF8C00',
          gold: '#d1a954',
          red: '#6b1f1f',
          blue: '#111827',
        },
        gold: '#D4AF37',
        // New cinematic color palette
        charcoal: {
          900: '#0e0e0e',
          800: '#1a1a1a',
          700: '#121212',
        },
        text: {
          primary: '#f2f2f2',
          secondary: '#999999',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config; 