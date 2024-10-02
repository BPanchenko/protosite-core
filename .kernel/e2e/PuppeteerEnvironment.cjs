const JSDOMEnvironment = require('jest-environment-jsdom').TestEnvironment
const puppeteer = require('puppeteer')
require('pptr-testing-library/extend')

const {
	readFileSync,
	promises: { readFile },
} = require('fs')

const { BLANK_HTML_FILE, WS_ENDPOINT_FILE } = require('./constants.cjs')

const BLANK_HTML = readFileSync(BLANK_HTML_FILE, 'utf8')

class PuppeteerEnvironment extends JSDOMEnvironment {
	async setup() {
		await super.setup()

		// get the wsEndpoint
		const wsEndpoint = await readFile(WS_ENDPOINT_FILE, 'utf8')
		if (!wsEndpoint) {
			throw new Error('wsEndpoint not found')
		}

		// connect to puppeteer
		this.global.browser = await puppeteer.connect({
			browserWSEndpoint: wsEndpoint,
		})

		// define method newBlankPage()
		this.global.browser.newBlankPage = async function () {
			const page = await this.newPage()
			await page.setContent(BLANK_HTML)
			return page
		}
	}

	async teardown() {
		if (this.global.browser) {
			this.global.browser.disconnect()
		}
		await super.teardown()
	}

	getVmContext() {
		return super.getVmContext()
	}
}

module.exports = PuppeteerEnvironment
