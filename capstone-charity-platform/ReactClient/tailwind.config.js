/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { //colors that i imported because they are not available as easily using tailwindCSS
          beige: "#D9CBB2",       // Beige background
          green: "#9CAF88",       // Green for header/footer/buttons
          offWhite: "#F5F2EC",    // Off-white/cream
          lightBeige: "#DACC3B",  // Slightly lighter beige
          mutedGreen: "#9BAE87",  // Muted green variant
          softBeige: "#DBCCB4",   // Soft beige variation
          softBeige2: "#DBCCB3",  // Another close shade of beige
          faintGreen: "#97AB84",  // Faint green
          grayGreen: "#A7AD8E",   // Soft gray-green
          beige2: "#DBCDB4",      // Another beige variation
        },
      },
    },
  },
  plugins: [],
}


