const {
	getFilesByPattern,
	checkDevelopmentMode,
} = require('../.kernel/lib.cjs')

module.exports = {
	input: getFilesByPattern(`src/components/avatar.js`),
	output: {
		entryFileNames: '[name].mjs',
		sourcemap: checkDevelopmentMode(),
		format: 'esm',
	},
	plugins: [
		require('@rollup/plugin-babel').getBabelOutputPlugin({
			plugins: [
				'@babel/plugin-transform-runtime',
				['import-postcss', require('@bpanchenko/uikit/postcss.config')]
			],
			presets: ['@babel/preset-env'],
		}),
		require('@rollup/plugin-node-resolve').nodeResolve({
			custom: { 'node-resolve': { isRequire: true } },
			extensions: ['.js', '.cjs', '.mjs', '.css', '.json'],
		}),
	],
}
