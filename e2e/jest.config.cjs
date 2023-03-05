/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ['../esm/*-web-component.mjs'],
  coverageDirectory: './__coverage__',
  globalSetup: './environment/setup.cjs',
  globalTeardown: './environment/teardown.cjs',
  testEnvironment: './environment/PuppeteerEnvironment.cjs',
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.mjs$'
};
