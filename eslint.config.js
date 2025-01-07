import babelParser from '@babel/eslint-parser'
import eslint from '@eslint/js'

import importPlugin from 'eslint-plugin-import'
import jest from 'eslint-plugin-jest'
import jestDom from 'eslint-plugin-jest-dom'
import requireSortPlugin from 'eslint-plugin-require-sort'
import json from 'eslint-plugin-json'
import prettier from 'eslint-plugin-prettier'
import stylisticJs from '@stylistic/eslint-plugin-js'
import testingLibrary from 'eslint-plugin-testing-library'

import globals from 'globals'
import jestConfig from './.config/jest-unit.cjs'
import mapValues from 'lodash/mapValues.js'

import html from '@html-eslint/eslint-plugin'
import htmlParser from '@html-eslint/parser'

import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

export default [
	{
		ignores: [
			'assets/*',
			'!assets/__tests__/',
			'src/component/FormField.js',
			'node_modules/',
		],
	},
	json.configs['recommended-with-comments'],
	eslint.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: typescriptParser,
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
			import: importPlugin,
			prettier,
		},
		rules: {
			'no-unused-vars': 0,
			'@typescript-eslint/no-unused-vars': [
				1,
				{
					args: 'all',
					argsIgnorePattern: '_$',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '_$',
					destructuredArrayIgnorePattern: '_$',
					varsIgnorePattern: '_$',
					ignoreRestSiblings: true,
				},
			],
			'no-redeclare': 0,
			'@typescript-eslint/no-redeclare': [
				1,
				{ ignoreDeclarationMerge: true },
			],
			'no-unused-private-class-members': 1,

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
	},
	{
		files: ['**/*.{js,cjs,mjs,mjs}'],
		languageOptions: {
			globals: {
				...mapValues(jestConfig.globals, () => 'readonly'),
				...globals.browser,
				...globals.node,
			},
			parser: babelParser,
			parserOptions: {
				allowImportExportEverywhere: false,
				ecmaFeatures: {
					globalReturn: false,
				},
				sourceType: 'module',
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
			'import/no-dynamic-require': 1,
			'import/no-nodejs-modules': 0,
			'import/no-self-import': 1,
			'import/no-unresolved': [
				1,
				{
					commonjs: true,
					amd: true,
				},
			],
			'no-console': [
				1,
				{
					allow: ['assert', 'warn'],
				},
			],
			'no-fallthrough': 0,
			'no-duplicate-imports': [
				1,
				{
					includeExports: true,
				},
			],
			'no-prototype-builtins': 0,
			'no-unused-private-class-members': 0,
			'no-unused-vars': [
				1,
				{
					argsIgnorePattern: '._$',
					destructuredArrayIgnorePattern: '._$',
					reportUsedIgnorePattern: true,
				},
			],
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
						['#element', './src/element'],
						['#library', './src/lib'],
						['#types', './src/types'],
						['#uikit', '@bpanchenko/uikit'],
					],
					extensions: ['.js', '.cjs', '.mjs', '.css', '.json'],
				},
				node: true,
			},
			'import/ignore': ['^port-authority'],
		},
	},
	{
		files: ['src/**/__specs__/*.spec.js', 'assets/__tests__/*.test.js'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
		plugins: {
			jest,
			'jest-dom': jestDom,
			'testing-library': testingLibrary,
		},
		rules: {
			'jest-dom/prefer-checked': 'error',
			'jest-dom/prefer-enabled-disabled': 'error',
			'jest-dom/prefer-required': 'error',
			'jest-dom/prefer-to-have-attribute': 'error',
		},
	},
	{
		files: ['**/*.cjs'],
		plugins: {
			'require-sort': requireSortPlugin,
		},
		rules: {
			'require-sort/require-sort': [
				'warn',
				{
					ignoreCase: false,
					ignoreDeclarationSort: false,
					ignorePropertySort: false,
					propertySyntaxSortOrder: ['single', 'multiple', 'none'],
				},
			],
		},
	},
	{
		...html.configs['flat/recommended'],
		files: ['**/*.html'],
		plugins: {
			'@html-eslint': html,
		},
		languageOptions: {
			parser: htmlParser,
		},
		rules: {
			...html.configs['flat/recommended'].rules, // Must be defined. If not, all recommended rules will be lost
			'@html-eslint/indent': ['error', 'tab'],
			'@html-eslint/require-img-alt': 0,
			'@html-eslint/no-multiple-h1': 0,
			'@html-eslint/require-title': 0,
			'@html-eslint/element-newline': [
				'error',
				{ skip: ['code', 'link', 'pre'] },
			],
		},
	},
]
