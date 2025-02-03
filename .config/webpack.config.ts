import path from 'node:path'
import webpack from 'webpack'

const config: webpack.Configuration = {
	mode: 'development',
	context: process.cwd(),
	entry: {
		'component.avatar': './source/component/Avatar/index.ts',
		'component.select': './source/component/Select/index.ts',
		'element.arrow': './source/element/Arrow/index.ts',
		'element.listbox': './source/element/Listbox/index.ts',
		'element.option': './source/element/Option.ts',
	},
	output: {
		path: path.resolve(process.cwd(), 'assets'),
		filename: '[name].mjs',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				oneOf: [
					{
						with: { type: 'css' },
						loader: 'css-loader',
						options: { exportType: 'css-style-sheet' },
					},
				],
			},
			{
				test: /\.pug$/,
				loader: '@webdiscus/pug-loader',
				options: {
					mode: 'render',
					esModule: true,
				},
			},
			{
				test: /\.(ts|js)$/,
				use: 'babel-loader',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.cjs', '.mjs'],
		alias: {
			'#uikit': ['@bpanchenko/uikit'],
		},
	},
}

export default config
