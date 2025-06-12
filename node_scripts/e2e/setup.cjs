const { mkdir, writeFile } = require('fs').promises
const puppeteer = require('puppeteer')
const { TEMP_DIR, WS_ENDPOINT_FILE } = require('./constants.cjs')

module.exports = async function () {
	const browser = await puppeteer.launch({ headless: true })
	globalThis.browser = browser

	await mkdir(TEMP_DIR, { recursive: true })
	await writeFile(WS_ENDPOINT_FILE, browser.wsEndpoint())
}
