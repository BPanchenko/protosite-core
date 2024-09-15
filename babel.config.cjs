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
}
