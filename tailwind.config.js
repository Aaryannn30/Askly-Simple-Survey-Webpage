/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#4F46E5",
          secondary: "#10B981",
          accent: "#F59E0B",
        },
      },
    },
    plugins: [],
  };