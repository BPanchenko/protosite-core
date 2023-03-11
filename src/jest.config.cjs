/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ['!**.d.ts'],
  coverageDirectory: '<rootDir>/__coverage__',
  moduleNameMapper: {
    '@uikit/(.*)': '<rootDir>/../node_modules/@bpanchenko/uikit/assets/$1'
  },
  rootDir: __dirname,
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '(/__specs__/.*\\.spec)\\.ts$',
  globals: {
    USE_SHADOW_DOM: false
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  }
};
