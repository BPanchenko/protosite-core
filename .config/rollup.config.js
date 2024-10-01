import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { checkDevelopmentMode, getFilesByPattern } from '../.kernel/lib.cjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import path from 'node:path'

export default {
	input: getFilesByPattern(`src/components/avatar.js`),
	output: {
		entryFileNames: '[name]-component.mjs',
		sourcemap: checkDevelopmentMode(),
		format: 'esm',
		plugins: [
			getBabelOutputPlugin({
				configFile: path.resolve(process.cwd(), '.babelrc.json'),
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
					SHADOW_MODE: 'closed',
				},
			},
		}),
	],
}
