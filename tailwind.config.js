/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      dragoon: ["Selen Font"],
    },
    extend: {
      gridTemplateRows: {
        9: "repeat(9, minmax(0, 1fr))",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
      },
    },
  },
  plugins: [],
};
