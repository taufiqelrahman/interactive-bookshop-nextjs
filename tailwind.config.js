module.exports = {
  important: true,
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      brand: '#DE6236',
      'dark-grey': '#333',
      'light-grey': '#fafafa',
    }),
    textColor: theme => ({
      ...theme('colors'),
      brand: '#DE6236',
      'dark-grey': '#333',
    }),
    fontFamily: {
      poppins: ['Poppins', 'serif'],
      opensans: ['Open Sans', 'sans-serif'],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
