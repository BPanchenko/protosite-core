import { Client } from 'basic-ftp'
import { globSync } from 'glob'
import path from 'node:path'
import { logger } from './logger.cjs'

import ftpAccess from '../.config/ftp.json' with { type: 'json' }

const asIs = globSync(['assets/*.{html,js,mjs}']).map((file) => [
	path.resolve(file),
	path.join('core', path.relative('assets', file)).replaceAll('\\', '/'),
])

const files = new Map(
	asIs.sort(([_a, a], [_b, b]) => (a < b ? -1 : a > b ? 1 : 0)),
)

;(async function deploy() {
	const client = new Client()

	try {
		await client.access(ftpAccess)
		logger.uploadCaption()

		for (const [from, to] of files.entries()) {
			await client.uploadFrom(from, to)
			logger.uploadedFile(to)
		}
	} catch (err) {
		logger.error(err)
	}

	client.close()
})()
