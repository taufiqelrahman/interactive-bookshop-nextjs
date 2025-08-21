/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  collectCoverageFrom: [
    'components/**/*.{js,ts,tsx}',
    'lib/**/*.{js,ts,tsx}',
    'pages/**/*.{js,ts,tsx}',
    'services/**/*.{js,ts,tsx}',
    'store/**/*.{js,ts,tsx}',
  ],
};
