import child_process from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

import debounce from 'lodash/debounce.js'
import Watcher from 'watcher'
import { logger } from './logger.cjs'

const build = debounce(() => child_process.fork('./.kernel/builder.js'), 850, {
	maxWait: 1000,
})
const options = {
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

watcher.on('all', () => build())
watcher.on('ready', () => logger.info(`Watching the source code is running`))
;['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig) =>
	process.on(sig, () => watcher.close()),
)
