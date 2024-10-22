/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightGreen': '#15616d',
        'darkGreen': '#104d57'
      }
    },
  },
  plugins: [],
}

