const { globals } = require('./jest-unit.cjs')
const path = require('node:path')

/** @type {import('jest').Config} */
module.exports = {
	rootDir: path.join(process.cwd(), 'assets'),
	globals,
	collectCoverageFrom: ['<rootDir>/*-component.js'],
	coverageDirectory: '<rootDir>/__coverage__',
	globalSetup: '<rootDir>/../.kernel/e2e/setup.cjs',
	globalTeardown: '<rootDir>/../.kernel/e2e/teardown.cjs',
	moduleFileExtensions: ['js', 'mjs'],
	preset: 'jest-puppeteer',
	setupFilesAfterEnv: [path.join(__dirname, 'jest-e2e.setup.cjs')],
	testEnvironment: '<rootDir>/../.kernel/e2e/PuppeteerEnvironment.cjs',
	testMatch: ['**/__tests__/**/*.test.js'],
	transform: {
		'\\.m?js$': 'babel-jest',
	},
}