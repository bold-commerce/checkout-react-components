// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');

module.exports = {
    'roots': [
        'tests',
    ],
    'preset': 'ts-jest',
    'testEnvironment': 'jsdom',
    'setupFilesAfterEnv': ['<rootDir>/tests/jest.setup.ts'],
    'testMatch': [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    'transform': {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
    },
    'coverageThreshold': {
        'global': {
            'statements': 100,
            'branches': 100,
            'functions': 100,
            'lines': 100,
        },
    },
    'collectCoverageFrom': [
        '**/*.{js,jsx,ts,tsx}',
        'src/**/*.{js,jsx,ts,tsx}',
        'src/components/**/*.{js,jsx,ts,tsx}',
        'src/themes/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/lib/**',
        '!**/tests/**',
    ],
    'testPathIgnorePatterns': [
        '/node_modules/',
    ],
    'modulePaths': [
        '<rootDir>',
    ],
    'moduleNameMapper': {
        '\\.css$': 'identity-obj-proxy',
        'src/(.*)': '<rootDir>/src/$1',
    },
};
