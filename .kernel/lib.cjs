const fs = require('node:fs')
const glob = require('glob')
const path = require('node:path')

const { debug, logger } = require('./logger.cjs')

const root = process.cwd()

const checkFileDir = (filePath) => {
	const { dir } = path.parse(filePath)
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true })
	}
	return true
}

const getFilesByPattern = (pattern, ignore) =>
	glob
		.sync(pattern, {
			dot: false,
			ignore,
		})
		.map((file) => path.resolve(root, file))

function saveFile(filePath, content) {
	const relFilePath = path.relative(process.cwd(), filePath)
	let status

	try {
		fs.writeFileSync(filePath, content)
		logger.logSavedFile(relFilePath)
		status = 'success'
	} catch (err) {
		debug(err, 'error')
		status = 'fail'
	} finally {
		saveFile.calls.push([relFilePath, status])
	}
}

{
	/**
	 * List of files to save with the status of the result
	 */
	Object.defineProperty(saveFile, 'calls', {
		value: [],
		configurable: true,
	})
}

module.exports = {
	checkFileDir,
	getFilesByPattern,
	root,
	saveFile,
}
