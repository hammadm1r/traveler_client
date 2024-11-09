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
        textBox:"#EFEFEF"
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/Images/bg-Img.png')",
        'image-home':"url('src/assets/Images/bg-img-3.png')",
        'logoLight':"url('/src/assets/Images/logoLight.png')"
      },
      fontFamily: {
        custom: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
}

