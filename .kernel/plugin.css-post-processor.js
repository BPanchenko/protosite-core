import postcss from 'postcss'
import { readFileSync } from 'node:fs'

import PostcssConfig from '../.config/postcss.config.cjs'

const { parser, plugins } = PostcssConfig

export const esbuildPlugin = () => ({
	name: 'postcss-processor',
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

export default esbuildPlugin
