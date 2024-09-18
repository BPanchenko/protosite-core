/** @type {import('jest').Config} */
export default {
	rootDir: '.',
	collectCoverageFrom: ['<rootDir>/../assets/*-web-component.js'],
	coverageDirectory: '<rootDir>/__coverage__',
	globalSetup: '<rootDir>/environment/setup.cjs',
	globalTeardown: '<rootDir>/environment/teardown.cjs',
	preset: 'jest-puppeteer',
	testEnvironment: '<rootDir>/environment/PuppeteerEnvironment.cjs',
	testRegex: '(/__tests__/.*\\.test)\\.js$',
}
