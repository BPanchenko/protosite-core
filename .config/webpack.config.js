import path from 'node:path'

/** @type {import('webpack').Configuration} */
export default {
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
		filename: '[name].mjs',
		path: path.resolve(process.cwd(), 'assets'),
		publicPath: 'http://assets.protosite.rocks/core/',
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
		extensions: ['.ts', '.js', '.d.ts', '.cjs', '.d.cts', '.mjs', '.d.mts'],
		alias: {
			'#uikit': ['@bpanchenko/uikit'],
		},
	},
}
