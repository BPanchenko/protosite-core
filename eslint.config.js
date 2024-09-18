import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import importPlugin from 'eslint-plugin-import'
import json from 'eslint-plugin-json'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
	{
		ignores: ['assets/*', '**/node_modules/**'],
	},
	js.configs.recommended,
	{
		files: ['**/*.{js,cjs,mjs}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest,
				...globals.node,
			},
			parser: babelParser,
			parserOptions: {
				sourceType: 'module',
				allowImportExportEverywhere: false,
				ecmaFeatures: {
					globalReturn: false,
				},
			},
		},
		plugins: {
			'@stylistic/js': stylisticJs,
			import: importPlugin,
			prettier,
		},
		rules: {
			'@stylistic/js/indent': [
				2,
				'tab',
				{
					ignoredNodes: ['ConditionalExpression'],
					SwitchCase: 1,
				},
			],
			'import/first': 1,
			'import/named': 1,
			'import/no-absolute-path': 1,
			'import/prefer-default-export': [1, { target: 'single' }],
			'import/no-import-module-exports': 1,
			'import/no-self-import': 1,
			'import/no-unresolved': [
				1,
				{
					esmodule: true,
					commonjs: true,
				},
			],
			'no-console': [
				1,
				{
					allow: ['assert', 'warn'],
				},
			],
			'no-duplicate-imports': [
				1,
				{
					includeExports: true,
				},
			],
			'no-unused-vars': 1,
			'prettier/prettier': 1,
			'sort-imports': [
				1,
				{
					ignoreDeclarationSort: true,
					memberSyntaxSortOrder: [
						'none',
						'single',
						'all',
						'multiple',
					],
				},
			],
		},
		settings: {
			'import/resolver': {
				alias: {
					map: [
						['#assets', './assets'],
						['#uikit', '@bpanchenko/uikit'],
					],
					extensions: ['.js', '.cjs', '.mjs', '.css', '.json'],
				},
			},
		},
	},
	json.configs['recommended-with-comments'],
]
