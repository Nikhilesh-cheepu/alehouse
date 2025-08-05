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
        gold: '#d4af37',
        aleblack: '#0f0f0f',
      },
      fontFamily: {
        got: ['GameOfThrones', 'serif'],
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};

export default config; 