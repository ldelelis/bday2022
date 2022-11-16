/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      dragoon: ["Selen2 Font", "Selen Font"],
    },
    extend: {
      gridTemplateRows: {
        9: "repeat(9, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "32%": { transform: "rotate(0deg)" },
          "8%, 24%": { transform: "rotate(-3deg)" },
          "16%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
