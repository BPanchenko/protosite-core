import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import pug from 'pug'

export const options = {
	filters: {
		'css-loader': (innerContent, { module }) => {
			const filePath = fileURLToPath(import.meta.resolve(module))
			const cssContent = readFileSync(filePath, 'utf-8')
			return cssContent + ' ' + innerContent
		},
	},
}

export const esbuildPlugin = () => ({
	name: 'pug-compiler',
	setup(build) {
		build.onLoad({ filter: /\.pug$/ }, ({ path }) => {
			const html = pug.compileFile(path, options)()
			return { contents: html, loader: 'text' }
		})
	},
})

export default esbuildPlugin
