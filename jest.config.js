const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/src/',
    '<rootDir>/__tests__',
  ],
  automock: false,
  resetMocks: false,
  setupFiles: [
    './setupJest.js',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/jest/styleMock.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/__tests__/utils/'],
  transformIgnorePatterns: ['/node_modules/'],
};
