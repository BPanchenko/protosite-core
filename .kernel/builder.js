import { dtsPlugin } from 'esbuild-plugin-d.ts'
import { writeFileSync } from 'node:fs'

import pugCompiler from './compiler.pug.js'
import { analyzeMetafileSync, build } from 'esbuild'

const bundle = await build({
	bundle: true,
	entryNames: '[name]',
	entryPoints: [
		{ out: 'component.avatar', in: 'source/component/Avatar/index.ts' },
		{ out: 'component.select', in: 'source/component/Select/index.ts' },
		{ out: 'element.arrow', in: 'source/element/Arrow/index.ts' },
		{ out: 'element.listbox', in: 'source/element/Listbox/index.ts' },
		{ out: 'element.option', in: 'source/element/Option.ts' },
	],
	mainFields: ['browser', 'main', 'module'],
	metafile: true,
	minify: true,
	outdir: 'bundle',
	outExtension: {
		'.js': '.mjs',
	},
	outbase: 'source',
	format: 'esm',
	sourcemap: false,
	target: ['esnext', 'safari18'],
	tsconfig: 'tsconfig.json',
	plugins: [pugCompiler(), dtsPlugin()],
})

writeFileSync(
	'./bundle-analysis.json',
	JSON.stringify(bundle.metafile, undefined, 2),
)

console.log(
	analyzeMetafileSync(bundle.metafile, {
		verbose: true,
	}),
)
