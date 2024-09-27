const _ = require('lodash')
const path = require('node:path')
const { inspect } = require('node:util')
const logger = require('node-color-log')

const inspectOptions = {
	depth: 1,
	compact: true,
	showHidden: true,
	sorted: true,
	showProxy: true,
	colors: true,
	maxArrayLength: 5,
	maxStringLength: 180,
}

const globals = {
	SHADOW_MODE: 'open',
	debug: (...args) => {
		let curriedLogger = _.curry(logger.debug.bind(logger), args.length)
		args.forEach((arg) => {
			let parsed = arg
			if (_.isArrayLikeObject(arg)) {
				parsed = inspect(Array.from(arg), inspectOptions)
			} else if (_.isElement(arg)) {
				parsed = inspect(arg, inspectOptions)
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
	rootDir: path.join(process.cwd(), 'src'),

	bail: 2,
	collectCoverageFrom: ['<rootDir>/component/*.js', '<rootDir>/lib/*.js'],
	coverageDirectory: '<rootDir>/__coverage__',
	globals,
	moduleFileExtensions: ['js', 'cjs', 'mjs', 'css'],
	moduleNameMapper: {
		'^#uikit/(.*)$':
			'<rootDir>/../node_modules/@bpanchenko/uikit/assets/$1',
	},
	snapshotFormat: {
		printBasicPrototype: true,
		printFunctionName: true,
	},
	testEnvironment: 'jsdom',
	testRegex: '(/__specs__/.*\\.spec)\\.js$',
	transform: {
		'\\.m?js$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'<rootDir>/../node_modules/(?!@bpanchenko/uikit/assets/)',
		'\\.pnp\\.[^\\/]+$',
	],
	verbose: true,
}

module.exports = config
