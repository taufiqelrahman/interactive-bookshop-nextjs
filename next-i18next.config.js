const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    localeDetection: true, // auto detect browser language
  },
};

module.exports = {
  ...i18nConfig,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: path.resolve('./public/locales'),
};

// Export for serverSideTranslations (without localeDetection in i18n)
module.exports.serverSideConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: path.resolve('./public/locales'),
};
