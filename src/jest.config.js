// import { curry, isArrayLikeObject, isElement, isObjectLike } from 'lodash'
import _ from 'lodash'
import logger from 'node-color-log'

import { inspect } from 'util'

const inspectOptions = {
	compact: true,
	sorted: true,
	showProxy: true,
	colors: true,
}

const globals = {
	USE_SHADOW_DOM: false,
	debug: (...args) => {
		let curried = _.curry(logger.debug.bind(logger), args.length)
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
			return (curried = curried(parsed))
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

/** @type {import('@jest/types').Config} */
export default {
	collectCoverageFrom: ['<rootDir>/component/*.js', '<rootDir>/lib/*.js'],
	coverageDirectory: '<rootDir>/__coverage__',
	globals,
	// moduleNameMapper: {
	//	'#assets/(.*)': '<rootDir>/$1.js',
	//	'#uikit/(.*)': '<rootDir>/../node_modules/@bpanchenko/uikit/assets/$1',
	// },
	rootDir: '.',
	testEnvironment: 'jest-environment-jsdom',
	testRegex: '(/__specs__/.*\\.spec)\\.js$',
	transform: {
		// '^.+\\.css$': '<rootDir>/../.kernel/jest.cssTransformer.cjs',
		'\\.js$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'<rootDir>/../node_modules/(?!@bpanchenko/uikit/assets/)',
		'\\.pnp\\.[^\\/]+$',
	],
}
