const fs = require('node:fs')
const glob = require('glob')
const makeDir = require('make-dir')
const path = require('node:path')

const { rollup } = require('rollup')
const { debug, logger } = require('./logger.cjs')

const root = process.cwd()

async function buildESM(sourceFile, config) {
	const dist = config.output.dir
	makeDir.sync(dist)

	let bundle
	try {
		bundle = await rollup({
			...config,
			input: sourceFile,
		})
		const { output } = await bundle.generate(config.output)

		for (const chunkOrAsset of output) {
			const { type, fileName, code, source } = chunkOrAsset
			const file = path.join(dist, fileName)
			const content = type === 'asset' ? source : code
			saveFile(file, content)
		}
	} catch (err) {
		debug(err, 'error')
	} finally {
		await bundle.close()
	}
}

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
	buildESM,
	checkFileDir,
	getFilesByPattern,
	root,
	saveFile,
}
