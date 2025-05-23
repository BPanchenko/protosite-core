const path = require('node:path')
const { debug, error, info, success, warn } = require('../.kernel/logger.cjs')

const globals = {
	ENV: 'DEV',
	SHADOW_MODE: 'open',
	debug,
	error,
	info,
	success,
	warn,
}

/** @type {import('jest').Config} */
module.exports = {
	rootDir: path.join(process.cwd(), 'source'),

	bail: 2,
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/component/*.ts',
		'<rootDir>/element/*.ts',
		'<rootDir>/library/*.ts',
	],
	coverageDirectory: '../__coverage__',
	globals,
	moduleFileExtensions: ['js', 'cjs', 'mjs', 'css'],
	moduleNameMapper: {
		'^#uikit/(.*)$':
			'<rootDir>/../node_modules/@bpanchenko/uikit/assets/$1',
	},
	setupFilesAfterEnv: [
		'construct-style-sheets-polyfill',
		'element-internals-polyfill',
	],
	snapshotFormat: {
		printBasicPrototype: true,
		printFunctionName: true,
	},
	testEnvironment: 'jsdom', // @happy-dom/jest-environment, jsdom
	testEnvironmentOptions: {
		url: 'http://localhost:53000',
		width: 1920,
		height: 1200,
	},
	testMatch: ['**/__specs__/**/*.spec.js'],
	transform: {
		'\\.m?js$': 'babel-jest',
		'\\.(pug)$': 'jest-transform-pug',
	},
	transformIgnorePatterns: [
		'<rootDir>/../node_modules/(?!@bpanchenko/uikit/assets/)',
		'\\.pnp\\.[^\\/]+$',
	],
	verbose: true,
}
