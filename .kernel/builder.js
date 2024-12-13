import path from 'node:path'
import * as makeDir from 'make-dir'
import { rollup } from 'rollup'

import config from '../.config/rollup.config.js'
import { debug, logger } from './logger.cjs'
import { root, saveFile } from './lib.cjs'

const dist = path.join(root, 'assets')

makeDir.sync(dist)
build()

async function build() {
	logger.info('Start building Web Components')
	let bundle
	let buildFailed = false

	try {
		bundle = await rollup(config)
		const { output } = await bundle.generate(config.output)

		for (const chunkOrAsset of output) {
			const { type, fileName, code, source } = chunkOrAsset
			const file = path.join(dist, fileName)
			const content = type === 'asset' ? source : code
			saveFile(file, content)
		}
	} catch (err) {
		buildFailed = true
		debug(err, 'error')
	} finally {
		await bundle.close()

		logger.totalSavedFiles(saveFile.calls)
		process.exit(buildFailed ? 1 : 0)
	}
}
