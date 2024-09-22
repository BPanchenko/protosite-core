const _ = require('lodash')
const { inspect } = require('node:util')
const logger = require('node-color-log')

const inspectOptions = {
	compact: true,
	sorted: true,
	showProxy: true,
	colors: true,
}

const globals = {
	USE_SHADOW_DOM: false,
	debug: (...args) => {
		let curriedLogger = _.curry(logger.debug.bind(logger), args.length)
		args.forEach((arg) => {
			let parsed = arg
			if (_.isArrayLikeObject(arg)) {
				parsed = Array.from(arg)
			} else if (_.isElement(arg)) {
				parsed = inspect(arg, {
					...inspectOptions,
					depth: null,
				})
			} else if (_.isObjectLike(arg)) {
				parsed = inspect(arg, inspectOptions)
			}
			return (curriedLogger = curriedLogger(parsed))
		})
	},
	error: (...args) => {
		logger.error(...args)
		process.exit(3)
	},
	info: (...args) => logger.info(...args),
	success: (...args) => logger.success(...args),
	warn: (...args) => logger.warn(...args),
}

/** @type {import('jest').Config} */
const config = {
	bail: 2,
	collectCoverageFrom: ['<rootDir>/component/*.js', '<rootDir>/lib/*.js'],
	coverageDirectory: '<rootDir>/__coverage__',
	globals,
	moduleFileExtensions: ['js', 'mjs', 'cjs', 'json'],
	rootDir: '.',
	testEnvironment: 'jest-environment-jsdom',
	testRegex: '(/__specs__/.*\\.spec)\\.js$',
	transform: {
		// '^.+\\.css$': '<rootDir>/../.kernel/jest.cssTransformer.cjs',
		'\\.m?js$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'<rootDir>/../node_modules/(?!@bpanchenko/uikit/assets/)',
		'\\.pnp\\.[^\\/]+$',
	],
	verbose: true,
}

module.exports = config
