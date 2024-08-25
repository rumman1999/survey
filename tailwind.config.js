// tailwind.config.js
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this based on the files you want Tailwind to scan
  ],
  theme: {
    extend: {
      colors: {
        customLightBlue: '#dbe4ff',
      },
    },
  },
  plugins: [],
}
