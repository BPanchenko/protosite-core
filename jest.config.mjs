export default {
	testEnvironment: 'jsdom',
	preset: 'ts-jest/presets/default-esm',
	transform: {
		'^.+\\.m?[tj]s?$': ['ts-jest', { useESM: true }],
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.(m)?js$': '$1',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(m)?ts$',
	coverageDirectory: 'coverage',
	collectCoverageFrom: [
		'custom-element/*.ts',
		'lib/*.ts',
		'!custom-element/*.d.ts'
	]
}
