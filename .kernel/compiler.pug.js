import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import pug from 'pug'

const options = {
	filters: {
		'css-loader': (innerContent, { module }) => {
			const filePath = fileURLToPath(
				import.meta.resolve('#uikit/' + module),
			)
			const cssContent = readFileSync(filePath, 'utf-8')
			return cssContent + ' ' + innerContent
		},
	},
}

const esbuildPlugin = () => ({
	name: 'pug-compiler',
	setup(build) {
		build.onLoad({ filter: /\.pug$/ }, ({ path }) => {
			const html = pug.compileFile(path, options)()
			return { contents: html, loader: 'text' }
		})
	},
})

export default esbuildPlugin
