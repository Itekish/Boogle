/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode
  theme: {
    extend: {
      colors: {
        primary: "#ff4d6d", // Boogle primary color
        secondary: "#ff9f43", // Boogle secondary color
        backgroundDark: "#121212", // Dark mode background
        backgroundLight: "#ffffff", // Light mode background
      },
      animation: {
        "spin-slow": "spin 2s linear infinite", // Custom slow spinning animation
        "fade-in": "fadeIn 0.5s ease-in-out", // Smooth fade-in effect
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
