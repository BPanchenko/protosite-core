export default {
	collectCoverageFrom: ['custom-element/*.ts', 'lib/*.ts', '!custom-element/*.d.ts'],
	coverageDirectory: './.jest/coverage',
	preset: 'jest-puppeteer',
	testEnvironment: 'jsdom',
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
	transform: {
		'^.+\\.ts$': 'ts-jest'
	}
}
