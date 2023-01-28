const { readFile } = require('fs').promises;
const JSDOMEnvironment = require('jest-environment-jsdom').TestEnvironment;
const puppeteer = require('puppeteer');
const { BLANK_HTML_FILE, WS_ENDPOINT_FILE } = require('./constants.cjs');

class PuppeteerEnvironment extends JSDOMEnvironment {
  async setup() {
    await super.setup();

    this.global.__blank_html__ = await readFile(BLANK_HTML_FILE, 'utf8');

    // get the wsEndpoint
    const wsEndpoint = await readFile(WS_ENDPOINT_FILE, 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // connect to puppeteer
    this.global.__browser__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint
    });
  }

  async teardown() {
    if (this.global.__browser__) {
      this.global.__browser__.disconnect();
    }
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = PuppeteerEnvironment;
