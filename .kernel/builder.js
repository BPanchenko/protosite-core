import path from 'node:path'
import * as makeDir from 'make-dir'
import { rollup } from 'rollup'

import config from '../.config/rollup.config.js'
import { debug, logger } from './logger.cjs'
import { root, saveFile } from './lib.cjs'

logger.info('Start building ECMAScript Modules')

const dist = path.join(root, 'assets')
makeDir.sync(dist)

const promises = config.input.map((file) => build(file))

Promise.allSettled(promises).then(() => {
	const { hasFail } = logger.totalSavedFiles(saveFile.calls)
	process.exit(hasFail ? 1 : 0)
})

async function build(sourceFile) {
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
