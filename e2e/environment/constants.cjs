const os = require('os')
const path = require('path')

const BLANK_HTML_FILE = path.join(__dirname, 'blank.html')
const TEMP_DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')
const WS_ENDPOINT_FILE = path.join(TEMP_DIR, 'wsEndpoint')

module.exports = {
	BLANK_HTML_FILE,
	TEMP_DIR,
	WS_ENDPOINT_FILE,
}
