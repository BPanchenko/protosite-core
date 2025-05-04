import { dtsPlugin } from 'esbuild-plugin-d.ts'
import { writeFileSync } from 'node:fs'

import pugCompiler from './plugin.pug-compiler.js'
import { analyzeMetafileSync, build } from 'esbuild'
import { debug } from './logger.cjs'

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
	outdir: '.bundle',
	format: 'esm',
	sourcemap: false,
	lineLimit: 120,
	target: ['esnext', 'safari18'],
	tsconfig: 'tsconfig.json',
	plugins: [pugCompiler(), dtsPlugin()],
})

writeFileSync(
	'./.bundle/compilation-stats.json',
	JSON.stringify(bundle.metafile, undefined, 2),
)

debug(
	analyzeMetafileSync(bundle.metafile, {
		verbose: true,
	}),
)
