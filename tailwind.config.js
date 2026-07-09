/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9D174D",
        "primary-dark": "#500724",
        accent: "#F9A8D4",
        background: "#FFF7FB",
        surface: "#FFFFFF",
        text: "#111827",
        muted: "#6B7280",
        border: "#FBCFE8",
      },
    },
  },
  plugins: [],
};
