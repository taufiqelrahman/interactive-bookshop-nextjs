module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: '#DE6236',
        'dark-grey': '#333',
        'light-grey': '#fafafa',
      },
      fontFamily: {
        poppins: ['Poppins', 'serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
