export default [
	{
		files: ['**/*.+(js|mjs|cjs)'],
		ignores: ['assets/**', '**/node_modules/**'],
		languageOptions: {
			ecmaVersion: 2022
		}
	},
	{
		files: ['**/*.+(js|mjs)'],
		rules: {
			semi: ['warn', 'never', { beforeStatementContinuationChars: 'always' }]
		}
	},
	{
		files: ['**/*.+(cjs)'],
		rules: {
			semi: ['warn', 'always', { omitLastInOneLineBlock: true }]
		}
	}
]
