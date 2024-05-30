/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midblack: "#2c3e50",
        titlecol: "#1098ad",
        amber: "#fa709f",
        glow: "#ffd700",
        celestial: "#af7ac5",
        dawn: "#f8bbd0",
        ocean: "#3f9ffa",
        breeze: "#76e5fc",
        sunset: "#ffb347",
        serenade: "#ffcc67",
        crimson: "#1e90ff",
        cascade: "#00ced1",
        brightgreen: "#17ffc6",
      },
      margin: {
        "1/6": "16.6666667%",
      },
      height: {
        100: "480px",
      },
    },
  },
  plugins: [],
};
