/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["'Baloo 2'", "cursive"],
        ui: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
