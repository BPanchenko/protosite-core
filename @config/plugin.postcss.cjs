const { readFileSync } = require('node:fs')
const postcss = require('postcss')
const { parser, plugins } = require('./postcss.config.cjs')

const postcssPlugin = () => ({
	name: 'postcss-plugin',
	setup(build) {
		build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
			const sourceCss = readFileSync(path, 'utf8')

			const result = await postcss(plugins).process(sourceCss, {
				from: path,
				to: path,
				parser,
			})

			return { contents: result.css, loader: 'css' }
		})
	},
})

module.exports = {
	postcssPlugin
}