const childProcess = require('node:child_process')
const express = require('express')
const nocache = require('nocache')
const path = require('node:path')
const portScanner = require('portscanner')
const { logger } = require('./logger.cjs')

const ROOT = path.resolve(process.cwd(), 'e2e-env')

const launchServer = async () =>
	new Promise((resolve) => {
		portScanner.findAPortNotInUse(53000, 54000, (_error, port) => {
			const BASE_URL = new URL(`http://localhost:${port}`)
			const config = { ROOT, BASE_URL }

			const app = express()
			app.use(nocache())
			app.use(express.static(ROOT))
			config.instance = app.listen(port, () => resolve(config))
		})
	})

if (require.main === module) {
	launchServer().then(({ ROOT, BASE_URL }) => {
		logger.info(
			`Server started at ${BASE_URL} and serves the directory ${ROOT}`,
		)
		childProcess.exec(`start chrome ${BASE_URL}/__tests__`)
	})
} else {
	module.exports = {
		launchServer,
	}
}
