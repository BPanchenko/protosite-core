const _ = require('lodash')
const dateFormat = require('date-format')
const logger = require('node-color-log')
const path = require('node:path')
const process = require('node:process')
const util = require('node:util')

const { inspectOptions, root, roundNanoseconds } = require('./lib.cjs')

const start = process.hrtime()

logger.setDate(() => dateFormat('hh:mm:ss.SSS', new Date()))

const log = (...args) => {
	args.forEach((arg, ind, args) => {
		if (typeof arg === 'object') {
			args[ind] = util.inspect(arg, inspectOptions)
		} else if (typeof arg === 'string' && arg.includes(root)) {
			args[ind] = '`' + arg.replace(root, '') + '`'
		}
	})

	logger.log(...args)
}

const logEvent = (name, ...args) => {
	logger.bold().color('black').append(`${name}: `).reset()
	if (name === 'rename') {
		args.splice(0, 0, 'from')
		args.splice(2, 0, 'to')
	}
	logger.write(...args)
}

const logSavedFile = (file, hrstart = start) => {
	const hrend = process.hrtime(hrstart)
	const relative = path.relative(root, file)
	logger
		.bgColor('green')
		.color('white')
		.append('SAVED:')
		.reset()
		.append(` ${relative} `)
		.bold()
		.log(`in ${roundNanoseconds(hrend[1])} s`)
}

const logSummaryFiles = (array, hrstart = start) => {
	const hrend = process.hrtime(hrstart)
	logger
		.color('green')
		.bold()
		.underscore()
		.log(
			`TOTAL: Prepared ${array.length} files in ${roundNanoseconds(hrend[1])} seconds`,
		)
}

const debug = (...args) => {
	let curriedLogger = _.curry(logger.debug.bind(logger), args.length)
	args.forEach((arg) => {
		let parsed = arg
		if (_.isArrayLikeObject(arg)) {
			parsed = util.inspect(Array.from(arg), inspectOptions)
		} else if (_.isElement(arg)) {
			parsed = util.inspect(arg, inspectOptions)
		} else if (_.isObjectLike(arg)) {
			parsed = util.inspect(arg, inspectOptions)
		}
		return (curriedLogger = curriedLogger(parsed))
	})
}
const error = (...args) => {
	logger.error(...args)
	process.exit(3)
}
const info = (...args) =>
	logger
		.color('white')
		.bgColor('blue')
		.append('[INFO]')
		.reset()
		.color('blue')
		.log(' ' + args.map((a) => a.toString()).join(' '))

const success = (...args) => logger.success(...args)

const warn = (...args) => logger.warn(...args)

module.exports = {
	log,
	logEvent,
	logSavedFile,
	logSummaryFiles,
	debug,
	error,
	info,
	success,
	warn,
}
