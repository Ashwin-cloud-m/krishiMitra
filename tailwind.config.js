/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#143326',
          800: '#1b4332',
          700: '#24523e',
          600: '#2d6a4f'
        },
        leaf: {
          500: '#40916c',
          400: '#52b788',
          300: '#74c69d',
          200: '#95d5b2'
        },
        cream: {
          DEFAULT: '#fdfbf7',
          warm: '#f7f4ea'
        },
        earth: {
          DEFAULT: '#8c5e34',
          dark: '#582f0e',
          light: '#d4a373'
        }
      }
    },
  },
  plugins: [],
}
