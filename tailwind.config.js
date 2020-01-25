module.exports = {
  important: true,
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      brand: '#DE6236',
      'dark-grey': '#333',
    }),
    textColor: theme => ({
      ...theme('colors'),
      brand: '#DE6236',
      'dark-grey': '#333',
    }),
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      opensans: ['Open Sans', 'sans-serif'],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
