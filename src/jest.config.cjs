/** @type {import('ts-jest').JestConfigWithTsJest} */

const {
  tsConfig: { compilerOptions }
} = require('tsconfig-loader').default();

module.exports = {
  collectCoverageFrom: ['!**.d.ts'],
  coverageDirectory: '<rootDir>/__coverage__',
  moduleNameMapper: {
    '@uikit/(.*)': '<rootDir>/../node_modules/@bpanchenko/uikit/assets/$1'
  },
  rootDir: process.cwd(),
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '(/__specs__/.*\\.spec)\\.ts$',
  globals: {
    USE_SHADOW_DOM: false
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: compilerOptions,
        useESM: true
      }
    ],
    '^.+\\.css$': ['jest-transform-css', { modules: true }]
  }
};
