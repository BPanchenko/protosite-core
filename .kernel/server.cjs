const { info } = require('./logger.cjs')
const { root } = require('./lib.cjs')
const childProcess = require('node:child_process')
const express = require('express')
const nocache = require('nocache')
const path = require('node:path')
const portScanner = require('portscanner')

const launchServer = async () =>
	new Promise((resolve) => {
		portScanner.findAPortNotInUse(53000, 54000, (_error, port) => {
			const BASE_DIR = path.join(root, 'assets')
			const BASE_URL = new URL(`http://localhost:${port}`)
			const config = { BASE_DIR, BASE_URL }

			const app = express()
			app.use(nocache())
			app.use(express.static(BASE_DIR))
			config.instance = app.listen(port, () => resolve(config))
		})
	})

if (require.main === module) {
	launchServer().then(({ BASE_DIR, BASE_URL }) => {
		info(
			`Server started at ${BASE_URL} and serves the directory ${BASE_DIR}`,
		)
		childProcess.exec(`start chrome ${BASE_URL}/__tests__`)
	})
} else {
	module.exports = {
		launchServer,
	}
}
