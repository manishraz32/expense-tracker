/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui'],
      },
      // Custom breakpoints
      screens: {
        'sm': '640px',
         // => @media (min-width: 640px) { ... }
        'md': '600px',
        'lg': '900px',
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
          25: '#e5ebee',
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
        green: {
          DEFAULT: '#22c55e', // Custom green color
          light: '#86efac',   // Light shade of green
          dark: '#166534',    // Dark shade of green
          app: '#2dba75',
          button: '#12c48b',
          50: '#dcfce7',
          100: '#bbf7d0',
          200: '#86efac',
          300: '#4ade80',
          400: '#22c55e',
          450: '#20b855',     // Custom intermediate green
          500: '#16a34a',
          550: '#159040',     // Another custom shade between 500 and 600
          600: '#15803d',
          650: '#1acb82',
          700: '#166534',
          800: '#14532d',
          900: '#134e2b',
          925: '#0f3e22',     // Custom very dark shade of green
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
