const { mkdir, writeFile } = require('fs').promises;
const puppeteer = require('puppeteer');
const { TEMP_DIR, WS_ENDPOINT_FILE } = require('./constants.cjs');

module.exports = async function () {
  const browser = await puppeteer.launch();
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  globalThis.browser = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  await mkdir(TEMP_DIR, { recursive: true });
  await writeFile(WS_ENDPOINT_FILE, browser.wsEndpoint());
};
