/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const NextI18Next = require('next-i18next').default;

const languages = ['id-ID', 'en-US'];
const NextI18NextInstance = new NextI18Next({
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  defaultLanguage: 'id',
  otherLanguages: ['en'],
  localeSubpaths: {
    en: 'en',
  },
});

NextI18NextInstance.i18n.languages = languages;

module.exports = NextI18NextInstance;
