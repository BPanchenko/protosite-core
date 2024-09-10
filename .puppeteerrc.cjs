const { join } = require('path')

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	executablePath:
		'C:\\Users\\ПК\\.cache\\puppeteer\\chrome\\win64-128.0.6613.119\\chrome-win64\\chrome.exe',
	cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
}
