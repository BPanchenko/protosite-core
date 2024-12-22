import { getFilesByPattern } from '../.kernel/lib.cjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import kebabCase from 'lodash/kebabCase.js'
import last from 'lodash/last.js'
import path from 'node:path'
import pugPlugin from 'rollup-plugin-pug'
import terser from '@rollup/plugin-terser'

const componentDir = path.join('src', 'component')

export default function getConfig(options = {}) {
	const { mode = 'debug', root = process.cwd() } = options
	const isDebug = mode === 'debug'
	const dir = path.join(root, 'assets')

	return {
		input: getFilesByPattern(
			[
				path.join(componentDir, 'Arrow'),
				path.join(componentDir, 'Avatar'),
				path.join(componentDir, 'SelectField'),
			].map((path) => path.replaceAll('\\', '/')),
		),
		output: {
			entryFileNames: ({ facadeModuleId }) => {
				const { dir, name } = path.parse(facadeModuleId)
				const extension = 'mjs'
				const isWebComponent = dir.includes(componentDir)

				const moduleName =
					name === 'index' ? last(dir.split(path.sep)) : name
				const splittedName = moduleName.split('.')

				const fileName = kebabCase(
					isWebComponent ? moduleName : splittedName[1],
				).replace('-component', '')
				const prefix = isWebComponent ? 'component' : splittedName[0]

				return [prefix, fileName, extension].join('.')
			},
			dir,
			format: 'esm',
			generatedCode: 'es2015',
			inlineDynamicImports: true,
			sourcemap: isDebug,
		},
		plugins: [
			alias({
				entries: [{ find: '@uikit', replacement: '@bpanchenko/uikit' }],
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
