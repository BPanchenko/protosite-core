import * as esbuild from 'esbuild'
import { Command, Option } from 'commander'

import esmConfig from '../@config/bundler.esmodules.cjs'
import cssConfig from '../@config/bundler.stylesheets.cjs'
import { debug } from './logger.cjs'

const serveConfig = {
	servedir: 'assets',
}

const {
	mode
} = new Command().addOption(
	new Option(
		'-m, --mode <string>',
		'Advanced use of the build API involves setting up a long-running build context.',
	).choices(['build', 'serve', 'watch']).default('build')
).parse().opts()

switch (mode) {
	case 'serve':
		esbuild.context(cssConfig).then(ctx => ctx.watch())
		esbuild.context(esmConfig).then(ctx => ctx.serve(serveConfig))
	break
	case 'watch':
		esbuild.context(cssConfig).then(ctx => ctx.watch())
		esbuild.context(esmConfig).then(ctx => ctx.watch())
	break
	case 'build':
	default:
		// Stylesheets must be processed in advance in any run mode.
		await esbuild.build(cssConfig).then(readyBundlesHandler)
		await esbuild.build(esmConfig).then(readyBundlesHandler)
}

function readyBundlesHandler(result) {
	debug(
		esbuild.analyzeMetafileSync(result.metafile, {
			verbose: true,
		}),
	)
}
