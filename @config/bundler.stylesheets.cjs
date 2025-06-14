const { postcssPlugin } = require('./plugin.postcss.cjs')

module.exports = {
    bundle: true,
    color: true,
    entryPoints: [
		{
			in: 'source/component/Avatar/stylesheet.css',
			out: 'component.avatar'
		},
		{
			in: 'source/component/Select/stylesheet.css',
			out: 'component.select'
		},
		{
			in: 'source/element/Arrow/stylesheet.css',
			out: 'element.arrow'
		},
		{
			in: 'source/element/File/stylesheet.css',
			out: 'element.file'
		},
	],
    logLevel: 'info',
    metafile: true,
    minify: true,
    outdir: 'assets',
    plugins: [postcssPlugin()]
}