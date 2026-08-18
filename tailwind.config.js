/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C5CFC",
        "primary-dark": "#6247D1",
        accent: "#4F7CFF",
        coral: "#FF6B6B",
        teal: "#4FD1C5",
        gold: "#E9B44C",
        background: "#0B0B0F",
        surface: "#15151B",
        text: "#F5F5F2",
        muted: "#9A9AA5",
        border: "#2A2A33",
      },
    },
  },
  plugins: [],
};
