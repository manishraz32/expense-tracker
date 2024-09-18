/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui'],
      },
      // Custom breakpoints
      screens: {
        'sm': '640px',
         // => @media (min-width: 640px) { ... }
        'md': '600px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      // Custom colors, spacing, etc.
      colors: {
        gray: {
          DEFAULT: '#aaaabb', // Custom gray color
          light: '#bbbbcc',   // Light shade of gray
          dark: '#888899',    // Dark shade of gray
          // Add more shades as needed
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          450: '#7b93a4',
          500: '#6b7280',
          550: '#93a1aa',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          925: '#324c5b',
        },
      },
      spacing: {
        
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  // Optional: DaisyUI configurations
  daisyui: {
    themes: ['light', 'dark'], // Add more themes if needed
  },
}
