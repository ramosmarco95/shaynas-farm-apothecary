/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amber-canvas': '#f4e6cd',
        'pale-ochre': '#edddc3',
        'forest-shadow': '#1e211e',
        'deep-earth': '#888151',
        'sunken-gold': '#a29a65',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pill': '50px',
      },
    },
  },
  plugins: [],
}