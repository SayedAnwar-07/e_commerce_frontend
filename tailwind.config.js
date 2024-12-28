/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: "'Open Sans', sans-serif;"
      },
      colors: {
        guardianStart: '#specificColorCode', 
        guardianEnd: '#specificColorCode', 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}