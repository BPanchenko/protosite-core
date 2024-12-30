const _ = require('lodash')
const dateFormat = require('date-format')
const logger = require('node-color-log')
const process = require('node:process')
const util = require('node:util')

const roundNanoseconds = (value) => Math.round(value / 1000000) / 1000

const inspectOptions = {
	depth: 3,
	compact: false,
	showHidden: true,
	sorted: true,
	showProxy: true,
	colors: true,
	maxArrayLength: 5,
	maxStringLength: 180,
	breakLength: 120,
}

const start = process.hrtime()

logger.setDate(() => dateFormat('hh:mm:ss.SSS', new Date()))

const debug = (...args) => {
	const last = _.last(args)
	const mode = ['success', 'debug', 'info', 'warn', 'error'].includes(last)
		? last
		: 'debug'

	let curriedLogger = _.curry(logger[mode].bind(logger), args.length)

	args.forEach((arg) => {
		let parsed = arg
		if (_.isArrayLikeObject(arg)) {
			parsed = util.inspect(Array.from(arg), inspectOptions)
		} else if (_.isElement(arg)) {
			parsed = util.inspect(arg, inspectOptions)
		} else if (_.isObjectLike(arg)) {
			parsed = util.inspect(arg, inspectOptions)
		}
		curriedLogger = curriedLogger(parsed)
	})
}

logger.event = (name, ...args) => {
	logger.bold().color('black').append(`${name}: `).reset()

	switch (name) {
		case 'rename':
			args.splice(0, 0, 'from')
			args.splice(2, 0, 'to')
		default:
			debug(...args)
	}
}

logger.info = (...args) =>
	logger
		.color('white')
		.bgColor('blue')
		.append('[INFO]')
		.reset()
		.color('blue')
		.log(' ' + args.map((a) => a.toString()).join(' '))

logger.logSavedFile = (path, hrstart = start) => {
	const hrend = process.hrtime(hrstart)
	logger
		.bgColor('green')
		.color('white')
		.append('SAVED:')
		.reset()
		.append(` ${path} `)
		.bold()
		.log(`in ${roundNanoseconds(hrend[1])} s`)
}

logger.totalSavedFiles = (savingResults, hrstart = start) => {
	const total = savingResults.length
	const failures = savingResults.filter(
		([relChunkPath_, status]) => status === 'fail',
	).length
	const hasFail = Boolean(failures)
	const time = roundNanoseconds(process.hrtime(hrstart)[1])
	const separator = String.fromCharCode(0x2017)

	{
		const color = hasFail ? 'black' : 'green'
		const message = `TOTAL: Prepared ${total} files in ${time} seconds`
		logger
			.color(color)
			.bold()
			.append(separator.repeat(message.length))
			.append('\r\n')
			.log(message)
	}
	{
		const color = hasFail ? 'red' : 'white'
		const message = `FAILED FILES: ${failures}`
		const setting = {
			bold: hasFail,
			dim: false === hasFail,
			underscore: hasFail,
		}
		logger.fontColorLog(color, message, setting)
		logger.log('\r\n')
	}

	return {
		hasFail,
	}
}

logger.uploadCaption = () =>
	logger.color('cyan').bold().underscore().log(`UPLOAD ASSETS`)

logger.uploadedFile = (mess) => logger.color('black').bold().log(mess)

module.exports = {
	default: logger,
	logger,
	debug,
}
