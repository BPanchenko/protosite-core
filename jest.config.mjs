export default {
	collectCoverageFrom: ['custom-element/*.ts', 'lib/*.ts', '!custom-element/*.d.ts'],
	coverageDirectory: './.jest/coverage',
	globalSetup: './.jest/setup.cjs',
	globalTeardown: './.jest/teardown.cjs',
	testEnvironment: './.jest/puppeteer_environment.cjs',
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
	transform: { '^.+\\.ts$': 'ts-jest' }
}
