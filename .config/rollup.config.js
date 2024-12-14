import { getFilesByPattern } from '../.kernel/lib.cjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pugPlugin from 'rollup-plugin-pug'
import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import path from 'node:path'

export default function getConfig(options = {}) {
	const { mode = 'debug', root = process.cwd() } = options
	const isDebug = mode === 'debug'
	const dir = path.join(root, 'assets')

	return {
		input: getFilesByPattern(
			`src/component/{arrow,avatar,select-field}.js`,
		),
		output: {
			dir,
			entryFileNames: '[name]-component.mjs',
			sourcemap: isDebug,
			format: 'esm',
			generatedCode: 'es2015',
			inlineDynamicImports: true,
		},
		plugins: [
			alias({
				entries: [{ find: '#uikit', replacement: '@bpanchenko/uikit' }],
			}),
			nodeResolve({
				custom: { 'node-resolve': { isRequire: false } },
				extensions: ['.js', '.mjs', '.cjs', '.json'],
			}),
			{
				name: 'import-css-style-sheet',
				transform(code, id) {
					const isCssModule =
						this.getModuleInfo(id)?.attributes.type === 'css'
					if (isCssModule) {
						const adaptedCode = code
							.replaceAll(':root', ':host')
							.replaceAll('\\', '\\\\')

						return `const cssStyleSheet = new CSSStyleSheet();
	cssStyleSheet.replaceSync(\`${adaptedCode}\`);
	export default cssStyleSheet;`
					}
					return null
				},
			},
			pugPlugin({
				staticPattern: /\.pug$/,
			}),
			terser({
				ecma: 2020,
				keep_classnames: true,
				compress: {
					global_defs: {
						ENV: 'PROD',
						SHADOW_MODE: 'closed',
						'@debug': 'console.trace',
						'@error': 'console.error',
						'@info': 'console.log',
						'@success': 'console.log',
						'@warn': 'console.warn',
					},
				},
			}),
		],
	}
}
