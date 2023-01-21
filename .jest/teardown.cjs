const fs = require('fs').promises;
const { TEMP_DIR } = require('./constants.cjs');

module.exports = async function () {
  // close the browser instance
  await globalThis.__BROWSER_GLOBAL__.close();

  // clean-up the wsEndpoint file
  await fs.rm(TEMP_DIR, { recursive: true, force: true });
};
