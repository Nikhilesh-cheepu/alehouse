# Alehouse Website

A full-stack Next.js 14 project with TypeScript and Tailwind CSS.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom colors:
  - `gold: '#d4af37'`
  - `aleblack: '#0f0f0f'`
- **Custom Font**: Cinzel serif font
- **Responsive Design** that works on all screen sizes

## Project Structure

```
alehousewebsite/
├── src/
│   └── app/
│       ├── page.tsx          # Main landing page
│       ├── layout.tsx        # Root layout
│       └── globals.css       # Global styles
├── components/               # Reusable components
├── lib/                     # Utility functions
├── styles/                  # Additional styles
├── public/                  # Static assets
└── tailwind.config.ts       # Tailwind configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Custom Colors

The project uses custom Tailwind colors:
- `bg-aleblack` - Dark background (#0f0f0f)
- `text-gold` - Golden text (#d4af37)

## Font

The project uses the Cinzel serif font from Google Fonts for an elegant, medieval appearance.
