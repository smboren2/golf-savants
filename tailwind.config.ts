/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-quicksand)', 'sans-serif'],
      },
      colors: {
        'purple': {
          600: '#4A3B5E', // A lighter shade of your purple
          700: '#4F3E64', // A medium shade of your purple
          800: '#54436B', // Your custom purple color
        },
        'green': {
          500: '#50CB93', // Your custom green color
        },
        'gray': {
          50: '#FAF4F4', // Your light background color
        },
      },
    },
  },
  plugins: [],
}