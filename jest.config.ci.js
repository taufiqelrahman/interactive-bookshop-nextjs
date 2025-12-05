/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  collectCoverageFrom: [
    // Only include files that have tests
    'components/atoms/Accordion.tsx',
    'components/atoms/Badge.tsx',
    'components/atoms/Button.tsx',
    'components/atoms/Capsule.tsx',
    'components/atoms/Card.tsx',
    'components/atoms/Divider.tsx',
    'components/atoms/Dot.tsx',
    'components/atoms/Floating.tsx',
    'components/atoms/Loader.tsx',
    'components/atoms/DateField/helper.ts',
    'lib/format-array.ts',
    'lib/format-date.ts',
    'lib/format-image.ts',
    'lib/format-payment.ts',
    'lib/hooks/useResponsive.ts',
    'lib/secure-cookies.ts',
    'store/cart/reducers.ts',
    'store/users/reducers.ts',
    'store/orders/reducers.ts',
    'store/products/reducers.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'json-summary'],
  coverageDirectory: 'coverage',
};
