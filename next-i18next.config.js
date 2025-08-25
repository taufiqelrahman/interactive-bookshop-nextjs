module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    localeDetection: true, // auto detect browser language
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
