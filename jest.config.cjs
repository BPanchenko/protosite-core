const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ['custom-element/*.ts', 'lib/*.ts', '!custom-element/*.d.ts'],
  coverageDirectory: './test-environment/coverage',
  globalSetup: './test-environment/setup.cjs',
  globalTeardown: './test-environment/teardown.cjs',
  testEnvironment: './test-environment/PuppeteerEnvironment.cjs',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: compilerOptions.baseUrl })
};
