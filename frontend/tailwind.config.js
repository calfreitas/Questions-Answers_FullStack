/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-white': '2px 5px 5px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}
