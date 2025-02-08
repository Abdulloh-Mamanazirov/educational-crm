/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "ant-dark-blue": "rgb(0 33 64)",
        "dark-l": "rgb(15 15 16)",
        "dark-m": "rgb(42 41 41)",
        "dark-s": "rgb(200 200 200)",
      },
    },
  },
  plugins: [],
};
