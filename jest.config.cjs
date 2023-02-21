/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  coverageDirectory: './.code-coverage',
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '(/__specs__/.*|(\\.|/)(spec))\\.ts$',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true
      }
    ],
    '.+\\.css$': 'jest-css-modules-transform'
  }
};
