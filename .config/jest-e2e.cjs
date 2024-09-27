const path = require('node:path')

/** @type {import('jest').Config} */
const config = {
	rootDir: path.join(process.cwd(), 'src'),

	collectCoverageFrom: ['<rootDir>/../assets/*-component.js'],
	coverageDirectory: '<rootDir>/__coverage__',
	globalSetup: '<rootDir>/environment/setup.cjs',
	globalTeardown: '<rootDir>/environment/teardown.cjs',
	preset: 'jest-puppeteer',
	testEnvironment: '<rootDir>/environment/PuppeteerEnvironment.cjs',
	testRegex: '(/__tests__/.*\\.test)\\.js$',
}

module.exports = config
