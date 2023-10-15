const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        grey: {
          400: "#f5f5f5" ,
          300: "#e0e0e0"
        },
        red: {
          800: "#c62828"
        },
        blue: {
          800: "#1565c0"
        }
      }
    },
  },
  plugins: [],
});