/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        garden: {
          soil: '#8B4513',
          grass: '#228B22',
          sky: '#87CEEB',
          'dark-soil': '#654321',
          'dark-grass': '#1B5E20',
          'dark-sky': '#2C3E50'
        }
      }
    },
  },
  plugins: [],
}