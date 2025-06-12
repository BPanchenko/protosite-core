const path = require('node:path')
const { readFileSync } = require('node:fs')
const pug = require('pug')

const pugOptions = {
	filters: {
		'css-loader': (innerContent, { filename, module }) => {
			const dirname = module.startsWith('./') || module.startsWith('../')
				? path.dirname(filename)
				: process.cwd()

			const filePath = path.resolve(dirname, module)
			const content = readFileSync(filePath, 'utf-8')
			
			return content + ' ' + innerContent
		},
	},
}

const pugCompiler = () => ({
	name: 'pug-compiler',
	setup(build) {
		build.onLoad({ filter: /\.pug$/ }, ({ path }) => {
			const html = pug.compileFile(path, pugOptions)()
			return { contents: html, loader: 'text' }
		})
	},
})

module.exports = {
	pugCompiler
}