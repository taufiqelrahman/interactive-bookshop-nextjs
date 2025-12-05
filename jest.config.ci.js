/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require('./jest.config.js');

module.exports = {
  ...defaultConfig,
  collectCoverageFrom: [
    // Include testable files
    'components/**/*.{js,ts,tsx}',
    'lib/**/*.{js,ts,tsx}',
    'store/**/*.{js,ts,tsx}',
    'services/api/**/*.ts',
    'services/shopify/**/*.ts',
    'config/**/*.ts',
    // Exclude untestable or framework files
    '!**/*.test.{js,ts,tsx}',
    '!**/__tests__/**',
    '!**/__snapshots__/**',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/build/**',
    // Exclude pages (SSR/SSG complexity)
    '!pages/**',
    // Exclude Next.js special files
    '!components/layouts/**',
    '!next.config.js',
    '!next-env.d.ts',
    // Exclude type definitions
    '!lib/validation.ts',
    '!**/types.ts',
    '!global.d.ts',
    // Exclude complex integration components
    '!components/organisms/**',
    '!components/molecules/CartItem/**',
    '!components/molecules/OrderItem/**',
    '!components/molecules/AccountDropdown.tsx',
    '!components/molecules/CartDropdown.tsx',
    '!components/BookPreview.tsx',
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
