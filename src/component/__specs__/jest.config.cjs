/** @type {import('ts-jest').JestConfigWithTsJest} */

const merge = require('lodash/merge');
const rootConfig = require('../../../jest.config.cjs');

module.exports = merge(
  { ...rootConfig },
  {
    collectCoverageFrom: ['../*.ts', '!src/**/*.d.ts'],
    coverageDirectory: '../__coverage__',
    globals: {
      USE_SHADOW_DOM: false
    }
  }
);
