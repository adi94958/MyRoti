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
        },
        brown: {
          50: "#efebe9",
          400: "#8d6e63",
          700: "#5d4037"
        },
        bgray: {
          400: "#78909c"

        }
      }
    },
  },
  plugins: [],
});