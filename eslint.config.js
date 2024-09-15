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
				'error',
				'tab',
				{
					ignoredNodes: ['ConditionalExpression'],
					SwitchCase: 1,
				},
			],
			'no-unused-vars': 'error',
			'no-undef': 'error',
			'import/default': 0,
			'import/export': 0,
			'import/first': 2,
			'import/named': 2,
			'import/namespace': 0,
			'import/no-absolute-path': 2,
			'import/no-default-export': 0,
			'import/no-import-module-exports': 2,
			'import/no-named-as-default': 0,
			'import/no-named-as-default-member': 0,
			'import/no-self-import': 2,
			'import/no-unresolved': [
				2,
				{
					esmodule: true,
					commonjs: true,
				},
			],
			'import/order': [
				2,
				{
					alphabetize: {
						caseInsensitive: true,
						order: 'asc',
					},
					groups: [
						'external',
						'builtin',
						'internal',
						'parent',
						'sibling',
						'type',
						'object',
						'index',
						'unknown',
					],
					'newlines-between': 'always',
				},
			],
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],
			'no-duplicate-imports': [
				2,
				{
					includeExports: true,
				},
			],
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					parser: 'flow',
				},
			],
			'sort-imports': [
				2,
				{
					ignoreDeclarationSort: true,
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
					extensions: ['.js', '.cjs', '.css', '.json'],
				},
			},
		},
	},
	{
		files: ['**/*.json'],
		...json.configs.recommended,
		rules: {
			'json/duplicate-key': 'error',
		},
	},
]
