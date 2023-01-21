const { mkdir, writeFile } = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const { TEMP_DIR } = require('./constants.cjs');

module.exports = async function () {
  const browser = await puppeteer.launch();
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  globalThis.__BROWSER_GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  await mkdir(TEMP_DIR, { recursive: true });
  await writeFile(path.join(TEMP_DIR, 'wsEndpoint'), browser.wsEndpoint());
};
