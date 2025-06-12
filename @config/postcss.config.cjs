/**
 * @typedef {Object} PostcssConfig
 * @property {import('postcss-safe-parser').PostCssSafeParser} parser ...
 * @property {import('postcss').AcceptedPlugin[]} plugins ...
 */

const parser = require('postcss-safe-parser')

const plugins = [
	require('postcss-import'),
	require('postcss-extend-rule'),
	require('postcss-custom-selectors'),
	require('postcss-custom-media'),
	require('@csstools/custom-units'),
	require('postcss-preset-env')({
		features: {
			'color-function': false,
			'color-functional-notation': false,
			'color-mix': false,
			'custom-properties': false,
			'hwb-function': false,
			'is-pseudo-class': false,
			'cascade-layers': false,
			'lab-function': false,
			'logical-properties-and-values': false,
			'nesting-rules': false,
			'not-pseudo-class': false,
			'oklab-function': false,
		},
	}),
	require('cssnano')(require('./cssnano.config.cjs')),
	require('./postcss-shadow-dom.plugin.cjs'),
	require('postcss-prune-var'),
]

module.exports = {
	parser,
	plugins,
}
