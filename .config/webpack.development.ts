import path from 'node:path'
import type { Configuration } from 'webpack'

const config: Configuration = {
	context: process.cwd(),
	devtool: 'eval-cheap-module-source-map',
	entry: {
		'component.avatar': './source/component/Avatar/index.ts',
		'component.select': './source/component/Select/index.ts',
		'element.arrow': './source/element/Arrow/index.ts',
		'element.listbox': './source/element/Listbox/index.ts',
		'element.option': './source/element/Option.ts',
	},
	mode: 'development',
	module: {
		rules: [
			{
				oneOf: [
					{
						loader: 'css-loader',
						options: {
							exportType: 'css-style-sheet',
						},
						with: {
							type: 'css',
						},
					},
				],
				test: /\.css$/,
			},
			{
				loader: '@webdiscus/pug-loader',
				options: {
					esModule: true,
					mode: 'render',
				},
				test: /\.pug$/,
			},
			{
				test: /\.(?:js|mjs|cjs)$/,
				use: 'babel-loader',
			},
			{
				test: /\.ts$/,
				use: ['ts-loader', 'babel-loader'],
			},
		],
	},
	experiments: {
		outputModule: true,
	},
	output: {
		filename: '[name].mjs',
		path: path.resolve(process.cwd(), 'assets'),
		publicPath: 'http://assets.protosite.rocks/core/',
		module: true,
	},
	resolve: {
		alias: {
			'#uikit': ['@bpanchenko/uikit'],
		},
		extensions: ['.ts', '.mts', '.cts', '.js', '.mjs', '.cjs'],
		extensionAlias: {
			'.js': ['.js', '.ts'],
			'.cjs': ['.cjs', '.cts'],
			'.mjs': ['.mjs', '.mts'],
		},
	},
	stats: {
		errorDetails: true,
	},
	target: 'es2020',
}

export default config
