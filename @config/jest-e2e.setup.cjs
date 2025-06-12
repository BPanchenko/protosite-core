const { configureToMatchImageSnapshot } = require('jest-image-snapshot')
const { expect } = require('@jest/globals')

require('@testing-library/jest-dom')
require('construct-style-sheets-polyfill')
require('pptr-testing-library/extend')
require('setimmediate')

expect.extend({
	toMatchImageSnapshot: configureToMatchImageSnapshot({
		onlyDiff: true,
		noColors: true,
	}),
})
