/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "phone": "420",
      "600px": "600px",
      "tablet": "720px",
      "800px": "800px",
      "laptop": "1020px",
    },
    extend: {},
  },
  plugins: [],
};
