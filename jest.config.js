module.exports = {
  // roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/components/**/?(*.)+(test).+(ts|tsx|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/__tests__/e2e/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
  // setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each', '@testing-library/jest-dom/extend-expect'],
  globals: {
    url: 'http://localhost:8101',
  },
  // Module file extensions for importing
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'components(.*)$': '<rootDir>/components$1',
  },
};
