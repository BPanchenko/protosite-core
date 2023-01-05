export default [
	{
		files: ['**/*.+(js|mjs|cjs)'],
		ignores: ['assets/**', '**/node_modules/**'],
		languageOptions: {
			ecmaVersion: 2022
		},
		rules: {
            semi: ['warn', 'never', { beforeStatementContinuationChars: 'always'}],
			quotes: ['off', 'double'],
			"comma-dangle": ['error', 'never']
        }
	}
]
