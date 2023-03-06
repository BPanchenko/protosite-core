/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  collectCoverageFrom: ['<rootDir>/../esm/*-web-component.mjs'],
  coverageDirectory: '<rootDir>/__coverage__',
  globalSetup: '<rootDir>/environment/setup.cjs',
  globalTeardown: '<rootDir>/environment/teardown.cjs',
  rootDir: process.cwd(),
  testEnvironment: '<rootDir>/environment/PuppeteerEnvironment.cjs',
  testRegex: '(/__tests__/.*\\.test)\\.mjs$'
};
