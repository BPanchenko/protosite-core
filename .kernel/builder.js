import getConfig from '../.config/rollup.config.js'
import { logger } from './logger.cjs'
import { buildESM, saveFile } from './lib.cjs'

logger.info('Start building ECMAScript Modules')

const config = getConfig({ mode: 'production' })
const bundles = config.input.map((file) => buildESM(file, config))

Promise.allSettled(bundles).then(() => {
	const { hasFail } = logger.totalSavedFiles(saveFile.calls)
	process.exit(hasFail ? 1 : 0)
})
