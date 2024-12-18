import path from 'node:path'
import process from 'node:process'

import Watcher from 'watcher'
import { logger } from './logger.cjs'
import { buildESM } from './lib.cjs'
import getConfig from '../.config/rollup.config.js'

const config = getConfig({ mode: 'debug' })
const options = {
	debounce: 850,
	ignore: /(__mocks__|__specs__|__tests__)(.+|\.snap)$/i,
	recursive: true,
	renameDetection: true,
}
const root = process.cwd()

const watcher = new Watcher(
	path.join(root, 'src'),
	options,
	(event, targetPath, targetPathNext) => {
		logger.event(event, targetPath, targetPathNext ?? '')
	},
)

watcher.on('change', (filePath) => buildESM(filePath, config))
watcher.on('ready', () => logger.info(`Watching the source code is running`))
;['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig) =>
	process.on(sig, () => watcher.close()),
)
