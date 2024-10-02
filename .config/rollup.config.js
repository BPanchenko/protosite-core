import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { getFilesByPattern, root } from '../.kernel/lib.cjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import path from 'node:path'

export default {
	input: getFilesByPattern(`src/components/avatar.js`),
	output: {
		entryFileNames: '[name]-component.mjs',
		sourcemap: false,
		format: 'esm',
		plugins: [
			getBabelOutputPlugin({
				configFile: path.resolve(root, '.babelrc.json'),
			}),
		],
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
					// Escape the CSS source so that it can be used in a template literal.
					const escapedCode = code
						// Preserve any escape sequences in the source:
						.replace('\\', '\\\\')
						// Escape backticks:
						.replace(/`/g, '\\`')
						// Escape ${} interpolation:
						.replace(/\$/g, '\\$')
					return `export default new CSSStyleSheet(\`${escapedCode}\`);`
				}
				return null
			},
		},
		terser({
			keep_classnames: true,
			compress: {
				module: true,
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
