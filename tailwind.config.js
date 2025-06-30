/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#41789f",
        bgSecondary: "#eef2f6",
        bgWhite: "#ffffff",
        textBox: "#EFEFEF",
        lightText: "#5F5F5F",
        default: "#2A2B2C",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/Images/bg-Img.png')",
        "image-home": "url('src/assets/Images/bg-img-3.png')",
        logoLight: "url('/src/assets/Images/logoLight.png')",
        travelAdvisor: "url('/src/assets/Images/ta.jpg')",
      },
      fontFamily: {
        custom: ["Roboto", "sans-serif"],
        league: ['"League Spartan"', "sans-serif"], // ✅ Added League Spartan
      },
      keyframes: {
        breathing: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.3)", opacity: "1" },
        },
      },
      animation: {
        breathing: "breathing 2s ease-in-out infinite",
      },
      fontFamily: {
        custom: ["Roboto", "sans-serif"],
        league: ['"League Spartan"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
