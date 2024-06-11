const { addDynamicIconSelectors } = require('@iconify/tailwind');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        GF: {
          50: '#EFEDEB',
          100: '#CBCBC9',
          200: '#AEACA8',
          300: '#6F6D6A',
          400: '#232323'
        }
      },
      fontFamily: {
        lato: ["Lato", 'sans-serif']
      },
      screens: {
        ssm: '600px'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    addDynamicIconSelectors(),
],
}