import { getFilesByPattern } from '../.kernel/lib.cjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import kebabCase from 'lodash/kebabCase.js'
import last from 'lodash/last.js'
import path from 'node:path'
import pugPlugin from 'rollup-plugin-pug'
import tsPlugin from '@rollup/plugin-typescript'

const componentDir = path.join('source', 'component')
const elementDir = path.join('source', 'element')
const libraryDir = path.join('source', 'library')

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
				path.join(elementDir, 'Listbox'),
				path.join(elementDir, 'Option.ts'),
				path.join(libraryDir, 'fn.debounce.ts'),
				path.join(libraryDir, 'fn.throttle.ts'),
			].map((path) => path.replaceAll('\\', '/')),
		),
		output: {
			entryFileNames: ({ facadeModuleId }) => {
				const { dir, name } = path.parse(facadeModuleId)
				const extension = 'mjs'
				const isComponent = dir.includes(componentDir)
				const isElement = dir.includes(elementDir)

				const moduleName =
					name === 'index' ? last(dir.split(path.sep)) : name
				const splittedName = moduleName.split('.')

				const fileName = kebabCase(
					isComponent || isElement ? moduleName : splittedName[1],
				)

				const prefix = isComponent
					? 'component'
					: isElement
						? 'element'
						: splittedName[0]

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
				entries: [{ find: '#uikit', replacement: '@bpanchenko/uikit' }],
			}),
			nodeResolve({
				custom: { 'node-resolve': { isRequire: false } },
				extensions: ['.ts', '.js', '.json', '.cjs', '.mjs'],
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
			tsPlugin(),
		],
	}
}
