const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          400: "#f5f5f5" ,
          300: "#e0e0e0"
        }
      }
    },
  },
  plugins: [],
});