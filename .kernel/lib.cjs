const path = require('node:path')
const { existsSync, mkdirSync } = require('node:fs')
const glob = require('glob')

const root = process.cwd()

const getFilesByPattern = (pattern, ignore) =>
	glob
		.sync(pattern, {
			dot: false,
			ignore,
		})
		.map((file) => path.resolve(root, file))

function checkFileDir(filePath) {
	const { dir } = path.parse(filePath)
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true })
	}
	return true
}

module.exports = {
	checkFileDir,
	getFilesByPattern,
	root,
}
