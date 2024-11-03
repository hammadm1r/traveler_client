/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#41789f",
        bgSecondary: "#eef2f6",
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/Images/bg-Img.png')",
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
}

