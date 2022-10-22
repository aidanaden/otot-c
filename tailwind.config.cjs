/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Recoleta", "serif"],
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
