import { analyzeMetafileSync, build } from 'esbuild'
import { debug } from './logger.cjs'
import css from './plugin.css-post-processor.js'

const bundle = await build({
	bundle: true,
	entryPoints: [
		{
			out: 'stylesheet.avatar-component',
			in: 'source/component/Avatar/stylesheet.css',
		},
		{
			out: 'stylesheet.select-component',
			in: 'source/component/Select/stylesheet.css',
		},
		{
			out: 'stylesheet.arrow-element',
			in: 'source/element/Arrow/stylesheet.main.css',
		},
		{
			out: 'stylesheet.arrow-glyphs',
			in: 'source/element/Arrow/stylesheet.arrow-glyphs.css',
		},
	],
	metafile: true,
	minify: true,
	outdir: '.bundle',
	lineLimit: 80,
	plugins: [css()],
})

debug(
	analyzeMetafileSync(bundle.metafile, {
		verbose: true,
	}),
)
