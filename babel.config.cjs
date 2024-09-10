module.exports = {
	presets: [
		[
			require.resolve('@babel/preset-env'),
			{
				targets: {
					esmodules: true,
					node: true,
				},
			},
		],
	],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: ['.'],
				alias: {
					'#assets': './assets',
					'#uikit': '@bpanchenko/uikit',
				},
			},
		],
	],
}
