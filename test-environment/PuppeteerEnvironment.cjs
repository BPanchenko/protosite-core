const {
  readFileSync,
  promises: { readFile }
} = require('fs');
const JSDOMEnvironment = require('jest-environment-jsdom').TestEnvironment;
const puppeteer = require('puppeteer');
const { BLANK_HTML_FILE, WS_ENDPOINT_FILE } = require('./constants.cjs');

const BLANK_HTML = readFileSync(BLANK_HTML_FILE, 'utf8');

class PuppeteerEnvironment extends JSDOMEnvironment {
  async setup() {
    await super.setup();

    // get the wsEndpoint
    const wsEndpoint = await readFile(WS_ENDPOINT_FILE, 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // connect to puppeteer
    this.global.__browser__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint
    });

    // define method newBlankPage()
    this.global.__browser__.newBlankPage = async function () {
      const page = await this.newPage();
      await page.setContent(BLANK_HTML);
      return page;
    };
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
